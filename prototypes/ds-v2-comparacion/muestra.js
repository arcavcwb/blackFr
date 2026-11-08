// Solo prototipo. El laboratorio gobierna modo y controles de las dos muestras.
const query = new URLSearchParams(location.search);
const variant = query.get('variant') === '1480' ? 1480 : 1280;
const embedded = parent !== window;
const revision = document.querySelector('meta[name="prototype-revision"]').content;
let mode = query.get('mode') === 'approved' ? 'approved' : 'html';
let epoch = 0;
let snapshotSequence = 0;
let appliedDetails = {};
let appliedInteraction = {hover:null,focus:null};
const digestCache = new Map();
const details = [...document.querySelectorAll('.faq details')];
details.forEach((detail, i) => detail.dataset.syncKey = 'faq-' + i);
document.querySelector('.reference-exact').dataset.syncKey = 'reference';
const controlled = [...document.querySelectorAll('[data-sync-key]')];
controlled.forEach(detail => detail.querySelector('summary').dataset.interactionKey = detail.dataset.syncKey);
[...document.querySelectorAll('main a')].forEach((link,i) => link.dataset.interactionKey = 'link-'+i);
const interactive = [...document.querySelectorAll('[data-interaction-key]')];
document.documentElement.style.setProperty('--gdb-max', variant + 'px');

function applyMode(next) {
  mode = next === 'approved' ? 'approved' : 'html';
  document.body.classList.toggle('references-mode', mode === 'approved');
  document.querySelectorAll('[data-variant]').forEach(a => {
    a.href = '?variant=' + a.dataset.variant + (mode === 'approved' ? '&mode=approved' : '');
    a.toggleAttribute('aria-current', false);
    if (Number(a.dataset.variant) === variant) a.setAttribute('aria-current', 'page');
  });
  const link = document.getElementById('reference-link');
  link.href = '?variant=' + variant + (mode === 'approved' ? '' : '&mode=approved');
  link.textContent = mode === 'approved' ? 'Texto canônico em HTML' : '4 cards aprovados';
}
applyMode(mode);
if (embedded) {
  document.body.classList.add('comparison-embedded');
  // Los enlaces locales permitían que A navegara a PNG y B siguiera en HTML.
  // Solo se suprimen las herramientas redundantes; el contenido no cambia.
  document.querySelector('.review-bar nav').hidden = true;
}

function sendSize() {
  const width = document.querySelector('.gdb-container').getBoundingClientRect().width;
  document.getElementById('measurement').textContent = `${variant === 1280 ? 'A' : 'B'} · máximo ${variant} px · área GDB ${Math.round(width)} px · viewport ${innerWidth} px`;
  if (embedded) parent.postMessage({kind:'gdb-review-size', revision, variant,
    height:Math.ceil(document.body.getBoundingClientRect().height)}, '*');
}

async function digest(value) {
  if (!digestCache.has(value)) digestCache.set(value, (async () => {
    const bytes = value.startsWith('data:image/')
      ? Uint8Array.from(atob(value.split(',')[1]), c => c.charCodeAt(0))
      : new TextEncoder().encode(value);
    const buffer = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(buffer)].map(b => b.toString(16).padStart(2,'0')).join('');
  })());
  // No retener todas las serializaciones del DOM durante cambios de tamaño.
  const result = await digestCache.get(value);
  if (!value.startsWith('data:image/')) digestCache.delete(value);
  return result;
}
function visible(element) {
  if (!element.getClientRects().length) return false;
  for (let node = element; node; node = node.parentElement) {
    const style = getComputedStyle(node);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    if (node.tagName === 'DETAILS' && !node.open && !node.querySelector('summary').contains(element)) return false;
  }
  return true;
}
const normalize = value => value.replace(/\s+/g, ' ').trim();
async function snapshot(sequence) {
  const main = document.querySelector('main');
  const canonicalText = document.getElementById('canonical-content').textContent;
  const canonical = JSON.parse(canonicalText);
  const images = await Promise.all([...main.querySelectorAll('img')].map(async image => ({
    sha256:await digest(image.getAttribute('src')), alt:image.alt, visible:visible(image),
    loaded:image.complete && image.naturalWidth > 0,
    naturalWidth:image.naturalWidth, naturalHeight:image.naturalHeight
  })));
  const controls = controlled.map(detail => ({key:detail.dataset.syncKey, open:detail.open}));
  const links = [...main.querySelectorAll('a')].map(a => ({text:normalize(a.textContent), href:a.getAttribute('href')}));
  const conditions = [...main.querySelectorAll('.step')].map((card,i) => ({
    title:card.querySelector('h2').textContent,
    description:normalize(card.querySelector('.step-copy').textContent),
    canonical:card.querySelector('h2').textContent === canonical.game.passos.itens[i].titulo &&
      normalize(card.querySelector('.step-copy').textContent) === normalize(canonical.game.passos.itens[i].descricao.replace(/\*\*/g,''))
  }));
  const styleProperties = ['fontFamily','fontSize','fontWeight','fontStyle','lineHeight','color','backgroundImage','backgroundColor','borderColor','borderWidth','borderRadius','boxShadow','padding','letterSpacing','textAlign'];
  const styles = ['.gdb','.step','.step h2','.step-number','.step-copy','.bonus','.action-primary','.regulation','.offers','.faq summary','.faq-answer','.contact-card','.contact-card a'].map(selector => {
    const style = getComputedStyle(document.querySelector(selector));
    return {selector,values:Object.fromEntries(styleProperties.map(key => [key,style[key]]))};
  });
  const result = {
    revision,epoch,variant,mode,viewport:{width:innerWidth,height:innerHeight},
    hashes:{dom:await digest(main.outerHTML),visibleText:await digest(normalize(main.innerText)),
      canonical:await digest(canonicalText),stylesheet:await digest(document.querySelector('head style').textContent),
      images:await digest(JSON.stringify(images)),controls:await digest(JSON.stringify(controls)),
      links:await digest(JSON.stringify(links)),conditions:await digest(JSON.stringify(conditions)),styles:await digest(JSON.stringify(styles))},
    images,controls,links,conditions,styles,interaction:{...appliedInteraction},
    metrics:{container:document.querySelector('.gdb-container').getBoundingClientRect().width,
      card:document.querySelector('.step').getBoundingClientRect().width,
      horizontalOverflow:document.documentElement.scrollWidth > document.documentElement.clientWidth},
    canonicalValid:conditions.length === 4 && conditions.every(item => item.canonical),
    allImagesLoaded:images.every(image => image.loaded),
    detailStatesValid:controlled.every(detail => detail.open === Boolean(appliedDetails[detail.dataset.syncKey]))
  };
  if (sequence === snapshotSequence) parent.postMessage({kind:'gdb-review-snapshot',...result}, '*');
}
function requestSnapshot() {
  const sequence = ++snapshotSequence;
  requestAnimationFrame(() => requestAnimationFrame(() => snapshot(sequence).catch(error => {
    parent.postMessage({kind:'gdb-review-error',revision,epoch,message:error.message}, '*');
  })));
}

document.addEventListener('toggle', event => {
  const detail = event.target;
  if (!(detail instanceof HTMLDetailsElement) || !detail.dataset.syncKey) return;
  sendSize();
  if (embedded && detail.open !== Boolean(appliedDetails[detail.dataset.syncKey])) {
    appliedDetails[detail.dataset.syncKey] = detail.open;
    parent.postMessage({kind:'gdb-review-detail',revision,key:detail.dataset.syncKey,open:detail.open}, '*');
  }
}, true);
function sendInteraction(type,key) {
  if (!embedded || appliedInteraction[type] === key) return;
  appliedInteraction[type] = key;
  parent.postMessage({kind:'gdb-review-interaction',revision,type,key}, '*');
}
const interactionKey = target => target instanceof Element ? target.closest('[data-interaction-key]')?.dataset.interactionKey || null : null;
document.addEventListener('pointerover',event => sendInteraction('hover',interactionKey(event.target)));
document.addEventListener('pointerout',event => {
  if (interactionKey(event.relatedTarget) !== interactionKey(event.target)) sendInteraction('hover',interactionKey(event.relatedTarget));
});
document.addEventListener('focusin',event => sendInteraction('focus',event.target.matches(':focus-visible') ? interactionKey(event.target) : null));
document.addEventListener('focusout',() => sendInteraction('focus',null));
window.addEventListener('message', event => {
  if (!embedded || event.source !== parent || event.data?.kind !== 'gdb-review-config') return;
  const config = event.data;
  if (config.revision !== revision || config.variant !== variant) return;
  epoch = config.epoch;
  applyMode(config.mode);
  appliedDetails = {...config.details};
  controlled.forEach(detail => detail.open = Boolean(appliedDetails[detail.dataset.syncKey]));
  appliedInteraction = {...config.interaction};
  interactive.forEach(element => {
    element.classList.toggle('review-hover',element.dataset.interactionKey === appliedInteraction.hover);
    element.classList.toggle('review-focus',element.dataset.interactionKey === appliedInteraction.focus);
  });
  sendSize();
  requestSnapshot();
});
window.addEventListener('resize',sendSize);
new ResizeObserver(sendSize).observe(document.body);
window.addEventListener('load',() => {
  sendSize();
  if (embedded) parent.postMessage({kind:'gdb-review-ready',revision,variant}, '*');
});
sendSize();

// Solo prototipo. Única autoridad de configuración para A y B.
const viewport = document.getElementById('viewport');
const mode = document.getElementById('mode');
const frames = [...document.querySelectorAll('iframe')];
const pair = document.querySelector('.pair');
const revision = document.querySelector('meta[name="prototype-revision"]').content;
const status = document.getElementById('parity-status');
const reportElement = document.getElementById('parity-report');
const state = {epoch:1,details:{'faq-0':false,'faq-1':false,'faq-2':false,'faq-3':false,reference:false},interaction:{hover:null,focus:null}};
const snapshots = new Map();
const ready = new Set();
let sharedHeight = 900;
let latestReport = null;
let reportTimer;
const history = [];

function pending() {
  status.textContent = 'Comprobando paridad de A y B…';
  status.dataset.state = 'pending';
  pair.dataset.ready = 'false';
  pair.setAttribute('aria-busy','true');
}
function sendConfig() {
  frames.forEach((frame,i) => {
    if (ready.has(frame)) frame.contentWindow.postMessage({kind:'gdb-review-config',revision,
      epoch:state.epoch,variant:i === 0 ? 1280 : 1480,mode:mode.value,
      details:state.details,interaction:state.interaction}, '*');
  });
}
function fit() {
  const width = Number(viewport.value);
  // Misma altura de viewport y misma escala. El máximo GDB es la única variable.
  sharedHeight = Math.max(900,...frames.map(frame => Number(frame.dataset.height) || 0));
  const scale = Math.min(1,...frames.map(frame => frame.parentElement.clientWidth / width));
  let resized = false;
  frames.forEach(frame => {
    if (frame.style.width !== width+'px' || frame.style.height !== sharedHeight+'px') resized = true;
    frame.style.width = width+'px';
    frame.style.height = sharedHeight+'px';
    frame.style.transform = `scale(${scale})`;
    frame.parentElement.style.height = sharedHeight*scale+'px';
  });
  if (resized) {
    snapshots.clear();
    pending();
    sendConfig();
  }
  return resized;
}
function updateTools() {
  const count = Object.entries(state.details).filter(([key,open]) => key.startsWith('faq-') && open).length;
  const button = document.getElementById('toggle-faq');
  button.setAttribute('aria-pressed',count === 0 ? 'false' : count === 4 ? 'true' : 'mixed');
  button.textContent = (count ? 'Cerrar' : 'Abrir')+' FAQ en ambas vistas';
  frames.forEach((frame,i) => {
    document.getElementById(i === 0 ? 'open-a' : 'open-b').href =
      'prototipo.html?variant='+(i === 0 ? 1280 : 1480)+'&mode='+mode.value+'&revision='+revision;
  });
}
function configure() {
  ++state.epoch;
  snapshots.clear();
  pending();
  updateTools();
  fit();
  sendConfig();
}
function compare() {
  const a = snapshots.get(frames[0]), b = snapshots.get(frames[1]);
  if (!a || !b || a.epoch !== state.epoch || b.epoch !== state.epoch) return;
  const equal = (x,y) => JSON.stringify(x) === JSON.stringify(y);
  const checks = {
    revision:a.revision === revision && b.revision === revision,
    variants:a.variant === 1280 && b.variant === 1480,
    mode:a.mode === mode.value && b.mode === mode.value,
    viewport:equal(a.viewport,b.viewport) && a.viewport.width === Number(viewport.value) && a.viewport.height === sharedHeight,
    dom:a.hashes.dom === b.hashes.dom,
    visibleText:a.hashes.visibleText === b.hashes.visibleText,
    images:a.hashes.images === b.hashes.images && a.allImagesLoaded && b.allImagesLoaded,
    controls:a.hashes.controls === b.hashes.controls && a.detailStatesValid && b.detailStatesValid,
    interaction:equal(a.interaction,b.interaction) && equal(a.interaction,state.interaction),
    links:a.hashes.links === b.hashes.links,
    conditions:a.hashes.conditions === b.hashes.conditions && a.canonicalValid && b.canonicalValid,
    canonical:a.hashes.canonical === b.hashes.canonical,
    stylesheet:a.hashes.stylesheet === b.hashes.stylesheet,
    componentStyles:a.hashes.styles === b.hashes.styles,
    noHorizontalOverflow:!a.metrics.horizontalOverflow && !b.metrics.horizontalOverflow
  };
  const valid = Object.values(checks).every(Boolean);
  latestReport = {status:valid ? 'parity-verified' : 'comparison-invalid',revision,
    mode:mode.value,viewport:a.viewport,checks,details:{...state.details},
    a,b,onlyIntentionalVariable:'--gdb-max: 1280px / 1480px',
    note:'Solo varía el máximo GDB. Los estados visuales de hover/foco se reflejan en ambos paneles; el foco real sigue en el control activo. La geometría y los saltos de línea pueden variar por el ancho.'};
  status.textContent = valid
    ? `Paridad verificada · ${mode.value === 'html' ? 'HTML' : 'PNG aprobados'} · ${a.viewport.width} px · solo cambia el máximo GDB`
    : 'Comparación inválida: '+Object.entries(checks).filter(([,ok]) => !ok).map(([key]) => key).join(', ');
  status.dataset.state = valid ? 'valid' : 'invalid';
  pair.dataset.ready = 'true';
  pair.setAttribute('aria-busy','false');
  reportElement.textContent = JSON.stringify(latestReport,null,2);
  document.getElementById('parity-data').textContent = JSON.stringify(latestReport);
  if (valid) {
    const last = history.at(-1);
    if (!last || last.a.epoch !== a.epoch || !equal(last.viewport,a.viewport)) history.push(latestReport);
  }
}
window.addEventListener('message',event => {
  const frame = frames.find(item => item.contentWindow === event.source);
  if (!frame || event.data?.revision !== revision) return;
  const message = event.data;
  if (message.kind === 'gdb-review-ready') {
    ready.add(frame);
    sendConfig();
  } else if (message.kind === 'gdb-review-size') {
    frame.dataset.height = message.height;
    fit();
  } else if (message.kind === 'gdb-review-detail' && Object.hasOwn(state.details,message.key)) {
    state.details[message.key] = Boolean(message.open);
    configure();
  } else if (message.kind === 'gdb-review-interaction' && ['hover','focus'].includes(message.type) &&
      (message.key === null || /^(reference|faq-[0-3]|link-[0-4])$/.test(message.key))) {
    if (state.interaction[message.type] !== message.key) {
      state.interaction[message.type] = message.key;
      configure();
    }
  } else if (message.kind === 'gdb-review-snapshot' && message.epoch === state.epoch) {
    // No aceptar una captura anterior al último resize, aunque su contenido coincida.
    if (message.viewport.width !== Number(viewport.value) || message.viewport.height !== sharedHeight) return;
    snapshots.set(frame,message);
    clearTimeout(reportTimer);
    reportTimer = setTimeout(compare,0);
  } else if (message.kind === 'gdb-review-error') {
    status.textContent = 'No se pudo verificar la comparación: '+message.message;
    status.dataset.state = 'invalid';
  }
});
viewport.addEventListener('change',configure);
mode.addEventListener('change',configure);
document.getElementById('toggle-faq').addEventListener('click',() => {
  const open = !Object.entries(state.details).some(([key,value]) => key.startsWith('faq-') && value);
  Object.keys(state.details).filter(key => key.startsWith('faq-')).forEach(key => state.details[key] = open);
  configure();
});
document.getElementById('recheck-parity').addEventListener('click',configure);
document.getElementById('download-parity').addEventListener('click',() => {
  if (!latestReport) return;
  const evidence = {status:latestReport.status,revision,latest:latestReport,history};
  const url = URL.createObjectURL(new Blob([JSON.stringify(evidence,null,2)],{type:'application/json'}));
  const link = document.createElement('a');
  link.href = url;link.download = `paridad-${mode.value}-${viewport.value}.json`;link.click();
  setTimeout(() => URL.revokeObjectURL(url),1000);
});
for (const width of [390,768,1280,1440,1600]) {
  const button = document.createElement('button');button.type = 'button';
  button.textContent = width+' px'+(width === 1600 ? ' · auxiliar' : '');
  button.addEventListener('click',() => {viewport.value = String(width);configure();window.scrollTo({top:0,behavior:'instant'});});
  document.getElementById('view-links').append(button);
}
window.addEventListener('resize',fit);
new ResizeObserver(fit).observe(pair);
pending();updateTools();fit();
frames.forEach((frame,i) => {
  frame.addEventListener('load',() => {
    // Una recarga aislada conserva el estado del laboratorio; el hijo pide config.
    snapshots.delete(frame);pending();
  });
  frame.src = 'prototipo.html?variant='+(i === 0 ? 1280 : 1480)+'&mode=html&revision='+revision;
});

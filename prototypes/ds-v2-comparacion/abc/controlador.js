// Solo prototipo. Única autoridad de configuración para A, B y C.
const viewport = document.getElementById('viewport');
const mode = document.getElementById('mode');
const frames = [...document.querySelectorAll('iframe')];
const variants = [1280,1480,1400];
const spec = JSON.parse(document.getElementById('c-spec').textContent);
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
  status.textContent = 'Comprobando paridad de A/B/C…';
  status.dataset.state = 'pending';
  pair.dataset.ready = 'false';
  pair.setAttribute('aria-busy','true');
}
function sendConfig() {
  frames.forEach((frame,i) => {
    if (ready.has(frame)) frame.contentWindow.postMessage({kind:'gdb-review-config',revision,
      epoch:state.epoch,variant:variants[i],mode:mode.value,
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
  button.textContent = (count ? 'Cerrar' : 'Abrir')+' FAQ en las tres vistas';
  frames.forEach((frame,i) => {
    document.getElementById(['open-a','open-b','open-c'][i]).href =
      'prototipo.html?variant='+(variants[i])+'&mode='+mode.value+'&revision='+revision;
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
  const rows=frames.map(frame=>snapshots.get(frame));
  if(rows.some(row=>!row||row.epoch!==state.epoch))return;
  const [a,b,c]=rows, equal=(x,y)=>JSON.stringify(x)===JSON.stringify(y);
  const common=key=>rows.every(row=>row.hashes[key]===a.hashes[key]);
  const differences=[];
  a.styles.forEach((item,i)=>Object.entries(item.values).forEach(([property,from])=>{
    const to=c.styles[i].values[property];
    if(from!==to)differences.push({selector:item.selector,property,from,to,declared:mode.value==='html'&&(spec.allowedComputedChanges[item.selector]||[]).includes(property)});
  }));
  const checks={revision:rows.every(row=>row.revision===revision),variants:rows.every((row,i)=>row.variant===variants[i]),mode:rows.every(row=>row.mode===mode.value),viewport:rows.every(row=>equal(row.viewport,a.viewport))&&a.viewport.width===Number(viewport.value)&&a.viewport.height===sharedHeight,dom:common('dom'),visibleText:common('visibleText'),images:common('images')&&rows.every(row=>row.allImagesLoaded),controls:common('controls')&&rows.every(row=>row.detailStatesValid),interaction:rows.every(row=>equal(row.interaction,state.interaction)),links:common('links'),conditions:common('conditions')&&rows.every(row=>row.canonicalValid),canonical:common('canonical'),baselineStylesheet:common('stylesheet')&&a.hashes.stylesheet===spec.baselineStylesheetSha256,candidateStylesheet:common('candidateStylesheet'),baselineABStyles:a.hashes.styles===b.hashes.styles,cOnlyDeclaredChanges:differences.every(change=>change.declared),noHorizontalOverflow:rows.every(row=>!row.metrics.horizontalOverflow),noClipping:rows.every(row=>row.metrics.cards.every(card=>!card.clipped&&card.contentContained))};
  const valid=Object.values(checks).every(Boolean);
  latestReport={status:valid?'parity-verified':'comparison-invalid',revision,mode:mode.value,viewport:a.viewport,checks,details:{...state.details},a,b,c,differencesC:differences,declaredC:spec,baseline:'A/B unchanged; same canonical main DOM',note:'C differs only in its declared visual CSS and maximum 1400px. Shared controls, images and commercial content must match.'};
  status.textContent=valid?`Paridad A/B/C verificada · ${mode.value==='html'?'HTML':'PNG aprobados'} · ${a.viewport.width} px`:'Comparación inválida: '+Object.entries(checks).filter(([,ok])=>!ok).map(([key])=>key).join(', ');
  status.dataset.state=valid?'valid':'invalid';pair.dataset.ready='true';pair.setAttribute('aria-busy','false');
  reportElement.textContent=JSON.stringify(latestReport,null,2);document.getElementById('parity-data').textContent=JSON.stringify(latestReport);
  if(valid){const last=history.at(-1);if(!last||last.a.epoch!==a.epoch||!equal(last.viewport,a.viewport))history.push(latestReport);}
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
  link.href = url;link.download = `abc-${mode.value}-${viewport.value}.json`;link.click();
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
  frame.src = 'prototipo.html?variant='+(variants[i])+'&mode=html&revision='+revision;
});

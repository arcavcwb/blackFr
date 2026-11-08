#!/usr/bin/env python3
"""Genera únicamente el prototipo local; sin dependencias ni cambios de fuentes."""
from pathlib import Path
import base64
import hashlib
import html
import json
import re

OUT = Path(__file__).resolve().parent
ROOT = OUT.parent.parent
source = ROOT / 'content/landing-content.json'
data = json.loads(source.read_text())
game = data['game']
assert len(game['passos']['itens']) == 4

def text(value):
    return html.escape(value, quote=True)

def rich(value):
    return re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text(value))

resources = {}
def asset(path):
    raw = (ROOT / path).read_bytes()
    resources[path] = hashlib.sha256(raw).hexdigest()
    return 'data:image/png;base64,' + base64.b64encode(raw).decode()

illustrations = [asset(f'src/assets/game-da-black/illustration-step-{i}.png') for i in range(1, 5)]
card_paths = sorted((ROOT / 'assets/generated/game-da-black/cards-aprovados').glob('*.png'))
assert len(card_paths) == 4
cards = [asset(str(p.relative_to(ROOT))) for p in card_paths]
gdb_logo = asset('src/assets/game-da-black/gdb-logo-original.png')
condor_logo = asset('assets/originals/branding/logo-condor-com-sombra.png')
reference = asset('references/approved/game-da-black/passos-quatro-composicion-aprobada.png')

style = r'''
:root{color-scheme:dark;font-family:Arial,system-ui,sans-serif;font-size:16px;--canvas:#08090d;--gutter:16px;--gdb-max:1280px;--cyan:#16baff;--yellow:#ffe500;--panel:#0a1e3b;--focus:#ffe76a}
*{box-sizing:border-box}html{overflow-y:scroll}body{margin:0;background:var(--canvas);color:#fff}img{max-width:100%;height:auto}a{color:inherit}button,select{font:inherit}a,button,summary{touch-action:manipulation}a:focus-visible,button:focus-visible,summary:focus-visible,select:focus-visible{outline:3px solid var(--focus);outline-offset:4px}h1,h2,h3,p{margin-top:0}strong{font-weight:800}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
.review-bar{border-bottom:1px solid #304259;padding:14px var(--gutter);background:#10141e;font-size:13px;line-height:1.5}.review-inner{max-width:1480px;margin:auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px}.review-bar p{margin:0;color:#d4dfed}.review-bar nav{display:flex;flex-wrap:wrap;gap:8px}.review-bar a{min-height:44px;padding:10px 13px;border:1px solid #496786;border-radius:8px;text-decoration:none}.review-bar a[aria-current=page]{background:#ffe86d;color:#071a42;border-color:#ffe86d}.review-bar small{display:block;color:#adbed3}.badge-review{color:#ffe86d;font-weight:700;letter-spacing:.08em;font-size:11px}.measurement{font-variant-numeric:tabular-nums}
.gdb{padding:44px var(--gutter) 64px;background:radial-gradient(ellipse at 50% 0,rgba(5,89,215,.34),transparent 60%),linear-gradient(180deg,#03142e,#052453 55%,#02112d)}.gdb-container{max-width:var(--gdb-max);margin-inline:auto;min-width:0}.gdb-header{text-align:center;max-width:1000px;margin:0 auto 58px}.logos{display:flex;align-items:center;justify-content:center;gap:24px;margin-bottom:28px}.gdb-logo{width:82px;height:auto;object-fit:contain}.condor-logo{width:112px;height:auto;object-fit:contain}h1{font-size:clamp(1.8rem,3.6vw,3.5rem);line-height:1.1;letter-spacing:-.035em;font-weight:900;text-wrap:balance;margin-bottom:24px}.intro{max-width:800px;margin-inline:auto;color:#e0ecff;font-size:1rem;line-height:1.6}.intro p:last-child{margin-bottom:0}
.steps{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:minmax(0,1fr);gap:48px 24px}.steps>li{min-width:0;position:relative}.step{position:relative;height:100%;display:flex;flex-direction:column;min-width:0;padding:44px 20px 24px;border:2px solid var(--cyan);border-radius:24px;background:linear-gradient(180deg,#052049,#04172f);box-shadow:0 0 7px rgba(34,195,255,.9),0 0 23px rgba(0,99,255,.36),inset 0 0 16px rgba(0,98,220,.18)}.step-number{position:absolute;top:-26px;left:50%;transform:translateX(-50%);height:52px;min-width:78px;display:grid;place-items:center;padding:0 16px;border-radius:14px;background:linear-gradient(165deg,#fff83f,#ffd500);color:#002255;font-weight:900;font-style:italic;font-size:34px;box-shadow:0 5px 14px #0004}.step h2{min-height:84px;display:flex;align-items:center;justify-content:center;text-align:center;padding:12px;border-radius:999px;background:linear-gradient(160deg,#fff139,#ffd800);color:#062958;font-size:clamp(1.125rem,1.5vw,1.375rem);font-weight:900;font-style:italic;line-height:1.2;text-wrap:balance;margin:0 0 14px;overflow-wrap:break-word}.illustration{display:block;object-fit:contain;height:210px;width:100%;max-width:290px;margin:0 auto 20px}.step-copy{font-size:16px;line-height:1.5;color:#e0ecff;text-align:center;margin:0}.bonus{display:block;border:1.5px solid var(--yellow);border-radius:12px;padding:12px 10px;color:var(--yellow);font-weight:700;margin-top:14px;line-height:1.5}.connector{display:none;pointer-events:none;position:absolute;top:42%;right:-22px;z-index:1;color:white;font-size:36px;line-height:1;text-shadow:0 0 9px #00b9ff,0 0 18px #00b9ff}
.reference-note{font:13px/1.6 Arial,system-ui,sans-serif;color:#b9cbe1;margin:0 auto 28px;max-width:800px;text-align:center}.approved-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:24px;list-style:none;padding:0;margin:0}.approved-grid img{width:100%;display:block;object-fit:contain}.source-panel{display:none}.references-mode .html-panel{display:none}.references-mode .source-panel{display:block}.references-mode .gdb-header{margin-bottom:32px}.reference-exact{max-width:var(--gdb-max);margin:40px auto 0}.reference-exact summary{padding:16px;border:1px solid #3865a1;border-radius:12px;cursor:pointer}.reference-exact img{display:block;width:100%;margin-top:16px}
.bottom{padding:56px var(--gutter) 64px}.actions{max-width:760px;margin:auto;text-align:center}.action-primary{display:flex;align-items:center;justify-content:center;gap:8px;min-height:56px;width:100%;max-width:580px;margin:0 auto;padding:14px 24px;border-radius:999px;background:#ffe86d;color:#071a42;text-decoration:none;font-size:14px;line-height:1.4;font-weight:800}.action-primary:hover{background:#fff39d}.regulations{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;margin:16px 0}.regulation{min-height:58px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:14px 18px;border:1px solid #24599a;background:#081b38;border-radius:12px;color:#e8f1ff;font-size:14px;font-weight:800;line-height:1.4}.regulation small{color:#b7cbe5;font-size:11px;font-weight:400}.offers{display:inline-flex;align-items:center;justify-content:center;max-width:620px;min-height:44px;padding:8px 12px;gap:8px;color:#82cfff;font-size:14px;font-weight:700;line-height:1.5;text-underline-offset:4px}.offers:hover{color:#fff}.editorial{max-width:768px;margin:20px auto 0;padding:10px 14px;border-left:2px solid #a39a60;color:#d2c999;text-align:left;font-size:12px;line-height:1.6}.faq{max-width:768px;margin:80px auto 0}.section-title{font-size:clamp(1.75rem,3vw,2.5rem);line-height:1.15;text-align:center;font-weight:800;text-wrap:balance;margin:0 0 28px}.faq-items{display:grid;gap:12px}.faq details{min-width:0;border:1px solid #244771;border-radius:12px;background:#0a1e3b}.faq details[open]{background:#102847;border-color:#418bd6}.faq summary{list-style:none;min-height:60px;padding:16px 20px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:16px;font-weight:700;line-height:1.5;border-radius:11px}.faq summary::-webkit-details-marker{display:none}.faq summary:hover,.faq summary:focus-visible{background:#153258}.faq summary:focus-visible{outline-offset:-3px}.faq summary::after{content:'⌄';font-size:24px;color:#88c9ff}.faq details[open] summary::after{transform:rotate(180deg)}.faq-answer{border-top:1px solid #274469;padding:16px 20px 20px;font-size:16px;line-height:1.6;color:#cfdeef;margin:0}.faq .editorial{margin:0 0 20px}.contacts{max-width:920px;margin:80px auto 0;padding-top:64px;border-top:1px solid #21436f}.contact-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:16px}.contact-card{min-width:0;display:flex;gap:16px;padding:20px;border-radius:12px;background:#f6f8fc;color:#112952;box-shadow:0 12px 40px #0003}.contact-icon{flex-shrink:0;width:44px;height:44px;border-radius:12px;background:#e3ecfc;color:#12499e;display:grid;place-items:center}.contact-icon img{width:24px;height:24px;object-fit:contain}.contact-card h3{color:#0c326e;font-size:16px;line-height:1.3;margin:0 0 8px}.contact-card p{color:#354968;font-size:14px;line-height:1.5;margin:0 0 6px}.contact-card a{color:#0944a2;display:block;font-size:14px;line-height:1.5;font-weight:700;overflow-wrap:anywhere;text-underline-offset:3px;padding-block:4px}.contact-card a:focus-visible{outline-color:#0e52af;outline-offset:2px}.end-note{max-width:920px;margin:40px auto 0;font-size:12px;color:#aebbd0;line-height:1.6;text-align:center}
@media(min-width:640px){:root{--gutter:24px}.steps,.approved-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:48px 20px}.illustration{height:220px}.regulations{grid-template-columns:repeat(2,minmax(0,1fr))}.faq-items{gap:16px}.faq summary{padding:18px 24px}.faq-answer{padding:18px 24px 24px}.faq,.contacts{margin-top:96px}.gdb{padding-top:56px}.section-title{margin-bottom:32px}}
@media(min-width:768px){.contact-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.contact-card{padding:24px}}
@media(min-width:1280px){:root{--gutter:32px}.steps,.approved-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:24px}.connector{display:block}.illustration{height:210px}.gdb{padding-top:56px}}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important}}
'''

steps = []
for i, item in enumerate(game['passos']['itens']):
    description = item['descricao']
    if i == 2:
        prefix, bonus = description.split('Comprando os ', 1)
        bonus = 'Comprando os ' + bonus
        assert prefix + bonus == description
        copy = rich(prefix) + '<span class="bonus">' + rich(bonus) + '</span>'
    else:
        copy = rich(description)
    connector = '<span class="connector" aria-hidden="true">›</span>' if i < 3 else ''
    steps.append(f'<li><article class="step" data-step="{i+1}"><span class="step-number" aria-hidden="true">{i+1}</span><h2>{text(item["titulo"])}</h2><img class="illustration" src="{illustrations[i]}" alt="" width="310" height="271"><p class="step-copy">{copy}</p></article>{connector}</li>')
baseline = ''.join(f'<li><img src="{img}" alt="Referência visual aprovada do passo {i+1}; conteúdo comercial completo na vista HTML" width="396" height="565"></li>' for i, img in enumerate(cards))
regulations = ''.join(f'<div class="regulation"><span>{text(b["rotulo"])}</span><small>Destino pendente · sem link confirmado</small></div>' for b in data['regulamento']['botoes'][:2])
faq = ''.join(f'<details><summary>{text(f["pergunta"])}</summary><p class="faq-answer">{text(f["resposta"])}</p></details>' for f in data['faq']['itens'])
contacts = []
contact_source = ROOT / 'src/features/black-friday-bottom/components/ContactCard.astro'
contact_icons = re.findall(r'<svg\b.*?</svg>', contact_source.read_text(), re.S)
assert len(contact_icons) == 2
for i, c in enumerate(data['canais']['cartoes']):
    links = ''.join(f'<a href="{text(link["href"])}">{text(link["rotulo"])}</a>' for link in c['contatos'])
    sub = '<p>' + text(c['subtitulo']) + '</p>' if c.get('subtitulo') else ''
    # Iconos genéricos ya existentes en el componente Astro; sin creación de marcas.
    contacts.append(f'<article class="contact-card"><div class="contact-icon" aria-hidden="true">{contact_icons[i]}</div><div style="min-width:0"><h3>{text(c["titulo"])}</h3>{sub}{links}</div></article>')
offers = data['regulamento']['botoes'][2]
intro = ''.join('<p>' + rich(p) + '</p>' for p in game['linhas'])
source_hash = hashlib.sha256(source.read_bytes()).hexdigest()
child_script = (OUT / 'muestra.js').read_text()
controller_script = (OUT / 'controlador.js').read_text()
revision = hashlib.sha256(Path(__file__).read_bytes() + child_script.encode() + controller_script.encode() + source.read_bytes()).hexdigest()[:16]

page = f'''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>GDB · Comparação experimental DS v2</title><style>{style}</style></head><body>
<aside class="review-bar" aria-label="Ferramentas de revisão do protótipo"><div class="review-inner"><div><p class="badge-review">PROTÓTIPO LOCAL · VALORES NÃO APROVADOS</p><p class="measurement" id="measurement">Comparação de largura máxima GDB</p><small>Texto canônico completo · sem alteração da landing original</small></div><nav aria-label="Modos de comparação"><a href="?variant=1280" data-variant="1280">A · 1280 px</a><a href="?variant=1480" data-variant="1480">B · 1480 px</a><a href="?variant=1280&mode=approved" id="reference-link">4 cards aprovados</a></nav></div></aside>
<main><section class="gdb" aria-labelledby="gdb-title"><div class="gdb-container"><header class="gdb-header"><div class="logos"><img class="gdb-logo" src="{gdb_logo}" alt="GDB — Game da Black" width="196" height="206"><img class="condor-logo" src="{condor_logo}" alt="Condor" width="134" height="36"></div><h1 id="gdb-title">{text(game['passos']['titulo'])}</h1><div class="intro">{intro}</div></header>
<div class="html-panel"><ol class="steps">{''.join(steps)}</ol></div>
<div class="source-panel"><p class="reference-note">Referência gráfica intacta. Os textos incorporados às imagens não substituem o JSON canônico: a vista HTML conserva “Entre na Trilha da Black”, CPF, produtos diferentes e o bônus condicional completo.</p><ol class="approved-grid">{baseline}</ol></div>
<details class="reference-exact"><summary>Ver composição visual aprovada, sem alterações</summary><img src="{reference}" alt="Composição de referência aprovada dos quatro cards Game da Black" width="1672" height="941"></details></div></section>
<section class="bottom" aria-label="Refinamento inferior em validação"><div class="actions"><a class="action-primary" href="{text(game['cta']['href'])}">{text(game['cta']['rotulo'])}<span aria-hidden="true">↗</span></a><div class="regulations" aria-label="Regulamentos com destinos pendentes">{regulations}</div><a class="offers" href="{text(offers['href'])}">{text(offers['rotulo'])}<span aria-hidden="true">↗</span></a></div>
<section class="faq" aria-labelledby="faq-title"><h2 class="section-title" id="faq-title">{text(data['faq']['titulo'])}</h2><p class="editorial">PENDENTE EDITORIAL · Perguntas e respostas abaixo são placeholders do JSON, somente para validar layout e interação. Não são conteúdo final.</p><div class="faq-items">{faq}</div></section>
<section class="contacts" aria-labelledby="contact-title"><h2 class="section-title" id="contact-title">{text(data['canais']['titulo'])}</h2><div class="contact-grid">{''.join(contacts)}</div></section>
<p class="end-note">Estudo isolado de cards e seção inferior. Hero, prêmios, passos Condor Premia, banner branco, KV principal GDB e footer permanecem fora desta composição. DS v2 ainda não aprovado.</p></section></main>
<script id="canonical-content" type="application/json">{json.dumps(data, ensure_ascii=False).replace('<', chr(92)+'u003c')}</script>
<script>
{child_script}
</script></body></html>'''
page = page.replace('<head>', f'<head><meta name="prototype-revision" content="{revision}">', 1)
page = page.replace('</style>', '.review-bar nav[hidden]{display:none!important}</style>', 1)
page = page.replace('</style>', '''
.action-primary.review-hover{background:#fff39d}.offers.review-hover{color:#fff}
.faq summary.review-hover,.faq summary.review-focus{background:#153258}
[data-interaction-key].review-focus{outline:3px solid var(--focus);outline-offset:4px}
.faq summary.review-focus{outline-offset:-3px}
.contact-card a.review-focus{outline-color:#0e52af;outline-offset:2px}
.comparison-embedded .action-primary:not(.review-hover){background:#ffe86d}
.comparison-embedded .offers:not(.review-hover){color:#82cfff}
.comparison-embedded .faq summary:not(.review-hover):not(.review-focus){background:transparent}
.comparison-embedded [data-interaction-key]:not(.review-focus){outline:none}
</style>''', 1)
(OUT / 'prototipo.html').write_text(page)

index = '''<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Black Friday Condor · Laboratorio DS v2</title><style>
:root{font-family:Arial,system-ui,sans-serif;color-scheme:dark;background:#08090d;color:#f5f7ff}*{box-sizing:border-box}body{margin:0}header{padding:28px max(20px,4vw);border-bottom:1px solid #26374d;background:#10141e}h1{font-size:clamp(24px,3vw,38px);margin:10px 0 12px;letter-spacing:-.03em}p{color:#bbcadd;line-height:1.6;margin:8px 0}.eyebrow{color:#ffe86d;font-size:12px;font-weight:bold;letter-spacing:.12em}.controls{display:flex;flex-wrap:wrap;gap:16px;margin:24px 0 8px;align-items:end}label{display:grid;gap:8px;font-size:13px}select,button{background:#14233b;border:1px solid #587696;color:white;padding:12px;border-radius:8px;font:inherit;min-height:44px}a{color:#82cfff}a:focus-visible,button:focus-visible,select:focus-visible{outline:3px solid #ffe76a;outline-offset:4px}.pair{display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:24px;align-items:start}.pane{min-width:0;border:1px solid #304259;border-radius:12px;overflow:hidden;background:#10141e}.pane-head{padding:16px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}.pane-head h2{font-size:17px;margin:0}.stage{width:100%;position:relative;background:#08090d}.stage iframe{border:0;display:block;position:absolute;left:0;top:0;transform-origin:top left;background:#08090d}.note{padding:0 24px 24px;max-width:1000px}.links{display:flex;flex-wrap:wrap;gap:12px}.links a{padding:10px;border:1px solid #304259;border-radius:8px;text-decoration:none;font-size:13px}code{overflow-wrap:anywhere}details{margin:20px 0;border:1px solid #304259;padding:16px;border-radius:8px}summary{cursor:pointer}.audit{overflow:auto;max-height:360px;white-space:pre-wrap;font-size:12px;line-height:1.6}@media(max-width:900px){.pair{grid-template-columns:1fr;padding:16px}.note{padding-inline:16px}}
</style></head><body><header><div class="eyebrow">FASE 1 · EXPERIMENTO LOCAL · SIN PUBLICACIÓN</div><h1>Un contenido. Dos anchos GDB.</h1><p>Las variantes solo cambian el máximo del contenedor. Radios, glow, tipografía, recursos y copy son idénticos. Los valores siguen pendientes de aprobación.</p><div class="controls"><label>Viewport de la muestra<select id="viewport"><option>390</option><option>768</option><option>1280</option><option selected>1440</option><option>1600</option></select></label><label>Representación<select id="mode"><option value="html">HTML · copy canónico completo</option><option value="approved">Cuatro PNG aprobados · sin alteraciones</option></select></label><button id="toggle-faq" type="button" aria-pressed="false">Abrir FAQ en ambas vistas</button></div><p id="scale-note">Vistas a escala; abrir cada variante para lectura a tamaño real. 1600 px es una vista auxiliar para alcanzar el máximo de 1480 px.</p></header>
<main><div class="pair"><section class="pane"><div class="pane-head"><h2>A · Contenedor máximo 1280 px</h2><a id="open-a" href="prototipo.html?variant=1280" target="_blank" rel="noopener">Abrir A a tamaño real ↗</a></div><div class="stage" id="stage-a"><iframe title="Variante A, máximo 1280 píxeles" src="prototipo.html?variant=1280"></iframe></div></section><section class="pane"><div class="pane-head"><h2>B · Contenedor máximo 1480 px</h2><a id="open-b" href="prototipo.html?variant=1480" target="_blank" rel="noopener">Abrir B a tamaño real ↗</a></div><div class="stage" id="stage-b"><iframe title="Variante B, máximo 1480 píxeles" src="prototipo.html?variant=1480"></iframe></div></section></div>
<div class="note"><p><strong>Alcance:</strong> tutorial GDB, CTA, reglamentos, ofertas, FAQ y contacto. No es una landing final ni una propuesta de cambios al footer o a los bloques protegidos.</p><p>Los PNG aprobados contienen copy resumido. Su función es visual: el modo HTML conserva íntegro el contenido comercial del JSON, incluida “Entre na Trilha da Black” y toda la condición del paso 3.</p><p><a href="comparativa.md">Matriz y resultado de validación</a> · <a href="README.md">Alcance y reproducción</a></p><div class="links" id="view-links"></div><details><summary>Fuente canónica íntegra — solo auditoría, no composición de landing</summary><p>No se completan el certificado ni enlaces pendientes del footer.</p><pre class="audit" id="source-json"></pre></details></div></main><script>
__CONTROLLER_SCRIPT__
</script></body></html>'''
index = index.replace('__CONTROLLER_SCRIPT__', controller_script)
index = index.replace('<head>', f'<head><meta name="prototype-revision" content="{revision}">', 1)
index = index.replace('<pre class="audit" id="source-json"></pre>', '<pre class="audit" id="source-json">' + text(json.dumps(data,ensure_ascii=False,indent=2)) + '</pre>')
parity_tools = '''<section class="parity-tools" aria-label="Comprobación de paridad"><p id="parity-status" role="status" aria-live="polite" data-state="pending">Comprobando paridad de A y B…</p><button id="recheck-parity" type="button">Revalidar paridad</button> <button id="download-parity" type="button">Descargar evidencia JSON</button><details><summary>Ver evidencia del DOM y controles</summary><pre class="audit" id="parity-report"></pre></details><script id="parity-data" type="application/json">null</script></section>'''
index = index.replace('</header>', parity_tools + '</header>', 1)
index = index.replace('</style>', '.pair[data-ready="false"]{opacity:.35;pointer-events:none}.parity-tools{margin-top:20px}.parity-tools p{font-weight:700}.parity-tools [data-state="valid"]{color:#9ce5bb}.parity-tools [data-state="invalid"]{color:#ffb8ac}.parity-tools [data-state="pending"]{color:#ffe86d}</style>', 1)
(OUT / 'index.html').write_text(index)
manifest = {'status': 'experimental-not-approved', 'prototype_revision': revision, 'canonical_source': 'content/landing-content.json', 'canonical_sha256': source_hash, 'assets_sha256': resources, 'variant_maxima': [1280,1480], 'required_viewports': [390,768,1280,1440], 'supplementary_viewport': 1600}
(OUT / 'proveniencia.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print('Generados index.html, prototipo.html y proveniencia.json; fuente canónica y assets intactos.')

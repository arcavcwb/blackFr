#!/usr/bin/env python3
"""Extensión aislada. Lee baseline A/B y JSON; solo escribe dentro de abc/."""
from pathlib import Path
import hashlib
import html
import json
import re

HERE=Path(__file__).resolve().parent
BASE=HERE.parent
ROOT=HERE.parents[2]
canonical=(ROOT/'content/landing-content.json').read_bytes()
source=(BASE/'prototipo.html').read_text()
assert json.loads(re.search(r'<script id="canonical-content" type="application/json">(.*?)</script>',source,re.S).group(1))==json.loads(canonical)
child=(HERE/'muestra.js').read_text()
controller=(HERE/'controlador.js').read_text()
css=(HERE/'variante-c.css').read_text()
assert all('.variant-c' in selector for selector in re.findall(r'([^{}]+)\{',css) if not selector.strip().startswith(('/*','@')))
sha=lambda value:hashlib.sha256(value).hexdigest()
revision=sha(Path(__file__).read_bytes()+child.encode()+controller.encode()+css.encode()+canonical)[:16]
baseline_style=re.search(r'<style>(.*?)</style>',source,re.S).group(1)
spec={'status':'proposal-not-approved','maxWidth':1400,'bodyFontPx':15,'bodyLineHeight':1.4,'baselineStylesheetSha256':sha(baseline_style.encode()),'cssSha256':sha(css.encode()),'allowedComputedChanges':{'.step':['padding','borderWidth','borderRadius','boxShadow'],'.step-number':['fontSize','borderRadius','boxShadow'],'.step h2':['fontSize','fontWeight','lineHeight','padding','letterSpacing'],'.step-copy':['fontSize','lineHeight'],'.bonus':['fontSize','fontWeight','lineHeight','padding','borderWidth']}}

page=source[:source.rindex('<script>')]+'<script>'+child+'</script></body></html>'
page=re.sub(r'(<meta name="prototype-revision" content=")[^"]+',lambda m:m.group(1)+revision,page)
page=page.replace('</head>','<style id="variant-c-style">'+css+'</style></head>')
page=page.replace('<a href="?variant=1480" data-variant="1480">B · 1480 px</a>','<a href="?variant=1480" data-variant="1480">B · 1480 px</a><a href="?variant=1400" data-variant="1400">C · 1400 px</a>')
(HERE/'prototipo.html').write_text(page)

index=(BASE/'index.html').read_text()
index=index[:index.rindex('<script>')]+'<script>'+controller+'</script></body></html>'
index=re.sub(r'(<meta name="prototype-revision" content=")[^"]+',lambda m:m.group(1)+revision,index)
index=index.replace('Un contenido. Dos anchos GDB.','Un contenido. Tres variantes GDB.')
index=index.replace('Las variantes solo cambian el máximo del contenedor. Radios, glow, tipografía, recursos y copy son idénticos. Los valores siguen pendientes de aprobación.','A/B conservan el baseline. C prueba 1400 px, cápsulas compactas, cuerpo de 15 px y glow más fino. Contenido, recursos y controles deben coincidir en las tres vistas. Propuesta sin aprobación de tokens.')
index=index.replace('FASE 1 · EXPERIMENTO LOCAL','FASE 1B · VARIANTE C · EXPERIMENTO LOCAL')
index=index.replace('en ambas vistas','en las tres vistas')
index=index.replace('Comprobando paridad de A y B…','Comprobando paridad de A/B/C…')
index=index.replace('grid-template-columns:1fr 1fr;gap:20px','grid-template-columns:repeat(3,minmax(0,1fr));gap:16px')
c_panel='''<section class="pane"><div class="pane-head"><h2>C · Híbrida, máximo 1400 px</h2><a id="open-c" href="prototipo.html?variant=1400" target="_blank" rel="noopener">Abrir C a tamaño real ↗</a></div><div class="stage" id="stage-c"><iframe title="Variante C, máximo 1400 píxeles" src="prototipo.html?variant=1400"></iframe></div></section>'''
index=index.replace('</section></div>\n<div class="note">','</section>'+c_panel+'</div>\n<div class="note">')
index=index.replace('href="comparativa.md"','href="matriz-abc.md"').replace('href="README.md"','href="README.md"')
index=index.replace('<script id="parity-data"','<script id="c-spec" type="application/json">'+json.dumps(spec)+'</script><script id="parity-data"')
index=index.replace('<div class="links" id="view-links">','<p><a href="../index.html">Baseline A/B intacto</a> · <a href="capturas.html" target="_blank">Guardar captura de revisión</a></p><div class="links" id="view-links">')
(HERE/'index.html').write_text(index)
baseline={str(path.relative_to(ROOT)):sha(path.read_bytes()) for path in BASE.iterdir() if path.is_file()}
(HERE/'procedencia.json').write_text(json.dumps({'status':'proposal-not-approved','revision':revision,'canonicalSha256':sha(canonical),'baselineFiles':baseline,'specC':spec},ensure_ascii=False,indent=2)+'\n')
print('Extensión ABC generada:',revision,'; baseline A/B sin escritura')

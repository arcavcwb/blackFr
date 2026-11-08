# Fase 1B — registro del experimento y C aprobada

**Actualización documental, 08/11/2026: C aprobada visualmente por el usuario. DS v2 completo pendiente.** A/B se conservan como históricos. El estado inicial de hipótesis de los HTML, comentarios y evidencias permanece como registro del experimento; no es una solicitud vigente de aprobación de C. Véanse [DS-018](../../../docs/DESIGN_DECISIONS.md) y [contrato visual v2](../../../design-system/v2/DESIGN_SYSTEM.md). No se regeneraron muestras ni evidencia.

## Acceso

- Laboratorio nuevo: `http://localhost:8766/abc/index.html`.
- Baseline A/B intacto: `http://localhost:8766/index.html`.
- Galería: `http://localhost:8766/abc/galeria.html`.
- C autónoma: `http://localhost:8766/abc/prototipo.html?variant=1400`.

Se reutiliza el servidor local existente. No se instala Tailwind, no se publica, no se integra la landing final y no se toca la landing aprobada de 4321.

Todos los archivos nuevos de implementación viven en esta subcarpeta. El HTML de A/B, su generador, controlador y evidencias anteriores permanecen sin modificaciones. La extensión lee ese baseline y comprueba que su JSON embebido coincide con `content/landing-content.json` antes de generar las muestras.

## Contrato de comparación

Las tres muestras comparten modo HTML/PNG, ancho y alto de viewport, escala, FAQ, composición desplegable y estados visuales de interacción. El foco real permanece en el control activo. En A/B se conservan todas las propiedades visuales del baseline y sus máximos 1280/1480; C tiene máximo 1400 y los cambios explícitos de `variante-c.css`.

La paridad exige igualdad de DOM comercial, texto visible, imágenes y visibilidad, condiciones, enlaces y controles. No exige igualdad de estilos en C: solo permite los cambios declarados. Un cambio CSS fuera de la lista hace fallar el indicador. En modo PNG, los cuatro cards originales no reciben el CSS de C; solo cambia el máximo de contenedor de cada muestra.

El modo PNG sirve como referencia visual, no como sustituto del texto canónico. Se mantienen «Entre na Trilha da Black», los cuatro títulos/descripciones y toda la condición del paso 3. El bonus se separa visualmente mediante el mismo markup del baseline, conservando literalmente el texto y los énfasis `strong` procedentes del JSON.

## Archivos y reproducción

- `generar.py`: genera únicamente esta extensión, leyendo el baseline y el JSON canónico.
- `variante-c.css`: totalidad del tratamiento visual exclusivo de C; selectores limitados a `.variant-c:not(.references-mode) .html-panel`.
- `controlador.js` / `muestra.js`: extensión del protocolo de paridad a tres vistas; no reemplazan los archivos originales de A/B.
- `procedencia.json`: hashes del baseline, contenido y CSS; lista de diferencias visuales admitidas.
- `evidencia-abc.json`: exportación real del navegador con 15 estados verificados y cobertura HTML/PNG en 390/768/1280/1440/1600 px.
- `matriz-abc.md`: medidas, observaciones, cambios y pendientes.
- `galeria.html`, `capturas/` y `capturas.json`: seis capturas JPEG, tamaños, viewports CSS y hashes.
- `capturas.html`: utilidad local usada para guardar los bytes originales de las capturas, sin procesamiento de píxeles.

Desde la raíz del repositorio:

```sh
python3 prototypes/ds-v2-comparacion/abc/generar.py
```

Si no hay servidor activo, iniciar desde esa misma raíz:

```sh
python3 -m http.server 8766 --bind 127.0.0.1 --directory prototypes/ds-v2-comparacion
```

Las fuentes JS y el CSS se embeben en los HTML nuevos. No hay CDN ni dependencias de red para renderizar las imágenes o estilos. Para repetir la auditoría de hashes, usar HTTP local y comprobar el indicador verde antes de exportar. Una nueva generación produce una revisión nueva; la evidencia guardada corresponde a la revisión indicada dentro de su JSON.

## Límites

15 px / 21 px de cuerpo y el glow fino forman parte de C aprobada visualmente; su promoción a reglas globales del DS no queda aprobada automáticamente. No se ha hecho una prueba con usuarios ni se declara aprobado el DS completo. La validación técnica adicional en dispositivos/DPR/zoom continúa. FAQ placeholder y destinos no confirmados siguen señalizados. No se recrean logos ni se alteran archivos gráficos o contenido comercial.

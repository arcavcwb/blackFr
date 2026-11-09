# F1 — QA de integración estática

**Tarea:** F1.1.T8
**Fecha:** 09/11/2026
**Objeto revisado:** ruta estática generada `dist/black-friday/index.html` tras la composición de F1.1.T7.
**Alcance:** build, contenido, estructura, accesibilidad estática, enlaces y reglas responsive. Esta revisión no publica la campaña ni convierte los pendientes editoriales en datos definitivos.

## Resultado

La integración genera correctamente la landing de Astro y las comprobaciones de regresión de las siete áreas pasan. Tras el rechazo de revisión por cobertura, la prueba de integración de la página completa ahora abre el build en Chrome headless y ejecuta las interacciones nativas del menú móvil; no se limita a comparar el código fuente. No se detectó un fallo comprobado que requiriese corrección de comportamiento o contenido.

| Área | Resultado | Evidencia |
|---|---|---|
| Build estático | Conforme | `pnpm build` finaliza con salida 0 y genera `/black-friday/index.html`. |
| Regresión por feature y página | Conforme | Se ejecutaron y aprobaron las siete suites `*.integration.test.mjs`: layout, hero/video, Condor Premia/Z-ON, Game da Black, datos de pasos, bloque inferior y página Black Friday. La última compila la ruta y verifica navegación desktop/móvil/sin JS, destinos de ancla, diálogo, salto al contenido y vídeo/FAQ nativos. Su segunda prueba abre el build en Chrome headless y comprueba apertura/cierre del diálogo, navegación de ancla, actualización de historial, foco en el destino y cierre al cruzar a 768 px. |
| Estructura y contenido | Conforme | En el HTML generado hay un único `h1`; se conservan las secciones canónicas, los cuatro pasos Condor Premia, los cuatro pasos GDB y el bonus condicional del paso 3. |
| Enlaces locales | Conforme | Las 16 referencias de ancla generadas apuntan a IDs existentes; no hay anclas locales sin destino. |
| Controles sin JS | Conforme por estructura y evidencia previa | La navegación alternativa está en `noscript`, el vídeo conserva controles nativos, FAQ usa cuatro pares `details/summary` y los reglamentos sin URL se renderizan como texto, no como enlaces inventados. |
| Teclado y foco | Conforme por prueba de integración, inspección y evidencia previa | El salto al contenido, `:focus-visible`, botones con nombre accesible, diálogo de menú y sus destinos declarados están presentes. Chrome headless verifica apertura/cierre, cierre al pasar a desktop, navegación de ancla, actualización del historial y foco del destino; T7 verificó apertura/cierre con Escape, restauración de foco y salto a sección. |
| Responsive GDB | Conforme por reglas y evidencia previa | La grid es 1 columna bajo 640 px, 2 desde 640 px y 4 desde 1280 px; contenedor y elementos usan `min-width: 0`. T7 midió 390/768/1440 sin overflow. |
| Pendientes editoriales | Conservados como pendientes | No se emite OG inexistente; reglamentos sin destino permanecen como texto. FAQ placeholder, destinos editoriales, certificado/footer y OG no se declaran publicados. |

## Matriz de viewports

| Ancho | Resultado | Método y límite |
|---:|---|---|
| 390 px | Conforme | Evidencia visual y medición DOM de T7: una tarjeta GDB por fila, sin overflow y contenido disponible sin JS. |
| 768 px | Conforme | Evidencia visual y medición DOM de T7: dos tarjetas GDB por fila, sin overflow. |
| 1280 px | Conforme estático | La media query `min-width: 1280px` declara cuatro columnas `minmax(0, 1fr)` y padding lateral de 32 px. No fue posible repetir captura en este sandbox. |
| 1440 px | Conforme | Evidencia visual y medición DOM de T7: cuatro tarjetas GDB por fila, sin overflow. |
| 1600 px | Conforme estático | Aplica la misma grid de cuatro columnas; el contenedor GDB se limita a `max-width: 1400px`. No fue posible repetir captura en este sandbox. |

La distinción entre “evidencia visual” y “conforme estático” es intencional: en esta ejecución, los intentos de servir el build local fallaron antes de escuchar por la restricción del sandbox (`PermissionError: [Errno 1] Operation not permitted` al hacer bind). Por ello no se afirma una nueva captura visual de 1280 o 1600 px. La evidencia visual previa se conserva en `/tmp/f1-1-t7-qa/review.md` durante esta sesión; no sustituye una revisión humana de publicación.

## Accesibilidad e interacción revisadas

- Documento `pt-BR`, `meta viewport`, título y descripción presentes en el build.
- Un único encabezado principal asociado al hero; títulos de sección asociados mediante `aria-labelledby`.
- Imágenes decorativas marcadas como tales y logos/medios funcionales con texto alternativo; vídeo con controles nativos y alternativa de enlace en su contenido.
- FAQ implementada con controles nativos `details/summary`, por tanto disponible sin JavaScript.
- Menú móvil con botón de 48 px, `aria-expanded`, `aria-controls`, diálogo etiquetado, botón de cierre y navegación alternativa dentro de `noscript`.
- Estilo global de foco visible de 3 px y preferencia de movimiento reducido declarada globalmente.

## Diferencias, límites y seguimiento

1. `pnpm astro check` no completa: solicita interactivamente `@astrojs/check` y termina en el fallo nativo preexistente de `@emnapi` (`bridge.deleteEnv is not a function`) con Node 24.12.0. No se instalaron ni modificaron dependencias. `pnpm build` y las siete suites sí pasan.
2. La política de este entorno impide enlazar un servidor local; por eso la comprobación de layout de 1280/1600 queda limitada al HTML/CSS generado. Antes de publicación, repetir la matriz completa en un navegador que pueda servir la ruta integrada, incluyendo zoom, motores y DPR según `F0_READINESS.md`.
3. Los datos editoriales pendientes siguen pendientes: FAQ de placeholder, URLs de reglamentos y enlaces señalados, certificado del footer y imagen OG. No se debe interpretar esta QA como aprobación editorial/legal ni como publicación.

## Comandos ejecutados

```sh
pnpm build
for f in $(rg --files src -g '*.integration.test.mjs' | sort); do node "$f"; done
pnpm astro check
```

El build y las siete suites finalizaron correctamente. La suite de página usa el Chrome instalado por DevTools Protocol mediante `--remote-debugging-pipe`, sin dependencias adicionales ni puerto local. El último comando reproduce la limitación técnica indicada arriba.

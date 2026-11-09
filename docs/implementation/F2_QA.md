# F2 — QA final de motion y rendimiento

**Tarea:** F2.1.T5  
**Fecha:** 09/11/2026  
**Objeto revisado:** landing integrada generada en `dist/black-friday/index.html` y módulos de motion de Hero, Condor Premia, Game da Black y bloque inferior.  
**Alcance:** regresión automatizada, recuperación, accesibilidad, build, navegación y revisión estática de rendimiento. Este informe no publica la landing, no aprueba unilateralmente el motion ni sustituye una revisión visual humana de las secuencias.

## Resultado ejecutivo

Los contratos automatizados disponibles cierran sin fallos: **32/32 pruebas** y `pnpm build` aprobaron. La prueba de navegador sobre la preview local también aprobó la apertura/cierre del menú, anclas, historial, foco y el cambio a desktop. Las entradas decorativas respetan el estado base visible, se cancelan frente a foco, ancla y reducción de movimiento, y disponen de recuperación en los fallos inyectados cubiertos por las suites.

No hay evidencia nueva de una revisión visual cuadro a cuadro de Hero/KV ni de métricas de campo o laboratorio (CLS/LCP/INP/FPS) en un móvil real. Esos puntos permanecen pendientes de aprobación antes de publicación.

| Área | Estado | Evidencia verificable |
|---|---|---|
| Build Astro | Conforme | `pnpm build` finaliza con salida 0 y genera las rutas estáticas, incluida `/black-friday/`. |
| Regresión motion y contenido | Conforme | Las 32 pruebas `*.test.mjs` pasan tras ejecutar las suites unitarias, de integración y de navegador. |
| Estado final y fallo de JavaScript | Conforme para los casos inyectados | Las pruebas cubren fallo de `watch`/animación, registro parcial de tarjetas/bloque inferior, fallo de la secuencia Hero y fallo/limpieza del KV. Los manejadores revierten o preservan el estado final visible. |
| `prefers-reduced-motion` | Conforme para carga y cambio cubiertos | `registerReveal` no inicia en modo reducido, cancela una entrada activa al cambiar la preferencia y no la reinicia tras cancelación; Hero también evita preparar capas con la preferencia activa. La hoja global elimina duraciones y scroll suave decorativos. |
| Foco y anclas | Conforme | Foco en un target o navegación real por hash cancela la entrada y deja el contenido disponible; clicks cancelados o modificados no la interrumpen. La prueba de navegador confirma foco en `#sobre`, actualización de historial y cierre del diálogo. |
| Responsive de motion | Conforme por contrato automatizado | Las tarjetas GDB cambian entre cuatro triggers independientes y la secuencia agrupada al cruzar 1280 px, desmontando los registros previos. La retícula visual sigue siendo 1/2/4 por el CSS de integración. |
| Overflow y CLS | Sin regresión comprobada; no medido en esta ejecución | El motion usa wrappers y no introduce cambios de flujo intencionales. La evidencia estática previa de F1 conserva `min-width: 0` y no-overflow para 390/768/1440, pero esta tarea no generó una nueva medición DOM por viewport ni una traza de CLS. |
| Rendimiento | Informativo; pendiente de presupuesto/perfil | El JS de cliente generado mide 121 624 B y CSS 34 817 B sin comprimir. No hay presupuesto numérico aprobado ni perfil de dispositivos/métricas para calificarlo como aprobado. |

## Comportamiento de motion comprobado

- El HTML/CSS parte de la composición final visible: no se prepara `opacity`, `visibility` ni controles inaccesibles antes de la entrada. Si JS no carga, las secciones permanecen utilizables.
- `registerReveal` activa por el borde superior del target en el 85 % del viewport, termina una sola vez y revierte el contexto temporal de la animación. Si el target ya está visible, contiene el foco o corresponde a la ancla actual, no inicia una entrada.
- Hero espera únicamente sus tres PNG críticos; el vídeo queda independiente. Ante un fallo de timeline se revierte el contexto y se informa el error sin dejar las capas alteradas.
- Premia conserva el compuesto suministrado en desktop y las tres piezas suministradas en móvil. Sus premios y pasos se registran de forma independiente: un error de un grupo no vuelve inaccesible al otro.
- El KV GDB anima exclusivamente el wrapper de `gdb-key-visual-v03.png`; no se ensamblan ni fabrican capas `00–09`. Ante error restaura el atributo `style` previo.
- Las tarjetas GDB no cambian copy, assets ni retícula. En escritorio usan una secuencia ordenada; en modo compacto cada tarjeta dispone de disparador independiente. CTA/contactos se registran sin animar la altura del FAQ nativo.
- La implementación no configura `scrub`, `pin` ni filtros/blur animados en los módulos de motion de la aplicación. Las coincidencias de esos identificadores dentro del bundle corresponden a la biblioteca GSAP empaquetada, no a opciones activadas por la landing.

## Verificaciones ejecutadas

```sh
for f in $(rg --files src -g '*.test.mjs' | sort); do node "$f"; done
pnpm build
node src/pages/black-friday.integration.test.mjs
pnpm astro check
```

Resultado de las pruebas:

- **32/32** aprobadas: infraestructura de reveal (7), Hero (3 de motion + integración), Condor Premia (3 de motion + integración), Game da Black/KV/tarjetas (9 de motion + 2 integraciones), bloque inferior (2 de motion + integración), layout (integración) y página completa (2, incluida interacción real en Chrome headless).
- La primera ejecución de la prueba de preview no pudo abrir `127.0.0.1` dentro del sandbox (`EPERM`). Se repitió fuera de esa restricción y las dos pruebas de página aprobaron; no fue un defecto de la landing.
- `pnpm astro check` **no completa**. Aunque `@astrojs/check` figura en `devDependencies`, Astro solicita confirmación de instalación y el proceso termina en el fallo preexistente de `@emnapi` con Node `24.12.0` (`bridge.deleteEnv is not a function`). No se alteraron dependencias durante este QA. El build y las pruebas ejecutables sí aprobaron.

## Tamaños observados del build

Las cifras son tamaños de archivo generados, sin compresión HTTP; no son una medición de transferencia ni de rendimiento percibido.

| Recurso | Tamaño |
|---|---:|
| Script de página y motion | 121 624 B |
| Hoja CSS de Black Friday | 34 817 B |
| Hero: título WebP | 106 478 B |
| Hero: fondo WebP | 77 886 B |
| Hero: presentadora WebP | 72 958 B |
| Assets WebP restantes de GDB/Condor | 1 832–13 606 B cada uno |

Los tres recursos del hero conservan dimensiones explícitas y se optimizan en el build. Esta observación reduce el riesgo de salto por imagen, pero **no sustituye una medición de CLS**. No se añadieron dependencias de cliente fuera de GSAP/ScrollTrigger ya integrados.

## Límites y pendientes antes de publicar

1. Realizar revisión visual de las trayectorias y del estado final a 390, 768, 1280, 1440 y 1600 px, con DPR/zoom y navegadores representativos. En particular, Hero y KV requieren aprobación visual en movimiento independiente de sus composiciones estáticas.
2. Establecer un presupuesto de JS, imágenes y métricas móviles; perfilar CLS/LCP/INP/FPS en un dispositivo o emulación acordada. No hay base para declarar rendimiento aprobado solo con tamaños sin comprimir.
3. Mantener el KV como compuesto hasta contar con capas reales, correspondencia, orden y recomposición aprobada. El ensamblaje M07 no está habilitado.
4. Resolver el entorno de `astro check` (confirmación de paquete/runtime `@emnapi`) sin tratar este informe como autorización para actualizar dependencias.
5. Los pendientes editoriales y legales de F1 continúan: FAQ placeholder, destinos no confirmados, certificado/footer y OG. Esta QA no los publica ni los valida.

## Conclusión

La implementación supera los controles automatizados disponibles de motion, accesibilidad de interacción y build, y mantiene la recuperación progresiva prevista. Queda lista para la revisión visual y de rendimiento con presupuesto acordado; **no queda aprobada para publicación ni para considerar definitivos los parámetros de motion**.

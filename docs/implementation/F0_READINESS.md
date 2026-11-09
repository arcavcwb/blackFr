# F0 — Preparación técnica para Astro

**Tarea:** F0.1.T3 · **Fecha:** 08/11/2026 · **Base:** `d75bff291f416d8c21d59c74b69c83876980bdbe`.

**Resultado:** hay scaffold compilable y dependencias objetivo disponibles para preparar F1. No hay todavía una landing integrada ni un GO incondicional de calidad: Tailwind está instalado pero desconectado, y el comprobador Astro falla al cargar una dependencia en este entorno. F1 debe resolver la conexión de estilos y el gate de tipos; responsive, accesibilidad y fidelidad se comprobarán sobre la integración. Este informe completa la evaluación F0, sin aprobar el DS v2 global, parámetros de motion ni publicación.

## 1. Alcance y evidencias

Se leyó `specs/f0-preparacion.md#F0.1.T3`, la documentación obligatoria de `AGENTS.md`, [IMPLEMENTATION_ENTRY](IMPLEMENTATION_ENTRY.md), [auditoría T1](F0_BASELINE_AUDIT.md), [revisión T2](F0_DESIGN_REVIEW.md), [DS v2](../../design-system/v2/DESIGN_SYSTEM.md), [Motion v1](../motion/v1/MOTION_DESIGN.md) y [tareas F1/F2](../../specs/f1-f2-implementacion.md). Se inspeccionaron configuración, manifiesto de paquetes, lockfile, dependencias locales y código activo de `src/`; `references/archive/` no es implementación vigente.

Solo se entrega este Markdown. No se instalan paquetes ni se implementan funcionalidades, estilos, rutas o animaciones. Los resultados de compilación siguientes corresponden a una copia temporal del scaffold de este worktree; no se abrió ni modificó la referencia del puerto 4321 y no se realizó revisión visual nueva.

## 2. Contraste con IMPLEMENTATION_ENTRY.md

| Contrato / afirmación anterior | Estado comprobado en este checkout | Consecuencia para F1 |
|---|---|---|
| Astro `^7.4.7`, Node `>=22.23.4`, TypeScript estricto | Vigente: `package.json`, `pnpm-lock.yaml` y `tsconfig.json`; ejecución con Node 24.12.0 y pnpm 10.28.0. | Mantener toolchain y lockfile; no recrear el proyecto ni instalar una versión mayor distinta. |
| Tailwind y GSAP no declarados / no instalados | **Desactualizado:** Tailwind y plugin Vite 4.3.5, GSAP 3.15.1, TypeScript 5.9.3 y `@astrojs/check` 0.9.12 ya declarados, fijados e instalados. | F1.1.T1 pide configurar Tailwind 4 **ya instalado**. La disponibilidad de GSAP no aprueba sus secuencias. No reinstalar por seguir el texto antiguo. |
| No se ejecutó build en la consolidación | Sigue describiendo aquella consolidación. Esta evaluación sí compiló el scaffold copiado, con salida 0. | Evidencia nueva limitada a starter y preview; repetir sobre la landing integrada en F1.1.T8. |
| `src/pages/index.astro` y preview no son landing final | Confirmado: starter en inglés con título «Astro», preview inferior en portugués; `src/pages/black-friday.astro` ausente. | F1.1.T7 compone la ruta final, idioma, metadatos, navegación y orden canónico. No publicar starter/preview como campaña. |
| Primitivas, layout y estilos disponibles como estructura | `src/components/ui/`, `src/layouts/`, `src/styles/` contienen README, sin implementación base. `black-friday` y `condor-premia` también son estructura. | F1.1.T1 prepara estilos/layout; T3/T4 integran piezas originales. No asumir componentes implementados por existir la carpeta. |
| Rutas propuestas `src/styles/tokens.css`, motion por feature, feature `black-friday` | No hay tokens ejecutables ni módulos motion. El spec posterior asigna el hero a `src/features/black-friday-hero/`, Z-ON a `src/features/z-on/` y la infraestructura a `src/features/motion/`. | Usar el alcance del spec de cada tarea; evitar duplicar implementaciones por la diferencia de nombres con el documento de entrada. |
| Props canónicas → HTML completo, una tarjeta y mejora progresiva | Hay `Props`, tipos, `Image`, una tarjeta reutilizada mediante `map`, lista `ol` y FAQ nativo. Persisten datos duplicados y diferencias comerciales/visuales de T1/T2. | Reutilización técnica parcial; no acredita paridad con C ni con contenido canónico. Conciliar en T2/T5/T6. |
| Tailwind objetivo sin integración | Confirmada la falta de integración: `astro.config.mjs` usa `defineConfig({})`; no hay import del plugin, `@import "tailwindcss"` ni hoja global importada desde página/layout. | Es un trabajo técnico de F1.1.T1. Las clases existentes se emiten al HTML pero todavía no producen estilos. |
| KV compuesto; recursos web y decisiones editoriales pendientes | Se conserva el KV único `assets/originals/game-da-black/gdb-key-visual-v03.png`. T1 registra MOV disponible, MP4/OG faltantes y pendientes legales. | No fabricar capas 00–09, medios ni destinos. Separar la integración estática del ensamblaje motion y de publicación. |

La frase de `AGENTS.md` sobre ausencia de scaffold y las referencias antiguas a Tailwind ausente en contexto/arquitectura no reflejan ya los paquetes presentes. Se documenta la diferencia sin editar esos contratos en esta tarea.

## 3. Dependencias: declaración, instalación e integración

| Paquete | Rango en package.json | Versión lockfile / instalación local | Evaluación |
|---|---|---|---|
| `astro` | `^7.4.7` | 7.4.7 | Build estático del scaffold comprobado. Engine del paquete: Node `>=22.23.4`; Node 24.12.0 satisface el requisito declarado. |
| `tailwindcss` | `^4.3.5` | 4.3.5 | Instalado, sin CSS generado. No se encontró `@astrojs/tailwind` ni Tailwind 3 en el lockfile. |
| `@tailwindcss/vite` | `^4.3.5` | 4.3.5 | Importación del módulo correcta en Node. Peer admite Vite 5.2/6/7/8; árbol local resuelve Vite 8.3.6, compartido con Astro. Integración aún sin probar. |
| `typescript` | `^5.9.3` | 5.9.3 | `pnpm exec tsc --version` correcto; `tsconfig.json` extiende `astro/tsconfigs/strict`. Esto no prueba tipos de componentes Astro. |
| `@astrojs/check` | `^0.9.12` | 0.9.12 | Instalado; peer admite TS 5/6. Su carga falla en el entorno actual; ver evidencia siguiente. |
| `gsap` | `^3.15.1` | 3.15.1 | Importaciones Node de `gsap` y `gsap/ScrollTrigger` correctas; no hay uso/import de GSAP en `src/`. No se ha probado ejecución de navegador ni ciclo de vida. |

Comprobaciones: `pnpm list --depth 0`, lectura de `node_modules/<paquete>/package.json`, importador raíz de `pnpm-lock.yaml`, `pnpm why vite`, `pnpm why @emnapi/runtime` e importaciones aisladas de módulos. No se hizo instalación limpia ni se comprobó descarga reproducible de registro; la coincidencia declarada/lock/instalada no sustituye ese gate.

**Integración prevista, sin ejecutarla aquí:** configurar `@tailwindcss/vite` en `vite.plugins`, crear la hoja con `@import "tailwindcss"` e importarla desde el layout/página de campaña. Evitar que Preflight o estilos globales afecten al footer o a piezas protegidas. Este flujo corresponde a la [guía oficial Tailwind para Astro](https://tailwindcss.com/docs/installation/framework-guides/astro). No usar la integración de Tailwind 3 ni añadir frameworks cliente.

Para tipos, ejecutar `pnpm exec astro check` además de `pnpm build`: el build no sustituye la comprobación `.astro`/`.ts`, según la [documentación oficial de Astro](https://docs.astro.build/en/guides/typescript/#type-checking). ScrollTrigger se importa y registra explícitamente en el cliente cuando se autorice F2; está separado del Core según su [documentación oficial](https://gsap.com/docs/v3/Plugins/ScrollTrigger/). No cargarlo en F1 solo por estar instalado.

## 4. Verificaciones ejecutadas y límites

Para limitar las escrituras al informe, se copiaron sin cambios `src/`, `public/`, `package.json`, `pnpm-lock.yaml`, `astro.config.mjs` y `tsconfig.json` a `/tmp/black-friday-f0-t3-ccp5iect/`. Se enlazaron los paquetes ya instalados en un `node_modules` temporal; caches y salidas de Astro quedaron en esa copia. Se ejecutó el CLI Astro local con ese directorio de trabajo, `CI=true` y `ASTRO_TELEMETRY_DISABLED=1`; no se permitió instalación automática. Equivalentes funcionales: `pnpm build` y `pnpm exec astro check` dentro de esa copia.

| Verificación | Resultado observado | Lo que permite afirmar |
|---|---|---|
| Build de scaffold | Salida 0; dos páginas: `/` y `/black-friday-bottom-preview/`; cinco imágenes WebP generadas. Log temporal `build.log`. | Astro y procesamiento de las imágenes importadas funcionan para los archivos activos copiados. No se compiló una landing que todavía no existe. |
| Inspección de salida de preview | Cero archivos `.css` en `dist`; cero etiquetas `style` y cero enlaces stylesheet; un `ol`, cuatro `details`, cero scripts. | HTML estático generado; Tailwind desconectado. No acredita estilo, responsive, contraste ni comportamiento de teclado en navegador. |
| Astro check | Salida 1 antes de analizar archivos; mensaje de dependencia requerida pese a estar instalada. Log temporal `check.log`. | Gate de tipos **no superado**; no es un diagnóstico de errores del código de campaña. |
| Importación directa de `@astrojs/check` desde el worktree real | `TypeError: this.bridge.setLastError is not a function`; al salir, `this.bridge.deleteEnv is not a function`, en `@emnapi/runtime@2.0.0-beta.2`. | El fallo también se reproduce fuera de la copia; no se debe concluir que falta instalar el paquete. |
| Inspección de cadena y CLI | `@astrojs/check` → `@astrojs/language-server@2.17.3` → `@astrojs/astro2tsx@0.1.3` → `@napi-rs/wasm-runtime@1.2.4` → peer `@emnapi/runtime@2.0.0-beta.2`. `astro/dist/cli/install-package.js` captura cualquier fallo de import y lo presenta como dependencia requerida. | Evidencia de fallo al cargar la cadena WASM en este entorno. Causa raíz y remedio pendientes; no se atribuye unilateralmente incompatibilidad a Astro 7 o Node 24. |

**Acción técnica previa a cerrar F1:** reproducir el fallo de checker en el entorno de validación, revisar la resolución WASM/nativa y el árbol fijado, aplicar una corrección autorizada y volver a ejecutar `astro check` sin errores. No reinstalar a ciegas ni usar el build exitoso para omitir tipos. Cualquier cambio de manifiesto, lockfile o `tsconfig.json` requiere incorporarlo al alcance de la tarea que lo resuelva; esta evaluación no los modifica.

La copia no incluye archivos históricos de `references/archive/`. El checker falló antes de recorrer archivos; por ello no valida ni el ámbito activo ni el checkout completo. El `include: [".astro/types.d.ts", "**/*"]` actual puede incorporar los `.ts`/`.astro` archivados al ejecutar checks en el repo entero. Definir explícitamente el ámbito de validación del código activo en la tarea de infraestructura, manteniendo el archivo histórico intacto; no arreglar esos ejemplos como si fueran producto.

No se ejecutó servidor, navegador, perfil de rendimiento ni pruebas visuales/de accesibilidad. Los logs y `dist` de `/tmp` son evidencia efímera, no artefactos de entrega. La huella actual de `content/landing-content.json` es `1c8a6b09670a4bb4b7ec29a3a1cc7696b8c7e7a972e734ff03da407455e3d3cb`; la integridad de assets auditada por T1 sigue siendo la referencia para las tareas siguientes.

## 5. Checklist para entrada y cierre de F1

Las casillas completadas son hechos verificados. Las restantes son condiciones futuras; los gates de salida no se exigen como si la landing ya existiera antes de comenzar F1.

### G0 — Entrada a integración estática

- [x] Identidad del repo y revisión fijadas; T1/T2 y contratos disponibles; fuente editorial `content/landing-content.json` identificada.
- [x] C aprobada visualmente, refinamiento inferior aprobado, cuatro pasos y freeze reconocidos; no reabrir elección A/B/C.
- [x] Dependencias objetivo verificadas y build limitado del scaffold correcto; no hace falta instalar Tailwind/GSAP para iniciar configuración.
- [ ] Encargar la ejecución de F1 con sus archivos delimitados y ratificar el alcance del mapeo DS v2: valores C/UI aprobados dentro de sus features; familia/roles/nombres globales siguen pendientes de diseño/producto.
- [ ] Resolver o asignar explícitamente la remediación del checker antes de aceptar F1.1.T8; configurar Tailwind en F1.1.T1, sin declarar paridad visual por compilar.
- [ ] Fijar servidor propio de este proyecto con puerto libre distinto de 4321 y ruta de revisión; puerto candidato 4322, sujeto a disponibilidad. El sitio original permanece solo de lectura.
- [ ] Registrar baseline de JSON/originales/imports antes de integrar y plan de comparación con aprobados. Reutilizar la auditoría T1 sin asumir que nombres de archivo equivalen a correspondencia visual.

**Salida de G0:** inicio delimitado de F1 estático cuando se asigne su tarea y se ratifique el alcance pendiente. Los problemas técnicos identificados son trabajo de integración/remediación; F0.1.T3 queda completada con este diagnóstico. Motion, aprobaciones globales y publicación siguen sujetos a sus gates separados.

### G1 — Contenido e integridad (T2–T7; cierre T8)

- [ ] Adaptador tipado desde JSON como única fuente editorial, sin segunda copia manual en TS; conservar títulos, cuerpos, énfasis, destinos confirmados y orden de secciones.
- [ ] Cuatro pasos GDB, «Entre na Trilha da Black» y cadastro completo/actualizado en paso 1; ofertas activadas antes de compra; tres productos **diferentes**, tienda Condor, CPF y un número en paso 3; cinco productos solo pueden dar otro número **cuando haya bonus**.
- [ ] Mantener diferenciadas las reglas de Condor Premia, GDB y beneficio Z-ON; preservar premios, período y condiciones del footer. Retener «Aqui a economia não para.» y placeholders íntegros hasta validación editorial.
- [ ] Resolver discrepancias T1/T2 sin inventar copy, quinto paso, destinos ni certificado; pendientes señalizados solo en entorno de revisión, sin acciones vacías o ficticias.
- [ ] Preservar hero de tres capas, video, tres premios, cuatro pasos Premia, aviso blanco, KV compuesto y logos; hashes de originales/JSON intactos. Derivados autorizados solo en `assets/optimized/`, con trazabilidad.
- [ ] Resolver entrega web de video/OG antes de publicación; ningún `src` o import roto en la landing integrada. Footer preservado fuera del refinamiento; su integración no habilita cambios editoriales.

Evidencia de salida: cotejo de contenido renderizado con JSON y referencia, listado de recursos/destinos y comparación de hashes. Las discrepancias editoriales se elevan a responsables, sin corregirlas por inferencia.

### G2 — Build, tipos y arquitectura (T1 y T8)

- [ ] En entorno limpio autorizado, instalar desde `pnpm-lock.yaml` con `pnpm install --frozen-lockfile`; anotar Node/pnpm y resultado. El check local actual no acredita esta reproducibilidad.
- [ ] `pnpm exec astro check` sin errores sobre el código activo, después de corregir su carga y delimitar históricos; `pnpm build` sin errores sobre la landing final.
- [ ] Plugin Tailwind 4 y hoja global realmente conectados; salida con CSS de utilidades usadas, sin integración duplicada ni fugas de estilos a footer/Premia.
- [ ] Ruta `/black-friday/` completa, layout y metadatos de campaña en portugués; starter y preview fuera de entrega pública final; assets y enlaces internos resolubles.
- [ ] Una tarjeta Astro con datos tipados y componentes por feature; HTML completo sin frameworks cliente para contenido estático; no importar controlador, iframe ni sincronización del laboratorio.

Evidencia de salida: comandos/logs y rutas generadas de la revisión integrada, más inspección del HTML/CSS. Build correcto es necesario, pero no cierra los gates visuales ni comerciales.

### G3 — Responsive y freeze visual (T5–T8)

- [ ] Revisar **390/768/1280/1440 px**, con **1600 px** para alcanzar el máximo de C; complementar 320/375/1024 y bordes 639/640/1279/1280 para cortes y desbordes.
- [ ] C con máximo 1400 px y retícula 1/2/4 desde 0/640/1280; padding 42/18/24 y cuerpo 15/21. Altura natural, bonus completo, imágenes `contain`, sin truncamiento ni compensaciones de copy.
- [ ] Medir ausencia de overflow horizontal en cada ancho y documentar capturas; no ocultarlo mediante recorte de contenido. Comparar zonas protegidas, C y UI inferior contra aprobados, sin extender sus reglas al footer.
- [ ] Verificar zoom 200 %, texto ampliado, DPR y motores distintos, incluido borde C 1,5 declarado/1 computado en la evidencia original; registrar diferencias sin cambiar el diseño por inferencia.

Evidencia de salida: matriz de viewports, medición DOM, capturas y revisión visual de la landing integrada en `F1_QA.md`. Las capturas del laboratorio A/B/C siguen siendo referencia previa, no resultado nuevo de F1.

### G4 — Accesibilidad e interacción (T3–T8)

- [ ] HTML visible y comprensible con JS desactivado; jerarquía de títulos, landmarks, `ol/li`, alt funcional/decorativo y orden de lectura correctos, sin perder información incrustada relevante.
- [ ] Recorrer teclado, FAQ `details/summary`, CTA, contactos, video, navegación y anclas; foco visible inmediato, sin trampas, recortes ni controles enfocables ocultos. Targets y destinos explícitos; no convertir enlaces pendientes en `href="#"`.
- [ ] Contraste real AA: texto normal ≥4,5:1, texto grande y componentes de UI ≥3:1, incluidos hover/foco/abierto; targets táctiles ≥44×44 px conforme al contrato del proyecto.
- [ ] Respetar `prefers-reduced-motion` en transiciones existentes; sin autoplay/audio agregado al video. Reservar dimensiones de medios y comprobar ausencia de saltos de layout relevantes.

Evidencia de salida: revisión manual en navegador con y sin JS, teclado, zoom y contraste; registrar fallos y correcciones en T8. Un escaneo automatizado, si se usa, complementa estas pruebas.

## 6. Gate independiente para motion F2

F2 comienza después de F1.1.T8 conforme al DAG; GSAP instalado y dirección HYBRID aprobada no sustituyen la aprobación de parámetros y revisión de hero/KV en movimiento.

- [ ] Verificar recursos reales por feature; KV 00–09 requiere archivos, manifiesto, dimensiones, alpha, orden, coordenadas y recomposición validada. Si faltan capas, conservar el compuesto original y validar la entrada de su contenedor; no extraerlas automáticamente.
- [ ] Acordar trayectorias, duraciones individuales/totales, stagger y diferencias móvil/tablet; mantener los breakpoints motion 768/1280 separados de la retícula visual 640/1280.
- [ ] Activar al cruce del borde superior por línea 85 % del viewport (candidato del contrato), una vez; targets ya sobre la línea, anclas o restauración de scroll muestran estado final inmediato. Recalcular ante layout/medios sin reconstruir en cada scroll.
- [ ] Probar reduced motion al cargar y cambiar preferencia; fallo JS antes de arrancar y durante reproducción; foco/anclas durante secuencia; cancelación y limpieza por feature sin borrar transforms intrínsecos. Ningún contenido espera la librería o video.
- [ ] Final idéntico al estático aprobado; scroll nativo, sin `pin`, `scrub`, filtros, recoloración, animación de grandes sombras ni glow persistente nuevo. Video independiente y footer excluido.
- [ ] QA responsive, overflow y CLS después de motion; perfil móvil y presupuesto de bundle/frames acordado, sin inventar umbrales aprobados. Revisión humana de hero/KV y cierre de parámetros antes de declararlos aprobados.

## 7. Bloqueos técnicos frente a aprobaciones humanas

| Tipo / pendiente | Responsable y momento | ¿Qué impide? |
|---|---|---|
| Técnico: Tailwind instalado sin plugin/CSS importado | Integración, F1.1.T1. | Verificar estilos y cerrar QA visual; no exige reinstalar paquetes. |
| Técnico/entorno: checker falla al cargar su cadena WASM | Infraestructura/integración; resolver antes del cierre T8. | Declarar tipos correctos; no impide preparar estilos o contenido estático. Causa/remedio aún no confirmados. |
| Técnico: landing, layout, adaptación canónica y estilos C no integrados | T1–T7, aceptación T8. | Declarar F1 implementada y fidelidad responsive/a11y. |
| Técnico con definición de entrega: MP4/OG ausentes y correspondencia de recursos | Contenido/integración antes del cierre de medios y publicación. | Declarar medios/SEO completos; no autoriza derivados o arte inventados. |
| Recurso técnico: no hay capas KV 00–09 verificadas | F2.1.T1 y revisión motion. | Ensamblaje por capas; no bloquea mostrar el KV compuesto intacto. |
| Humano: alcance del DS v2 global, fuente y nombres/representación de tokens | Diseño/producto antes de promoverlos globalmente. | Tratar propuestas globales como aprobadas; C y zona inferior ya están aprobadas visualmente. |
| Humano: parámetros HYBRID, hero/KV y alternativa compuesta en movimiento | Diseño/motion antes de implementación/cierre de las secuencias correspondientes. | Aprobar motion a partir de una referencia estática o de la instalación de GSAP. |
| Humano/editorial: FAQ, dos reglamentos, Lojas Participantes, Política de Privacidade, certificado del footer y eventual condición histórica | Marketing/legal antes de cierre comercial/publicación. | Publicar como definitivos placeholders, URLs vacías o condiciones inferidas; permite revisión local señalizada. No hay quinto paso adicional confirmado. |
| Alcance de ejecución y publicación | Responsable del proyecto, por tarea/fase. | Esta evaluación autoriza únicamente su informe; completar F0 no ejecuta F1/F2 ni publica la campaña. |

**Lección para la siguiente tarea:** comprobar declaración, instalación e integración por separado. En este checkout, un build exitoso convive con Tailwind sin CSS y un checker instalado cuya excepción se comunica como dependencia ausente. Ante ese mensaje, inspeccionar la importación antes de reinstalar; cerrar build, tipos y revisión visual con evidencias independientes. `orch_learn` no está expuesto entre las herramientas conectadas de esta ejecución; la lección se conserva aquí para respetar el único archivo de entrega permitido.

No se toman decisiones nuevas de diseño/dependencias ni se modifica `docs/DESIGN_DECISIONS.md`; los pendientes se presentan para ratificación en sus tareas. Cierre de F0.1.T3: evaluación y checklist entregados, con limitaciones técnicas y aprobaciones humanas distinguidas.

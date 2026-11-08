# Motion Design Specification v1

Proyecto: Black Friday Condor 2026 · 08/11/2026 · versión documental **1.1.0-proposal**.

Fuente: Motion Design Specification v1 suministrada por el usuario, consolidada con seis precisiones técnicas. **Dirección HYBRID aprobada; parámetros y secuencias finales pendientes de validación.** C ya está aprobada visualmente; el movimiento de C no queda aprobado por ello. Contrato visual separado: [DS v2](../../../design-system/v2/DESIGN_SYSTEM.md).

## Principios y límites

1. **Visual Freeze:** terminar exactamente en la composición aprobada; conservar textos, logos, gráficos, colores internos y proporciones originales.
2. **Motion with purpose:** comunicar entrada, jerarquía, progresión o respuesta; sin movimiento permanente decorativo.
3. **Content First:** textos comerciales, premios, reglas y enlaces accesibles de inmediato; ninguna interacción espera una timeline.
4. **Progressive Enhancement:** HTML y CSS base muestran el estado final, completo y funcional sin JS.
5. **No Scroll Hijacking:** scroll nativo; sin desplazamiento artificial, `pin`, secciones fijadas ni bloqueos por defecto.
6. **Reduced Motion:** estado final visible, sin desplazamientos ni escalas decorativas con `prefers-reduced-motion: reduce`.

Video independiente, sin autoplay/audio añadidos. Footer sin cambios de diseño/contenido y sin secuencias nuevas. No se autoriza instalar dependencias ni crear código con esta especificación.

## Tokens candidatos

| Token | Valor inicial | Semántica |
|---|---:|---|
| `motion.instant` | 0 ms | Estado final inmediato |
| `motion.fast` | 180 ms | Hover/foco/respuesta |
| `motion.base` | 350 ms | Entrada individual base |
| `motion.reveal` | 500 ms | Entrada individual de premio/tarjeta/composición simple |
| `motion.hero` | 1200 ms | Objetivo de duración **total** del hero desktop |
| `motion.gdb-kv` | 1600 ms | Objetivo de duración **total** del ensamblaje KV |
| `motion.stagger` | 100 ms | Diferencia entre inicios de elementos relacionados |
| `motion.translate` | 16–24 CSS px | Rango general; prevalece el máximo específico de cada sección |
| `motion.scaleStart` | 0,97–0,99 | Solo en elementos autorizados |

Curvas candidatas: `power2.out` para entradas, `power3.out` para secuencias cinematográficas, `power1.inOut` para transiciones simples. Son nombres de la propuesta GSAP, no autorización de dependencia ni equivalencias CSS ya decididas. Todos estos valores continúan propuestos.

## Seis precisiones técnicas del contrato

### P01 — Estado visible y recuperación

El estado base es final: sin opacidad cero, desplazamientos ni escalas decorativas dependientes de JS. Solo preparar una entrada después de comprobar recursos, preferencias y capacidad de inicialización. No ocultar contenido mientras se espera un recurso o una librería. Recursos críticos no incluyen la descarga completa del video.

Cada feature debe poder cancelar y finalizar al estado aprobado ante error de inicialización, fallo durante reproducción o desmontaje. Retirar únicamente estilos temporales de motion; no borrar transformaciones intrínsecas de composición. El mecanismo de recuperación debe demostrarse mediante fallos inyectados antes y durante la secuencia; un bloque de manejo de errores alrededor del arranque, por sí solo, no prueba recuperación posterior. Si no puede garantizarse el acceso inmediato, omitir la entrada decorativa y conservar el contenido visible. No dejar clases o estilos de ocultación persistentes.

### P02 — Activación inequívoca al 85 %

Para entradas por scroll, el disparador propuesto es: **el borde superior del target cruza la línea horizontal situada a `0,85 × altura disponible del viewport`, medida desde su borde superior**. Equivale a una línea al 85 % del viewport; no significa que el 85 % de la altura del elemento deba ser visible. Target: wrapper de sección/grupo en desktop; cada tarjeta GDB individual en móvil. Hero usa su propio disparador de recursos críticos.

Si al inicializar el target ya está por encima de esa línea —recarga a mitad de página, ancla o restauración de scroll—, presentar estado final inmediato. No ocultar contenido que el usuario ya está leyendo. Recalcular posiciones ante cambios relevantes de layout, tamaño o recursos; no reconstruir timelines en cada evento de scroll. El 85 % precisa el rango orientativo 80–85 % del documento original y continúa siendo parámetro a validar.

### P03 — Duración individual y total

Duración individual es el tiempo de cada entrada; stagger es separación entre inicios. Con elementos de igual duración, total = duración individual + `(cantidad − 1) × stagger`. Hero y KV tienen objetivos totales con superposición; no aplicar su token a cada capa. Las cifras por sección se detallan más abajo; los tiempos aún no definidos se indican pendientes, sin inventarlos.

### P04 — Foco, anclas y movimiento reducido

Ante foco de teclado en un descendiente o navegación por ancla al bloque, finalizar/cancelar inmediatamente la entrada del target y mostrar su contenido antes de continuar la interacción nativa. Sin retrasar foco, cambiar destinos, interceptar scroll nativo ni mantener controles enfocables invisibles. Foco visible no depende de hover ni de reproducción. Los enlaces funcionan también sin JS.

Si `prefers-reduced-motion` cambia durante la sesión, cancelar secuencias decorativas y restaurar el estado final. En modo reducido, no animar el indicador del FAQ: mantener su estado abierto/cerrado correcto. La semántica de `details/summary` continúa a cargo del navegador.

### P05 — Verificación de capas KV 00–09

La enumeración 00–09 describe la intención de la especificación; **no demuestra disponibilidad de diez archivos**. En `assets/originals/game-da-black/` se verificó el compuesto `gdb-key-visual-v03.png`; no están allí las capas individuales 00–09. Antes de autorizar M07 por capas, registrar en el manifiesto cada archivo real, rol, dimensiones, transparencia, orden de apilamiento y coordenadas finales, contrastando su recomposición con el KV aprobado.

No extraer, redibujar, importar de otro proyecto ni recortar nuevas capas por iniciativa de motion. Sin recursos y correspondencia verificados, conservar el compuesto original y proponer solo una entrada de su contenedor, sujeta a validación en movimiento. Esta alternativa no autoriza alterar el KV ni declara aprobado el ensamblaje.

### P06 — Luminosidad y glow

El fondo del hero ya está visible. La sugerencia de luminosidad global no habilita `brightness`, filtros, recoloración, modos de mezcla ni cambios de píxeles internos del arte; requiere propuesta visual específica antes de implementarla. Por defecto, omitir esa modulación y conservar el original.

El glow estático final de C es el del DS visual aprobado. Priorizar entrada del wrapper mediante `transform`/`opacity` con glow estático; no interpolar grandes sombras, blur o filtros para simular encendido. Una capa decorativa adicional o intensidad inicial diferente requerirá validar composición y coste antes de autorizarse. Sin pulsación infinita ni resplandores persistentes nuevos en CTA. El estado final no cambia el glow de C.

## Secuencias M01–M10

### M01 — Hero Black Friday · alta · cinematográfico

Inicio de página, tras recursos críticos, sin esperar el video completo. Intervalos relativos al inicio:

| Intervalo | Elemento y movimiento candidato |
|---|---|
| 0–350 ms | Fondo original ya visible; cualquier luminosidad queda condicionada a P06 |
| 100–650 ms | Marca: opacidad y desplazamiento vertical máximo 20 px; duración individual 550 ms |
| 300–950 ms | Presentadora: opacidad, desplazamiento máximo 24 px y escala inicial 0,98; duración individual 650 ms |
| 700–1200 ms | Ventana de cierre: todos los elementos terminan en su composición original; no es una nueva animación obligatoria de 500 ms |

Total objetivo 1200 ms; móvil simplificado 500–700 ms **totales**, trayectorias internas pendientes. Verificar que existan capas originales adecuadas antes de separar elementos; si solo hay arte compuesto, no descomponerlo por cuenta propia. No animar palabras, deformar presentadora, introducir partículas o mantener movimiento tras el cierre.

### M02 — Video principal · baja · discreto

Entrada de su wrapper con la sección, máximo 350 ms individuales y totales si es un único elemento. Sin autoplay/audio, zoom continuo, parallax ni cambios en controles/formato/comportamiento del reproductor. El sistema de motion no espera su descarga completa.

### M03 — Introducción comercial · media · editorial

Título → párrafo 1 → párrafo 2. Opacidad y desplazamiento máximo 16 px; 350–450 ms por elemento, stagger 90–120 ms; total derivado **530–690 ms** para tres elementos. Activación P02, una sola vez. Énfasis y copy no se animan independientemente.

### M04 — Premios Condor Premia · alta · progresiva

Tres piezas originales, izquierda a derecha desktop, opacidad y escala inicial 0,98. 450–550 ms por pieza, stagger 120 ms; total **690–790 ms**. Móvil conserva orden de lectura, stagger reducido aún por validar. Sin rotaciones 3D ni cambios en importes/gráficos/textos. Estado final idéntico al aprobado.

### M05 — Cuatro pasos Condor Premia · media · informativa

Wrappers externos en orden 1→4, desplazamiento vertical 16 px y opacidad; 400 ms por paso, stagger 100 ms, total **700 ms**. Una vez y permanecen visibles. No animar ilustraciones ni partes internas del arte.

### M06 — Z-ON y banner blanco · media · informativa

Mensajes separados. Z-ON 300–400 ms de entrada individual; banner blanco opacidad y desplazamiento máximo 12 px. Duración individual del banner y coordinación total **pendientes**: no asumir la duración de Z-ON para ambos. No retrasar condiciones de validez; advertencias legibles y seleccionables. Sin parpadeos, pulsaciones o movimientos horizontales.

### M07 — Key Visual Game da Black · muy alta · ensamblaje

Aplicar únicamente si P05 se cumple. Secuencia propuesta:

| Orden | Capas previstas | Tratamiento |
|---|---|---|
| 1 | `00-fundo` | Ya visible; establece la composición |
| 2 | `01`, `02`, pantallas superiores | Desplazamientos cortos hacia posición final |
| 3 | `03`, `04`, pantallas inferiores | Aparición coordinada con superiores |
| 4 | `05`, `06`, cintas | Entrada lateral breve, sin deformación |
| 5 | `07`, emblema | Opacidad y escala inicial 0,97 |
| 6 | `08`, placa Condor | Aparición suave respetando apilamiento |
| 7 | `09`, copy final | Cierre de composición |

Total objetivo 1400–1800 ms, referencia 1600; duraciones por capa, solapamientos y trayectorias exactas pendientes. Activación P02, una vez; sin `pin` ni `scrub`. Móvil simplifica, sin salir de pantalla; si las capas no son seguras/disponibles, solo contenedor del compuesto original. Hero y KV necesitan aprobación visual **en movimiento** independiente de sus composiciones estáticas.

### M08 — Cuatro tarjetas GDB · alta · identidad neón

Base visual: **C aprobada**. Orden 1→4, 400–500 ms por tarjeta, stagger desktop 100 ms, total **700–800 ms**; opacidad y desplazamiento máximo 16 px. Glow según P06, sin pulso continuo. Texto comercial no se anima por separado; bonus del paso 3 siempre íntegro, legible y accesible.

Retícula visual del DS: 4/2/1. Móvil: cada tarjeta tiene su propio disparador, no espera a las otras; total por tarjeta 400–500 ms antes de ajustes móviles pendientes. Política de agrupación/stagger tablet pendiente; no inferirla del breakpoint de la retícula.

### M09 — CTA y reglamentos · media · funcional

CTA entrada 350 ms individual; hover 180 ms. Reglamentos color/borde 180 ms; ofertas color/subrayado, duración final por validar con `motion.fast` como candidato. Foco visible inmediato. No añadir glow persistente ni enlaces ficticios. Sin stagger de grupo especificado: total compuesto no fijado.

### M10 — FAQ y contacto · baja · UI discreta

FAQ nativo `details/summary`: solo color, borde e indicador cuando corresponda; sin animación de altura inicial ni retraso en acceso a respuestas. Duración candidata de microinteracción 180 ms, pendiente de validación. Contacto: opacidad y desplazamiento máximo 12 px, 350–400 ms por tarjeta; coordinación/stagger y total de grupo no definidos. Footer excluido.

## Scroll, responsive, rendimiento y arquitectura

- Scroll nativo y anclas sin interferencia. Entradas informativas una vez por instancia en la página; no repetir al subir/bajar. Alcance de persistencia entre navegaciones futuras pendiente, sin almacenamiento implícito.
- Sin `scrub` para textos, FAQ, premios o tarjetas; sin fijación de secciones sin aprobación funcional/visual independiente.
- Desktop desde 1280: secuencias completas; tablet 768–1279: desplazamientos/stagger moderados; móvil <768: secuencias abreviadas. Son breakpoints de motion, independientes de la retícula GDB 640/1280.
- Movimiento reducido: estado final sin animación decorativa; JS desactivado: contenido completo y HTML nativo funcional.
- Priorizar `transform`/`opacity` en wrappers sin cambiar flujo. Reservar dimensiones de medios; evitar animaciones de `width`, `height`, `top`, `left`, filtros complejos, sombras enormes y desenfoques extensos. No adoptar efectos continuos para añadir espectacularidad.
- Base prevista Astro + TypeScript + CSS/Tailwind. **GSAP Core y ScrollTrigger son candidatos**; Tailwind/GSAP no se instalan aquí. No agregar smooth scroll, 3D u otras librerías sin necesidad justificada y autorización.
- Configuración central de tiempos, curvas y preferencias; ejecución aislada por feature, solo cliente cuando haga falta, con cancelación/limpieza. No dependencias entre timelines de distintas secciones. Interfaces y gates: [entrada a implementación](../../implementation/IMPLEMENTATION_ENTRY.md).

## Criterios de aceptación y pendientes

- [ ] Composición final idéntica al diseño aprobado; integridad de assets y copy comercial, incluido paso 3, demostrada.
- [ ] HTML/CSS visible con JS desactivado, error antes de arrancar y error durante reproducción; recuperación P01 verificada.
- [ ] Sin overflow horizontal ni saltos de layout causados por motion.
- [ ] Foco y anclas muestran inmediatamente targets; teclado y controles nativos funcionan.
- [ ] Movimiento reducido al cargar y al cambiar preferencia; secuencias ejecutadas una vez.
- [ ] QA visual 390/768/1280/1440; 1600 adicional para cotejar máximo de C.
- [ ] Hero y KV aprobados en movimiento; P05 resuelta antes de cualquier ensamblaje por capas.
- [ ] Video conserva su comportamiento independiente; footer sin cambios.
- [ ] Perfil de rendimiento en dispositivos móviles documentado; presupuesto numérico de bundle/frames por acordar antes de cerrar implementación.

Pendientes de la propuesta original: trayectorias de hero; secuencia, superposición y tiempo final del KV; tratamiento inicial del glow con final estático C preservado; ajustes de motion específicos de C; duraciones reales móviles; eventual scroll ligado al progreso, que requeriría aprobación separada. Se añaden disponibilidad/correspondencia de capas y duraciones no especificadas en M06/M09/M10. Ninguno equivale a volver a someter C estática a aprobación. Esta versión no autoriza implementación ni cierra Motion Design.

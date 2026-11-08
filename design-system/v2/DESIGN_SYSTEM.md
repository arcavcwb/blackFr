# Design System v2 — contrato visual consolidado

Versión documental: **2.0.0-draft.1** · 08/11/2026.

**C está aprobada visualmente por el usuario. El DS v2 completo sigue pendiente de aprobación.** La dirección de motion HYBRID está aprobada; sus parámetros pertenecen al [contrato de motion](../../docs/motion/v1/MOTION_DESIGN.md), no a este documento.

## Estado y procedencia

- **Aprobado:** composición visual de C y refinamiento inferior de CTA, reglamentos, ofertas, FAQ y contacto; conservación de piezas y contenido según DS-001–DS-015 y DS-018 en [decisiones](../../docs/DESIGN_DECISIONS.md).
- **Comprobado en las fuentes:** valores declarados en el [CSS exclusivo de C](../../prototypes/ds-v2-comparacion/abc/variante-c.css), heredados del [generador baseline](../../prototypes/ds-v2-comparacion/generar.py). Las cifras siguientes describen ese resultado; no son un rediseño.
- **Evidencia existente:** [matriz y medidas DOM](../../prototypes/ds-v2-comparacion/abc/matriz-abc.md), [exportación de navegador](../../prototypes/ds-v2-comparacion/abc/evidencia-abc.json), [procedencia](../../prototypes/ds-v2-comparacion/abc/procedencia.json) y [galería](../../prototypes/ds-v2-comparacion/abc/galeria.html). No se repitió QA visual en esta consolidación documental. Revisión del experimento: `55a35e7d8e7daf99`.
- **Propuesto:** los nombres semánticos de las matrices y su futura implementación como tokens. C no aprueba automáticamente un tema global, todos los estados interactivos, colores oficiales de marca ni cambios en otros bloques.
- **Histórico:** A/B permanecen disponibles, con máximos 1280/1480 px. DS v1 permanece intacto como propuesta de origen. Los rótulos antiguos de los HTML y evidencias son registros del experimento, no el estado actual de aprobación.

La zona inferior se contrasta con [preview aprobada](../../references/approved/parte-inferior/PREVIEW.html) y sus [capturas desktop](../../references/approved/parte-inferior/captura-desktop.png) y [móvil](../../references/approved/parte-inferior/captura-mobile.png). Los valores transcritos son los utilizados en el laboratorio; divergencias con componentes Astro no se resuelven alterando el diseño ni el contenido en esta fase.

## Tokens semánticos: core y variantes

Todos los nombres de token son **propuestos**. «C» y «UI inferior» identifican valores comprobados de las respectivas referencias visuales aprobadas; la promoción al sistema completo continúa pendiente. Medidas en CSS px, con raíz de 16 px en el laboratorio.

| Rol / nombre propuesto | Valor comprobado | Alcance y estado |
|---|---|---|
| `core.canvas` / `core.text` | `#08090D` / `#FFFFFF` | Fondo y texto base del cuerpo de la muestra; no confundir con el texto `#F5F7FF` de la herramienta de comparación ni aplicar globalmente al footer o piezas protegidas |
| `core.font.family` | `Arial, system-ui, sans-serif` | Fuente real del laboratorio; familia de producción pendiente de ratificación global, sin sustituirla silenciosamente |
| `core.focus` | 3 px sólido `#FFE76A`, offset 4 px | Foco de enlaces; FAQ offset −3 px; contacto color `#0E52AF`, offset 2 px |
| `core.radius.control` / `core.radius.panel` | 999 / 12 | CTA y cápsulas / UI inferior; no un radio único para todo |
| `core.gutter` | 16 / 24 / 32 | Desde 0 / 640 / 1280 px |
| `gdb.section.background` | Radial elíptico superior `rgba(5,89,215,.34)` a transparente al 60 %, sobre lineal 180° `#03142E`, `#052453` al 55 %, `#02112D` | Fondo HTML del tutorial; no recolorea el KV |
| `gdb.card.background` / `gdb.card.text` | Lineal 180° `#052049` → `#04172F` / `#E0ECFF` | C |
| `gdb.card.border` / `gdb.card.radius` | 1,5 px sólido `#16BAFF` / 22 px | C declarado; borde computado de **1 px** en el Chrome de la evidencia. Validar otros motores/DPR sin cambiar el valor por cuenta propia |
| `gdb.card.glow` | `0 0 5px rgba(22,186,255,.55)`, `0 0 18px rgba(0,108,230,.20)` | C, exterior estático, sin sombra interior |
| `gdb.badge.fill` / `gdb.badge.ink` | Lineal 165° `#FFF83F` → `#FFD500` / `#002255` | C heredado |
| `gdb.title.fill` / `gdb.title.ink` | Lineal 160° `#FFF139` → `#FFD800` / `#062958` | C heredado |
| `gdb.bonus.accent` | `#FFE500` | Texto y borde, fondo transparente |
| `ui.cta.fill` / `ui.cta.ink` / `ui.cta.hover` | `#FFE86D` / `#071A42` / `#FFF39D` | UI inferior; hover existente, revisar con foco y contraste en integración |
| `ui.regulation.fill` / `border` / `text` | `#081B38` / `#24599A` / `#E8F1FF` | UI inferior; no confundir con enlace disponible cuando falta destino |
| `ui.offer.text` / `hover` | `#82CFFF` / `#FFFFFF` | UI inferior; subrayado offset 4 px |
| `ui.faq.fill` / `border` / `answer` | `#0A1E3B` / `#244771` / `#CFDEEF` | FAQ cerrado; separador respuesta `#274469` |
| `ui.faq.open.fill` / `border` | `#102847` / `#418BD6` | Estado abierto nativo |
| `ui.faq.interaction` / `indicator` | `#153258` / `#88C9FF` | Hover/foco de summary; indicador gira 180° al abrir |
| `ui.contact.fill` / `text` | `#F6F8FC` / `#112952` | Tarjeta clara; título `#0C326E`, descripción `#354968`, enlace `#0944A2` |
| `ui.contact.icon.fill` / `ink` | `#E3ECFC` / `#12499E` | Caja de icono genérico existente, no recreación de logos |
| `ui.contact.divider` / `shadow` | `#21436F` / `0 12px 40px #0003` | Sombra estática; no animarla |
| `premia.*` y colores de marca generales | **Sin nuevos valores consolidados** | Piezas originales protegidas; los colores de v1 son propuestas, no extracción autorizada para redibujar |

No fusionar los amarillos de badge, título, bonus, CTA y foco por semejanza. Cumplen roles diferentes en la referencia. La nomenclatura de core compartido no obliga a sustituir colores incrustados en assets.

## Tipografía y proporciones de C

| Elemento | Valor real de C | Regla |
|---|---|---|
| Cabecera GDB HTML | `clamp(1.8rem, 3.6vw, 3.5rem)`, peso 900, línea 1,1, tracking −0,035 em | Centrada, balanceada; este tamaño no se traslada al arte del KV |
| Introducción GDB | 16 px / 1,6, `#E0ECFF` | Ancho máximo 800 px, texto canónico |
| Numeración | 30 px, peso 900, cursiva, línea 1 | Alto 46, mínimo ancho 70, padding horizontal 16, top −23, radio 13; sombra `0 4px 10px rgba(0,0,0,.20)` |
| Título de tarjeta | 18 px, peso 800, cursiva, línea 1,2, tracking −0,02 em | Cápsula mínima 64 de alto, padding 10/12, margen inferior 12, radio 999. Hasta dos líneas en evidencia; sin clamp de líneas ni truncamiento |
| Ilustración | `contain`, ancho 100 %, máximo 260, alto 190; alto 200 entre 640–1279 | Margen inferior 16; proporción original intacta, no estirar ni recortar |
| Texto comercial | **15 px / 1,4 = 21 px**, centrado | Escala visual aprobada en C; validar zoom/dispositivos sin reducirla para encajar |
| Énfasis comercial | Peso 800 heredado del baseline | Conservar exactamente el énfasis del JSON y el texto íntegro |
| Bonus paso 3 | 15 px / 1,4, peso 600, énfasis 800 | Margen superior 10, padding 9/10, borde 1, radio 12; no abreviar |
| Tarjeta | Padding superior/horizontal/inferior **42/18/24** | Flex vertical; altura natural e igualación por fila. No fijar altura ni ocultar desbordes comerciales |

Los logos existentes del encabezado del tutorial mantienen cajas de 82 px GDB y 112 px Condor, altura automática, separación 24 y margen inferior 28. No son autorización para cambiar los logos del KV ni del resto de la landing. Los conectores de desktop heredados son decorativos: 36 px, blanco, derecha −22, top 42 %, sombra cian `#00B9FF` a 9/18 px; no expresan una condición comercial ni se animan por defecto.

## Contenedores y responsive

| Bloque | Medidas y comportamiento comprobados |
|---|---|
| GDB C | Máximo **1400 px**; centrado dentro de gutters; padding de sección 44 arriba / 64 abajo, arriba 56 desde 640 |
| Cabecera GDB | Máximo 1000, margen inferior 58; título con margen inferior 24 |
| Retícula GDB | 1 columna <640; 2 entre 640–1279; 4 desde 1280. Gap vertical/horizontal 48/24, 48/20, 24/24 respectivamente |
| Acciones | Máximo 760; CTA máximo 580; reglamentos 1 columna <640 y 2 desde 640, gap 12, margen vertical 16; ofertas máximo 620 |
| Zona inferior | Padding 56 arriba / 64 abajo; mismos gutters |
| FAQ | Máximo 768; margen superior 80, desde 640: 96; separación de ítems 12 / 16 desde 640 |
| Contacto | Máximo 920; margen superior 80 / 96 desde 640; separador superior y padding superior 64; retícula 1 columna <768 y 2 desde 768, gap 16 |

Los breakpoints visuales del laboratorio son distintos de los de motion (768/1280). No unificarlos automáticamente. A 1440, C mide 1361 px efectivos en la evidencia; solo a 1600 llega a 1400. El máximo no equivale al ancho disponible. Las alturas medidas no son tokens ni alturas fijas: tarjeta 3 de C mide 506/516/548/527/506 px a 390/768/1280/1440/1600. Consultar la matriz para el conjunto A/B/C y la reserva de scrollbar.

## Componentes y estados inferiores

| Componente previsto | Especificación visual comprobada y responsabilidad |
|---|---|
| CTA principal | Mínimo 56 de alto, padding 14/24, radio 999, texto 14 px / 1,4 peso 800. Destino confirmado desde JSON; foco visible independiente de hover |
| Reglamentos agrupados | Mínimo 58, padding 14/18, borde 1, radio 12, texto 14 px / 1,4 peso 800. Destinos pendientes no generan `href` ficticio ni acción vacía |
| Enlace de ofertas | Mínimo 44, padding 8/12, texto 14 px / 1,5 peso 700. Conservar copy completo, incluido «Aqui a economia não para.» |
| FAQ | `details/summary` nativo, radio 12. Título `clamp(1.75rem,3vw,2.5rem)`, peso 800 / 1,15; margen inferior 28 / 32 desde 640. Summary mínimo 60, padding 16/20 y 18/24 desde 640, peso 700 / 1,5; radio interno 11. Respuesta 16 px / 1,6, padding 16/20/20 y 18/24/24 desde 640 |
| ContactCard | Padding 20 / 24 desde 768, radio 12, gap 16. Icono 44×44, radio 12, imagen interna 24. Título 16 px / 1,3 (negrita nativa en el laboratorio, sin peso explícito); descripción 14 px / 1,5; enlace 14 px / 1,5 peso 700, padding vertical 4, subrayado offset 3, wrap de destinos largos |

Los avisos editoriales del laboratorio —por ejemplo, el texto pequeño de reglamentos pendientes— son señalización de revisión, no copy promocional final. Las respuestas FAQ siguen siendo placeholders. Validación de estados hover/foco, contraste y destinos reales es un criterio de integración, sin reabrir la aprobación visual de C.

Compartidos previstos: contenedor, enlace de acción, grupo de reglamentos, FAQ nativo y contacto. Exclusivo de GDB: tarjeta de paso, numeración, cápsula, bonus e ilustración; una implementación reutilizable alimentada por cuatro datos canónicos. Condor Premia conserva sus cuatro artes, no adopta esta tarjeta ni su neón. Interfaces y rutas previstas: [entrada a implementación](../../docs/implementation/IMPLEMENTATION_ENTRY.md).

## Diferencias v1 → consolidación v2

| Tema | Propuesta v1 | Base consolidada / justificación |
|---|---|---|
| Contenedor | 1200 general / 1280 amplio | 1400 exclusivamente GDB C aprobado; no reemplazo global |
| Paleta GDB | Canvas `#06152D`, surface `#071D4B`, borde `#00C7FF`, amarillo `#FBE95A` | Registrar gradientes y roles reales de C; no recolorear piezas para aproximarlas a v1 |
| Core y marca | Text `#F5F7FF`, surface `#10141E`, muted `#B9C4D7`, divider `#1450D2`; Condor `#0003EF`/`#FFD000`, Premia `#D7A91C` | Permanecen **propuestas no validadas para producción** fuera de los valores comprobados de este contrato; los colores del panel de diagnóstico no son por ello tokens de landing |
| Tipografía | Familia inherit; display 2,25–3,75 rem / 800 / 1,05; tarjeta fluida / 700; cuerpo 16 / 1,5 | Familia y jerarquías reales por contexto; GDB 15/21 y título 18/800 reflejan C. Título de sección inferior coincide con v1; caption v1 14/1,45 queda propuesto, no sustituye estilos inferiores |
| Espaciado | Gaps sección 48/64/88; cards 16/20/24; padding 20/24 | Separar roles y transcribir medidas de C/inferior; no aplicar una escala genérica sobre la composición aprobada |
| Radios y sombras | Tarjeta 20; control 999; sin contrato completo de sombras | C 22, UI 12, CTA 999 y sombras reales por rol; no uniformar por conveniencia |
| Responsive | 640/1280, con divergencias en previews/componentes | Preservar 640/1280 de C para GDB y 768 para contactos. Conciliar implementación futura con este contrato |
| Motion | UI 180 ms / entrada 300 ms | Separación documental: tiempos candidatos de Motion v1, sin heredar 300 como regla universal |

## Conservación y pendientes del sistema

La referencia estructural/comercial sigue siendo `http://localhost:4321/black-friday`; el contenido procede de [landing-content.json](../../content/landing-content.json). Preservar literalmente los cuatro pasos, «Entre na Trilha da Black» y toda la compra/CPF/número/bonus condicional del paso 3. Los énfasis en «3 produtos diferentes» y «1 número da sorte» no sustituyen ninguna frase.

Hero, video, premios, pasos Condor Premia, aviso blanco, KV GDB y logos permanecen intactos. Footer fuera del alcance de estilos y motion nuevos. La composición final de toda animación debe coincidir con estos estados estáticos.

Pendientes: aprobación del DS v2 como sistema completo, nombres/representación técnica de tokens, familia global y roles aún heredados de v1; contraste/zoom/lectura en dispositivos y borde fraccional en otros DPR; conciliación de datos TypeScript con JSON; estados interactivos restantes; pendientes editoriales de [CONTENT_GAPS](../../docs/CONTENT_GAPS.md). No son una nueva solicitud de aprobación visual de C. No se crean tokens CSS/JSON ni componentes mediante este documento.

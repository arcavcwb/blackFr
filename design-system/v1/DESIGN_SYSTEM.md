# Design System — Black Friday Condor 2026

**Versión:** 1.0 · Propuesta de diseño · 08/11/2026  
**Alcance:** sistema visual y reglas para una landing existente en Astro + Tailwind CSS + TypeScript.  
**Estado:** especificación para revisión. **No se ha modificado el sitio ni el repositorio.**

> **Principio rector:** una sola experiencia web, dos universos promocionales. Homogeneidad en composición, tipografía HTML, espaciado y accesibilidad; identidad gráfica original intacta para Condor Premia y Game da Black.

## A. Fuentes de verdad y restricciones

**Material examinado:** captura vertical del sitio local, PNG de premios, referencias visuales de GDB y Clube Condor, composición de cuatro pasos y recortes de ilustraciones compartidos durante esta conversación. No se inspeccionó Figma, código del repositorio, fuentes tipográficas instaladas ni configuración Tailwind. Las medidas del sistema son una **propuesta técnica**, no especificaciones oficiales de marca.

### Elementos protegidos: no rediseñar

- Hero “Black Todo Dia é no Condor”, con sus piezas, logotipo y composición.
- Imagen/video principal de la introducción, sin recomposición.
- Tres piezas doradas originales de premios.
- Cuatro pasos originales de Condor Premia / Clube Condor.
- Banner blanco informativo de Z-ON (contenido y composición).
- Imagen principal de GDB y sus logotipos en los materiales originales.
- Copy promocional y reglamentos: ninguna alteración semántica sin aprobación.

**Único reemplazo previsto:** los **cinco cards azules de participación de GDB** ubicados debajo del banner de GDB y antes de los CTA “Baixe o app…” / reglamentos se sustituyen por los **cuatro pasos aprobados**. El texto de la quinta tarjeta sobre qué ocurre si no se completa la misión no debe eliminarse silenciosamente: confirmar su continuidad con marketing/legal antes de publicar.

### Tres capas

1. **Core de producto:** fondo oscuro, texto HTML, ritmo vertical, contenedores, navegación, CTA, FAQ, footer, estados accesibles.
2. **Tema Premia:** identidad dorada solo alrededor de sus piezas y beneficios; sin alterar los PNGs.
3. **Tema GDB:** azul profundo, línea cian/neón, amarillo de paso e ilustraciones originales; solo en módulo GDB y sus elementos asociados.

## B. Fundamentos / Design tokens

Los valores son candidatos que normalizan la captura, no equivalen a un manual oficial de marca. El archivo `design-tokens.json` expresa la misma propuesta como tokens semánticos. `design-tokens.css` da variables CSS neutrales para Tailwind v3 o v4.

### Paleta por responsabilidad

| Token | Valor propuesto | Responsabilidad |
|---|---|---|
| `core.canvas` | `#08090D` | Fondo de secciones generales |
| `core.surface` | `#10141E` | Superficies neutras de componentes HTML |
| `core.text` | `#F5F7FF` | Texto sobre fondos oscuros |
| `core.muted` | `#B9C4D7` | Descripciones e información secundaria |
| `core.divider` | `#1450D2` | Separadores discretos existentes |
| `condor.primary` | `#0003EF` | Azul institucional **observado** en pasos originales; no sustituir marca |
| `condor.yellow` | `#FFD000` | Amarillo observado en numeración original |
| `premia.gold` | `#D7A91C` | Acento contextual dorado; no recolorear imagen |
| `gdb.canvas` | `#06152D` | Base de sección Game da Black |
| `gdb.surface` | `#071D4B` | Interior de cards GDB |
| `gdb.border` | `#00C7FF` | Contornos y conectores luminosos |
| `gdb.yellow` | `#FBE95A` | Badges de paso y énfasis |
| `focus` | `#FBE95A` | Anillo de foco sobre superficies oscuras |

**Uso restringido:** el neón no se aplica al FAQ, premios ni contactos solo por buscar homogeneidad. Azul, amarillo, gold y cian no son intercambiables.

### Tipografía

- **Identidad:** la fuente de los materiales originales permanece incrustada en los assets; NO intentar reconstruirla sin familia tipográfica original.
- **HTML nuevo:** heredar la tipografía existente del proyecto (`font-family: inherit`). Fallback de emergencia: `system-ui, sans-serif`.
- **Pesos:** 800 títulos fuertes; 700 card titles y CTA; 400–500 cuerpo; nunca depender solo del color para jerarquizar.

| Estilo | Desktop | Móvil | Interlineado | Uso |
|---|---|---|---|---|
| `display` | `clamp(2.25rem, 4vw, 3.75rem)` | Fluido | 1.05 | Encabezados no incrustados |
| `section-title` | `clamp(1.75rem, 3vw, 2.5rem)` | Fluido | 1.15 | Título de sección |
| `card-title` | `clamp(1.125rem, 1.5vw, 1.375rem)` | Fluido | 1.2 | Cards nuevos de GDB |
| `body` | `1rem` | `1rem` | 1.5 | Lectura normal |
| `caption` | `.875rem` | `.875rem` | 1.45 | Notas y etiquetas secundarias |

**Prohibición:** no insertar copy publicitario entero como imagen si debe leerse, responder al ancho o traducirse. En cards nuevos, imagen decorativa y copy HTML independientes.

### Espaciado, grid y dimensiones

Escala en px: `4, 8, 12, 16, 24, 32, 48, 64, 96`. Adoptar Tailwind spacing donde corresponda; usar tokens sólo para decisiones semánticas.

| Token | Valor | Regla |
|---|---|---|
| `container.max` | `1200px` | Contenido normal; no limita el hero original |
| `container.wide` | `1280px` | Secciones promocionales especiales |
| `container.gutter` | `16px` móvil / `24px` tablet / `32px` desktop | Margen lateral seguro |
| `section.gap` | `48px` móvil / `64px` tablet / `88px` desktop | Ritmo vertical (propuesta) |
| `cards.gap` | `16px` móvil / `20px` tablet / `24px` desktop | Separación uniforme |
| `card.padding` | `20px` móvil / `24px` desktop | Aire interior |
| `radius.card` | `20px` | Tarjetas nuevas de participación |
| `radius.control` | `999px` | CTA píldora actuales |

**Responsive de los 4 pasos GDB** (según espacio disponible, no viewport capturado): `1` columna bajo `640px`, `2` columnas entre `640–1279px`, `4` a partir de `1280px` si hay `min-width` suficiente por card. Priorizar `minmax(0,1fr)` y texto sin cortes. Permitir altura natural para la condición de bono del paso 3. Los conectores entre cards no deben ser una dependencia para comprender el orden.

## C. Componentes del sistema

| Componente | Variante | Uso | Regla |
|---|---|---|---|
| `PageContainer` | default, wide, full | Ancho de secciones | El hero y los banners originales conservan sus reglas actuales |
| `SectionHeader` | default, gdb | Título y subtítulo HTML | No duplicar titulares incrustados en logos |
| `SectionDivider` | default | Línea o puntos azules | Decorativo (`aria-hidden`) y de baja intensidad |
| `ActionLink` | primary, secondary, text | App / reglamentos / ofertas | Sólo CTA con enlace real; foco visible y alto ≥44px |
| `ParticipationStepCard` | gdb | Cuatro tarjetas nuevas | Datos tipados, una vista reutilizable; imagen separada del texto |
| `ParticipationSteps` | gdb | Lista de cuatro pasos | `<ol>` + `<li>`; 4/2/1; sin carrusel obligatorio |
| `FaqAccordion` | default | Preguntas frecuentes | `<details>` nativo o botón con ARIA correcto; sin copy inventado |
| `ContactCard` | light | Contactos existentes | Blanco original, padding y contraste mejorados |
| `LegalText` | default | Condiciones/avisos | Mantener contenido, enlaces y énfasis jurídico |
| `MediaFrame` | default | Video e imágenes | Ajustar contenedor sin recortar información importante |

### Variantes y estados

- **Primary:** CTA amarillo pálido (acción de app), tinta azul oscura.
- **Secondary:** CTA azul corporativo, texto blanco.
- **Hover:** sutil incremento de luminancia o cambio de sombra, sin saltos de layout.
- **Focus:** anillo de 2–3 px con separación; visible con teclado.
- **Disabled:** sólo en controles reales, con semántica nativa; nunca como decoración.
- **Motion:** 150–250 ms en UI; 250–350 ms en entrada de sección, sin animaciones obligatorias. Desactivar transformaciones decorativas con `prefers-reduced-motion`.

## D. Aplicación a la landing actual

| Sección | Tema | Permitido | Protegido |
|---|---|---|---|
| Header | Core | Alineación responsive, foco, accesibilidad | Rótulos y enlaces, identidad existente |
| Hero | — | Sólo revisar contenedor y performance sin alterar diseño | Toda la imagen y composición |
| Video/intro | Core | Márgenes, ancho, line-height HTML | Video/imagen y mensaje |
| Premios | Premia | Espaciado externo y comportamiento móvil | 3 piezas doradas |
| Participación Condor Premia | Core/Condor | Gap externo, tipografía fuera del PNG | 4 cards originales |
| Z-ON | Core | Separación externa y accesibilidad circundante | Banner blanco íntegro |
| Hero GDB | GDB | Márgenes de la sección, objeto `contain` si aplica | Imagen principal GDB íntegra |
| Copy GDB | GDB | Ancho de lectura y line-height | Mensaje y reglas |
| Pasos GDB | GDB | **Reemplazo 5→4**, semántica HTML y responsividad | Logos reales y copy aprobado |
| CTA GDB | Core/GDB | Altura, gaps, hover/focus, distribución | Texto, color base y href existentes |
| FAQ | Core | Densidad, borde, semántica, foco | Preguntas reales y respuesta original |
| Contacto | Core/light | Padding, layout responsivo | Información y tarjetas blancas originales |
| Footer | Core | Alineación, wrapping, contraste | Logos, enlaces, avisos |

## E. Contratos de los nuevos pasos GDB

**Orden funcional** (no confundir con los cuatro pasos de Condor Premia):

1. **Acesse o app Clube Condor.** Revisar cadastro antes de participar.
2. **Ative as ofertas.** Antes de comprar, activar ofertas semanales.
3. **Compre e ganhe números da sorte.** La regla aprobada indica **3 productos diferentes de ofertas activadas = 1 número de la suerte**; 5 productos pueden otorgar un número extra **cuando haya bonus**. No garantizar el bonus fuera de esa condición.
4. **Acompanhe e concorra!** Consultar los números de la suerte en el aplicativo.

Separar la regla comercial (datos) del diseño visual. El resumen de los cards NO sustituye al reglamento oficial. Si el quinto paso original contiene una condición material, su ubicación definitiva necesita revisión antes de eliminarlo.

## F. Arquitectura de aplicación (sin modificar el repositorio)

```text
src/
  styles/
    design-tokens.css            # token layer, no CSS de campañas incrustadas
  components/ui/
    PageContainer.astro
    SectionHeader.astro
    SectionDivider.astro
    ActionLink.astro
    FaqAccordion.astro
    ContactCard.astro
  features/game-da-black/
    data/participationSteps.ts   # copy / reglas
    types.ts                     # contrato
    components/
      GameStepCard.astro
      GameStepsSection.astro
  assets/
    ...                          # assets originales (no regenerar)
```

**Criterios:** DRY, responsabilidad única, componentes Astro para contenido estático, props tipados, estados del componente explícitos, contenido separado de estilos, `astro:assets` sólo donde no destruya transparencia/logos, sin JS de cliente para lo estático. Integrar el sistema con el layout y configuración Tailwind **existentes**. Evitar importar simultáneamente Tailwind v3 y v4.

`design-tokens.css` es un fichero **neutral**, no instala Tailwind. Para Tailwind v4 pueden mapearse variables en `@theme`; en v3, mapearse vía `theme.extend`. Primero verificar la versión real del proyecto.

## G. Reglas de accesibilidad y rendimiento

1. Contraste AA: cuerpo normal ≥4.5:1; UI grande ≥3:1; revisar estados reales, incluyendo hover/focus. Ejemplos aproximados de esta propuesta: blanco sobre azul GDB ≈15:1, texto oscuro sobre amarillo GDB ≈14:1.
2. Texto HTML, no sólo texto incrustado en imagen; `alt` descriptivo para logo funcional, `alt=""` para ilustraciones duplicadas por texto adyacente.
3. CTA y controles accesibles con teclado, área táctil recomendada ≥44×44 px.
4. Evitar scroll horizontal en móvil: controlar longitudes, no fijar ancho mínimo de card incompatible con 320 px de viewport.
5. Evitar recortes de marca con `object-fit: cover`; preferir `contain` para logos, premios y arte original.
6. Respetar `prefers-reduced-motion`, precargar sólo recurso LCP si es necesario y `loading="lazy"` para recursos inferiores.
7. Mantener contenido legal y enlaces correctos; pruebas de UX no sustituyen aprobación jurídica.

## H. Criterios de aceptación

- [ ] Hero, 3 premios dorados, banner blanco, 4 pasos Premia e imagen hero GDB comparados visualmente: sin cambios.
- [ ] 4 pasos nuevos GDB en lugar de 5, en posición correcta **antes de los CTA**.
- [ ] Logotipos GDB y Clube Condor reutilizados de assets suministrados; no redibujados ni inventados.
- [ ] Reglas del paso 3 conservan la condición del bonus.
- [ ] Revisado el contenido del quinto paso eliminado.
- [ ] Navegación por teclado, focus, FAQ y CTA correctos.
- [ ] QA responsive a 320, 375, 768, 1024 y 1440 px, sin overflow.
- [ ] Test con `prefers-reduced-motion` y contraste validado.
- [ ] Build de Astro y verificación visual realizados **en el repositorio real** antes de publicar.

## I. Siguiente fase

Este Design System es **primero el contrato visual y técnico**. Tras su aprobación se mapean los estilos existentes, se verifican la versión de Tailwind y las fuentes reales, y recién entonces se implementa la normalización en el sitio. No cambiar archivos protegidos ni reemplazar componentes sin validación.

# F0 — Revisión del Design System v2

**Tarea:** F0.1.T2 · **Fecha:** 2026-11-08 · **Estado:** revisión documental; no supone aprobación adicional ni implementación.

## Alcance y fuentes

Se contrastaron `design-system/v2/DESIGN_SYSTEM.md` (2.0.0-draft.1), `docs/DESIGN_DECISIONS.md` (DS-001–DS-020), `docs/PROJECT_CONTEXT.md`, `docs/CONTENT_GAPS.md`, el registro de assets, DS v1 y `docs/ARCHITECTURE.md`. Como contexto de integración se revisaron `docs/implementation/F0_BASELINE_AUDIT.md`, `docs/implementation/IMPLEMENTATION_ENTRY.md`, el CSS de C y los componentes Astro de referencia. Los valores heredados de C proceden también del generador baseline identificado en el DS v2. El laboratorio y sus capturas son evidencia preexistente: esta tarea no ha vuelto a ejecutar el navegador ni ha verificado visualmente la landing integrada.

**Estado de aprobación:** C está aprobada visualmente para las cuatro tarjetas HTML GDB (DS-018), al igual que el refinamiento de la zona inferior (DS-007). A/B son históricos. La dirección HYBRID está aprobada, pero sus parámetros finales y hero/KV en movimiento no lo están (DS-019). El DS v2 completo, los nombres y la representación técnica de tokens y su aplicación global siguen pendientes (DS-008/018). La aprobación estática de C no se vuelve a solicitar; validaciones de integración no la sustituyen ni la reabren.

## Matriz de implementación por feature

| Feature / componentes | Contrato y alcance | Estado de referencia y trabajo posterior |
|---|---|---|
| Header, hero y video (`black-friday`) | Preservar composición, textos, marcas y video originales; estructura y orden según referencia. Ningún token altera las piezas. | Feature sin implementación de landing completa. Hero consta de tres capas verificadas por F0.1.T1; el MOV existe y el MP4 referenciado falta. Cualquier integración debe preservar las capas y validar el derivado web, sin reconstruir logos. |
| Premios, pasos y Z-ON (`condor-premia`) | Mantener tres piezas doradas, cuatro pasos originales y el mensaje de doble chance separado del banner blanco de cadastro. No aplicar tarjeta ni neón GDB. | Feature con README; sin nuevos valores Premia consolidados. Usar originales registrados, sin recorte destructivo o recoloración. |
| KV y tutorial (`game-da-black`) | KV compuesto original intacto; cuatro pasos canónicos como HTML en una tarjeta reutilizable y lista ordenada. C: máximo 1400 px, 1/2/4 columnas desde 0/640/1280, gutters 16/24/32 y gap vertical/horizontal 48/24, 48/20, 24/24. | `GameStepCard.astro` y `GameStepsSection.astro` son referencias, no implementación de C. Se requiere conciliar datos con JSON, estilos y estructura; el KV separado en capas 00–09 no está verificado. |
| Acciones (`black-friday-bottom`) | CTA amarillo principal, reglamentos secundarios, ofertas terciarias; anchos máximos 760/580/620 px para grupo/CTA/ofertas. Reglamentos a dos columnas desde 640; no crear enlaces ficticios. | `CampaignActions.astro` recibe slots: conservar destinos reales y copy completo. Sus mínimos declarados 48 px para CTA/reglamentos y 40 px para ofertas difieren de los 56/58/44 px del DS v2; comparar estados e integración. |
| FAQ y contactos (`black-friday-bottom`) | FAQ nativo `details/summary`, máximo 768; contacto máximo 920, 1/2 columnas desde 768; controles con foco visible y contenido íntegro. | Existen componentes de referencia, no paridad verificada. FAQ declara summary mínimo 56 px frente a 60 y tipografía distinta al contrato; `ContactCard` cambia padding desde 640 frente a 768. Conciliar con v2 y JSON, manteniendo placeholders identificados. |
| Footer | Preservar estructura, contenido, enlaces y logos originales; fuera del refinamiento inferior y del motion nuevo. | No extender reglas globales de C/UI inferior; validar editorialmente certificado y enlaces pendientes sin inventar valores. |
| Primitivas y estilos compartidos | Contenedor, enlaces de acción, grupo de reglamentos, FAQ y contacto son candidatos; acceso mediante HTML completo y controles nativos. | `src/components/ui/` y `src/styles/` son estructura, no prueba de primitivas o tokens implementados. Ratificar roles compartidos antes de extenderlos. No agregar framework cliente para contenido estático. |

### C: diferencias concretas que debe resolver la integración

- `GameStepsSection.astro` declara máximo 1480 px y cambia a dos/cuatro columnas en 641/1201 px, frente a 1400 y 640/1280 de C; también añade rótulo y subtítulo ajenos al JSON/referencia. La sección de C usa padding superior 44 px, 56 desde 640, e inferior 64 px.
- `GameStepCard.astro` declara radio 24, borde 2, glow más intenso con sombra interior, hover que desplaza la tarjeta, título no pill y cuerpo fluido. C declara radio 22, borde 1,5, glow exterior estático, cápsula 18 px/1,2 y cuerpo 15 px/21 px; padding 42/18/24. El borde 1,5 se computó como 1 px en el Chrome de la evidencia: comprobar otros DPR/motores sin cambiarlo por inferencia.
- C usa ilustración `contain` de máximo 260 × 190 px (200 de alto en 640–1279), badges de 46 px de alto y títulos de altura mínima 64 px; las tarjetas tienen altura natural e igualación por fila, sin truncamiento. No adoptar como alturas fijas las medidas tomadas en capturas.
- `participationSteps.ts` cambia los cuatro títulos y omite «Entre na Trilha da Black»; usar `content/landing-content.json` como fuente editorial, preservando la condición de 3 productos diferentes, compra en Condor, CPF y el bonus de 5 productos solo cuando exista. La preview de ofertas omite «Aqui a economia não para.» y el primer placeholder de FAQ difiere en una palabra; ver F0.1.T1. Ninguna discrepancia autoriza reescritura editorial.

## Matriz de tokens y estados

| Grupo | Valores y aplicación verificables | Decisión de integración |
|---|---|---|
| Core | Muestra C: fondo `#08090D`, texto `#FFFFFF`, fuente `Arial, system-ui, sans-serif`; foco de enlaces 3 px `#FFE76A` con offset 4 px. | Son valores observados en la muestra; familia global, nombres y alcance general aún por ratificar. No trasladarlos automáticamente al footer. |
| GDB C | Fondo de tarjeta `#052049` → `#04172F`, texto `#E0ECFF`, borde `#16BAFF`, radio 22; sección con gradientes definidos en v2. Badge `#FFF83F` → `#FFD500`, título `#FFF139` → `#FFD800`, bonus `#FFE500`. | Usar los valores de C dentro del tutorial; no fusionar amarillos por semejanza ni recolorear el KV o imágenes. Nombres de token siguen propuestos. |
| UI inferior | CTA `#FFE86D` / tinta `#071A42` / hover `#FFF39D`; reglamentos `#081B38` / borde `#24599A`; FAQ cerrado `#0A1E3B` y abierto `#102847`; contacto `#F6F8FC` / `#112952`. | Preservar estados y roles de la referencia inferior; contrastar foco, hover y estados reales en integración. Una ausencia de destino no debe convertirse en acción ficticia. |
| V1 y marca/Premia | Valores v1 como `core.surface #10141E`, `gdb.surface #071D4B` y `premia.gold #D7A91C` eran propuestas, no valores globales aprobados. | No promover v1 por defecto ni usarlo para redibujar marcas; no confundir colores del panel del laboratorio con los de la landing. |
| Motion | HYBRID como dirección, especificación separada en `docs/motion/v1/MOTION_DESIGN.md`; breakpoints motion 768/1280 distintos de los de C. | No copiar duraciones v1 ni unificar breakpoints por conveniencia. Contenido funcional sin JS, reduced motion, recuperación y estado final idéntico al estático. Glow C permanece estático. |

## Decisiones humanas pendientes y gates

| Pendiente | Responsable / momento | Efecto y límite |
|---|---|---|
| Aprobar DS v2 como sistema completo: roles globales, familia tipográfica, nombres y representación de tokens, incluidos roles heredados de v1. | Responsable de diseño/producto, antes de promoverlos globalmente. | Mantener como propuestas; no condiciona volver a aprobar C. Delimitar primeras secciones y mapeo antes de integración. |
| Ratificar parámetros de HYBRID, hero/KV en movimiento y dependencia necesaria. | Responsable de diseño/motion, antes de implementación motion y cierre visual. | C estática no aprueba movimiento. KV solo se verificó como compuesto; ensamblaje por capas requiere fuentes, coordenadas y recomposición verificadas, o decisión sobre fallback compuesto. |
| Confirmar FAQ, dos URLs de reglamentos, Lojas Participantes, Política de Privacidade y certificado SPA/ME del footer. | Marketing/legal, antes de publicación o de presentarlos como definitivos. | No inventar respuestas/destinos ni trasladar automáticamente el certificado de premios al footer. Pendientes no impiden una maqueta local señalizada. |
| Contrastar con reglamento cualquier condición histórica presuntamente omitida. | Marketing/legal, antes de cierre comercial. | Referencia actual y C tienen cuatro pasos; no se ha identificado una condición adicional y no se autoriza inventar un quinto. |
| Decidir/provisionar MP4 y OG, y verificar correspondencia de recursos. | Responsables de contenido/integración antes de publicación. | MOV original intacto; cualquier derivado optimizado en `assets/optimized/`. No afirmar que el MP4 u OG ya existen. |

En una tarea autorizada de integración, verificar 390/768/1280/1440 px y 1600 auxiliar, sin overflow ni pérdida de texto; comparar C y zona inferior, probar teclado, foco, destinos, contraste, zoom y DPR/motores. Asegurar HTML funcional sin JS y build Astro. Esas comprobaciones aún no se han ejecutado aquí y no acreditan fidelidad visual ni publicación.

**Resultado:** matriz preparada para F0.1.T3 y tareas posteriores; no se modificaron componentes, assets, diseños aprobados ni tokens ejecutables. Las decisiones pendientes se registran aquí como tales, sin crear nuevos acuerdos en `docs/DESIGN_DECISIONS.md`.

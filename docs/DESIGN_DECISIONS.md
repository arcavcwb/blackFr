# Decisiones y congelamiento visual

| ID | Estado | Alcance | Decisión |
|---|---|---|---|
| DS-001 | Aprobado | Hero | No modificar imagen, texto incrustado, logos ni composición del hero. |
| DS-002 | Aprobado | Premios | Mantener las 3 piezas doradas originales. |
| DS-003 | Aprobado | Condor Premia | Mantener los cuatro pasos originales sin redibujar. |
| DS-004 | Aprobado | Z-ON y aviso de cadastro | Mantener el mensaje de doble chance con Z-ON y el banner blanco de cadastro completo / actualizado como mensajes diferenciados; preservar materiales y composición originales. |
| DS-005 | Aprobado | Game da Black | Mantener KV principal e identidad visual metálica de GDB. |
| DS-006 | Aprobado visualmente | Tutorial GDB | Mantener cuatro tarjetas según `assets/generated/game-da-black/cards-aprovados/` y `references/approved/game-da-black/`, sin agregar un quinto paso. Cualquier condición histórica omitida debe identificarse y validarse con el reglamento, sin inventar contenido. Las imágenes aprobadas son referencias visuales, no masters oficiales. |
| DS-007 | Aprobado | Refinamiento UI inferior | CTA principal amarillo, reglamentos secundarios agrupados, ofertas terciarias, FAQ aireado y contactos separados. Conservar copy y destinos confirmados. Footer expresamente fuera de este alcance. |
| DS-008 | v1 propuesta histórica; v2 consolidada pendiente global | Tokens/DS | Mantener v1 intacto como base propuesta. `design-system/v2/DESIGN_SYSTEM.md` consolida valores reales de C y UI inferior, con procedencia y tokens no validados explícitos. La aprobación visual de C no aprueba el sistema completo ni todos los nombres semánticos. No recolorear piezas ni extender neón a Condor Premia. |
| DS-009 | Arquitectura acordada | Código | Astro + Tailwind + TypeScript, DRY, features y datos tipados. |
| DS-010 | Aprobado — Fase 0 | Referencia original | `http://localhost:4321/black-friday` es la referencia aprobada de estructura, contenido, orden de secciones y mecánicas. El proyecto nuevo no debe modificar ese sitio. |
| DS-011 | Aprobado — Fase 0 | Contenido canónico | `content/landing-content.json` es la fuente canónica de contenido de la landing, contrastada con la referencia. Datos de componentes no son una fuente editorial alternativa. Documentar discrepancias sin resolverlas por cuenta propia; canonicidad no equivale a aprobación legal de pendientes. |
| DS-012 | Obligatorio | Mecánicas y condiciones | Conservar todo el contenido comercial confirmado y todas las condiciones, diferenciando Condor Premia y GDB. En GDB conservar «Entre na Trilha da Black», ofertas activadas antes de comprar, 3 productos diferentes, compra en Condor, CPF en caja y 1 número; con 5 productos puede haber otro número solo cuando haya bonus. Mantener condiciones del footer, premios y beneficio Z-ON sin intercambiar reglas entre promociones. |
| DS-013 | Protegido | Assets y marcas | Preservar hero y composición, video, tres premios, cuatro pasos Condor Premia, banner blanco, KV GDB y logos originales. No recrear marcas ni redibujar, recolorear, alterar textos o recortar destructivamente piezas. No sobreescribir originales; derivados optimizados en `assets/optimized/`. |
| DS-014 | Pendiente editorial | FAQ, enlaces y certificado | FAQ placeholder, enlaces vacíos / no confirmados y certificado incompleto no son contenido final. No inventar valores ni trasladar el certificado de premios al footer sin validación. Confirmar con los responsables antes de publicar. |
| DS-015 | Preservar; fuera de refinamiento UI | Footer | Mantener contenido, estructura, logos y enlaces originales. Su exclusión del refinamiento UI no convierte placeholders o destinos vacíos en datos finales ni autoriza corregirlos sin validación editorial. |
| DS-016 | Experimento autorizado; valores no aprobados | Validación visual DS v2 | Comparar máximos GDB de 1280 y 1480 px en `prototypes/ds-v2-comparacion/`, con HTML autocontenido, JSON canónico y recursos existentes. Vistas de 390/768/1280/1440 px y 1600 auxiliar para alcanzar el máximo amplio. Sin instalar dependencias, modificar la landing original o integrar rutas finales. La matriz y recomendación del prototipo no aprueban tokens, breakpoints, tipografía ni DS v2. |
| DS-017 | Experimento conservado; C aprobada visualmente según DS-018 | Variante C GDB | La Fase 1B añadió comparación aislada A/B/C en `prototypes/ds-v2-comparacion/abc/`, conservando archivos y estilos originales A/B. C utiliza máximo 1400 px, padding 42/18/24, cuerpo 15 px / 1,4, cápsulas compactas y borde/glow más finos, solo en tarjetas HTML GDB. JSON, cuatro pasos completos, imágenes y controles compartidos; evidencia en 390/768/1280/1440/1600 con auditoría de paridad y diferencias CSS declaradas. Su estado inicial de hipótesis queda superado por la aprobación de C; el DS v2 completo sigue pendiente. |
| DS-018 | Aprobado visualmente por el usuario — 08/11/2026 | C y contratos visuales | C es la referencia visual aprobada para las tarjetas HTML GDB, incluidos sus valores efectivos y composición responsive; no volver a tratarla como elección pendiente. Conservar A/B como históricos sin cambiar su código ni evidencia. Consolidar C y refinamiento inferior en DS v2 documental `2.0.0-draft.1`; nombres semánticos, roles globales y valores aún no validados permanecen propuestas. Validaciones de integración/DPR/zoom no sustituyen ni reabren la aprobación visual de C. |
| DS-019 | Dirección HYBRID aprobada; Motion v1 propuesto | Motion separado del DS | Incorporar la especificación suministrada como `docs/motion/v1/MOTION_DESIGN.md`, revisión documental `1.1.0-proposal`. Final visible y recuperación ante fallos; disparador en cruce del borde superior del target por línea 85 % del viewport; duración individual/total separadas; foco/anclas inmediatos; verificación real de capas KV 00–09; luminosidad/glow sin filtros no autorizados ni efectos costosos. Parámetros, hero/KV en movimiento y dependencias siguen pendientes. |
| DS-020 | Contrato técnico previsto; sin ejecución | Entrada a implementación | Interfaces y gates en `docs/implementation/IMPLEMENTATION_ENTRY.md`, `1.0.0-draft.1`. Componentes Astro producen HTML completo; tokens describen estado final; motion por feature es mejora progresiva cancelable y aislada. No instala Tailwind/GSAP ni modifica producción, JSON, assets, footer o sitio original. |
| DS-021 | Implementado para revisión; motion final pendiente | Hero, Condor Premia y KV GDB | Hero: mover solo título y presentadora suministrados tras cargar los tres PNG críticos; fondo y video independientes. Premios: en desktop mover el compuesto aprobado y en móvil las tres piezas derivadas visibles, sin reconstruir el compuesto. Pasos Premia: mover wrappers en orden 1–4. KV GDB: mover solo el wrapper del compuesto original porque faltan capas verificadas. Todas las entradas parten de HTML visible, se cancelan ante foco/ancla/preferencia reducida y restituyen estilos; trayectorias y aprobación visual del movimiento quedan para F2.1.T5. |

## Cierre documental de Fase 0 — 08/11/2026

Base: matriz de correspondencia de Discovery, lectura directa de la landing original y acuerdos del usuario. Quedan fijados referencia, fuente canónica, cuatro tarjetas GDB, condiciones obligatorias, assets protegidos, alcance UI y tratamiento de pendientes. Este cierre es documental; no declara implementación, build, QA visual ni autorización de publicación.

### Discrepancias y pendientes que continúan abiertos
- Paso 1 de `participationSteps.ts`: omite «Entre na Trilha da Black»; los cuatro títulos GDB difieren de la referencia / JSON.
- `GameStepsSection.astro`: rótulo y subtítulo adicionales. Preview de ofertas: omite «Aqui a economia não para.».
- Primera respuesta de `faqs-preview.ts`: una palabra menos que en la referencia / JSON; todo el FAQ sigue siendo placeholder.
- Datos repetidos en JSON y TypeScript: conciliar en una fase posterior sin reescribir por cuenta propia el contenido canónico.
- Validar destinos de ambos reglamentos, Lojas Participantes y Política de Privacidade, y certificado del footer. El número de `sobre.premiosAlt` no resuelve automáticamente este último.
- Validar con reglamento cualquier condición histórica presuntamente omitida; no se ha identificado una condición adicional en la referencia actual de cuatro pasos.
- Integración de MP4, OG y recursos de composición. Las diferencias de tokens / medidas quedan registradas en el contrato v2, pendiente de aprobación como sistema e integración posterior; no se corrigieron componentes. Se mantienen los pendientes de `CONTENT_GAPS.md`; su antecedente de cinco pasos no exige crear otra tarjeta.

### Registro de documentos modificados
- `docs/PROJECT_CONTEXT.md`: estado de Fase 0, referencia aprobada, fuente canónica, alcance, condiciones, assets protegidos, discrepancias y pendientes.
- `docs/DESIGN_DECISIONS.md`: actualización de DS-004 y DS-006 a DS-008; incorporación de DS-010 a DS-015 y registro del cierre documental.
- Sin cambios en código, JSON, assets, dependencias ni landing original. No se modifican otros documentos en este cierre.

## Política de cambios
Toda solicitud debe identificar secciones protegidas versus modificables. Las imágenes generadas se usan como referencia, no como masters oficiales. Registrar nuevos acuerdos aquí antes de codificar.

## Consolidación de contratos — 08/11/2026

La aprobación de C y de la dirección HYBRID procede de la instrucción expresa del usuario, no de una inferencia de la auditoría. Se conserva la evidencia histórica del experimento; sus rótulos iniciales no revocan esta aprobación. El DS v2 completo, los parámetros finales de motion y la autorización de una tarea de implementación siguen pendientes.

Documentos creados:
- [Design System v2](../design-system/v2/DESIGN_SYSTEM.md), `2.0.0-draft.1`.
- [Motion Design v1](motion/v1/MOTION_DESIGN.md), `1.1.0-proposal`.
- [Entrada a implementación](implementation/IMPLEMENTATION_ENTRY.md), `1.0.0-draft.1`.

Documentos actualizados: este registro, [PROJECT_CONTEXT](PROJECT_CONTEXT.md), [ARCHITECTURE](ARCHITECTURE.md) y los registros de estado [README ABC](../prototypes/ds-v2-comparacion/abc/README.md) / [matriz ABC](../prototypes/ds-v2-comparacion/abc/matriz-abc.md). Sin regenerar HTML, CSS, JS, capturas ni evidencias JSON del laboratorio. No se modifican código de producción, JSON canónico, originales ni dependencias. Este registro no acredita nuevo build, QA visual o publicación.

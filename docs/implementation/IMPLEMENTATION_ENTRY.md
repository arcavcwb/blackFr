# Entrada a implementación — contratos visuales y motion

Versión **1.0.0-draft.1** · 08/11/2026 · planificación, sin implementación autorizada por este documento.

Fuentes únicas: [contexto](../PROJECT_CONTEXT.md), [decisiones](../DESIGN_DECISIONS.md), [DS visual v2](../../design-system/v2/DESIGN_SYSTEM.md), [Motion v1](../motion/v1/MOTION_DESIGN.md). Los valores se mantienen en sus contratos; aquí se definen responsabilidades, dependencias y gates.

## Hechos, aprobaciones y propuestas

| Estado | Alcance |
|---|---|
| Hecho verificado en archivos | Scaffold mínimo Astro, TS estricto, `package.json` con Astro `^7.4.7`, engine Node `>=22.23.4`; Tailwind/GSAP no declarados. No se ejecutó build en esta consolidación |
| Hecho documentado por evidencia existente | Laboratorio A/B/C: paridad comercial y controles, cinco viewports y capturas, valores C. No equivale a QA de una landing de producción todavía no integrada |
| Decisión aprobada | C visual, refinamiento inferior, dirección HYBRID, cuatro pasos, contenido canónico, piezas protegidas y footer excluido |
| Pendiente | DS v2 completo, parámetros finales de motion, decisiones de dependencias/versiones y contenido editorial señalado en CONTENT_GAPS |
| Propuesta de arquitectura | Interfaces, rutas nuevas de tokens y animaciones y secuencia de integración que siguen; no se crean archivos de código |

## Interfaces previstas y propiedad

| Capa / responsable | Entrada y salida previstas | Límites y pruebas del contrato |
|---|---|---|
| Adaptación de contenido / integración Astro | JSON canónico → datos tipados de secciones y cuatro pasos, con identidad estable, textos completos, énfasis y destinos confirmados | Conciliar duplicaciones TypeScript sin mantener fuente editorial paralela; no inventar quinto paso, FAQ ni URLs. Error de dato no autoriza corregir copy |
| Componentes Astro / presentación estática | Props canónicas + recursos del manifiesto → HTML completo, orden semántico, dimensiones reservadas y controles nativos | Visible sin JS. Una tarjeta reutilizable, no cuatro hardcodeadas. Wrapper externo para motion; composición interna y logos intactos |
| Tokens visuales / estilos | Roles core/GDB/Premia/UI → estilos finales del contrato visual | Nombres aún propuestos. Ámbito por feature, sin fugas al footer, Premia o assets. No copiar tiempos de motion aquí |
| Configuración motion / feature cliente | Referencia a sección, política responsive/reduced motion, tiempos candidatos → parámetros de ejecución | No recibe responsabilidad editorial; no cambia textos, enlaces ni retícula. Entradas/salidas en unidades inequívocas |
| Ciclo de vida de cada feature | Inicializar si procede; ejecutar una vez; finalizar/cancelar; limpiar al desmontar → estado final visual aprobado | Operaciones conceptuales, no API implementada. Recuperación ante fallos, foco y anclas, sin borrar transforms intrínsecos ni depender de otra timeline |
| Coordinación de página | Detección de capacidades/preferencias, recursos críticos, entradas al viewport y eventos de navegación → activación independiente de features | Sin scroll hijacking, ocultación global ni reconstrucción en cada scroll. Al cambiar a reduced motion, finalizar y limpiar |
| HTML nativo / navegador | Anclas, foco, `details/summary`, controles de video | Estado funcional no pertenece a una timeline. Motion solo decoración reversible; nunca espera para permitir interacción |
| QA / revisión | Referencia estática, hashes y contratos → evidencia de fidelidad, acceso y rendimiento | Comparar estados finales y fallos. C estática no requiere una nueva aprobación; hero/KV en movimiento y parámetros sí |

Los identificadores/atributos concretos de targets y los nombres de funciones se decidirán al implementar. Deben ser estables y estar separados del texto comercial y de selectores de diagnóstico del laboratorio. No importar su controlador, iframes ni controles de sincronización a producción.

## Rutas y dependencias

| Existente | Uso previsto / límite |
|---|---|
| `content/landing-content.json` | Única fuente editorial de landing; lectura. No modificarlo para acomodar UI |
| `src/features/game-da-black/components/GameStepCard.astro`, `GameStepsSection.astro`, `data/participationSteps.ts`, `types.ts` | Referencia para adaptar a C y props canónicas en una tarea posterior; discrepancias registradas, no corregidas aquí |
| `src/features/black-friday-bottom/` | Componentes de acciones, FAQ y contacto disponibles; cotejar con contrato inferior, no asumir paridad final |
| `src/components/ui/`, `src/layouts/`, `src/styles/` | Estructura disponible; no asumir que primitives o tokens ya están implementados |
| `src/pages/index.astro`, `src/pages/black-friday-bottom-preview.astro` | Starter y preview existentes; no son la landing final aprobada |
| `assets/originals/`, `manifests/ASSET_REGISTRY.csv` | Integridad y trazabilidad. Comprobar recursos de composición antes de motion |
| `assets/generated/game-da-black/cards-aprovados/`, `references/approved/` | Referencias visuales, no masters oficiales ni fuente editorial alternativa |
| `prototypes/ds-v2-comparacion/` y `abc/` | A/B históricos y C aprobada; preservar código/evidencia. No convertir el laboratorio en ruta pública final |

Rutas **propuestas, no creadas**: `src/styles/tokens.css` para valores visuales que se aprueben; `src/features/<feature>/motion/` para cliente aislado; módulo compartido de configuración/política motion bajo `src/` con ubicación por ratificar. La futura `src/pages/black-friday.astro` integraría la landing en este proyecto, con puerto de desarrollo explícitamente distinto del sitio original. Su URL final y cualquier despliegue requieren alcance posterior. Nunca editar el proyecto servido en `http://localhost:4321/black-friday`.

Tailwind es tecnología objetivo, no dependencia instalada. GSAP Core/ScrollTrigger son candidatos del contrato de motion. Antes de cualquier instalación: justificar necesidad, seleccionar versiones compatibles con Astro/Node y obtener autorización en una tarea de implementación. No agregar frameworks cliente para contenido estático ni librerías de smooth scroll/3D. El build futuro debe comprobarse con el toolchain acordado; aquí no se declara exitoso.

## Riesgos concretos y gates

| Riesgo / dependencia | Condición para avanzar |
|---|---|
| JSON y datos TS divergen | Integración estática debe demostrar texto/condiciones/destinos canónicos; no resolver pendientes editoriales por inferencia |
| Tokens propuestos de v1 aplicados globalmente | Aprobar alcance del DS v2 y su mapeo; mantener valores C y estilos inferiores comprobados, sin afectar footer ni artes |
| Borde 1,5 declarado / 1 computado; lectura 15/21 | QA en otros motores/DPR, zoom y dispositivos; cualquier ajuste visual posterior documentado, sin sustituir la aprobación de C |
| Capas KV 00–09 no verificadas como archivos | Bloquear ensamblaje por capas hasta manifiesto/recomposición aprobados. Si no existen, plantear contenedor del compuesto original según P05 |
| Capas hero y tiempos/recursos críticos | Verificar disponibilidad, orden y correspondencia antes de animar; no extraer piezas del hero automáticamente |
| Ocultación por JS, foco o anclas durante entrada | Demostrar P01/P04 con JS desactivado y errores antes/durante ejecución; si no es seguro, contenido permanece en estado final |
| Glow y luminosidad cuestan rendimiento o alteran arte | Mantener glow estático C y omitir filtros; cualquier efecto adicional requiere validación conforme P06 |
| FAQ/enlaces/certificado pendientes | No bloquean maqueta local señalizada; bloquean declarar esos datos finales o publicar como confirmados. Footer conserva su pendiente sin alterarlo |
| Video MP4/OG y recursos aún pendientes | Resolver alcance y trazabilidad según CONTENT_GAPS antes de publicación; motion no cambia el reproductor ni inventa archivos |

## Checklist de entrada y aceptación por fase

### I — Preparación de integración estática

- [x] C registrada como aprobada visualmente; A/B conservados históricos.
- [x] Contratos visual y motion separados; seis precisiones documentadas.
- [ ] Ratificar DS v2 global, nombres/representación de tokens y alcance de primeras secciones a integrar.
- [ ] Autorizar tarea de código y, si se requiere, instalación/versiones de dependencias. Esta consolidación no las autoriza.
- [ ] Fijar ruta/puerto aislado del proyecto nuevo y lista de archivos de intervención.
- [ ] Registrar hashes de originales/JSON y lista de discrepancias TS antes de integrar; mantenerlos intactos.

Aceptación de I: integración delimitada y herramientas acordadas, sin pendientes tratados como aprobación implícita. No se exige una nueva elección A/B/C.

### II — HTML/CSS estático, en una tarea posterior

- [ ] Adaptar cuatro datos canónicos a una tarjeta Astro reutilizable; preservar literalidad de paso 1 y paso 3, énfasis y bonus condicional.
- [ ] Reproducir C y UI inferior mediante tokens aprobados; conservar piezas protegidas y footer sin cambios.
- [ ] Verificar textos, imágenes, destinos y controles contra JSON/referencia, incluyendo «Aqui a economia não para.»; señalizar solo en entorno de revisión los pendientes editoriales.
- [ ] QA 390/768/1280/1440/1600, zoom y teclado: sin overflow, truncamiento, pérdida de bonus ni foco oculto; medios con espacio reservado.
- [ ] Build Astro sin errores con toolchain acordado; revisión visual documentada del resultado integrado.

Aceptación de II: composición final fiel, contenido completo y funcional sin JS; no basta con trasladar capturas al código. Pendientes editoriales no se presentan como contenido final.

### III — Motion progresivo, después del estado estático

- [ ] Validar recursos/capas hero y KV; decidir fallback antes de escribir secuencias.
- [ ] Aprobar parámetros pendientes por feature y dependencia necesaria; implementar solo en tarea autorizada.
- [ ] Verificar activación a línea 85 %, duraciones individuales/totales, una ejecución, recuperación ante fallos y limpieza.
- [ ] Probar JS desactivado, fallo de inicialización y durante reproducción; reduced motion al cargar/cambiar; foco/anclas durante secuencia; video independiente.
- [ ] QA en viewports y dispositivos; sin overflow/CLS por motion ni filtros no autorizados, con perfil de rendimiento y presupuesto acordado.
- [ ] Obtener revisión de hero/KV en movimiento y cerrar parámetros finales de motion antes de declararlos aprobados.

Aceptación de III: estado final idéntico al estático, acceso inmediato a contenido, evidencias técnicas y visuales completas. Publicación, integración del footer o cambios editoriales no quedan autorizados por superar este checklist.

## Alcance de este registro

Solo documentos; no componentes, animaciones, tokens ejecutables, dependencias ni assets nuevos. Esta lista complementa [ARCHITECTURE](../ARCHITECTURE.md) y no duplica las matrices de valores o la auditoría del laboratorio. Los pendientes editoriales se mantienen en [CONTENT_GAPS](../CONTENT_GAPS.md).

Verificación documental del 08/11/2026: enlaces relativos de los ocho documentos creados/actualizados resuelven; sin espacios finales ni errores de `git diff --check`. Comparación SHA-256 de 119 archivos preexistentes en `src`, `assets`, `content`, `design-system/v1`, `prototypes` y `public`: solo cambian los dos Markdown de estado ABC expresamente listados en decisiones. Sin cambios de bytes en código, JSON, assets, muestras ejecutables, capturas o evidencias del experimento. No se ejecutaron build ni nueva auditoría visual; esos checks corresponden a las fases de implementación, no a esta edición documental.

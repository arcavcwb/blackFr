# Contexto consolidado del proyecto

## Estado
Reinicio de la landing Black Friday Condor 2026 desde un proyecto nuevo (no integrarlo directamente en el viejo).

**Fase 0 cerrada documentalmente el 08/11/2026**, sobre la matriz de correspondencia de Discovery y los acuerdos del usuario. Este cierre fija referencias, contenido, alcance y pendientes; no acredita implementación, build, validación visual de la reconstrucción ni autorización para publicar.

La landing original en `http://localhost:4321/black-friday` es la referencia aprobada de estructura, contenido, orden de secciones y mecánicas promocionales. Se consulta en modo de lectura: el proyecto nuevo no debe modificar ese sitio.

**Consolidación de contratos — 08/11/2026:** el usuario aprobó visualmente la **variante C de Game da Black** y la dirección de motion **HYBRID**. C ya no está pendiente de aprobación visual. A/B se conservan como históricos de comparación. El **DS v2 completo** y los **parámetros finales de movimiento** siguen pendientes; la aprobación estática no aprueba hero/KV en movimiento ni autoriza implementación o dependencias.

Contratos vigentes de consulta:
- [DS v2 — 2.0.0-draft.1](../design-system/v2/DESIGN_SYSTEM.md): valores reales de C, UI inferior, procedencia y tokens aún no validados.
- [Motion Design v1 — 1.1.0-proposal](motion/v1/MOTION_DESIGN.md): especificación suministrada y seis precisiones técnicas.
- [Entrada a implementación — 1.0.0-draft.1](implementation/IMPLEMENTATION_ENTRY.md): interfaces previstas, rutas, dependencias, riesgos y checklist por fase.

## Tecnologías
Astro + Tailwind CSS + TypeScript, arquitectura por features, DRY, clean architecture pragmática para UI.

## Secciones de referencia, en orden
1. Header y hero «Black Todo Dia» (protegidos).
2. Video, intro y copy (asset original protegido).
3. Premios «Concorra a R$ 500.000,00» y otras dos piezas (tres premios protegidos).
4. Cuatro pasos Condor Premia (protegidos).
5. Mensaje de doble chance con Z-ON y, a continuación, aviso / banner blanco de cadastro completo y actualizado (protegidos). Son mensajes diferenciados; el banner combina texto e imágenes en la referencia.
6. Composición principal Game da Black / GDB (protegida).
7. Game da Black: pasos de participación, **variante C aprobada visualmente**, basada en la referencia de cuatro cards, con los cuatro textos canónicos íntegros.
8. CTA amarillo, reglamentos, ofertas, FAQ y canales de comunicación (refinamiento UI aprobado).
9. Footer original, fuera del alcance del refinamiento UI.

## Fuentes de verdad y alcance
- **Referencia aprobada:** `http://localhost:4321/black-friday`, para estructura, contenido comercial, orden y mecánicas.
- **Fuente canónica de contenido de la landing:** `content/landing-content.json`, contrastada con la referencia durante Discovery. La canonicidad no convierte placeholders, enlaces vacíos o certificado incompleto en contenido final ni equivale a revisión legal.
- **Material gráfico:** assets entregados en `bfAssets.zip` (Figma V04 exportado, KV GDB V03, video MOV y branding), conservados en `assets/originals/`; piezas y recortes suministrados con trazabilidad en el manifiesto y referencias exactas en `references/user-supplied/`.
- **Dirección visual aprobada:** cuatro tarjetas en `assets/generated/game-da-black/cards-aprovados/` y composiciones en `references/approved/game-da-black/`; variante C del laboratorio `prototypes/ds-v2-comparacion/abc/` aprobada para su representación HTML; refinamiento inferior en `references/approved/parte-inferior/`. No son masters oficiales de marca. A/B y las evidencias anteriores conservan su condición histórica.
- **Base y contrato visual:** Design System v1 en `design-system/v1/` permanece como propuesta de origen; [v2 consolidada](../design-system/v2/DESIGN_SYSTEM.md) registra valores efectivos aprobados de C y referencias inferiores, separando hechos, nombres semánticos propuestos y tokens pendientes. El DS v2 completo aún no está aprobado.
- Los componentes y sus datos TypeScript son implementación de referencia, no una fuente editorial independiente. Ante discrepancias con la landing o el JSON, documentarlas sin resolverlas por cuenta propia.
- `references/archive/` es material histórico, no implementación vigente.

## Decisiones aprobadas
- Preservar los materiales originales y el contenido de la campaña aprobada.
- Las dos identidades conviven sin forzar neon sobre Condor Premia.
- Tarjetas GDB C: cuatro pasos, máximo 1400 px, retícula 1/2/4 desde 0/640/1280, padding 42/18/24 y cuerpo 15/21 según el laboratorio aprobado; consultar el contrato visual para todos los valores. La aprobación de C no convierte sus medidas en reglas globales de otras secciones.
- Zona inferior: CTA amarillo principal; reglamentos secundarios agrupados; ofertas terciarias; FAQ y contactos con espacio suficiente.
- Responsive primero, no trasladar las cuatro tarjetas como una sola gran imagen.
- Dirección motion HYBRID aprobada: finales idénticos al diseño, scroll nativo, mejora progresiva y movimiento reducido. Duraciones, trayectorias, ensamblaje y efectos finales continúan propuestos en el contrato separado de motion.
- El footer queda fuera del refinamiento UI: preservar contenido, enlaces, logos y estructura originales. Su certificado incompleto y enlaces pendientes siguen sujetos a validación editorial.

## Conservación obligatoria de contenido y assets
- Conservar todo el contenido comercial confirmado de la landing y del JSON, sin pérdidas, resúmenes no autorizados ni condiciones añadidas.
- Mantener diferenciadas **Condor Premia** (cadastro, CPF, un número por cada R$ 50 y sus premios) y **Game da Black** (ofertas activadas, productos diferentes y sus sorteos). Conservar también condiciones de participación del footer, período promocional y beneficio Z-ON; no trasladar reglas de una mecánica a la otra.
- GDB mantiene **cuatro pasos**, sin agregar un quinto. El paso 1 conserva **«Entre na Trilha da Black»** y la comprobación de cadastro completo y actualizado.
- El paso 3 conserva compra de **3 productos diferentes de ofertas activadas**, en una tienda Condor, con CPF en caja, para obtener **1 número de la suerte**. Con **5 productos**, puede obtenerse otro número **cuando haya bonus**; no presentarlo como beneficio garantizado.
- Preservar hero y su composición, video original, tres premios dorados, cuatro pasos Condor Premia, banner blanco, KV GDB y logos originales. No redibujar, recolorear, alterar textos incrustados, recortar destructivamente ni recrear marcas mediante IA, CSS o SVG improvisado.
- No sobreescribir originales. Si se requieren derivados optimizados en una fase posterior, deben ir en `assets/optimized/` y conservar íntegra la información gráfica aprobada.

## Discrepancias registradas, sin corrección en Fase 0
- `participationSteps.ts` cambia títulos de los cuatro pasos GDB y omite «Entre na Trilha da Black» en el paso 1. La regla y el bonus condicional del paso 3 sí están presentes.
- `GameStepsSection.astro` incorpora rótulo y subtítulo adicionales respecto del bloque de la referencia / JSON.
- La preview inferior omite «Aqui a economia não para.» en el CTA de ofertas.
- `faqs-preview.ts` tiene una palabra menos en la primera respuesta placeholder que la referencia / JSON; las respuestas 2–4 coinciden.
- Los datos de pasos, FAQ y contactos están duplicados entre JSON y módulos TypeScript. Su conciliación queda para implementación, preservando la fuente canónica y sin reescrituras editoriales no aprobadas.

## Restricciones / pendientes
- FAQ placeholder, URLs de los dos reglamentos, enlaces de Lojas Participantes y Política de Privacidade y certificado incompleto del footer son **pendientes editoriales**, no contenido final. Validar con los responsables; no inventar respuestas, destinos ni números.
- El certificado concreto en `sobre.premiosAlt` no autoriza completar automáticamente el marcador del footer. La discrepancia se valida con marketing/legal.
- Cualquier condición histórica presuntamente omitida al pasar a cuatro tarjetas debe identificarse y contrastarse con el reglamento. La referencia actual ya tiene cuatro pasos; no se ha confirmado una condición adicional ni se autoriza inventar un quinto paso.
- No hay archivos editables completos de Figma ni logos vectoriales oficiales incluidos.
- `content/ganhadores-content.json` es contenido entregado; su página y fuente remota requieren definición de alcance y validación independiente. No sustituye la fuente canónica de la landing.
- MP4 referenciado, imagen OG y correspondencia de recursos gráficos con la composición original siguen pendientes de integración / verificación según `docs/CONTENT_GAPS.md` y Discovery.
- El paquete importado aporta código parcial. El proyecto nuevo ya tiene scaffold mínimo Astro, `package.json`, lockfile y TypeScript estricto; Tailwind y la landing completa aún no están integrados. No asumir compilación ni fidelidad visual hasta probarlas.
- En `assets/originals/game-da-black/` se verificó el KV compuesto; no se han verificado allí archivos separados 00–09. No iniciar ensamblaje por capas sin trazabilidad, coordenadas y recomposición contra el aprobado. La enumeración del documento de motion no prueba su disponibilidad.
- Esta consolidación es documental: no modifica código, JSON, assets, footer, dependencias ni la landing original; no repite auditoría visual ni declara completada la implementación.

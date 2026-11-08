# F0 — Preparación y contratos

## F0.1 — Package: auditoría y preparación

### F0.1.T1 — Auditar contenido y assets

- **Modelo**: codex/gpt-5.6-luna
- **Estimación**: 45m
- **Razón**: Auditoría documental de complejidad baja.
- **Dependencies**:
- **Files**:
  - `docs/implementation/F0_BASELINE_AUDIT.md`

Comparar content/landing-content.json con los datos TypeScript.
Verificar integridad y disponibilidad de assets mediante los manifiestos.
Identificar capas reales del hero y KV, sin inventarlas.
Registrar discrepancias y pendientes editoriales.

No modificar JSON, assets, componentes ni documentos aprobados.
Entregable: informe con evidencias y rutas verificadas.

### F0.1.T2 — Revisar Design System v2

- **Modelo**: codex/gpt-6.1-terra
- **Estimación**: 1h
- **Razón**: Análisis técnico de complejidad media.
- **Dependencies**: F0.1.T1
- **Files**:
  - `docs/implementation/F0_DESIGN_REVIEW.md`

Analizar design-system/v2/DESIGN_SYSTEM.md y las decisiones aprobadas.
Revisar variante C, tokens, componentes y alcance por feature.
Identificar decisiones pendientes de aprobación humana.
No alterar componentes, assets ni diseños aprobados.

Entregable: matriz de implementación y decisiones pendientes.

### F0.1.T3 — Evaluar preparación para Astro

- **Modelo**: codex/gpt-6.1-sol
- **Estimación**: 1h
- **Razón**: Evaluación de arquitectura y dependencias.
- **Dependencies**: F0.1.T1, F0.1.T2
- **Files**:
  - `docs/implementation/F0_READINESS.md`

Contrastar IMPLEMENTATION_ENTRY.md con el estado actual.
Verificar Astro 7, Tailwind 4, TypeScript 5 y GSAP.
Definir gates de contenido, build, responsive, accesibilidad y motion.
Distinguir bloqueos técnicos de aprobaciones humanas pendientes.

No implementar funcionalidades ni modificar el diseño.
Entregable: checklist técnico para autorizar F1.

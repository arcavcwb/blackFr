# F1 — Integración estática Astro

## F1.1 — Package: landing Black Friday

### F1.1.T1 — Preparar estructura Astro y estilos base
- **Modelo**: codex/gpt-6-luna
- **Estimación**: 1h
- **Razón**: Integración inicial de configuración y estilos.
- **Dependencies**: F0.1.T3
- **Files**:
  - `astro.config.mjs`
  - `src/styles/`
  - `src/layouts/`

Configurar Tailwind 4 ya instalado y estructura de estilos.
Utilizar el mapeo visual revisado en F0.
No modificar originales ni implementar animaciones.

### F1.1.T2 — Adaptar contenido canónico a TypeScript
- **Modelo**: codex/gpt-5.6-terra
- **Estimación**: 1h
- **Razón**: Adaptación tipada con reglas editoriales estrictas.
- **Dependencies**: F1.1.T1
- **Files**:
  - `src/data/`
  - `src/features/game-da-black/data/`

Usar content/landing-content.json como única fuente editorial.
Evitar duplicaciones y preservar textos, enlaces y condiciones.
No inventar FAQ, destinos ni contenido comercial.

### F1.1.T3 — Integrar hero y video promocional
- **Modelo**: codex/gpt-5.6-sol
- **Estimación**: 1.5h
- **Razón**: Composición visual con recursos originales protegidos.
- **Dependencies**: F1.1.T2
- **Files**:
  - `src/features/black-friday-hero/`

Implementar hero estático fiel a la referencia.
Usar únicamente recursos disponibles y verificados.
No inventar capas, logos, videos ni imágenes.
Garantizar HTML visible sin JavaScript.

### F1.1.T4 — Integrar Condor Premia y Z-ON
- **Modelo**: codex/gpt-6-sol
- **Estimación**: 1.5h
- **Razón**: Secciones con composición y reglas comerciales.
- **Dependencies**: F1.1.T2
- **Files**:
  - `src/features/condor-premia/`
  - `src/features/z-on/`

Preservar las tres piezas metálicas y cuatro pasos Premia.
Conservar textos canónicos, aviso blanco y mensaje Z-ON.
Mantener proporciones y assets originales.

### F1.1.T5 — Implementar Game da Black variante C
- **Modelo**: codex/gpt-6.1-terra
- **Estimación**: 2h
- **Razón**: Fidelidad visual, componentes reutilizables y responsive.
- **Dependencies**: F1.1.T2
- **Files**:
  - `src/features/game-da-black/`

Reproducir la variante C aprobada.
Implementar exactamente cuatro tarjetas reutilizables.
Preservar bonus condicional, textos y logos.
Retícula desktop 4, tablet 2, mobile 1.
No importar el controlador del laboratorio A/B/C.

### F1.1.T6 — Integrar CTA, FAQ y contacto
- **Modelo**: codex/gpt-6-luna
- **Estimación**: 1h
- **Razón**: Componentes nativos y reutilización del código existente.
- **Dependencies**: F1.1.T2
- **Files**:
  - `src/features/black-friday-bottom/`

Respetar el refinamiento inferior aprobado.
CTA amarillo, acciones de reglamento, FAQ y contacto.
Usar controles HTML nativos y accesibles.
Señalizar datos pendientes solo en entorno de revisión.
No modificar el footer.

### F1.1.T7 — Componer landing completa
- **Modelo**: codex/gpt-6.1-sol
- **Estimación**: 1.5h
- **Razón**: Integración de todas las secciones.
- **Dependencies**: F1.1.T3, F1.1.T4, F1.1.T5, F1.1.T6
- **Files**:
  - `src/pages/black-friday.astro`

Componer las secciones en el orden canónico.
Preservar textos, assets y navegación.
No modificar el sitio original del puerto 4321.
No añadir contenido ni secciones no aprobadas.

### F1.1.T8 — QA de integración estática
- **Modelo**: codex/gpt-6-astra
- **Estimación**: 1.5h
- **Razón**: Revisión integral independiente de la integración.
- **Dependencies**: F1.1.T7
- **Files**:
  - `docs/implementation/F1_QA.md`

Verificar build Astro, contenido, accesibilidad y responsive.
Revisar anchos 390, 768, 1280, 1440 y 1600.
Verificar visibilidad sin JS, teclado y enlaces.
Documentar diferencias y corregir fallos comprobados.
No declarar publicados los datos editoriales pendientes.

# F2 — Motion HYBRID y QA

## F2.1 — Package: animaciones progresivas

### F2.1.T1 — Verificar recursos para motion
- **Modelo**: codex/gpt-5.6-luna
- **Estimación**: 45m
- **Razón**: Comprobación documental de capas y fallbacks.
- **Dependencies**: F1.1.T8
- **Files**:
  - `docs/implementation/F2_ASSET_CHECK.md`

Verificar capas reales del hero y KV Game da Black.
Registrar disponibilidad y correspondencia.
Si no existen capas individuales, utilizar composición original.
Prohibido fabricar o extraer capas automáticamente.

### F2.1.T2 — Implementar infraestructura GSAP accesible
- **Modelo**: codex/gpt-6.1-terra
- **Estimación**: 1.5h
- **Razón**: Ciclo de vida, accesibilidad y recuperación.
- **Dependencies**: F1.1.T8
- **Files**:
  - `src/features/motion/`

Implementar motion progresivo con GSAP y ScrollTrigger.
Activar según línea de viewport al 85 por ciento.
Respetar prefers-reduced-motion y cambios dinámicos.
El contenido debe seguir visible si JavaScript falla.
No secuestrar el scroll ni bloquear controles o anclas.

### F2.1.T3 — Animar tarjetas y secciones secundarias
- **Modelo**: codex/gpt-5.6-sol
- **Estimación**: 1.5h
- **Razón**: Secuencias independientes de complejidad media.
- **Dependencies**: F2.1.T2
- **Files**:
  - `src/features/game-da-black/motion/`
  - `src/features/black-friday-bottom/motion/`

Implementar entradas progresivas de tarjetas y secciones.
Preservar la apariencia final de la variante C.
No modificar retículas, textos ni assets.
Evitar filtros costosos y ocultación permanente.

### F2.1.T4 — Animar hero, Premia y KV
- **Modelo**: codex/gpt-6-sol
- **Estimación**: 2h
- **Razón**: Coordinación de secuencias visuales complejas.
- **Dependencies**: F2.1.T1, F2.1.T2
- **Files**:
  - `src/features/black-friday-hero/motion/`
  - `src/features/condor-premia/motion/`
  - `src/features/game-da-black/motion/`

Aplicar dirección Motion HYBRID documentada.
Animar capas únicamente si están verificadas.
Usar fallback sobre composición íntegra si faltan capas.
No inventar recursos ni alterar las piezas originales.
Mantener video y navegación independientes del motion.

### F2.1.T5 — QA final de motion y rendimiento
- **Modelo**: codex/gpt-6-astra
- **Estimación**: 2h
- **Razón**: Verificación integral, accesibilidad y rendimiento.
- **Dependencies**: F2.1.T3, F2.1.T4
- **Files**:
  - `docs/implementation/F2_QA.md`

Comprobar reduced motion, fallos JS y estado final.
Revisar CLS, overflow, foco, anclas y responsive.
Ejecutar verificaciones y build disponibles.
Registrar resultados, limitaciones y pendientes de aprobación.
No publicar la landing ni aprobar unilateralmente motion.

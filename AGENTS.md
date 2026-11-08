# Agent instructions — Black Friday Condor 2026

## Objetivo
Construir una landing responsive con Astro + TypeScript + Tailwind CSS, respetando las dos identidades: Black Todo Dia / Condor Premia y GDB / Game da Black.

## Lectura obligatoria (en orden)
1. `docs/PROJECT_CONTEXT.md`
2. `docs/DESIGN_DECISIONS.md`
3. `docs/CONTENT_GAPS.md`
4. `manifests/ASSET_REGISTRY.csv` (buscar por ruta o rol)
5. `design-system/v1/DESIGN_SYSTEM.md`
6. `docs/ARCHITECTURE.md`

## Reglas no negociables
- **NO** recrear logos oficiales mediante IA, CSS ni SVG improvisado.
- **NO** redibujar, alterar textos, recortar destructivamente ni recolorear piezas aprobadas. Usar fuentes en `assets/originals/`.
- **NO** sobreescribir originales. Versiones optimizadas van a `assets/optimized/`.
- **NO** tomar `references/archive` como implementación vigente.
- **NO** inventar URLs de reglamentos, datos del SPA/ME, respuestas FAQ ni premios.
- Las 4 tarjetas GDB aprobadas están en `assets/generated/game-da-black/cards-aprovados/` y la composición en `references/approved/game-da-black/`.
- Mantener las imágenes originales del hero, premios, 4 pasos Condor Premia, banner blanco y KV de GDB.
- Priorizar semántica HTML, accesibilidad, responsividad y separación de contenido y presentación.
- No introducir frameworks cliente para contenido estático.
- El Design System v1 es una **propuesta**: verificar tokens con los activos reales; no modificar colores incrustados en piezas.

## Arquitectura
- Código: `src/features/<feature>/components|data|types`, `src/components/ui`, `src/layouts`, `src/styles`.
- `src/` incluye implementación de referencia, sin scaffold de dependencias. No asumir que el proyecto compila hasta probarlo.
- DRY: una tarjeta reutilizable + datos de pasos, nada de cuatro tarjetas hardcodeadas.
- Responsive visual objetivo para GDB: desktop 4, tablet 2, móvil 1 columna; validar 390/768/1440px.

## Criterio de cierre
- Visual freeze respetado.
- No se pierde ni inventa copy ni información de la mecánica promocional.
- No hay overflow horizontal.
- Interacciones con targets explícitos y foco visible.
- Build Astro sin errores y revisión visual documentada.
- Registrar cada decisión nueva en `docs/DESIGN_DECISIONS.md`.

# F2 — Verificación de recursos para motion

**Tarea:** F2.1.T1  
**Fecha:** 2026-11-09  
**Fuente de verificación:** `assets/originals/`, `manifests/ASSET_REGISTRY.csv`, `docs/motion/v1/MOTION_DESIGN.md` (P05, M01 y M07).

## Resultado

El hero dispone de tres piezas originales separadas en PNG RGBA y puede evaluarse como composición por capas, sujeto a cotejo visual de su recomposición y a la preservación de sus posiciones finales. El KV de Game da Black dispone únicamente de un compuesto original; no se encontraron capas individuales `00–09`. Por tanto, M07 no queda habilitado como ensamblaje por capas: la implementación debe conservar el compuesto íntegro y, como máximo, animar su contenedor.

No se extrajeron, redibujaron, recortaron ni fabricaron capas.

## Inventario de recursos vigentes

| Área | Archivo | Evidencia | Correspondencia para motion |
|---|---|---|---|
| Hero | `assets/originals/hero/hero-fundo-figma-v04.png` | PNG RGBA, 1440×914; SHA-256 `c53e803ca5c16da0c43f03193c093f815fcf5089843a6055a236cc68a9d856eb` | Fondo original. Debe permanecer visible desde el inicio; no aplicar brillo, filtros o recoloración. |
| Hero | `assets/originals/hero/hero-apresentadora-v04.png` | PNG RGBA, 650×661; SHA-256 `cec79fb557fde545893f85c39d942eee6404112fdd6ca2b4b414efac2a7e9b63` | Pieza separada compatible con la entrada candidata de la presentadora de M01. Validar escala/posición contra el aprobado antes de animar. |
| Hero | `assets/originals/hero/hero-titulo-black-todo-dia-v04.png` | PNG RGBA, 791×433; SHA-256 `0fa961701d3c378b8a056844857dbdd6ce2d1e5a9671b62b7dc169225f71ea87` | Pieza separada compatible con la entrada candidata de marca/título de M01. Validar escala/posición contra el aprobado antes de animar. |
| KV GDB | `assets/originals/game-da-black/gdb-key-visual-v03.png` | PNG RGBA, 1346×757; SHA-256 `6767e27191e47a2b5cfc54309bc0136ca1f7b4d696a2ee5425a58b39328c81d1` | Composición íntegra. Fallback requerido para M07; no hay correspondencia verificable con capas separadas. |

## Comprobación de capas GDB

La búsqueda del árbol vigente no encontró archivos de capas individuales para `00-fundo` ni `01`–`09` dentro de `assets/originals/game-da-black/`. La documentación de motion advierte expresamente que la enumeración `00–09` es intención de diseño y no prueba disponibilidad. Los archivos bajo `references/archive/` son históricos y no se consideran recursos de implementación.

En consecuencia, no están disponibles los datos necesarios para autorizar un ensamblaje por capas: rol individual, dimensiones, transparencia, orden de apilamiento, coordenadas finales y recomposición contrastada con el KV aprobado.

## Decisión para la siguiente implementación

- **Hero:** puede prepararse una entrada progresiva de los tres wrappers originales, manteniendo el fondo visible y el estado final idéntico. La separación de archivos no sustituye la validación visual de posición, escala y superposición.
- **KV GDB:** usar `gdb-key-visual-v03.png` sin alteraciones. No extraer capas ni importar piezas desde referencias o archivos históricos. Si se implementa motion, limitarlo a la entrada reversible del contenedor del compuesto, con contenido visible sin JavaScript y `prefers-reduced-motion` en estado final.
- **M07:** queda pendiente/no habilitado como ensamblaje por capas hasta que exista un paquete de capas suministrado y se registre su correspondencia completa.
- Video, logos, textos incrustados y demás piezas protegidas permanecen fuera de esta verificación y no deben convertirse en capas para motion.

## Limitaciones

Esta comprobación es documental y de inventario. No declara aprobación visual del hero o KV en movimiento, no define trayectorias finales ni autoriza instalar GSAP/ScrollTrigger. La revisión visual de la recomposición del hero y la aprobación de motion siguen siendo gates posteriores.

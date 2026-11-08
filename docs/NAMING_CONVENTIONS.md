# Convenciones de nombres

## Asset filenames
- **kebab-case en minúsculas**, ASCII sin acentos, sin espacios.
- Nombres en portugués para elementos de campaña, con prefijos de dominio: `hero-`, `logo-`, `gdb-`, `premio-`, `passo-`, `card-`.
- Los cuatro pasos llevan números de dos dígitos: `passo-01-...` a `passo-04-...`.
- Los archivos fuente suministrados mantienen **exactamente el mismo contenido binario**. Solo cambió la ruta/nombre.
- `-v03`, `-v04` refleja la nomenclatura suministrada, no una aprobación independiente.

## Jerarquía y estados
- `assets/originals` = entregados por usuario, originales del lote (NO garantía de logo vectorial o brand master oficial).
- `assets/derived` = recorte, descomposición o separación de otra imagen.
- `assets/generated` = generación visual IA, aprobada únicamente como dirección / referencia.
- `references/approved` = referencia aceptada, no necesariamente arte final publicado.
- `references/archive` = iteraciones históricas o material obsoleto.
- `src` = código de referencia Astro + Tailwind; conservar PascalCase de componentes y convenciones nativas.
- `design-system/v1` = mantener nombres de CSS/HTML/JSON internos para que sus links relativos funcionen.

## Identificadores de contenido
`content/landing-content.json` conserva JSON original (sin transformación) y `content/ganhadores-content.json` igual. No localizar, reescribir ni normalizar el copy en esta etapa.

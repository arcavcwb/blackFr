# Guía de carpetas

| Carpeta | Descripción | Uso previsto |
|---|---|---|
| `00_LEER_PRIMERO` | Contexto, decisiones, inventario y checklist. | Leer antes de codificar. |
| `01_ENTRADAS_DEL_USUARIO` | Archivos de origen aportados en esta conversación, incluidas capturas y recortes que envió el usuario. | Fuentes de referencia; conservar inalterados. |
| `02_RECORTE_Y_DESCOMPOSICION` | Premios, pasos Condor Premia y logos separados de imágenes de entrada. | Assets derivados; comprobar alfa y fidelidad. |
| `03_DISENOS_APROBADOS` | Composiciones GDB revisadas y 4 cards PNG separados. | Referencia para nueva implementación y comparación visual. |
| `04_DESIGN_SYSTEM_V1` | Especificación, tokens CSS/JSON, HTML de guía y assets. | Propuesta de tokens para evolución a DS v2. |
| `05_ASTRO_TAILWIND_IMPLEMENTACION` | Último paquete de features con GDB cards, botones, FAQ, contacto y previews. | Punto de partida para integrar de forma selectiva. |
| `06_HISTORICO_NO_USAR_EN_LUGAR_DE_LA_ULTIMA_VERSION` | Iteraciones AI, prototipos y versiones antiguas Astro. | Histórico para consultar, NO copiar a producción. |

## Orden de trabajo sugerido
1. Revisar `PROJECT_CONTEXT.md` y `DECISIONES_Y_PENDIENTES.md`.
2. Comparar la entrada de cada pieza con su derivado en `02_...`.
3. Aprobar assets de producción contra lo que marketing liberó en el proyecto viejo.
4. Revisar `04_DESIGN_SYSTEM_V1/DESIGN_SYSTEM.md` y `GUIA_VISUAL.html`.
5. Instalar Astro + Tailwind en el proyecto nuevo, sin modificar los assets protegidos.
6. Adaptar selectivamente los componentes de `05_ASTRO_TAILWIND_IMPLEMENTACION/src/`, con QA visual.

## Notas de fidelidad
- `01_ENTRADAS_DEL_USUARIO` no prueba que un archivo sea master de marca oficial. Puede ser una captura del material de marketing.
- `03_DISENOS_APROBADOS` incluye generaciones de IA que se aceptaron **como referencia visual**, no como assets de logo final.
- Las imágenes PNG de cards son recortes raster; para responsive y accesibilidad es preferible texto HTML + ilustraciones separadas.

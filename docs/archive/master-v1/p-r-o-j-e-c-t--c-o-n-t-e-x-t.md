# Project Context — Black Friday Condor 2026

## Objetivo
Construir una nueva versión de la landing `Black Todo Dia é no Condor` usando **Astro + Tailwind CSS + TypeScript**, una arquitectura DRY y un Design System, preservando la identidad aprobada de la campaña.

## Alcance
La landing integra dos universos visuales:
- **Black Todo Dia / Condor Premia:** piezas gráficas negras y doradas, 3 premios originales y 4 pasos de participación originales.
- **Game da Black (GDB):** imagen de campaña GDB original, mensajes promocionales y un tutorial de 4 pasos rediseñado y aprobado como referencia visual.

## Bloques protegidos (visual freeze)
- Hero principal `Black Todo Dia`.
- Video y materiales gráficos de marca de la campaña.
- Los 3 premios dorados y su copy incrustado.
- Los 4 pasos originales Condor Premia.
- Banner blanco de aviso/Z-ON y sus textos legales.
- Composición visual principal GDB.
- Logos y assets originales que ya estuvieran aprobados por marketing.

**No regenerar ni redibujar estas piezas**. Sus copias de la carpeta `01_ENTRADAS_DEL_USUARIO` son fuentes de referencia; cuando existan archivos maestros oficiales en el repositorio, esos archivos deben prevalecer.

## Cambios visuales aprobados en esta conversación
1. Reemplazar la secuencia informativa GDB anterior de 5 bloques por 4 nuevos cards visuales, sujeto a validar que toda la información de la mecánica comercial siga disponible.
2. Rediseñar la zona inferior: CTA amarillo principal, reglamentos secundarios agrupados, ofertas como enlace terciario, FAQ con aire y acordeones accesibles, contactos separados.
3. Unificar espacios, contenedores, jerarquía tipográfica y responsive sin alterar los recursos originales.

## Stack y decisiones arquitectónicas
- Astro, TypeScript, Tailwind CSS.
- Feature folders para `game-da-black`, `black-friday-bottom`, `condor-premia`.
- Componentes presentacionales reutilizables, contenido tipado separado en `data/`, sin introducir React cuando HTML/Astro bastan.
- UX responsive: 4 columnas desktop, 2 tablet, 1 móvil para los pasos GDB; CTA y FAQ adaptables.
- Arquitectura por etapas: Discovery → Inventario → Design System → Componentes → QA visual.

## Contexto conocido y límites
- Se analizaron una captura del sitio local y su contenido accesible por túnel Cloudflare.
- El proyecto viejo no se va a modificar: esta carpeta es material de arranque para un proyecto nuevo.
- **No están incluidos** archivos completos de Figma, fuentes tipográficas oficiales, repositorio actual, ni originales vectoriales maestros de los logos. No inventarlos.
- Imágenes generadas con IA en este ZIP tienen el propósito de **referencia de diseño**, no de master de marca.
- Las ilustraciones extraídas pueden contener halos, bordes rasterizados o texto de la imagen; revisar antes de usarlas en producción.

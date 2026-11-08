# Prototipo aislado — comparación DS v2

Estado: **experimento para validación, valores y DS v2 no aprobados**. Fecha: 08/11/2026.

**Corrección de paridad:** consultar `auditoria-paridad.md` y `evidencia-paridad.json`. El laboratorio anterior permitía desincronizar modo y controles entre los iframes; esta versión centraliza el estado y solo muestra «Paridad verificada» después de contrastar las dos muestras renderizadas.

## Abrir

Abrir `index.html` para la comparación A/B; `prototipo.html` es la vista autónoma a tamaño real. CSS, JavaScript, JSON e imágenes están incluidos y no necesitan CDN, Tailwind ni dependencias. Se diseñaron para uso local; la revisión de navegador se realizó mediante HTTP local. La apertura directa mediante `file://` no pudo verificarse porque la política del navegador de revisión bloquea ese protocolo.

Para revisión por HTTP, desde la raíz del repositorio:

```sh
python3 -m http.server 8766 --bind 127.0.0.1 --directory prototypes/ds-v2-comparacion
```

Abrir `http://127.0.0.1:8766/`. Detener con Ctrl+C. Es un servidor local separado; no utiliza ni cambia `localhost:4321/black-friday`, la portada Astro o la ruta final de campaña.

## Controles y vistas

- Selector de viewport: **390, 768, 1280 y 1440 px**; ambas variantes se muestran a la misma escala. Vista adicional de 1600 px para alcanzar el máximo de 1480.
- A: máximo GDB 1280 px. B: máximo GDB 1480 px. Solo cambia este máximo.
- Modo HTML: cuatro tarjetas con ilustraciones existentes y contenido canónico íntegro; bonus separado visualmente, sin reescritura.
- Modo PNG: los cuatro cards de `assets/generated/game-da-black/cards-aprovados/`, embebidos byte por byte. Son referencia gráfica; su copy resumido no sustituye al JSON.
- Desplegar la composición GDB aprobada desde cualquier panel actualiza ambos.
- Abrir/cerrar un FAQ desde cualquier panel sincroniza la respuesta equivalente en ambos. El botón global refleja también un estado mixto. Los placeholders llevan aviso explícito.
- Los estados visuales de hover/foco se sincronizan; el foco real se mantiene en el control que está usando la persona.
- Los dos iframes comparten ancho y alto de viewport y escala. El máximo GDB es la única variable intencional.
- El selector global es la única autoridad de representación en el laboratorio; los enlaces de cambio internos se reservan para páginas autónomas.
- El indicador y «Descargar evidencia JSON» permiten verificar DOM, texto visible, imágenes, condiciones, controles y estilos. No usar una muestra en estado «Comprobando» o «Comparación inválida» para decidir el ancho.
- “Abrir a tamaño real” abre una página fluida; el ancho lo determina esa ventana. El selector del laboratorio controla el ancho de los iframes, no cambia la ventana externa.
- El selector no simula zoom del navegador ni dispositivos táctiles. La validación a tamaño real se realizó por override de viewport de Chrome.

## Fuente y fidelidad de contenido

`generar.py` lee exclusivamente `content/landing-content.json` para el contenido comercial. Convierte los énfasis `**…**` en elementos `strong` y separa el bonus del paso 3 sin cambiar sus palabras. El JSON completo se incluye para auditoría; no se recrea la parte superior ni el footer como UI.

Se conservan las dos líneas de introducción GDB, cuatro títulos/descripciones, «Entre na Trilha da Black», productos diferentes, ofertas activadas antes de comprar, Condor, CPF, un número, cinco productos y «quando houver bônus». También el CTA, la frase completa de ofertas, FAQ de origen y todos los datos de contacto del bloque.

Los dos reglamentos sin URL permanecen como elementos de texto con su pendiente visible; no se crean enlaces ni botones que aparenten funcionar. El FAQ se identifica como contenido provisional. El certificado del footer no se completa ni se presenta como definitivo.

La referencia gráfica tiene títulos más cortos y omite algunas condiciones; el HTML utiliza el texto canónico completo. No son capturas idénticas ni tienen por qué tener la misma altura. La geometría y el glow son candidatos, no nuevos valores aprobados.

## Recursos existentes, sin redibujo

- Cuatro ilustraciones de `src/assets/game-da-black/`.
- Logo GDB ya disponible en `src/assets/game-da-black/gdb-logo-original.png`: copia de un recorte derivado, **no un master oficial acreditado**.
- Logo Condor suministrado en `assets/originals/branding/logo-condor-com-sombra.png`.
- Iconos genéricos SVG reutilizados literalmente de `ContactCard.astro`; no son nuevos logos.
- Cuatro cards y composición aprobada, intactos y solo como referencia visual.

`proveniencia.json` registra hashes de fuente y recursos raster. Las imágenes se incluyen como data URI, sin recorte, recoloración ni transformación del archivo fuente. El tamaño del HTML de revisión no es una estrategia de entrega para producción.

## Parámetros experimentales

- Retícula GDB: 1 columna bajo 640 px, 2 entre 640 y 1279, 4 desde 1280.
- Gutters: 16 / 24 / 32 px; gaps: 24 móvil, 20 tablet y 24 desktop; separación vertical de tarjetas HTML 48 px en 1/2 columnas.
- Contenido: Arial / system-ui; cuerpo 16 px, línea 1.5. Títulos GDB fluidos 18–22 px, peso 900 cursivo, cabecera amarilla de mínimo 84 px y radio píldora.
- Tarjeta: radio 24 px, borde 2 px `#16BAFF`, gradiente y glow basados en el componente Astro existente. Badge: radio 14 px y 52 px de alto.
- Altura natural; sin `line-clamp`, carrusel ni tamaño de letra menor para encajar el paso 3.
- CTA/FAQ/contacto conservan límites propios 580/768/920 px en ambas variantes; no se ensanchan junto a GDB.
- Se reserva scrollbar vertical en las muestras para que el iframe y la vista autónoma compartan un área útil comparable. Chrome de esta revisión reservó 15 px; sistemas con scrollbar superpuesto pueden ofrecer 15 px adicionales.

## Reproducción

```sh
python3 prototypes/ds-v2-comparacion/generar.py
```

Regenera solo `index.html`, `prototipo.html` y `proveniencia.json`. No escribe en código de producción, contenido o assets. Si cambia el JSON, regenerar y repetir las comprobaciones visuales antes de reutilizar los resultados.

`controlador.js` y `muestra.js` son fuentes del experimento, embebidas durante esa generación. Una revisión común enlaza cada HTML con su controlador; las evidencias exportadas corresponden a la revisión indicada en el JSON.

Consultar `comparativa.md` para medidas, riesgos y recomendación. La revisión no es un build Astro ni una aprobación editorial o del DS v2.

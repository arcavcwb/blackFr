# Auditoría y corrección de paridad A/B

Fecha: 08/11/2026. Resultado: **paridad de contenido validada; DS v2 no aprobado**.

## Diagnóstico reproducido

El estado encontrado en la pestaña del usuario era HTML / 390 px en ambos paneles y coincidía en contenido. Esto no descarta el problema: el controlador anterior permitía que la comparación dejara de ser equivalente después de interactuar.

1. En HTML / 1440 px, abrir «Pergunta 1» solo en A dejaba la respuesta visible únicamente en A. El botón global no recibía ni reflejaba ese cambio local. Los datos canónicos eran iguales, pero los estados y textos visibles no.
2. Activar con Enter el enlace interno «4 cards aprovados» de A cambiaba solo ese iframe a `mode=approved`. B seguía en HTML y el selector global seguía mostrando HTML. Las imágenes y el texto visible eran diferentes: no era un efecto del máximo del contenedor.
3. La composición desplegable también tenía estado independiente. Además, cada iframe tomaba su propia altura, por lo que los viewports no eran idénticos en ambas dimensiones.
4. El control global anterior de FAQ era una orden aislada de abrir/cerrar todo; no había una autoridad compartida para estados individuales, navegación interna o interacciones visuales. El mensaje de tamaño no comprobaba modo, contenido o versión.

La causa está en la **desincronización del estado del laboratorio**, no en dos juegos distintos de contenido fuente. La validación anterior revisaba la fidelidad de cada muestra por separado, pero no impedía estas divergencias posteriores; por ello no bastaba como prueba de comparación controlada.

## Corrección, limitada al prototipo

- `controlador.js` mantiene una única configuración de modo, viewport y estado de los cuatro FAQ y la composición de referencia. Toda interacción en A o B se replica en ambos.
- Las herramientas internas de cambiar de modo/ancho se ocultan en los iframes. En el laboratorio se utiliza exclusivamente el selector global. Siguen disponibles en la vista autónoma.
- Ambos iframes tienen exactamente el mismo ancho **y alto de viewport**, y la misma escala. El único parámetro intencional diferente es `--gdb-max`, 1280 / 1480 px.
- Los estados visuales de hover y foco se reflejan en ambos. El foco real sigue en el control activo; no se mueve el foco al otro iframe. En muestras embebidas, los estados visuales dependen de esa configuración común y no de pseudoestados residuales de un iframe inactivo.
- Los mensajes llevan revisión y número de configuración; se descartan respuestas antiguas durante cambios rápidos. La revisión también figura en la URL de cada iframe para evitar mezclar una muestra antigua con el controlador nuevo.
- El indicador visible permanece en comprobación hasta recibir las dos capturas renderizadas compatibles. Si difieren, muestra «Comparación inválida», en lugar de afirmar paridad.
- La generación conserva los dos HTML autocontenidos: los archivos JS son fuentes del prototipo y se incluyen dentro del HTML, sin nuevas dependencias de red.

## Evidencia de navegador

`evidencia-paridad.json` es la exportación real del laboratorio corregido, descargada desde Chrome. Contiene **19 capturas de estado verificadas**, incluida la cobertura de estas ocho combinaciones:

| Representación | 390 px | 768 px | 1280 px | 1440 px |
|---|---|---|---|---|
| HTML canónico | Paridad completa | Paridad completa | Paridad completa | Paridad completa |
| Cuatro PNG aprobados | Paridad completa | Paridad completa | Paridad completa | Paridad completa |

En cada registro se comparan:

- revisión y máximos esperados A/B;
- mismo modo y mismo viewport en ancho y alto;
- SHA-256 de la serialización del `main` renderizado;
- SHA-256 de su texto visible, normalizando únicamente espacios y saltos de línea;
- imágenes: hash SHA-256 de los bytes originales decodificados de la data URI, orden, alt, visibilidad, carga y dimensiones naturales;
- estado abierto/cerrado de todos los controles y estado de interacción común;
- textos y destinos de enlaces;
- cuatro títulos y descripciones contra el JSON canónico, incluido «Entre na Trilha da Black» y el paso 3 íntegro con su bonus condicional;
- fuente canónica embebida, hoja CSS y propiedades visuales no geométricas de los componentes;
- ausencia de overflow horizontal.

Se probaron además apertura de FAQ desde A, cierre desde B, apertura/cierre de la composición desde paneles opuestos, apertura global de cuatro respuestas, cierre individual que deja un estado mixto, conservación de ese estado al cambiar a PNG y cambios rápidos de modo/viewport. Todos los registros finales tienen las comprobaciones en `true` y hashes A/B iguales en las nueve categorías registradas.

Ejemplo del último registro HTML / 1440 px, con controles cerrados:

| Categoría | SHA-256 idéntico en A y B |
|---|---|
| DOM de `main` | `cab31733b2897b83567f212b71532e3b6e3a984eab6024c8d68b7a3ebcc64ded` |
| Texto visible | `c3467c453bc132054337b169acddec18cdd4617cf5aeb41c65e2941bb99a135d` |
| Condiciones comerciales | `e440fb5991afa1be447fd612ab6ed5761f4fc3abbfa21df319fbfcd83224fbb8` |
| Imágenes y visibilidad | `848d08a72c5adf847aeee4f86835e9e51d3cf6646dd249c870f1195422f1161d` |

Los datos completos, los dos snapshots y el historial están en el JSON exportado. El propio laboratorio permite repetir la comprobación y descargar evidencia nueva. Una igualdad del DOM por sí sola no basta: los controles, visibilidad, modo y viewport se contrastan por separado.

## Integridad y límites

- Se comprobó que **188 archivos existentes fuera de `prototypes/` conservan su hash previo**, incluidos contenido, assets, código, documentación, DS v1 y referencias. No se modificó la landing aprobada.
- El SHA-256 del JSON canónico de archivo sigue siendo `1c8a6b09670a4bb4b7ec29a3a1cc7696b8c7e7a972e734ff03da407455e3d3cb`. El hash del JSON embebido difiere por su serialización, pero su objeto es idéntico y ambos paneles comparten esa misma serialización.
- Los PNG son una representación de referencia con copy resumido; no sustituyen al contenido canónico. La paridad se exige **entre A y B dentro del mismo modo**, no entre HTML y PNG.
- La geometría y los saltos de línea pueden variar como consecuencia del máximo GDB. Los rótulos técnicos A/B también identifican máximos distintos; no forman parte del contenido comercial comparado.
- FAQ, destinos y certificado pendientes no se convierten en contenido final. Esta corrección no valida tokens definitivos ni aprueba el DS v2.
- El servidor de `localhost:8766` ya estaba activo antes de esta auditoría; se reutilizó sin cambiarlo ni detenerlo.

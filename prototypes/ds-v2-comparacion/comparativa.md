# Comparativa visual — DS v2 experimental

Fecha: 08/11/2026. Estado: **no aprobado**. Variantes con idénticos estilos, contenido y recursos; única variable: máximo del contenedor GDB.

**Auditoría posterior de paridad:** la versión inicial permitía desincronizar el modo y los controles después de interactuar, por lo que su validación individual no era suficiente para garantizar una comparación controlada. La corrección y la evidencia están en `auditoria-paridad.md` y `evidencia-paridad.json`. Usar esta matriz únicamente con ambos paneles en el mismo modo/viewport y el indicador «Paridad verificada». La recomendación de ancho continúa siendo provisional; no se aprueba el DS v2.

## Medidas en Chrome

Anchos medidos en CSS px con scrollbar clásica de 15 px. Los valores pueden ganar 15 px útiles en sistemas con scrollbar superpuesto. Esto no cambia el breakpoint ni la conclusión sobre el máximo.

| Viewport | Columnas | Área GDB A / B | Tarjeta A / B | Alto de fila A / B | Líneas de bonus A / B |
|---|---:|---:|---:|---:|---:|
| 390 | 1 | 343 / 343 | 343 / 343 | Paso 3: 608 / 608 | 3 / 3 |
| 768 | 2 | 705 / 705 | 342,5 / 342,5 | Fila 2: 618 / 618 | 3 / 3 |
| 1280 | 4 | 1201 / 1201 | 282,25 / 282,25 | 656 / 656 | 4 / 4 |
| 1440 | 4 | 1280 / 1361 | 302 / 322,25 | 632 / 608 | 4 / 3 |
| 1600, auxiliar | 4 | 1280 / 1480 | 302 / 352 | 632 / 608 | 4 / 3 |

El texto de la regla principal del paso 3 ocupa 5/5 líneas a 390/768, 6 a 1280 y 6/5 en A/B a 1440 y 1600. El bonus se cuenta aparte en la tabla. El total de líneas de todo el párrafo, incluida la caja de bonus, es 8, 8, 10, 9/8 y 9/8 respectivamente.

Los 1480 px son un **máximo**, no un ancho forzado. A 1440 px la variante B aún no alcanza ese máximo; la vista auxiliar de 1600 demuestra la diferencia completa de 200 px entre contenedores.

## Observaciones de legibilidad y composición

| Aspecto | Diferencia observable | Riesgo / tratamiento |
|---|---|---|
| 390 y 768 | A/B equivalentes; lectura a 16 px, bonus visible. | El paso 3 es más alto por su contenido completo. No acortarlo ni reducir la fuente para igualarlo a una imagen de referencia. |
| 1280 | A/B equivalentes; cuatro tarjetas de unos 282 px y bonus de cuatro líneas. | Es el caso de mayor densidad; el máximo de 1480 no lo corrige a este viewport. Validar si cuatro columnas desde 1280 sigue siendo la decisión final. |
| 1440 | B añade 20,25 px por tarjeta, baja una línea del bonus y reduce 24 px la altura de fila. | B favorece el contenido canónico; A concentra la composición y deja márgenes exteriores mayores. |
| 1600 | B alcanza 1480; tarjetas de 352 px frente a 302 de A. | La diferencia completa solo existe en pantallas suficientemente anchas. No extrapolarla a móvil o tablet. |
| Cabeceras | Píldora amarilla y cursiva reconocibles; títulos tomados íntegros del JSON. | Son más largos que los PNG aprobados. La familia Arial y las formas CSS no reproducen una fuente de marca oficial; quedan por validar. |
| Radios | 24 px en tarjeta, 14 px en badge y píldora en título; idénticos entre A/B. | Son candidatos. La referencia raster no acredita esos radios exactos. |
| Bordes / glow | Se mantiene la dirección cian sobre azul; el brillo HTML es menos intenso que el halo blanco/cian de la referencia. | No declarar equivalencia gráfica ni extender el glow a la zona inferior. Intensidad final pendiente. |
| Ilustraciones | Recursos existentes con `object-fit:contain`, sin alterar sus archivos. | Hay tamaños y proporciones diferentes entre ilustraciones. La tercera es más horizontal; no deformarla para igualar ocupación. |
| Alturas | Filas desktop iguales por la tarjeta más alta; altura natural por tarjeta en móvil. | Espacio libre bajo pasos breves frente a mayor densidad del paso 3. Es preferible al truncado; alineación óptica final por revisar. |
| Refinamiento inferior | CTA, reglamentos, ofertas, FAQ y contacto mantienen las mismas medidas en A/B. | No es una variable del experimento de ancho. FAQ y destinos pendientes están señalizados. |

## Recomendación para la siguiente validación

Recomendar **máximo 1480 px solo para el tutorial GDB**, manteniendo límites propios en la zona inferior. A 1440 mejora el caso más denso sin omitir condiciones ni reducir tipografía; a 1600 ofrece la mayor diferencia de lectura.

Esta recomendación **no aprueba un token definitivo**. A 1280 ambas variantes siguen teniendo exactamente la misma densidad: decidir el breakpoint de cuatro columnas y la tipografía final requiere una revisión específica. La alternativa 1280 sigue siendo válida si se prioriza una composición más contenida y se acepta la mayor altura del paso 3.

## Comprobaciones y límites

- Dos variantes revisadas en 390, 768, 1280 y 1440 px, más 1600 auxiliar.
- Comparación programática del DOM contra los cuatro títulos y descripciones del JSON: sin pérdida de palabras, ignorando solo énfasis Markdown y espacios de separación visual.
- Imágenes cargadas; cuatro pasos; ningún overflow horizontal, clipping del contenido de tarjetas o bonus fuera del contenedor en esas vistas.
- Revisión visual de HTML y PNG de referencia; no equivalencia pixel por pixel.
- FAQ abierto con teclado (Espacio); anillo visible de 3 px. Tab desde CTA pasa a ofertas, sin controles ficticios de reglamento. Apertura sincronizada de las cuatro respuestas en ambas muestras comprobada.
- Visor corregido y comprobado: al pasar de 390 a 1440 la altura de la muestra A baja de 4558 a 2668 px; no conserva el espacio vacío de una altura anterior.
- Contrastes calculados de pares declarados: CTA 13,77:1; reglamento 15,08:1; respuesta FAQ abierta 10,83:1; enlace de contacto 8,37:1; cuerpo GDB sobre el extremo más claro del gradiente de tarjeta 13,45:1; bonus 14,08:1. Son comprobaciones parciales de color, no una auditoría completa de accesibilidad.
- Integridad: 97 archivos existentes de `src/`, `assets/`, `content/`, DS v1 y referencias aprobadas conservan su hash previo. JSON embebido idéntico y recursos raster embebidos sin cambios de bytes.
- Medidas y comprobaciones registradas en `validacion.json`; fuente y recursos en `proveniencia.json`.
- Apertura directa `file://` no verificada: el navegador de revisión bloquea ese protocolo. La revisión se completó por HTTP local.
- No se compila ni integra Astro/Tailwind; no se publica y no se altera el sitio original.

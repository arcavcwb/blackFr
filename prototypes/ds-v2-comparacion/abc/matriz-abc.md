# Matriz A/B/C — evidencia de Fase 1B y aprobación de C

Fecha: 08/11/2026. **C aprobada visualmente por el usuario; DS v2 completo pendiente.** Medidas y evidencia originales conservadas. A/B permanecen históricos. Esta actualización cambia el estado documental, sin repetir QA ni modificar muestras. Contrato consolidado: [DS v2](../../../design-system/v2/DESIGN_SYSTEM.md); aprobación registrada en [DS-018](../../../docs/DESIGN_DECISIONS.md).

## Medidas efectivas

Chrome reservó 15 px de scrollbar. Anchos y alturas en CSS px. «H3» indica altura de la tarjeta número 3, no nivel de encabezado HTML.

| Viewport | Columnas | Contenedor A / B / C | Ancho de tarjeta A / B / C | H3 A / B / C | Líneas del bonus A / B / C |
|---|---:|---|---|---|---|
| 390 | 1 | 343 / 343 / 343 | 343 / 343 / 343 | 608 / 608 / **506** | 3 / 3 / 3 |
| 768 | 2 | 705 / 705 / 705 | 342,5 / 342,5 / 342,5 | 618 / 618 / **516** | 3 / 3 / 3 |
| 1280 | 4 | 1201 / 1201 / 1201 | 282,25 / 282,25 / 282,25 | 656 / 656 / **548** | 4 / 4 / 4 |
| 1440 | 4 | 1280 / 1361 / 1361 | 302 / 322,25 / 322,25 | 632 / 608 / **527** | 4 / 3 / 3 |
| 1600 | 4 | 1280 / 1480 / 1400 | 302 / 352 / 332 | 632 / 608 / **506** | 4 / 3 / 3 |

A 1440, C reduce 81 px (13,3 %) frente a B y 105 px (16,6 %) frente a A. A 390 reduce 102 px (16,8 %) frente al baseline. No es una reducción de ancho: a 1440 B y C tienen el mismo ancho efectivo porque ninguno alcanza todavía un máximo que los separe. La diferencia visual procede del tratamiento interno de C. A 1600 C sí queda entre A y B en anchura.

Alturas completas de las cuatro tarjetas:

| Viewport | A | B | C |
|---|---|---|---|
| 390 | 448 / 448 / 608 / 448 | 448 / 448 / 608 / 448 | **392 / 392 / 506 / 392** |
| 768 | 458 / 458 / 618 / 618 | 458 / 458 / 618 / 618 | **402 / 402 / 516 / 516** |
| 1280 | 656 / 656 / 656 / 656 | 656 / 656 / 656 / 656 | **548 / 548 / 548 / 548** |
| 1440 | 632 / 632 / 632 / 632 | 608 / 608 / 608 / 608 | **527 / 527 / 527 / 527** |
| 1600 | 632 / 632 / 632 / 632 | 608 / 608 / 608 / 608 | **506 / 506 / 506 / 506** |

## Diferencias exclusivamente visuales de C

| Propiedad | Baseline A/B histórico | C aprobada visualmente | Observación |
|---|---|---|---|
| Máximo GDB | 1280 / 1480 | 1400 px | Intermedio; no fuerza ancho ni overflow. |
| Padding de tarjeta | 44 / 20 / 24 px | 42 / 18 / 24 px | Más ancho útil de texto, menor aire superior. |
| Borde | 2 px | Declarado 1,5 px; computado **1 px** en este navegador | El redondeo depende del motor / densidad; validar en otra pantalla antes de fijarlo. |
| Radio tarjeta | 24 px | 22 px | Conserva la dirección redondeada. |
| Glow | Dos sombras exteriores y una interior | Blur 5 px cian al 55 %, blur 18 px azul al 20 %, sin sombra interior | Contorno más limpio, menor halo; mantiene cian sobre azul. |
| Numeración | Alto 52, mínimo 78, fuente 34 px | Alto 46, mínimo 70, fuente 30 px; top −23, radio 13 y sombra más pequeña | Reduce la masa amarilla sin quitar orden. |
| Cápsula de título | Mínimo 84 px, peso 900, fuente fluida hasta 22 | Mínimo 64 px, fuente 18, peso 800, línea 1,2, padding 10/12, tracking −0,02 em | Máximo **dos líneas** en los cinco tamaños, sin truncamiento. |
| Ilustración | Caja 210 px, 220 en tablet; máximo 290 | Caja 190 px, 200 en tablet; máximo 260; margen inferior 16 | Archivos intactos y `contain`; la ilustración 3 sigue siendo más horizontal. |
| Cuerpo | 16 px / 24 px | **15 px / 21 px** | Escala visual aprobada en C; pendiente comprobar dispositivos/zoom en integración. |
| Bonus | Padding 12/10, margen 14, peso 700 | Padding 9/10, margen 10, borde 1, peso 600; fuente heredada 15/21 | Conserva toda la frase canónica y sus énfasis, sin fórmula resumida. |

El color de texto, fondos de tarjeta, amarillo, ilustraciones y logos no cambian. Las secciones inferiores mantienen su estilo y contenido. El CSS de C no alcanza hero, premios, Condor Premia, aviso, KV, video ni footer.

## Evaluación visual y de lectura

- **Desktop:** C tiene cápsulas menos dominantes y un contorno más fino; la fila pierde peso y altura. Se conserva el ritmo neón y las ilustraciones de la referencia. Los pasos breves siguen dejando espacio al final de una fila igualada por el paso 3; ese espacio baja respecto de A/B, pero no desaparece artificialmente.
- **Móvil:** la captura muestra el paso 3 íntegro, con productos diferentes, Condor, CPF, número y bonus. 15 px forma parte de C aprobada; la revisión no equivale a una prueba con usuarios ni validación en todos los dispositivos.
- **1280:** sigue siendo el caso más denso. El bonus mantiene cuatro líneas; no se reduce la fuente para hacerlo más corto. Cuatro columnas desde 1280 forman parte de C aprobada; la comprobación técnica del resultado integrado continúa pendiente.
- **Ilustración 3:** conserva su proporción horizontal original. No se estira para llenar la altura reservada; el blanco entre imagen y texto se mantiene controlado por la caja de medio, no por recorte.
- **Baseline:** la hoja CSS base es idéntica a la del laboratorio original y los archivos A/B conservan sus hashes. En la extensión, los estilos computados A/B coinciden entre sí; las diferencias con C corresponden a su lista declarada.

## Evidencia y comprobaciones

- `evidencia-abc.json`: exportación real del navegador, 15 estados verificados, con cobertura de los cinco viewports en HTML y PNG.
- Paridad de DOM, texto visible, condiciones, enlaces, imágenes y controles entre A/B/C. No hay cambios de copy; se conserva «Entre na Trilha da Black» y el paso 3 literal del JSON.
- Sin overflow horizontal, clipping ni contenido fuera de tarjeta en las vistas medidas. C no supera dos líneas por título.
- FAQ abierto con Espacio desde C y cerrado desde A, sincronizado en las tres vistas. Tab desde el CTA de C pasa al enlace de ofertas, con foco visible de 3 px; no activa reglamentos sin destino.
- `galeria.html`: capturas de A/B/C desktop y móvil. Los seis JPEG son bytes de captura del navegador sin procesamiento de píxeles. `capturas.json` registra tamaños y hashes.
- Los viewports de captura fueron 1440×1100 y 390×1100 CSS px. La API devuelve JPEG de 1425×1089 y 375×1058; cada grupo conserva la misma salida y encuadre. La matriz usa medidas DOM, no píxeles de la imagen.

## Estado y pendientes posteriores

1. **Aceptación visual de C cerrada:** es la referencia para implementación posterior de las tarjetas HTML; A/B se conservan históricos sin cambios.
2. Comprobar lectura 15/21 en dispositivos reales y con zoom, especialmente el bonus; no solicitar nuevamente la elección visual de C.
3. Comprobar borde declarado 1,5 px y glow en otros motores/DPR. Cualquier ajuste posterior exige registrar el cambio, sin corregirlo silenciosamente.
4. Reproducir en integración las ilustraciones, cápsulas de 64 px y espacios de C aprobada, sin estirar ni recortar arte.
5. Conservar máximo 1400 y cuatro columnas desde 1280 para C; su generalización a otros contextos y el DS v2 completo siguen pendientes.
6. FAQ, reglamentos y certificado siguen pendientes editoriales; motion mantiene aprobación de dirección HYBRID, con parámetros finales pendientes por separado.

La aprobación visual de C no aprueba automáticamente la nomenclatura/alcance global de tokens ni el Design System v2 completo. Los artefactos de implementación y evidencia conservan sus bytes históricos.

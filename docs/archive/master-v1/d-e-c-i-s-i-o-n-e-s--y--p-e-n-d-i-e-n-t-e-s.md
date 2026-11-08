# Decisiones consolidadas y pendientes

## Aprobado visualmente por el usuario
- Conservar materiales principales de la campaña sin tocar.
- Cuatro cards para el tutorial Game da Black, con estética azul neón y numeración amarilla.
- El paso 1 utiliza la marca Clube Condor; el paso 2 la marca cromada GDB; no inventar variantes de logos.
- La tarjeta 3 sin carrito de compras; comunicar productos activados y número de la suerte.
- Zona inferior con CTA amarillo dominante, reglamentos agrupados, enlace de ofertas menos prominente, FAQ y contactos con mayor separación.
- Astro + Tailwind + TypeScript; DRY, datos separados y arquitectura limpia.

## Propuestas, no hechos aprobados en producción
- Design System v1.0 (paleta, tokens, escala tipográfica, componentes) es una **propuesta**.
- Mockup de página completa en `06_HISTORICO...` fue una exploración, no una maqueta final aprobada pixel por pixel.
- Los mockups e ilustraciones AI pueden diferir de logos oficiales; incluso en un diseño que gustó deben usarse las fuentes oficiales disponibles al implementarlo.

## Pendientes imprescindibles
1. Obtener o extraer del nuevo repositorio los masters verdaderos de hero, video, banner blanco, premios, GDB y marcas. No reemplazarlos por capturas del ZIP si existen masters mejores.
2. Validar términos legales y la transición de 5 a 4 pasos GDB; no omitir reglas o condiciones del sorteo.
3. Confirmar las URL/acciones oficiales de los botones de reglamentos: el código entregado solo tiene slots como placeholders.
4. Sustituir preguntas/respuestas de FAQ de prueba por contenido aprobado.
5. Integrar Design System con la configuración Tailwind existente; no hay `package.json` ni configuración Astro global en el paquete.
6. Ejecutar build y QA visual en 390/768/1440 px del nuevo proyecto.
7. Reconfirmar identidad gráfica de logos pixel-perfect: aquí únicamente existen capturas/recortes, no SVG masters.

## No hacer
- No inventar logos, textos comerciales, números de autorización, premios ni reglas.
- No sustituir hero, imágenes protegidas ni el banner blanco por regeneraciones.
- No copiar código histórico sobre `05_ASTRO_TAILWIND_IMPLEMENTACION`; es anterior y tiene implementaciones diferentes.
- No publicar reglamentos con `<span>` no funcionales ni FAQ con placeholders.

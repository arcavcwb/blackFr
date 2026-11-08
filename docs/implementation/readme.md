# Black Friday Condor 2026 — Refinamiento UI/UX inferior

**Objetivo:** integrar la mejora visual acordada en el área posterior a las tarjetas de Game da Black: CTA principal, reglamentos, ofertas, FAQ y contactos, sin modificar ninguna otra sección de la LP.

## Contenido
- `src/features/black-friday-bottom/` — componentes Astro/TypeScript/Tailwind nuevos.
- `src/features/game-da-black/` y `src/assets/game-da-black/` — copia intacta de las cuatro tarjetas anteriores. Opcional si ya las tienes.
- `src/pages/black-friday-bottom-preview.astro` — ruta opcional de prueba.
- `INTEGRACION.md` — pasos exactos y advertencias de reglamentos/FAQ.
- `PREVIEW.html` — vista previa estática offline; no es el código Astro publicado.
- `captura-desktop.png` / `captura-mobile.png` — capturas de la preview, para revisar proporciones.

## Arquitectura

- `CampaignActions.astro`: presentación de acciones mediante slots, respetando enlaces/eventos existentes.
- `FaqAccordion.astro`: acordeón `<details>` nativo y lista tipada.
- `ContactCard.astro`: contacto reutilizable y accesible.
- `ContactSection.astro`: presentación responsiva de contactos.
- `PostGameBottom.astro`: composición exclusiva de la zona inferior.
- `data/contacts.ts`: textos y enlaces reales vistos en el sitio.
- `data/faqs-preview.ts`: contenido de relleno que actualmente tiene la landing, sólo para staging/preview.
- `types.ts`: contratos.

Se ha mantenido el contenido de marca, no se añadieron promesas promocionales nuevas y no se inventaron URL de reglamentos. El código todavía requiere conexión a los elementos originales de tu repositorio para quedar instalado.

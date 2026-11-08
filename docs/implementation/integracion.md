# Integración controlada en la LP de Black Friday Condor 2026

## Alcance aprobado

**No tocar:** header, hero, video, copy superior, tres premios dorados, cuatro pasos de Condor Premia, banner Z-ON blanco, imagen principal GDB, copy del GDB y footer. No regenerar marcas ni imágenes.

**Modificar:** exclusivamente el bloque de acciones debajo de los **4 pasos GDB actuales**, FAQ y contacto. No duplicar los cuatro pasos ya existentes.

## Instalación

1. Copia `src/features/black-friday-bottom/` a `src/features/black-friday-bottom/` de tu proyecto.
2. `src/features/game-da-black/` y `src/assets/game-da-black/` también se incluyen sin cambios respecto al paquete anterior, sólo si aún no los habías instalado. **No los copies encima de componentes que hayas refinado ya en tu repositorio.**
3. En la página Astro donde ahora aparecen los CTA + FAQ + contacto, importa:

```astro
---
import PostGameBottom from '../features/black-friday-bottom/components/PostGameBottom.astro';
import { faqPreviewItems } from '../features/black-friday-bottom/data/faqs-preview';
---
```

4. **Cambia `faqPreviewItems` por la variable de preguntas reales de tu proyecto cuando esté disponible**. Las preguntas actuales son placeholders, transcritos de la página de staging, no preguntas oficiales.
5. Sustituye **sólo el bloque actual de CTA + FAQ + contacto** por:

```astro
<PostGameBottom faqs={faqPreviewItems}>
  <!-- Conserva este href de la página actual, o usa el valor actual del repositorio. -->
  <a slot="primary" href="https://clubecondor.com/">
    BAIXE O APP CLUBE CONDOR E ACESSE O GAME DA BLACK ↗
  </a>

  <!-- IMPORTANTE: COPIA AQUÍ LOS ELEMENTOS EXISTENTES DE REGLAMENTOS,
       INCLUYENDO SUS href O MANEJADORES. NO INVENTAR DESTINOS. -->
  <span slot="regulation-game">REGULAMENTO DO GAME DA BLACK</span>
  <span slot="regulation-black">REGULAMENTO BLACK FRIDAY</span>

  <a slot="offers" href="https://institucional.condor.com.br/ofertas/">
    CONFIRA AQUI AS MELHORES OFERTAS DA BLACK DO CONDOR
  </a>
</PostGameBottom>
```

**Importante:** los dos `<span>` de reglamentos son sólo controles visuales *no interactivos*, porque la página disponible no expone sus href. **Antes de publicar, reemplaza cada uno por el `<a>` o `<button>` real que ya funciona en tu repositorio**, conservando su comportamiento. No lanzar esta variante con spans si el reglamento es una acción esencial.

## Acciones existentes / slots

`PostGameBottom` acepta 4 elementos nombrados (`primary`, `regulation-game`, `regulation-black`, `offers`). Al ser `slot`, se preserva el `href`, `target`, `rel`, y la semántica del elemento original. Los estilos Tailwind se aplican desde sus contenedores.

Los elementos de FAQ se entregan como datos a `FaqAccordion` (`{id, question, answer}`); el estado de acordeón lo maneja `<details>` nativo (sin React ni scripts).

## Criterios de aceptación

- Desktop: CTA principal centrado; 2 reglamentos en fila; ofertas como enlace terciario.
- Tablet/móvil: reglamentos apilados, ancho sin overflow, CTA accesible al tacto.
- Al menos 80 px entre bloque de acciones y FAQ; 12–16 px entre preguntas.
- FAQ de lectura cómoda (`max-w-[768px]`), sin neón dominante.
- FAQ y contacto separados visualmente, contacto blanco con textos originales.
- Ningún bloque original ni asset aprobado afectado.
- Ningún `href` inventado. Los reglamentos deben conectarse a destinos reales antes de publicar.

## Restricciones

- Tailwind ya debe estar operativo en la LP, v3 o v4.
- No hay archivos de configuración Tailwind/TS ni `package.json` dentro del paquete: así no se modifica tu arquitectura existente.
- No requiere JavaScript de cliente.
- `src/pages/black-friday-bottom-preview.astro` es *opcional*, y debe importarse desde el layout que ya incluye Tailwind global, si tu proyecto lo requiere.
- No se ejecutó `astro build` contra tu repositorio local: no tengo acceso de escritura a `localhost:4321`.

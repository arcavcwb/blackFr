# Game da Black — Componentes Astro (DRY)

Una sección web responsiva creada a partir de las cuatro tarjetas aprobadas. Los textos y números son HTML nativo; las ilustraciones están **recortadas de las imágenes existentes** (sin regenerar los logos). El resultado no es una cuadrícula de cuatro PNG con texto rasterizado.

## Integración

1. Copia `src/features/game-da-black/` a `src/features/game-da-black/` de tu proyecto Astro.
2. Copia `src/assets/game-da-black/` a `src/assets/game-da-black/`.
3. Importa la sección en tu landing:

```astro
---
import GameStepsSection from '../features/game-da-black/components/GameStepsSection.astro';
---
<GameStepsSection />
```

Adapta la ruta relativa del `import` a la página donde lo uses. Para probarlo, puedes copiar también `src/pages/game-da-black-preview.astro` y abrir `/game-da-black-preview`.

## Responsividad

- >=1201px: cuatro tarjetas por fila.
- 641–1200px: dos columnas.
- <=640px: una columna.
- Tamaño de letra legible, tarjetas de altura flexible y contenido sin recortes.

## Arquitectura

- `data/participationSteps.ts`: único origen del copy y orden de pasos.
- `types.ts`: contrato tipado de cada paso.
- `components/GameStepCard.astro`: componente de UI reutilizable (SRP).
- `components/GameStepsSection.astro`: composición y semántica de sección/lista.
- `styles/gameSteps.css`: estilos encapsulados bajo `.gdb`, sin Tailwind ni JS de cliente.
- `src/assets/game-da-black/`: ilustraciones recortadas de los 4 PNG originales + logo GDB original.
- `references/`: 4 PNG completos tal como fueron cortados, como respaldo visual.

Si cambia el texto comercial o las reglas, edita **solo** `participationSteps.ts`. Verifica el reglamento oficial antes de publicar cambios en la mecánica.

## Reglas de implementación

- El logo GDB y la marca Clube Condor se muestran a partir de recortes entregados previamente; no fueron dibujados otra vez. El logo Clube está dentro de la ilustración del primer paso.
- No se inventan botones funcionales: el switch de ofertas dentro de la ilustración es decorativo, no interactivo.
- `<ol>` y `<h3>` ofrecen estructura comprensible para lectores de pantalla.
- `<Image>` de Astro optimiza imágenes al compilar y evita mantener bundles pesados.
- No hay hidratación ni JavaScript de cliente añadido por estos componentes.

**Nota de QA:** las ilustraciones están basadas en PNG previamente aprobados; el recorte usa una máscara suave para integrar los fondos. La calidad de la marca depende de la resolución del material recibido. Esta entrega está preparada para integrarse en un proyecto Astro existente; el build debe ejecutarse en tu repositorio.

# Game da Black — Astro + Tailwind CSS

Versión de la sección «É muito fácil participar do Game da Black» hecha con **componentes Astro y clases utilitarias Tailwind**. Conserva la arquitectura DRY original, las 4 ilustraciones recortadas de los assets ya aprobados, las marcas extraídas de las referencias suministradas y el copy en portugués.

**Requisito:** Astro con Tailwind ya configurado (v3 con su integración, o v4 con `@tailwindcss/vite`). No se instala una segunda instancia de Tailwind ni se incluye `tailwind.config` porque debe respetar tu proyecto real. Si usas Tailwind v3, asegúrate de que la configuración `content` escanee `./src/**/*.{astro,html,js,jsx,ts,tsx}`. Si utilizas Tailwind v4, tu CSS global debe incluir `@import 'tailwindcss';` y estar importado en el layout de la página. No incluyas ambas configuraciones a la vez.

## Integración (en un proyecto que ya usa Tailwind)

1. Copia los directorios `src/features/game-da-black/` y `src/assets/game-da-black/` a tu proyecto.
2. Importa el componente desde la página o layout en donde irá la sección:

```astro
---
import GameStepsSection from '../features/game-da-black/components/GameStepsSection.astro';
---
<GameStepsSection />
```

3. Si quieres ver la composición aislada, copia también `src/pages/game-da-black-preview.astro` y abre `/game-da-black-preview` (teniendo tu Tailwind global cargado en el layout/entrypoint).

## Archivos

```text
src/
├── assets/game-da-black/              # 4 ilustraciones recortadas + logo original extraído
├── features/game-da-black/
│   ├── types.ts                        # Contrato tipado
│   ├── data/participationSteps.ts      # Contenido e imágenes por paso
│   └── components/
│       ├── GameStepCard.astro          # Card reutilizable, estilos Tailwind
│       └── GameStepsSection.astro      # Header + lista ordenada responsiva
└── pages/game-da-black-preview.astro
```

## Responsive

- Hasta 640px: 1 columna.
- 641–1200px: 2 columnas.
- Desde 1201px: 4 columnas, conectores visuales entre tarjetas.
- La tercera tarjeta ajusta su altura de forma natural y muestra la condición del bono de forma destacada.

## Principios

- **DRY:** no se duplican cuatro fragmentos Astro/CSS; cada tarjeta usa `GameStepCard` y un dato de `participationSteps.ts`.
- **Separación de responsabilidades:** contenido, contrato y vista se encuentran en archivos distintos.
- **Sin CSS propio de la feature:** los estilos están en utilidades Tailwind y valores arbitrarios puntuales para la identidad visual.
- **Semántica:** `<section>`, `<ol>`, `<li>` y títulos reales; los números y conectores meramente decorativos se marcan como `aria-hidden`.
- **Performance:** ilustraciones procesadas con `astro:assets` (`webp`, `loading="lazy"`). Sin JS de cliente ni hidratación.
- **Accesibilidad:** los efectos hover respetan `prefers-reduced-motion`.

## Alcance de entrega

El ZIP es un **paquete de componentes para integrar**; no es un proyecto Astro completo con `package.json`. La estructura de archivos y las referencias locales se comprobaron, pero **no se ha ejecutado `astro build` dentro de tu repositorio**. Las imágenes de referencia son capturas extraídas: si sustituyes luego los archivos por logos oficiales vectoriales, no necesitas alterar los componentes.

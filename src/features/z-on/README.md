# Z-ON and registration notice

`components/ZonSection.astro` renders the canonical Z-ON double-chance message, followed by the separate white registration notice. It uses the supplied, unchanged warning icon and Clube Condor logo. The 2026 year and all other copy come directly from `src/data/landing-content.ts`.

Import it after `CondorPremiaSection.astro` when composing the landing. The “Peça já o seu” text is informational because the canonical content supplies no confirmed destination for it.

Regression check: `node src/features/condor-premia/CondorPremiaAndZon.integration.test.mjs` builds an isolated Astro page with both components and verifies the canonical Z-ON message and registration notice in the generated HTML. Visual review belongs to the integrated QA task.

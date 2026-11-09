# Condor Premia

`components/CondorPremiaSection.astro` renders the three supplied prize pieces and the four supplied participation cards. It reads all campaign text and the confirmed app destination from `src/data/landing-content.ts`.

The original prize composition is displayed at wider widths. The three supplied, unchanged prize pieces are displayed individually on narrow screens to keep their embedded text legible. The four card PNGs are also supplied assets with embedded copy. Their canonical text is present in the accessible HTML, and the first card's app button has a real link over its artwork.

Import `CondorPremiaSection.astro` before the Z-ON feature when composing the landing.

Regression check: `node src/features/condor-premia/CondorPremiaAndZon.integration.test.mjs` builds an isolated Astro page with this component and Z-ON, then verifies the canonical four steps, supplied prize artwork, and confirmed app destination in the generated HTML. Visual review belongs to the integrated QA task.

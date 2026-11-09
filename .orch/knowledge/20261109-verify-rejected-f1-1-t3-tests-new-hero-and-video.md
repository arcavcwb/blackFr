---
id: 20261109-verify-rejected-f1-1-t3-tests-new-hero-and-video
title: 'Verify rejected F1.1.T3: Tests: new hero and video behavior lacks coverage'
area:
    - src/features/black-friday-hero/
tags:
    - verify
source: verify
task: F1.1.T3
created: "2026-11-09"
---

The local verify rejected an attempt at F1.1.T3:
- Tests: new hero and video behavior lacks coverage

The attempt that passed: Integré el hero estático con los tres assets originales verificados, el video promocional accesible y sus exports; añadí una prueba de renderizado que cubre IDs por defecto/personalizados, asociación accesible del h1, fuente MP4 empaquetada y controles nativos. Las 3 pruebas y pnpm build pasan. Fuera del directorio asignado, assets/optimized/video/video-black-friday-2026.mp4 es el derivado MP4 necesario para reproducción web sin modificar el MOV original.

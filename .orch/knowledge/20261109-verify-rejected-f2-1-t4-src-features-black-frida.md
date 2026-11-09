---
id: 20261109-verify-rejected-f2-1-t4-src-features-black-frida
title: 'Verify rejected F2.1.T4: src/features/black-friday-hero/motion/index.ts:54 Error handling: GSAP exce…'
area:
    - src/features/black-friday-hero/motion/index.ts
tags:
    - verify
source: verify
task: F2.1.T4
created: "2026-11-09"
---

The local verify rejected an attempt at F2.1.T4:
- src/features/black-friday-hero/motion/index.ts:54 Error handling: GSAP exceptions are silently dropped

The attempt that passed: El hero ahora revierte el contexto GSAP y reporta con contexto los fallos de inicialización; añadí prueba de fallo inyectado, y pasaron las pruebas de motion y el build Astro.

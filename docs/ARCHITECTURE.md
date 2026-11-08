# Arquitectura objetivo (propuesta)

```
src/
  assets/                    # dependencias de código de referencia; no son todos los assets
  components/ui/             # primitives Astro reutilizables
  features/
    black-friday/
    condor-premia/
    game-da-black/
    black-friday-bottom/
  layouts/
  pages/
  styles/
assets/
  originals/                 # suministrados, sin modificación de bytes
  derived/                   # recortes / descomposición
  generated/                 # visuales generados IA, no fuente oficial
  optimized/                 # resultados de exportaciones para producción
content/                     # JSON recibido
references/
  user-supplied/
  approved/
  screenshots/
  archive/
design-system/v1/             # propuesta histórica intacta
design-system/v2/             # contrato visual documental, sistema completo pendiente
```

- El contenido editorial vive en `data/` o `content/`, no mezclado con componentes presentacionales.
- DRY: un componente de paso alimentado por arreglo tipado; cards GDB no tienen cuatro versiones de código duplicadas.
- `src/` contiene componentes de referencia y scaffold mínimo Astro con `package.json` y TypeScript estricto. Tailwind y la landing completa aún no están integrados; no asumir build ni fidelidad visual hasta probarlos.
- No cambiar rutas de `src/assets/` sin actualizar imports. Son copias necesarias para el código de referencia.
- Si el sitio nuevo requiere mover assets a `src/assets` o `public`, usar el manifiesto y actualizar imports; nunca editar archivos en `assets/originals`.
- La vista previa HTML de la zona inferior preserva sus recursos internos en `references/approved/parte-inferior/`.

## Contratos para integración posterior

Consultar [entrada a implementación](implementation/IMPLEMENTATION_ENTRY.md) para interfaces, propiedad, rutas propuestas y gates; [DS v2](../design-system/v2/DESIGN_SYSTEM.md) para estado visual final y [Motion v1](motion/v1/MOTION_DESIGN.md) para mejora progresiva por feature. C está aprobada visualmente y HYBRID como dirección; el sistema completo y los parámetros finales de motion continúan pendientes. Las rutas de motion/tokens son propuestas documentales, no módulos existentes. Ningún contrato autoriza implementación ni instalación de dependencias en esta consolidación.

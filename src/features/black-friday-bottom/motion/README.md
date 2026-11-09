# Motion de acciones y contacto

Este módulo añade entradas decorativas independientes a las acciones y tarjetas
de contacto de la zona inferior. No modifica textos, destinos, layout ni el
estado final aprobado.

## Comportamiento visible

- El bloque de CTA y reglamentos entra con 16 px de desplazamiento vertical y
  350 ms de duración.
- Cada tarjeta de contacto entra de forma independiente con 12 px de
  desplazamiento vertical y 350 ms de duración; no existe un stagger de grupo.
- Todas las entradas se ejecutan una sola vez al cruzar la línea situada al
  85 % del viewport. Un target que ya alcanzó esa línea se mantiene en su
  estado final.
- El FAQ conserva el comportamiento nativo de `details`/`summary`: las
  respuestas no tienen animación de altura ni retraso de acceso.

## Accesibilidad y recuperación

El contenido parte visible y funcional sin JavaScript. Con
`prefers-reduced-motion: reduce` se omiten las entradas decorativas. Un cambio
de preferencia, el foco dentro del bloque, una navegación por ancla o el
desmontaje cancelan las animaciones y restauran inmediatamente el estado final.
Los fallos de inicialización o ejecución tampoco dejan contenido oculto ni
estilos temporales persistentes, y el foco visible de los controles no depende
de la animación.

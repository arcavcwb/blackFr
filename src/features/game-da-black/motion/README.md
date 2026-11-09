# Motion de tarjetas Game da Black

Este módulo añade una entrada decorativa a las cuatro tarjetas aprobadas de
Game da Black. No cambia su contenido, retícula, tamaño ni apariencia final.

## Comportamiento visible

- En escritorio (`min-width: 1280px`), las tarjetas entran en orden 1 a 4 con
  16 px de desplazamiento vertical, 450 ms por tarjeta y 100 ms entre inicios.
  La secuencia completa dura 750 ms.
- En layouts compactos, cada tarjeta usa su propio disparador de scroll, con
  12 px de desplazamiento vertical y 400 ms de duración. Una tarjeta no espera
  a las demás para quedar disponible.
- Si el viewport cruza el breakpoint de 1280 px durante la sesión, los
  disparadores anteriores se desmontan y se registra inmediatamente el modelo
  correspondiente a la nueva retícula.
- La entrada se ejecuta una sola vez cuando el borde superior del target cruza
  la línea situada al 85 % del viewport. Si el target ya alcanzó esa línea al
  inicializarse, se conserva directamente el estado final.

## Accesibilidad y recuperación

El HTML y el CSS siempre parten del estado final visible; JavaScript solo
aplica el desplazamiento durante la entrada. Con
`prefers-reduced-motion: reduce` no hay animación decorativa. Si la preferencia
cambia durante la sesión, si el foco entra en la sección, si una navegación por
ancla solicita la sección o si el módulo se desmonta, la animación se cancela y
se restaura inmediatamente la composición aprobada. Un fallo de registro o de
ejecución tampoco deja contenido oculto ni estilos temporales persistentes.

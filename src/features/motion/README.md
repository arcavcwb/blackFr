# Motion compartido

`revealOnScroll(wrapper, { distance, duration })` devuelve una función de limpieza. Las features posteriores deciden sus propios targets y parámetros; no se conecta ni anima ninguna sección automáticamente. El wrapper debe ser independiente de la composición protegida. HTML y CSS conservan el estado final sin JavaScript.

El trigger cruza `top 85%` una sola vez; si ya estaba por encima, se omite. La entrada solo desplaza el wrapper y nunca cambia opacidad, visibilidad ni interacción. Una preferencia reducida inicial difiere el registro; si se activa durante la sesión, cancela la entrada y restaura el estado final. Foco y navegación a un ancla del wrapper también la cancelan sin interferir con el navegador. Se restaura el estilo previo al terminar, fallar o desmontar. Los valores predeterminados son candidatos del contrato, no aprobación de motion. Los módulos consumidores deben limpiar al desmontarse y probar sus propias secuencias y recursos.

Los errores del driver se propagan tras limpiar el estado: los de registro inicial llegan al llamador y los posteriores al contexto del evento que los dispara. Una inicialización fallida también retira los listeners instalados.

# F0 baseline audit — contenido y assets

**Tarea:** F0.1.T1  
**Fecha:** 2026-11-08  
**Alcance:** auditoría documental; no se modificaron JSON, código, assets ni documentos aprobados.

## 1. Fuentes y criterio

- Especificación de tarea: `specs/f0-preparacion.md#F0.1.T1`.
- Fuente editorial canónica: `content/landing-content.json`, conforme a `docs/PROJECT_CONTEXT.md` y DS-011.
- Implementación TypeScript comparada: `src/features/game-da-black/data/participationSteps.ts` y `src/features/black-friday-bottom/data/faqs-preview.ts`.
- Integridad de archivos contrastada con `manifests/ASSET_REGISTRY.csv` (ruta, tipo, dimensiones, bytes y SHA-256).
- `references/archive/` no se usó como fuente vigente.

## 2. Resultado ejecutivo

| Área | Estado | Evidencia / consecuencia |
|---|---|---|
| Contenido canónico | Disponible | `content/landing-content.json` contiene campaña, mecánicas, FAQ placeholder, canales y footer. |
| Datos TypeScript | Parcialmente alineados | Los 4 pasos y FAQ existen, pero hay discrepancias de copy; no resolver editorialmente en esta tarea. |
| Hero | Disponible | Tres capas reales en `assets/originals/hero/`; no recomponer ni alterar sus textos/logos. |
| Premios y aviso | Disponible | Composición original de premios y assets del aviso están presentes en `assets/originals/`. |
| KV GDB | Disponible como composición | `assets/originals/game-da-black/gdb-key-visual-v03.png` está disponible; no hay capas 00–09 separadas verificadas. |
| Cards GDB aprobadas | Íntegras | Las 4 rutas en `assets/generated/game-da-black/cards-aprovados/` existen y sus SHA-256 coinciden con el manifiesto. |
| Video web | Pendiente | JSON apunta a MP4, pero solo está disponible el MOV fuente original. |
| OG image | Pendiente | JSON apunta a `/assets/black-friday/og.jpg`; el archivo no está presente en la ruta esperada ni en el registro consolidado. |
| Enlaces/editorial legal | Pendiente | Reglamentos, Lojas Participantes, Política de Privacidade y certificado del footer requieren validación; hay href vacíos o marcador. |

## 3. Discrepancias de contenido

### GDB: JSON vs TypeScript

El JSON conserva los cuatro títulos canónicos y la frase obligatoria del paso 1:

1. `Acesse o app Clube Condor` — incluye `Entre na Trilha da Black` y cadastro completo/actualizado.
2. `Ative as ofertas`.
3. `Compre e ganhe números da sorte` — 3 productos diferentes de ofertas activadas, tienda Condor, CPF en caja, 1 número; 5 productos solo puede dar otro número **cuando haya bonus**.
4. `Acompanhe e concorra!`.

`src/features/game-da-black/data/participationSteps.ts` conserva la regla del paso 3 y el bonus condicional, pero cambia los títulos a `Comece pelo app`, `Ative antes de comprar`, `3 produtos = 1 número` y `Confira seus números no app`; además omite `Entre na Trilha da Black` en la descripción del paso 1. Es una discrepancia de fuente duplicada, no una autorización para reescribir contenido.

### FAQ

Los cuatro ítems siguen siendo placeholders (`Pergunta 1`–`Pergunta 4`) y no deben inventarse respuestas. La primera respuesta del JSON tiene 16 repeticiones de `resposta`; `faqs-preview.ts` tiene 15. Las respuestas 2–4 coinciden. El módulo se declara explícitamente de preview.

### Otros pendientes observables

- `regulamento.botoes[0].href` y `[1].href` están vacíos.
- `rodape.links` de `Lojas Participantes` y `Política de Privacidade` tienen href vacío.
- `rodape.legal` contiene `SPA/ME Nº xx.xxxxxx/2026`; no sustituirlo automáticamente por `sobre.premiosAlt`.
- El texto de ofertas canónico incluye «Aqui a economia não para.»; la preview inferior usa un slot distinto y debe conservarse el copy canónico al integrar.

## 4. Assets verificados

### Hero y piezas protegidas

Rutas originales presentes y registradas:

- `assets/originals/hero/hero-fundo-figma-v04.png` — 1440×914, alpha, SHA-256 `c53e803ca5c16da0c43f03193c093f815fcf5089843a6055a236cc68a9d856eb`.
- `assets/originals/hero/hero-apresentadora-v04.png` — 650×661, alpha, SHA-256 `cec79fb557fde545893f85c39d942eee6404112fdd6ca2b4b414efac2a7e9b63`.
- `assets/originals/hero/hero-titulo-black-todo-dia-v04.png` — 791×433, alpha, SHA-256 `0fa961701d3c378b8a056844857dbdd6ce2d1e5a9671b62b7dc169225f71ea87`.
- `assets/originals/condor-premia/premios/composicao-premios-fornecida.png` — 1144×853, alpha, SHA-256 `67e6e5ded30a781911dfdaa7b685a10a9efe591d8f888d84ee79e81cbdc64502`.
- `assets/originals/condor-premia/aviso/icone-alerta-exclamacao.png` — 164×164, alpha.
- `assets/originals/game-da-black/gdb-key-visual-v03.png` — 1346×757, alpha, SHA-256 `6767e27191e47a2b5cfc54309bc0136ca1f7b4d696a2ee5425a58b39328c81d1`.

El hero debe tratarse como composición de las tres capas indicadas. El KV GDB verificado es un archivo compuesto; no iniciar una reconstrucción por capas sin un registro de coordenadas y fuente adicional.

### Cards aprobadas y branding

Las cuatro tarjetas aprobadas existen, cada una de 396×565 con alpha, y coinciden byte a byte con el registro por SHA-256:

- `assets/generated/game-da-black/cards-aprovados/card-01-comece-pelo-app.png` — `f7507d266fb76857c1165a014245c75210f3e1913cdd53ed7fcfdf43bd0e6a6a`.
- `assets/generated/game-da-black/cards-aprovados/card-02-ative-antes-de-comprar.png` — `2766f1f99bae7c6b145eed8357245d6e41e00cd8d3e9eab87fdac7a6127d8051`.
- `assets/generated/game-da-black/cards-aprovados/card-03-compre-e-ganhe-numeros.png` — `9d714c96ac04291debc092e66083a53b7fbc09113f645ee2ddba8dcf7e98aad6`.
- `assets/generated/game-da-black/cards-aprovados/card-04-confira-seus-numeros.png` — `7c2012b266073a08dda9e812f03890b86ebdf12a15753890ba1be26b2d50a342`.

Branding original registrado: `assets/originals/branding/logo-condor-com-sombra.png` y `assets/originals/branding/logo-clube-condor-fornecido-96px.png`. No son equivalentes a los recortes derivados de `assets/derived/` ni a material histórico.

### Video

`assets/originals/video/video-black-todo-dia-fonte.mov` existe, está marcado como original sin modificación y tiene SHA-256 `4c4c83ac4f11e9f10321346fd9ed1f5a65bdbc5a3a4d0554762b7187b262294f`. El `src` canónico apunta a `video-black-friday-2026.mp4`, inexistente en el workspace. Si se requiere web video, la transcodificación debe producir un derivado en `assets/optimized/video/` sin sobreescribir el MOV.

## 5. Pendientes para tareas posteriores

1. Conciliar JSON y módulos TypeScript tomando el JSON como fuente canónica, preservando literalmente el copy aprobado.
2. Confirmar con marketing/legal FAQ, reglamentos, Lojas Participantes, Política de Privacidade y certificado SPA/ME.
3. Definir la ruta de integración del MOV o generar MP4 optimizado en `assets/optimized/video/`.
4. Resolver o provisionar `og.jpg` antes de declarar completa la integración SEO.
5. Mantener hero, premios, aviso y KV como piezas protegidas; no redibujar, recolorear, recortar destructivamente ni crear logos por CSS/SVG/IA.
6. Antes de implementación, verificar el repositorio real, build Astro, responsividad y revisión visual; esta auditoría no acredita ninguno de esos gates.

## 6. Límites de esta auditoría

No se ejecutó una reconstrucción visual ni se modificó el sitio original. No se corrigieron discrepancias, no se inventaron URLs o respuestas FAQ y no se alteraron originales. El informe registra disponibilidad e integridad documental para desbloquear la revisión de diseño siguiente.

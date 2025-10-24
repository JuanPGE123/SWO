Paleta de colores del proyecto

Este documento reúne las variables y colores usados en los CSS creados en este workspace (principalmente `incidents.css` y `chatbot.css`). Se incluyen valores hex y una breve guía de uso.

Variables CSS (definidas en `incidents.css` :root)

- --bg: #071018
  - Fondo principal de la app (oscuro profundo). Uso: `body`, background general.

- --card-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01))
  - Fondo de tarjetas y contenedores (sutil degradado claro sobre oscuro).

- --muted: #9aa5b1
  - Texto secundario / placeholders / estados menos relevantes.

- --accent: #05d0e6
  - Color acento principal (botones, elementos destacables secundarios).

- --green: #19d38f
  - Color para acciones positivas (guardar, estado resuelto, botones primarios alternativos).

Colores directos usados (valores hex observados)

- #dff0ff
  - Usado para títulos / texto destacado en tarjetas y nav active.

- #04232f (oscuro-casi-negro azulado)
  - Usado como color de texto en botones cuando fondo claro se requiere; también como color de contraste para el texto interno de botones con fondo `--accent`.

- #07363a / #04232f (degradado)
  - Usado en burbujas de mensajes de usuario (`.message.user`): `linear-gradient(90deg, #04232f, #07363a)`.

- rgba(255,255,255,0.02) / rgba(255,255,255,0.01)
  - Fondos sutiles para tarjetas, comentarios y zonas secundarias.

Guía rápida de uso

- Fondos: usar `--bg` para la app y `--card-bg` para tarjetas/containers.
- Texto principal: por defecto los elementos usan color claro `#e6eef6` (definido en `body`).
- Texto secundario: usar `--muted` para estados, placeholders, detalles.
- Botones importantes: usar `--accent` para llamar la atención; si se requiere botón "positivo" usar `--green`.
- Para elementos inversos (fondo oscuro con texto claro) usar blanco `#ffffff` o el color claro `#dff0ff`.

Ejemplos CSS

.button-primary { background: var(--green); color: #04232f; }
.card { background: var(--card-bg); border: 1px solid rgba(255,255,255,0.03); }
.muted { color: var(--muted); }

Notas

- Si quieres una paleta extendida (variantes de gris, fallback para accesibilidad, contrast ratios), puedo generar un archivo Sass con variables, tonos más claros/oscursos y recomendaciones WCAG.
- También puedo añadir una página `/style-guide.html` con muestras visuales y clases reutilizables.

Fin del documento.

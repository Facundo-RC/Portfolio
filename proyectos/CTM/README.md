# HUMO — Smash Burgers 🍔

Sitio web para una hamburguesería ficticia. Tiene estética de póster retro: tipografía gigante, bordes de tinta y sombras duras. Todas las ilustraciones son SVG generados por código.

## Qué hace

- **Menú dinámico**: los productos se cargan desde `data/menu.json` con `fetch` y se muestran en pestañas de Bootstrap con un esqueleto de carga.
- **Armá la tuya**: un configurador donde la hamburguesa se apila en vivo, capa por capa, con el precio calculado al momento.
- **Carrito** en un offcanvas que persiste en `localStorage`. Al agregar un producto, el dibujo vuela hasta el carrito.
- **Checkout** en un modal con validación de formulario: delivery o retiro, local, medio de pago. El pedido sale armado por WhatsApp.
- **Locales** con el estado "Abierto / Cerrado" calculado según el horario del JSON.
- **Preguntas frecuentes** en un accordion de Bootstrap.
- Responsive, accesible (navegación por teclado, `prefers-reduced-motion`) y sin dependencias de imágenes.

## Stack

| | |
|---|---|
| **HTML5** semántico | |
| **Sass** (SCSS) | Arquitectura 7-1, mapas, `@each`/`@for`, mixins, funciones propias (`fluido()`, `tono()`), placeholders con `@extend` |
| **Bootstrap 5.3** | Compilado desde su SCSS con la paleta de la marca; import selectivo de componentes y utilidades propias con la API de utilidades |
| **JavaScript** (ES Modules) | `fetch` + `Promise.all`, Web Animations API, `IntersectionObserver`, componentes de Bootstrap por JS |
| **JSON** | Toda la información del negocio vive en `/data` |

## Estructura

```
├── index.html
├── css/main.css            ← generado por Sass (no editar)
├── scss/
│   ├── abstracts/          variables, funciones, mixins
│   ├── vendors/            Bootstrap personalizado
│   ├── base/               base, tipografía, animaciones
│   ├── layout/             nav, secciones, footer
│   ├── components/         botones, tarjetas, carrito, checkout…
│   ├── sections/           hero, armador, locales…
│   └── main.scss
├── js/
│   ├── main.js             punto de entrada
│   ├── datos.js            carga de JSON
│   ├── ilustraciones.js    generador de SVG
│   ├── menu.js · armador.js · carrito.js · hero.js · ui.js · utils.js
└── data/
    ├── menu.json · armador.json · negocio.json · resenas.json · faq.json
```

## Cómo correrlo

Los JSON se cargan con `fetch`, así que el sitio necesita un servidor local: abrir `index.html` con doble clic no alcanza.

```bash
npm install
npm run dev      # compila Sass en modo watch y levanta el sitio en http://localhost:3000
npm run build    # genera css/main.css minificado
```

Otra opción es abrir la carpeta con la extensión **Live Server** de VS Code. El CSS compilado ya está incluido.

## Personalizar

- **Productos, precios e ingredientes**: `data/menu.json` y `data/armador.json`.
- **Número de WhatsApp, costo de envío, horarios y locales**: `data/negocio.json`.
- **Colores y tipografías**: `scss/abstracts/_variables.scss`. Bootstrap toma la paleta de ahí.

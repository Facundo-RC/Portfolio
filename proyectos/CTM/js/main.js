// HUMO — Smash Burgers · punto de entrada

import { cargarDatos } from './datos.js';
import { initHero } from './hero.js';
import { initMenu, mostrarErrorMenu } from './menu.js';
import { initArmador } from './armador.js';
import { initCarrito } from './carrito.js';
import { initNav, initReveal, initContadores, renderResenas, renderLocales, renderFaq } from './ui.js';

// Lo que no depende de los datos arranca enseguida
initHero();
initNav();
initContadores();
const observarApariciones = initReveal();

try {
  const datos = await cargarDatos();
  const carrito = initCarrito(datos);
  initMenu(datos.menu, carrito);
  initArmador(datos.armador, carrito);
  renderResenas(datos.resenas);
  renderLocales(datos.negocio);
  renderFaq(datos.faq, datos.negocio);
} catch (error) {
  console.error(error);
  mostrarErrorMenu(error);
} finally {
  observarApariciones();
}

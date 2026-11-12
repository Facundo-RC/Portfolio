// Hero: hamburguesa que se desarma al scrollear + cintas en movimiento

import { $, $$, reducido } from './utils.js';
import { svgBurger } from './ilustraciones.js';

const CAPAS_HERO = ['panArriba', 'lechuga', 'tomate', 'queso', 'carne', 'queso', 'carne', 'cebolla', 'panAbajo'];

function desarmar(capas) {
  const p = Math.min(1, scrollY / (innerHeight * .7));
  const n = capas.length;
  capas.forEach(capa => {
    const k = +capa.dataset.i;
    const lado = k % 2 ? 1 : -1;
    const dy = -(k - (n - 1) / 2) * 24 * p;
    const borde = k === 0 || k === n - 1 ? .4 : 1;
    capa.style.transform = `translate(${lado * 10 * p}px, ${dy}px) rotate(${lado * 6 * p * borde}deg)`;
  });
}

function initCintas() {
  $$('.cinta-track').forEach(track => {
    const bloque = track.dataset.items.split('|').map(t => `<span>${t}</span><span class="sep">✺</span>`).join('');
    track.innerHTML = bloque.repeat(4); // dos mitades iguales para un loop sin cortes
  });
}

export function initHero() {
  const contenedor = $('#heroBurger');
  contenedor.innerHTML = svgBurger(CAPAS_HERO);
  const capas = $$('.capa', contenedor);

  if (!reducido) {
    let pedido = false;
    addEventListener('scroll', () => {
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(() => { desarmar(capas); pedido = false; });
    }, { passive: true });
  }

  $('#pieBurger').innerHTML = svgBurger(['panArriba', 'lechuga', 'queso', 'carne', 'panAbajo']);
  initCintas();
}

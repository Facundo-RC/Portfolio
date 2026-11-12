// "Armá la tuya": la hamburguesa se apila en vivo según los ingredientes de data/armador.json

import { $, precio, reanimar } from './utils.js';
import { svgBurger } from './ilustraciones.js';

const VERDURAS = ['lechuga', 'tomate', 'pepinos', 'cebolla'];

// Clave estable por capa (tipo + n° de aparición desde abajo) para saber cuál es nueva
function clavesDe(capas) {
  const cuenta = {};
  const claves = [];
  for (let i = capas.length - 1; i >= 0; i--) {
    cuenta[capas[i]] = (cuenta[capas[i]] || 0) + 1;
    claves[i] = capas[i] + cuenta[capas[i]];
  }
  return claves;
}

export function initArmador(config, carrito) {
  const { base, ingredientes, niveles } = config;
  const armado = Object.fromEntries(ingredientes.map(i => [i.id, i.inicial]));
  const escena = $('#armaBurger');
  const lista = $('#ingredientes');
  let clavesPrevias = null;

  lista.innerHTML = ingredientes.map(ing => `
    <li class="ing" data-ing="${ing.id}">
      <span class="ing-icono">${svgBurger([ing.id])}</span>
      <span class="ing-nombre">
        <strong>${ing.nombre}</strong>
        <small>${ing.incluidos ? `${ing.incluidos} incluido · extra ${precio(ing.precio)}` : `+${precio(ing.precio)}`}</small>
      </span>
      <span class="stepper">
        <button type="button" data-paso="-1" aria-label="Quitar ${ing.nombre}">−</button>
        <output aria-live="polite">0</output>
        <button type="button" data-paso="1" aria-label="Sumar ${ing.nombre}">+</button>
      </span>
    </li>`).join('');

  function capas() {
    const c = ['panArriba'];
    VERDURAS.forEach(t => { if (armado[t]) c.push(t); });
    for (let i = 0; i < armado.bacon; i++) c.push('bacon');
    for (let i = 0; i < Math.max(0, armado.queso - armado.carne); i++) c.push('queso');
    for (let i = 0; i < armado.carne; i++) {
      if (i < armado.queso) c.push('queso');
      c.push('carne');
    }
    c.push('panAbajo');
    return c;
  }

  const total = () => ingredientes.reduce((suma, ing) => suma + (armado[ing.id] - (ing.incluidos || 0)) * ing.precio, base);

  const detalle = () => ingredientes
    .filter(i => armado[i.id])
    .map(i => armado[i.id] > 1 ? `${armado[i.id]}× ${i.nombre.toLowerCase()}` : i.nombre.toLowerCase())
    .join(', ');

  function pintar() {
    const pila = capas();
    const claves = clavesDe(pila);
    const nuevas = new Set(clavesPrevias ? claves.filter(k => !clavesPrevias.includes(k)) : []);
    clavesPrevias = claves;
    escena.innerHTML = svgBurger(pila, { claves, nuevas });

    ingredientes.forEach(ing => {
      const fila = $(`[data-ing="${ing.id}"]`, lista);
      $('output', fila).textContent = armado[ing.id];
      $('[data-paso="-1"]', fila).disabled = armado[ing.id] <= ing.min;
      $('[data-paso="1"]', fila).disabled = armado[ing.id] >= ing.max;
      fila.classList.toggle('activo', armado[ing.id] > 0);
    });

    $('#armaPrecio').textContent = precio(total());
    const nivel = Math.min(niveles.length - 1, Math.floor((pila.length - 3) / 2.2));
    $('#hambreBarra').style.setProperty('--nivel', `${20 + nivel * (80 / (niveles.length - 1))}%`);
    $('#hambreNivel').textContent = niveles[nivel];
  }

  lista.addEventListener('click', e => {
    const boton = e.target.closest('[data-paso]');
    if (!boton || boton.disabled) return;
    const ing = ingredientes.find(i => i.id === boton.closest('[data-ing]').dataset.ing);
    armado[ing.id] = Math.max(ing.min, Math.min(ing.max, armado[ing.id] + Number(boton.dataset.paso)));
    pintar();
    reanimar(escena, 'rebote');
  });

  $('#armaAgregar').addEventListener('click', () => {
    const nombre = $('#nombreBurger').value.trim() || 'La Mía';
    carrito.agregar({
      id: `armada-${nombre.toLowerCase()}-${ingredientes.map(i => armado[i.id]).join('')}`,
      nombre,
      precio: total(),
      detalle: detalle(),
      capas: capas(),
      fondo: config.fondo
    }, $('svg', escena));
  });

  pintar();
}

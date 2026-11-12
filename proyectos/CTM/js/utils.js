// Utilidades compartidas

export const $ = (sel, el = document) => el.querySelector(sel);
export const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

export const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;

export const precio = n => '$' + n.toLocaleString('es-AR');

export const escapar = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Fondo de tarjeta: los JSON lo piden por nombre y Sass genera la variable --fondo-<nombre>
export const fondo = nombre => `var(--fondo-${nombre})`;

// localStorage puede no estar disponible (modo privado, bloqueos): nunca debe romper la página
export function leer(clave, porDefecto) {
  try { return JSON.parse(localStorage.getItem(clave)) ?? porDefecto; } catch { return porDefecto; }
}

export function guardar(clave, valor) {
  try { localStorage.setItem(clave, JSON.stringify(valor)); } catch { /* sin almacenamiento */ }
}

// Reinicia una animación CSS quitando y volviendo a poner la clase
export function reanimar(el, clase) {
  el.classList.remove(clase);
  void el.offsetWidth;
  el.classList.add(clase);
}

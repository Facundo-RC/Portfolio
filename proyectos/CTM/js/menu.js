// Menú: pestañas (Bootstrap) y tarjetas generadas desde data/menu.json

import { $, precio, escapar, fondo } from './utils.js';
import { arte } from './ilustraciones.js';

function tarjeta(item, i) {
  return `
    <div class="col-12 col-md-6 col-xl-4">
      <article class="plato" data-reveal style="--bg:${fondo(item.fondo)}; --retraso:${i * .07}s">
        <div class="plato-arte">
          ${item.etiqueta ? `<span class="plato-etiqueta">${escapar(item.etiqueta)}</span>` : ''}
          ${arte(item)}
        </div>
        <div class="plato-info">
          <div class="plato-fila">
            <h3 class="plato-nombre">${escapar(item.nombre)}</h3>
            <span class="precio">${precio(item.precio)}</span>
          </div>
          <p class="plato-desc">${escapar(item.descripcion)}</p>
          <button class="btn btn-light btn-sm" data-agregar="${item.id}" aria-label="Agregar ${escapar(item.nombre)} al pedido">Agregar <span aria-hidden="true">+</span></button>
        </div>
      </article>
    </div>`;
}

export function initMenu({ categorias }, carrito) {
  const tabs = $('#menuTabs');
  const paneles = $('#menuPaneles');

  tabs.innerHTML = categorias.map((cat, i) => `
    <li class="nav-item" role="presentation">
      <button class="nav-link${i ? '' : ' active'}" id="tab-${cat.id}" data-bs-toggle="pill" data-bs-target="#panel-${cat.id}"
              type="button" role="tab" aria-controls="panel-${cat.id}" aria-selected="${i === 0}">
        ${escapar(cat.nombre)} <span class="cuenta">${cat.items.length}</span>
      </button>
    </li>`).join('');

  paneles.innerHTML = categorias.map((cat, i) => `
    <div class="tab-pane fade${i ? '' : ' show active'}" id="panel-${cat.id}" role="tabpanel" aria-labelledby="tab-${cat.id}" tabindex="0">
      <div class="row g-4">${cat.items.map(tarjeta).join('')}</div>
    </div>`).join('');

  const productos = categorias.flatMap(cat => cat.items);

  paneles.addEventListener('click', e => {
    const boton = e.target.closest('[data-agregar]');
    if (!boton) return;
    const item = productos.find(p => p.id === boton.dataset.agregar);
    carrito.agregar(
      { id: item.id, nombre: item.nombre, precio: item.precio, fondo: item.fondo },
      boton.closest('.plato').querySelector('.plato-arte svg')
    );
  });
}

export function mostrarErrorMenu(error) {
  $('#menuTabs').innerHTML = '';
  $('#menuPaneles').innerHTML = `
    <div class="error-carga p-4 p-md-5">
      <div class="flex-grow-1">
        <h3 class="h4 fw-bold mb-2">No pudimos cargar el menú 😕</h3>
        <p class="mb-0 text-body-secondary">${escapar(error.message)}. Si abriste el archivo directamente, levantá el proyecto con <code>npm run dev</code> o con Live Server.</p>
      </div>
      <button class="btn btn-primary" onclick="location.reload()">Reintentar</button>
    </div>`;
}

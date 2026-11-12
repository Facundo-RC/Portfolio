// Carrito (offcanvas de Bootstrap) + checkout (modal con validación) + pedido por WhatsApp

import { $, precio, escapar, fondo, leer, guardar, reducido, reanimar } from './utils.js';
import { arte, svgBurger } from './ilustraciones.js';
import { avisar, cerrarEIr } from './ui.js';

const CLAVE_CARRITO = 'humo-carrito';
const CLAVE_CLIENTE = 'humo-cliente';

export function initCarrito({ menu, negocio }) {
  const productos = menu.categorias.flatMap(cat => cat.items);
  let items = leer(CLAVE_CARRITO, []);

  const panel = $('#carrito');
  const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(panel);
  const modalEl = $('#checkout');
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  const form = $('#formCheckout');
  const campos = form.elements;
  const btnCarrito = $('#abrirCarrito');

  const cantidad = () => items.reduce((n, i) => n + i.cant, 0);
  const subtotal = () => items.reduce((n, i) => n + i.cant * i.precio, 0);
  const envio = () => campos.entrega.value === 'delivery' ? negocio.envio : 0;

  function arteItem(item) {
    if (item.capas) return svgBurger(item.capas);
    const producto = productos.find(p => p.id === item.id);
    return producto ? arte(producto) : '';
  }

  function persistir() {
    guardar(CLAVE_CARRITO, items);
    pintar();
  }

  function pintar() {
    const total = cantidad();
    const contador = $('#contador');
    contador.textContent = total;
    contador.dataset.vacio = total === 0;
    btnCarrito.setAttribute('aria-label', total ? `Ver tu pedido (${total} productos)` : 'Ver tu pedido');

    $('#carritoLista').innerHTML = items.map((item, idx) => `
      <li class="item">
        <span class="item-arte" style="--bg:${fondo(item.fondo)}">${arteItem(item)}</span>
        <span class="item-texto">
          <span class="item-nombre">${escapar(item.nombre)}</span>
          ${item.detalle ? `<span class="item-detalle" title="${escapar(item.detalle)}">${escapar(item.detalle)}</span>` : ''}
          <span class="precio">${precio(item.precio * item.cant)}</span>
        </span>
        <span class="stepper stepper--chico">
          <button type="button" data-item="${idx}" data-paso="-1" aria-label="Quitar uno">−</button>
          <output>${item.cant}</output>
          <button type="button" data-item="${idx}" data-paso="1" aria-label="Sumar uno">+</button>
        </span>
      </li>`).join('');

    $('#carritoVacio').classList.toggle('visible', total === 0);
    $('#carritoPie').hidden = total === 0;
    $('#carritoTotal').textContent = precio(subtotal());
  }

  function agregar(producto, origen) {
    const existente = items.find(i => i.id === producto.id);
    if (existente) existente.cant++;
    else items.push({ ...producto, cant: 1 });
    persistir();
    avisar(`${producto.nombre} se sumó a tu pedido 🍔`);
    volarAlCarrito(origen);
  }

  // Un clon del dibujo vuela en arco hasta el botón del carrito
  function volarAlCarrito(svg) {
    if (reducido || !svg) { reanimar(btnCarrito, 'bump'); return; }
    const a = svg.getBoundingClientRect();
    const b = btnCarrito.getBoundingClientRect();
    const clon = svg.cloneNode(true);
    clon.classList.add('volando');
    Object.assign(clon.style, { left: `${a.left}px`, top: `${a.top}px`, width: `${a.width}px`, height: `${a.height}px` });
    document.body.appendChild(clon);
    const dx = b.left + b.width / 2 - (a.left + a.width / 2);
    const dy = b.top + b.height / 2 - (a.top + a.height / 2);
    clon.animate([
      { transform: 'translate(0, 0) scale(1) rotate(0)' },
      { transform: `translate(${dx * .45}px, ${dy * .5 - 120}px) scale(.55) rotate(-25deg)`, offset: .5 },
      { transform: `translate(${dx}px, ${dy}px) scale(.08) rotate(-50deg)`, opacity: .4 }
    ], { duration: 850, easing: 'cubic-bezier(.45, 0, .4, 1)' }).onfinish = () => {
      clon.remove();
      reanimar(btnCarrito, 'bump');
    };
  }

  $('#carritoLista').addEventListener('click', e => {
    const boton = e.target.closest('[data-paso]');
    if (!boton) return;
    const idx = Number(boton.dataset.item);
    items[idx].cant += Number(boton.dataset.paso);
    if (items[idx].cant <= 0) items.splice(idx, 1);
    persistir();
  });

  $('#carritoVacio [data-ir]').addEventListener('click', e => cerrarEIr(panel, e.currentTarget.dataset.ir));

  /* ---------- Checkout ---------- */

  campos.local.innerHTML = '<option value="">Elegí un local…</option>' +
    negocio.locales.map(l => `<option value="${l.id}">${escapar(l.nombre)} — ${escapar(l.direccion)}</option>`).join('');
  $('#envioCosto').textContent = `+${precio(negocio.envio)}`;

  // Pasar del carrito al modal: primero se cierra el offcanvas
  $('#irACheckout').addEventListener('click', () => {
    panel.addEventListener('hidden.bs.offcanvas', () => modal.show(), { once: true });
    offcanvas.hide();
  });

  function actualizarEntrega() {
    const delivery = campos.entrega.value === 'delivery';
    $('#campoDireccion').classList.toggle('d-none', !delivery);
    $('#campoLocal').classList.toggle('d-none', delivery);
    // Un campo deshabilitado no se valida ni se envía
    campos.direccion.disabled = !delivery;
    campos.local.disabled = delivery;
  }

  function pintarResumen() {
    $('#resumen').innerHTML = `
      <div class="resumen-fila"><span>Subtotal · ${cantidad()} productos</span><span>${precio(subtotal())}</span></div>
      <div class="resumen-fila"><span>Envío</span><span>${envio() ? precio(envio()) : 'Gratis'}</span></div>
      <div class="resumen-total"><span>Total</span><span class="precio">${precio(subtotal() + envio())}</span></div>`;
  }

  modalEl.addEventListener('show.bs.modal', () => {
    const cliente = leer(CLAVE_CLIENTE, {});
    ['nombre', 'telefono', 'direccion'].forEach(c => {
      if (cliente[c] && !campos[c].value) campos[c].value = cliente[c];
    });
    actualizarEntrega();
    pintarResumen();
  });

  form.addEventListener('change', e => {
    if (e.target.name !== 'entrega') return;
    actualizarEntrega();
    pintarResumen();
  });

  function mensaje(datos) {
    const lineas = [`¡Hola ${negocio.nombre}! Soy ${datos.nombre} y quiero pedir:`];
    items.forEach(i => lineas.push(`• ${i.cant}× ${i.nombre}${i.detalle ? ` (${i.detalle})` : ''} — ${precio(i.precio * i.cant)}`));
    lineas.push('', `Subtotal: ${precio(subtotal())}`);
    if (envio()) lineas.push(`Envío: ${precio(envio())}`);
    lineas.push(`*Total: ${precio(subtotal() + envio())}*`, '');
    if (datos.entrega === 'delivery') lineas.push(`🛵 Delivery a: ${datos.direccion}`);
    else lineas.push(`🏃 Retiro en: ${negocio.locales.find(l => l.id === datos.local).nombre}`);
    lineas.push(`💳 Pago: ${datos.pago}`, `📞 ${datos.telefono}`);
    if (datos.notas) lineas.push(`📝 ${datos.notas}`);
    return lineas.join('\n');
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      form.querySelector(':invalid')?.focus();
      return;
    }
    const datos = Object.fromEntries(new FormData(form));
    window.open(`https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(mensaje(datos))}`, '_blank', 'noopener');
    guardar(CLAVE_CLIENTE, { nombre: datos.nombre, telefono: datos.telefono, direccion: datos.direccion ?? '' });

    items = [];
    persistir();
    form.classList.remove('was-validated');
    campos.notas.value = '';
    modal.hide();
    avisar('¡Pedido enviado! Te confirmamos por WhatsApp 🛵');
  });

  pintar();
  return { agregar };
}

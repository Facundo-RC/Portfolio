// Interfaz general: aviso, navegación, apariciones, contadores y secciones que vienen del JSON

import { $, $$, reducido, escapar } from './utils.js';

/* ---------- Aviso (toast de Bootstrap) ---------- */

export function avisar(texto) {
  $('#toastTexto').textContent = texto;
  bootstrap.Toast.getOrCreateInstance($('#toast')).show();
}

/* ---------- Navegación ---------- */

// Cierra un offcanvas y recién después scrollea al destino (si no, Bootstrap bloquea el scroll)
export function cerrarEIr(offcanvasEl, selector) {
  offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
    $(selector).scrollIntoView({ behavior: reducido ? 'auto' : 'smooth' });
  }, { once: true });
  bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl).hide();
}

export function initNav() {
  const nav = $('#nav');
  const marcar = () => nav.classList.toggle('solida', scrollY > 30);
  addEventListener('scroll', marcar, { passive: true });
  marcar();

  const menuMovil = $('#menuMovil');
  $$('a[href^="#"]', menuMovil).forEach(enlace => enlace.addEventListener('click', e => {
    e.preventDefault();
    cerrarEIr(menuMovil, enlace.getAttribute('href'));
  }));

  $('#anio').textContent = new Date().getFullYear();
}

/* ---------- Aparición al scrollear ---------- */

// Devuelve una función para observar también lo que se pinta después (datos del JSON)
export function initReveal() {
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('visto');
      observador.unobserve(entrada.target);
    });
  }, { threshold: .15 });

  const observar = () => $$('[data-reveal]:not(.visto)').forEach(el => observador.observe(el));
  observar();
  return observar;
}

/* ---------- Contadores animados ---------- */

function contar(el) {
  const objetivo = Number(el.dataset.contar);
  const decimales = Number(el.dataset.decimales || 0);
  const formato = n => (el.dataset.prefijo || '') +
    n.toLocaleString('es-AR', { minimumFractionDigits: decimales, maximumFractionDigits: decimales }) +
    (el.dataset.sufijo || '');

  if (reducido) { el.textContent = formato(objetivo); return; }
  const inicio = performance.now();
  (function cuadro(t) {
    const p = Math.min(1, (t - inicio) / 1600);
    const valor = objetivo * (1 - Math.pow(1 - p, 3));
    el.textContent = formato(decimales ? Number(valor.toFixed(decimales)) : Math.round(valor));
    if (p < 1) requestAnimationFrame(cuadro);
  })(inicio);
}

export function initContadores() {
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      contar(entrada.target);
      observador.unobserve(entrada.target);
    });
  }, { threshold: .6 });
  $$('[data-contar]').forEach(el => observador.observe(el));
}

/* ---------- Reseñas ---------- */

export function renderResenas(resenas) {
  $('#resenasTrack').innerHTML = resenas.map((r, i) => `
    <figure class="resena ${i % 2 ? 'rot-1' : 'rot-n1'}" data-reveal>
      <span class="estrellas" aria-label="${r.estrellas} de 5 estrellas">${'★'.repeat(r.estrellas)}${'☆'.repeat(5 - r.estrellas)}</span>
      <blockquote>“${escapar(r.texto)}”</blockquote>
      <figcaption><strong>${escapar(r.autor)}</strong> · ${escapar(r.contexto)}</figcaption>
    </figure>`).join('');
}

/* ---------- Locales ---------- */

const hora = h => String(h % 24).padStart(2, '0');

export function estadoLocal({ diasCerrado, turnos }, ahora = new Date()) {
  const h = ahora.getHours() + ahora.getMinutes() / 60;
  if (diasCerrado.includes(ahora.getDay())) return { abierto: false, texto: 'Hoy descansamos · volvemos mañana' };

  const turno = turnos.find(([abre, cierra]) => h >= abre && h < cierra);
  if (turno) return { abierto: true, texto: `Abierto ahora · hasta las ${hora(turno[1])} h` };

  const proximo = turnos.find(([abre]) => h < abre);
  return { abierto: false, texto: proximo ? `Cerrado · abrimos a las ${hora(proximo[0])} h` : 'Cerrado · abrimos mañana' };
}

export function renderLocales(negocio) {
  const estado = estadoLocal(negocio.horario);
  $('#horarioTexto').textContent = negocio.horario.texto;
  $('#localesGrid').innerHTML = negocio.locales.map(local => `
    <div class="col-12 col-md-6 col-lg-4">
      <article class="local" data-reveal>
        <div class="local-mapa" style="--mx:${local.mapa[0]}px; --my:${local.mapa[1]}px"><span class="pin"></span></div>
        <div class="local-info">
          <h3>${escapar(local.nombre)}</h3>
          <p>${escapar(local.direccion)}</p>
          <p class="estado${estado.abierto ? ' abierto' : ''}">${estado.texto}</p>
          <a class="link-flecha" href="${escapar(local.comoLlegar)}" aria-label="Cómo llegar a ${escapar(negocio.nombre)} ${escapar(local.nombre)}">Cómo llegar <span aria-hidden="true">→</span></a>
        </div>
      </article>
    </div>`).join('');
}

/* ---------- Preguntas frecuentes (accordion de Bootstrap) ---------- */

export function renderFaq(preguntas, negocio) {
  $('#faqLista').innerHTML = preguntas.map((p, i) => `
    <div class="accordion-item" data-reveal>
      <h3 class="accordion-header">
        <button class="accordion-button${i ? ' collapsed' : ''}" type="button" data-bs-toggle="collapse"
                data-bs-target="#faq-${i}" aria-expanded="${i === 0}" aria-controls="faq-${i}">
          ${escapar(p.pregunta)}
        </button>
      </h3>
      <div id="faq-${i}" class="accordion-collapse collapse${i ? '' : ' show'}" data-bs-parent="#faqLista">
        <div class="accordion-body">${escapar(p.respuesta)}</div>
      </div>
    </div>`).join('');

  const consulta = encodeURIComponent(`¡Hola ${negocio.nombre}! Tengo una consulta:`);
  $('#faqWhatsapp').href = `https://wa.me/${negocio.whatsapp}?text=${consulta}`;
}

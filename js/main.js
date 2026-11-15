/* Portfolio de Facundo Robaño — interacciones en JavaScript sin frameworks */
(() => {
  'use strict';

  const EMAIL = 'facurob2002@gmail.com';

  const ICONOS = {
    flecha: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>',
    github: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>',
    check: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><path d="M20 6 9 17l-5-5"></path></svg>`,
    copiar: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>',
    menu: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>',
    cerrar: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
  };

  const PROYECTOS = [
    {
      number: '01', title: 'HUMO', category: 'Frontend · E-commerce', year: '2026',
      description: 'Sitio de una hamburguesería con estética de póster retro. El menú se carga desde JSON, un armador apila la hamburguesa en vivo con el precio al momento, y el carrito persiste en localStorage con el pedido armado por WhatsApp.',
      tags: ['JavaScript', 'Bootstrap 5', 'Sass', 'JSON'],
      highlights: [
        'Menú dinámico con fetch y pestañas, más un armador de hamburguesas en tiempo real',
        'Carrito en offcanvas con persistencia en localStorage y checkout validado',
        'Ilustraciones SVG generadas por código, accesible y con prefers-reduced-motion',
      ],
      image: 'assets/humo.webp', imageAlt: 'Captura del sitio HUMO Smash Burgers',
      demo: 'https://facundo-rc.github.io/Portfolio/proyectos/CTM/',
      repository: 'https://github.com/Facundo-RC/Portfolio/tree/main/proyectos/CTM',
    },
    {
      number: '02', title: 'Rumbo Sur', category: 'Full stack · Agencia de viajes', year: '2026',
      description: 'Sitio de una agencia de viajes con catálogo de paquetes, cotizador, carrito y reservas. Hecho con TanStack Start (React 19) y Sass, renderizado en el servidor y desplegable en Cloudflare Workers.',
      tags: ['React 19', 'TanStack Start', 'Tailwind', 'Sass'],
      highlights: [
        'Catálogo de paquetes con búsqueda por destino, tipo de viaje y mes de salida',
        'Cotización al instante, carrito y reservas con selector de moneda USD / UYU',
        'Renderizado en el servidor con estado persistido en el navegador',
      ],
      image: 'assets/rumbosur.webp', imageAlt: 'Captura del sitio de la agencia de viajes Rumbo Sur',
      demo: 'https://facundo-rc.github.io/Portfolio/proyectos/RumboSur/demo/', repository: 'https://github.com/Facundo-RC/Portfolio/tree/main/proyectos/RumboSur',
    },
  ];

  const SNIPPETS = [
    {
      badge: 'Carrito · localStorage', language: 'JavaScript',
      lines: [
        [['const', 'kw'], [' cantidad = () => items.', 'plain'], ['reduce', 'fn'], ['((n, i) => n + i.cant, 0);', 'plain']],
        [['const', 'kw'], [' subtotal = () => items.', 'plain'], ['reduce', 'fn'], ['((n, i) => n + i.cant * i.precio, 0);', 'plain']],
        [['const', 'kw'], [' envio = () => campos.entrega.value === ', 'plain'], ["'delivery'", 'type']],
        [['  ? negocio.envio : 0;', 'plain']],
        [['', 'plain']],
        [['// el total se recalcula en cada cambio', 'comment']],
        [['$(', 'plain'], ["'#carritoTotal'", 'type'], [').textContent = ', 'plain'], ['precio', 'fn'], ['(subtotal());', 'plain']],
      ],
    },
    {
      badge: 'Estado · SSR', language: 'JSX',
      lines: [
        [['export', 'kw'], [' ', 'plain'], ['function', 'kw'], [' ', 'plain'], ['ViajeProvider', 'fn'], ['({ children }) {', 'plain']],
        [['  ', 'plain'], ['const', 'kw'], [' [carrito, setCarrito] = ', 'plain'], ['useState', 'fn'], ['([]);', 'plain']],
        [['  ', 'plain'], ['// lo guardado se lee ya en el navegador', 'comment']],
        [['  ', 'plain'], ['useEffect', 'fn'], ['(() => {', 'plain']],
        [['    ', 'plain'], ['setCarrito', 'fn'], ['(', 'plain'], ['leerGuardado', 'fn'], ['(CLAVES.carrito, []));', 'plain']],
        [['  }, []);', 'plain']],
        [['}', 'plain']],
      ],
    },
  ];
  const COLOR_TOKEN = {
    kw: 'text-primary', fn: 'text-accent', type: 'text-foreground/90',
    plain: 'text-foreground/65', comment: 'text-muted-foreground italic',
  };

  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Barra de progreso, cabecera y sección activa ---------- */
  const progreso = $('#progreso');
  const barra = $('#barra');
  const CLASES_ARRIBA = ['border-transparent', 'bg-background/30', 'backdrop-blur-md'];
  const CLASES_SCROLL = ['border-border/80', 'bg-background/85', 'shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]', 'backdrop-blur-xl'];

  function alScrollear() {
    const el = document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    progreso.style.width = (max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0) + '%';
    const abajo = el.scrollTop > 24;
    barra.classList.remove(...(abajo ? CLASES_ARRIBA : CLASES_SCROLL));
    barra.classList.add(...(abajo ? CLASES_SCROLL : CLASES_ARRIBA));
  }
  window.addEventListener('scroll', alScrollear, { passive: true });
  alScrollear();

  const enlacesNav = $$('[data-nav]');
  function marcarActivo(id) {
    enlacesNav.forEach((a) => {
      const activo = a.dataset.nav === id;
      a.classList.toggle('bg-primary', activo);
      a.classList.toggle('text-primary-foreground', activo);
      a.classList.toggle('text-muted-foreground', !activo);
      a.classList.toggle('hover:text-foreground', !activo);
    });
  }
  const obsSecciones = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => e.isIntersecting && marcarActivo(e.target.id));
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
  ['inicio', 'perfil', 'proyectos', 'contacto']
    .map((id) => document.getElementById(id)).filter(Boolean)
    .forEach((s) => obsSecciones.observe(s));

  /* ---------- Menú móvil ---------- */
  const btnMenu = $('#btn-menu');
  const menu = document.createElement('div');
  menu.className = 'mt-2 hidden overflow-hidden rounded-2xl border border-border/80 bg-background/95 p-2 backdrop-blur-xl md:hidden';
  menu.innerHTML = `<nav class="flex flex-col" aria-label="Navegación móvil">
    ${[['perfil', 'Perfil'], ['proyectos', 'Proyectos'], ['contacto', 'Contacto']].map(([id, txt]) =>
      `<a href="#${id}" class="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground">${txt}${ICONOS.flecha}</a>`).join('')}
    <a href="#contacto" class="mt-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">Hablemos${ICONOS.flecha}</a>
  </nav>`;
  barra.insertAdjacentElement('afterend', menu);
  function abrirMenu(abrir) {
    menu.classList.toggle('hidden', !abrir);
    btnMenu.setAttribute('aria-expanded', String(abrir));
    btnMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    btnMenu.innerHTML = abrir ? ICONOS.cerrar : ICONOS.menu;
  }
  btnMenu.addEventListener('click', () => abrirMenu(menu.classList.contains('hidden')));
  menu.addEventListener('click', (e) => e.target.closest('a') && abrirMenu(false));

  /* ---------- Animaciones de entrada ---------- */
  const reveals = $$('[data-reveal]');
  reveals.forEach((el) => {
    const hermanos = [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal'));
    const i = hermanos.indexOf(el);
    if (i > 0) el.style.setProperty('--delay', Math.min(i * 0.08, 0.4) + 's');
  });
  const obsReveal = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obsReveal.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -60px 0px' });
  reveals.forEach((el) => obsReveal.observe(el));

  /* ---------- Tarjeta de código ---------- */
  const codigo = $('#codigo');
  const tabs = $$('[data-tab]');
  const btnCopiar = $('#btn-copiar');
  let snippetActual = 0;

  let escribiendo = null;
  const lineaHTML = (linea, i, hasta = Infinity, conCursor = false) => {
    let resto = hasta;
    const partes = [];
    for (const [txt, tipo] of linea) {
      if (resto <= 0) break;
      partes.push(`<span class="${COLOR_TOKEN[tipo]}">${esc(txt.slice(0, resto))}</span>`);
      resto -= txt.length;
    }
    return `<div class="group flex rounded hover:bg-secondary/40"><span class="mr-4 w-4 shrink-0 select-none text-right text-muted-foreground/40">${i + 1}</span><span class="whitespace-pre">${partes.join('')}${conCursor ? '<span class="cursor-escritura"></span>' : ''}</span></div>`;
  };

  function renderCodigo(n, animar = false) {
    snippetActual = n;
    clearInterval(escribiendo);
    const s = SNIPPETS[n];
    const completo = s.lines.map((l, i) => lineaHTML(l, i)).join('');
    $('#codigo-badge').textContent = s.badge;
    $('#codigo-lenguaje').textContent = s.language;
    tabs.forEach((t) => {
      const activo = Number(t.dataset.tab) === n;
      t.classList.toggle('bg-primary', activo);
      t.classList.toggle('text-primary-foreground', activo);
      t.classList.toggle('text-muted-foreground', !activo);
      t.classList.toggle('hover:text-foreground', !activo);
    });
    if (!animar || sinMovimiento) { codigo.innerHTML = completo; return; }

    // Se escribe solo, carácter por carácter; las líneas que faltan quedan vacías para no saltar de alto
    const largos = s.lines.map((l) => l.reduce((t, [x]) => t + x.length, 0));
    let fila = 0, col = 0;
    const pintar = () => {
      codigo.innerHTML = s.lines.map((l, i) =>
        i < fila ? lineaHTML(l, i) : i === fila ? lineaHTML(l, i, col, true) : lineaHTML([], i)).join('');
    };
    pintar();
    escribiendo = setInterval(() => {
      col += 2;
      if (col > largos[fila]) { fila++; col = 0; }
      if (fila >= s.lines.length) { clearInterval(escribiendo); codigo.innerHTML = completo; return; }
      pintar();
    }, 22);
  }
  tabs.forEach((t) => t.addEventListener('click', () => renderCodigo(Number(t.dataset.tab))));

  btnCopiar.addEventListener('click', async () => {
    const texto = SNIPPETS[snippetActual].lines.map((l) => l.map(([t]) => t).join('')).join('\n');
    try {
      await navigator.clipboard.writeText(texto);
      btnCopiar.innerHTML = ICONOS.check('h-3 w-3') + 'Copiado';
      setTimeout(() => { btnCopiar.innerHTML = ICONOS.copiar + 'Copiar'; }, 1600);
    } catch { /* el navegador no dio permiso de portapapeles */ }
  });

  const btnEmail = $('#btn-copiar-email');
  btnEmail?.addEventListener('click', async () => {
    const icono = btnEmail.querySelector('span');
    const texto = btnEmail.querySelector('.text-sm');
    try {
      await navigator.clipboard.writeText(EMAIL);
      icono.innerHTML = ICONOS.check('h-4 w-4');
      texto.textContent = '¡Copiado al portapapeles!';
      setTimeout(() => { icono.innerHTML = ICONOS.copiar.replace('h-3 w-3', 'h-4 w-4'); texto.textContent = 'Un click y listo'; }, 1600);
    } catch { /* sin permiso de portapapeles */ }
  });

  /* ---------- Modal de proyecto ---------- */
  let modal = null;
  let focoPrevio = null;

  function abrirProyecto(p) {
    focoPrevio = document.activeElement;
    modal = document.createElement('div');
    modal.innerHTML = `
      <div data-state="open" class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=open]:fade-in-0" data-cerrar></div>
      <div role="dialog" aria-modal="true" aria-labelledby="modal-titulo" data-state="open" tabindex="-1"
        class="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border shadow-lg duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] max-h-[90vh] max-w-2xl overflow-y-auto rounded-3xl border-border bg-card p-0">
        <div class="relative aspect-[16/9] overflow-hidden border-b border-border/70 bg-secondary">
          <img src="${p.image}" alt="${esc(p.imageAlt)}" class="h-full w-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"></div>
          <span class="absolute left-5 top-5 rounded-full border border-border/60 bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground backdrop-blur">${p.number} / 02 · ${p.year}</span>
        </div>
        <div class="p-6 sm:p-8">
          <div class="flex flex-col space-y-1.5 text-left">
            <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">${esc(p.category)}</p>
            <h2 id="modal-titulo" class="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">${esc(p.title)}</h2>
            <p class="mt-3 text-sm leading-relaxed text-muted-foreground">${esc(p.description)}</p>
          </div>
          <ul class="mt-6 space-y-2.5">${p.highlights.map((h) =>
            `<li class="flex items-start gap-2.5 text-sm text-foreground/85"><span class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15">${ICONOS.check('h-2.5 w-2.5 text-primary')}</span>${esc(h)}</li>`).join('')}</ul>
          <ul class="mt-6 flex flex-wrap gap-1.5">${p.tags.map((t) =>
            `<li class="rounded-full border border-border/70 bg-secondary/40 px-2.5 py-1 font-mono text-[10px] text-foreground/75">${esc(t)}</li>`).join('')}</ul>
          <div class="mt-7 flex flex-wrap gap-3 border-t border-border/60 pt-6">
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[0_16px_40px_-18px_hsl(var(--primary)/0.9)]">Abrir demo${ICONOS.flecha}</a>` : ''}
            <a href="${p.repository}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary">${ICONOS.github}Ver código</a>
          </div>
        </div>
        <button type="button" data-cerrar class="absolute right-4 top-4 rounded-full bg-background/70 p-1.5 opacity-80 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring" aria-label="Cerrar">${ICONOS.cerrar}</button>
      </div>`;
    document.body.appendChild(modal);
    document.body.classList.add('modal-abierto');
    modal.querySelector('[role=dialog]').focus();
    modal.addEventListener('click', (e) => e.target.closest('[data-cerrar]') && cerrarProyecto());
  }
  function cerrarProyecto() {
    if (!modal) return;
    modal.remove(); modal = null;
    document.body.classList.remove('modal-abierto');
    focoPrevio?.focus();
  }
  document.addEventListener('keydown', (e) => e.key === 'Escape' && cerrarProyecto());
  $$('[data-proyecto]').forEach((b) => b.addEventListener('click', () => abrirProyecto(PROYECTOS[Number(b.dataset.proyecto)])));

  /* ---------- Formulario de contacto ---------- */
  const form = $('#form-contacto');
  const estado = $('#form-estado');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(form));
    const nombre = (datos.name || '').trim();
    const email = (datos.email || '').trim();
    const mensaje = (datos.message || '').trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    estado.classList.remove('hidden', 'text-primary', 'text-destructive', 'flex', 'items-center', 'gap-1.5');
    if (!nombre || !emailOk || !mensaje) {
      estado.classList.add('text-destructive');
      estado.textContent = !nombre ? 'Escribí tu nombre.' : !emailOk ? 'Revisá el email: no parece válido.' : 'Escribí un mensaje.';
      return;
    }
    const asunto = `Contacto desde el portfolio — ${nombre}`;
    const cuerpo = `${mensaje}\n\n${nombre}\n${email}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    estado.classList.add('flex', 'items-center', 'gap-1.5', 'text-primary');
    estado.innerHTML = ICONOS.check('h-3.5 w-3.5') + 'Se abrió tu correo con el mensaje listo. Te respondo a la brevedad.';
    form.reset();
  });

  /* ---------- Cursor personalizado ---------- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const raiz = document.documentElement;
    const capa = $('#cursor');
    const punto = $('#cur-punto');
    const siguen = [$('#cur-marco'), $('#cur-anillo'), $('#cur-halo')];
    const todos = [punto, ...siguen];
    const marcoInt = punto && $('#cur-marco > div');
    const marcoBorde = marcoInt && marcoInt.querySelector('span');
    const puntoLuz = punto.querySelector('span');
    const pos = siguen.map(() => ({ x: -200, y: -200 }));
    const suavizado = [0.28, 0.16, 0.09];
    const mouse = { x: -200, y: -200 };
    let visto = false;
    let modo = 'idle';
    const HOVER = "a, button, [role='button'], summary, [data-cursor='hover']";
    const OCULTO = 'input, textarea, select';
    const CLASES_HOVER = ['rotate-45', 'scale-[1.3]', 'border-coral', 'bg-coral/15', 'shadow-[0_0_40px_-4px_hsl(var(--coral)/0.9)]'];

    const mover = (el, x, y) => { el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`; };

    function ponerModo(m) {
      modo = m;
      const ocultar = !visto || m === 'hidden';
      todos.forEach((el) => el.classList.toggle('opacity-0', ocultar));
      const hov = m === 'hover';
      $('#cur-halo').classList.toggle('bg-coral/40', hov);
      $('#cur-anillo').classList.toggle('border-coral/40', hov);
      CLASES_HOVER.forEach((c) => marcoInt.classList.toggle(c, hov));
      marcoBorde.classList.toggle('opacity-0', hov);
      puntoLuz.classList.toggle('scale-50', hov);
      puntoLuz.classList.toggle('opacity-60', hov);
    }

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      if (!visto) { visto = true; pos.forEach((p) => { p.x = mouse.x; p.y = mouse.y; }); }
      const t = e.target;
      const oculto = !!t.closest?.(OCULTO);
      const hover = !oculto && !!t.closest?.(HOVER);
      ponerModo(oculto ? 'hidden' : hover ? 'hover' : 'idle');
      mover(punto, mouse.x, mouse.y);
    }, { passive: true });

    window.addEventListener('mousedown', (e) => {
      const onda = document.createElement('span');
      onda.className = 'cursor-ripple absolute h-10 w-10 rounded-lg border-2 border-coral/70';
      onda.style.left = e.clientX + 'px';
      onda.style.top = e.clientY + 'px';
      capa.appendChild(onda);
      setTimeout(() => onda.remove(), 700);
    });
    document.addEventListener('mouseleave', () => ponerModo('hidden'));
    document.addEventListener('mouseenter', () => ponerModo('idle'));

    (function animar() {
      siguen.forEach((el, i) => {
        const destino = i === 0 ? mouse : pos[i - 1];
        pos[i].x += (destino.x - pos[i].x) * suavizado[i];
        pos[i].y += (destino.y - pos[i].y) * suavizado[i];
        mover(el, pos[i].x, pos[i].y);
      });
      requestAnimationFrame(animar);
    })();

    raiz.classList.add('custom-cursor');
  }


  /* ---------- Retoques para deslumbrar ---------- */

  // Nombre: separa cada letra para que suban en cascada
  const h1 = $('#inicio h1');
  if (h1 && !sinMovimiento) {
    let i = 0;
    const partir = (el) => {
      const texto = el.textContent;
      el.setAttribute('aria-label', texto);
      el.innerHTML = `<span class="linea-nombre" aria-hidden="true">${[...texto].map((c) => `<span class="letra" style="--i:${i++}">${c}</span>`).join('')}</span>`;
    };
    partir(h1.querySelector('.block'));
    partir(h1.querySelector('.text-outline'));
    (document.fonts?.ready ?? Promise.resolve()).then(() =>
      requestAnimationFrame(() => requestAnimationFrame(() => h1.classList.add('nombre-listo'))));
    setTimeout(() => h1.classList.add('nombre-listo'), 1500);
  }
  const dev = $('#inicio h1 .font-serif');
  if (dev) dev.classList.add('dev-brillo');

  // Números que cuentan desde cero
  const contadores = $$('[data-contar]');
  const obsContar = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      obsContar.unobserve(e.target);
      const el = e.target;
      const final = parseInt(el.textContent, 10);
      const sufijo = el.textContent.replace(/[0-9]/g, '');
      if (sinMovimiento) return;
      const dur = final > 10 ? 1600 : 900;
      const t0 = performance.now();
      (function paso(t) {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(final * (1 - Math.pow(1 - p, 3))) + sufijo;
        if (p < 1) requestAnimationFrame(paso);
      })(t0);
    });
  }, { threshold: 0.6 });
  contadores.forEach((c) => obsContar.observe(c));

  if (conMouse && !sinMovimiento) {
    // Luz que sigue al mouse en el inicio
    const inicio = $('#inicio');
    const foco = $('#foco-hero');
    inicio.addEventListener('mousemove', (e) => {
      const r = inicio.getBoundingClientRect();
      foco.style.setProperty('--fx', e.clientX - r.left + 'px');
      foco.style.setProperty('--fy', e.clientY - r.top + 'px');
    });

    // Resplandor de las tarjetas
    $$('[data-brillo]').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', e.clientX - r.left + 'px');
        card.style.setProperty('--my', e.clientY - r.top + 'px');
      });
    });

    // Tarjeta de código en 3D
    const tilt = $('[data-tilt]');
    tilt.addEventListener('mousemove', (e) => {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.classList.add('moviendo');
      tilt.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg');
      tilt.style.setProperty('--rx', (-y * 7).toFixed(2) + 'deg');
    });
    tilt.addEventListener('mouseleave', () => {
      tilt.classList.remove('moviendo');
      tilt.style.setProperty('--ry', '0deg');
      tilt.style.setProperty('--rx', '0deg');
    });

    // Botones magnéticos
    $$('[data-iman]').forEach((b) => {
      b.addEventListener('mousemove', (e) => {
        const r = b.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        b.style.transform = `translate(${x * 0.22}px, ${y * 0.3}px)`;
      });
      b.addEventListener('mouseleave', () => { b.style.transform = ''; });
    });
  }

  setTimeout(() => renderCodigo(0, true), sinMovimiento ? 0 : 900);
})();

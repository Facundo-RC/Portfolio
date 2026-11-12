// Ilustraciones SVG generadas por código: hamburguesas por capas, papas, bebidas y postres

const TINTA = '#1a1210';
const T = `stroke="${TINTA}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
const FUENTE = `font-family="Bricolage Grotesque, sans-serif" font-weight="800"`;

const SEMILLAS = [[92, 40, -20], [132, 26, 10], [176, 24, -8], [216, 36, 18], [250, 62, -30], [72, 72, 25], [116, 56, -12], [160, 48, 6], [204, 62, -18], [150, 82, 14], [102, 90, -6], [234, 92, 20]];

// Borde inferior ondulado (lechuga)
function ondas(x0, x1, arriba, base, amp, n) {
  const paso = (x1 - x0) / n;
  let d = `M${x0} ${base}L${x0} ${arriba}L${x1} ${arriba}L${x1} ${base}`;
  for (let i = n; i > 0; i--) {
    const x = x0 + paso * i;
    d += `Q${x - paso / 2} ${base + amp} ${x - paso} ${base}`;
  }
  return d + 'Z';
}

// Tira sinusoidal (bacon)
function tira(x0, x1, y, grosor, amp, ciclos) {
  const pts = [];
  for (let i = 0; i <= 40; i++) {
    const x = x0 + (x1 - x0) * i / 40;
    pts.push([x, y + Math.sin(i / 40 * ciclos * Math.PI * 2) * amp]);
  }
  const arriba = pts.map(([x, yy]) => `${x.toFixed(1)} ${yy.toFixed(1)}`);
  const abajo = pts.slice().reverse().map(([x, yy]) => `${x.toFixed(1)} ${(yy + grosor).toFixed(1)}`);
  const veta = pts.slice(3, 38).map(([x, yy]) => `${x.toFixed(1)} ${(yy + grosor / 2).toFixed(1)}`);
  return { cuerpo: `M${arriba.join('L')}L${abajo.join('L')}Z`, veta: `M${veta.join('L')}` };
}

const BACON = tira(10, 310, 4, 16, 5, 2.5);

// Cada capa: cuánto avanza la pila (paso), cuánto ocupa al dibujarse (alto) y su dibujo.
const CAPAS = {
  panArriba: {
    paso: 106, alto: 118,
    dibujo: () => `
      <path d="M22 104C22 40 84 6 160 6S298 40 298 104q0 12-12 12H34q-12 0-12-12z" fill="#e9a23b" ${T}/>
      <path d="M54 66C68 40 102 24 144 20" fill="none" stroke="#f7cf86" stroke-width="9" stroke-linecap="round"/>
      ${SEMILLAS.map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="6.5" ry="3.4" transform="rotate(${r} ${x} ${y})" fill="#fff4dc" stroke="${TINTA}" stroke-width="2"/>`).join('')}`
  },
  lechuga: {
    paso: 14, alto: 30,
    dibujo: () => `<path d="${ondas(10, 310, 2, 18, 12, 12)}" fill="#7cb342" ${T}/>`
  },
  tomate: {
    paso: 15, alto: 22,
    dibujo: () => `
      <rect x="24" y="0" width="138" height="20" rx="10" fill="#e0301e" ${T}/>
      <rect x="158" y="0" width="138" height="20" rx="10" fill="#e0301e" ${T}/>
      <path d="M44 7h44M178 7h44" stroke="#f58b78" stroke-width="4" stroke-linecap="round"/>`
  },
  pepinos: {
    paso: 10, alto: 18,
    dibujo: () => [52, 122, 196, 268].map(x => `
      <ellipse cx="${x}" cy="9" rx="31" ry="9" fill="#9db43a" ${T}/>
      <ellipse cx="${x}" cy="9" rx="17" ry="4" fill="#c9d870"/>`).join('')
  },
  cebolla: {
    paso: 10, alto: 20,
    dibujo: () => [44, 104, 164, 224, 278].map((x, i) => {
      const y = 9 + (i % 2) * 2;
      return `
      <ellipse cx="${x}" cy="${y}" rx="34" ry="8" fill="#f6e3ee" stroke="${TINTA}" stroke-width="9"/>
      <ellipse cx="${x}" cy="${y}" rx="34" ry="8" fill="none" stroke="#a8457f" stroke-width="4"/>`;
    }).join('')
  },
  bacon: {
    paso: 16, alto: 26,
    dibujo: () => `
      <path d="${BACON.cuerpo}" fill="#c94f3a" ${T}/>
      <path d="${BACON.veta}" fill="none" stroke="#f4b29e" stroke-width="4" stroke-linecap="round"/>`
  },
  queso: {
    paso: 10, alto: 40,
    dibujo: () => `<path d="M12 0H308V12H288Q280 42 272 12H210Q203 32 196 12H120Q110 44 100 12H50Q44 30 38 12H12Z" fill="#f7c531" ${T}/>`
  },
  carne: {
    paso: 38, alto: 44,
    dibujo: () => `
      <rect x="14" y="0" width="292" height="44" rx="22" fill="#6b3a1e" ${T}/>
      <path d="M42 12q52-6 110 0M172 12q50-6 104 0" fill="none" stroke="#935a36" stroke-width="5" stroke-linecap="round"/>
      <path d="M62 29h14M112 33h10M160 28h16M214 32h12M252 27h10" stroke="#3e1d0c" stroke-width="5" stroke-linecap="round"/>`
  },
  veggie: {
    paso: 38, alto: 44,
    dibujo: () => `
      <rect x="14" y="0" width="292" height="44" rx="22" fill="#8a6a2c" ${T}/>
      <path d="M42 12q52-6 110 0M172 12q50-6 104 0" fill="none" stroke="#a88544" stroke-width="5" stroke-linecap="round"/>
      ${[[64, 28], [104, 32], [150, 26], [196, 31], [240, 27], [272, 33]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#7cb342"/>`).join('')}`
  },
  panAbajo: {
    paso: 50, alto: 52,
    dibujo: () => `
      <path d="M18 6h284v18c0 16-12 26-28 26H46c-16 0-28-10-28-26z" fill="#e9a23b" ${T}/>
      <path d="M32 15h256" stroke="#f7cf86" stroke-width="6" stroke-linecap="round"/>`
  }
};

/**
 * Arma el SVG de una hamburguesa a partir de una lista de capas (de arriba hacia abajo).
 * Cada capa queda en un <g class="capa"> con data-i = posición contando desde abajo.
 */
export function svgBurger(capas, { claves = [], nuevas = new Set() } = {}) {
  let y = 0;
  const pos = capas.map(tipo => { const p = y; y += CAPAS[tipo].paso; return p; });
  const alto = Math.max(...capas.map((t, i) => pos[i] + CAPAS[t].alto));
  const n = capas.length;
  // Se dibuja de abajo hacia arriba para que cada capa tape a la de abajo
  let grupos = '';
  for (let i = n - 1; i >= 0; i--) {
    const nueva = nuevas.has(claves[i]) ? ' nueva' : '';
    grupos += `<g class="capa${nueva}" data-i="${n - 1 - i}" style="--d:${n - 1 - i}"><g transform="translate(0 ${pos[i]})">${CAPAS[capas[i]].dibujo()}</g></g>`;
  }
  return `<svg viewBox="-8 -8 336 ${alto + 16}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${grupos}</svg>`;
}

function svgPapas({ cheddar }) {
  const palitos = [[112, 40, -10], [136, 22, -4], [160, 30, 2], [184, 14, 6], [208, 34, 12], [124, 56, -14], [172, 48, 0], [220, 58, 16], [148, 52, -6], [196, 60, 8]];
  const papas = palitos.map(([x, y, r]) => `<rect x="${x - 10}" y="${y}" width="20" height="140" rx="5" transform="rotate(${r} ${x} ${y + 140})" fill="#f6c445" ${T}/>`).join('');
  const salsa = cheddar ? `
    <path d="M92 112C96 88 120 80 140 92C152 76 176 76 186 90C202 80 226 86 230 108L234 114C238 132 224 134 222 120C216 142 200 142 198 122C190 140 172 140 170 120C160 138 142 136 140 118C130 134 112 132 112 118C100 130 86 126 92 112Z" fill="#f29f05" ${T}/>
    ${[[128, 98, 20], [164, 88, -15], [200, 100, 30], [150, 112, -40], [184, 112, 10]].map(([x, y, r]) => `<rect x="${x - 7}" y="${y - 4}" width="14" height="8" rx="2" transform="rotate(${r} ${x} ${y})" fill="#c94f3a" stroke="${TINTA}" stroke-width="2"/>`).join('')}
    ${[[140, 100], [178, 98], [212, 110], [118, 110]].map(([x, y]) => `<path d="M${x} ${y}l6-6" stroke="#5f9e2e" stroke-width="4" stroke-linecap="round"/>`).join('')}` : '';
  return `<svg viewBox="40 0 240 290" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    ${papas}
    <path d="M78 112h164l-20 150q-2 14-16 14H114q-14 0-16-14z" fill="#e0301e" ${T}/>
    <path d="M78 112q82 34 164 0" fill="none" ${T}/>
    ${salsa}
    <circle cx="160" cy="200" r="30" fill="#fbf5e9" ${T}/>
    <text x="160" y="213" text-anchor="middle" ${FUENTE} font-size="36" fill="${TINTA}">H</text>
  </svg>`;
}

function anillo(cx, cy, rx, ry) {
  const ri = rx * .5, rj = ry * .42;
  return `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0Z` +
         `M${cx - ri} ${cy}a${ri} ${rj} 0 1 0 ${ri * 2} 0a${ri} ${rj} 0 1 0 ${-ri * 2} 0Z`;
}

function svgAros() {
  const aros = [[160, 204, 4], [136, 156, -10], [178, 110, 8]];
  return `<svg viewBox="20 30 280 250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="160" cy="236" rx="120" ry="26" fill="#fbf5e9" ${T}/>
    ${aros.map(([cx, cy, r]) => `
      <g transform="rotate(${r} ${cx} ${cy})">
        <path d="${anillo(cx, cy, 84, 34)}" fill="#e3a03f" fill-rule="evenodd" ${T}/>
        ${[0.3, 1.1, 1.9, 2.6, 3.5, 4.3, 5.1, 5.8].map(t => `<circle cx="${(cx + Math.cos(t) * 64).toFixed(1)}" cy="${(cy + Math.sin(t) * 24).toFixed(1)}" r="2.6" fill="#b06a1c"/>`).join('')}
      </g>`).join('')}
    <path d="M232 196h56l-6 30q-1 6-7 6h-30q-6 0-7-6z" fill="#fbf5e9" ${T}/>
    <ellipse cx="260" cy="197" rx="26" ry="7" fill="#7a2a14" ${T}/>
  </svg>`;
}

function svgVaso({ banda, tapa, texto }) {
  return `<svg viewBox="40 0 240 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="186" y="0" width="16" height="92" rx="4" transform="rotate(12 194 92)" fill="${banda}" ${T}/>
    <path d="M92 86h136l-18 186q-1 12-13 12h-92q-12 0-13-12z" fill="#fbf5e9" ${T}/>
    <path d="M97.8 146H222.2L217.2 198H102.8Z" fill="${banda}" ${T}/>
    <text x="160" y="182" text-anchor="middle" ${FUENTE} font-size="28" fill="#fbf5e9" letter-spacing="2">${texto}</text>
    <path d="M110 230l4 36" stroke="#e8dcc4" stroke-width="6" stroke-linecap="round"/>
    <path d="M104 72Q160 34 216 72Z" fill="${tapa}" ${T}/>
    <rect x="80" y="66" width="160" height="24" rx="10" fill="${tapa}" ${T}/>
  </svg>`;
}

function svgPinta() {
  const burbujas = [[130, 150, 4], [150, 200, 3], [176, 130, 5], [188, 224, 3], [142, 250, 4], [196, 170, 3]];
  return `<svg viewBox="40 0 240 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M96 60h128l-14 214q-1 10-11 10h-78q-10 0-11-10z" fill="#f0a830" ${T}/>
    <path d="M118 96l-6 156" stroke="#fbd78a" stroke-width="8" stroke-linecap="round"/>
    ${burbujas.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff4dc" opacity=".8"/>`).join('')}
    <path d="M88 72q-8-30 22-30q10-22 36-10q16-18 38 0q30-6 32 22q12 18-6 26q-6 22-16 0q-30 10-58 0q-10 18-22-2q-20 4-26-6z" fill="#fff8ea" ${T}/>
  </svg>`;
}

function svgShake({ color, salsa }) {
  const crema = [[124, 98, 24], [204, 100, 22], [150, 84, 30], [184, 88, 26], [164, 60, 22]];
  return `<svg viewBox="40 0 240 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="196" y="14" width="16" height="110" rx="4" transform="rotate(16 204 124)" fill="#e0301e" ${T}/>
    <path d="M98 104h124l-16 168q-1 12-13 12h-66q-12 0-13-12z" fill="${color}" ${T}/>
    <path d="M110 140l6 120" stroke="rgba(255,255,255,.45)" stroke-width="8" stroke-linecap="round"/>
    ${crema.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff8ea" ${T}/>`).join('')}
    <path d="M128 92q30 14 70 0" fill="none" stroke="${salsa}" stroke-width="7" stroke-linecap="round"/>
    <path d="M170 40q4-20 22-26" fill="none" ${T}/>
    <circle cx="168" cy="40" r="14" fill="#e0301e" ${T}/>
    <circle cx="163" cy="35" r="3.5" fill="#fbf5e9"/>
  </svg>`;
}

function svgCookie() {
  const chips = [[120, 110, 20], [178, 96, -10], [212, 140, 30], [150, 160, 0], [104, 176, -30], [190, 196, 15], [140, 220, 40], [226, 186, -20]];
  return `<svg viewBox="30 30 260 250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M160 40c34 0 62 14 80 36-14 6-16 26-2 32 14 6 26 0 30-10 8 16 12 34 12 52 0 66-54 120-120 120S40 216 40 150 94 40 160 40z" fill="#d9a35b" ${T}/>
    <path d="M78 140c4-36 30-64 64-74" fill="none" stroke="#efc488" stroke-width="7" stroke-linecap="round"/>
    ${chips.map(([x, y, r]) => `<path d="M${x - 9} ${y + 6}q1-14 9-16q8 2 9 16z" transform="rotate(${r} ${x} ${y})" fill="#4a2412" stroke="${TINTA}" stroke-width="2"/>`).join('')}
  </svg>`;
}

// El campo "arte.tipo" de cada producto del JSON elige su dibujo
const ARTES = {
  papas: svgPapas,
  aros: svgAros,
  vaso: svgVaso,
  pinta: svgPinta,
  shake: svgShake,
  cookie: svgCookie
};

export function arte(producto) {
  if (producto.capas) return svgBurger(producto.capas);
  const dibujar = ARTES[producto.arte?.tipo];
  return dibujar ? dibujar(producto.arte) : '';
}

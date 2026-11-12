// Carga de los datos del sitio desde /data

const ARCHIVOS = {
  menu: 'data/menu.json',
  armador: 'data/armador.json',
  negocio: 'data/negocio.json',
  resenas: 'data/resenas.json',
  faq: 'data/faq.json'
};

async function pedirJSON(url) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) throw new Error(`No se pudo cargar ${url} (HTTP ${respuesta.status})`);
  return respuesta.json();
}

// Trae todos los JSON en paralelo y devuelve { menu, armador, negocio, resenas, faq }
export async function cargarDatos() {
  const entradas = await Promise.all(
    Object.entries(ARCHIVOS).map(async ([clave, url]) => [clave, await pedirJSON(url)])
  );
  return Object.fromEntries(entradas);
}

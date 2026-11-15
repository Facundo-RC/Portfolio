// Formato de precios y fechas.
// Todos los precios del catálogo están en dólares por persona en habitación doble.

export function formatearPrecio(usd) {
  return `US$ ${Math.round(usd).toLocaleString("es-UY")}`;
}

export function formatearFecha(iso, opciones = { day: "numeric", month: "long", year: "numeric" }) {
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d).toLocaleDateString("es-UY", opciones);
}

export function formatearFechaCorta(iso) {
  return formatearFecha(iso, { day: "2-digit", month: "short", year: "numeric" });
}

export function formatearCantidad(numero, singular, plural) {
  return `${numero} ${numero === 1 ? singular : plural}`;
}
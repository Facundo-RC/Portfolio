/**
 * Capa de acceso a la API. Todo el fetch vive acá: el resto de la app
 * llama métodos con nombre y no se entera de rutas ni de códigos HTTP.
 */
const api = (() => {
  const BASE = '/api';

  /**
   * Envuelve fetch: arma la URL, parsea el JSON y convierte
   * cualquier respuesta de error en una excepción con mensaje usable.
   */
  async function pedir(ruta, opciones = {}) {
    let respuesta;

    try {
      respuesta = await fetch(BASE + ruta, {
        headers: { 'Content-Type': 'application/json' },
        ...opciones
      });
    } catch {
      // Falla de red: el servidor no respondió.
      throw new ErrorApi('No se pudo conectar con el servidor. ¿Está corriendo la API?');
    }

    if (respuesta.status === 204) return null;

    let cuerpo = null;
    const texto = await respuesta.text();
    if (texto) {
      try { cuerpo = JSON.parse(texto); } catch { cuerpo = null; }
    }

    if (!respuesta.ok) {
      const mensaje = cuerpo?.mensaje || `Error ${respuesta.status} al comunicarse con la API.`;
      throw new ErrorApi(mensaje, respuesta.status, cuerpo?.errores || null);
    }

    return cuerpo;
  }

  /** Convierte un objeto de filtros en query string, salteando lo vacío. */
  function aQueryString(filtros) {
    const params = new URLSearchParams();

    Object.entries(filtros).forEach(([clave, valor]) => {
      if (valor === '' || valor === null || valor === undefined) return;
      params.append(clave, valor);
    });

    const qs = params.toString();
    return qs ? `?${qs}` : '';
  }

  return {
    listarVehiculos: (filtros) => pedir(`/vehiculos${aQueryString(filtros)}`),
    obtenerVehiculo: (id) => pedir(`/vehiculos/${id}`),
    crearVehiculo: (datos) => pedir('/vehiculos', { method: 'POST', body: JSON.stringify(datos) }),
    actualizarVehiculo: (id, datos) => pedir(`/vehiculos/${id}`, { method: 'PUT', body: JSON.stringify(datos) }),
    cambiarEstadoVenta: (id, vendido) =>
      pedir(`/vehiculos/${id}/estado-venta`, { method: 'PATCH', body: JSON.stringify({ vendido }) }),
    eliminarVehiculo: (id) => pedir(`/vehiculos/${id}`, { method: 'DELETE' }),
    listarMarcas: () => pedir('/marcas')
  };
})();

/** Error de API con el detalle de validación que devuelve el backend. */
class ErrorApi extends Error {
  constructor(mensaje, estado = 0, errores = null) {
    super(mensaje);
    this.name = 'ErrorApi';
    this.estado = estado;
    this.errores = errores;
  }
}

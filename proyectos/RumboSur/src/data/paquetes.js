// Catálogo de Rumbo Sur. Las fotografías son imágenes generadas para el sitio y
// se adjuntan por id para que el resto de la app sólo tenga que leer `paquete.imagen`.
import crudo from "./paquetes.json";

export const IMAGENES = {
  florianopolis: `${import.meta.env.BASE_URL}imagenes/florianopolis.jpg`,
  bariloche: `${import.meta.env.BASE_URL}imagenes/bariloche.jpg`,
  "machu-picchu": `${import.meta.env.BASE_URL}imagenes/machu-picchu.jpg`,
  cartagena: `${import.meta.env.BASE_URL}imagenes/cartagena.jpg`,
  "madrid-barcelona": `${import.meta.env.BASE_URL}imagenes/madrid-barcelona.jpg`,
  "punta-cana": `${import.meta.env.BASE_URL}imagenes/punta-cana.jpg`,
  "salta-jujuy": `${import.meta.env.BASE_URL}imagenes/salta-jujuy.jpg`,
  "nueva-york": `${import.meta.env.BASE_URL}imagenes/nueva-york.jpg`,
  "torres-del-paine": `${import.meta.env.BASE_URL}imagenes/torres-del-paine.jpg`,
  "roma-florencia": `${import.meta.env.BASE_URL}imagenes/roma-florencia.jpg`,
  "valle-nevado": `${import.meta.env.BASE_URL}imagenes/valle-nevado.jpg`,
  "colonia-carmelo": `${import.meta.env.BASE_URL}imagenes/colonia-carmelo.jpg`,
};

const paquetes = crudo.map((paquete) => ({
  ...paquete,
  imagen: IMAGENES[paquete.id],
}));

export default paquetes;
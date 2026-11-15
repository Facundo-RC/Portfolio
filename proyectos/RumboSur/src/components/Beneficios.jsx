import Reveal from "@/components/Reveal";

const ITEMS = [
  {
    n: "01",
    titulo: "Todo en un paquete",
    texto: "Aéreos, alojamiento, traslados y asistencia al viajero en un solo precio.",
  },
  {
    n: "02",
    titulo: "Cotización al instante",
    texto: "Elegí fecha, viajeros y habitación: el total se calcula en el momento, sin esperas.",
  },
  {
    n: "03",
    titulo: "Precios en dólares",
    texto: "Todos los precios son finales, por persona y en dólares, sin sorpresas al reservar.",
  },
];

export default function Beneficios() {
  return (
    <div className="beneficios__grilla">
      {ITEMS.map((item, i) => (
        <Reveal key={item.n} className="beneficios__item" retraso={i * 90}>
          <p className="beneficios__n">{item.n}</p>
          <h3 className="beneficios__titulo">{item.titulo}</h3>
          <p className="beneficios__texto">{item.texto}</p>
        </Reveal>
      ))}
    </div>
  );
}
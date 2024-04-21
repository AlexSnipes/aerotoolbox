import { altitudeAtom } from '@/store';
import { useAtom } from 'jotai/index';
import ISA from '@/lib/isa';

export default function Explanation() {
  const [altitude] = useAtom(altitudeAtom);
  let isa: ISA = new ISA(altitude);
  return (
    <div className="card text-sm ">
      <p>
        La atmósfera estándar internacional (ISA) es un modelo atmosférico que describe cómo cambian las propiedades de
        la atmósfera con la altitud. La ISA se basa en un conjunto de valores estándar de temperatura, presión y
        densidad del aire a diferentes altitudes.
      </p>
      <p>
        La altitud ingresada es de {isa.getAltitude().toFeet().toFixed(2)} pies que equivale a{' '}
        {isa.getAltitude().toMeters().toFixed(2)} metros. Como la temperatura disminuye a una tasa de{' '}
        {isa.temperatureGradient}°C por cada 1000 metros o 1.98°C por cada 1000 pies, hasta la tropopausa que se
        mantiene constante en -56.6°C. Por lo tanto la temperatura del aire a {isa.getAltitude().toFeet().toFixed(2)}{' '}
        pies se obtendrá de la siguiente manera:
        <div className="text-center text-sm font-bold my-2">
          t = T<sub>0</sub> + (a * h)/1000
        </div>
      </p>
      <p>
        <ul>
          <li>t = Temperatura del aire a {altitude.toFixed(2)} pies</li>
          <li>
            T<sub>0</sub> = Temperatura estándar al nivel del mar ({isa.standardTemperature}°C)
          </li>
          <li>a = Gradiente térmico</li>
          <li>h = Altitud en metros</li>
        </ul>
      </p>
      <div className="text-center text-sm font-bold my-2">
        t = 15 + (-6.5 * {isa.getAltitude().toMeters().toFixed(2)})/1000 = {isa.calculateTemperature().toCelsius()}°C
      </div>
    </div>
  );
}

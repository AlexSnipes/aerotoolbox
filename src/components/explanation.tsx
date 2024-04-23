import { altitudeAtom } from '@/store';
import { useAtom } from 'jotai/index';
import ISA from '@/lib/isa';
import { useEffect, useState } from 'react';

const isa = new ISA(0);
export default function Explanation() {
  const [altitude] = useAtom(altitudeAtom);
  isa.setAltitude(altitude);
  useEffect(() => {}, [altitude]);

  return (
    <div className="card text-sm ">
      <p>
        La atmósfera estándar internacional (ISA) es un modelo atmosférico que describe cómo cambian las propiedades de
        la atmósfera con la altitud. La ISA se basa en un conjunto de valores estándar de temperatura, presión y
        densidad del aire a diferentes altitudes.
      </p>
      <p>
        La altitud ingresada es de {isa.getAltitude().toFeet()} pies que equivale a{' '}
        {isa.getAltitude().toMeters().toFixed(2)} metros. Dentro de la tropósfera, la temperatura disminuye a una tasa
        de {isa.temperatureGradient}°C cada 1000 metros o 1.98°C por cada 1000 pies. Por lo tanto la temperatura del
        aire a {isa.getAltitude().toFeet()} pies se obtendrá de la siguiente manera:
      </p>
      <div className="text-center text-sm font-bold my-2">
        t = T<sub>0</sub> + (a * h)/1000
      </div>
      <ul>
        <li>t = Temperatura del aire a {isa.getAltitude().toFeet().toFixed(2)} pies</li>
        <li>
          T<sub>0</sub> = Temperatura estándar al nivel del mar ({isa.standardTemperature}°C)
        </li>
        <li>a = Gradiente térmico</li>
        <li>h = Altitud en metros</li>
      </ul>
      <div className="text-center text-sm font-bold my-2">
        t = 15 + (-6.5 * {isa.getAltitude().toMeters().toFixed(2)})/1000 = {isa.calculateTemperature().toCelsius()}°C
      </div>
      <p>Para calcular la presión se utliza la siguiente fórmula:</p>
      <div className="text-center text-sm font-bold my-2">
        p = P<sub>0</sub> * (1 + (a * h)/T<sub>0</sub>)<sup>-g/(a * R)</sup>
      </div>
      <div>
        Donde:
        <ul>
          <li>
            P<sub>0</sub> = Presión estándar al nivel del mar ({isa.standardPressure} hPa)
          </li>
          <li>a = Gradiente térmico</li>
          <li>h = Altitud en metros</li>
          <li>g = Aceleración de la gravedad (9.80665 m/s²)</li>
          <li>R = Constante de los gases (287.05 J/(kg·K))</li>
        </ul>
      </div>
    </div>
  );
}

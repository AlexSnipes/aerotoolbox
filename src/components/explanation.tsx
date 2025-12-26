import { altitudeAtom } from '@/store';
import { useAtom } from 'jotai/index';
import ISA from '@/lib/isa';
import { useEffect, useState } from 'react';
import Tabs from '@/components/tabs';
import {
  SSL_PRESSURE_MB,
  SSL_TEMPERATURE_CELSIUS,
  TEMPERATURE_GRADIENT_C_PER_1000M,
  KELVIN_ZERO_IN_CELSIUS,
  SSL_PRESSURE_PASCALS
} from '@/lib/constants';

const isa = new ISA(0);
export default function Explanation() {
  const [active, setActive] = useState('temperature');

  const [altitude] = useAtom(altitudeAtom);
  isa.setAltitude(altitude);
  useEffect(() => { }, [altitude]);
  const tabs = [
    {
      label: 'Temperatura',
      key: 'temperature',
    },
    {
      label: 'Presión y densidad',
      key: 'pressure',
    },
    {
      label: 'Velocidad del sonido',
      key: 'speed-of-sound',
    },
  ];

  return (
    <div className="relative bg-white dark:bg-gray-700 md:mx-0 shadow rounded-3xl dark:text-white text-sm">
      <Tabs setActive={setActive} tabs={tabs} active={active}>
        <div className="px-4 py-2">
          <p>
            Esta calculadora de atmósfera estándar se basa en el modelo de 1976 de la Atmósfera Estándar Internacional
            (ISA) que ayuda a entender los calculos en la asignatura "Conocimientos Aeronáuticos y Espaciales 1" de la
            carrera Ingeniería Aeroespacial.
          </p>
          <div id="temperature" className={active === 'temperature' ? 'block' : 'hidden'}>
            <p>
              La altitud ingresada es de {isa.getAltitude().toFeet()} pies que equivale a{' '}
              {isa.getAltitude().toMeters().toFixed(2)} metros. Dentro de la tropósfera, la temperatura disminuye a una
              tasa de {TEMPERATURE_GRADIENT_C_PER_1000M}°C cada 1000 metros o 1.98°C por cada 1000 pies. Por lo tanto la
              temperatura del aire a {isa.getAltitude().toFeet()} pies se obtendrá de la siguiente manera:
            </p>
            <div className="text-center text-sm font-bold my-2">
              t = T<sub>0</sub> + (a * h)/1000
            </div>
            <ul>
              <li>t = Temperatura del aire a {isa.getAltitude().toFeet().toFixed(2)} pies</li>
              <li>
                T<sub>0</sub> = Temperatura estándar al nivel del mar ({SSL_TEMPERATURE_CELSIUS}°C)
              </li>
              <li>a = Gradiente térmico</li>
              <li>h = Altitud en metros</li>
            </ul>
            <div className="text-center text-sm font-bold my-2">
              t = 15 + (-6.5 * {isa.getAltitude().toMeters().toFixed(2)})/1000 ={' '}
              {isa.calculateTemperature().toCelsius()}
              °C
            </div>
            <p>
              La temperatura relativa (θ) se obtiene dividiendo la temperatura del aire en grados Kelvin sobre la
              temperatura estándar
            </p>
            <div className="text-center text-sm font-bold my-2">
              <p>
                θ = t + 273.15 / T<sub>0</sub> + 273.15
              </p>
              <p>
                θ = {isa.calculateTemperature().toKelvin().toFixed(2)} K° / {SSL_TEMPERATURE_CELSIUS + KELVIN_ZERO_IN_CELSIUS} K° =
                {isa.calculateTemperatureRatio()}
              </p>
            </div>
          </div>
          <div id="pressure" className={active === 'pressure' ? 'block' : 'hidden'}>
            <p>Para calcular la presión (p) se utliza la siguiente fórmula:</p>
            <div className="text-center text-sm font-bold my-2">
              p = P<sub>0</sub> * (1 + (-a * h)/T<sub>0</sub>)<sup>g*M/a * R</sup>
            </div>
            <div className="text-center text-sm font-bold my-2">
              p = P<sub>0</sub> * (θ)<sup>g*M/a * R</sup>
            </div>
            <div>
              Donde:
              <ul>
                <li>
                  P<sub>0</sub> = Presión estándar al nivel del mar ({SSL_PRESSURE_MB} hPa)
                </li>
                <li>a = Gradiente térmico</li>
                <li>h = Altitud en metros</li>
                <li>g = Aceleración de la gravedad (9.80665 m/s²)</li>
                <li>R = Constante de los gases (287.05 J/(kg·K))</li>
                <li>M = Masa molar del aire (0.0289644 kg/mol)</li>
              </ul>
            </div>
            <div className="text-center text-sm font-bold my-2">
              p = {SSL_PRESSURE_MB} * ({isa.calculateTemperatureRatio(12)})<sup>5.255781292873008</sup>
            </div>
            <p>
              En base a la presión calculada se puede obtener la presión relativa (δ) utilizando la siguiente fórmula:
            </p>
            <div className="text-center text-sm font-bold my-2">
              δ = p / P<sub>0</sub>
            </div>
            <p>Utilizando la presión relativa (δ) se puede calcular la densidad del aire (ρ):</p>
            <div className="text-center text-sm font-bold my-2">
              ρ = ρ<sub>0</sub> + δ * T<sub>0</sub> / θ
            </div>
          </div>
          <div id="speed-of-sound" className={active === 'speed-of-sound' ? 'block' : 'hidden'}>
            <p> Finalmente, la velocidad del sonido (c) se puede calcular utilizando la siguiente fórmula:</p>
            <div className="text-center text-sm font-bold my-2">c = √(γ * R * t)</div>
            <div>
              Donde:
              <ul>
                <li>γ = Coeficiente adiabático (1.4)</li>
                <li>R = Constante de los gases (287.05 J/(kg·K))</li>
                <li>t = Temperatura en Kelvin</li>
              </ul>
            </div>
            <div className="text-center text-sm font-bold my-2">
              c = √(1.4 * 287.05 * {isa.calculateTemperature().toKelvin().toFixed(2)}) ={' '}
              {isa.calculateSpeedOfSound().toMs()} m/s
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

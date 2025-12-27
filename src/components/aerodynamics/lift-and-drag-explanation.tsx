import {
  altitudeAtom,
  cdAtom,
  chordAtom,
  clAtom,
  densityAtom,
  velocityAtom,
  wingAreaAtom,
  wingspanAtom,
} from '@/store';
import { useAtom } from 'jotai/index';
import ISA from '@/lib/isa';
import { useEffect, useState } from 'react';
import Tabs from '@/components/tabs';

const isa = new ISA(0);
export default function LiftAndDragExplanation() {
  const [lift, setLift] = useState<number>(0);
  const [drag, setDrag] = useState<number>(0);
  const [altitude] = useAtom(altitudeAtom);
  const [velocity] = useAtom(velocityAtom);
  const [cl] = useAtom(clAtom);
  const [cd] = useAtom(cdAtom);
  const [wingspan] = useAtom(wingspanAtom);
  const [wingArea, setWingArea] = useAtom(wingAreaAtom);
  const [density] = useAtom(densityAtom);
  const [chord] = useAtom(chordAtom);
  isa.setAltitude(altitude);

  useEffect(() => {
    if (!wingArea && chord && wingspan) {
      setWingArea(chord * wingspan);
    }
    const safeCl = cl || 0;
    const safeCd = cd || 0;
    const safeWingArea = wingArea || 0;
    const safeDensity = density || 0;
    const safeVelocity = velocity || 0;

    setLift(safeCl * safeWingArea * 0.5 * safeDensity * Math.pow(safeVelocity, 2));
    setDrag(safeCd * safeWingArea * 0.5 * safeDensity * Math.pow(safeVelocity, 2));
  }, [velocity, cl, cd, wingArea, density, chord, wingspan]);

  return (
    <div className="relative bg-white dark:bg-gray-700 md:mx-0 shadow rounded-3xl dark:text-white text-sm">
      <div className="px-4 py-2">
        <div>
          <p>
            Ahusamiento (λ) = c<sub>p</sub>/c<sub>r</sub>
          </p>
          <p>
            c<sub>p</sub> = cuerda del perfil al medio del ala (cuerda raíz)
          </p>
          <p>
            c<sub>r</sub> = cuerda del perfil en la punta del ala (cuerda puntera)
          </p>
        </div>
        <div>
          <h3>Sustentación</h3>
          <div className="text-center text-sm font-bold my-2">
            L = CL * S * 1/2 * ρ * v<sup>2</sup>
          </div>
          <div>
            <ul>
              <li>CL = Coeficiente de sustentación</li>
              <li>S = Superficie Alar</li>
              <li>ρ = Densidad de altitud</li>
              <li>v = Velocidad del avión</li>
            </ul>
          </div>
          <div className="text-center text-sm font-bold my-2">
            L = {cl} * {wingArea} m<sup>2</sup> * 1/2 * {density} kg*s<sup>2</sup>/m<sup>4</sup> * {velocity} m/s
            <sup>2</sup>
          </div>
          <div className="text-center text-sm font-bold my-2">L = {lift.toFixed(2)} kgf</div>
        </div>
        <div>
          <h3>Resistencia</h3>
          <div className="text-center text-sm font-bold my-2">
            L = Cd * S * 1/2 * ρ * v<sup>2</sup>
          </div>
          <div>
            <ul>
              <li>CD = Coeficiente de resistencia</li>
              <li>S = Superficie Alar</li>
              <li>ρ = Densidad de altitud</li>
              <li>v = Velocidad del avión</li>
            </ul>
          </div>
          <div className="text-center text-sm font-bold my-2">
            D = {cd} * {wingArea} m<sup>2</sup> * 1/2 * {density} kg*s<sup>2</sup>/m<sup>4</sup> * {velocity} m/s
            <sup>2</sup>
          </div>
          <div className="text-center text-sm font-bold my-2">L = {drag.toFixed(2)} kgf</div>
        </div>
      </div>
    </div>
  );
}

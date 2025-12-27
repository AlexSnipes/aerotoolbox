import ISA from '@/lib/isa';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Tooltip from '@/components/tooltip';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { useAtom } from 'jotai/index';
import { cdAtom, chordAtom, clAtom, densityAtom, velocityAtom, wingAreaAtom, wingspanAtom } from '@/store';

export default function LiftAndDrag({ active }: { active: string }) {
  let isa: ISA = new ISA(0);
  const [altitude, setAltitude] = useState<number>();
  const [velocity, setVelocity] = useAtom<number>(velocityAtom);
  const [density, setDensity] = useAtom<number>(densityAtom);
  const [wingspan, setWingspan] = useAtom<number>(wingspanAtom);
  const [wingArea, setWingArea] = useAtom<number>(wingAreaAtom);
  const [cd, setCd] = useAtom<number>(cdAtom);
  const [cl, setCl] = useAtom<number>(clAtom);
  const [chord, setChord] = useAtom<number>(chordAtom);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();
  const handleChangeAltitudeUnit = (event: { target: { value: any } }) => {
    const value = event.target.value;
    const altitude = watch('altitude');
    if (value === 'meters') {
      setValue('altitude', altitude * 0.3048);
    } else {
      setValue('altitude', altitude / 0.3048);
    }
  };

  const handleDensity = (event: { target: { value: any } }) => {
    const value = event.target.value;
    const density = watch('density');
    isa.setAltitude(watch('altitudeUnit') === 'meters' ? watch('altitude') / 0.3048 : watch('altitude'));
    if (value === 'kg/m3') {
      setValue('density', isa.calculateDensity().toKgM3());
    } else if (value === 'kgf-s2/m4') {
      setValue('density', isa.calculateDensity().toKgfS2M4());
    }
  };
  const handleInputChange = async (event: { target: { name: any } }) => {
    const fieldName = event.target.name;
    const isValid = await trigger(fieldName);
    if (isValid) {
      console.log(`El campo ${fieldName} es válido`);
    } else {
      console.log(`El campo ${fieldName} tiene errores`);
    }
  };

  useEffect(() => {
    isa.setAltitude(watch('altitudeUnit') === 'meters' ? watch('altitude') / 0.3048 : watch('altitude'));
    setAltitude(watch('altitudeUnit') === 'meters' ? watch('altitude') / 0.3048 : watch('altitude'));

    if (watch('densityUnit') === 'kg/m3') {
      setValue('density', isa.calculateDensity().toKgM3());
    } else if (watch('densityUnit') === 'kgf-s2/m4') {
      setValue('density', isa.calculateDensity().toKgfS2M4());
    }
  }, [watch('altitude'), watch('altitudeUnit')]);

  useEffect(() => {
    setVelocity(watch('velocity'));
    setCl(watch('cl'));
    setCd(watch('cd'));
    setDensity(watch('density'));
    setWingArea(watch('wingArea'));
    setWingspan(watch('wingspan'));
    setChord(watch('chord'));
  }, [
    watch('velocity'),
    watch('cl'),
    watch('cd'),
    watch('density'),
    watch('wingArea'),
    watch('wingspan'),
    watch('chord'),
  ]);

  return (
    <div className={active === 'lift-drag' ? 'block' : 'hidden'}>
      <h2>Sustentación y Resistencia</h2>
      <form>
        <div className="mb-6">
          <label htmlFor="name">Altitud</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              id="altitude"
              max={36000}
              {...register('altitude', {
                required: true,
                max: 36000,
                onChange: handleInputChange,
                validate: (value) => {
                  return value <= 36000;
                },
              })}
            />
            <select {...register('altitudeUnit', { required: false, onChange: handleChangeAltitudeUnit })}>
              <option value="feet">Feets</option>
              <option value="meters">Metros</option>
            </select>
          </div>
          <p className="helper">
            Para calcular los valores dentro de la tropósfera, se debe ingresar la altitud entre 0 y 36089 pies.
          </p>
        </div>
        <div className="mb-6">
          <label htmlFor="density">Densidad</label>
          <div className="flex items-center space-x-4">
            <input readOnly id="density" {...register('density', { required: false })} />
            <select {...register('densityUnit', { required: false, onChange: handleDensity })}>
              <option value="kgf-s2/m4">kgf-s2/m4</option>
              <option value="kg/m3">kg/m3</option>
            </select>
          </div>
          <p className="helper">
            La densidad del aire disminuye con la altitud. La densidad del aire a nivel del mar es de 1.225 kg/m3.
          </p>
        </div>
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-1/5">
              <span className="flex">
                <label htmlFor="wingArea" className="mr-1">
                  Superficie Alar (S)
                </label>
                <Tooltip text="La relación entre la cuerda y la envergadura">
                  <FaRegQuestionCircle className="text-gray-500 " />
                </Tooltip>
              </span>
              <input id="wingArea" {...register('wingArea', { required: false })} />
            </div>
            <div className="w-1/5">
              <span className="flex">
                <label htmlFor="chord" className="mr-1">
                  Cuerda de raiz (c)
                </label>
                <Tooltip text="La longitud de la cuerda del perfil alar en el centro del fuselaje.">
                  <FaRegQuestionCircle className="text-gray-500 " />
                </Tooltip>
              </span>
              <input id="chord" {...register('chord', { required: false })} />
            </div>
            <div className="w-1/5">
              <span className="flex">
                <label htmlFor="wingspan" className="mr-1">
                  Envergadura (b)
                </label>
                <Tooltip text="La distancia total de punta a punta de las alas.">
                  <FaRegQuestionCircle className="text-gray-500 " />
                </Tooltip>
              </span>
              <input id="wingspan" {...register('wingspan', { required: false })} />
            </div>
            <div className="w-1/5">
              <span className="flex">
                <label htmlFor="taper" className="mr-1">
                  Ahusamiento (λ)
                </label>
                <Tooltip text="Es la relación entre la cuerda puntera y la cuerda raíz.">
                  <FaRegQuestionCircle className="text-gray-500 " />
                </Tooltip>
              </span>
              <input id="taper" {...register('taper', { required: false })} />
            </div>
            <div className="w-1/5">
              <span className="flex">
                <label htmlFor="aspect-ratio" className="mr-1">
                  Alargamiento (A)
                </label>
                <Tooltip
                  text="Es la relación entre la envergadura y la cuerda media geométrica (cuantas veces
entra la cuerda en la envergadura)"
                >
                  <FaRegQuestionCircle className="text-gray-500 " />
                </Tooltip>
              </span>
              <input id="aspect-ratio" {...register('aspect-ratio', { required: false })} />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="density">Ángulo de ataque</label>
          <div className="flex items-center space-x-4">
            <input id="aoa" {...register('aoa', { required: false })} />
          </div>
          <p className="helper"></p>
        </div>
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-1/4">
              <span className="flex">
                <label htmlFor="temperature" className="mr-1">
                  CL
                </label>
                <Tooltip text="Coeficiente de sustentación: Relaciona la sustentación con la densidad, velocidad y área.">
                  <FaRegQuestionCircle className="text-gray-500 " />
                </Tooltip>
              </span>
              <input id="cl" {...register('cl', { required: false })} />
            </div>
            <div className="w-1/4">
              <span className="flex">
                <label htmlFor="temperature" className="mr-1">
                  CD
                </label>
                <Tooltip text="Coeficiente de resistencia: Cuantifica la resistencia al avance en el aire.">
                  <FaRegQuestionCircle className="text-gray-500 " />
                </Tooltip>
              </span>
              <input id="cd" {...register('cd', { required: false })} />
            </div>
            <div className="w-1/4">
              <span className="flex">
                <label htmlFor="temperature" className="mr-1">
                  Cdi
                </label>
                <Tooltip text="Coeficiente de resistencia inducida: Resistencia generada como subproducto de la sustentación.">
                  <FaRegQuestionCircle className="text-gray-500 " />
                </Tooltip>
              </span>
              <input readOnly id="cdi" {...register('cdi', { required: false })} />
            </div>
            <div className="w-1/4">
              <span className="flex">
                <label htmlFor="temperature" className="mr-1">
                  Cdp
                </label>
                <Tooltip text="Coeficiente de resistencia parásita: Resistencia debida a la forma y fricción (no sustentación).">
                  <FaRegQuestionCircle className="text-gray-500 " />
                </Tooltip>
              </span>
              <input readOnly id="cdp" {...register('cdp', { required: false })} />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="velocity">Velocidad</label>
          <div className="flex items-center space-x-4">
            <input id="velocity" {...register('velocity', { required: false })} />
            <select {...register('velocityUnit', { required: false })}>
              <option value="m/s">m/s</option>
            </select>
          </div>
          <p className="helper"></p>
        </div>
      </form>
    </div>
  );
}

'use client';
import { useForm } from 'react-hook-form';
import ISA from '@/lib/isa';
import { useEffect } from 'react';
import Tooltip from '@/components/tooltip';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { useAtom } from 'jotai/index';
import { altitudeAtom } from '@/store';

export default function Toolbox({ params }: { params: { id: string } }) {
  let isa: ISA = new ISA(0);
  const [altitude, setAltitude] = useAtom<number>(altitudeAtom);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const changeValue = (data: any) => {
    const { altitude, temperature, sslCertificate, sslPrivateKey } = data;
    const isa = new ISA(altitude);
    setValue('temperature', isa.calculateTemperature().toCelsius());
  };

  useEffect(() => {
    isa.setAltitude(watch('altitudeUnit') === 'meters' ? watch('altitude') / 0.3048 : watch('altitude'));
    setAltitude(watch('altitudeUnit') === 'meters' ? watch('altitude') / 0.3048 : watch('altitude'));
    if (watch('temperatureUnit') === 'kelvin') {
      setValue('temperature', isa.calculateTemperature().toKelvin());
    } else if (watch('temperatureUnit') === 'celsius') {
      setValue('temperature', isa.calculateTemperature().toCelsius());
    }
    if (watch('pressureUnit') === 'inHg') {
      setValue('pressure', isa.calculatePressure().toInHg());
    } else if (watch('pressureUnit') === 'mb') {
      setValue('pressure', isa.calculatePressure().toMb());
    }
    setValue('sigma', isa.calculateDensity().toSigma());
    setValue('delta', isa.calculatePressureRatio());
    setValue('theta', isa.calculateTemperatureRatio());
    if (watch('densityUnit') === 'kg/m3') {
      setValue('density', isa.calculateDensity().toKgM3());
    } else if (watch('densityUnit') === 'kgf-s2/m4') {
      setValue('density', isa.calculateDensity().toKgfS2M4());
    }
    if (watch('speedOfSoundUnit') === 'm/s') {
      setValue('speedOfSound', isa.calculateSpeedOfSound().toMs());
    } else if (watch('speedOfSoundUnit') === 'knots') {
      setValue('speedOfSound', isa.calculateSpeedOfSound().toKnots());
    }
  }, [watch('altitude'), watch('altitudeUnit')]);

  const handleInputChange = async (event: { target: { name: any } }) => {
    const fieldName = event.target.name;
    const isValid = await trigger(fieldName);
    if (isValid) {
      console.log(`El campo ${fieldName} es válido`);
    } else {
      console.log(`El campo ${fieldName} tiene errores`);
    }
  };

  const handleChangeAltitudeUnit = (event: { target: { value: any } }) => {
    const value = event.target.value;
    const altitude = watch('altitude');
    if (value === 'meters') {
      setValue('altitude', altitude * 0.3048);
    } else {
      setValue('altitude', altitude / 0.3048);
    }
  };

  const handleChangeTemperatureUnit = (event: { target: { value: any } }) => {
    const value = event.target.value;
    const temperature = watch('temperature');
    isa.setAltitude(watch('altitudeUnit') === 'meters' ? watch('altitude') / 0.3048 : watch('altitude'));
    if (value === 'kelvin') {
      setValue('temperature', isa.calculateTemperature().toKelvin());
    } else {
      setValue('temperature', isa.calculateTemperature().toCelsius());
    }
  };

  const handlePressureUnit = (event: { target: { value: any } }) => {
    const value = event.target.value;
    isa.setAltitude(watch('altitudeUnit') === 'meters' ? watch('altitude') / 0.3048 : watch('altitude'));
    const pressure = watch('pressure');
    if (value === 'inHg') {
      setValue('pressure', isa.calculatePressure().toInHg());
    } else if (value === 'mb') {
      setValue('pressure', isa.calculatePressure().toMb());
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

  const handleSpeedOfSoundUnit = (event: { target: { value: any } }) => {
    const value = event.target.value;
    const speedOfSound = watch('speedOfSound');
    isa.setAltitude(watch('altitudeUnit') === 'meters' ? watch('altitude') / 0.3048 : watch('altitude'));
    if (value === 'm/s') {
      setValue('speedOfSound', isa.calculateSpeedOfSound().toMs());
    } else if (value === 'knots') {
      setValue('speedOfSound', isa.calculateSpeedOfSound().toKnots());
    }
  };

  return (
    <div className="card ">
      <div className="flex items-center space-x-5 mb-6">
        <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
          i
        </div>
        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
          <h2 className="leading-relaxed">Calculadora de atmósfera estándar</h2>
          <p className="text-sm text-gray-500 dark:text-gray-200 font-normal leading-relaxed hidden sm:block">
            La atmósfera estándar internacional (ISA) es un modelo atmosférico que describe cómo cambian las propiedades
            de la atmósfera con la altitud.
          </p>
        </div>
      </div>
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
              <option value="feet">Pies</option>
              <option value="meters">Metros</option>
            </select>
          </div>
          <p className="helper">
            Para calcular los valores dentro de la tropósfera, se debe ingresar la altitud entre 0 y 36089 pies.
          </p>
        </div>
        <div className="mb-6">
          <label htmlFor="temperature">Temperature</label>
          <div className="flex items-center space-x-4">
            <input readOnly id="temperature" {...register('temperature', { required: false })} />
            <select {...register('temperatureUnit', { required: false, onChange: handleChangeTemperatureUnit })}>
              <option value="celsius">Celsius</option>
              <option value="kelvin">Kelvin</option>
            </select>
          </div>
          <p className="helper">
            La temperatura disminuye con la altitud. La temperatura a nivel del mar es de 15°C (288.15 K).
          </p>
        </div>
        <div className="mb-6">
          <label htmlFor="pressure">Pressure</label>
          <div className="flex items-center space-x-4">
            <input readOnly id="pressure" {...register('pressure', { required: false })} />
            <select {...register('pressureUnit', { required: false, onChange: handlePressureUnit })}>
              <option value="mb">mb</option>
              <option value="inHg">inHg</option>
            </select>
          </div>
          <p className="helper">
            La presión del aire disminuye con la altitud. La presión del aire a nivel del mar es de 1013.25 mb.
          </p>
        </div>
        <div className="mb-6">
          <label htmlFor="density">Density</label>
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
            <div className="w-1/3">
              <span className="flex">
                <label htmlFor="temperature" className="mr-1">
                  Densidad relativa (σ)
                </label>
                <Tooltip text="La relación entre la densidad del aire en una altitud dada y la densidad del aire a nivel del mar.">
                  <FaRegQuestionCircle className="text-gray-500 " />
                </Tooltip>
              </span>
              <input readOnly id="sigma" {...register('sigma', { required: false })} />
            </div>
            <div className="w-1/3">
              <span className="flex">
                <label htmlFor="temperature" className="mr-1">
                  Presión relativa (δ)
                </label>
                <Tooltip text="La relación entre la presión del aire en una altitud dada y la presión del aire a nivel del mar.">
                  <FaRegQuestionCircle className="text-gray-500 " />
                </Tooltip>
              </span>
              <input readOnly id="delta" {...register('delta', { required: false })} />
            </div>
            <div className="w-1/3">
              <span className="flex">
                <label htmlFor="temperature" className="mr-1">
                  Temp. relativa (θ)
                </label>
                <Tooltip text="La relación entre la temperatura del aire en una altitud dada y la temperatura del aire a nivel del mar.">
                  <FaRegQuestionCircle className="text-gray-500 " />
                </Tooltip>
              </span>
              <input readOnly id="ro" {...register('theta', { required: false })} />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="speed-of-sound">Velocidad del sonido</label>
          <div className="flex items-center space-x-4">
            <input readOnly id="speed-of-sound" {...register('speedOfSound', { required: false })} />
            <select {...register('speedOfSoundUnit', { required: false, onChange: handleSpeedOfSoundUnit })}>
              <option value="m/s">m/s</option>
              <option value="knots">knots</option>
            </select>
          </div>
          <p className="helper">La velocidad del sonido a nivel del mar es de 340.29 m/s.</p>
        </div>
      </form>
    </div>
  );
}

import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import ISA from '@/lib/isa';
import { FEET_TO_METERS } from '@/lib/constants';

export const useISACalculator = (form: UseFormReturn, setAltitudeAtom: (val: number) => void) => {
    const { watch, setValue } = form;

    useEffect(() => {
        const altitude = watch('altitude');
        const altitudeUnit = watch('altitudeUnit');

        // Safety check for NaN or undefined
        if (altitude === undefined || altitude === null || isNaN(altitude)) return;

        // ISA calculation always expects feet.
        // If unit is meters, convert to feet for the ISA class.
        const altitudeInFeet = altitudeUnit === 'meters'
            ? altitude * Math.pow(FEET_TO_METERS, -1) // Meters -> Feet
            : altitude;

        const isa = new ISA(altitudeInFeet);

        // Sync atom
        setAltitudeAtom(altitudeInFeet);

        // Update Temperature
        if (watch('temperatureUnit') === 'kelvin') {
            setValue('temperature', isa.calculateTemperature().toKelvin());
        } else {
            // Default to celsius
            setValue('temperature', isa.calculateTemperature().toCelsius());
        }

        // Update Pressure
        if (watch('pressureUnit') === 'inHg') {
            setValue('pressure', isa.calculatePressure().toInHg());
        } else {
            // Default to mb
            setValue('pressure', isa.calculatePressure().toMb());
        }

        // Update Derived values
        setValue('sigma', isa.calculateDensity().toSigma());
        setValue('delta', isa.calculatePressureRatio());
        setValue('theta', isa.calculateTemperatureRatio());

        // Update Density
        if (watch('densityUnit') === 'kg/m3') {
            setValue('density', isa.calculateDensity().toKgM3());
        } else {
            // Default to kgf-s2/m4
            setValue('density', isa.calculateDensity().toKgfS2M4());
        }

        // Update Speed of Sound
        if (watch('speedOfSoundUnit') === 'm/s') {
            setValue('speedOfSound', isa.calculateSpeedOfSound().toMs());
        } else {
            // Default to knots
            setValue('speedOfSound', isa.calculateSpeedOfSound().toKnots());
        }

    }, [
        watch('altitude'),
        watch('altitudeUnit'),
        watch('temperatureUnit'),
        watch('pressureUnit'),
        watch('densityUnit'),
        watch('speedOfSoundUnit')
    ]);
};

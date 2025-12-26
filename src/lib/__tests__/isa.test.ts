import ISA from '../isa';

describe('ISA Class', () => {
    // Standard Atmosphere at Sea Level (0 ft)
    // Temp: 15 C
    // Pressure: 1013.25 mb
    // Density: 1.225 kg/m3 (approx)

    it('should calculate sea level properties correctly', () => {
        const isa = new ISA(0);

        const temp = isa.calculateTemperature();
        expect(temp.toCelsius()).toBe(15);
        expect(temp.toKelvin()).toBe(288.15);

        const press = isa.calculatePressure();
        expect(press.toMb()).toBeCloseTo(1013.25, 2);

        const dens = isa.calculateDensity();
        expect(dens.toKgM3()).toBeCloseTo(1.225, 3);
        expect(dens.toSigma()).toBeCloseTo(1.0, 3);

        expect(isa.calculatePressureRatio()).toBeCloseTo(1.0, 3);
        expect(isa.calculateTemperatureRatio()).toBeCloseTo(1.0, 3);
    });

    it('should calculate properties at 10,000 ft', () => {
        // At 10,000 ft (3048 m)
        // Temp: 15 - (6.5 * 3.048) = -4.812 C
        // Pressure and Density will decrease
        const isa = new ISA(10000);

        const temp = isa.calculateTemperature();
        // 15 - 19.812 = -4.812
        expect(temp.toCelsius()).toBeCloseTo(-4.81, 1);

        const press = isa.calculatePressure();
        // Expect roughly 696.8 mb
        expect(press.toMb()).toBeLessThan(1013.25);

        const pressRatio = isa.calculatePressureRatio();
        expect(pressRatio).toBeLessThan(1.0);
    });

    it('should update altitude using setAltitude', () => {
        const isa = new ISA(0);
        isa.setAltitude(5000);
        expect(isa.getAltitude().toFeet()).toBe(5000);

        const temp = isa.calculateTemperature();
        expect(temp.toCelsius()).toBeLessThan(15);
    });
});

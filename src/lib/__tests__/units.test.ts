import Altitude from '../altitude';
import Temperature from '../temperature';
import Pressure from '../pressure';
import { Density } from '../density';
import { SpeedOfSound } from '../speed-of-sound';

describe('Unit Classes', () => {
    describe('Altitude', () => {
        it('should convert feet to meters correctly', () => {
            // 1000 ft * 0.3048 = 304.8 m
            const alt = new Altitude(1000);
            expect(alt.toMeters()).toBeCloseTo(304.8);
        });

        it('should return feet correctly', () => {
            const alt = new Altitude(500);
            expect(alt.toFeet()).toBe(500);
        });
    });

    describe('Temperature', () => {
        // Stores Celsius
        it('should return celsius', () => {
            const temp = new Temperature(15);
            expect(temp.toCelsius()).toBe(15.00);
        });

        it('should convert to Kelvin', () => {
            // 15 C + 273.15 = 288.15 K
            const temp = new Temperature(15);
            expect(temp.toKelvin()).toBe(288.15);
        });

        it('should convert to Fahrenheit', () => {
            // (0°C × 9/5) + 32 = 32°F
            const temp = new Temperature(0);
            expect(temp.toFahrenheit()).toBe(32);
        });
    });

    describe('Pressure', () => {
        // Stores Pascals
        it('should convert Pa to mb (hPa)', () => {
            const p = new Pressure(101325);
            expect(p.toMb()).toBe(1013.25);
        });

        it('should convert Pa to inHg', () => {
            const p = new Pressure(101325);
            // 101325 Pa is approx 29.921 inHg
            expect(p.toInHg()).toBeCloseTo(29.92, 1);
        });

        it('should convert Pa to Bar', () => {
            const p = new Pressure(100000);
            expect(p.toBar()).toBeCloseTo(1.0, 3);
        });

        it('should convert Pa to Psi', () => {
            const p = new Pressure(101325);
            expect(p.toPsi()).toBeCloseTo(14.696, 2);
        });

        it('should convert Pa to Atm', () => {
            const p = new Pressure(101325);
            expect(p.toAtm()).toBeCloseTo(1.0, 3);
        });
    });

    describe('Density', () => {
        // Stores kg/m^3
        it('should return kg/m^3', () => {
            const d = new Density(1.225);
            expect(d.toKgM3()).toBe(1.225);
        });

        it('should calculate sigma (relative density)', () => {
            const d = new Density(1.225);
            expect(d.toSigma()).toBe(1.0);
        });

        it('should calculate technical units', () => {
            // Sigma 1.0 -> 0.125
            const d = new Density(1.225);
            expect(d.toKgfS2M4()).toBe(0.125);
        });
    });

    describe('SpeedOfSound', () => {
        // Stores m/s
        it('should return m/s', () => {
            const s = new SpeedOfSound(340.29);
            expect(s.toMs()).toBe(340.29);
        });

        it('should convert to knots', () => {
            const s = new SpeedOfSound(340.29);
            // 340.29 * 1.943844... approx 661.47
            expect(s.toKnots()).toBeCloseTo(661.47, 1);
        });
    });
});

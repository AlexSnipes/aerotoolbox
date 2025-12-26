/**
 * International Atmosphere Standard Class
 * @Author: Alejandro Sánchez
 * @Description: This class is used to calculate the International Atmosphere Standard
 * @Version: 0.404.18
 */
import Altitude from '@/lib/altitude';
import Temperature from '@/lib/temperature';
import Pressure from '@/lib/pressure';
import { Density } from '@/lib/density';
import { SpeedOfSound } from '@/lib/speed-of-sound';
import {
  ADIABATIC_INDEX,
  GAS_CONSTANT_AIR,
  KELVIN_ZERO_IN_CELSIUS,
  MOLAR_MASS_AIR,
  SSL_DENSITY,
  SSL_PRESSURE_MB,
  SSL_PRESSURE_PASCALS,
  SSL_TEMPERATURE_CELSIUS,
  SSL_TEMPERATURE_KELVIN,
  STANDARD_GRAVITY,
  TEMPERATURE_GRADIENT_C_PER_1000M,
  TEMPERATURE_GRADIENT_K_PER_M,
  UNIVERSAL_GAS_CONSTANT,
} from './constants';

export default class ISA {
  private altitude: Altitude;

  /**
   * @param {number} altitude - The altitude in feet
   */
  constructor(altitude: number) {
    this.altitude = new Altitude(altitude);
  }

  setAltitude(altitude: number) {
    this.altitude = new Altitude(altitude);
  }

  getAltitude() {
    return this.altitude;
  }

  /**
   * Calculate pressure ratio (δ) based on altitude
   */
  calculatePressureRatio() {
    return parseFloat((this.calculatePressure().toMb(2) / SSL_PRESSURE_MB).toFixed(4));
  }

  calculateTemperatureRatio(precision = 3) {
    return parseFloat(
      (this.calculateTemperature().toKelvin() / (SSL_TEMPERATURE_CELSIUS + KELVIN_ZERO_IN_CELSIUS)).toFixed(precision),
    );
  }
  calculateTemperature() {
    // result = 15 - (6.5 * km)
    const result = SSL_TEMPERATURE_CELSIUS - (TEMPERATURE_GRADIENT_C_PER_1000M * this.altitude.toMeters()) / 1000;
    const temperature = new Temperature(result);
    return temperature;
  }

  calculatePressure() {
    const P0 = SSL_PRESSURE_PASCALS;
    const L = TEMPERATURE_GRADIENT_K_PER_M;
    const T0 = SSL_TEMPERATURE_KELVIN;
    const M = MOLAR_MASS_AIR;
    const R = UNIVERSAL_GAS_CONSTANT;

    // Exponent = (g * M) / (R * L)
    const exponent = (STANDARD_GRAVITY * M) / (R * L);
    const pressure = P0 * Math.pow(1 - (L * this.altitude.toMeters()) / T0, exponent);
    return new Pressure(pressure);
  }

  /**
   * Calculate the density based on altitude on kg.s2/m^4
   */

  calculateDensity() {
    const temperatureSL = SSL_TEMPERATURE_CELSIUS + KELVIN_ZERO_IN_CELSIUS; // K
    const temperatureRelative = this.calculateTemperature().toKelvin();
    const density = (SSL_DENSITY * this.calculatePressureRatio() * temperatureSL) / temperatureRelative;
    return new Density(density);
  }

  calculateSpeedOfSound() {
    const temperature = this.calculateTemperature().toKelvin();
    const speedOfSound = Math.sqrt(ADIABATIC_INDEX * GAS_CONSTANT_AIR * temperature);
    return new SpeedOfSound(speedOfSound);
  }
}

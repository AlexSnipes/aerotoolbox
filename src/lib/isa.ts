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

export default class ISA {
  private altitude;
  temperatureGradient = 6.5; // Celsius/1000 meters;
  standardTemperature = 15; // Celsius;
  private standardGravity = 9.80665; // m/s^2;
  standardPressure = 1013.25; // mb;
  private densitySL = 1.225; // kg/m^3;
  private adiabaticIndex = 1.4;
  private standardGasConstant = 287.05; // J/(kg*K)
  private kelvin = 273.15;
  //private pressureGradient = 1.225; // mb/1000 meters;
  /*private standardDensity = 1.225 // kg/m^3;*/

  /**
   * @param {number} altitude - The altitude in feet
   */
  constructor(altitude: number) {
    this.altitude = new Altitude(altitude);
  }

  setAltitude(altitude: any) {
    this.altitude = new Altitude(altitude);
  }

  getAltitude() {
    return this.altitude;
  }

  /**
   * Calculate pressure ratio (δ) based on altitude
   */
  calculatePressureRatio() {
    return parseFloat((this.calculatePressure().toMb(2) / this.standardPressure).toFixed(4));
  }

  calculateTemperatureRatio() {
    return parseFloat((this.calculateTemperature().toKelvin() / (this.standardTemperature + this.kelvin)).toFixed(3));
  }
  calculateTemperature() {
    const result = this.standardTemperature - (this.temperatureGradient * this.altitude.toMeters()) / 1000;
    const temperature = new Temperature(result);
    return temperature;
  }

  calculatePressure() {
    const P0 = 101325; // Presión al nivel del mar en Pascales
    const L = 0.0065; // Gradiente de temperatura en K/m
    const T0 = 288.15; // Temperatura al nivel del mar en Kelvin
    const M = 0.0289644; // Masa molar del aire en kg/mol
    const R = 8.31447; // Constante de gas universal en J/(mol·K)

    const exponent = (this.standardGravity * M) / (R * L);
    const pressure = P0 * Math.pow(1 - (L * this.altitude.toMeters()) / T0, exponent);
    return new Pressure(pressure);
  }

  /**
   * Calculate the density based on altitude on kg.s2/m^4
   */

  calculateDensity() {
    let temperatureSL = this.standardTemperature + 273.15; // K
    const temperatureRelative = this.calculateTemperature().toKelvin();
    const density = (this.densitySL * this.calculatePressureRatio() * temperatureSL) / temperatureRelative;
    return new Density(density);
  }

  calculateSpeedOfSound() {
    const temperature = this.calculateTemperature().toKelvin();
    const speedOfSound = Math.sqrt(this.adiabaticIndex * this.standardGasConstant * temperature);
    return new SpeedOfSound(speedOfSound);
  }
}

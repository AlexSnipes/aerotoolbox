/**
 * Temperature conversion Class
 * @Author: Alejandro Sánchez
 * @Description: This class is used to calculate the International Atmosphere Standard
 * @Version: 0.404.17
 */
import { KELVIN_ZERO_IN_CELSIUS } from './constants';

export default class Temperature {
  private readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  /**
   * Convert Kelvin to Celsius
   */
  toCelsius() {
    return parseFloat(this.value.toFixed(2));
  }

  toKelvin() {
    return parseFloat((this.value + KELVIN_ZERO_IN_CELSIUS).toFixed(2));
  }

  /**
   * Convert Kelvin to Fahrenheit
   */
  toFahrenheit() {
    return (this.value * 9) / 5 + 32;
  }
}

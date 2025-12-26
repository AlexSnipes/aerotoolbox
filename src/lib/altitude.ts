/**
 * Altitude conversion Class
 * @Author: Alejandro Sánchez
 * @Description: This class is used to calculate the International Atmosphere Standard
 * @Version: 0.404.17
 */
import { FEET_TO_METERS } from './constants';

export default class Altitude {
  private readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  toMeters() {
    return this.value * FEET_TO_METERS;
  }

  toFeet() {
    return this.value / 1;
  }
}

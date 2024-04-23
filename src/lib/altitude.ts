/**
 * Altitude conversion Class
 * @Author: Alejandro Sánchez
 * @Description: This class is used to calculate the International Atmosphere Standard
 * @Version: 0.404.17
 */
export default class Altitude {
  private readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  toMeters() {
    return this.value * 0.3048;
  }

  toFeet() {
    return this.value / 1;
  }
}

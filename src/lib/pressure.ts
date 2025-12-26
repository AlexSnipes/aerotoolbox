/**
 * Pressure class
 * @author Alejandro Sánchez
 * @classdesc Pressure class to convert pressure units
 * @param {number} value - The pressure value
 * @version 0.404.17
 */
export default class Pressure {
  private readonly value;

  constructor(value: number) {
    this.value = value;
  }
  toMb(round: number = 2): number {
    return parseFloat((this.value / 100).toFixed(round));
  }
  toAtm(): number {
    return this.value / 101325;
  }
  toBar(): number {
    return this.value / 100000;
  }
  toPsi(): number {
    return this.value * 0.0001450377;
  }
  toMmhg(): number {
    return this.value * 0.00750062;
  }

  /**
   * Convert Pascals to inHg
   */
  toInHg(): number {
    return this.value / 3386.389;
  }
}

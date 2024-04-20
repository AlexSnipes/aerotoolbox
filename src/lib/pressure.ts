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
    return this.value * 0.96784110535469;
  }
  toBar(): number {
    return this.value * 1;
  }
  toPsi(): number {
    return this.value * 14.503773773;
  }
  toMmhg(): number {
    return this.value * 750.06168270417;
  }

  /**
   * From bar to inHg
   */
  toInHg(): number {
    return this.value / 3386.3886666667;
  }
}

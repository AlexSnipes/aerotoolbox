export class Density {
  private readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  /**
   * Convert the density to kg/m^3
   */
  toKgM3() {
    return parseFloat(this.value.toFixed(3));
  }

  /**
   * Convert the density to lb/ft^3
   */
  toLbFt3() {
    return parseFloat((this.value * 0.062428).toFixed(3));
  }

  /**
   * Convert the density to kgf*s^2/m^4
   */
  toKgfS2M4() {
    return parseFloat((this.toSigma() * 0.125).toFixed(3));
  }

  toSigma() {
    return parseFloat((this.value / 1.225).toFixed(3));
  }
}

export class SpeedOfSound {
  private readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  /**
   * Convert the speed of sound to m/s
   */
  toMs() {
    return parseFloat(this.value.toFixed(2));
  }

  /**
   * Convert the speed of sound to km/h
   */
  toKmh() {
    return parseFloat((this.value * 3.6).toFixed(2));
  }

  /**
   * Convert the speed of sound to knots
   *
   **/
  toKnots() {
    return parseFloat((this.value * 1.9438444924406).toFixed(2));
  }
}

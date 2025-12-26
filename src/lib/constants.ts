/**
 * Physics Constants and Unit Conversions
 */

// General Physical Constants
export const STANDARD_GRAVITY = 9.80665; // m/s²
export const ADIABATIC_INDEX = 1.4; // Air
export const GAS_CONSTANT_AIR = 287.05; // J/(kg·K)
export const UNIVERSAL_GAS_CONSTANT = 8.31447; // J/(mol·K)
export const MOLAR_MASS_AIR = 0.0289644; // kg/mol
export const KELVIN_ZERO_IN_CELSIUS = 273.15;

// ISA Standard Sea Level Values
export const SSL_TEMPERATURE_CELSIUS = 15; // °C
export const SSL_TEMPERATURE_KELVIN = SSL_TEMPERATURE_CELSIUS + KELVIN_ZERO_IN_CELSIUS; // 288.15 K
export const SSL_PRESSURE_PASCALS = 101325; // Pa
export const SSL_PRESSURE_MB = 1013.25; // mb
export const SSL_DENSITY = 1.225; // kg/m³
export const SSL_SPEED_OF_SOUND = 340.29; // m/s (Approx calculated)

// Gradients (Troposphere)
export const TEMPERATURE_GRADIENT_C_PER_1000M = 6.5; // °C/1000m
export const TEMPERATURE_GRADIENT_K_PER_M = 0.0065; // K/m

// Unit Conversion Factors
export const FEET_TO_METERS = 0.3048;
export const METERS_TO_FEET = 1 / FEET_TO_METERS;

import type { SensorPreset } from './ha/types.js';

/**
 * A Celsius preset read against a sensor that reports in Fahrenheit
 * (air-quality-card#7).
 *
 * Every temperature preset is written in °C, and the card compares the raw
 * state of the entity with it. A sensor in a Home Assistant set to imperial
 * units reports 75, which the air card read against a setpoint of 21 and a
 * step of 1, and called a comfortable room "Too Hot". A user who wrote
 * `setpoint: 72` fared little better: the step was still the Celsius one, so
 * 75 sat three steps above the ideal instead of under two.
 *
 * The preset is converted, the reading is not. The number on the bar stays
 * the one Home Assistant shows everywhere else, and only the defaults move:
 * points on the scale (setpoint, limits) by the full formula, widths (steps)
 * by the ratio alone, since a step of 1 °C is 1.8 °F wide and not 33.8.
 * Points are rounded to the whole degree, widths to the tenth: 21 °C becomes
 * 70 °F rather than 69.8, which nobody would have written as a target.
 * Anything the user wrote in their own config is left as written, because
 * they wrote it in the unit their sensor speaks.
 *
 * The unit is the entity's own `unit_of_measurement` when it has one, the
 * `unit` the user wrote otherwise. A sensor that says °C keeps the Celsius
 * preset whatever label the user put on it, because that is what its numbers
 * are in.
 */
const toF = (c: number): number => Math.round((c * 9) / 5 + 32);
const widthToF = (c: number): number => Math.round(((c * 9) / 5) * 10) / 10;

export function presetInUnit(
  preset: Partial<SensorPreset>,
  entityUnit: string | undefined,
  userUnit: string | undefined,
): Partial<SensorPreset> {
  const unit = entityUnit || userUnit;
  if (preset.unit !== '°C' || unit !== '°F') return preset;

  const adapted: Partial<SensorPreset> = { ...preset, unit: '°F' };
  if (preset.setpoint != null) adapted.setpoint = toF(preset.setpoint);
  if (preset.min_limit != null) adapted.min_limit = toF(preset.min_limit);
  if (preset.limits) adapted.limits = preset.limits.map(toF);
  if (preset.step != null) adapted.step = widthToF(preset.step);
  if (preset.step_low != null) adapted.step_low = widthToF(preset.step_low);
  if (preset.step_high != null) adapted.step_high = widthToF(preset.step_high);
  return adapted;
}

/**
 * The same conversion applied to a sensor as `setConfig` leaves it, with the
 * preset already merged in. A field still equal to the preset's value is the
 * preset speaking and is converted; a field that differs is the user's own and
 * is kept. The unit the user wrote counts only when it is not the preset's.
 */
const FIELDS = ['unit', 'setpoint', 'step', 'step_low', 'step_high', 'min_limit'] as const;

export function sensorInUnit<T extends Record<string, any>>(
  sensor: T,
  preset: Partial<SensorPreset> | undefined,
  entityUnit: string | undefined,
): T {
  if (!preset) return sensor;
  const userUnit = sensor.unit !== preset.unit ? sensor.unit : undefined;
  const adapted = presetInUnit(preset, entityUnit, userUnit);
  if (adapted === preset) return sensor;

  const out: Record<string, any> = { ...sensor };
  for (const f of FIELDS) {
    if (preset[f] != null && sensor[f] === preset[f]) out[f] = adapted[f];
  }
  if (preset.limits && sensor.limits === preset.limits) out.limits = adapted.limits;
  return out as T;
}

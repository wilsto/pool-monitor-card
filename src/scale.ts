/**
 * @fileoverview The scale, shared by the four cards: whether there is one at
 * all (`hasScale`), and where the value sits on it (`outOfScale`).
 *
 * A value outside the bar is pinned to the end of it: the ratio is clamped to
 * [0, 1] (`card-base.ts`), so carbon monoxide at 500 ppm and at 90 ppm land on
 * the same pixel of a scale that stops at 30 (#62). The reader sees a cursor
 * against the edge and has no way to tell a value that just crossed the last
 * threshold from one an order of magnitude past it.
 *
 * The PO settled the principle on 2026-08-22: mark the overflow at the edge,
 * do not stretch the geometry. The alternative, seen on @rpirsc13's fork
 * (rpirsc13/air-quality-card, commit 77eb5e6), extends the last band up to the
 * value; the amplitude then shows, but the bands deform with every reading and
 * two cards side by side no longer share a geometry.
 *
 * So the clamp stays, and this module answers the one question the clamp
 * destroys: is the value still on the scale, and if not, which end did it
 * leave. The amount is not encoded here. The bubble already prints the number,
 * and grading the mark would need a threshold nobody has decided on.
 *
 * The shape follows `trend.ts`: a small pure function per concern, a glyph for
 * the eye, a translation key for a screen reader. A mark carried by a glyph
 * alone is not a mark for everyone.
 */

/**
 * Whether a sensor carries a reference its reading can be judged against.
 *
 * A scale is four explicit `limits`, or a setpoint from any of its three
 * sources: a tracking entity, the sensor's own key, the preset it inherits
 * from. Nothing else counts, and the two near-misses are worth naming because
 * both were measured on 2026-08-23 and both make the failure look *more*
 * credible rather than less:
 *
 * - `min` and `max` are the bar's geometry, not a reference. A sensor with
 *   `min: 0, max: 100` and no setpoint draws a full-width bar with the cursor
 *   at the right place, and still grades every reading the same way.
 * - `step` without a setpoint is a ladder with no rung to start from. It
 *   produces the most convincing lie of the lot: five evenly spaced labels
 *   that look like a published scale, centred on whatever the sensor last
 *   said.
 *
 * A boundary that is not a finite number is not a boundary. `setpoint: "abc"`
 * used to reach the band comparisons as `NaN`, where every comparison is
 * false, and left the reading with no state and a transparent bar; three
 * `limits` instead of four fell through to the setpoint path and, with no
 * setpoint, into the fallback this guard exists to stop.
 *
 * Why it matters is `card-base.ts`: with no reference, the engine used the
 * reading itself as the setpoint. The bands then close around the value, the
 * value lands in the middle of them by construction, and 1, 12 and 500 µg/m³
 * are all announced as "Ideal", in green (#98). A supervision card that
 * reassures whatever the number is fails worse than one that says nothing.
 */
export function hasScale(
  limits: number[] | null | undefined,
  ...setpoints: (number | string | null | undefined)[]
): boolean {
  if (Array.isArray(limits) && limits.length === 4 && limits.every(l => Number.isFinite(Number(l))))
    return true;
  return setpoints.some(s => s != null && s !== '' && Number.isFinite(Number(s)));
}

/** Which end of the bar the value sits past. */
export type ScaleOverflow = 'below' | 'above';

/**
 * Where a value sits relative to the bar, `null` when it is on the scale.
 *
 * The value arrives from `parseFloat` and can be `null` (entity missing,
 * unreadable state) or a string (an `override` replaces the reading with a
 * word). Neither is below anything, so both read as on-scale rather than as
 * an overflow at the bottom, which is what `Number(null) === 0` would say.
 *
 * A bar of zero width is refused for the same reason: every value but one
 * would be off it, and the mark would fire on a degenerate configuration
 * instead of on a real exceedance.
 */
export function outOfScale(
  value: number | string | null | undefined,
  barMin: number,
  barMax: number,
): ScaleOverflow | null {
  const v = typeof value === 'number' ? value : Number(value);
  if (value == null || value === '' || !Number.isFinite(v)) return null;
  if (!Number.isFinite(barMin) || !Number.isFinite(barMax) || barMax <= barMin) return null;

  if (v < barMin) return 'below';
  if (v > barMax) return 'above';
  return null;
}

/**
 * `▸` and `◂`, U+25B8 and U+25C2, the small triangles pointing off the scale.
 *
 * Chosen on the same three measured properties that settled the trend's `▴`
 * and `▾`, and here the first one is not theoretical: this mark points
 * sideways, and the bar it annotates is drawn left to right whatever the
 * language, since positions are always set as `left: n%`.
 *
 * - **Not Bidi_Mirrored.** A mirrored glyph in a right-to-left paragraph is
 *   painted reversed, so it would point at the middle of a bar that still runs
 *   the other way. `‹` `›` carry the property, these do not.
 * - **East_Asian_Width = Narrow**, like the Latin text beside them. The
 *   full-size `▶` `◀` are Ambiguous, the class that resolves to full width in
 *   a CJK context, which is what rules them out.
 * - **Not Emoji**, so no renderer paints them in colour.
 *
 * (Verified against Unicode 15.0: `unicodedata.east_asian_width` for the
 * width, `\p{Bidi_Mirrored}` and `\p{Emoji}` for the other two.)
 */
export function overflowGlyph(overflow: ScaleOverflow | null | undefined): string {
  if (overflow === 'above') return '▸';
  if (overflow === 'below') return '◂';
  return '';
}

/**
 * The translation key for what a screen reader should say.
 *
 * A whole phrase per end rather than a word assembled at runtime, for the
 * reason `trend.ts` gives: the halves do not combine the same way in every
 * language.
 */
export function overflowLabelKey(overflow: ScaleOverflow | null | undefined): string | null {
  return overflow ? `out_of_scale.${overflow}` : null;
}

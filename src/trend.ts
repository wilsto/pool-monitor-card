/**
 * @fileoverview Rise and fall indicator shared by the four cards.
 *
 * The design is @arketec's, built on his fork of the distribution repository
 * and offered to us: https://github.com/arketec/pool-monitor-card/commit/4730f9553576529730c2b8e4079458bd2d3d8903
 * (branch `rise-and-fall-indicators`, 6 August 2026). He gave explicit leave to
 * port it ourselves rather than wait for his pull request. Three things are his
 * and are kept as he made them: the slope comes from a Home Assistant
 * `derivative` helper the user names, `derivative_scale` says how much slope is
 * worth one chevron, and the chevron count is capped at three.
 *
 * Two things differ from his fork, both deliberate:
 *
 * 1. A deadband. His version speaks as soon as the derivative is not exactly
 *    zero, and a derivative sensor is almost never exactly zero, so the chevron
 *    would appear and vanish on measurement noise. Here `derivative_scale` is
 *    also the floor: below one full step the indicator says nothing. One knob
 *    for both jobs rather than a second one to explain.
 * 2. A spoken form. A repeated glyph is punctuation to a screen reader, so the
 *    direction and the rate are also carried as a translated sentence.
 */

export type TrendDirection = 'rising' | 'falling';

export interface Trend {
  /** `null` when the slope is below the deadband, or unreadable. */
  direction: TrendDirection | null;
  /** 0 when the indicator is silent, 1 to {@link MAX_TREND_CHEVRONS} otherwise. */
  count: number;
}

/**
 * Carried over from the fork, so a configuration written for it keeps its
 * meaning here. It is a slope per hour and no single number can suit pH,
 * degrees and parts per million at once, which is why the option exists.
 */
export const DEFAULT_DERIVATIVE_SCALE = 0.1;

/** Beyond three the chevrons stop reading as a quantity and start reading as noise. */
export const MAX_TREND_CHEVRONS = 3;

export const NO_TREND: Trend = { direction: null, count: 0 };

/**
 * Turns the reading of a `derivative` helper into a direction and a number of
 * chevrons.
 *
 * With the default scale of 0.1: a slope of 0.05 says nothing, 0.1 to 0.2 is
 * one chevron, 0.2 to 0.3 is two, anything from 0.3 up is three.
 */
export function computeTrend(derivative: number | null | undefined, scale?: number): Trend {
  if (derivative == null || !Number.isFinite(derivative)) return NO_TREND;

  const step =
    scale != null && Number.isFinite(scale) && scale > 0 ? scale : DEFAULT_DERIVATIVE_SCALE;
  const steps = Math.floor(Math.abs(derivative) / step);
  if (steps < 1) return NO_TREND;

  return {
    direction: derivative > 0 ? 'rising' : 'falling',
    count: Math.min(MAX_TREND_CHEVRONS, steps),
  };
}

/**
 * `▴` and `▾`, U+25B4 and U+25BE, the small triangles.
 *
 * Vertical rather than the fork's sideways angle brackets: three glyphs lying
 * on their side do not read as "this is going up". That is a departure from
 * @arketec's version and a deliberate one.
 *
 * The exact pair is settled by three measured properties, not by taste:
 *
 * - **Not Bidi_Mirrored.** `‹` `›` are, and so are the fork's `〈` `〉`, which
 *   means a right-to-left paragraph renders them reversed and a Hebrew reader
 *   sees the rising glyph pointing the wrong way. These cannot mirror, so the
 *   problem disappears rather than being patched with `dir="ltr"`.
 * - **East_Asian_Width = Narrow**, the same class as the Latin text beside
 *   them. `▲` `▼` and `↑` `↓` are Ambiguous, the class that resolves to full
 *   width in a CJK context. That is the failure that ruled out `〈` `〉` in the
 *   first place, so the narrow variant is the consistent choice.
 * - **Not Emoji.** `⬆` `⬇` carry the Emoji property and risk being painted as
 *   a colour emoji rather than as text.
 *
 * Small triangles rather than full-size ones because up to three of them sit
 * in a marker that is only a few pixels wider than the value it holds.
 */
export function trendGlyphs(trend: Trend | null | undefined): string {
  if (!trend || !trend.direction || trend.count < 1) return '';
  return (trend.direction === 'rising' ? '▴' : '▾').repeat(trend.count);
}

/**
 * The translation key for what a screen reader should say.
 *
 * One sentence per direction and per rate, rather than a direction plus an
 * adverb glued together: "monte lentement" is not "monte" + "lentement" in
 * every language, and a translator needs the whole sentence to get it right.
 */
export function trendLabelKey(trend: Trend | null | undefined): string | null {
  if (!trend || !trend.direction || trend.count < 1) return null;
  return `trend.${trend.direction}_${Math.min(MAX_TREND_CHEVRONS, trend.count)}`;
}

import { describe, it, expect } from 'vitest';
import { AirQualityCard } from '../../air-quality/src/air-quality-card.js';

// Why this file exists.
//
// A band sensor carries published threshold values: 100 Bq/m3 is the WHO radon
// reference level, 1000 ppm is the ventilation convention, 15 ug/m3 is the WHO
// 24-hour PM2.5 guideline. For those numbers to stay quotable line by line in
// the source, the bar has to break on them. It did not: the gradient placed one
// colour stop per limit and let CSS interpolate between them, so a band wore
// its own colour on the width of a single boundary and faded through the rest
// of its span. The colour a reader reads as "bad" therefore arrived well past
// the limit that defines it.
//
// The fork this card learned band scales from worked around it in the data:
// "The baseline was set to 800 because of how the color gradient is
// implemented. I wanted the indicator to turn yellow at exactly 1000, and to
// achieve that smoothly, the gradient needs to start a bit earlier. This
// applied to all sensor limits" (wilsto/air-quality-card#4). That trade costs
// the provenance of every threshold: a limit is no longer the published value,
// it is the published value minus an undocumented display offset, and the next
// source copied in has to be deformed by hand the same way.
//
// These tests hold the other end of the trade: the rendering breaks on the
// limit, so the limit can stay the published number.

const bands = (limits, value, extra = {}) => {
  const card = new AirQualityCard();
  card.hass = {
    states: {
      'sensor.probe': {
        state: String(value),
        attributes: {},
        last_updated: '2026-08-22T10:00:00Z',
      },
    },
    entities: {},
  };
  card.setConfig({
    sensors: {
      co2: { entity: 'sensor.probe', limits, direction: 'lower_is_better', ...extra },
    },
  });
  return card.processData().co2_1;
};

// The stop list is piecewise constant, so it reads as pairs: two stops per
// band, same colour, the band's own edges. This returns them as five bands.
const readBands = stops =>
  stops
    .split(', ')
    .map(s => ({ colour: s.split(' ')[0], at: Number(s.split(' ')[1].replace('%', '')) }))
    .reduce((acc, stop, i) => {
      if (i % 2 === 0) acc.push({ colour: stop.colour, from: stop.at, to: null });
      else acc[acc.length - 1].to = stop.at;
      return acc;
    }, []);

// The ventilation convention, written as the convention rather than as the
// convention minus an offset.
const CO2 = [500, 800, 1000, 2000];

describe('a published limit is painted where it is written', () => {
  it('breaks the bar exactly on each of the four limits', () => {
    const d = bands(CO2, 700);
    const painted = readBands(d.monotonic_stops);
    // Five bands, and the four inner edges are the four limits, nothing else.
    expect(painted).toHaveLength(5);
    expect(painted.map(b => b.to).slice(0, 4)).toEqual(d.label_positions.slice(1));
    expect(painted.map(b => b.from).slice(1)).toEqual(d.label_positions.slice(1));
  });

  it('holds one flat colour across a band instead of drifting through it', () => {
    const painted = readBands(bands(CO2, 700).monotonic_stops);
    // Five colours for five bands, each used once: a colour that appears twice
    // would mean two bands the eye cannot tell apart.
    expect(new Set(painted.map(b => b.colour)).size).toBe(5);
  });

  it('paints the reading with the colour its badge is classified with', () => {
    // The badge switches at the limit and always did. The bar is what drifted,
    // so the two have to be checked against each other, not each alone.
    for (const ppm of [0, 499, 500, 799, 800, 999, 1000, 1999, 2000, 5000]) {
      const d = bands(CO2, ppm);
      const painted = readBands(d.monotonic_stops);
      // A value sitting exactly on an edge belongs to the band above it, the
      // same rule the badge applies.
      const band = painted.find(b => d.pct_marker < b.to) ?? painted[4];
      expect(band.colour, `${ppm} ppm`).toBe(d.color);
    }
  });

  it('does not wear the next band colour before the limit is reached', () => {
    // 999 ppm and 1000 ppm are one part per million apart and must not be the
    // same colour; 501 and 799 sit in the same band and must be.
    expect(bands(CO2, 999).color).not.toBe(bands(CO2, 1000).color);
    expect(bands(CO2, 501).color).toBe(bands(CO2, 799).color);
    // And the band they share has a real width on the bar, rather than being
    // the single boundary pixel the interpolated gradient left it.
    const painted = readBands(bands(CO2, 700).monotonic_stops);
    expect(painted[1].from).toBeLessThan(painted[1].to);
  });

  it('keeps the break on the limit when the scale is stretched past it', () => {
    // With an explicit max the limits no longer sit at the ends of the bar.
    // The break still has to land on the value, not on a fixed proportion.
    const d = bands(CO2, 700, { min: 0, max: 4000 });
    const painted = readBands(d.monotonic_stops);
    expect(painted.map(b => b.to).slice(0, 4)).toEqual([12.5, 20, 25, 50]);
  });

  it('runs the worst band to the end of the bar rather than stopping short', () => {
    const painted = readBands(bands(CO2, 700, { min: 0, max: 4000 }).monotonic_stops);
    expect(painted[4].to).toBe(100);
  });
});

describe('a scale where higher is better breaks on its limits too', () => {
  it('reverses the colours without moving the boundaries', () => {
    const worse = bands(CO2, 700, { direction: 'higher_is_better' });
    const better = bands(CO2, 700, { direction: 'lower_is_better' });
    const worseBands = readBands(worse.monotonic_stops);
    const betterBands = readBands(better.monotonic_stops);
    expect(worseBands.map(b => b.from)).toEqual(betterBands.map(b => b.from));
    expect(worseBands.map(b => b.colour)).toEqual(betterBands.map(b => b.colour).reverse());
  });
});

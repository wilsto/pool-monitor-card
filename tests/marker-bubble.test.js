import { describe, test, expect } from 'vitest';
import { cardContent, markerShift } from '../src/components/card-content.js';

/**
 * The value bubble must stay inside the card at both ends of the scale (#70).
 *
 * The clamp is written in CSS, so the assertion that matters is not the string
 * but what a browser resolves it to. `resolveShift` reproduces the two rules
 * the browser applies to that expression, and nothing else:
 *   - `clamp(min, value, max)` is `max(min, min(value, max))`
 *   - `cqw` is one percent of the gauge, `%` inside a transform is a
 *     percentage of the bubble's own width
 */
function resolveShift(shift, gaugeWidth, bubbleWidth) {
  const match = shift.match(
    /^translateX\(clamp\((-?[\d.]+)cqw, -50%, calc\((-?[\d.]+)cqw - 100%\)\)\)$/,
  );
  if (!match) throw new Error(`unexpected shift expression: ${shift}`);
  const min = (Number(match[1]) * gaugeWidth) / 100;
  const max = (Number(match[2]) * gaugeWidth) / 100 - bubbleWidth;
  const preferred = -bubbleWidth / 2;
  return Math.max(min, Math.min(preferred, max));
}

/** Left edge of the bubble once the browser has resolved the transform. */
function leftEdge(position, gaugeWidth, bubbleWidth) {
  const anchor = (position / 100) * gaugeWidth;
  return anchor + resolveShift(markerShift(position), gaugeWidth, bubbleWidth);
}

/** Flattens a Lit TemplateResult back into the markup it describes. */
function renderText(template) {
  if (template == null || typeof template === 'boolean') return '';
  if (typeof template !== 'object') return String(template);
  if (!template.strings) return '';
  return template.strings.reduce(
    (acc, part, i) => acc + part + (i < template.values.length ? renderText(template.values[i]) : ''),
    '',
  );
}

describe('markerShift', () => {
  const GAUGE = 400;
  const BUBBLE = 120;

  test('centres the bubble on the value when it fits on both sides', () => {
    expect(leftEdge(50, GAUGE, BUBBLE)).toBe(200 - BUBBLE / 2);
    expect(leftEdge(40, GAUGE, BUBBLE)).toBe(160 - BUBBLE / 2);
    expect(leftEdge(75, GAUGE, BUBBLE)).toBe(300 - BUBBLE / 2);
  });

  test('holds the bubble inside the card at the top of the scale', () => {
    // The measured case: ORP 825 with setpoint 700 and step 50 lands at 100%.
    for (const position of [85, 90, 95, 99, 100]) {
      const left = leftEdge(position, GAUGE, BUBBLE);
      expect(left + BUBBLE).toBeLessThanOrEqual(GAUGE);
      expect(left).toBeGreaterThanOrEqual(0);
    }
    expect(leftEdge(100, GAUGE, BUBBLE)).toBe(GAUGE - BUBBLE);
  });

  test('holds the bubble inside the card at the bottom of the scale', () => {
    for (const position of [0, 1, 5, 10, 14]) {
      const left = leftEdge(position, GAUGE, BUBBLE);
      expect(left).toBeGreaterThanOrEqual(0);
      expect(left + BUBBLE).toBeLessThanOrEqual(GAUGE);
    }
    expect(leftEdge(0, GAUGE, BUBBLE)).toBe(0);
  });

  test('treats both ends the same way, whatever the gauge and bubble widths', () => {
    // A pixel of float noise is not an overflow: the rounding of the gauge
    // terms lands the extremes on 0 and gauge - bubble to within 1e-13.
    const noise = 1e-9;
    for (const gauge of [180, 260, 400, 720]) {
      for (const bubble of [40, 90, 150]) {
        for (let position = 0; position <= 100; position += 0.5) {
          const left = leftEdge(position, gauge, bubble);
          expect(left).toBeGreaterThanOrEqual(-noise);
          expect(left + bubble).toBeLessThanOrEqual(gauge + noise);
        }
      }
    }
  });

  test('never pushes the bubble further from the value than it has to', () => {
    const gauge = 400;
    const bubble = 120;
    for (let position = 0; position <= 100; position += 0.5) {
      const anchor = (position / 100) * gauge;
      const wanted = anchor - bubble / 2;
      const clamped = Math.max(0, Math.min(wanted, gauge - bubble));
      expect(leftEdge(position, gauge, bubble)).toBeCloseTo(clamped, 6);
    }
  });

  test('keeps the start of the value visible when the bubble is wider than the gauge', () => {
    expect(leftEdge(100, 100, 160)).toBe(0);
    expect(leftEdge(0, 100, 160)).toBe(0);
  });

  test('clamps a position outside the scale instead of trusting it', () => {
    expect(markerShift(140)).toBe(markerShift(100));
    expect(markerShift(-20)).toBe(markerShift(0));
  });

  test('rounds the gauge terms rather than emitting float noise', () => {
    expect(markerShift(100 / 3)).toBe('translateX(clamp(-33.33cqw, -50%, calc(66.67cqw - 100%)))');
    expect(markerShift(0)).toBe('translateX(clamp(0cqw, -50%, calc(100cqw - 100%)))');
  });
});

describe('generateBody bubble and cursor', () => {
  const config = {
    display: { gradient: true, show_labels: true, show_icons: true },
    colors: {
      low: '#fdcb6e',
      warn: '#e17055',
      normal: '#00b894',
      cool: '#00BFFF',
      marker: '#000000',
      hi_low: '#00000099',
    },
  };

  const data = {
    name: 'orp',
    entity: 'sensor.pool_orp',
    color: '#e17055',
    pct_marker: 100,
    value: 825,
    unit: 'mV',
    state: 'Too High',
    side_align: 'right',
    pct_state_step: 101,
    hide_icon: false,
    is_mdi: true,
    mdi_icon: 'mdi:flash',
    mode: 'centric',
    setpoint_class: ['600', '650', '700', '750', '800'],
    label_positions: [16.67, 33.33, 50, 66.67, 83.33],
    pct_min: 0,
    pct_max: 100,
    pct_cursor: 0,
    title: 'ORP',
    last_updated: 'just now',
  };

  test('the bubble carries the clamp', () => {
    const markup = renderText(cardContent.generateBody(config, data));
    const bubble = markup.match(/class="marker"[^>]*transform: ([^;]+);/);
    expect(bubble).not.toBeNull();
    expect(bubble[1]).toBe(markerShift(100));
  });

  test('the cursor does not follow the bubble', () => {
    const markup = renderText(cardContent.generateBody(config, data));
    const triangle = markup.match(/class="triangle"[^>]*transform: ([^;]+);/);
    expect(triangle).not.toBeNull();
    expect(triangle[1]).not.toContain('clamp');
    expect(triangle[1]).toBe('translateX(-100%)');

    const midScale = renderText(cardContent.generateBody(config, { ...data, pct_marker: 50 }));
    const midTriangle = midScale.match(/class="triangle"[^>]*transform: ([^;]+);/);
    expect(midTriangle[1]).toBe('translateX(-50%)');
  });
});

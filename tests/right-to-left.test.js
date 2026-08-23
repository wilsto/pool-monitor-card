import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render } from 'lit';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';

// Hebrew ships in `core/src/locales/he.ts` and is published at every release,
// and until #121 nobody had put a card in front of a right-to-left reading
// direction. The measurement was taken on the bench on 2026-08-23, Home
// Assistant interface in Hebrew, the four cards side by side with the same
// cards in English:
//
//   - the bar is unmoved. Every position is set as `left: n%`, so the ticks
//     still climb left to right and the bubble still sits at the same offset
//     from the start of its bar, to the pixel. Whether that is the *right*
//     thing for a Hebrew reader is a question of meaning and belongs to the PO
//   - the trend chevrons and the out-of-scale mark still point where they
//     should, which `trend.test.js` and `out-of-scale.test.js` had already
//     locked by refusing any Bidi_Mirrored glyph
//   - the reading came apart, and two insets held their padding on the empty
//     side. That is what this file locks
//
// Nothing here needs a browser: all three defects were mechanical, and the
// mechanism is what a test can hold.

const root = resolve(__dirname, '../..');
const read = p => readFileSync(resolve(root, p), 'utf8');

const STATES = {
  'sensor.pool_temperature': {
    state: '25.7',
    attributes: { unit_of_measurement: '°C' },
    last_updated: '2026-08-23T10:00:00Z',
  },
};

const paint = compact => {
  const card = new PoolMonitorCard();
  card.hass = { states: STATES, entities: {} };
  card.setConfig({
    title: 'Essential sensors',
    display: { compact },
    sensors: { temperature: { entity: 'sensor.pool_temperature' } },
  });
  const host = document.createElement('div');
  render(card.render(), host);
  return host;
};

// The measured defect. In an RTL paragraph the degree sign is a European
// Number Terminator with no number beside it: it resolves as a neutral, takes
// the paragraph direction, and crosses to the far side of the C. The bench
// painted `C° 25.7` where the card had written `25.7 °C`.
describe('the reading is isolated from the text around it', () => {
  it('the full layout wraps the value and its unit in a bidi isolate', () => {
    const bdi = paint(false).querySelector('bdi');
    expect(bdi).not.toBeNull();
    expect(bdi.textContent.replace(/\s+/g, ' ').trim()).toBe('25.7 °C');
  });

  // The rendering is written twice, and the compact layout escaped the defect
  // only by accident: its sensor name is a strong left-to-right letter sitting
  // right before the number, which dragged the whole run along. An accident is
  // not a design, so the isolate is asked of both.
  it('and so does the compact one', () => {
    const bdi = paint(true).querySelector('bdi');
    expect(bdi).not.toBeNull();
    expect(bdi.textContent.replace(/\s+/g, ' ').trim()).toBe('25.7 °C');
  });

  it('both call the same helper, so a fix cannot land on one side only', () => {
    const source = read('core/src/components/card-content.ts');
    expect(source.match(/generateReading\(data\)/g)).toHaveLength(2);
    expect(source).not.toMatch(/\$\{data\.value\} \$\{data\.unit\}(?!<\/bdi>)/);
  });
});

// Two insets that a Hebrew card moves to the other side of the row. Physical
// `left` / `right` keep them where they were and leave the content flush
// against the card edge; the logical forms follow the reading direction and
// render identically in a left-to-right card.
describe('the insets follow the reading direction', () => {
  const styles = read('core/src/styles/styles.ts');
  const rule = name => styles.match(new RegExp(`\\.${name} \\{[^}]*\\}`, 's'))?.[0] ?? '';

  it('the card title is inset from the side it starts on', () => {
    expect(rule('pool-monitor-title')).toContain('padding-inline-start');
    expect(rule('pool-monitor-title')).not.toMatch(/padding-(left|right)\s*:/);
  });

  it('the sensor icon hugs the end of its box, which is the bar side', () => {
    expect(rule('pool-monitor-entity-img')).toMatch(/text-align:\s*end/);
  });
});

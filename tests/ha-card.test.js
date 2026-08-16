import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// @coraxt on the HA community forum: "How can I change the background
// Transparenz. I can change it in all my cards with card-mod, but it dosn't
// work with Pool Monitor cards." (#1)
//
// The reason: the card rendered a bare <div> and imitated ha-card on :host.
// card-mod users write `ha-card { ... }`, which matched nothing here, while it
// matches on every other card. Mushroom, button-card, mini-graph-card and
// apexcharts-card all render an <ha-card>; ours did not.
//
// Second half: 22 static inline styles beat any injected CSS by specificity,
// so even with ha-card in place card-mod could not reach font sizes (@apsmith12).
// Dynamic inline styles, computed positions and colours, legitimately stay.

const root = resolve(__dirname, '../..');
const read = p => readFileSync(resolve(root, p), 'utf8');

describe('the card uses the standard Home Assistant container', () => {
  it('renders an <ha-card>', () => {
    expect(read('core/src/card-base.ts')).toContain('<ha-card');
  });

  it('no longer imitates a card on :host', () => {
    const styles = read('core/src/styles/styles.ts');
    const host = styles.match(/:host \{[^}]*\}/s)?.[0] ?? '';
    expect(host).not.toMatch(/--ha-card-background/);
    expect(host).not.toMatch(/--ha-card-border-radius/);
    expect(host).not.toMatch(/--ha-card-box-shadow/);
  });
});

describe('static styling lives in the stylesheet, where card-mod can reach it', () => {
  const content = () => read('core/src/components/card-content.ts');

  it('no inline style fixes a size', () => {
    const inline = content().match(/style="[^"]*"/g) ?? [];
    const statiques = inline.filter(s => !s.includes('${'));
    const tailles = statiques.filter(s => /font-size|width:|height:/.test(s));
    expect(tailles).toEqual([]);
  });

  it('keeps dynamic inline styles, they compute positions and colours', () => {
    const inline = content().match(/style="[^"]*"/g) ?? [];
    expect(inline.filter(s => s.includes('${')).length).toBeGreaterThan(15);
  });
});

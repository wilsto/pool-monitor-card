/**
 * Which of black or white is legible on a given background.
 *
 * Not invented here. It is the relative-luminance formula of WCAG 2.x and the
 * contrast ratio built on it, and the rule is the one the W3C techniques
 * describe: compute the ratio against both candidates and keep the higher.
 * Writing a threshold on the luminance instead ("light background, black
 * text") is the version that gets this wrong, because the ratio is not
 * monotonic in the way that shortcut assumes near the middle of the range.
 *
 * It exists because two places paint text on a band colour: the value bubble
 * of the full layout, always, and the compact row when `display.band_fill` is
 * on. The palette contains one colour that black cannot be read on, and the
 * bubble wrote black on it for every reading in the worst band until #163.
 * Measured on the shipped palette, black text against each band:
 *
 *   normal    #00b894   8.28   fair      #7ec181   9.83
 *   low       #fdcb6e  13.94   warn      #e17055   6.65
 *   hazardous #8e44ad   3.58   cool      #00BFFF   9.90
 *
 * The compact row is 11px text and the bubble 13px at weight 600, neither of
 * which is "large" under WCAG 1.4.3, so the floor that applies is 4.5. Four bands clear it comfortably and `hazardous`
 * does not; white on that same purple is 5.87 and does. So the colour is
 * chosen rather than fixed, and the palette is user-writable anyway, which
 * makes any per-band constant a lie waiting for someone to change a colour.
 */

/** Channel values 0..1, or null for a colour this cannot read. */
function channels(colour: string): [number, number, number] | null {
  const c = colour.trim().toLowerCase();

  const hex = c.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (hex) {
    const h = hex[1];
    const pairs =
      h.length === 3 ? [...h].map(d => d + d) : [h.slice(0, 2), h.slice(2, 4), h.slice(4, 6)];
    return pairs.map(p => parseInt(p, 16) / 255) as [number, number, number];
  }

  const rgb = c.match(/^rgba?\(([^)]+)\)$/);
  if (rgb) {
    const parts = rgb[1]
      .split(/[,\s/]+/)
      .filter(Boolean)
      .slice(0, 3);
    if (parts.length !== 3) return null;
    const nums = parts.map(p => (p.endsWith('%') ? parseFloat(p) / 100 : parseFloat(p) / 255));
    if (nums.some(n => !Number.isFinite(n))) return null;
    return nums as [number, number, number];
  }

  return null;
}

const luminance = ([r, g, b]: [number, number, number]): number => {
  const lin = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

/**
 * The contrast ratio between two relative luminances, WCAG 2.x §1.4.3.
 * Exported so a test can state the floor in the same units the standard uses
 * rather than re-deriving it.
 */
export const contrastRatio = (a: string, b: string): number => {
  const [x, y] = [channels(a), channels(b)];
  if (!x || !y) return 1;
  const [hi, lo] = [luminance(x), luminance(y)].sort((p, q) => q - p);
  return (hi + 0.05) / (lo + 0.05);
};

/**
 * Black or white, whichever is more legible on `background`.
 *
 * Falls back to black for a colour it cannot parse, which is what every row
 * already used before this existed: an unreadable palette entry leaves the
 * card exactly as it was rather than flipping a row to white on a light
 * background. `var(--something)` is the case that reaches here in practice,
 * and its value is not knowable from this side.
 */
export function readableTextOn(background: string): string {
  if (!channels(background)) return 'black';
  return contrastRatio('#ffffff', background) > contrastRatio('#000000', background)
    ? 'white'
    : 'black';
}

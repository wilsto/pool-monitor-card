import { describe, it, expect, beforeEach } from 'vitest';

// wilsto/air-quality-card#3: another HACS card registers the same element name
// (KadenThomp36/air-quality-card, 101 stars against ours). Whichever loads
// second throws a DOMException from customElements.define, and because the
// decorator runs at module evaluation the whole file dies with it — the card
// does not merely fail to render.
//
// PO decision 2026-08-15: we do not rename, that would break every existing
// config for a rare case. But the collision must not take the module down.
// The codebase already guards `monitor-sensor-editor` this way.

describe('card registration survives a name collision', () => {
  beforeEach(() => {
    globalThis.__BUILD_TIMESTAMP__ = 'test';
  });

  it('importing the card does not throw when the name is already taken', async () => {
    class Squatter extends HTMLElement {}
    if (!customElements.get('air-quality-card')) {
      customElements.define('air-quality-card', Squatter);
    }
    await expect(import('../../air-quality/src/air-quality-card.js')).resolves.toBeDefined();
  });

  it('leaves the element that got there first in place', () => {
    expect(customElements.get('air-quality-card')).toBeTruthy();
  });
});

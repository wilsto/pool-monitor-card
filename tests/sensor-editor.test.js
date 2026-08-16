import { describe, it, expect, beforeEach } from 'vitest';
import '../src/editor/sensor-editor.js';

// Home Assistant removed ha-textfield in 2026.5 (verified: filename:ha-textfield.ts
// returns 0 files in home-assistant/frontend, and the element is absent from the
// custom-element registry of a live 2026.8.2 instance while present on 2026.2.3).
// ha-select still exists but was rewritten: it takes an `options` property and
// fires `selected` with the value in e.detail.value, so the old
// <mwc-list-item> children plus e.target.value contract no longer works.
//
// PO decision 2026-08-15: the editor uses native elements for these, so it does
// not depend on which HA version the user runs. ha-entity-picker, ha-form,
// ha-icon* are deliberately kept, they still exist and provide real value.
const REMOVED_OR_CHANGED = ['ha-textfield', 'ha-select', 'mwc-list-item'];

async function renderEditor({ freeform = false } = {}) {
  const el = document.createElement('monitor-sensor-editor');
  el.hass = { states: {}, entities: {} };
  el.registry = { temperature: { name: 'Temperature' } };
  el.sensors = { temperature: { entity: 'sensor.x', name: 'T', mode: 'centric' } };
  el.freeform = freeform;
  document.body.appendChild(el);
  await el.updateComplete;
  // expand the row so the field block is rendered
  el.shadowRoot.querySelector('.sensor-row-header')?.click();
  await el.updateComplete;
  return el;
}

describe('sensor editor, no dependency on removed HA components', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  REMOVED_OR_CHANGED.forEach(tag => {
    it(`renders no <${tag}> in preset mode`, async () => {
      const el = await renderEditor();
      expect(el.shadowRoot.querySelectorAll(tag).length).toBe(0);
    });

    it(`renders no <${tag}> in freeform mode`, async () => {
      const el = await renderEditor({ freeform: true });
      expect(el.shadowRoot.querySelectorAll(tag).length).toBe(0);
    });
  });

  it('renders text fields as native inputs', async () => {
    const el = await renderEditor();
    const inputs = el.shadowRoot.querySelectorAll('input[type="text"]');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('renders the Mode dropdown as a native select with both modes', async () => {
    const el = await renderEditor({ freeform: true });
    const selects = [...el.shadowRoot.querySelectorAll('select')];
    const mode = selects.find(
      s =>
        [...s.options].some(o => o.value === 'centric') &&
        [...s.options].some(o => o.value === 'heatflow'),
    );
    expect(mode, 'no native select offering centric and heatflow').toBeTruthy();
  });
});

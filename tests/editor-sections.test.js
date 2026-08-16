import { describe, it, expect, beforeEach } from 'vitest';
import '../src/editor/sensor-editor.js';
import { POOL_SENSORS } from '../../pool-monitor/src/sensors.js';

// The editor showed eighteen fields per sensor at the same visual weight while
// only `entity` is required, and three options shipped in 2.14.0 were not in it
// at all: `attribute`, `limits` and `direction`. Users had to drop to YAML for
// exactly the features we had just answered their issues with.

const build = async (sensors, opts = {}) => {
  const el = document.createElement('monitor-sensor-editor');
  el.hass = { language: 'en', states: {}, entities: {} };
  el.registry = opts.registry ?? POOL_SENSORS;
  el.freeform = opts.freeform ?? false;
  el.sensors = sensors;
  document.body.appendChild(el);
  await el.updateComplete;
  // the sensor row is itself collapsed; open it so its fields exist
  el.shadowRoot.querySelector('.sensor-row-header')?.click();
  await el.updateComplete;
  return el;
};

const text = el => (el.shadowRoot?.textContent ?? '').replace(/\s+/g, ' ');
const sections = el => [...(el.shadowRoot?.querySelectorAll('details.sensor-section') ?? [])];
const summaryOf = (el, name) =>
  sections(el).find(d => d.querySelector('.sensor-section-name')?.textContent.trim() === name);

beforeEach(() => {
  document.body.replaceChildren();
});

describe('what greets you when a sensor is added', () => {
  it('shows the entity picker and nothing else expanded', async () => {
    const el = await build({ ph: { entity: 'sensor.pool_ph' } });
    const open = sections(el).filter(d => d.open);
    expect(open).toEqual([]);
  });

  it('marks the entity as required, in words rather than by a symbol', async () => {
    const el = await build({ ph: { entity: '' } });
    expect(text(el)).toContain('required');
    expect(text(el)).toContain('The only field you have to fill');
  });

  it('says nothing about a required field once it is filled', async () => {
    const el = await build({ ph: { entity: 'sensor.pool_ph' } });
    expect(text(el)).not.toContain('The only field you have to fill');
  });

  it('puts the error on the field, not in a panel naming an array index', async () => {
    const el = await build({ ph: { entity: '' } });
    expect(el.shadowRoot.querySelector('.sensor-required.missing .sensor-error')).toBeTruthy();
    expect(text(el)).not.toContain('ph[0]');
  });
});

describe('the three options that were only reachable from YAML', () => {
  it('offers the attribute, next to the entity and not in a section of its own', async () => {
    const el = await build({ ph: { entity: 'sensor.pool_ph' } });
    const labels = [...el.shadowRoot.querySelectorAll('.text-field-label')].map(n =>
      n.textContent.trim(),
    );
    expect(labels).toContain('Attribute');
    expect(
      sections(el).map(d => d.querySelector('.sensor-section-name').textContent.trim()),
    ).not.toContain('Attribute');
  });

  it('offers explicit thresholds and a reading direction', async () => {
    const el = await build({ ph: { entity: 'sensor.pool_ph', limits: [1, 2, 3, 4] } });
    const scale = summaryOf(el, 'Scale');
    scale.open = true;
    await el.updateComplete;
    expect(text(el)).toContain('Boundary 1');
    expect(text(el)).toContain('Lower is better');
  });

  it('hides the setpoint fields when thresholds are used, because they are ignored', async () => {
    const withLimits = await build({ ph: { entity: 'sensor.x', limits: [1, 2, 3, 4] } });
    const withSetpoint = await build({ ph: { entity: 'sensor.x' } });
    expect(text(withLimits)).not.toContain('Step low');
    expect(text(withSetpoint)).toContain('Step low');
  });
});

describe('a closed section says whether anything needs doing', () => {
  it('shows the inherited value when nothing was overridden', async () => {
    const el = await build({ ph: { entity: 'sensor.pool_ph' } });
    expect(summaryOf(el, 'Scale').textContent).toContain('inherited');
  });

  it('counts what was changed instead', async () => {
    const el = await build({ ph: { entity: 'sensor.pool_ph', name: 'A', unit: 'B' } });
    expect(summaryOf(el, 'Content').textContent).toContain('2 changed');
  });

  it('announces explicit thresholds rather than an inherited setpoint', async () => {
    const el = await build({ ph: { entity: 'sensor.x', limits: [1, 2, 3, 4] } });
    expect(summaryOf(el, 'Scale').textContent).toContain('Explicit thresholds');
  });
});

// Restored after the restructure dropped them. Without the domain lists the
// availability picker offers every entity in the house.
describe('the pickers stay narrowed to the domains that make sense', () => {
  it('availability accepts only things that can be on or off', async () => {
    const el = await build({ ph: { entity: 'sensor.pool_ph' } });
    summaryOf(el, 'Linked entities').open = true;
    await el.updateComplete;
    const pickers = [...el.shadowRoot.querySelectorAll('ha-entity-picker')];
    const availability = pickers.find(p => (p.label || '').startsWith('Availability'));
    expect(availability.includeDomains).toEqual(['binary_sensor', 'switch', 'input_boolean']);
  });

  it('setpoint and min limit accept only numbers', async () => {
    const el = await build({ ph: { entity: 'sensor.pool_ph' } });
    summaryOf(el, 'Linked entities').open = true;
    await el.updateComplete;
    const pickers = [...el.shadowRoot.querySelectorAll('ha-entity-picker')];
    for (const prefix of ['Setpoint entity', 'Min limit entity']) {
      const p = pickers.find(x => (x.label || '').startsWith(prefix));
      expect(p.includeDomains, prefix).toEqual(['input_number', 'number', 'sensor']);
    }
  });
});

// The Mode dropdown was lost in the restructure and caught by the existing
// suite. It only applies where no preset already decides it.
describe('the centric and heatflow modes survive the restructure', () => {
  it('is offered when the sensor has no preset behind it', async () => {
    const el = await build({ whatever: { entity: 'sensor.x' } }, { registry: {}, freeform: true });
    const selects = [...el.shadowRoot.querySelectorAll('select')];
    const mode = selects.find(s => [...s.options].some(o => o.value === 'heatflow'));
    expect(mode).toBeTruthy();
  });

  it('is not offered when a preset already decides it', async () => {
    const el = await build({ ph: { entity: 'sensor.pool_ph' } });
    const selects = [...el.shadowRoot.querySelectorAll('select')];
    expect(selects.some(s => [...s.options].some(o => o.value === 'heatflow'))).toBe(false);
  });
});

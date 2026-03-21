import { describe, test, expect } from 'vitest';
import { styles } from '../src/styles/styles.js';
import { MonitorCardBase } from '../src/card-base.js';

describe('Card Height & Layout (issue #74)', () => {
  describe('CSS styles', () => {
    const cssText = styles.cssText;

    test('should NOT use float in styles', () => {
      expect(cssText).not.toMatch(/float\s*:/);
    });

    test('should have overflow: hidden on :host', () => {
      const hostMatch = cssText.match(/:host\s*\{([^}]+)\}/);
      expect(hostMatch).not.toBeNull();
      expect(hostMatch[1]).toMatch(/overflow\s*:\s*hidden/);
    });

    test('should define section-row as flex container', () => {
      expect(cssText).toMatch(/\.section-row\s*\{[^}]*display\s*:\s*flex/);
    });
  });

  describe('getCardSize()', () => {
    // Use _config directly to bypass LitElement @property setter (requestUpdate)
    function makeCard(config) {
      const card = Object.create(MonitorCardBase.prototype);
      Object.defineProperty(card, 'config', { value: config, writable: true, configurable: true });
      return card;
    }

    test('should exist as a method on MonitorCardBase', () => {
      expect(typeof MonitorCardBase.prototype.getCardSize).toBe('function');
    });

    test('should return 3 when no sensors configured', () => {
      const card = makeCard({});
      expect(card.getCardSize()).toBe(3);
    });

    test('should return titleRows + 3 per sensor in normal mode', () => {
      const card = makeCard({
        title: 'Pool',
        display: { compact: false },
        sensors: { temperature: { entity: 'sensor.temp' } },
      });
      expect(card.getCardSize()).toBe(4); // 1 title + 1*3
    });

    test('should scale with multiple sensors', () => {
      const card = makeCard({
        display: { compact: false },
        sensors: {
          temperature: { entity: 'sensor.temp' },
          ph: { entity: 'sensor.ph' },
          orp: { entity: 'sensor.orp' },
        },
      });
      expect(card.getCardSize()).toBe(9); // 0 title + 3*3
    });

    test('should return titleRows + 2 per sensor in compact mode', () => {
      const card = makeCard({
        title: 'Pool',
        display: { compact: true },
        sensors: { temperature: { entity: 'sensor.temp' } },
      });
      expect(card.getCardSize()).toBe(3); // 1 title + 1*2
    });

    test('should handle array sensors', () => {
      const card = makeCard({
        display: { compact: false },
        sensors: {
          temperature: [{ entity: 'sensor.temp1' }, { entity: 'sensor.temp2' }],
        },
      });
      expect(card.getCardSize()).toBe(6); // 0 title + 2*3
    });
  });

  describe('getGridOptions()', () => {
    function makeCard(config) {
      const card = Object.create(MonitorCardBase.prototype);
      Object.defineProperty(card, 'config', { value: config, writable: true, configurable: true });
      return card;
    }

    test('should exist as a method on MonitorCardBase', () => {
      expect(typeof MonitorCardBase.prototype.getGridOptions).toBe('function');
    });

    test('should return valid grid options object', () => {
      const card = makeCard({
        display: { compact: false },
        sensors: { temperature: { entity: 'sensor.temp' } },
      });
      const options = card.getGridOptions();
      expect(options).toHaveProperty('rows');
      expect(options).toHaveProperty('min_rows');
      expect(options).toHaveProperty('columns', 12);
      expect(options).toHaveProperty('min_columns', 6);
      expect(options.rows).toBeGreaterThanOrEqual(1);
      expect(options.min_rows).toBeGreaterThanOrEqual(2);
    });
  });
});

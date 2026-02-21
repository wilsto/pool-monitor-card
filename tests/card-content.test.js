import { describe, test, expect, vi, beforeEach } from 'vitest';
import { cardContent } from '../src/components/card-content.js';

/**
 * Helper to extract string content from Lit TemplateResult.
 * Returns both static parts and flattened values for inspection.
 */
function templateParts(templateResult) {
  if (!templateResult) return { statics: '', values: [] };
  if (typeof templateResult === 'string') return { statics: templateResult, values: [] };
  const statics = templateResult.strings ? templateResult.strings.join('{{}}') : '';
  const values = templateResult.values || [];
  return { statics, values };
}

describe('cardContent', () => {
  describe('generateTitle', () => {
    test('should generate title when config.title is set', () => {
      const config = { title: 'My Pool' };
      const result = cardContent.generateTitle(config);
      // The outer template wraps an inner template; check values contain the title template
      const { values } = templateParts(result);
      // The inner template should contain pool-monitor-title in its statics
      const inner = values.find(v => v && v.strings);
      expect(inner).toBeDefined();
      const innerStatics = inner.strings.join('');
      expect(innerStatics).toContain('pool-monitor-title');
    });

    test('should generate empty content when config.title is undefined', () => {
      const config = {};
      const result = cardContent.generateTitle(config);
      const { statics } = templateParts(result);
      expect(statics).not.toContain('pool-monitor-title');
    });
  });

  describe('generateBody', () => {
    const defaultConfig = {
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

    const defaultData = {
      name: 'temperature',
      entity: 'sensor.pool_temp',
      color: '#00b894',
      pct_marker: 50,
      value: 27,
      unit: '°C',
      state: 'Ideal',
      side_align: 'left',
      pct_state_step: 55,
      hide_icon: false,
      is_mdi: true,
      mdi_icon: 'mdi:thermometer',
      mode: 'heatflow',
      setpoint_class: ['25', '26', '27', '28', '29'],
      pct_min: 48,
      pct_max: 52,
      pct_cursor: 50,
      title: 'Temperature',
      last_updated: 'just now',
    };

    test('should return warning when data is null', () => {
      const result = cardContent.generateBody(defaultConfig, null);
      const { statics } = templateParts(result);
      expect(statics).toContain('warning-message');
    });

    test('should render body with section class', () => {
      const result = cardContent.generateBody(defaultConfig, defaultData);
      const { statics } = templateParts(result);
      expect(statics).toContain('class="section"');
      expect(statics).toContain('pool-monitor-container');
    });

    test('should include icon container when hide_icon is false', () => {
      const result = cardContent.generateBody(defaultConfig, defaultData);
      const { statics, values } = templateParts(result);
      // The icon template is in the values (conditional)
      const hasIconTemplate = values.some(
        v => v && v.strings && v.strings.join('').includes('pool-monitor-entity-img'),
      );
      expect(hasIconTemplate).toBe(true);
    });

    test('should not include icon container when hide_icon is true', () => {
      const data = { ...defaultData, hide_icon: true };
      const result = cardContent.generateBody(defaultConfig, data);
      const { values } = templateParts(result);
      // When hide_icon is true, the conditional returns '' (empty string), not a template
      const hasIconTemplate = values.some(
        v => v && v.strings && v.strings.join('').includes('pool-monitor-entity-img'),
      );
      expect(hasIconTemplate).toBe(false);
    });

    test('should render gradient template when gradient is true', () => {
      const result = cardContent.generateBody(defaultConfig, defaultData);
      const { values } = templateParts(result);
      const hasGradient = values.some(
        v => v && v.strings && v.strings.join('').includes('progress-bar-child'),
      );
      expect(hasGradient).toBe(true);
    });

    test('should render grid template when gradient is false', () => {
      const config = { ...defaultConfig, display: { ...defaultConfig.display, gradient: false } };
      const result = cardContent.generateBody(config, defaultData);
      const { values } = templateParts(result);
      const hasGrid = values.some(
        v => v && v.strings && v.strings.join('').includes('grid-container'),
      );
      expect(hasGrid).toBe(true);
    });

    test('should render setpoint values container', () => {
      const result = cardContent.generateBody(defaultConfig, defaultData);
      const { statics } = templateParts(result);
      expect(statics).toContain('pool-monitor-container-values');
    });

    test('should render min/max markers when different from cursor', () => {
      const data = { ...defaultData, pct_min: 30, pct_max: 70, pct_cursor: 50 };
      const result = cardContent.generateBody(defaultConfig, data);
      const { values } = templateParts(result);
      const hasMarker = values.some(
        v => v && v.strings && v.strings.join('').includes('cursor-text'),
      );
      expect(hasMarker).toBe(true);
    });
  });

  describe('generateCompactBody', () => {
    const defaultConfig = {
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

    const defaultData = {
      name: 'ph',
      entity: 'sensor.pool_ph',
      color: '#00b894',
      pct_marker: 50,
      value: 7.2,
      unit: 'pH',
      state: 'Ideal',
      side_align: 'left',
      pct_state_step: 55,
      hide_icon: false,
      is_mdi: true,
      mdi_icon: 'mdi:flask',
      mode: 'centric',
      setpoint_class: ['6.8', '7.0', '7.2', '7.4', '7.6'],
      separator: '-',
      title: 'pH',
      pct_min: 48,
      pct_max: 52,
      pct_cursor: 50,
    };

    test('should return warning when data is null', () => {
      const result = cardContent.generateCompactBody(defaultConfig, null);
      const { statics } = templateParts(result);
      expect(statics).toContain('warning-message');
    });

    test('should render compact section', () => {
      const result = cardContent.generateCompactBody(defaultConfig, defaultData);
      const { statics } = templateParts(result);
      expect(statics).toContain('section-compact');
    });

    test('should include cursor-text in compact display', () => {
      const result = cardContent.generateCompactBody(defaultConfig, defaultData);
      const { statics } = templateParts(result);
      expect(statics).toContain('cursor-text');
    });
  });

  describe('_moreinfo', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
    });

    test('should dispatch hass-more-info event when home-assistant element exists', () => {
      const mockHA = document.createElement('home-assistant');
      document.body.appendChild(mockHA);
      const spy = vi.fn();
      mockHA.addEventListener('hass-more-info', spy);

      cardContent._moreinfo('sensor.pool_temp');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0].detail).toEqual({ entityId: 'sensor.pool_temp' });
    });

    test('should not throw when home-assistant element does not exist', () => {
      expect(() => cardContent._moreinfo('sensor.pool_temp')).not.toThrow();
    });
  });
});

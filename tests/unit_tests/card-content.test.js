import './setup.js';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { cardContent } from '../../src/components/card-content.js';
import { getDisplayConfig, getColorConfig, mockSensorConfigs, mockSensorStates } from './setup.js';
import { PoolMonitorCard } from '../../src/pool_monitor_card.js';

describe('Card Content', () => {
  let card;
  let mockData;

  beforeEach(() => {
    card = new PoolMonitorCard();
    card.setConfig({
      sensors: mockSensorConfigs,
      display: getDisplayConfig(),
      colors: getColorConfig(),
    });
    card.hass = { states: mockSensorStates };

    // Calculate mockData using the same method as in the main component
    const sensor = mockSensorConfigs.temperature;
    mockData = card.calculateData(
      'temperature',
      sensor.title,
      sensor.entity,
      sensor.min,
      sensor.max,
      sensor.setpoint,
      sensor.step,
      sensor.unit,
      sensor.icon,
      sensor.image_url,
      sensor.mode,
      sensor.min_limit,
      sensor.override_value,
      sensor.override,
      sensor.invalid,
    );
  });

  const mockConfig = {
    title: 'Pool Monitor',
    display: getDisplayConfig(),
    colors: getColorConfig(),
  };

  describe('generateTitle', () => {
    it('should render title when provided', () => {
      const result = cardContent.generateTitle(mockConfig);
      const htmlString = String(result);
      expect(htmlString).toContain('class="pool-monitor-title"');
      expect(htmlString).toContain(mockConfig.title);
    });

    it('should not render title when not provided', () => {
      const result = cardContent.generateTitle({});
      const htmlString = String(result);
      expect(htmlString).toBe('');
    });
  });

  describe('generateBody', () => {
    it('should show warning message when no data provided', () => {
      const result = cardContent.generateBody(mockConfig, null);
      const htmlString = String(result);
      expect(htmlString).toContain('warning-message');
      expect(htmlString).toContain('No sensor data available');
    });

    it('should render full body with valid data', () => {
      const result = cardContent.generateBody(mockConfig, mockData);
      const htmlString = String(result);
      expect(htmlString).toContain(mockData.value);
      expect(htmlString).toContain(mockData.unit);
      expect(htmlString).toContain(mockData.state);
      expect(htmlString).toContain('section');
    });

    it('should render MDI icon when is_mdi is true', () => {
      const dataWithMdi = { ...mockData, is_mdi: true, mdi_icon: 'mdi:thermometer' };
      const result = cardContent.generateBody(mockConfig, dataWithMdi);
      const htmlString = String(result);
      expect(htmlString).toContain('ha-icon');
      expect(htmlString).toContain('mdi:thermometer');
    });

    it('should render image when is_mdi is false', () => {
      const dataWithImg = { ...mockData, is_mdi: false, img_src: 'path/to/image.png' };
      const result = cardContent.generateBody(mockConfig, dataWithImg);
      const htmlString = String(result);
      expect(htmlString).toContain('<img');
      expect(htmlString).toContain('path/to/image.png');
    });

    it('should not render icon when hide_icon is true', () => {
      const dataNoIcon = { ...mockData, hide_icon: true };
      const result = cardContent.generateBody(mockConfig, dataNoIcon);
      const htmlString = String(result);
      expect(htmlString).not.toContain('ha-icon');
      expect(htmlString).not.toContain('<img');
    });

    it('should render gradient when display.gradient is true', () => {
      const configWithGradient = {
        ...mockConfig,
        display: { ...mockConfig.display, gradient: true },
      };
      const result = cardContent.generateBody(configWithGradient, mockData);
      const htmlString = String(result);
      expect(htmlString).toContain('linear-gradient');
    });

    it('should render min/max markers when values differ from cursor', () => {
      const result = cardContent.generateBody(mockConfig, mockData);
      const htmlString = String(result);
      expect(htmlString).toContain('cursor-text');
    });
  });

  describe('generateCompactBody', () => {
    it('should show warning message when no data provided', () => {
      const result = cardContent.generateCompactBody(mockConfig, null);
      const htmlString = String(result);
      expect(htmlString).toContain('warning-message');
      expect(htmlString).toContain('No sensor data available');
    });

    it('should render full body with valid data', () => {
      const result = cardContent.generateCompactBody(mockConfig, mockData);
      const htmlString = String(result);
      expect(htmlString).toContain(mockData.value);
      expect(htmlString).toContain(mockData.unit);
      expect(htmlString).toContain(mockData.state);
      expect(htmlString).toContain('section-compact');
    });

    it('should render MDI icon when is_mdi is true', () => {
      const dataWithMdi = { ...mockData, is_mdi: true, mdi_icon: 'mdi:thermometer' };
      const result = cardContent.generateCompactBody(mockConfig, dataWithMdi);
      const htmlString = String(result);
      expect(htmlString).toContain('ha-icon');
      expect(htmlString).toContain('mdi:thermometer');
      expect(htmlString).toContain('width: 24px'); // Vérification spécifique au mode compact
    });

    it('should render image when is_mdi is false', () => {
      const dataWithImg = { ...mockData, is_mdi: false, img_src: 'path/to/image.png' };
      const result = cardContent.generateCompactBody(mockConfig, dataWithImg);
      const htmlString = String(result);
      expect(htmlString).toContain('<img');
      expect(htmlString).toContain('path/to/image.png');
      expect(htmlString).toContain('width: 24px'); // Vérification spécifique au mode compact
    });

    it('should not render icon when hide_icon is true', () => {
      const dataNoIcon = { ...mockData, hide_icon: true };
      const result = cardContent.generateCompactBody(mockConfig, dataNoIcon);
      const htmlString = String(result);
      expect(htmlString).not.toContain('ha-icon');
      expect(htmlString).not.toContain('<img');
    });

    it('should render gradient when display.gradient is true', () => {
      const configWithGradient = {
        ...mockConfig,
        display: { ...mockConfig.display, gradient: true },
      };
      const result = cardContent.generateCompactBody(configWithGradient, mockData);
      const htmlString = String(result);
      expect(htmlString).toContain('linear-gradient');
    });

    it('should handle heatflow mode correctly', () => {
      const heatflowData = { ...mockData, mode: 'heatflow' };
      const result = cardContent.generateCompactBody(mockConfig, heatflowData);
      const htmlString = String(result);
      expect(htmlString).toContain('#00BFFF'); // cool
      expect(htmlString).toContain('#fdcb6e'); // low
      expect(htmlString).toContain('#e17055'); // warn
      expect(htmlString).toContain('15%'); // Position du gradient
      expect(htmlString).toContain('50%'); // Position du gradient
      expect(htmlString).toContain('85%'); // Position du gradient
    });
  });

  describe('_moreinfo', () => {
    beforeEach(() => {
      // Mock du DOM pour Home Assistant
      const mockHomeAssistant = {
        dispatchEvent: vi.fn(),
      };
      document.querySelector = vi.fn().mockReturnValue(mockHomeAssistant);
    });

    it('should dispatch custom event when called', () => {
      cardContent._moreinfo('sensor.pool_temperature');

      expect(document.querySelector).toHaveBeenCalledWith('home-assistant');
      expect(document.querySelector('home-assistant').dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'hass-more-info',
          detail: { entityId: 'sensor.pool_temperature' },
        }),
      );
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });
  });
});

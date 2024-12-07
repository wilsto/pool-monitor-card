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
    });

    it('should render MDI icon when is_mdi is true', () => {
      const mockDataWithMDI = {
        ...mockData,
        is_mdi: true,
        mdi_icon: 'mdi:test-icon'
      };
      const result = cardContent.generateBody(mockConfig, mockDataWithMDI);
      const htmlString = String(result);
      expect(htmlString).toContain('ha-icon');
      expect(htmlString).toContain('mdi:test-icon');
    });

    it('should render image when is_mdi is false', () => {
      const mockDataWithImage = {
        ...mockData,
        is_mdi: false,
        img_src: 'test-image.png'
      };
      const result = cardContent.generateBody(mockConfig, mockDataWithImage);
      const htmlString = String(result);
      expect(htmlString).toContain('img');
      expect(htmlString).toContain('test-image.png');
    });

    it('should not render icon when hide_icon is true', () => {
      const mockDataHideIcon = {
        ...mockData,
        hide_icon: true
      };
      const result = cardContent.generateBody(mockConfig, mockDataHideIcon);
      const htmlString = String(result);
      expect(htmlString).not.toContain('ha-icon');
      expect(htmlString).not.toContain('img');
    });

    it('should render gradient when display.gradient is true', () => {
      const mockConfigWithGradient = {
        ...mockConfig,
        display: {
          ...mockConfig.display,
          gradient: true
        }
      };
      const result = cardContent.generateBody(mockConfigWithGradient, mockData);
      const htmlString = String(result);
      expect(htmlString).toContain('linear-gradient');
    });

    it('should render grid when display.gradient is false', () => {
      const mockConfigWithoutGradient = {
        ...mockConfig,
        display: {
          ...mockConfig.display,
          gradient: false
        }
      };
      const result = cardContent.generateBody(mockConfigWithoutGradient, mockData);
      const htmlString = String(result);
      expect(htmlString).not.toContain('linear-gradient');
      expect(htmlString).toContain('grid-item');
    });

    it('should render min/max values when provided', () => {
      const result = cardContent.generateBody(mockConfig, mockData);
      const htmlString = String(result);
      expect(htmlString).toContain(mockData.pct_min);
      expect(htmlString).toContain(mockData.pct_max);
    });

    it('should render setpoint classes correctly', () => {
      const result = cardContent.generateBody(mockConfig, mockData);
      const htmlString = String(result);
      mockData.setpoint_class.forEach(value => {
        expect(htmlString).toContain(value);
      });
    });

    it('should render cursor with correct side alignment', () => {
      const result = cardContent.generateBody(mockConfig, mockData);
      const htmlString = String(result);
      expect(htmlString).toContain(`text-align:${mockData.side_align}`);
    });

    it('should render heatflow mode gradient correctly', () => {
      const mockDataHeatflow = {
        ...mockData,
        mode: 'heatflow'
      };
      const result = cardContent.generateBody(mockConfig, mockDataHeatflow);
      const htmlString = String(result);
      expect(htmlString).toContain('linear-gradient');
    });

    it('should render normal mode gradient correctly', () => {
      const mockDataNormal = {
        ...mockData,
        mode: 'normal'
      };
      const result = cardContent.generateBody(mockConfig, mockDataNormal);
      const htmlString = String(result);
      expect(htmlString).toContain('linear-gradient');
    });

    it('should render min/max markers with correct styling', () => {
      const mockDataWithMarkers = {
        ...mockData,
        pct_min: 20,
        pct_max: 80,
        pct_cursor: 50
      };
      const result = cardContent.generateBody(mockConfig, mockDataWithMarkers);
      const htmlString = String(result);
      expect(htmlString).toContain('cursor-text');
      expect(htmlString).toContain(`${mockDataWithMarkers.pct_min}%`);
      expect(htmlString).toContain(`${mockDataWithMarkers.pct_max}%`);
    });

    it('should not render min/max markers when equal to cursor', () => {
      const mockDataEqualMarkers = {
        ...mockData,
        pct_min: 50,
        pct_max: 50,
        pct_cursor: 50
      };
      const result = cardContent.generateBody(mockConfig, mockDataEqualMarkers);
      const htmlString = String(result);
      expect(htmlString.match(/cursor-text/g) || []).toHaveLength(0);
    });
  });

  describe('generateCompactBody', () => {
    it('should show warning message when no data provided', () => {
      const result = cardContent.generateCompactBody(mockConfig, null);
      const htmlString = String(result);
      expect(htmlString).toContain('warning-message');
      expect(htmlString).toContain('No sensor data available');
    });

    it('should render compact mode with all elements', () => {
      const result = cardContent.generateCompactBody(mockConfig, mockData);
      const htmlString = String(result);
      
      // Vérifier la présence des éléments structurels
      expect(htmlString).toContain('pool-monitor-container');
      expect(htmlString).toContain('pool-monitor-container-values');
      
      // Vérifier les données affichées
      expect(htmlString).toContain(mockData.title);
      expect(htmlString).toContain(mockData.value);
      expect(htmlString).toContain(mockData.unit);
    });

    it('should render compact mode with gradient', () => {
      const mockConfigWithGradient = {
        ...mockConfig,
        display: {
          ...mockConfig.display,
          gradient: true
        }
      };
      
      const result = cardContent.generateCompactBody(mockConfigWithGradient, mockData);
      const htmlString = String(result);
      
      // Vérifier les éléments de gradient
      expect(htmlString).toContain('background-color');
      expect(htmlString).toContain(mockConfig.colors.normal);
    });

    it('should handle min/max markers in compact mode', () => {
      const mockDataWithMarkers = {
        ...mockData,
        pct_min: 20,
        pct_max: 80
      };
      
      const result = cardContent.generateCompactBody(mockConfig, mockDataWithMarkers);
      const htmlString = String(result);
      
      // Vérifier les marqueurs min/max
      expect(htmlString).toContain('cursor-text');
      expect(htmlString).toContain(`${mockDataWithMarkers.pct_min}%`);
      expect(htmlString).toContain(`${mockDataWithMarkers.pct_max}%`);
    });

    it('should render MDI icon when is_mdi is true', () => {
      const dataWithMdi = { ...mockData, is_mdi: true, mdi_icon: 'mdi:thermometer' };
      const result = cardContent.generateCompactBody(mockConfig, dataWithMdi);
      const htmlString = String(result);
      expect(htmlString).toContain('ha-icon');
      expect(htmlString).toContain('mdi:thermometer');
      expect(htmlString).toContain('width: 24px');
    });

    it('should render image when is_mdi is false', () => {
      const dataWithImg = { ...mockData, is_mdi: false, img_src: 'path/to/image.png' };
      const result = cardContent.generateCompactBody(mockConfig, dataWithImg);
      const htmlString = String(result);
      expect(htmlString).toContain('<img');
      expect(htmlString).toContain('path/to/image.png');
      expect(htmlString).toContain('width: 24px');
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

    it('should render grid when display.gradient is false', () => {
      const configWithoutGradient = {
        ...mockConfig,
        display: { ...mockConfig.display, gradient: false },
      };
      const result = cardContent.generateCompactBody(configWithoutGradient, mockData);
      const htmlString = String(result);
      expect(htmlString).toContain('grid-container');
      expect(htmlString).toContain('grid-item');
      expect(htmlString).toContain('item-row');
    });

    it('should handle heatflow mode correctly', () => {
      const heatflowData = { ...mockData, mode: 'heatflow' };
      const configWithGradient = {
        ...mockConfig,
        display: { ...mockConfig.display, gradient: true },
      };
      const result = cardContent.generateCompactBody(configWithGradient, heatflowData);
      const htmlString = String(result);
      expect(htmlString).toContain('15%');
      expect(htmlString).toContain('50%');
      expect(htmlString).toContain('85%');
    });

    it('should handle normal mode correctly', () => {
      const normalData = { ...mockData, mode: 'normal' };
      const configWithGradient = {
        ...mockConfig,
        display: { ...mockConfig.display, gradient: true },
      };
      const result = cardContent.generateCompactBody(configWithGradient, normalData);
      const htmlString = String(result);
      expect(htmlString).toContain('5%');
      expect(htmlString).toContain('30%');
      expect(htmlString).toContain('70%');
      expect(htmlString).toContain('95%');
    });

    it('should render cursor with correct side alignment in compact mode', () => {
      const dataWithCursor = {
        ...mockData,
        side_align: 'right',
        pct_cursor: 75
      };
      const result = cardContent.generateCompactBody(mockConfig, dataWithCursor);
      const htmlString = String(result);
      expect(htmlString).toContain('border-right: 5px solid');
      expect(htmlString).toContain('text-align:right');
      expect(htmlString).toContain('right: 75%');
    });

    it('should handle min/max markers equal to cursor in compact mode', () => {
      const dataWithEqualMarkers = {
        ...mockData,
        pct_min: 50,
        pct_max: 50,
        pct_cursor: 50,
        side_align: 'left',
        title: 'Test Title',
        value: '25',
        unit: '°C',
        separator: '-',
        state: 'Normal'
      };
      const result = cardContent.generateCompactBody(mockConfig, dataWithEqualMarkers);
      const htmlString = String(result);
      
      // Il y a toujours un cursor-text pour le curseur principal
      expect(htmlString.match(/cursor-text/g)).toHaveLength(1);
      
      // Vérifier que les marqueurs min/max ne sont pas rendus
      expect(htmlString).not.toContain('border-left: 2px solid');
      expect(htmlString).not.toContain('border-right: 2px solid');
      
      // Vérifier que les autres éléments sont correctement rendus
      expect(htmlString).toContain('Test Title');
      expect(htmlString).toContain('25');
      expect(htmlString).toContain('°C');
      expect(htmlString).toContain('-');
      expect(htmlString).toContain('Normal');
    });

    it('should handle min/max markers different from cursor in compact mode', () => {
      const dataWithDifferentMarkers = {
        ...mockData,
        pct_min: 30,
        pct_max: 70,
        pct_cursor: 50,
        side_align: 'left',
        title: 'Test Title',
        value: '25',
        unit: '°C',
        separator: '-',
        state: 'Normal'
      };
      const result = cardContent.generateCompactBody(mockConfig, dataWithDifferentMarkers);
      const htmlString = String(result);
      
      // Un cursor-text pour le curseur principal et deux pour min/max
      expect(htmlString.match(/cursor-text/g)).toHaveLength(3);
      
      // Vérifier les styles des marqueurs min/max
      expect(htmlString).toContain('border-left: 2px solid');
      expect(htmlString).toContain('border-right: 2px solid');
      expect(htmlString).toContain('left: 30%');
      expect(htmlString).toContain('left: 70%');
    });
  });

  describe('_moreinfo', () => {
    beforeEach(() => {
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
          detail: {
            entityId: 'sensor.pool_temperature'
          }
        })
      );
    });

    it('should handle null home-assistant element', () => {
      document.querySelector = vi.fn().mockReturnValue(null);
      expect(() => cardContent._moreinfo('sensor.pool_temperature')).not.toThrow();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });
  });
});

import { describe, it, expect, beforeEach, vi } from 'vitest';
import './setup.js';
import { cardContent } from '../../src/components/card-content.js';
import { PoolMonitorCard } from '../../src/pool_monitor_card.js';
import { mockSensorConfigs, mockSensorStates, getDisplayConfig, getColorConfig } from './setup.js';

describe('Card Content', () => {
  let mockConfig;
  let mockSensorData;

  beforeEach(() => {
    mockConfig = {
      title: 'Pool Monitor',
      display: getDisplayConfig(),
      colors: getColorConfig(),
      sensors: {
        temperature: mockSensorConfigs.temperature,
        ph: mockSensorConfigs.ph
      }
    };

    // Create a mock PoolMonitorCard instance to use calculateData
    const poolCard = new PoolMonitorCard();
    poolCard.setConfig(mockConfig);
    poolCard.hass = {
      states: mockSensorStates
    };

    // Calculate sensor data using the card's calculateData method
    const sensorData = poolCard.calculateData(
      'temperature',
      mockSensorConfigs.temperature.name,
      mockSensorConfigs.temperature.entity,
      mockSensorConfigs.temperature.min,
      mockSensorConfigs.temperature.max,
      mockSensorConfigs.temperature.setpoint,
      mockSensorConfigs.temperature.step,
      mockSensorConfigs.temperature.unit,
      undefined, // icon from getSensorConfig
      null, // image_url
      mockSensorConfigs.temperature.mode,
      mockSensorConfigs.temperature.min_limit,
      null, // override_value
      false, // override
      false // invalid
    );

    mockSensorData = sensorData;
  });

  describe('Title Generation', () => {
    it('should generate title when showTitle is true', () => {
      const result = cardContent.generateTitle(mockConfig);
      expect(result).toContain(mockConfig.title);
    });

    it('should not generate title when showTitle is false', () => {
      mockConfig.display.showTitle = false;
      const result = cardContent.generateTitle(mockConfig);
      expect(result).toBe('');
    });
  });

  describe('Body Generation', () => {
    const baseConfig = {
      display: {
        show_units: true,
        gradient: true
      },
      colors: {
        warn: '#ff0000',
        low: '#00ff00',
        cool: '#0000ff'
      }
    };

    const baseData = {
      name: 'temperature',
      entity: 'sensor.pool_temp',
      value: '25',
      unit: '°C',
      color: '#ff0000',
      pct_marker: 50,
      side_align: 'left',
      pct_state_step: 50,
      state: 'normal',
      is_mdi: true,
      mdi_icon: 'mdi:thermometer',
      mode: 'normal',
      setpoint_class: ['Low', 'Normal', 'High'],
      pct_min: 20,
      pct_max: 80,
      pct: 50
    };

    it('should show warning when no data is available', () => {
      const result = cardContent.generateBody(baseConfig, null);
      expect(result).toContain('warning-message');
      expect(result).toContain('No sensor data available');
    });

    it('should render sensor data with units', () => {
      const result = cardContent.generateBody(baseConfig, baseData);
      expect(result).toContain('25 °C');
      expect(result).toContain('mdi:thermometer');
    });

    it('should hide units when configured', () => {
      const configWithoutUnits = {
        ...baseConfig,
        display: {
          ...baseConfig.display,
          show_units: false
        }
      };
      const result = cardContent.generateBody(configWithoutUnits, baseData);
      expect(result).toContain('25');
      expect(result).not.toContain('25 °C');
    });

    it('should render custom image when not using MDI icon', () => {
      const dataWithCustomImage = {
        ...baseData,
        is_mdi: false,
        img_src: '/custom-image.png'
      };
      const result = cardContent.generateBody(baseConfig, dataWithCustomImage);
      expect(result).toContain('/custom-image.png');
      expect(result).not.toContain('mdi:');
    });

    it('should handle heatflow mode', () => {
      const dataWithHeatflow = {
        ...baseData,
        mode: 'heatflow'
      };
      const result = cardContent.generateBody(baseConfig, dataWithHeatflow);
      expect(result).toContain(baseConfig.colors.cool);
      expect(result).toContain(baseConfig.colors.low);
      expect(result).toContain(baseConfig.colors.warn);
    });

    it('should display setpoint classes', () => {
      const result = cardContent.generateBody(baseConfig, baseData);
      expect(result).toContain('Low');
      expect(result).toContain('Normal');
      expect(result).toContain('High');
    });
  });

  describe('Compact Body Generation', () => {
    it('should generate compact body with sensor data', () => {
      const result = cardContent.generateCompactBody(mockConfig, mockSensorData);
      expect(result).toContain(mockSensorData.value);
      expect(result).toContain(mockSensorData.unit);
    });

    it('should apply compact styling', () => {
      mockConfig.display.compact = true;
      const result = cardContent.generateCompactBody(mockConfig, mockSensorData);
      expect(result).toContain('compact');
    });

    it('should handle missing sensor data in compact mode', () => {
      mockConfig.display.compact = true;
      const result = cardContent.generateCompactBody(mockConfig, null);
      expect(result).toContain('warning-message');
    });
  });

  describe('cardContent', () => {
    describe('Title Generation', () => {
      it('should generate title when showTitle is true', () => {
        const config = {
          title: 'Test Pool',
          display: {
            showTitle: true
          }
        };
        const result = cardContent.generateTitle(config);
        expect(result).toContain('pool-monitor-title');
        expect(result).toContain('Test Pool');
      });

      it('should not generate title when showTitle is false', () => {
        const config = {
          title: 'Test Pool',
          display: {
            showTitle: false
          }
        };
        const result = cardContent.generateTitle(config);
        expect(result).toBe('');
      });
    });

    describe('Body Generation', () => {
      const baseConfig = {
        display: {
          show_units: true,
          gradient: true
        },
        colors: {
          warn: '#ff0000',
          low: '#00ff00',
          cool: '#0000ff'
        }
      };

      it('should show warning when no data is available', () => {
        const result = cardContent.generateBody(baseConfig, null);
        expect(result).toContain('warning-message');
        expect(result).toContain('No sensor data available');
      });

      it('should render sensor data with units', () => {
        const data = {
          name: 'temperature',
          entity: 'sensor.pool_temp',
          value: '25',
          unit: '°C',
          color: '#ff0000',
          pct_marker: 50,
          side_align: 'left',
          pct_state_step: 50,
          state: 'normal',
          is_mdi: true,
          mdi_icon: 'mdi:thermometer',
          mode: 'normal'
        };
        const result = cardContent.generateBody(baseConfig, data);
        expect(result).toContain('25 °C');
        expect(result).toContain('mdi:thermometer');
      });

      it('should hide units when configured', () => {
        const configWithoutUnits = {
          ...baseConfig,
          display: {
            ...baseConfig.display,
            show_units: false
          }
        };
        const data = {
          name: 'temperature',
          entity: 'sensor.pool_temp',
          value: '25',
          unit: '°C',
          color: '#ff0000',
          pct_marker: 50,
          side_align: 'left',
          pct_state_step: 50,
          state: 'normal',
          is_mdi: true,
          mdi_icon: 'mdi:thermometer',
          mode: 'normal'
        };
        const result = cardContent.generateBody(configWithoutUnits, data);
        expect(result).toContain('25');
        expect(result).not.toContain('25 °C');
      });

      it('should render custom image when not using MDI icon', () => {
        const data = {
          name: 'temperature',
          entity: 'sensor.pool_temp',
          value: '25',
          unit: '°C',
          color: '#ff0000',
          pct_marker: 50,
          side_align: 'left',
          pct_state_step: 50,
          state: 'normal',
          is_mdi: false,
          img_src: '/custom-image.png',
          mode: 'normal'
        };
        const result = cardContent.generateBody(baseConfig, data);
        expect(result).toContain('/custom-image.png');
        expect(result).not.toContain('mdi:');
      });

      it('should handle heatflow mode', () => {
        const data = {
          name: 'temperature',
          entity: 'sensor.pool_temp',
          value: '25',
          unit: '°C',
          color: '#ff0000',
          pct_marker: 50,
          side_align: 'left',
          pct_state_step: 50,
          state: 'normal',
          is_mdi: true,
          mdi_icon: 'mdi:thermometer',
          mode: 'heatflow'
        };
        const result = cardContent.generateBody(baseConfig, data);
        expect(result).toContain(baseConfig.colors.cool);
        expect(result).toContain(baseConfig.colors.low);
        expect(result).toContain(baseConfig.colors.warn);
      });
    });
  });
});

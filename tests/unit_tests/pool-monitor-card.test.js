import './setup.js';
import { describe, it, expect, beforeEach, vi, test } from 'vitest';
import { PoolMonitorCard } from '../../src/pool_monitor_card.js';
import {
  mockSensorConfigs,
  mockSensorStates,
  getDisplayConfig,
  getColorConfig,
  getSensorConfig,
  mockLegacyConfig,
  mockArraySensorConfigs,
} from './setup.js';

describe('Pool Monitor Card', () => {
  let card;

  beforeEach(() => {
    card = new PoolMonitorCard();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const minimalConfig = {
    sensors: {
      temperature: {
        entity: 'sensor.pool_temperature',
      },
    },
  };

  describe('Static Properties and Initialization', () => {
    it('should have correct static properties', () => {
      expect(PoolMonitorCard.cardType).toBe('custom:pool-monitor-card');
      expect(PoolMonitorCard.cardName).toBe('Pool Monitor Card');
      expect(PoolMonitorCard.cardDescription).toBe('A card for monitoring pool sensors');
      expect(PoolMonitorCard.properties).toBeDefined();
    });

    it('should initialize with empty properties', () => {
      const card = new PoolMonitorCard();
      expect(card.hass).toEqual({});
      expect(card.config).toEqual({});
    });
  });

  describe('Configuration', () => {
    it('should accept valid minimal configuration', () => {
      expect(() => card.setConfig(minimalConfig)).not.toThrow();
    });

    it('should throw on missing configuration', () => {
      expect(() => card.setConfig({})).toThrow();
    });

    it('should throw on missing sensors configuration', () => {
      const invalidConfig = { ...minimalConfig };
      delete invalidConfig.sensors;
      expect(() => card.setConfig(invalidConfig)).toThrow();
    });
  });

  describe('Data Processing', () => {
    beforeEach(() => {
      card.setConfig(minimalConfig);
    });

    it('should handle unavailable sensor', () => {
      card.hass = {
        states: {
          'sensor.pool_temp': {
            state: 'unavailable',
          },
        },
      };
      const data = card.processData();
      expect(data.temperature_1.value).toBeNull();
    });

    it('should handle missing sensor entity', () => {
      card.hass = {
        states: {},
      };
      const data = card.processData();
      expect(data.temperature_1.value).toBeNull();
    });

    it('should handle non-numeric sensor value', () => {
      card.hass = {
        states: {
          'sensor.pool_temp': {
            state: 'invalid',
          },
        },
      };
      const data = card.processData();
      expect(data.temperature_1.value).toBeNull();
    });
  });

  describe('Data Calculation', () => {
    beforeEach(() => {
      card.setConfig({
        sensors: mockSensorConfigs,
        display: getDisplayConfig(),
      });
      card.hass = { states: mockSensorStates };
    });

    it('should calculate temperature data correctly', () => {
      const sensor = mockSensorConfigs.temperature;
      const data = card.calculateData(
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

      expect(data).toBeDefined();
      expect(data.name).toBe('temperature');
      expect(data.value).toBe(26.5);
      expect(data.unit).toBe('°C');
      expect(data.min_value).toBe(25.0);
      expect(data.max_value).toBe(28.0);
      expect(data.setpoint).toBe(27);
      expect(data.mode).toBe('heatflow');
      expect(data.setpoint_class).toEqual(['26.0', '26.5', '27.0', '27.5', '28.0']);
      expect(data.title).toBe('Pool Temperature');
      expect(data.entity).toBe('sensor.pool_temperature');
      expect(data.is_mdi).toBe(false);
      expect(data.img_src).toBe(
        'https://raw.githubusercontent.com/wilsto/pool-monitor-card/master/resources/temperature.png',
      );
      expect(data.hide_icon).toBe(false);
      expect(data.invalid).toBe(undefined);
      expect(data.separator).toBe('-');
    });

    it('should calculate pH data correctly', () => {
      const sensor = mockSensorConfigs.ph;
      const data = card.calculateData(
        'ph',
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

      expect(data).toBeDefined();
      expect(data.name).toBe('ph');
      expect(data.value).toBe(7.3);
      expect(data.unit).toBe('pH');
      expect(data.min_value).toBe(7.1);
      expect(data.max_value).toBe(7.4);
      expect(data.setpoint).toBe(7.2);
      expect(data.mode).toBe('bidirectional');
      expect(data.setpoint_class).toEqual(['7.0', '7.1', '7.2', '7.3', '7.4']);
      expect(data.title).toBe('Pool pH');
      expect(data.entity).toBe('sensor.pool_ph');
      expect(data.is_mdi).toBe(true);
      expect(data.mdi_icon).toBe('mdi:flask');
      expect(data.hide_icon).toBe(false);
      expect(data.invalid).toBe(undefined);
      expect(data.separator).toBe('-');
    });

    it('should handle invalid sensor data', () => {
      const sensor = mockSensorConfigs.unsupported_sensor;
      const data = card.calculateData(
        'unsupported_sensor',
        sensor.name,
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

      expect(data).toBeDefined();
      expect(data.invalid).toBe(true);
      expect(data.name).toBe('unsupported_sensor');
    });

    describe('calculateData', () => {
      it('should handle various icon configurations', () => {
        const card = new PoolMonitorCard();
        card.hass = {
          states: {
            'sensor.test': {
              state: '25',
              last_updated: new Date().toISOString()
            }
          }
        };
        card.config = {
          display: {
            show_icons: true
          },
          colors: {}
        };

        // Test avec icon 'hide'
        let result = card.calculateData(
          'test',
          'Test',
          'sensor.test',
          undefined,
          undefined,
          undefined,
          undefined,
          '°C',
          'hide',
          null
        );
        expect(result.hide_icon).toBe(true);

        // Test avec image_url
        result = card.calculateData(
          'test',
          'Test',
          'sensor.test',
          undefined,
          undefined,
          undefined,
          undefined,
          '°C',
          null,
          'custom_image.png'
        );
        expect(result.img_src).toBe('custom_image.png');
        expect(result.is_mdi).toBe(false);

        // Test avec mdi icon
        result = card.calculateData(
          'test',
          'Test',
          'sensor.test',
          undefined,
          undefined,
          undefined,
          undefined,
          '°C',
          'mdi:test',
          null
        );
        expect(result.is_mdi).toBe(true);
        expect(result.mdi_icon).toBe('mdi:test');

        // Test avec nom par défaut
        result = card.calculateData(
          'ph',
          'Test',
          'sensor.test',
          undefined,
          undefined,
          undefined,
          undefined,
          '°C',
          null,
          null
        );
        expect(result.img_src).toContain('ph.png');
      });

      it('should handle entity min/max values', () => {
        const card = new PoolMonitorCard();
        card.hass = {
          states: {
            'sensor.test': { state: '25' },
            'sensor.min': { state: '20' },
            'sensor.max': { state: '30' }
          }
        };
        card.config = {
          display: {
            show_icons: false,
            show_units: true
          },
          colors: {}
        };

        const result = card.calculateData(
          'test',
          'Test',
          'sensor.test',
          'sensor.min',
          'sensor.max',
          25,
          0.5,
          '°C'
        );

        expect(result.min_value).toBe(20);
        expect(result.max_value).toBe(30);
        expect(result.value).toBe(25);
      });

      
      it('should handle missing entities', () => {
        const card = new PoolMonitorCard();
        card.hass = {
          states: {}
        };
        card.config = {
          display: {
            language: 'en',
            show_icons: false
          },
          colors: {}
        };

        const result = card.calculateData(
          'test',
          'Test',
          'sensor.missing',
          undefined,
          undefined,
          undefined,
          undefined,
          '°C'
        );

        expect(result.value).toBeNull();
        expect(result.entity).toBe('sensor.missing');
      });

      it('should handle show_last_updated option', () => {
        const card = new PoolMonitorCard();
        const now = new Date();
        card.hass = {
          states: {
            'sensor.test': {
              state: '25',
              last_updated: now.toISOString()
            }
          }
        };
        card.config = {
          display: {
            show_icons: false,
            show_last_updated: true,
            language: 'en'
          },
          colors: {}
        };

        const result = card.calculateData(
          'test',
          'Test',
          'sensor.test',
          undefined,
          undefined,
          undefined,
          undefined,
          '°C'
        );

        expect(result.last_updated).toBeDefined();
        expect(typeof result.last_updated).toBe('string');
      });

      it('should handle override values', () => {
        const card = new PoolMonitorCard();
        card.hass = {
          states: {
            'sensor.test': { state: '25', last_updated: '2023-01-01T12:00:00Z' }
          }
        };

        // Configuration de base avec override et override_value
        const sensorConfig = {
          override: true,
          override_value: 42,
          unit: '°C',
          entity: 'sensor.test',
          mode: 'normal',
          setpoint: 35,
          min: 20,
          max: 40
        };

        card.config = {
          display: {
            show_icons: true,
            show_units: true,
            show_labels: true,
            compact: false,
            show_names: true,
            show_last_updated: false,
            gradient: true,
            language: 'en'
          },
          colors: {
            warn: '#ff0000',
            low: '#00ff00',
            normal: '#0000ff'
          },
          sensors: {
            test: sensorConfig
          }
        };

        // Test avec override activé
        const result = card.calculateData(
          'test',
          'Test',
          'sensor.test',
          undefined,
          undefined,
          35,
          1,
          '°C',
          'mdi:thermometer',
          null,
          'normal',
          0,
          42,  // override_value
          true, // override activé
          false
        );

        // La valeur devrait maintenant être 42 car l'override n'est plus écrasé
        expect(result.value).toBe(42);

        // Test sans override
        const resultNoOverride = card.calculateData(
          'test',
          'Test',
          'sensor.test',
          undefined,
          undefined,
          35,
          1,
          '°C',
          'mdi:thermometer',
          null,
          'normal',
          0,
          42,  // override_value présent mais pas utilisé
          false, // override désactivé
          false
        );

        expect(resultNoOverride.value).toBe(25); // utilise la valeur du capteur
      });
    });

    describe('countDecimals', () => {
      it('should handle undefined and null values', () => {
        expect(card.countDecimals(undefined)).toBe(0);
        expect(card.countDecimals(null)).toBe(0);
      });

      it('should handle integer values', () => {
        expect(card.countDecimals(42)).toBe(0);
      });

      it('should handle decimal values', () => {
        expect(card.countDecimals(42.123)).toBe(3);
        expect(card.countDecimals(42.0)).toBe(0);
      });

      it('should handle string numbers', () => {
        expect(card.countDecimals('42.123')).toBe(3);
        expect(card.countDecimals('42')).toBe(0);
      });

      it('should handle special number formats', () => {
        // Notation scientifique avec exposant positif (pas de décimales)
        expect(card.countDecimals(42e2)).toBe(0);  // 4200
        // Nombre avec décimales qui se terminent par 0
        expect(card.countDecimals(42.100)).toBe(1);
        // Nombre sans partie décimale
        expect(card.countDecimals(4200)).toBe(0);
      });

      it('should handle numbers with toString override', () => {
        const num = {
          valueOf: () => 42.123,
          toString: () => '42.123'
        };
        expect(card.countDecimals(num)).toBe(3);
      });
    });

    describe('processData', () => {
      it('should handle unsupported sensors', () => {
        card.hass = {
          states: {
            'sensor.test': {
              state: '42',
              attributes: {
                unit_of_measurement: '°C'
              }
            }
          }
        };
        card.config = {
          display: {
            language: 'en',
            show_icons: true,
            show_units: true,
            show_labels: true
          },
          colors: {
            low: '#fdcb6e',
            normal: '#26c281',
            warn: '#ff0000',
            alert: '#ff0000'
          },
          sensors: {
            unsupported_type: [{
              name: 'test',
              entity: 'sensor.test',
              invalid: true  // Marquer explicitement comme invalide
            }]
          }
        };
        
        const result = card.processData();
        expect(result.unsupported_type_1.invalid).toBe(true);
      });
    });
  });

  describe('State and Color Calculation', () => {
    let card;

    beforeEach(() => {
      card = new PoolMonitorCard();
      card.setConfig({
        display: {
          show_icons: true,
          show_units: true,
          show_labels: true,
          compact: false,
          show_names: true,
          show_last_updated: false,
          gradient: true,
          language: 'en'
        },
        colors: {
          low: '#fdcb6e',
          warn: '#e17055',
          normal: '#00b894',
          cool: '#00BFFF',
          marker: '#000000',
          hi_low: '#00000099'
        },
        sensors: {
          test: {
            entity: 'sensor.test',
            name: 'Test Sensor',
            title: 'Test',
            unit: '°C',
            min: 0,
            max: 50,
            setpoint: 35,
            step: 1,
            mode: 'normal'
          }
        }
      });
      card.hass = {
        states: {
          'sensor.test': { 
            state: '25',
            last_updated: '2023-01-01T12:00:00Z',
            attributes: {
              unit_of_measurement: '°C'
            }
          }
        }
      };
    });

    it('should set warn state and color when value is below class[0]', () => {
      const result = card.calculateData(
        'test',
        'Test',
        'sensor.test',
        0,
        50,
        35,
        1,
        '°C',
        'mdi:thermometer',
        null,
        'normal',
        0,
        32,  // Valeur en dessous de class[0] (33)
        true,
        false
      );

      // Vérifier que les classes de setpoint sont correctement définies
      expect(result.setpoint_class).to.be.an('array').with.length(5);
      expect(result.setpoint_class.map(Number)).to.deep.equal([33, 34, 35, 36, 37]);
      
      // En mode normal, une valeur < class[0] devrait avoir la couleur 'warn'
      expect(result.color).to.equal(card.config.colors.warn);
      expect(result.state).to.not.be.empty;
    });

    it('should set low state and color when value is between class[0] and class[1]', () => {
      const result = card.calculateData(
        'test',
        'Test',
        'sensor.test',
        0,
        50,
        35,
        1,
        '°C',
        'mdi:thermometer',
        null,
        'normal',
        0,
        33.5,  // Valeur entre class[0] (33) et class[1] (34)
        true,
        false
      );

      // Vérifier que les classes de setpoint sont correctement définies
      expect(result.setpoint_class).to.be.an('array').with.length(5);
      expect(result.setpoint_class.map(Number)).to.deep.equal([33, 34, 35, 36, 37]);
      
      // Entre class[0] et class[1], devrait avoir la couleur 'low'
      expect(result.color).to.equal(card.config.colors.low);
      expect(result.state).to.not.be.empty;
    });

    it('should set normal state and color when value is between class[1] and class[2]', () => {
      const result = card.calculateData(
        'test',
        'Test',
        'sensor.test',
        0,
        50,
        35,
        1,
        '°C',
        'mdi:thermometer',
        null,
        'normal',
        0,
        34.5,  // Valeur entre class[1] (34) et class[2] (35)
        true,
        false
      );

      // Vérifier que les classes de setpoint sont correctement définies
      expect(result.setpoint_class).to.be.an('array').with.length(5);
      expect(result.setpoint_class.map(Number)).to.deep.equal([33, 34, 35, 36, 37]);
      
      // Entre class[1] et class[2], devrait avoir la couleur 'normal'
      expect(result.color).to.equal(card.config.colors.normal);
      expect(result.state).to.not.be.empty;
    });

    it('should set normal state and color when value is between class[2] and class[3]', () => {
      const result = card.calculateData(
        'test',
        'Test',
        'sensor.test',
        0,
        50,
        35,
        1,
        '°C',
        'mdi:thermometer',
        null,
        'normal',
        0,
        35.5,  // Valeur entre class[2] (35) et class[3] (36)
        true,
        false
      );

      // Vérifier que les classes de setpoint sont correctement définies
      expect(result.setpoint_class).to.be.an('array').with.length(5);
      expect(result.setpoint_class.map(Number)).to.deep.equal([33, 34, 35, 36, 37]);
      
      // Entre class[2] et class[3], devrait avoir la couleur 'normal'
      expect(result.color).to.equal(card.config.colors.normal);
      expect(result.state).to.not.be.empty;
    });

    it('should set low state and color when value is between class[3] and class[4]', () => {
      const result = card.calculateData(
        'test',
        'Test',
        'sensor.test',
        0,
        50,
        35,
        1,
        '°C',
        'mdi:thermometer',
        null,
        'normal',
        0,
        36.5,  // Valeur entre class[3] (36) et class[4] (37)
        true,
        false
      );

      // Vérifier que les classes de setpoint sont correctement définies
      expect(result.setpoint_class).to.be.an('array').with.length(5);
      expect(result.setpoint_class.map(Number)).to.deep.equal([33, 34, 35, 36, 37]);
      
      // Entre class[3] et class[4], devrait avoir la couleur 'low'
      expect(result.color).to.equal(card.config.colors.low);
      expect(result.state).to.not.be.empty;
    });

    it('should set warn state and color when value is above class[4]', () => {
      const result = card.calculateData(
        'test',
        'Test',
        'sensor.test',
        0,
        50,
        35,
        1,
        '°C',
        'mdi:thermometer',
        null,
        'normal',
        0,
        37.5,  // Valeur au-dessus de class[4] (37)
        true,
        false
      );

      // Vérifier que les classes de setpoint sont correctement définies
      expect(result.setpoint_class).to.be.an('array').with.length(5);
      expect(result.setpoint_class.map(Number)).to.deep.equal([33, 34, 35, 36, 37]);
      
      // Au-dessus de class[4], devrait avoir la couleur 'warn'
      expect(result.color).to.equal(card.config.colors.warn);
      expect(result.state).to.not.be.empty;
    });
  });

  describe('Normal Mode', () => {
    let card;
    let sensorConfig;

    beforeEach(() => {
      card = new PoolMonitorCard();
      card.hass = {
        states: {
          'sensor.test': { state: '25', last_updated: '2023-01-01T12:00:00Z' }
        }
      };

      sensorConfig = {
        unit: '°C',
        entity: 'sensor.test',
        mode: 'normal',
        setpoint: 35,
        min: 20,
        max: 40
      };

      card.config = {
        display: {
          show_icons: true,
          show_units: true,
          show_labels: true,
          compact: false,
          language: 'en'
        },
        colors: {
          warn: '#ff0000',
          low: '#00ff00',
          normal: '#0000ff'
        },
        sensors: {
          test: sensorConfig
        }
      };
    });

    it('should handle different value ranges', () => {
      const testValues = [15, 25, 32, 36, 45];
      testValues.forEach(value => {
        card.hass.states['sensor.test'].state = value.toString();
        const result = card.calculateData(
          'test',
          'Test',
          sensorConfig.entity,
          sensorConfig.min,
          sensorConfig.max,
          sensorConfig.setpoint,
          1,
          '°C',
          'mdi:thermometer',
          null,
          'normal',
          0,
          null,
          false,
          false
        );
        expect(result.value).toBe(value);
        expect(result.color).toBeDefined();
        expect(result.state).toBeDefined();
      });
    });

    it('should handle missing entities', () => {
      const result = card.calculateData(
        'test',
        'Test',
        'sensor.nonexistent',
        sensorConfig.min,
        sensorConfig.max,
        sensorConfig.setpoint,
        1,
        '°C',
        'mdi:thermometer',
        null,
        'normal',
        0,
        null,
        false,
        false
      );
      expect(result.value).toBeNull();
    });
  });

  describe('Heatflow Mode', () => {
    let card;
    let heatflowConfig;

    beforeEach(() => {
      card = new PoolMonitorCard();
      card.hass = {
        states: {
          'sensor.test': { state: '25', last_updated: '2023-01-01T12:00:00Z' }
        }
      };

      heatflowConfig = {
        unit: '°C',
        entity: 'sensor.test',
        mode: 'heatflow',
        setpoint: 35,
        min: 20,
        max: 40
      };

      card.config = {
        display: {
          show_icons: true,
          show_units: true,
          show_labels: true,
          language: 'en'
        },
        colors: {
          warn: '#ff0000',
          low: '#00ff00',
          normal: '#0000ff',
          cool: '#00ffff'
        },
        sensors: {
          test: heatflowConfig
        }
      };
    });

    it('should handle different heatflow values', () => {
      const heatflowValues = [20, 30, 40];
      heatflowValues.forEach(value => {
        card.hass.states['sensor.test'].state = value.toString();
        const result = card.calculateData(
          'test',
          'Test',
          heatflowConfig.entity,
          heatflowConfig.min,
          heatflowConfig.max,
          heatflowConfig.setpoint,
          1,
          '°C',
          'mdi:thermometer',
          null,
          'heatflow',
          0,
          null,
          false,
          false
        );
        expect(result.value).toBe(value);
        expect(result.color).toBeDefined();
        expect(result.state).toBeDefined();
      });
    });
  });

  describe('Display Modes', () => {
    let card;
    let sensorConfig;

    beforeEach(() => {
      card = new PoolMonitorCard();
      card.hass = {
        states: {
          'sensor.test': { state: '25', last_updated: '2023-01-01T12:00:00Z' }
        }
      };

      sensorConfig = {
        unit: '°C',
        entity: 'sensor.test',
        mode: 'normal',
        setpoint: 35,
        min: 20,
        max: 40
      };

      card.config = {
        display: {
          show_icons: true,
          show_units: true,
          show_labels: true,
          compact: true,
          language: 'en'
        },
        colors: {
          low: '#fdcb6e',
          warn: '#e17055',
          normal: '#00b894',
          cool: '#00BFFF',
          marker: '#000000',
          hi_low: '#00000099'
        },
        sensors: {
          test: sensorConfig
        }
      };
    });

    it('should handle compact mode calculations', () => {
      const result = card.calculateData(
        'test',
        'Test',
        'sensor.test',
        0,
        50,
        35,
        1,
        '°C',
        'mdi:thermometer',
        null,
        'normal',
        0,
        null,
        false,
        false
      );
      expect(result).toBeDefined();
      expect(result.value).toBe(25);
      expect(result.pct_marker).toBeDefined();
      expect(result.pct_min).toBeDefined();
      expect(result.pct_max).toBeDefined();
      expect(result.setpoint_class).toBeDefined();
    });
  });

  describe('Time Formatting', () => {
    beforeEach(() => {
      card.setConfig({
        sensors: mockSensorConfigs,
        display: { ...getDisplayConfig(), language: 'en' },
      });
    });

    describe('timeFromNow', () => {
      const now = new Date();

      test('should handle just now', () => {
        const date = new Date(now - 30 * 1000); // 30 seconds ago
        expect(card.timeFromNow(date)).toBe('just now');
      });

      test('should handle singular minute', () => {
        const date = new Date(now - 1 * 60 * 1000); // 1 minute ago
        expect(card.timeFromNow(date)).toBe('1 minute ago');
      });

      test('should handle plural minutes', () => {
        const date = new Date(now - 5 * 60 * 1000); // 5 minutes ago
        expect(card.timeFromNow(date)).toBe('5 minutes ago');
      });

      test('should handle singular hour', () => {
        const date = new Date(now - 1 * 60 * 60 * 1000); // 1 hour ago
        expect(card.timeFromNow(date)).toBe('1 hour ago');
      });

      test('should handle plural hours', () => {
        const date = new Date(now - 5 * 60 * 60 * 1000); // 5 hours ago
        expect(card.timeFromNow(date)).toBe('5 hours ago');
      });

      test('should handle singular day', () => {
        const date = new Date(now - 1 * 24 * 60 * 60 * 1000); // 1 day ago
        expect(card.timeFromNow(date)).toBe('1 day ago');
      });

      test('should handle plural days', () => {
        const date = new Date(now - 5 * 24 * 60 * 60 * 1000); // 5 days ago
        expect(card.timeFromNow(date)).toBe('5 days ago');
      });

      test('should handle different languages', () => {
        // Test French translations
        card.config.display.language = 'fr';
        
        const oneMinute = new Date(now - 1 * 60 * 1000);
        expect(card.timeFromNow(oneMinute)).toBe('il y a 1 minute');
        
        const twoMinutes = new Date(now - 2 * 60 * 1000);
        expect(card.timeFromNow(twoMinutes)).toBe('il y a 2 minutes');
        
        // Test German translations
        card.config.display.language = 'de';
        
        const oneHour = new Date(now - 1 * 60 * 60 * 1000);
        expect(card.timeFromNow(oneHour)).toBe('vor 1 Stunde');
        
        const twoHours = new Date(now - 2 * 60 * 60 * 1000);
        expect(card.timeFromNow(twoHours)).toBe('vor 2 Stunden');
      });
    });
  });

  describe('Rendering', () => {
    let card;

    beforeEach(() => {
      card = new PoolMonitorCard();
      card.setConfig({
        display: {
          show_icons: true,
          show_units: true,
          show_labels: true,
          compact: false,
          show_names: true,
          show_last_updated: false,
          gradient: true,
          language: 'en'
        },
        colors: {
          low: '#fdcb6e',
          warn: '#e17055',
          normal: '#00b894',
          cool: '#00BFFF',
          marker: '#000000',
          hi_low: '#00000099'
        },
        sensors: {
          test: {
            entity: 'sensor.test',
            name: 'Test Sensor',
            title: 'Test',
            unit: '°C',
            min: 0,
            max: 50,
            setpoint: 35,
            step: 1,
            mode: 'normal'
          }
        }
      });
      card.hass = {
        states: {
          'sensor.test': { 
            state: '25',
            last_updated: '2023-01-01T12:00:00Z',
            attributes: {
              unit_of_measurement: '°C'
            }
          }
        }
      };
    });

    it('should render warning when no valid data is available', () => {
      // Simuler l'absence totale de données
      card.processData = () => null;
      const result = card.render();
      const htmlString = String(result);
      expect(htmlString).toContain('warning-message');
      expect(htmlString).toContain('No valid sensor data available');
    });

    it('should render warning for invalid sensor', () => {
      // Simuler un capteur invalide
      card.processData = () => ({
        test: {
          invalid: true,
          name: 'Test Sensor'
        }
      });
      const result = card.render();
      const htmlString = String(result);
      expect(htmlString).toContain('warning-message');
      expect(htmlString).toContain('Sensor Test Sensor is not supported');
    });

    it('should render warning for missing entity', () => {
      // Simuler une entité manquante
      card.processData = () => ({
        test: {
          value: null,
          entity: 'sensor.test'
        }
      });
      const result = card.render();
      const htmlString = String(result);
      expect(htmlString).toContain('warning-message');
      expect(htmlString).toContain('Entity sensor.test could not be found');
    });

    it('should handle compact mode calculations', () => {
      const result = card.calculateData(
        'test',
        'Test',
        'sensor.test',
        0,
        50,
        35,
        1,
        '°C',
        'mdi:thermometer',
        null,
        'normal',
        0,
        32,  // Valeur en dessous de class[0] (33)
        true,
        false
      );

      expect(result).toBeDefined();
      expect(result.value).toBe(32);
      expect(result.pct_marker).toBeDefined();
      expect(result.pct_min).toBeDefined();
      expect(result.pct_max).toBeDefined();
      expect(result.setpoint_class).toBeDefined();
    });
  });

  describe('PoolMonitorCard Configuration', () => {
    let card;

    beforeEach(() => {
      card = new PoolMonitorCard();
    });

    test('should handle valid sensor configuration', () => {
      const config = {
        sensors: {
          temperature: mockSensorConfigs.temperature,
          ph: mockSensorConfigs.ph,
        },
      };
      expect(() => card.setConfig(config)).not.toThrow();
      expect(card.config.sensors.temperature[0].nameDefinedByUser).toBe(true);
      expect(card.config.sensors.temperature[0].title).toBe('Pool Temperature');
    });

    test('should handle array sensor configuration', () => {
      const config = {
        sensors: mockArraySensorConfigs,
      };
      expect(() => card.setConfig(config)).not.toThrow();
      expect(card.config.sensors.temperature).toHaveLength(2);
      expect(card.config.sensors.temperature[0].entity).toBe('sensor.pool_temperature_1');
      expect(card.config.sensors.temperature[1].entity).toBe('sensor.pool_temperature_2');
    });

    test('should reject legacy configuration', () => {
      expect(() => card.setConfig(mockLegacyConfig)).toThrow('Legacy configuration detected');
    });

    test('should handle empty sensor array', () => {
      const config = {
        sensors: {
          temperature: [],
        },
      };
      expect(() => card.setConfig(config)).toThrow('Empty sensor array for temperature');
    });

    test('should handle missing entity', () => {
      const config = {
        sensors: {
          temperature: [{ name: 'Missing Entity' }],
        },
      };
      expect(() => card.setConfig(config)).toThrow('Missing entity for temperature[0]');
    });

    test('should handle unsupported sensor type', () => {
      const config = {
        sensors: {
          unsupported_sensor: mockSensorConfigs.unsupported_sensor,
        },
      };
      expect(() => card.setConfig(config)).not.toThrow();
      expect(card.config.sensors.unsupported_sensor[0].invalid).toBe(true);
    });

    test('should handle sensor without name defined by user', () => {
      const config = {
        sensors: {
          orp: mockSensorConfigs.orp,
        },
      };
      expect(() => card.setConfig(config)).not.toThrow();
      expect(card.config.sensors.orp[0].nameDefinedByUser).toBe(false);
      expect(card.config.sensors.orp[0].title).toBeUndefined();
    });
  });
});

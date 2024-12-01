import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './setup.js';
import { PoolMonitorCard } from '../../src/pool_monitor_card.js';

// Get mocked constants
const CARD_INFO = {
  cardType: 'custom:pool-monitor-card',
  cardName: 'Pool Monitor Card',
  cardDescription: 'A card for monitoring pool sensors'
};

// Configuration minimale valide
const minimalConfig = {
  sensors: {
    temperature: {
      entity: 'sensor.pool_temperature'
    }
  }
};

describe('PoolMonitorCard', () => {
  let card;

  beforeEach(() => {
    card = new PoolMonitorCard();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Static Properties', () => {
    it('should have correct card type', () => {
      expect(PoolMonitorCard.cardType).toBe(CARD_INFO.cardType);
    });

    it('should have correct card name', () => {
      expect(PoolMonitorCard.cardName).toBe(CARD_INFO.cardName);
    });

    it('should have correct card description', () => {
      expect(PoolMonitorCard.cardDescription).toBe(CARD_INFO.cardDescription);
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
            state: 'unavailable'
          }
        }
      };
      const data = card.processData();
      expect(data.temperature_1.value).toBeNull();
    });

    it('should process valid sensor data', () => {
      card.hass = {
        states: {
          'sensor.pool_temp': {
            state: '25',
            attributes: {
              unit_of_measurement: '°C',
              friendly_name: 'Pool Temperature'
            }
          }
        }
      };
      const data = card.processData();
      expect(data).toBeDefined();
      expect(data.temperature_1).toBeDefined();
      expect(data.temperature_1.name).toBe('temperature');
      expect(data.temperature_1.title).toBe('Pool Temperature');
      expect(data.temperature_1.value).toBe(25);
      expect(data.temperature_1.is_mdi).toBe(true);
      expect(data.temperature_1.mdi_icon).toBe('mdi:thermometer');
    });

    it('should handle missing sensor entity', () => {
      card.hass = {
        states: {}
      };
      const data = card.processData();
      expect(data.temperature_1.value).toBeNull();
    });

    it('should handle non-numeric sensor value', () => {
      card.hass = {
        states: {
          'sensor.pool_temp': {
            state: 'invalid'
          }
        }
      };
      const data = card.processData();
      expect(data.temperature_1.value).toBeNull();
    });
  });
});

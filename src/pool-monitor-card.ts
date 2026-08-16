import { MonitorCardBase, defineCard } from './card-base.js';
import { POOL_SENSORS } from './sensors.js';
import type { SensorsRegistry, CardInfo } from './ha/types.js';
import { buildEntitySuggestion } from './entity-suggestion.js';

declare let __BUILD_TIMESTAMP__: string;
declare let __BUILD_VERSION__: string;

const VERSION = typeof __BUILD_VERSION__ !== 'undefined' ? __BUILD_VERSION__ : 'dev';
const BUILD_TIMESTAMP = typeof __BUILD_TIMESTAMP__ !== 'undefined' ? __BUILD_TIMESTAMP__ : 'dev';
const CARD_VERSION = `${VERSION} (${BUILD_TIMESTAMP})`;

console.info(
  `%c POOL-MONITORING-CARD %c ${CARD_VERSION} `,
  'color: white; background: green; font-weight: 700;',
  'color: green; background: white; font-weight: 700;',
);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'pool-monitor-card',
  name: 'Pool Monitor Card',
  description: 'Monitor your pool water parameters with 21 preset sensors',
  preview: true,
  documentationURL: 'https://github.com/wilsto/pool-monitor-card',
  // Home Assistant 2026.6 and later: offer this card when the user picks an
  // entity this card actually has a preset for. Returns null otherwise, so
  // the picker does not fill up with cards that cannot render the reading.
  getEntitySuggestion: buildEntitySuggestion(
    'pool-monitor-card',
    POOL_SENSORS,
    { ph: 'ph', conductivity: 'ec' },
    [
      'orp',
      'free_chlorine',
      'total_chlorine',
      'cya',
      'salinity',
      'alkalinity',
      'tds',
      'bromine',
      'phosphate',
      'calcium',
      'magnesium',
      'chlorinator',
      'filtration_time',
      'pump_energy',
      'pump_speed',
      'flow_rate',
      'specific_gravity',
    ],
  ),
});

export class PoolMonitorCard extends MonitorCardBase {
  static CARD_INFO: CardInfo = {
    cardType: 'pool-monitor-card',
    cardName: 'Pool Monitor Card',
    cardDescription:
      'The "Pool Monitor Card" is a home assistant plugin that provides information about the temperature, pH, and ORP levels of your swimming pool',
  };

  static SENSORS: SensorsRegistry = POOL_SENSORS;

  static IMAGE_BASE_URL =
    'https://raw.githubusercontent.com/wilsto/pool-monitor-card/master/resources';

  static async getConfigElement(): Promise<HTMLElement> {
    await import('./editor.js');
    return document.createElement('pool-monitor-card-editor');
  }

  static getStubConfig(): Record<string, unknown> {
    return {
      sensors: {
        temperature: { entity: '' },
      },
    };
  }
}

defineCard('pool-monitor-card', PoolMonitorCard);

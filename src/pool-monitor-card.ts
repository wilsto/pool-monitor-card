import { customElement } from 'lit/decorators.js';
import { MonitorCardBase } from '../../core/src/card-base.js';
import { POOL_SENSORS } from './sensors.js';
import type { SensorsRegistry, CardInfo } from '../../core/src/ha/types.js';

declare let __BUILD_TIMESTAMP__: string;

const VERSION = '2.3.0';
const BUILD_TIMESTAMP = typeof __BUILD_TIMESTAMP__ !== 'undefined' ? __BUILD_TIMESTAMP__ : 'dev';
const CARD_VERSION = `${VERSION} (${BUILD_TIMESTAMP})`;

console.info(
  `%c POOL-MONITORING-CARD %c ${CARD_VERSION} `,
  'color: white; background: green; font-weight: 700;',
  'color: green; background: white; font-weight: 700;',
);

@customElement('pool-monitor-card')
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
}

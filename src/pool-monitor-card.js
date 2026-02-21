/**
 * @fileoverview Pool Monitor Card - Home Assistant custom card for pool chemistry monitoring
 * Extends MonitorCardBase with pool-specific sensor presets.
 */

import { MonitorCardBase } from './card-base.js';
import { POOL_SENSORS } from './sensors.js';

const VERSION = '2.2.0';
/* global __BUILD_TIMESTAMP__ */
const BUILD_TIMESTAMP = typeof __BUILD_TIMESTAMP__ !== 'undefined' ? __BUILD_TIMESTAMP__ : 'dev';
const CARD_VERSION = `${VERSION} (${BUILD_TIMESTAMP})`;

console.info(
  `%c POOL-MONITORING-CARD %c ${CARD_VERSION} `,
  'color: white; background: green; font-weight: 700;',
  'color: green; background: white; font-weight: 700;',
);

export class PoolMonitorCard extends MonitorCardBase {
  static CARD_INFO = {
    cardType: 'pool-monitor-card',
    cardName: 'Pool Monitor Card',
    cardDescription:
      'The "Pool Monitor Card" is a home assistant plugin that provides information about the temperature, pH, and ORP levels of your swimming pool',
  };

  static SENSORS = POOL_SENSORS;

  static IMAGE_BASE_URL =
    'https://raw.githubusercontent.com/wilsto/pool-monitor-card/master/resources';
}

customElements.define('pool-monitor-card', PoolMonitorCard);

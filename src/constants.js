/**
 * @fileoverview Constants used throughout the Pool Monitor Card
 * @version ${VERSION}
 */

/** @const {string} VERSION - Current version of the card */
const VERSION = '2.1.0';
/* global __BUILD_TIMESTAMP__ */
/** @const {string} BUILD_TIMESTAMP - Build timestamp for the card */
const BUILD_TIMESTAMP = __BUILD_TIMESTAMP__ || 'dev';

/** @const {string} CARD_VERSION - Complete version string including build timestamp */
export const CARD_VERSION = `${VERSION} (${BUILD_TIMESTAMP})`;

/**
 * @const {Object} CARD_INFO - Basic information about the card
 * @property {string} cardType - Type identifier for the card
 * @property {string} cardName - Display name of the card
 * @property {string} cardDescription - Detailed description of the card's functionality
 */
export const CARD_INFO = {
  cardType: 'pool-monitor-card',
  cardName: 'Pool Monitor Card',
  cardDescription:
    'The "Pool Monitor Card" is a home assistant plugin that provides information about the temperature, pH, and ORP levels of your swimming pool',
};

// Import supported sensors list from config
export { SUPPORTED_SENSORS } from './configs/config.js';

/**
 * @const {Object} CONSOLE_STYLE - Styling configuration for console output
 * @property {string} title - CSS styling for the title in console
 * @property {string} version - CSS styling for the version in console
 */
export const CONSOLE_STYLE = {
  title: 'color: white; background: green; font-weight: 700;',
  version: 'color: green; background: white; font-weight: 700;',
};

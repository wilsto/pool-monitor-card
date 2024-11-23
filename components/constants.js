const VERSION = '1.12.0';
/* global __BUILD_TIMESTAMP__ */
const BUILD_TIMESTAMP = __BUILD_TIMESTAMP__ || 'dev';

export const CARD_VERSION = `${VERSION} (${BUILD_TIMESTAMP})`;

export const CARD_INFO = {
    cardType: 'pool-monitor-card',
    cardName: 'Pool Monitor Card',
    cardDescription: 'The "Pool Monitor Card" is a home assistant plugin that provides information about the temperature, pH, and ORP levels of your swimming pool'
};

// Console styling
export const CONSOLE_STYLE = {
    title: 'color: white; background: green; font-weight: 700;',
    version: 'color: green; background: white; font-weight: 700;'
};

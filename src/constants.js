const VERSION = '2.0.0-Alpha';
/* global __BUILD_TIMESTAMP__ */
const BUILD_TIMESTAMP = __BUILD_TIMESTAMP__ || 'dev';

export const CARD_VERSION = `${VERSION} (${BUILD_TIMESTAMP})`;

export const CARD_INFO = {
    cardType: 'pool-monitor-card',
    cardName: 'Pool Monitor Card',
    cardDescription: 'The "Pool Monitor Card" is a home assistant plugin that provides information about the temperature, pH, and ORP levels of your swimming pool'
};

// Liste des types de capteurs supportés
export const SUPPORTED_SENSORS = [
    'temperature',
    'orp',
    'tds',
    'ph',
    'salinity',
    'cya',
    'calcium',
    'phosphate',
    'alkalinity',
    'free_chlorine',
    'total_chlorine',
    'pressure',
    'sg',
    'magnesium',
    'water_level',
    'flow_rate',
    'uv_radiation',
    'product_volume',
    'product_weight'
];

// Console styling
export const CONSOLE_STYLE = {
    title: 'color: white; background: green; font-weight: 700;',
    version: 'color: green; background: white; font-weight: 700;'
};

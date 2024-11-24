export const DEFAULT_CONFIG = {
    display: {
        compact: false,
        show_names: true,
        show_labels: true,
        show_last_updated: false,
        show_icons: true,
        show_units: true,
        gradient: true,
        language: 'en'
    },

    colors: {
        mode: 'centric',
        normal: '#00b894',
        low: '#fdcb6e',
        warn: '#e17055',
        marker: '#000000',
        hi_low: '#00000099'
    },

    sensors: {
        temperature: {
            name: 'Temperature',
            entity: 'sensor.pool_temperature',
            unit: '°C',
            setpoint: 27,
            step: 1
        },
        orp: {
            name: 'ORP',
            entity: 'sensor.pool_orp',
            unit: 'mV',
            setpoint: 700,
            step: 50
        },
        tds: {
            name: 'TDS',
            entity: 'sensor.pool_tds',
            unit: 'g/L',
            setpoint: 4,
            step: 1
        },
        ph: {
            name: 'pH',
            entity: 'sensor.pool_ph',
            unit: 'pH',
            setpoint: 7.2,
            step: 0.2
        },
        salinity: {
            name: 'Salinity',
            entity: 'sensor.pool_salinity',
            unit: 'ppm',
            setpoint: 3000,
            step: 500
        },
        cya: {
            name: 'Cyanuric Acid',
            entity: 'sensor.pool_cya',
            unit: 'ppm',
            setpoint: 40,
            step: 10
        },
        calcium: {
            name: 'Calcium',
            entity: 'sensor.pool_calcium',
            unit: 'ppm',
            setpoint: 300,
            step: 100
        },
        phosphate: {
            name: 'Phosphate',
            entity: 'sensor.pool_phosphate',
            unit: 'ppb',
            setpoint: 100,
            step: 100
        },
        alkalinity: {
            name: 'Alkalinity',
            entity: 'sensor.pool_alkalinity',
            unit: 'ppm',
            setpoint: 100,
            step: 20
        },
        free_chlorine: {
            name: 'Free Chlorine',
            entity: 'sensor.pool_free_chlorine',
            unit: 'ppm',
            setpoint: 3,
            step: 0.5
        }
    }
};

// Utility functions to access config
export const getSensorConfig = (sensorType) => DEFAULT_CONFIG.sensors[sensorType];
export const getDisplayConfig = () => DEFAULT_CONFIG.display;
export const getColorConfig = () => DEFAULT_CONFIG.colors;

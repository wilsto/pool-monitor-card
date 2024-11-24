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
        low: '#fdcb6e',
        warn: '#e17055',
        normal: '#00b894',
        cool: '#00BFFF',
        marker: '#000000',
        hi_low: '#00000099'
    },

    sensors: {
        temperature: {
            name: 'Temperature',
            unit: '°C',
            setpoint: 27,
            step: 1,
            mode: 'heatflow'
        },
        orp: {
            name: 'ORP',
            unit: 'mV',
            setpoint: 700,
            step: 50,
            mode: 'centric'
        },
        tds: {
            name: 'TDS',
            unit: 'g/L',
            setpoint: 4,
            step: 1,
            mode: 'centric'
        },
        ph: {
            name: 'pH',
            unit: 'pH',
            setpoint: 7.2,
            step: 0.2,
            mode: 'centric'
        },
        salinity: {
            name: 'Salinity',
            unit: 'ppm',
            setpoint: 3000,
            step: 500,
            mode: 'centric'
        },
        cya: {
            name: 'Cyanuric Acid',
            unit: 'ppm',
            setpoint: 40,
            step: 10,
            mode: 'centric'
        },
        calcium: {
            name: 'Calcium',
            unit: 'ppm',
            setpoint: 300,
            step: 100,
            mode: 'centric'
        },
        phosphate: {
            name: 'Phosphate',
            unit: 'ppb',
            setpoint: 100,
            step: 100,
            mode: 'centric'
        },
        alkalinity: {
            name: 'Alkalinity',
            unit: 'ppm',
            setpoint: 100,
            step: 20,
            mode: 'centric'
        },
        free_chlorine: {
            name: 'Free Chlorine',
            unit: 'ppm',
            setpoint: 3,
            step: 0.5,
            mode: 'centric'
        },
        total_chlorine: {
            name: 'Total Chlorine',
            unit: 'ppm',
            setpoint: 5,
            step: 0.5,
            mode: 'centric'
        },
        pressure: {
            name: 'Filter Pressure',
            unit: 'psi',
            setpoint: 20,
            step: 10,
            mode: 'centric'
        },
        specific_gravity: {
            name: 'Specific Gravity',
            unit: 'sg',
            setpoint: 1.2,
            step: 0.1,
            mode: 'centric'
        },
        magnesium: {
            name: 'Magnesium',
            unit: 'ppm',
            setpoint: 1200,
            step: 100,
            mode: 'centric'
        },
        water_level: {
            name: 'Water Level',
            unit: '%',
            setpoint: 100,
            step: 10,
            mode: 'centric'
        },
        flow_rate: {
            name: 'Flow Rate',
            unit: 'm³/h',
            setpoint: 10,
            step: 1,
            mode: 'centric'
        },
        uv_radiation: {
            name: 'UV Radiation',
            unit: 'mW/cm²',
            setpoint: 4,
            step: 1,
            mode: 'centric'
        },
        product_volume: {
            name: 'Product Volume',
            unit: 'L',
            setpoint: 20,
            step: 5,
            mode: 'centric'
        },
        product_weight: {
            name: 'Product Weight',
            unit: 'kg',
            setpoint: 25,
            step: 5,
            mode: 'centric'
        }
    }
};

// Utility functions to access config
export const getSensorConfig = (sensorType) => DEFAULT_CONFIG.sensors[sensorType];
export const getDisplayConfig = () => DEFAULT_CONFIG.display;
export const getColorConfig = () => DEFAULT_CONFIG.colors;

// Export supported sensors list dynamically from sensors configuration
export const SUPPORTED_SENSORS = Object.keys(DEFAULT_CONFIG.sensors);

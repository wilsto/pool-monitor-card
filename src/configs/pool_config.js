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
            mode: 'centric',
            min_limit: 0
        },
        ec: {
            name: 'Electrical Conductivity',
            unit: 'µS/cm',
            setpoint: 4000,
            step: 200,
            mode: 'centric',
            min_limit: 0
        },
        tds: {
            name: 'TDS',
            unit: 'g/L',
            setpoint: 5,
            step: 0.5,
            mode: 'centric',
            min_limit: 0
        },
        ph: {
            name: 'pH',
            unit: 'pH',
            setpoint: 7.2,
            step: 0.2,
            mode: 'centric',
            min_limit: 0
        },
        salinity: {
            name: 'Salinity',
            unit: 'ppm',
            setpoint: 3000,
            step: 500,
            mode: 'centric',
            min_limit: 0
        },
        cya: {
            name: 'Cyanuric Acid',
            unit: 'ppm',
            setpoint: 40,
            step: 10,
            mode: 'centric',
            min_limit: 0
        },
        calcium: {
            name: 'Calcium',
            unit: 'ppm',
            setpoint: 300,
            step: 100,
            mode: 'centric',
            min_limit: 0
        },
        phosphate: {
            name: 'Phosphate',
            unit: 'ppb',
            setpoint: 50,
            step: 10,
            mode: 'centric',
            min_limit: 0
        },
        alkalinity: {
            name: 'Alkalinity',
            unit: 'ppm',
            setpoint: 100,
            step: 20,
            mode: 'centric',
            min_limit: 0
        },
        free_chlorine: {
            name: 'Free Chlorine',
            unit: 'ppm',
            setpoint: 3,
            step: 0.5,
            mode: 'centric',
            min_limit: 0
        },
        total_chlorine: {
            name: 'Total Chlorine',
            unit: 'ppm',
            setpoint: 3,
            step: 0.5,
            mode: 'centric',
            min_limit: 0
        },
        pressure: {
            name: 'Filter Pressure',
            unit: 'psi',
            setpoint: 12,
            step: 2,
            mode: 'centric'
        },
        specific_gravity: {
            name: 'Specific Gravity',
            unit: 'sg',
            setpoint: 1.1,
            step: 0.2,
            mode: 'centric'
        },
        magnesium: {
            name: 'Magnesium',
            unit: 'ppm',
            setpoint: 1200,
            step: 100,
            mode: 'centric',
            min_limit: 0
        },
        water_level: {
            name: 'Water Level',
            unit: '%',
            setpoint: 100,
            step: 10,
            mode: 'centric',
            min_limit: 0
        },
        flow_rate: {
            name: 'Flow Rate',
            unit: 'm³/h',
            setpoint: 10,
            step: 1,
            mode: 'centric',
            min_limit: 0
        },
        uv_radiation: {
            name: 'UV Radiation',
            unit: 'mW/cm²',
            setpoint: 4,
            step: 1,
            mode: 'centric',
            min_limit: 0
        },
        product_volume: {
            name: 'Product Volume',
            unit: 'L',
            setpoint: 20,
            step: 5,
            mode: 'centric',
            min_limit: 0
        },
        product_weight: {
            name: 'Product Weight',
            unit: 'kg',
            setpoint: 25,
            step: 5,
            mode: 'centric',
            min_limit: 0
        }       
    }
};

// Utility functions to access config
export const getSensorConfig = (sensorType) => DEFAULT_CONFIG.sensors[sensorType];
export const getDisplayConfig = () => DEFAULT_CONFIG.display;
export const getColorConfig = () => DEFAULT_CONFIG.colors;

// Export supported sensors list dynamically from sensors configuration
export const SUPPORTED_SENSORS = Object.keys(DEFAULT_CONFIG.sensors);
# Pool Monitor Card: Sensor Details

This document explains each sensor, why it matters, and what the ideal ranges mean.

## Essential Water Chemistry

*The core parameters every pool owner should monitor for safe, comfortable swimming.*

### Temperature (`temperature`)

- **Unit**: °C
- **Defaults**: 27

The ideal pool temperature is 26-28°C. Knowing the temperature helps decide if it's warm enough for swimming or if heating is needed.

### pH (`ph`)

- **Unit**: pH
- **Defaults**: 7.2

pH measures acidity/alkalinity (ideal: 7.0-7.4). Proper pH prevents skin and eye irritation and keeps sanitizers effective.

### ORP (`orp`)

- **Unit**: mV
- **Defaults**: 700

Oxidation Reduction Potential measures sanitizer effectiveness (ideal: 650-750 mV). Ensures water is properly disinfected.

### TDS (`tds`)

- **Unit**: g/L
- **Defaults**: 5

Total Dissolved Solids: minerals, salts, particles in the water. High TDS affects clarity. Saltwater pools: 3000-5000 ppm.

### Electrical Conductivity (`ec`)

- **Unit**: µS/cm
- **Defaults**: 4000

Electrical Conductivity measures dissolved ion concentration. Closely related to TDS. Ideal for pools: 3800-4200 µS/cm.

## Chemical Balance

*Keeping these balanced prevents algae, scaling, and equipment damage.*

### Salinity (`salinity`)

- **Unit**: ppm
- **Defaults**: 3000

Salt level for saltwater pools (ideal: 2500-3500 ppm). Required for salt chlorination systems.

### Cyanuric Acid (`cya`)

- **Unit**: ppm
- **Defaults**: 40

Cyanuric Acid stabilizes chlorine against UV breakdown (ideal: 30-50 ppm). Too high reduces chlorine effectiveness.

### Calcium (`calcium`)

- **Unit**: ppm
- **Defaults**: 300

Calcium hardness prevents scaling or corrosion (ideal: 200-400 ppm).

### Phosphate (`phosphate`)

- **Unit**: ppb
- **Defaults**: 50

Phosphates feed algae growth. Keep below 200-300 ppb to prevent blooms.

### Alkalinity (`alkalinity`)

- **Unit**: ppm
- **Defaults**: 100

Buffers pH changes (ideal: 80-120 ppm). Low alkalinity causes pH to swing wildly.

## Treatment & Sanitization

*These tell you if your disinfection system is working properly.*

### Free Chlorine (`free_chlorine`)

- **Unit**: ppm
- **Defaults**: 3

Active chlorine available for sanitization (ideal: 1-3 ppm).

### Total Chlorine (`total_chlorine`)

- **Unit**: ppm
- **Defaults**: 3

Free + combined chlorine. If much higher than free chlorine, indicates chloramine buildup.

### Bromine (`bromine`)

- **Unit**: ppm
- **Defaults**: 4

Alternative disinfectant to chlorine (ideal: 3-5 ppm). Common in saltwater and hot tub systems. Better temperature resistance than chlorine.

### Filter Pressure (`pressure`)

- **Unit**: psi
- **Defaults**: 12

Filter pressure indicates when to backwash. Compare to clean baseline: 8-10 psi above means cleaning time.

### Specific Gravity (`specific_gravity`)

- **Unit**: sg
- **Defaults**: 1.1

Indicates if substances float or sink in your pool water. Reference: pure water = 1.0.

### Magnesium (`magnesium`)

- **Unit**: ppm
- **Defaults**: 1200

Prevents scaling and staining (ideal: 1000-1400 ppm). Important for mineral pool systems.

## Equipment & Maintenance

*Track the health of your pool equipment and supply levels.*

### Water Level (`water_level`)

- **Unit**: %
- **Defaults**: 100

Should be at the middle of the skimmer opening for proper filtration.

### Flow Rate (`flow_rate`)

- **Unit**: m³/h
- **Defaults**: 10

Volume flowing through filtration. Drops indicate blockages or pump issues.

### UV Radiation (`uv_radiation`)

- **Unit**: mW/cm²
- **Defaults**: 4

UV sanitization system output. Optimal at 254nm wavelength.

### Product Volume (`product_volume`)

- **Unit**: L
- **Defaults**: 20

Track liquid chemical stock levels (pH+, pH-, etc.).

### Product Weight (`product_weight`)

- **Unit**: kg
- **Defaults**: 25

Track powdered chemical stock levels.

### Chlorinator Setting (`chlorinator`)

- **Unit**: %
- **Defaults**: 50

Salt chlorinator output percentage (0-100%). Available via the Hayward OmniLogic integration as `sensor.chlorinator_setting`. Ideal range depends on pool load and size.

### Pump Speed (`pump_speed`)

- **Unit**: %
- **Defaults**: 50

Variable speed pump operating level. Shows if the pump is running at its target speed.

### Light Brightness (`light_brightness`)

- **Unit**: %
- **Defaults**: 80

Pool light brightness level. Compatible with dimmable LED pool lights (e.g., Pentair ColorSplash, Jandy ColorLogic).

### Heat Pump Setpoint (`heat_pump_setpoint`)

- **Unit**: °C
- **Defaults**: 28

Target temperature configured on your heat pump (PAC). Use `availability_entity` with a `binary_sensor` to gray out the row when the heat pump is off.

### Humidity (`humidity`)

- **Unit**: %
- **Defaults**: 60

Air humidity around an indoor pool. High humidity drives condensation and, over time, structural damage. It is the reading indoor pool owners watch most after temperature.

### Filtration Time (`filtration_time`)

- **Unit**: h
- **Defaults**: 8

Daily filtration runtime. Too little and the water is not turned over; far more than needed is wasted energy.

### Pump Energy (`pump_energy`)

- **Unit**: kWh
- **Defaults**: 5

Daily energy drawn by the pump. Pair it with filtration time to see whether the pump is running efficiently.

# Pool Monitor Card — Sensor Details

This document explains each sensor, why it matters, and what the ideal ranges mean.

## Essential Water Chemistry

*The core parameters every pool owner should monitor for safe, comfortable swimming.*

### Temperature (`temperature`)

- **Unit**: °C
- **Default setpoint**: 27

The ideal pool temperature is 26-28°C. Knowing the temperature helps decide if it's warm enough for swimming or if heating is needed.

### pH (`ph`)

- **Unit**: pH
- **Default setpoint**: 7.2

pH measures acidity/alkalinity (ideal: 7.0-7.4). Proper pH prevents skin and eye irritation and keeps sanitizers effective.

### ORP (`orp`)

- **Unit**: mV
- **Default setpoint**: 700

Oxidation Reduction Potential measures sanitizer effectiveness (ideal: 650-750 mV). Ensures water is properly disinfected.

### TDS (`tds`)

- **Unit**: g/L
- **Default setpoint**: 5

Total Dissolved Solids — minerals, salts, particles in the water. High TDS affects clarity. Saltwater pools: 3000-5000 ppm.

### Electrical Conductivity (`ec`)

- **Unit**: µS/cm
- **Default setpoint**: 4000

Electrical Conductivity measures dissolved ion concentration. Closely related to TDS. Ideal for pools: 3800-4200 µS/cm.

## Chemical Balance

*Keeping these balanced prevents algae, scaling, and equipment damage.*

### Salinity (`salinity`)

- **Unit**: ppm
- **Default setpoint**: 3000

Salt level for saltwater pools (ideal: 2500-3500 ppm). Required for salt chlorination systems.

### Cyanuric Acid (`cya`)

- **Unit**: ppm
- **Default setpoint**: 40

Cyanuric Acid stabilizes chlorine against UV breakdown (ideal: 30-50 ppm). Too high reduces chlorine effectiveness.

### Calcium (`calcium`)

- **Unit**: ppm
- **Default setpoint**: 300

Calcium hardness prevents scaling or corrosion (ideal: 200-400 ppm).

### Phosphate (`phosphate`)

- **Unit**: ppb
- **Default setpoint**: 50

Phosphates feed algae growth. Keep below 200-300 ppb to prevent blooms.

### Alkalinity (`alkalinity`)

- **Unit**: ppm
- **Default setpoint**: 100

Buffers pH changes (ideal: 80-120 ppm). Low alkalinity causes pH to swing wildly.

## Treatment & Sanitization

*These tell you if your disinfection system is working properly.*

### Free Chlorine (`free_chlorine`)

- **Unit**: ppm
- **Default setpoint**: 3

Active chlorine available for sanitization (ideal: 1-3 ppm).

### Total Chlorine (`total_chlorine`)

- **Unit**: ppm
- **Default setpoint**: 3

Free + combined chlorine. If much higher than free chlorine, indicates chloramine buildup.

### Bromine (`bromine`)

- **Unit**: ppm
- **Default setpoint**: 4

Alternative disinfectant to chlorine (ideal: 3-5 ppm). Common in saltwater and hot tub systems. Better temperature resistance than chlorine.

### Filter Pressure (`pressure`)

- **Unit**: psi
- **Default setpoint**: 12

Filter pressure indicates when to backwash. Compare to clean baseline — 8-10 psi above means cleaning time.

### Specific Gravity (`specific_gravity`)

- **Unit**: sg
- **Default setpoint**: 1.1

Indicates if substances float or sink in your pool water. Reference: pure water = 1.0.

### Magnesium (`magnesium`)

- **Unit**: ppm
- **Default setpoint**: 1200

Prevents scaling and staining (ideal: 1000-1400 ppm). Important for mineral pool systems.

## Equipment & Maintenance

*Track the health of your pool equipment and supply levels.*

### Water Level (`water_level`)

- **Unit**: %
- **Default setpoint**: 100

Should be at the middle of the skimmer opening for proper filtration.

### Flow Rate (`flow_rate`)

- **Unit**: m³/h
- **Default setpoint**: 10

Volume flowing through filtration. Drops indicate blockages or pump issues.

### UV Radiation (`uv_radiation`)

- **Unit**: mW/cm²
- **Default setpoint**: 4

UV sanitization system output. Optimal at 254nm wavelength.

### Product Volume (`product_volume`)

- **Unit**: L
- **Default setpoint**: 20

Track liquid chemical stock levels (pH+, pH-, etc.).

### Product Weight (`product_weight`)

- **Unit**: kg
- **Default setpoint**: 25

Track powdered chemical stock levels.

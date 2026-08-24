# Pool Monitor Card: Sensor Details

This document explains each sensor, why it matters, and what the ideal ranges mean.

## Essential Water Chemistry

*The core parameters every pool owner should monitor for safe, comfortable swimming.*

### Temperature (`temperature`)

- **Unit**: °C
- **Defaults**: 27

The card ships `setpoint: 27` with `step: 1`, which paints 25 to 29 °C. That scale is our own choice and no standard is cited for it. Knowing the temperature helps decide if it's warm enough for swimming or if heating is needed.

### pH (`ph`)

- **Unit**: pH
- **Defaults**: 7.2

pH measures acidity and alkalinity, and it decides both whether the water stings and whether your sanitiser works at all. The card ships `setpoint: 7.2` with `step: 0.2`, which paints 6.8 to 7.6. That sits inside the 6.5 to 7.8 [DIN 19643 requires of pool basin water](https://www.lagus.mv-regierung.de/serviceassistent/download?id=1666605). The requirement is the published part; the narrower scale drawn inside it is our own choice.

### ORP (`orp`)

- **Unit**: mV
- **Defaults**: 700

Oxidation reduction potential measures how effectively the water is disinfected, whatever the sanitiser. The card ships `setpoint: 700` with `step: 50`, which paints 600 to 800 mV. [DIN 19643 sets a minimum redox voltage for pool basin water](https://www.lagus.mv-regierung.de/serviceassistent/download?id=1666605), given as 700 mV at the lower end and 770 mV at the upper, which of the two applies depending on pH and on the type of water. The 700 comes from there; the 50 mV step is our own choice.

### TDS (`tds`)

- **Unit**: g/L
- **Defaults**: 5

Total Dissolved Solids: minerals, salts and particles in the water. High TDS affects clarity. **Check which unit your sensor reports before trusting the colour**, because this preset ships in g/L and 1 g/L is 1000 ppm: the two are a factor of a thousand apart, not a rounding difference. The card ships `setpoint: 5` with `step: 0.5`, which paints 4 to 6 g/L, the same water as 4000 to 6000 ppm. **For a sensor reporting ppm, set `setpoint: 5000` and `step: 500`**, which paints that same water on a ppm axis. The card never converts anything: it compares the number your entity reports against the scale as you configured it, so a ppm reading left on the shipped g/L scale is painted a thousand times too high. Both shipped figures are our own choice and no standard is cited for them.

### Electrical Conductivity (`ec`)

- **Unit**: µS/cm
- **Defaults**: 4000

Electrical Conductivity measures dissolved ion concentration. Closely related to TDS. The card ships `setpoint: 4000` with `step: 200`, which paints 3600 to 4400 µS/cm. That scale is our own choice and no standard is cited for it.

## Chemical Balance

*Keeping these balanced prevents algae, scaling, and equipment damage.*

### Salinity (`salinity`)

- **Unit**: ppm
- **Defaults**: 3000

Salt level for saltwater pools, required by salt chlorination systems. The card ships `setpoint: 3000` with `step: 500`, which paints 2000 to 4000 ppm. That scale is our own choice and no standard is cited for it, so set it to the concentration your chlorinator asks for rather than reading ours as a requirement.

### Cyanuric Acid (`cya`)

- **Unit**: ppm
- **Defaults**: 40

Cyanuric acid stabilises chlorine against UV breakdown, and it changes what a chlorine reading means: the US Model Aquatic Health Code doubles its own free chlorine minimum, from [1.0 ppm](https://cmahc.org/mahc_sections/1723) to [2.0 ppm](https://cmahc.org/mahc_sections/1724), as soon as cyanuric acid is present. Too much of it and chlorine loses effectiveness. The card ships `setpoint: 40` with `step: 10`, which paints 20 to 60 ppm: that figure is our own choice, the doubling above is the published part.

### Calcium (`calcium`)

- **Unit**: ppm
- **Defaults**: 300

Calcium hardness decides whether the water scales or corrodes. The card ships `setpoint: 300` with `step: 100`, which paints 100 to 500 ppm. That scale is our own choice and no standard is cited for it.

### Phosphate (`phosphate`)

- **Unit**: ppb
- **Defaults**: 50

Phosphates feed algae growth, and lower is better. The card ships `setpoint: 50` with `step: 10`, which paints 30 to 70 ppb: it centres a band rather than drawing a ceiling. That scale is our own choice and no standard is cited for it, so set it around the level you actually work to.

### Alkalinity (`alkalinity`)

- **Unit**: ppm
- **Defaults**: 100

Buffers pH changes, and low alkalinity is what makes pH swing wildly. The card ships `setpoint: 100` with `step: 20`, which paints 60 to 140 ppm. That scale is our own choice and no standard is cited for it.

## Treatment & Sanitization

*These tell you if your disinfection system is working properly.*

### Free Chlorine (`free_chlorine`)

- **Unit**: ppm
- **Defaults**: 3

Active chlorine available for sanitisation, and **the shipped default follows American practice**, which is worth knowing before trusting the colour. The card ships `setpoint: 3` with `step: 0.5`, which paints a scale from 2.0 to 4.0 ppm. That is at or above every minimum the US Model Aquatic Health Code sets ([1.0 ppm for a venue without cyanuric acid](https://cmahc.org/mahc_sections/1723), [2.0 ppm with it](https://cmahc.org/mahc_sections/1724), [3.0 ppm for a spa](https://cmahc.org/mahc_sections/1725)), and five to ten times what [DIN 19643 requires of German pool water](https://www.lagus.mv-regierung.de/serviceassistent/download?id=1666605): 0.3 to 0.6 mg/l in the basin, 0.7 to 1.0 mg/l in a warm bubble pool. 1 ppm is 1 mg/l, so the two disagree by convention and not by unit, which is why a correctly treated German pool reads Too Low on the shipped scale. **For a DIN 19643 pool, set `setpoint: 0.45` and `step: 0.075`**, which paints 0.3 to 0.6 mg/l. The 3 ppm default is our own choice and no standard is cited for it; it is left where it is so that nobody who configured nothing has their scale moved underneath them.

### Total Chlorine (`total_chlorine`)

- **Unit**: ppm
- **Defaults**: 3

Free plus combined chlorine, so it can only ever read at or above free chlorine. On its own the number carries no published meaning: what a standard bounds is the difference between the two, the combined chlorine, which [DIN 19643 holds at or below 0.2 mg/l](https://www.lagus.mv-regierung.de/serviceassistent/download?id=1666605). A total much higher than free chlorine is chloramine buildup. The shipped `setpoint: 3` mirrors free chlorine and is our own choice, with no source behind it.

### Bromine (`bromine`)

- **Unit**: ppm
- **Defaults**: 4

Alternative disinfectant to chlorine. Common in saltwater and hot tub systems, and it holds up better than chlorine in warm water. The card ships `setpoint: 4` with `step: 1`, which paints 2 to 6 ppm: that figure is our own choice, no standard is cited for it, and it should not be read as a quotation.

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

### Chlorinator (`chlorinator`)

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

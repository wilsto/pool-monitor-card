# Pool Sensor Details

This document provides detailed information about the various sensors and measurements used in pool monitoring.

## Essential Parameters

- **Temperature**: This refers to the temperature of the water in your pool. The ideal range for temperature in a pool is between 26°C and 28°C. Knowing the temperature can help you decide if it's warm enough for swimming or if it's too cold and might need to be heated.

- **pH**: This is a measure of how acidic or alkaline the water in your pool is. The ideal range for pH in a pool is between 7.0 and 7.4. Maintaining the proper pH level can help prevent skin and eye irritation and keep the pool water safe for swimming.

- **ORP**: This stands for Oxidation Reduction Potential and measures the ability of the water to oxidize or reduce substances in the pool. The ORP level is related to the amount of chlorine or other sanitizers in the pool. The ideal range for chlorine in a pool is between 650 and 750 mV. Maintaining the correct ORP level can help ensure that the pool water is properly sanitized and free of harmful bacteria.

- **TDS**: This stands for Total Dissolved Solids and measures the amount of inorganic and organic substances in the water, such as minerals, salts, and other particles. High levels of TDS can affect water clarity and make it difficult to balance chemicals in the pool. The ideal range for TDS in a saltwater pool is between 3000 and 5000 parts per million (ppm) (3 and 5 g/L).

- **EC**: This stands for Electrical Conductivity and measures the water's ability to conduct electrical current, which is directly related to the concentration of dissolved ions in the water. It provides another way to monitor the water's mineral content and is closely related to TDS. The ideal range for EC in a pool is typically between 3800 and 4200 µS/cm.

## Chemical Balance

- **Salinity**: This measures the amount of salt in the water. A saltwater pool requires a specific range of salt to function properly. The ideal range for salt in a saltwater pool is between 2500 and 3500 ppm.

- **CYA**: This stands for Cyanuric Acid and measures the amount of stabilizer in the water. Stabilizer helps to protect the chlorine from being broken down by sunlight. The ideal range for CYA in a pool is between 30 and 50 ppm.

- **Calcium**: This measures the amount of calcium in the water. High levels of calcium can lead to scaling on pool surfaces and equipment. The ideal range for calcium hardness in a pool is between 200 and 400 ppm.

- **Phosphate**: This measures the amount of phosphate in the water. Phosphates in the water can provide food for algae to grow. The ideal range for phosphate in a pool is below 200-300 ppm.

- **Alkalinity**: This measures the ability of the water to resist changes in pH. Proper alkalinity can help to prevent the water from becoming too acidic or alkaline. The ideal range for alkalinity in a pool is between 80 and 120 ppm.

## Treatment

- **Free Chlorine**: This measures the amount of active chlorine in the water that is available to sanitize the pool. The ideal range for free chlorine in a pool is between 1 and 3 ppm.

- **Total Chlorine**: This measures the combined concentration of both free chlorine and chlorine that has combined with contaminants in the water. The ideal range for total chlorine in a pool is up to 5 ppm.

- **Filter pressure**: This measures the pressure inside the pool filter. A high filter pressure can indicate that the filter is dirty and needs to be cleaned. The ideal filter pressure can vary depending on the make and model of the pool filter.

- **Specific Gravity**: A measure that indicates if an object will float or sink in water. Water has a specific gravity of 1.0 at 20°C. This reference point helps determine if substances will float (specific gravity < 1) or sink (specific gravity > 1) in water. This property is important for pool equipment and chemical management.

- **Magnesium**: A mineral that helps prevent scaling and staining in pools. The ideal range for magnesium in a pool is between 1000 and 1400 ppm. Proper magnesium levels can help improve water clarity and reduce chemical usage.

## Maintenance

- **Water Level**: This measures the water level in your pool. Maintaining proper water level is crucial for optimal pool operation. The water level should typically be kept at the middle of the skimmer opening (about halfway up the skimmer opening) for proper filtration. Too low water levels can damage pumps, while too high levels reduce skimmer efficiency. Many pools use sensors to monitor this automatically and some systems can even automatically add water when levels drop too low.

- **Flow Rate**: This measures the volume of water flowing through your pool's filtration system per minute. For small residential pools, the ideal flow rate is around 200 L/min, while larger commercial pools may require up to 500 L/min. Monitoring flow rate is crucial as variations can indicate filter blockages or pump issues. Daily checks should ensure the rate stays within 10% of the setpoint.

- **UV Radiation**: This measures the ultraviolet light output in your pool's UV sanitization system. The optimal wavelength is 254 nanometers (nm) for effective microbial inactivation. The UV output should be monitored weekly to ensure it remains within ±5 nm of this setpoint for maximum effectiveness.

- **Product Volume**: This tracks the volume of liquid chemical products (like pH+ and pH- solutions) in storage. A minimum volume of 10 liters per chemical type should be maintained to prevent shortages. Weekly inventory checks and usage tracking help optimize reorder timing and maintain adequate chemical supplies.

- **Product Weight**: This monitors the weight of powdered chemical products in storage. A minimum of 5 kg should be maintained for essential powdered chemicals. Weekly weight logging and consumption tracking help predict future needs and prevent stock-outs.

## Analysis and Recommendations Table

| Sensor ID        | Sensor           | Unit   | Proposed Setpoint | Proposed Step | Min Limit | Chlorine/Salt Difference                                                  |
| ---------------- | ---------------- | ------ | ----------------- | ------------- | --------- | ------------------------------------------------------------------------- |
| temperature      | Temperature      | °C     | 27                | 1             | N/A       | Identical for both types                                                  |
| orp              | ORP              | mV     | 700               | 50            | 0         | Identical, as ORP remains a standard measure for disinfection             |
| tds              | TDS              | g/L    | 5                 | 0.5           | 0         | Different: Chlorine pools: 1-2 g/L maximum                                |
| ec               | Electrical Conductivity               | µS/cm  | 4000              | 200           | 0         | Different: Chlorine pools: 500-1000 µS/cm, Salt pools: 3000-6000 µS/cm    |
| ph               | pH               | pH     | 7.2               | 0.2           | 0         | Identical for both types                                                  |
| salinity         | Salinity         | ppm    | 3000              | 500           | 0         | Only relevant for salt pools (3,000-6,000 ppm). Chlorine pools: N/A       |
| cyanuric_acid    | Cyanuric Acid    | ppm    | 40                | 10            | 0         | Identical for chlorine stabilization, less critical for salt pools        |
| calcium          | Calcium          | ppm    | 300               | 100           | 0         | Identical to prevent scaling or corrosion                                 |
| phosphate        | Phosphate        | ppb    | 50                | 10            | 0         | Identical: limiting phosphates is key to prevent algae growth             |
| alkalinity       | Alkalinity       | ppm    | 100               | 20            | 0         | Identical for pH stabilization                                            |
| free_chlorine    | Free Chlorine    | ppm    | 3                 | 0.5           | 0         | Identical for effective disinfection                                      |
| total_chlorine   | Total Chlorine   | ppm    | 3                 | 0.5           | 0         | Identical for monitoring combined chlorine excess                         |
| pressure         | Pressure         | psi    | 12                | 2             | 0         | Identical for both pool types                                             |
| specific_gravity | Specific Gravity | sg     | 1.1               | 0.2           | 0         | Different: relevant for salt pools (higher due to density)                |
| magnesium        | Magnesium        | ppm    | 1200              | 100           | 0         | Mainly relevant for salt pools (magnesium chloride used for electrolysis) |
| water_level      | Water Level      | %      | 100               | 10            | 0         | Identical for both pool types                                             |
| flow_rate        | Flow Rate        | m³/h   | 10                | 1             | 0         | Identical for proper circulation and filtration                           |
| uv_radiation     | UV Radiation     | mW/cm² | 4                 | 1             | 0         | Identical: used as complement regardless of disinfection method           |
| product_volume   | Product Volume   | L      | 20                | 5             | 0         | Specific to dosing system, identical if used                              |
| product_weight   | Product Weight   | kg     | 25                | 5             | 0         | Specific to dosing system, identical if used                              |

## Differences Between Chlorine and Salt Pools

### TDS (Total Dissolved Solids) and EC (Electrical Conductivity):

- Salt pools:
  - TDS: 3-6 g/L due to dissolved salts needed for electrolysis
  - EC: 3000-6000 µS/cm
- Chlorine pools:
  - TDS: 1-2 g/L maximum
  - EC: 500-1000 µS/cm

### Salinity:

- Relevant only for salt pools

### Specific Gravity:

- Higher for salt pools due to salt water density

### Magnesium:

- Mainly for salt pools (magnesium salt sometimes used for electrolysis)

## General Conclusion

The proposed units, setpoints, and steps are generally valid. The main differences concern salinity, TDS, and magnesium, which vary depending on whether the pool uses traditional chlorine or salt electrolysis. These adjustments ensure optimal water quality management and equipment longevity.

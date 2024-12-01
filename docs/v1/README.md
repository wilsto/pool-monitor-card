# Pool Monitor Card V1 (Non maintained, see V2)

[![version](https://img.shields.io/github/v/release/wilsto/pool-monitor-card?color=green&include_prereleases&style=for-the-badge)](https://github.com/wilsto/pool-monitor-card/releases) [![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)

![all](../../example/v1/hero.png)
[Click me to see more screenshots](../../example/v1/screenshots.md)

---

## Description

The "Pool Monitor Card" is a Home Assistant plugin that displays information from **<span style="color:orange">19 predefined sensors for your pool</span>**:

<div style="display: flex; flex-direction: column; gap: 15px; margin: 20px 0; font-family: Arial, sans-serif; color: #333;">

| Icons                                                                                                                                                                                                                                                     | Category                 | Parameters                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------- |
| ![Temperature](../../resources/temperature.png) ![pH](../../resources/ph.png) ![ORP](../../resources/orp.png) ![TDS](../../resources/tds.png)                                                                                                             | **Essential Parameters** | temperature, pH, ORP and TDS                                         |
| ![Salinity](../../resources/salinity.png) ![Cyanuric acid](../../resources/cya.png) ![Calcium](../../resources/calcium.png) ![Phosphate](../../resources/phosphate.png) ![Alkalinity](../../resources/alkalinity.png)                                     | **Chemical Balance**     | salinity, cyanuric acid, calcium, phosphate and alkalinity           |
| ![Free chlorine](../../resources/free_chlorine.png) ![Total chlorine](../../resources/total_chlorine.png) ![Filter pressure](../../resources/pressure.png) ![Specific gravity](../../resources/sg.png) ![Magnesium](../../resources/magnesium.png)        | **Treatment**            | free/total chlorine, filter pressure, specific gravity and magnesium |
| ![Water level](../../resources/water_level.png) ![Flow rate](../../resources/flow_rate.png) ![UV radiation](../../resources/uv_radiation.png) ![Product volume](../../resources/product_volume.png) ![Product weight](../../resources/product_weight.png) | **Maintenance**          | water level, flow rate, UV radiation and product management          |

<br/>

<details>
  <summary><span style="color:blue">Click me to see details of sensors</span></summary>

- **Temperature**: This refers to the temperature of the water in your pool. The ideal range for temperature in a pool is between 26°C and 28°C. Knowing the temperature can help you decide if it's warm enough for swimming or if it's too cold and might need to be heated.

- **pH**: This is a measure of how acidic or alkaline the water in your pool is. The ideal range for pH in a pool is between 7.0 and 7.4. Maintaining the proper pH level can help prevent skin and eye irritation and keep the pool water safe for swimming.

- **ORP**: This stands for Oxidation Reduction Potential and measures the ability of the water to oxidize or reduce substances in the pool. The ORP level is related to the amount of chlorine or other sanitizers in the pool. The ideal range for chlorine in a pool is between 650 and 750 mV. Maintaining the correct ORP level can help ensure that the pool water is properly sanitized and free of harmful bacteria.

- **TDS**: This stands for Total Dissolved Solids and measures the amount of inorganic and organic substances in the water, such as minerals, salts, and other particles. High levels of TDS can affect water clarity and make it difficult to balance chemicals in the pool. The ideal range for TDS in a saltwater pool is between 3000 and 5000 parts per million (ppm) (3 and 5 g/L).

- **Salinity**: This measures the amount of salt in the water. A saltwater pool requires a specific range of salt to function properly. The ideal range for salt in a saltwater pool is between 2500 and 3500 ppm.

- **CYA**: This stands for Cyanuric Acid and measures the amount of stabilizer in the water. Stabilizer helps to protect the chlorine from being broken down by sunlight. The ideal range for CYA in a pool is between 30 and 50 ppm.

- **Calcium**: This measures the amount of calcium in the water. High levels of calcium can lead to scaling on pool surfaces and equipment. The ideal range for calcium hardness in a pool is between 200 and 400 ppm.

- **Phosphate**: This measures the amount of phosphate in the water. Phosphates in the water can provide food for algae to grow. The ideal range for phosphate in a pool is below 200-300 ppm.

- **Alkalinity**: This measures the ability of the water to resist changes in pH. Proper alkalinity can help to prevent the water from becoming too acidic or alkaline. The ideal range for alkalinity in a pool is between 80 and 120 ppm.

- **Free Chlorine**: This measures the amount of active chlorine in the water that is available to sanitize the pool. The ideal range for free chlorine in a pool is between 1 and 3 ppm.

- **Total Chlorine**: This measures the combined concentration of both free chlorine and chlorine that has combined with contaminants in the water. The ideal range for total chlorine in a pool is up to 5 ppm.

- **Filter pressure**: This measures the pressure inside the pool filter. A high filter pressure can indicate that the filter is dirty and needs to be cleaned. The ideal filter pressure can vary depending on the make and model of the pool filter.

- **Specific Gravity**: A measure that indicates if an object will float or sink in water. Water has a specific gravity of 1.0 at 20°C. This reference point helps determine if substances will float (specific gravity < 1) or sink (specific gravity > 1) in water. This property is important for pool equipment and chemical management.

- **Magnesium**: A mineral that helps prevent scaling and staining in pools. The ideal range for magnesium in a pool is between 20 and 40 ppm. Proper magnesium levels can help improve water clarity and reduce chemical usage.

- **Water Level**: This measures the water level in your pool. Maintaining proper water level is crucial for optimal pool operation. The water level should typically be kept at the middle of the skimmer opening (about halfway up the skimmer opening) for proper filtration. Too low water levels can damage pumps, while too high levels reduce skimmer efficiency. Many pools use sensors to monitor this automatically and some systems can even automatically add water when levels drop too low.

- **Flow Rate**: This measures the volume of water flowing through your pool's filtration system per minute. For small residential pools, the ideal flow rate is around 200 L/min, while larger commercial pools may require up to 500 L/min. Monitoring flow rate is crucial as variations can indicate filter blockages or pump issues. Daily checks should ensure the rate stays within 10% of the setpoint.

- **UV Radiation**: This measures the ultraviolet light output in your pool's UV sanitization system. The optimal wavelength is 254 nanometers (nm) for effective microbial inactivation. The UV output should be monitored weekly to ensure it remains within ±5 nm of this setpoint for maximum effectiveness.

- **Product Volume**: This tracks the volume of liquid chemical products (like pH+ and pH- solutions) in storage. A minimum volume of 10 liters per chemical type should be maintained to prevent shortages. Weekly inventory checks and usage tracking help optimize reorder timing and maintain adequate chemical supplies.

- **Product Weight**: This monitors the weight of powdered chemical products in storage. A minimum of 5 kg should be maintained for essential powdered chemicals. Weekly weight logging and consumption tracking help predict future needs and prevent stock-outs.

</details>

<br/>
With the "Pool Monitor Card", you can easily monitor these important aspects of your swimming pool and make any necessary adjustments to ensure that the water is safe and comfortable for swimming.

---

## Support

Hey dude! Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://bmc.link/wilsto)

---

## Multilanguage ReadMe

Click on the following button to choose the language of your ReadMe : [![fr](https://img.shields.io/badge/lang-fr-green.svg)](https://github.com/wilsto/pool-monitor-card/blob/master/README-fr.md) [![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/wilsto/pool-monitor-card/blob/master/README.md)

## Table of Contents <!-- omit in toc -->

<details>
  <summary> click me to open</summary>

- [Pool Monitor Card](#pool-monitor-card)
  - [Description](#description)
  - [Support](#support)
  - [Multilanguage ReadMe](#multilanguage-readme)
  - [Install](#install)
    - [via HACS](#via-hacs)
    - [Manualy](#manualy)
  - [Lovelace Set up](#lovelace-set-up)
    - [Using UI](#using-ui)
    - [Using YAML](#using-yaml)
      - [Example of code](#example-of-code)
  - [Parameters](#parameters)
    - [Sensors Options](#sensors-options)
    - [Advanced options](#advanced-options)
      - [User eXperience (UX)](#user-experience-ux)
      - [Temperature](#temperature)
      - [pH](#ph)
      - [ORP](#orp)
      - [TDS](#tds)
      - [Salinity](#salinity)
      - [Cyanuric Acid](#cyanuric-acid)
      - [Calcium](#calcium)
      - [Phosphate](#phosphate)
      - [Alkalinity](#alkalinity)
      - [Free Chlorine](#free-chlorine)
      - [Total Chlorine](#total-chlorine)
      - [Filter Pressure](#filter-pressure)
      - [Specific Gravity](#specific-gravity)
      - [Magnesium](#magnesium)
      - [Water Level](#water-level)
      - [Flow Rate](#flow-rate)
      - [UV Radiation](#uv-radiation)
      - [Product Volume](#product-volume)
  - [Min / Max Tickers](#min--max-tickers)
  - [Hardware](#hardware)
  - [Acknowledgments](#acknowledgments)
  - [Roadmap](#roadmap)
    - [Minor Evolutions (No Breaking Changes)](#minor-evolutions-no-breaking-changes)
    - [Major Evolutions (Breaking Changes)](#major-evolutions-breaking-changes)

</details>

---

## Install

### via HACS

Until the Home Assistant Pool Monitor card is available by default in the HACS directory, click on:
[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=wilsto&repository=pool-monitor-card&category=plugin)

### Manualy

1. Download the `pool_monitor_card.js` file from the [latest release available](https://github.com/wilsto/pool-monitor-card/releases) and save it in your `configuration/www` folder.
1. Go to `Configuration > Lovelace dashboard > ../../Resources` in Home Assistant and click on `Add resource`.
   1. Add `/local/community/pool-monitor-card/pool_monitor_card.js` to the URL.
   1. Choose `Javascript Module` as Resource type.

---

## Lovelace Set up

### Using UI

Not yet possible.

### Using YAML

1. You just need to add a new empty card with `type: 'custom:pool-monitor-card'` to your cards list and any of the config that you will find below if you want to customize more your card.

#### Example of code

```yaml
type: 'custom:pool-monitor-card'
temperature: sensor.your_temperature_sensor
ph: sensor.your_ph_sensor
```

---

## Parameters

### Sensors Options

Here's a list of sensors that may be important to monitor, depending on your pool's specific needs. Maintaining levels within the recommended ranges is essential to keep your pool healthy and swimmable.

**\*All are optionals but you need to define at least one of theses entities**

| Name             | Type   | Requirement    | Description                                                                                          | Default |
| ---------------- | ------ | -------------- | ---------------------------------------------------------------------------------------------------- | ------- |
| `type`           | string | **Required**   | `custom:pool-monitor-card`                                                                           |         |
| `temperature`    | string | **Optional\*** | The entity that measures the water temperature.                                                      | `none`  |
| `ph`             | string | **Optional\*** | The entity that measures the acidity or basicity of the water.                                       | `none`  |
| `orp`            | string | **Optional\*** | The entity that measures the Oxidation Reduction Potential of the water.                             | `none`  |
| `tds`            | String | **Optional\*** | The entity that measures the Total Dissolved Solids in the water.                                    | `none`  |
| `salinity`       | String | **Optional\*** | The entity that measures the salt level in the water (for saltwater pools).                          | `none`  |
| `cya`            | String | **Optional\*** | The entity that measures the Cyanuric Acid level in the water.                                       | `none`  |
| `calcium`        | String | **Optional\*** | The entity that measures the Calcium Hardness level in the water.                                    | `none`  |
| `phosphate`      | String | **Optional\*** | The entity that measures the Phosphate level in the water.                                           | `none`  |
| `free_chlorine`  | String | **Optional\*** | The entity that measures the concentration of free chlorine in the water.                            | `none`  |
| `total_chlorine` | String | **Optional\*** | The entity that measures the concentration of both free chlorine and combined chlorine in the water. | `none`  |
| `alkalinity`     | String | **Optional\*** | The entity that measures the alkalinity of the water.                                                | `none`  |
| `pressure`       | String | **Optional\*** | The entity that measures the filter pressure in the pool.                                            | `none`  |
| `sg`             | String | **Optional\*** | The entity that measures the specific gravity of the water.                                          | `none`  |
| `magnesium`      | String | **Optional\*** | The entity that measures the magnesium level in the water.                                           | `none`  |
| `water_level`    | String | **Optional\*** | The entity that measures the water level in your pool.                                               | `none`  |
| `flow_rate`      | String | **Optional\*** | The entity that measures the flow rate through your pool's filtration system.                        | `none`  |
| `uv_radiation`   | String | **Optional\*** | The entity that measures the UV light output in your pool's sanitization system.                     | `none`  |
| `product_volume` | String | **Optional\*** | The entity that tracks the volume of liquid chemical products in storage.                            | `none`  |
| `product_weight` | String | **Optional\*** | The entity that monitors the weight of powdered chemical products in storage.                        | `none`  |

### Advanced options

You can go further with the card by modifying the user interface (UI).

#### User eXperience (UX)

| Name                | Type    | Requirement  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Default |
| ------------------- | ------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `title`             | string  | **Optional** | Pool Monitor Card Title                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `none`  |
| `compact`           | boolean | **Optional** | Compact Mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `false` |
| `show_names`        | boolean | **Optional** | Display the name of the entity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `true`  |
| `show_labels`       | boolean | **Optional** | Display the state qualification (Low, Ideal, High)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `true`  |
| `show_last_updated` | boolean | **Optional** | Display the last updated sensor relative date [Only for compact = false]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `false` |
| `show_icons`        | boolean | **Optional** | Display the icons of the entities                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `true`  |
| `show_units`        | boolean | **Optional** | Display the units of the entities                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `true`  |
| `language`          | string  | **Optional** | Interface language (12 languages supported) - (![GB](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/gb.png) en, ![FR](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/fr.png) fr, ![ES](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/es.png) es, ![DE](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/de.png) de, ![IT](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/it.png) it, ![NL](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/nl.png) nl, ![PT](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/pt.png) pt, ![BR](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/br.png) pt-br, ![RO](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/ro.png) ro, ![SK](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/sk.png) sk, ![IL](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/il.png) he, ![RU](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/ru.png) ru) | `en`    |

**Bar Colors Customisation**
| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `normal_color` | String | **Optional** | Color for normal range values (e.g. `var(--dark-primary-color)`) | `#00b894` |
| `low_color` | String | **Optional** | Color for low range values (e.g. `var(--primary-color)`) | `#Fdcb6e` |
| `warn_color` | String | **Optional** | Color for warning range values (e.g. `var(--light-primary-color)`) | `#e17055` |
| `marker_color` | String | **Optional** | Color for min/max markers (e.g. `black`) | `rgb(0, 0, 0, 1)` |
| `hi_low_color` | String | **Optional** | Color for high/low range values (e.g. `red`) | `rgb(0, 0, 0, .6)` |

Needed to change the unit, setpoint, and steps ? No problem, see additionnal parameters below for each measured entity .

#### Temperature

| Name                   | Type   | Requirement  | Description                                                                                                                | Default                                      |
| ---------------------- | ------ | ------------ | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `temperature_name`     | String | **Optional** | Sensor Name                                                                                                                | `Temperature` <small>[Multilanguage]</small> |
| `temperature_unit`     | String | **Optional** | Temperature Unit (°C or °F)                                                                                                | `°C`                                         |
| `temperature_setpoint` | Number | **Optional** | Temperature Set Point                                                                                                      | If unit=°C:`27` <br/> If unit=°F:`80`        |
| `temperature_step`     | Number | **Optional** | Temperature Step                                                                                                           | If unit=°C:`1` <br/> If unit=°F:`2`          |
| `temperature_min`      | String | **Optional** | Entity ID for daily minimum temperature                                                                                    | `none`                                       |
| `temperature_max`      | String | **Optional** | Entity ID for daily maximum temperature                                                                                    | `none`                                       |
| `temperature_icon`     | Object | **Optional** | Configure the icon for temperature. Use `image_url` for a custom image, `mdi` for an MDI icon, or `hide` to hide the icon. | `none`                                       |

**_Icon Configuration_**

For each sensor, you have the flexibility to customize the icon in your YAML configuration using one of four methods (illustrated here with the temperature sensor example):

1. Hide the icon completely:

```yaml
temperature_icon:
  hide: true
```

2. Use a custom image URL:

```yaml
temperature_icon:
  image_url: 'https://example.com/temperature-icon.png'
```

3. Use an MDI icon:

```yaml
temperature_icon:
  mdi: 'mdi:thermometer'
```

4. By default (if no configuration is specified), it will use the images from the ../../resources directory as before.

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

<details>
  <summary> click me to open and see all the parameters </summary>

> **NOTE:** I added a second parameter called temperature_2 (with the same logic for name, unit, setpoint, step) for those who have multiple temperature sensors. Click me to open.

| Name                     | Type   | Requirement  | Description                                                                                        | Default                                        |
| ------------------------ | ------ | ------------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `temperature_2_name`     | String | **Optional** | Sensor Name                                                                                        | `Temperature 2` <small>[Multilanguage]</small> |
| `temperature_2_unit`     | String | **Optional** | Temperature Unit (°C or °F)                                                                        | `°C`                                           |
| `temperature_2_setpoint` | Number | **Optional** | Temperature Set Point                                                                              | If unit=°C:`27` <br/> If unit=°F:`80`          |
| `temperature_2_step`     | Number | **Optional** | Temperature Step                                                                                   | If unit=°C:`1` <br/> If unit=°F:`2`            |
| `temperature_2_min`      | String | **Optional** | Entity ID for daily minimum temperature                                                            | `none`                                         |
| `temperature_2_max`      | String | **Optional** | Entity ID for daily maximum temperature                                                            | `none`                                         |
| `temperature_2_icon`     | Object | **Optional** | Configure the icon for temperature_2. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                         |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### pH

| Name          | Type   | Requirement  | Description                                                                             | Default                             |
| ------------- | ------ | ------------ | --------------------------------------------------------------------------------------- | ----------------------------------- |
| `ph_name`     | String | **Optional** | Sensor Name                                                                             | `pH` <small>[Multilanguage]</small> |
| `ph_unit`     | String | **Optional** | pH Unit                                                                                 | `pH`                                |
| `ph_setpoint` | Number | **Optional** | pH Set Point                                                                            | `7.2`                               |
| `ph_step`     | Number | **Optional** | pH Step                                                                                 | `0.2`                               |
| `ph_min`      | String | **Optional** | Entity ID for daily minimum pH                                                          | `none`                              |
| `ph_max`      | String | **Optional** | Entity ID for daily maximum pH                                                          | `none`                              |
| `ph_icon`     | Object | **Optional** | Configure the icon for pH. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                              |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### ORP

| Name           | Type   | Requirement  | Description                                                                              | Default                              |
| -------------- | ------ | ------------ | ---------------------------------------------------------------------------------------- | ------------------------------------ |
| `orp_name`     | String | **Optional** | Sensor Name                                                                              | `ORP` <small>[Multilanguage]</small> |
| `orp_unit`     | String | **Optional** | ORP Unit                                                                                 | `mV`                                 |
| `orp_setpoint` | Number | **Optional** | ORP Set Point                                                                            | `700`                                |
| `orp_step`     | Number | **Optional** | ORP Step                                                                                 | `50`                                 |
| `orp_min`      | String | **Optional** | Entity ID for daily minimum ORP                                                          | `none`                               |
| `orp_max`      | String | **Optional** | Entity ID for daily maximum ORP                                                          | `none`                               |
| `orp_icon`     | Object | **Optional** | Configure the icon for ORP. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                               |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### TDS

| Name           | Type   | Requirement  | Description                                                                              | Default                                  |
| -------------- | ------ | ------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------- |
| `tds_name`     | String | **Optional** | Sensor Name                                                                              | `TDS` <small>[Multilanguage]</small>     |
| `tds_unit`     | String | **Optional** | TDS Unit (g/L or ppm)                                                                    | `g/L`                                    |
| `tds_setpoint` | Number | **Optional** | TDS Set Point                                                                            | If unit=g/L:`4` <br/> If unit=ppm:`4000` |
| `tds_step`     | Number | **Optional** | TDS Step                                                                                 | If unit=g/L:`1` <br/> If unit=ppm:`1000` |
| `tds_min`      | String | **Optional** | Entity ID for daily minimum TDS                                                          | `none`                                   |
| `tds_max`      | String | **Optional** | Entity ID for daily maximum TDS                                                          | `none`                                   |
| `tds_icon`     | Object | **Optional** | Configure the icon for TDS. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                   |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### Salinity

| Name                | Type   | Requirement  | Description                                                                                   | Default                                    |
| ------------------- | ------ | ------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `salinity_name`     | String | **Optional** | Sensor Name                                                                                   | `Salinity` <small>[Multilanguage]</small>  |
| `salinity_unit`     | String | **Optional** | Salinity Unit (ppm or g/L)                                                                    | `ppm`                                      |
| `salinity_setpoint` | Number | **Optional** | Salinity Set Point                                                                            | If unit=g/L:`4.5` <br/> If unit=ppm:`3000` |
| `salinity_step`     | Number | **Optional** | Salinity Step                                                                                 | If unit=g/L:`0.5` <br/> If unit=ppm:`500`  |
| `salinity_min`      | String | **Optional** | Entity ID for daily minimum salinity                                                          | `none`                                     |
| `salinity_max`      | String | **Optional** | Entity ID for daily maximum salinity                                                          | `none`                                     |
| `salinity_icon`     | Object | **Optional** | Configure the icon for salinity. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                     |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### Cyanuric Acid

| Name           | Type   | Requirement  | Description                                                                                        | Default                                        |
| -------------- | ------ | ------------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `cya_name`     | String | **Optional** | Sensor Name                                                                                        | `Cyanuric Acid` <small>[Multilanguage]</small> |
| `cya_unit`     | String | **Optional** | Cyanuric Acid Unit                                                                                 | `ppm`                                          |
| `cya_setpoint` | Number | **Optional** | Cyanuric Acid Set Point                                                                            | `40`                                           |
| `cya_step`     | Number | **Optional** | Cyanuric Acid Step                                                                                 | `10`                                           |
| `cya_min`      | String | **Optional** | Entity ID for daily minimum Cyanuric Acid                                                          | `none`                                         |
| `cya_max`      | String | **Optional** | Entity ID for daily maximum Cyanuric Acid                                                          | `none`                                         |
| `cya_icon`     | Object | **Optional** | Configure the icon for Cyanuric Acid. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                         |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### Calcium

| Name               | Type   | Requirement  | Description                                                                                  | Default                                  |
| ------------------ | ------ | ------------ | -------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `calcium_name`     | String | **Optional** | Sensor Name                                                                                  | `Calcium` <small>[Multilanguage]</small> |
| `calcium_unit`     | String | **Optional** | Calcium Unit                                                                                 | `ppm`                                    |
| `calcium_setpoint` | Number | **Optional** | Calcium Set Point                                                                            | `300`                                    |
| `calcium_step`     | Number | **Optional** | Calcium Step                                                                                 | `100`                                    |
| `calcium_min`      | String | **Optional** | Entity ID for daily minimum calcium                                                          | `none`                                   |
| `calcium_max`      | String | **Optional** | Entity ID for daily maximum calcium                                                          | `none`                                   |
| `calcium_icon`     | Object | **Optional** | Configure the icon for calcium. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                   |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### Phosphate

| Name                 | Type   | Requirement  | Description                                                                                    | Default                                    |
| -------------------- | ------ | ------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `phosphate_name`     | String | **Optional** | Sensor Name                                                                                    | `Phosphate` <small>[Multilanguage]</small> |
| `phosphate_unit`     | String | **Optional** | Phosphate Unit                                                                                 | `ppb`                                      |
| `phosphate_setpoint` | Number | **Optional** | Phosphate Set Point                                                                            | `100`                                      |
| `phosphate_step`     | Number | **Optional** | Phosphate Step                                                                                 | `100`                                      |
| `phosphate_min`      | String | **Optional** | Entity ID for daily minimum phosphate                                                          | `none`                                     |
| `phosphate_max`      | String | **Optional** | Entity ID for daily maximum phosphate                                                          | `none`                                     |
| `phosphate_icon`     | Object | **Optional** | Configure the icon for phosphate. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                     |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### Alkalinity

| Name                  | Type   | Requirement  | Description                                                                                     | Default                                     |
| --------------------- | ------ | ------------ | ----------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `alkalinity_name`     | String | **Optional** | Sensor Name                                                                                     | `Alkalinity` <small>[Multilanguage]</small> |
| `alkalinity_unit`     | String | **Optional** | Alkalinity Unit                                                                                 | `ppm`                                       |
| `alkalinity_setpoint` | Number | **Optional** | Alkalinity Set Point                                                                            | `100`                                       |
| `alkalinity_step`     | Number | **Optional** | Alkalinity Step                                                                                 | `20`                                        |
| `alkalinity_min`      | String | **Optional** | Entity ID for daily minimum alkalinity                                                          | `none`                                      |
| `alkalinity_max`      | String | **Optional** | Entity ID for daily maximum alkalinity                                                          | `none`                                      |
| `alkalinity_icon`     | Object | **Optional** | Configure the icon for alkalinity. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                      |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### Free Chlorine

| Name                     | Type   | Requirement  | Description                                                                                        | Default                                        |
| ------------------------ | ------ | ------------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `free_chlorine_name`     | String | **Optional** | Sensor Name                                                                                        | `Free Chlorine` <small>[Multilanguage]</small> |
| `free_chlorine_unit`     | String | **Optional** | Free Chlorine Unit                                                                                 | `ppm`                                          |
| `free_chlorine_setpoint` | Number | **Optional** | Free Chlorine Set Point                                                                            | `2`                                            |
| `free_chlorine_step`     | Number | **Optional** | Free Chlorine Step                                                                                 | `1`                                            |
| `free_chlorine_min`      | String | **Optional** | Entity ID for daily minimum free chlorine                                                          | `none`                                         |
| `free_chlorine_max`      | String | **Optional** | Entity ID for daily maximum free chlorine                                                          | `none`                                         |
| `free_chlorine_icon`     | Object | **Optional** | Configure the icon for free chlorine. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                         |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### Total Chlorine

| Name                      | Type   | Requirement  | Description                                                                                         | Default                                         |
| ------------------------- | ------ | ------------ | --------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `total_chlorine_name`     | String | **Optional** | Sensor Name                                                                                         | `Total Chlorine` <small>[Multilanguage]</small> |
| `total_chlorine_unit`     | String | **Optional** | Total Chlorine Unit                                                                                 | `ppm`                                           |
| `total_chlorine_setpoint` | Number | **Optional** | Total Chlorine Set Point                                                                            | `3`                                             |
| `total_chlorine_step`     | Number | **Optional** | Total Chlorine Step                                                                                 | `1`                                             |
| `total_chlorine_min`      | String | **Optional** | Entity ID for daily minimum total chlorine                                                          | `none`                                          |
| `total_chlorine_max`      | String | **Optional** | Entity ID for daily maximum total chlorine                                                          | `none`                                          |
| `total_chlorine_icon`     | Object | **Optional** | Configure the icon for total chlorine. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                          |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### Filter Pressure

| Name                | Type   | Requirement  | Description                                                                                          | Default                                          |
| ------------------- | ------ | ------------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `pressure_name`     | String | **Optional** | Sensor Name                                                                                          | `Filter Pressure` <small>[Multilanguage]</small> |
| `pressure_unit`     | String | **Optional** | Filter Pressure Unit (psi or bar)                                                                    | `psi`                                            |
| `pressure_setpoint` | Number | **Optional** | Filter Pressure Set Point                                                                            | `20`                                             |
| `pressure_step`     | Number | **Optional** | Filter Pressure Step                                                                                 | `10`                                             |
| `pressure_min`      | String | **Optional** | Entity ID for daily minimum filter pressure                                                          | `none`                                           |
| `pressure_max`      | String | **Optional** | Entity ID for daily maximum filter pressure                                                          | `none`                                           |
| `pressure_icon`     | Object | **Optional** | Configure the icon for filter pressure. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                           |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### Specific Gravity

| Name          | Type   | Requirement  | Description                                                                                           | Default                                           |
| ------------- | ------ | ------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `sg_name`     | String | **Optional** | Sensor Name                                                                                           | `Specific Gravity` <small>[Multilanguage]</small> |
| `sg_unit`     | String | **Optional** | Specific Gravity Unit                                                                                 | `g/cm³`                                           |
| `sg_setpoint` | Number | **Optional** | Specific Gravity Set Point                                                                            | `1`                                               |
| `sg_step`     | Number | **Optional** | Specific Gravity Step                                                                                 | `0.001`                                           |
| `sg_min`      | String | **Optional** | Entity ID for daily minimum specific gravity                                                          | `none`                                            |
| `sg_max`      | String | **Optional** | Entity ID for daily maximum specific gravity                                                          | `none`                                            |
| `sg_icon`     | Object | **Optional** | Configure the icon for specific gravity. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                            |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### Magnesium

| Name                 | Type   | Requirement  | Description                                                                                    | Default                                    |
| -------------------- | ------ | ------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `magnesium_name`     | String | **Optional** | Sensor Name                                                                                    | `Magnesium` <small>[Multilanguage]</small> |
| `magnesium_unit`     | String | **Optional** | Magnesium Unit                                                                                 | `ppm`                                      |
| `magnesium_setpoint` | Number | **Optional** | Magnesium Set Point                                                                            | `700`                                      |
| `magnesium_step`     | Number | **Optional** | Magnesium Step                                                                                 | `100`                                      |
| `magnesium_min`      | String | **Optional** | Entity ID for daily minimum magnesium                                                          | `none`                                     |
| `magnesium_max`      | String | **Optional** | Entity ID for daily maximum magnesium                                                          | `none`                                     |
| `magnesium_icon`     | Object | **Optional** | Configure the icon for magnesium. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                     |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### Water Level

| Name                  | Type   | Requirement  | Description                                                                                      | Default                                      |
| --------------------- | ------ | ------------ | ------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `waterlevel_name`     | String | **Optional** | Sensor Name                                                                                      | `Water Level` <small>[Multilanguage]</small> |
| `waterlevel_unit`     | String | **Optional** | Water Level Unit                                                                                 | `cm`                                         |
| `waterlevel_setpoint` | Number | **Optional** | Water Level Set Point                                                                            | `15`                                         |
| `waterlevel_step`     | Number | **Optional** | Water Level Step                                                                                 | `5`                                          |
| `waterlevel_min`      | String | **Optional** | Entity ID for daily minimum water level                                                          | `none`                                       |
| `waterlevel_max`      | String | **Optional** | Entity ID for daily maximum water level                                                          | `none`                                       |
| `waterlevel_icon`     | Object | **Optional** | Configure the icon for water level. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                       |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### Flow Rate

| Name                | Type   | Requirement  | Description                                                                                    | Default                                    |
| ------------------- | ------ | ------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `flowrate_name`     | String | **Optional** | Sensor Name                                                                                    | `Flow Rate` <small>[Multilanguage]</small> |
| `flowrate_unit`     | String | **Optional** | Flow Rate Unit                                                                                 | `L/min`                                    |
| `flowrate_setpoint` | Number | **Optional** | Flow Rate Set Point                                                                            | `200`                                      |
| `flowrate_step`     | Number | **Optional** | Flow Rate Step                                                                                 | `50`                                       |
| `flowrate_min`      | String | **Optional** | Entity ID for daily minimum flow rate                                                          | `none`                                     |
| `flowrate_max`      | String | **Optional** | Entity ID for daily maximum flow rate                                                          | `none`                                     |
| `flowrate_icon`     | Object | **Optional** | Configure the icon for flow rate. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                     |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### UV Radiation

| Name          | Type   | Requirement  | Description                                                                                       | Default                                       |
| ------------- | ------ | ------------ | ------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `uv_name`     | String | **Optional** | Sensor Name                                                                                       | `UV Radiation` <small>[Multilanguage]</small> |
| `uv_unit`     | String | **Optional** | UV Radiation Unit                                                                                 | `nm`                                          |
| `uv_setpoint` | Number | **Optional** | UV Radiation Set Point                                                                            | `254`                                         |
| `uv_step`     | Number | **Optional** | UV Radiation Step                                                                                 | `5`                                           |
| `uv_min`      | String | **Optional** | Entity ID for daily minimum UV radiation                                                          | `none`                                        |
| `uv_max`      | String | **Optional** | Entity ID for daily maximum UV radiation                                                          | `none`                                        |
| `uv_icon`     | Object | **Optional** | Configure the icon for UV radiation. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                        |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

#### Product Volume

| Name              | Type   | Requirement  | Description                                                                                         | Default                                         |
| ----------------- | ------ | ------------ | --------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `volume_name`     | String | **Optional** | Sensor Name                                                                                         | `Product Volume` <small>[Multilanguage]</small> |
| `volume_unit`     | String | **Optional** | Product Volume Unit                                                                                 | `L`                                             |
| `volume_setpoint` | Number | **Optional** | Product Volume Set Point                                                                            | `10`                                            |
| `volume_step`     | Number | **Optional** | Product Volume Step                                                                                 | `2`                                             |
| `volume_min`      | String | **Optional** | Entity ID for daily minimum product volume                                                          | `none`                                          |
| `volume_max`      | String | **Optional** | Entity ID for daily maximum product volume                                                          | `none`                                          |
| `volume_icon`     | Object | **Optional** | Configure the icon for product volume. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                          |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

| Name              | Type   | Requirement  | Description                                                                                         | Default                                         |
| ----------------- | ------ | ------------ | --------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `weight_name`     | String | **Optional** | Sensor Name                                                                                         | `Product Weight` <small>[Multilanguage]</small> |
| `weight_unit`     | String | **Optional** | Product Weight Unit                                                                                 | `kg`                                            |
| `weight_setpoint` | Number | **Optional** | Product Weight Set Point                                                                            | `5`                                             |
| `weight_step`     | Number | **Optional** | Product Weight Step                                                                                 | `1`                                             |
| `weight_min`      | String | **Optional** | Entity ID for daily minimum product weight                                                          | `none`                                          |
| `weight_max`      | String | **Optional** | Entity ID for daily maximum product weight                                                          | `none`                                          |
| `weight_icon`     | Object | **Optional** | Configure the icon for product weight. Use `image_url` for a custom image or `mdi` for an MDI icon. | `none`                                          |

> **Note:** If min/max entities are defined, they will appear as tick marks on the bar chart.

</details>

---

## Min / Max Tickers

Min/max entities defined in the YAML configuration will be displayed as tick marks on the bar chart, as shown in the example below:

```yaml
ph: sensor.iopool_ph
ph_min: sensor.daily_ph_min
ph_max: sensor.daily_ph_max
```

They will display as tick marks on the bar chart.

![all](../../example/v1/minmax.png)

For the sensors I use the statistics platform:

```yaml
sensor:
  - platform: statistics
    name: 'Daily pH Min'
    unique_id: <UUID>
    entity_id: sensor.iopool_ph
    state_characteristic: value_min
    max_age:
      hours: 24
  - platform: statistics
    name: 'Daily pH Max'
    unique_id: <UUID>
    entity_id: sensor.iopool_ph
    state_characteristic: value_max
    max_age:
      hours: 24
```

---

## Hardware

Here is a non-exhaustive, non-tested and non-affiliated list of different materials that may capture some of the above values:

| Brand     | Model                                                                                                                 | Temp | pH  | ORP | TDS | HA Support                                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------------------- | ---- | --- | --- | --- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Bluerriot | [Blue Connect](https://www.blueriiot.com/us-en)                                                                       | ✔️   | ✔️  | ✔️  | ❌  | [Blog](https://blog.mikejmcguire.com/2021/12/30/home-assistant-add-on-for-blueriiot-blue-connect-plus/)                              |
| Bluerriot | [Blue Connect Plus Gold](https://www.blueriiot.com/us-en)                                                             | ✔️   | ✔️  | ✔️  | ✔️  | [Blog](https://blog.mikejmcguire.com/2021/12/30/home-assistant-add-on-for-blueriiot-blue-connect-plus/)                              |
| Flipr     | [AnalysR](https://goflipr.com/flipr-analysr-3/)                                                                       | ✔️   | ✔️  | ✔️  | ❌  | [Component](https://www.home-assistant.io/integrations/flipr/)                                                                       |
| Inkbird   | [IBS-P01R Bluetooth](https://pool-thermometer.eu/shop/wifi-swimming-pool-thermometer-bundle-weather-station/?lang=en) | ✔️   | ❌  | ❌  | ❌  | [Component](https://www.home-assistant.io/integrations/inkbird/)                                                                     |
| iopool    | [ECO](https://iopool.com/pages/pool-monitor)                                                                          | ✔️   | ✔️  | ✔️  | ❌  | [Tuto fr @mguyard](https://forum.hacf.fr/t/tuto-gestion-de-sa-piscine-avec-sonde-iopool/24292)                                       |
| Ondilo    | [ICO Pool](https://ondilo.com/en/ico-pool/)                                                                           | ✔️   | ✔️  | ✔️  | ✔️  | [Component](https://www.home-assistant.io/integrations/ondilo_ico/)                                                                  |
| Zodiac    | [iAqualink eXO iQ](https://www.zodiac-poolcare.com/traitement-de-l-eau/electrolyseurs-au-sel/gamme-exo--iq/exo--iq)   | ✔️   | ✔️  | ✔️  | ❌  | [Tuto via nodeRED](../../example/v1/zodiac.md)                                                                                       |
| Tuya      | [BLE-YL01](https://www.zigbee2mqtt.io/devices/BLE-YL01.html)                                                          | ✔️   | ✔️  | ✔️  | ✔️  | [Tuto](https://community.home-assistant.io/t/pool-monitoring-device-yieryi-ble-yl01-zigbee-ph-orp-free-chlorine-salinity-etc/659545) |

> **_NOTE:_** ✔️ indicates that the model is able to measure the specified parameter, while ❌ indicates it is not.
> The last column is about info to connect it to Home Assistant.

[Click me to see more hardware](../../example/v1/hardware.md)

---

## Acknowledgments

This card wouldn't be what it is today without our amazing contributors! I'm incredibly grateful for everyone who has helped make it better. Whether you've added features, fixed bugs, or helped with translations - you rock! 🌟

> **A Big Thank You To:**
>
> - [Gregtakacs](https://github.com/gregtakacs) for adding those awesome Min/Max Tickers and letting users customize their bar colors
> - [Djgel](https://github.com/djgel) for implementing specific gravity measurements
> - [JDeighty4](https://github.com/JDeighty4) for adding magnesium sensor support
>
> And a huge thank you to our translators for making this map available in so many languages! 🌐
>
> - [Sebaer1976](https://github.com/sebaer1976) and [Splitti](https://github.com/splitti) for bringing it to German speakers
> - [Djgel](https://github.com/djgel) and [jorgemiguel4](https://github.com/jorgemiguel4) for the Portuguese translation
> - [CosminFRC](https://github.com/CosminFRC) for the Romanian version
> - [Misa1515](https://github.com/misa1515) for Slovak support
> - [ViPeR5000](https://github.com/ViPeR5000) for the Polish translation
> - [Yehuda](https://github.com/Yehuda) for making it accessible to Hebrew users
> - [MrSnakeSPb](https://github.com/MrSnakeSPb) for the Russian translation
>
> Special thanks to those who helped expand hardware support and compatibility:
>
> - [hlaffez](https://github.com/hlaffez) for Tuya BLE-YL01 compatibility
> - [DAVIZINH0](https://github.com/DAVIZINH0) for bluerriot compatibility information

---

## Roadmap

Here's what's coming up for Pool Monitor Card! We're constantly working to improve and add new features.

### Minor Evolutions (No Breaking Changes)

These updates won't require any changes to your existing configuration:

- 🎨 Additional customization options for the UI
  - [Issue #48](https://github.com/wilsto/pool-monitor-card/issues/48) : Gradient bar and layout options
  - [Issue #37](https://github.com/wilsto/pool-monitor-card/issues/37) : hints on how to improve water quality
  - [Issue #12](https://github.com/wilsto/pool-monitor-card/issues/12) : Minimum limit value
- 🌐 More language translations
- 🔧 Additional hardware support
- 🐛 Ongoing bug fixes and performance improvements
- 📝 Improving documentation

### Major Evolutions (Breaking Changes)

These updates may require configuration changes when implemented:

- 🔄 Complete rewrite to improve maintainability and add new features
  - [Issue #25](https://github.com/wilsto/pool-monitor-card/issues/25) : yaml config arrays VS single configurables
  - [Issue #43](https://github.com/wilsto/pool-monitor-card/issues/43) : multiple ph link to #25
  - [Issue #11](https://github.com/wilsto/pool-monitor-card/issues/11) : Reorder the sensors
  - [Issue #14](https://github.com/wilsto/pool-monitor-card/issues/14) : Set Pool Ideal Range Value
- 🔍 Moving to TypeScript for better code quality
- 🏗️ Implementing a more modular architecture
- ✅ Adding comprehensive testing

> **Note:** This roadmap is subject to change based on community feedback and needs. Feel free to contribute ideas by opening issues on GitHub!

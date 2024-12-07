# Pool Monitor Card

[![Release][release-shield]][release-link]
[![hacs][hacs-shield]][hacs-link]
[![Project Maintenance][maintenance-shield]][maintenance-link]
[![GitHub Activity][commits-shield]][commits-link]
![Github last commit][git-last-commit-badge]
[![codecov][codecov-shield]][codecov-link]
[![Coverage Status](https://codecov.io/gh/wilsto/pool-monitor-card/branch/master/graph/badge.svg)](https://codecov.io/gh/wilsto/pool-monitor-card)

![all](example/hero.png)
[Click here to see various configurations and visual tests for Pool Monitor V2](example/screenshots.md)

> ⚠️ **BREAKING CHANGE: Version 2.0** ⚠️
>
> 🚀 **Version 2.0** is here! This release is a complete overhaul, bringing exciting new features, a more intuitive user experience, and a more maintainable structure.
>
> **Major Changes:**
>
> - **Improved User Experience:**
>   - Added support for multiple entities per sensor type ([#25](https://github.com/wilsto/pool-monitor-card/issues/25), [#43](https://github.com/wilsto/pool-monitor-card/issues/43))
>   - Organized sensor display for a more intuitive layout ([#11](https://github.com/wilsto/pool-monitor-card/issues/11))
>   - Introduced a new display mode with gradient bars and flexible layout options ([#48](https://github.com/wilsto/pool-monitor-card/issues/48))
>   - ⚠️ **Updated configuration structure:** `sensors` object for defining sensor parameters and `display` object for customizing the layout.  
>     🔴 **You will need to migrate your YAML configuration from version 1 to version 2.**
>
> 📖 **Migration Guide**
> To help you transition your configuration from v1 to v2, follow these steps:
>
> 1. Replace old sensor definitions with the new `sensors` object.
> 2. Update display settings using the new `display` object.
> 3. Refer to the updated documentation for detailed YAML examples.
>
> 👉 [View the Full Migration Guide](docs/MIGRATION.md)

---

## Description

The "Pool Monitor Card" is a Home Assistant plugin that displays information from **<span style="color:orange">20 predefined sensors for your pool</span>**, allowing you to easily monitor these important aspects of your swimming pool and make any necessary adjustments to ensure that the water is safe and comfortable for swimming.

<div style="display: flex; flex-direction: column; gap: 15px; margin: 20px 0; font-family: Arial, sans-serif; color: #333;">

| Icons                                                                                                                                                                                                                       | Category                 | Parameters                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------- |
| ![Temperature](resources/temperature.png) ![pH](resources/ph.png) ![ORP](resources/orp.png) ![TDS](resources/tds.png) ![EC](resources/ec.png)                                                                               | **Essential Parameters** | temperature, pH, ORP, TDS and EC                                     |
| ![Salinity](resources/salinity.png) ![Cyanuric acid](resources/cya.png) ![Calcium](resources/calcium.png) ![Phosphate](resources/phosphate.png) ![Alkalinity](resources/alkalinity.png)                                     | **Chemical Balance**     | salinity, cyanuric acid, calcium, phosphate and alkalinity           |
| ![Free chlorine](resources/free_chlorine.png) ![Total chlorine](resources/total_chlorine.png) ![Filter pressure](resources/pressure.png) ![Specific gravity](resources/sg.png) ![Magnesium](resources/magnesium.png)        | **Treatment**            | free/total chlorine, filter pressure, specific gravity and magnesium |
| ![Water level](resources/water_level.png) ![Flow rate](resources/flow_rate.png) ![UV radiation](resources/uv_radiation.png) ![Product volume](resources/product_volume.png) ![Product weight](resources/product_weight.png) | **Maintenance**          | water level, flow rate, UV radiation and product management          |

For detailed information about all available sensors and their ideal ranges, please see our [Sensors Documentation](docs/sensors.md).

---

## Support

Hey dude! Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://bmc.link/wilsto)

---

## Table of Contents <!-- omit in toc -->

<!-- markdownlint-disable MD033 -->

- [Pool Monitor Card](#pool-monitor-card)
- [Description](#description)
- [Support](#support)
- [Multilanguage ReadMe](#multilanguage-readme)
- [Install](#install)
  - [via HACS](#via-hacs)
  - [Manually](#manually)
- [Lovelace Setup](#lovelace-setup)
  - [Using UI](#using-ui)
  - [Using YAML](#using-yaml)
- [Configuration](#configuration)
  - [Card Options](#card-options)
  - [Display Options](#display-options)
  - [Color Options](#color-options)
  - [Sensors Options](#sensors-options)
- [Min / Max Indicators](#min--max-indicators)
- [Hardware Compatibility](#hardware-compatibility)
- [Acknowledgments](#acknowledgments)
- [Roadmap](#roadmap)
  - [Minor Enhancements](#minor-enhancements)
  - [Major Updates](#major-updates)

---

## Install

### Install Pool Monitor Card via HACS

1. **Open HACS**: Go to the **Frontend** tab.
2. **Search**: Look for **Pool Monitor Card**.
3. **Install**: Select the card and click **Install**.
4. **Refresh**: Reload Home Assistant with `Ctrl + F5` or `Shift + ⌘ + R`.
5. **Add**: Edit your Lovelace dashboard and add **Pool Monitor Card**.

or click on:

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=wilsto&repository=pool-monitor-card&category=plugin)

### Manualy

<details>
<summary>Click to expand installation instructions</summary>

1. Download the `pool_monitor_card.js` file from the [latest release available](https://github.com/wilsto/pool-monitor-card/releases) and save it in your `configuration/www` folder.
1. Go to `Configuration > Lovelace dashboard > Resources` in Home Assistant and click on `Add resource`.
   1. Add `/local/community/pool-monitor-card/pool_monitor_card.js` to the URL.
   1. Choose `Javascript Module` as Resource type.

</details>

---

## Lovelace Set up

### Using UI

Not yet possible.

### Using YAML

1. You just need to add a new empty card with `type: 'custom:pool-monitor-card'` to your cards list and any of the config that you will find below if you want to customize more your card.

#### Example of code

```yaml
type: 'custom:pool-monitor-card'
sensors:
  temperature:
    - entity: sensor.your_temperature_sensor
  ph:
    - entity: sensor.your_ph_sensor
```

---

## Parameters

| Name      | Type   | Requirement  | Description                                                                                  | Default |
| --------- | ------ | ------------ | -------------------------------------------------------------------------------------------- | ------- |
| `type`    | string | **Required** | `custom:pool-monitor-card`                                                                   |         |
| `title`   | string | Optional     | Pool Monitor Card Title                                                                      | `none`  |
| `display` | object | Optional     | UI display settings. See [Display Options](#display-options) for details.                    | {}      |
| `colors`  | object | Optional     | Color settings for the card. See [Color Options](#color-options) for details.                | {}      |
| `sensors` | object | **Required** | Configuration for various pool sensors. See [Sensors Options](#sensors-options) for details. | {}      |

```yaml
type: 'custom:pool-monitor-card'
display:
  language: 'fr'
colors:
  normal_color: '#00b894'
sensors:
  temperature:
    - entity: sensor.pool_temperature
```

### Display Options

You can go further with the card by modifying the user interface (UI).

| Name                | Type    | Requirement | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Default |
| ------------------- | ------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `title`             | string  | Optional    | Pool Monitor Card Title                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `none`  |
| `compact`           | boolean | Optional    | Compact Mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `false` |
| `show_names`        | boolean | Optional    | Display the name of the entity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `true`  |
| `show_labels`       | boolean | Optional    | Display the state qualification (Low, Ideal, High)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `true`  |
| `show_last_updated` | boolean | Optional    | Display the last updated sensor relative date [Only for compact = false]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `false` |
| `show_icons`        | boolean | Optional    | Display the icons of the entities                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `true`  |
| `show_units`        | boolean | Optional    | Display the units of the entities                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `true`  |
| `gradient`          | boolean | Optional    | Display the gradient bar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `true`  |
| `language`          | string  | Optional    | Interface language (12 languages supported) - (![GB](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/gb.png) en, ![FR](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/fr.png) fr, ![ES](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/es.png) es, ![DE](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/de.png) de, ![IT](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/it.png) it, ![NL](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/nl.png) nl, ![PT](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/pt.png) pt, ![BR](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/br.png) pt-br, ![RO](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/ro.png) ro, ![SK](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/sk.png) sk, ![IL](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/il.png) he, ![RU](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/ru.png) ru) | `en`    |

```yaml
display:
  compact: false
  show_names: true
  show_labels: true
  show_last_updated: false
  show_icons: true
  show_units: true
  gradient: true
  language: 'en'
```

### Color Options

| Name           | Type   | Requirement | Description                     | Default     |
| -------------- | ------ | ----------- | ------------------------------- | ----------- |
| `normal_color` | String | Optional    | Color for normal range values   | `#00b894`   |
| `low_color`    | String | Optional    | Color for low range values      | `#fdcb6e`   |
| `warn_color`   | String | Optional    | Color for warning range values  | `#e17055`   |
| `cool_color`   | String | Optional    | Color for cool range values     | `#00BFFF`   |
| `marker_color` | String | Optional    | Color for min/max markers       | `#000000`   |
| `hi_low_color` | String | Optional    | Color for high/low range values | `#00000099` |

```yaml
colors:
  normal_color: '#00b894'
  low_color: '#fdcb6e'
  warn_color: '#e17055'
  cool_color: '#00BFFF'
  marker_color: '#000000'
  hi_low_color: '#00000099'
```

### Sensors Options

Here’s a list of sensors you can monitor, depending on your pool's specific needs. Keeping these values within the recommended ranges is essential for maintaining a healthy and swimmable pool.

You can find their default values in the documentation.

> **Note:** The order of sensors within the `sensors` object determines their display order on the card. Simply arrange the sensors in your desired sequence for a personalized visualization.
>
> The `name` parameter is automatically translated if the `display.language` parameter is configured and the language is available.

⚠️ **Important:**  
While all sensors are optional, you must define at least one entity for the card to function correctly.

| Sensor ID        | Requirement | Description                                                                                          | Name             | Unit   | Setpoint | Step | Min Limit |
| ---------------- | ----------- | ---------------------------------------------------------------------------------------------------- | ---------------- | ------ | -------- | ---- | --------- |
| temperature      | Optional\*  | The entity that measures the water temperature.                                                      | Temperature      | °C     | 27       | 1    | -         |
| ph               | Optional\*  | The entity that measures the acidity or basicity of the water.                                       | pH               | pH     | 7.2      | 0.2  | 0         |
| orp              | Optional\*  | The entity that measures the Oxidation Reduction Potential of the water.                             | ORP              | mV     | 700      | 50   | 0         |
| ec               | Optional\*  | The entity that measures the electrical conductivity of the water.                                   | EC               | μS/cm  | 1500     | 100  | 0         |
| tds              | Optional\*  | The entity that measures the Total Dissolved Solids in the water.                                    | TDS              | g/L    | 5        | 0.5  | 0         |
| salinity         | Optional\*  | The entity that measures the salt level in the water (for saltwater pools).                          | Salinity         | ppm    | 3000     | 500  | 0         |
| cya              | Optional\*  | The entity that measures the Cyanuric Acid level in the water.                                       | Cyanuric Acid    | ppm    | 40       | 10   | 0         |
| calcium          | Optional\*  | The entity that measures the Calcium Hardness level in the water.                                    | Calcium          | ppm    | 300      | 100  | 0         |
| phosphate        | Optional\*  | The entity that measures the Phosphate level in the water.                                           | Phosphate        | ppb    | 50       | 10   | 0         |
| alkalinity       | Optional\*  | The entity that measures the alkalinity of the water.                                                | Alkalinity       | ppm    | 100      | 20   | 0         |
| free_chlorine    | Optional\*  | The entity that measures the concentration of free chlorine in the water.                            | Free Chlorine    | ppm    | 3        | 0.5  | 0         |
| total_chlorine   | Optional\*  | The entity that measures the concentration of both free chlorine and combined chlorine in the water. | Total Chlorine   | ppm    | 3        | 0.5  | 0         |
| pressure         | Optional\*  | The entity that measures the filter pressure in the pool.                                            | Filter Pressure  | psi    | 12       | 2    | 0         |
| specific_gravity | Optional\*  | The entity that measures the specific gravity of the water.                                          | Specific Gravity | sg     | 1.1      | 0.2  | 0         |
| magnesium        | Optional\*  | The entity that measures the magnesium level in the water.                                           | Magnesium        | ppm    | 1200     | 100  | 0         |
| water_level      | Optional\*  | The entity that measures the water level in your pool.                                               | Water Level      | %      | 100      | 10   | 0         |
| flow_rate        | Optional\*  | The entity that measures the flow rate through your pool's filtration system.                        | Flow Rate        | m³/h   | 10       | 1    | 0         |
| uv_radiation     | Optional\*  | The entity that measures the UV light output in your pool's sanitization system.                     | UV Radiation     | mW/cm² | 4        | 1    | 0         |
| product_volume   | Optional\*  | The entity that tracks the volume of liquid chemical products in storage.                            | Product Volume   | L      | 20       | 5    | 0         |
| product_weight   | Optional\*  | The entity that monitors the weight of powdered chemical products in storage.                        | Product Weight   | kg     | 25       | 5    | 0         |

```yaml
sensors:
  temperature:
    - entity: sensor.pool_temperature
  ph:
    - entity: sensor.pool_ph
  orp:
    - entity: sensor.pool_orp
```

Needed to change the name, unit, setpoint, and steps ? No problem, see additionnal parameters below for each measured entity.

#### For each sensor

| Name        | Type   | Requirement  | Description5263                                                                             |
| ----------- | ------ | ------------ | ------------------------------------------------------------------------------------------- |
| `entity`    | String | **Required** | Sensor Entity                                                                               |
| `name`      | String | Optional     | Sensor Name                                                                                 |
| `unit`      | String | Optional     | Sensor Unit (°C or °F)                                                                      |
| `setpoint`  | Number | Optional     | Sensor Set Point                                                                            |
| `step`      | Number | Optional     | Sensor Step                                                                                 |
| `min`       | String | Optional     | Entity ID for daily minimum Sensor                                                          |
| `max`       | String | Optional     | Entity ID for daily maximum Sensor                                                          |
| `icon`      | Object | Optional     | Configure the icon for Sensor. Use `mdi` for an MDI icon, or `hide` to hide the icon.       |
| `image_url` | Object | Optional     | Configure the image URL for Sensor.                                                         |
| `mode`      | String | Optional     | Sensor Display Mode : bidirectional (default for all) or heatflow (default for temperature) |
| `min_limit` | Number | Optional     | Minimum acceptable value for the sensor                                                     |

```yaml
sensors:
  temperature:
    - entity: sensor.pool_water_temp
      name: 'Water Temperature'
      unit: '°C'
      setpoint: 28
      step: 0.5
      min: sensor.pool_water_temp_daily_min
      max: sensor.pool_water_temp_daily_max
      icon: mdi:thermometer-water
      mode: heatflow
  ph:
    - entity: sensor.pool_ph
      name: 'pH Level'
      unit: 'pH'
      setpoint: 7.4
      step: 0.1
      min: sensor.pool_ph_daily_min
      max: sensor.pool_ph_daily_max
      image_url: 'https://example.com/ph-icon.png'
      mode: bidirectional
  orp:
    - entity: sensor.pool_orp
      name: 'ORP Level'
      unit: 'mV'
      setpoint: 750
      step: 10
      min: sensor.pool_orp_daily_min
      max: sensor.pool_orp_daily_max
      icon: 'hide'
```

### Multiple Entities per Sensor

You can have multiple entities for each sensor type. For example, for temperature, you might want to measure both the water temperature and the surface temperature. Here's how you can configure this:

Example configuration:

```yaml
sensors:
  temperature:
    - entity: sensor.pool_water_temp
      name: 'Water Temperature'
    - entity: sensor.pool_surface_temp
      name: 'Surface Temperature'
      setpoint: 25
```

This approach can be applied to any sensor type, allowing for multiple measurements of the same parameter.

### Daily Min / Max Tickers

Min/max entities defined in the YAML configuration will be displayed as tick marks on the bar chart, as shown in the example below:

```yaml
type: 'custom:pool-monitor-card'
sensors:
  ph:
    - entity: sensor.pool_ph
      min: sensor.daily_ph_min
      max: sensor.daily_ph_max
```

They will display as tick marks on the bar chart.

![all](example/minmax.png)

For the sensors I use the statistics platform in your `template.yaml` or `configuration.yaml`:

```yaml
sensor:
  - platform: statistics
    name: 'Daily pH Min'
    unique_id: <UUID>
    entity_id: sensor.pool_ph
    state_characteristic: value_min
    max_age:
      hours: 24
  - platform: statistics
    name: 'Daily pH Max'
    unique_id: <UUID>
    entity_id: sensor.pool_ph
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
| Zodiac    | [iAqualink eXO iQ](https://www.zodiac-poolcare.com/traitement-de-l-eau/electrolyseurs-au-sel/gamme-exo--iq/exo--iq)   | ✔️   | ✔️  | ✔️  | ❌  | [Tuto via nodeRED](example/zodiac.md)                                                                                                |
| Tuya      | [BLE-YL01](https://www.zigbee2mqtt.io/devices/BLE-YL01.html)                                                          | ✔️   | ✔️  | ✔️  | ✔️  | [Tuto](https://community.home-assistant.io/t/pool-monitoring-device-yieryi-ble-yl01-zigbee-ph-orp-free-chlorine-salinity-etc/659545) |

> **_NOTE:_** ✔️ indicates that the model is able to measure the specified parameter, while ❌ indicates it is not.
> The last column is about info to connect it to Home Assistant.

[Click me to see more hardware](example/hardware.md)

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

## Quality Assurance
[![Coverage Status](https://codecov.io/gh/wilsto/pool-monitor-card/branch/master/graph/badge.svg)](https://codecov.io/gh/wilsto/pool-monitor-card)

- 📊 [Unit Test Coverage Report](test-results/html/index.html)
- 🎨 [Visual Tests Report](example/visual-test-report.html)
- 🔍 [Code Coverage Report](coverage/lcov-report/index.html)


---

## Roadmap

Here's what's coming up for Pool Monitor Card! We're constantly working to improve and add new features.

### Done in v2

Pool Monitor Card has already seen significant advancements! Here are some of the key features and improvements implemented:

- 🔄 Complete rewrite to improve maintainability and add new features
- 🏗️ Implementing a more modular architecture
- ✅ Adding comprehensive testing

### Minor Evolutions (No Breaking Changes)

These updates won't require any changes to your existing configuration:

- 🎨 Additional customization options for the UI
- 🌐 More language translations
- 🔧 Additional hardware support
- 🐛 Ongoing bug fixes and performance improvements
- 📝 Improving documentation

### Major Evolutions (Breaking Changes)

These updates may require configuration changes when implemented:

- 📊 Graphical card configuration
  - Implementing support for visual configuration in the Lovelace UI editor
  - Adding a configuration panel for easy customization without YAML
  - Including tooltips and help text for each configuration option
- 🖼️ Automated visual testing
  - Implementing snapshot testing for UI components
  - Setting up visual regression tests to catch unintended UI changes
  - Integrating visual tests into the CI/CD pipeline for automated checks
- 🔍 Moving to TypeScript for better code quality

> **Note:** This roadmap is subject to change based on community feedback and needs. Feel free to contribute ideas by opening issues on GitHub!

<!--URLS FOR BADGES-->

[release-shield]: https://img.shields.io/github/v/release/wilsto/pool-monitor-card?include_prereleases&style=for-the-badge
[release-link]: https://github.com/wilsto/pool-monitor-card/releases/latest
[commits-shield]: https://img.shields.io/github/commit-activity/y/wilsto/pool-monitor-card.svg?style=for-the-badge
[commits-link]: https://github.com/wilsto/pool-monitor-card/commits/main
[maintenance-shield]: https://img.shields.io/maintenance/yes/2024.svg?style=for-the-badge
[maintenance-link]: https://github.com/wilsto/pool-monitor-card/graphs/commit-activity
[hacs-shield]: https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge
[hacs-link]: https://github.com/hacs/integration
[git-last-commit-badge]: https://img.shields.io/github/last-commit/wilsto/pool-monitor-card?style=for-the-badge
[codecov-shield]: https://img.shields.io/codecov/c/github/wilsto/pool-monitor-card?style=for-the-badge
[codecov-link]: https://codecov.io/gh/wilsto/pool-monitor-card

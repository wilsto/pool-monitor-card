# Pool Monitor Card

[![Release][release-shield]][release-link] [![HACS][hacs-shield]][hacs-link] [![GitHub Activity][commits-shield]][commits-link]

> Keep your swimming pool safe and crystal clear by monitoring up to 20 water chemistry parameters at a glance.

<!-- TODO: add hero screenshot -->
<!-- ![screenshot](example/hero.png) -->

> **Upgrading from v1?** The sensor configuration format changed in v2. See the [Migration Guide](docs/MIGRATION.md).

---

## Why this card?

Whether you have a chlorine pool, a saltwater system, or a heated spa, this card gives you an **instant visual overview** of your water quality — right from your Home Assistant dashboard.

Color-coded gradient bars show you at a glance if each parameter is in its ideal range. No need to memorize numbers or look up charts.

Preset ideal ranges for all 20 pool parameters mean you can get started with just an entity ID — the card knows what "good" looks like for pool water.

### What you can do

- Check if the water is safe **before letting the kids swim**
- Monitor pH and ORP trends **after adding chemicals** to see the effect over time
- Track chlorine levels to catch **sanitization drops early**
- Watch filter pressure to know **when to backwash**
- Compare pool vs. spa temperature with **multiple sensors per type**

---

## Sensors (20 presets)

Every sensor comes with **preset ideal ranges** — just point to your entity and the card handles the rest. Override any value to match your setup.

### Essential Water Chemistry

*The core parameters every pool owner should monitor for safe, comfortable swimming.*

| Sensor | Unit | Default Setpoint |
|--------|------|:----------------:|
| Temperature | °C | 27 |
| pH | pH | 7.2 |
| ORP | mV | 700 |
| TDS | g/L | 5 |
| Electrical Conductivity | µS/cm | 4000 |

### Chemical Balance

*Keeping these balanced prevents algae, scaling, and equipment damage.*

| Sensor | Unit | Default Setpoint |
|--------|------|:----------------:|
| Salinity | ppm | 3000 |
| Cyanuric Acid | ppm | 40 |
| Calcium | ppm | 300 |
| Phosphate | ppb | 50 |
| Alkalinity | ppm | 100 |

### Treatment & Sanitization

*These tell you if your disinfection system is working properly.*

| Sensor | Unit | Default Setpoint |
|--------|------|:----------------:|
| Free Chlorine | ppm | 3 |
| Total Chlorine | ppm | 3 |
| Filter Pressure | psi | 12 |
| Specific Gravity | sg | 1.1 |
| Magnesium | ppm | 1200 |

### Equipment & Maintenance

*Track the health of your pool equipment and supply levels.*

| Sensor | Unit | Default Setpoint |
|--------|------|:----------------:|
| Water Level | % | 100 |
| Flow Rate | m³/h | 10 |
| UV Radiation | mW/cm² | 4 |
| Product Volume | L | 20 |
| Product Weight | kg | 25 |

For detailed explanations of each sensor and why it matters, see [Sensor Details](docs/sensors.md).

---

## Compatible Hardware

Community-tested devices that work with this card:

| Device | Integration | Description |
|--------|-------------|-------------|
| [Zodiac eXO iQ / Z400 iQ](https://www.zodiac.com.au/salt-chlorinators/exo-pro) | NodeRED + MQTT | Smart salt chlorinator and heat pump. Connect via NodeRED + MQTT. |
| [Tuya Smart PH/TDS/EC/ORP Monitor](https://www.aliexpress.com/item/1005005050612094.html) | TuyaLocal | WiFi multi-parameter water tester. Works with TuyaLocal integration. |
| Atlas Scientific EZO sensors | ESPHome | Lab-grade pH, ORP, EC, DO sensors. Connect via ESPHome or custom component. |
| Blueriiot Blue Connect | Waterair / custom component | Floating pool analyzer (temperature, pH, ORP). Native HA integration. |

> Know a device that works? [Open an issue](https://github.com/wilsto/pool-monitor-card/issues) to add it!

---

## Installation

### HACS (recommended)

1. Open [HACS](https://hacs.xyz/) → **Frontend** → search for **Pool Monitor Card**
2. Install and reload your browser

[![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=wilsto&repository=pool-monitor-card&category=plugin)

### Manual

1. Download `pool-monitor-card.js` from the [latest release](https://github.com/wilsto/pool-monitor-card/releases)
2. Copy to `config/www/community/pool-monitor-card/`
3. Add resource: `/local/community/pool-monitor-card/pool-monitor-card.js` (type: module)

---

## Quick Start

```yaml
type: custom:pool-monitor-card
title: "My Pool"
sensors:
  temperature:
    entity: sensor.your_temperature_sensor
  ph:
    entity: sensor.your_ph_sensor
  orp:
    entity: sensor.your_orp_sensor
```

That's it! The card uses sensible defaults for everything else.

---

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | — | Card title |
| `sensors` | object | — | Sensor definitions (see below) |
| `display.compact` | boolean | `false` | Compact display mode |
| `display.show_names` | boolean | `true` | Show sensor names |
| `display.show_icons` | boolean | `true` | Show sensor icons |
| `display.show_units` | boolean | `true` | Show units |
| `display.show_labels` | boolean | `true` | Show range labels |
| `display.gradient` | boolean | `true` | Show gradient bar |
| `display.show_last_updated` | boolean | `false` | Show last update time |
| `display.show_icons` | boolean | `true` | Show sensor icons |
| `language` | string | `en` | Language code |

### Per-sensor overrides

```yaml
sensors:
  temperature:
    entity: sensor.xxx        # required
    name: Custom Name         # override display name
    unit: "°C"                # override unit
    setpoint: 25              # ideal value
    min: 10                   # min of the range
    max: 40                   # max of the range
    step: 2                   # threshold step for colors
    icon: mdi:thermometer     # MDI icon
    mode: centric             # centric | heatflow
```

### Multiple sensors of the same type

```yaml
sensors:
  temperature:
    - entity: sensor.sensor_1
      name: Location 1
    - entity: sensor.sensor_2
      name: Location 2
```

### Languages

12 languages supported: 🇬🇧 English, 🇫🇷 French, 🇩🇪 German, 🇪🇸 Spanish, 🇮🇹 Italian, 🇵🇹 Portuguese, 🇳🇱 Dutch, 🇵🇱 Polish, 🇨🇿 Czech, 🇸🇰 Slovak, 🇮🇱 Hebrew, 🇷🇺 Russian.

---

## Support

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://bmc.link/wilsto)

## Monitor Cards Family

This card is part of the **monitor-cards** family — same rendering engine, same features, different presets:

| Card | For | Sensors |
|------|-----|---------|
| [Pool Monitor Card](https://github.com/wilsto/pool-monitor-card) | Pool & spa owners | 20 presets ← *you are here* |
| [Aquarium Monitor Card](https://github.com/wilsto/aquarium-monitor-card) | Freshwater & saltwater aquarium keepers | 15 presets |
| [Air Quality Card](https://github.com/wilsto/air-quality-card) | Homeowners concerned about indoor air quality | 12 presets |
| [Sensor Monitor Card](https://github.com/wilsto/sensor-monitor-card) | Home Assistant power users | unlimited (custom) |

<!-- Badges -->
[release-shield]: https://img.shields.io/github/v/release/wilsto/pool-monitor-card?style=flat-square
[release-link]: https://github.com/wilsto/pool-monitor-card/releases
[hacs-shield]: https://img.shields.io/badge/HACS-Default-orange.svg?style=flat-square
[hacs-link]: https://hacs.xyz/
[commits-shield]: https://img.shields.io/github/commit-activity/y/wilsto/pool-monitor-card?style=flat-square
[commits-link]: https://github.com/wilsto/pool-monitor-card/commits/master
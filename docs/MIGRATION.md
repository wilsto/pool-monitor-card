# Migration Guide v1 to v2

This guide will help you migrate your configuration from version 1 to version 2 of the pool-monitor card.

## Major Changes

Version 2 brings several improvements and changes to the card configuration. Here are the main changes:

- New clearer and organized configuration structure
- Better display options management
- Multiple entities by sensor support
- Reordered sensors for better organization

## Migration Guide

### v1 Configuration (Old)

```yaml
type: "custom:pool-monitor-card"
title: "Enabled Options"
compact: false
show_names: true
show_labels: true
show_last_updated: true
show_icons: true
show_units: true
language: "en"
normal_color: "#2196F3"
low_color: "#FFC107"
warn_color: "#F44336"
marker_color: "#000000"
hi_low_color: "#757575"
temperature: sensor.pool_temperature
ph: sensor.pool_ph
orp: sensor.pool_orp
```

### v2 Configuration (New)

```yaml
type: "custom:pool-monitor-card"
title: "Enabled Options"
display:
  compact: false
  show_names: true
  show_labels: true
  show_last_updated: true
  show_icons: true
  show_units: true
  language: "en"
colors:
  normal_color: "#2196F3"
  low_color: "#FFC107"
  warn_color: "#F44336"
  marker_color: "#000000"
  hi_low_color: "#757575"
sensors:
  temperature:
    - entity: sensor.pool_temperature
  ph:
    - entity: sensor.pool_ph
  orp:
    - entity: sensor.pool_orp
```

## Change Details

1. **Sensors Structure**
   - Sensor entities are now grouped under the `sensors` key
   - Each sensor type (temperature, ph, orp) can have either:
     * A single entity: `entity: sensor.pool_temperature`
     * Multiple entities as a list:
   ```yaml
   sensors:
     temperature:
         - entity: sensor.pool_temperature_1
         - entity: sensor.pool_temperature_2
     ph:
       entity: sensor.pool_ph
   ```
   - The order of sensors matters (temperature, ph, orp)

2. **Display Options**
   - All display options are grouped under the `display` key
   - Options remain the same but are better organized
   - Language setting is now under the `display` key


## Important Notes

- v2 is not backward compatible with v1 configuration
- Migration to the new structure is required to ensure compatibility with v2
- Make sure to restart Home Assistant after updating

## Support

If you encounter any issues during migration, feel free to:
- Open an issue on GitHub
- Check the complete documentation
- Review configuration examples in the README

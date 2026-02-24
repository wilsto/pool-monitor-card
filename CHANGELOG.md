# Changelog

All notable changes to Pool Monitor Card will be documented in this file.
The format follows [Keep a Changelog](https://keepachangelog.com/).

## [2.8.0] - 2026-02-24

### Added

- Global `status_entity` parameter: displays a colored status badge at the top of the card with auto-detection (numeric 0-100 or text states like safe/warning/danger) — closes #10
- Visual card editor field for Status entity in General section

## [2.7.0] - 2026-02-24

### Added

- Dynamic setpoint and min_limit from entities: optional `setpoint_entity` and `min_limit_entity` per sensor to read threshold values from `input_number` helpers or template sensors at runtime — closes #59
- Visual card editor fields for Setpoint entity / Min limit entity

## [2.6.0] - 2026-02-24

### Added

- Customizable last updated timestamp: optional `last_updated_entity` and `last_updated_attribute` per sensor to display measurement time from a specific entity attribute (e.g. PoolLab `measured_at`) — closes #65
- Visual card editor fields for Last updated entity / Last updated attribute

## [2.5.0] - 2026-02-24

### Added

- Asymmetric ranges: optional `step_low` / `step_high` parameters per sensor allow different step sizes below and above the setpoint — closes #72
- Visual card editor fields for Step low / Step high

## [2.4.1] - 2026-02-24

### Added

- Equipment & Maintenance presets: `chlorinator` (%), `pump_speed` (%), `light_brightness` (%), `heat_pump_setpoint` (°C) — closes #58 (Hayward OmniLogic / OmniPL compatibility)
- Hayward OmniLogic added to Compatible Hardware table in README
- `availability_entity` option per sensor: grays out the sensor row when the linked binary_sensor/switch is `off` or `unavailable` (e.g. heat pump turned off)
- All presets now include a `category` field enabling grouped display in the card editor

### Fixed

- Badge color for heatflow mode was orange instead of green when value was in ideal range — closes #60
- Sensors with unavailable or unknown state (NaN) now display a clear "entity not found" message instead of crashing — closes #38

## [2.4.0] - 2026-02-23

### Added

- Visual card editor with live preview — configure cards directly from the HA UI
- Cards now appear in the Home Assistant card picker under "Custom cards"
- Sensor list with expand/collapse, entity picker, and delete per sensor
- Preset sensor dropdown with all pool chemistry presets
- Display Options and Colors sections in editor

### Fixed

- Cards no longer crash when multiple monitor cards are on the same dashboard

## [2.3.0] - 2026-02-23

### Changed

- Migrated entire codebase from JavaScript to TypeScript
- Added Lit decorators (@customElement, @property, @state) replacing static properties
- Centralized type system with typed interfaces (CardConfig, SensorData, HomeAssistant)
- Added typescript-eslint support to ESLint configuration

### Added

- TypeScript strict mode with typed sensor registry and card configuration
- Shared `ha/types.ts` module for Home Assistant type definitions

## [2.2.0] - 2026-02-21

### Added

- Bromine sensor support (ppm unit, centric display mode)
- Hungarian, Swedish, and Czech translations (community contributions)

### Fixed

- Precision now reads correctly from Entity Registry (fixes decimal display)
- Setpoint value of `0` is no longer ignored as "not configured"

## [2.1.0] - 2026-02-21

### Changed

- Migrated to new monorepo architecture with shared core
- Modernized toolchain: Lit 3.3, Node 22 LTS, Rollup 4, Vitest 4

### Fixed

- CI/CD: handle re-publish of an existing release version

## [2.0.x and earlier]

See commit history on the [legacy repository](https://github.com/wilsto/pool-monitor-card/commits/main).

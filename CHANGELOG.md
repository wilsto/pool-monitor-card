# Changelog

All notable changes to Pool Monitor Card will be documented in this file.
The format follows [Keep a Changelog](https://keepachangelog.com/).

## [2.14.0] - 2026-08-15

### Fixed

- **A scale set with `limits` no longer describes itself as a centred one.** It borrowed the wording of a scale whose middle band is the ideal, so a reading in the middle of its range was announced as *Ideal* — carbon monoxide at 20 ppm, more than twice the World Health Organization eight-hour guideline. Clean air at the other end read *Too Low*, in blue, as though something were wrong. The bands now carry the names of the [European Air Quality Index](https://airindex.eea.europa.eu/AQI/index.html), and the bar runs good to bad instead of being painted bad-good-bad.

  ```text
    3 ppm    Too Low     ->  Good
   20 ppm    Ideal       ->  Moderate
  120 ppm    Too High    ->  Very Poor
  ```

  Only sensors configured with `limits` are concerned — the new carbon monoxide preset, and hand-written configurations following the PM2.5 and ORP examples. Every other sensor keeps exactly the scale it had.

- **A scale set with `limits` alone no longer collapses.** Giving the four thresholds without also giving `min` and `max` left the bar with no width, and its five numbers piled up on top of each other at the right edge. The thresholds now set the range themselves.

  ```text
  where the five labels sat, as a percentage across the bar
  before:  0 | 100 | 100 | 100 | 100     (four of them stacked at the right edge)
  after:   0 | 6.9 | 10.3 | 34.5 | 100
  ```

- **The last number of the scale is no longer cut in half.** It was centred on the right edge, so half of it fell outside the card — and the card hides what overflows. **`87` was displayed as `8`.** A truncated number does not look broken, it looks like a different value. The first and last labels are now aligned inwards.

- **An untranslated label shows English instead of an internal key.** In a language where a sensor name had not been translated yet, the card printed `sensor.humidity` where a name belonged. It now falls back to English, so a new sensor no longer has to wait for fifteen translations before it can be shipped.

### Added

- **Read the value from an attribute instead of the entity state.** Several integrations publish more than one measurement on a single entity — a target temperature, a battery level, a raw reading. Until now each one needed its own template sensor:

  ```yaml
  sensors:
    temperature:
      entity: climate.pool_heat_pump
      attribute: current_temperature
  ```

  If the attribute does not exist, the sensor reads as unavailable. It does not quietly fall back to the state, which would show an unrelated number in the place of the one you asked for.

- **Three new presets for the pump house**, asked for on the tracker:

  | Preset | Unit | Default setpoint | What it reads |
  | --- | --- | --- | --- |
  | `humidity` | % | 60 | Air humidity around an indoor pool — the reading that drives condensation and, over time, structural damage ([#87](https://github.com/wilsto/pool-monitor-card/issues/87)) |
  | `filtration_time` | h | 8 | Daily filtration runtime: too little and the water is not turned over, far more than needed is wasted energy ([#91](https://github.com/wilsto/pool-monitor-card/issues/91)) |
  | `pump_energy` | kWh | 5 | Daily energy drawn by the pump; pair it with filtration time to see whether the pump is running efficiently ([#91](https://github.com/wilsto/pool-monitor-card/issues/91)) |

  ```yaml
  type: custom:pool-monitor-card
  sensors:
    humidity:
      entity: sensor.pool_room_humidity
    filtration_time:
      entity: sensor.pool_filtration_hours
    pump_energy:
      entity: sensor.pool_pump_energy_daily
  ```

  Before this release the only way to show any of them was to repurpose an unrelated preset and override its name and unit by hand.

### Documentation

- **The Styling example in the README now actually does something.** As printed, it changed nothing: the card ships its styles as an adopted stylesheet, and those beat an injected rule at equal specificity. A property the card already sets needs `!important` or a more specific selector; a property it does not set applies as-is.

  ```text
  .pool-monitor-title { font-size: 2rem }              ->  21px, no effect
  .pool-monitor-title { font-size: 2rem !important }   ->  28px
  h1.pool-monitor-title { font-size: 2rem }            ->  28px
  ```

## [2.13.1] - 2026-08-15

### Documentation

- **Added a Styling section to the README.** The previous release made the card work with [card-mod](https://github.com/thomasloven/lovelace-card-mod) but said so only in the release notes, which scroll away. The README now carries copy-paste examples and the list of classes you can target — transparent background, title size, icon colour, scale size.

## [2.13.0] - 2026-08-15

### Fixed

- **Two cards publishing the same element name no longer take the page down.** Registration is now guarded: the card that loads second declines and explains itself in the console, instead of throwing an uncaught error that killed its whole script.
- The version announced in the console banner is read from the release itself, so it can no longer drift from the published version.

### Changed

- **The card now renders a standard Home Assistant `ha-card` container.** It previously drew a plain container and imitated one, which is why card-mod had no effect on it while working on every other card. Styling it works now:

```yaml
card_mod:
  style: |
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
    }
```

  ⚠️ If you had worked around this by styling `:host`, check your rules — the background, border and shadow are now painted by `ha-card`.

- **Sizes and colours can be restyled.** Static sizing moved out of inline attributes into named classes, so a stylesheet can reach it. An inline style beats any injected rule, which is what made this impossible before:

```yaml
card_mod:
  style: |
    .pool-monitor-title { font-size: 2rem; }
    .entity-icon { color: var(--error-color); }
    .gauge-scale { font-size: 1.1em; }
```

## [2.12.0] - 2026-08-15

### Fixed

- **The visual editor works again on Home Assistant 2026.5 and later.** HA removed an internal component the editor relied on, and nine text fields silently stopped appearing — *Name override*, *Unit override*, *Setpoint*, *Step*, *Min limit*, *Step low*, *Step high*, *Image URL*, *Last updated attribute*. They were unreachable from the interface, though still editable in YAML. The editor no longer depends on Home Assistant's internal components, so this cannot happen again on a future update.
- **`min` and `max` set the scale again.** They were documented as numbers defining the range, but a number was read as an entity name, found nothing, and was ignored without warning. A number is now a scale bound; a string is still an entity whose value places a marker on the bar.
- **Six translated languages were missing from the language menu** — Czech, Hebrew, Hungarian, Romanian, Russian, Swedish. Three entries that had no translation behind them (Polish, Simplified and Traditional Chinese) silently fell back to English; they are gone. The menu now lists all 15 translations, each in its own language.

### Added

- **Scales whose ideal value is at one end.** `centric` and `heatflow` both place the ideal in the middle, which does not suit quantities like PM2.5 (0 is best) or ORP (higher is best). Give the four class boundaries explicitly and say which way the scale reads:

```yaml
sensors:
  pm25:
    entity: sensor.pm25
    min: 0
    max: 20
    limits: [2, 5, 10, 15]
    # direction: lower_is_better (default) | higher_is_better
```

  Approach contributed by [@rpirsc13](https://github.com/rpirsc13). Default thresholds per sensor will follow once their published sources are confirmed.
- **A `CONTRIBUTING.md`** explaining how this repository is built and how to propose a change or a translation.

## [2.11.1] - 2026-08-15

### Fixed

- The console banner reported `2.10.1` while the card was published as `2.11.0`. The version is duplicated between `package.json` and a constant in the source, and the two had drifted. A test now fails when they diverge.

## [2.11.0] - 2026-03-29

### Added

- Customizable name font: `name_font_size` and `name_font_weight` display options for both normal and compact modes — closes #79
- Visual editor fields for name font size and weight under Display settings

## [2.10.2] - 2026-03-29

### Fixed

- Sensors with unavailable/unknown state no longer crash the entire card — closes #80
- Sensor add dropdown in visual editor now works on HA 2026.2+ (replaced deprecated mwc-list-item with native select) — closes #78

### Added

- WaterGuru device support: status_entity now recognizes GREEN/RED/YELLOW/high/low/normal text states — closes #77

## [2.9.0] - 2026-02-24

### Added

- Per-sensor `battery_entity` parameter: displays battery level indicator (icon + percentage) next to the sensor name in normal mode and in the overlay bar in compact mode — closes #9
- Dynamic battery icon (full/half/low/unknown) with color coding (green >50%, orange 20-50%, red <20%)
- Visual card editor field for Battery entity per sensor

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

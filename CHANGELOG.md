# Changelog

All notable changes to Pool Monitor Card will be documented in this file.
The format follows [Keep a Changelog](https://keepachangelog.com/).

## [2.17.3] - 2026-08-16

### Documentation

- **The picture at the top of this page now shows both layouts.** The compact one appeared nowhere, although it is half of what the card can do. The full layout is on the left, the compact one on the right, on the same dashboard and inside the same story.

  A compact row fits in half the height, so the compact card carries about twice as many, which is what it is for: it is the layout to pick when there is a lot to show.

## [2.17.2] - 2026-08-16

### Documentation

- **The picture at the top of this page is new, and it moves.** The old one was a screenshot of a development bench taken in March: cards titled Compact Display and Color Customisation, a row in Russian, a sensor called MY CUSTOM TEMP NAME, and nothing that shipped since.

  The new one follows an afternoon: the sun eats the chlorine, the pH climbs with it, the status badge goes from safe to warning to danger, the filter pressure creeps up, and everything settles after dosing and a backwash.

  It is also reproducible now. The card is a plain web component, so the picture is rendered from the source in a browser with no Home Assistant around it, which means it can be retaken by anyone at any version instead of by whoever had the bench running.

## [2.17.1] - 2026-08-16

### Changed

- **The chlorinator preset is called Chlorinator in the editor**, as it already was on the card. It was listed as Chlorinator Setting there, and every other preset is named after what it measures. French already said Réglage du chlorateur and is unchanged.

## [2.17.0] - 2026-08-16

### Fixed

- **Four measurements were only ever named in English.** Humidity, filtration time, pump energy and carbon monoxide had no translation in sixteen of the seventeen languages, so a card set to German, Spanish or Swedish showed those four in English while everything around them was translated.

  They are translated now, in all seventeen.

### Changed

- **The sensor table in the documentation has a Defaults column** instead of Default Setpoint. Measurements built around thresholds rather than an ideal value can be listed there truthfully, which is what let the air card document its carbon monoxide preset. Nothing changes on the card itself.

## [2.16.1] - 2026-08-16

### Documentation

- **The WaterGuru SENSE is in the compatible hardware table.** Two options exist because of it, a card-level battery and a status per measurement, and it was still not listed as a device the card works with. Its Home Assistant integration is linked.

- **The table now says what its columns do not cover.** They show temperature, pH, ORP and TDS, which most devices share. Several measure more: the WaterGuru SENSE reads free chlorine, and its S2 and S3 models also read total alkalinity, cyanuric acid and calcium hardness. Two crosses in those columns no longer read as a device that only measures two things.

## [2.16.0] - 2026-08-16

### Added

- **One battery for the whole device.** Some pool monitors take every measurement with a single unit, on a single battery. Setting it on each sensor said the same thing five times, so it can now be set once on the card and appears beside the status.

  ```yaml
  type: custom:pool-monitor-card
  battery_entity: sensor.waterguru_battery
  ```

- **A status for each measurement.** Devices that publish one status entity per reading (`HIGH`, `LOW`, `Ok`) can now show it as a badge next to that reading, instead of only having a single status for the whole card.

  ```yaml
  sensors:
    ph:
      entity: sensor.waterguru_ph
      status_entity: sensor.waterguru_ph_status
  ```

  Both were asked for by @daveewall. The same words are recognised as for the card status, so `HIGH` cannot mean one thing at the top of the card and another next to a reading.

### Documentation

- **Half of what a sensor accepts was undocumented.** The README listed ten of the twenty-three options, and none of those added this week. There is now a full table, covering `attribute`, `status_entity`, `battery_entity`, `availability_entity`, `setpoint_entity`, `min_limit_entity`, the last-updated pair, `step_low`, `step_high`, `min_limit` and `image_url`.

- **The language option was documented in the wrong place.** It was shown at the top level while the card reads it under `display`. Anyone copying the documentation wrote a key nothing reads, and their card stayed in English with no explanation. `display.show_icons` was also listed twice.

## [2.15.0] - 2026-08-16

### Fixed

- **Two colours could not be changed from the visual editor.** The colour list in the editor was written by hand and had drifted from the palette the card actually paints with: `hazardous`, used for the worst band of a monotonic scale, had been missing since it was added, and `fair` since the day it landed. Both were on screen and neither was editable. The list is now derived from the palette itself, so it cannot drift again.

### Added

- **The card offers itself when you pick an entity.** Home Assistant 2026.6 lets a card appear in the card picker under a *Community* section once you have selected an entity. Add a pH probe and the card is proposed, with a live preview, without having to know it exists.

  It only volunteers when the reading is unambiguously one of its own: a redox probe, ammonia, carbon monoxide, particulates. A plain temperature or humidity belongs to every card, so none of them claims it. Measured on a test system: 47 sensors out of 113 offered a card, and the other 66 were left alone.

- **The visual editor speaks your language.** Every label was written in English in the markup, while the card itself has seventeen translations. A Hungarian user read their card in Hungarian and configured it in English.

  The editor now follows the language Home Assistant is set to, which is deliberately not the card's display language: the person configuring a card is not always the person looking at it. English and French are written; every other language falls back to English rather than blocking, so a translation can be contributed at any time.

### Changed

- **The sensor editor no longer shows eighteen fields at once.** Only one of them is actually required, and nothing said so. What you see when you open a sensor is the entity, marked as required, and the attribute below it. Everything else is folded away.

  ```text
  Entity (required)     pool_ph
  Attribute             leave empty to use the state

   > Content                                        inherited
   > Appearance                                  icon, image
   > Scale                              Setpoint 7.2 (inherited)
   > Linked entities      setpoint, bounds, availability, battery
   > Timestamp           where the measurement time comes from
  ```

  A folded section says what it holds **and where its value comes from**, so you can see at a glance whether there is anything to do in it.

- **Three options that previously needed YAML are in the editor.** `attribute`, to read a value from an attribute rather than the state. `limits` and `direction`, to give the four class boundaries yourself for a reading whose ideal sits at one end.

- **Setpoint and explicit thresholds are now a choice, not two things you can both fill in.** They were always exclusive: giving `limits` made the setpoint ignored, silently. The editor asks which one you want and shows only that one, so the rule is visible instead of hidden.

## [2.14.1] - 2026-08-16

### Fixed

- **Reading a value from an attribute no longer rounds it.** The number of decimals was counted on the entity state while the value came from an attribute. A `climate` entity's state is the word `heat`, which has no decimals at all, so a target of 20.5 °C was displayed as **21 °C**, with nothing to say it had been rounded.

  ```text
  climate.living_room
    state:       "heat"     <- the decimals were counted here
    temperature: 20.5       <- the value came from here

  before:  21
  after:   20.5
  ```

  This affected exactly the entities the option exists for: `climate`, `water_heater`, `weather` and anything else whose state is a word rather than a number. An explicit `display_precision` still wins, and a plain sensor reading its own state is unchanged.

### Added

- **Two more languages: Catalan and Danish.** Both were written by users and had been waiting for months, on repositories that are regenerated on every release and could never merge them. That was never written down anywhere, which was our fault; the contribution guide now says so.

  Thank you to [@XattSPT](https://github.com/XattSPT) for the Catalan and [@Andreasb95](https://github.com/Andreasb95) for the Danish. The card now speaks 17 languages, each listed in the menu under its own name.

  Both files predate four recent sensors, so those few labels fall back to English rather than blocking the rest. If you speak either language and want to complete them, the file is one page long.

## [2.14.0] - 2026-08-15

### Fixed

- **A scale set with `limits` no longer describes itself as a centred one.** It borrowed the wording of a scale whose middle band is the ideal, so a reading in the middle of its range was announced as *Ideal*: carbon monoxide at 20 ppm, more than twice the World Health Organization eight-hour guideline. Clean air at the other end read *Too Low*, in blue, as though something were wrong. The bands now carry the names of the [European Air Quality Index](https://airindex.eea.europa.eu/AQI/index.html), and the bar runs good to bad instead of being painted bad-good-bad.

  ```text
    3 ppm    Too Low     ->  Good
   20 ppm    Ideal       ->  Moderate
  120 ppm    Too High    ->  Very Poor
  ```

  Only sensors configured with `limits` are concerned: the new carbon monoxide preset, and hand-written configurations following the PM2.5 and ORP examples. Every other sensor keeps exactly the scale it had.

- **A scale set with `limits` alone no longer collapses.** Giving the four thresholds without also giving `min` and `max` left the bar with no width, and its five numbers piled up on top of each other at the right edge. The thresholds now set the range themselves.

  ```text
  where the five labels sat, as a percentage across the bar
  before:  0 | 100 | 100 | 100 | 100     (four of them stacked at the right edge)
  after:   0 | 6.9 | 10.3 | 34.5 | 100
  ```

- **The last number of the scale is no longer cut in half.** It was centred on the right edge, so half of it fell outside the card, and the card hides what overflows. **`87` was displayed as `8`.** A truncated number does not look broken, it looks like a different value. The first and last labels are now aligned inwards.

- **An untranslated label shows English instead of an internal key.** In a language where a sensor name had not been translated yet, the card printed `sensor.humidity` where a name belonged. It now falls back to English, so a new sensor no longer has to wait for fifteen translations before it can be shipped.

### Added

- **Read the value from an attribute instead of the entity state.** Several integrations publish more than one measurement on a single entity: a target temperature, a battery level, a raw reading. Until now each one needed its own template sensor:

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
  | `humidity` | % | 60 | Air humidity around an indoor pool, the reading that drives condensation and, over time, structural damage ([#87](https://github.com/wilsto/pool-monitor-card/issues/87)) |
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

- **Added a Styling section to the README.** The previous release made the card work with [card-mod](https://github.com/thomasloven/lovelace-card-mod) but said so only in the release notes, which scroll away. The README now carries copy-paste examples and the list of classes you can target: transparent background, title size, icon colour, scale size.

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

  ⚠️ If you had worked around this by styling `:host`, check your rules: the background, border and shadow are now painted by `ha-card`.

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

- **The visual editor works again on Home Assistant 2026.5 and later.** HA removed an internal component the editor relied on, and nine text fields silently stopped appearing: *Name override*, *Unit override*, *Setpoint*, *Step*, *Min limit*, *Step low*, *Step high*, *Image URL*, *Last updated attribute*. They were unreachable from the interface, though still editable in YAML. The editor no longer depends on Home Assistant's internal components, so this cannot happen again on a future update.
- **`min` and `max` set the scale again.** They were documented as numbers defining the range, but a number was read as an entity name, found nothing, and was ignored without warning. A number is now a scale bound; a string is still an entity whose value places a marker on the bar.
- **Six translated languages were missing from the language menu**: Czech, Hebrew, Hungarian, Romanian, Russian, Swedish. Three entries that had no translation behind them (Polish, Simplified and Traditional Chinese) silently fell back to English; they are gone. The menu now lists all 15 translations, each in its own language.

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

- Customizable name font: `name_font_size` and `name_font_weight` display options for both normal and compact modes (closes #79)
- Visual editor fields for name font size and weight under Display settings

## [2.10.2] - 2026-03-29

### Fixed

- Sensors with unavailable/unknown state no longer crash the entire card (closes #80)
- Sensor add dropdown in visual editor now works on HA 2026.2+ (replaced deprecated mwc-list-item with native select) (closes #78)
### Added

- WaterGuru device support: status_entity now recognizes GREEN/RED/YELLOW/high/low/normal text states (closes #77)
## [2.9.0] - 2026-02-24

### Added

- Per-sensor `battery_entity` parameter: displays battery level indicator (icon + percentage) next to the sensor name in normal mode and in the overlay bar in compact mode (closes #9)
- Dynamic battery icon (full/half/low/unknown) with color coding (green >50%, orange 20-50%, red <20%)
- Visual card editor field for Battery entity per sensor

## [2.8.0] - 2026-02-24

### Added

- Global `status_entity` parameter: displays a colored status badge at the top of the card with auto-detection (numeric 0-100 or text states like safe/warning/danger) (closes #10)
- Visual card editor field for Status entity in General section

## [2.7.0] - 2026-02-24

### Added

- Dynamic setpoint and min_limit from entities: optional `setpoint_entity` and `min_limit_entity` per sensor to read threshold values from `input_number` helpers or template sensors at runtime (closes #59)
- Visual card editor fields for Setpoint entity / Min limit entity

## [2.6.0] - 2026-02-24

### Added

- Customizable last updated timestamp: optional `last_updated_entity` and `last_updated_attribute` per sensor to display measurement time from a specific entity attribute (e.g. PoolLab `measured_at`) (closes #65)
- Visual card editor fields for Last updated entity / Last updated attribute

## [2.5.0] - 2026-02-24

### Added

- Asymmetric ranges: optional `step_low` / `step_high` parameters per sensor allow different step sizes below and above the setpoint (closes #72)
- Visual card editor fields for Step low / Step high

## [2.4.1] - 2026-02-24

### Added

- Equipment & Maintenance presets: `chlorinator` (%), `pump_speed` (%), `light_brightness` (%), `heat_pump_setpoint` (°C) (closes #58, Hayward OmniLogic / OmniPL compatibility)
- Hayward OmniLogic added to Compatible Hardware table in README
- `availability_entity` option per sensor: grays out the sensor row when the linked binary_sensor/switch is `off` or `unavailable` (e.g. heat pump turned off)
- All presets now include a `category` field enabling grouped display in the card editor

### Fixed

- Badge color for heatflow mode was orange instead of green when value was in ideal range (closes #60)
- Sensors with unavailable or unknown state (NaN) now display a clear "entity not found" message instead of crashing (closes #38)
## [2.4.0] - 2026-02-23

### Added

- Visual card editor with live preview: configure cards directly from the HA UI
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

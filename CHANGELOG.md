# Changelog

All notable changes to Pool Monitor Card will be documented in this file.
The format follows [Keep a Changelog](https://keepachangelog.com/).

## [2.4.0] - 2026-02-23

### Added

- Visual card editor with live preview — configure cards directly from the HA UI
- Cards now appear in the Home Assistant card picker under "Custom cards"
- Sensor list with expand/collapse, entity picker, and delete per sensor
- Preset sensor dropdown with all 21 pool chemistry presets
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

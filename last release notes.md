# [v2.1.0]

## What's Changed

### New Features

- Added support for Electrical Conductivity (EC) sensor with default settings ([#50](https://github.com/wilsto/pool-monitor-card/issues/50)):
  - Unit: µS/cm (microSiemens per centimeter)
  - Default setpoint: 4000 µS/cm
  - Step adjustment: 200 µS/cm
  - Ideal range visualization with color gradient
- Introduced `min_limit` parameter for all sensors to set minimum acceptable values ([#12](https://github.com/wilsto/pool-monitor-card/issues/12)):
  - Prevents display of negative or invalid readings
  - Improves data visualization accuracy
  - Default set to 0 for most sensors
- Enhanced translation system with proper pluralization support
  * Added separate translation keys for singular and plural forms
  * Improved handling of time-based translations across different languages
  * Fixed [#53](https://github.com/wilsto/pool-monitor-card/issues/53) - Better support for language-specific plural forms

### Bug Fixes

- Fixed an issue where tapping on a graph no longer opened the sensor's history view ([#54](https://github.com/wilsto/pool-monitor-card/issues/54))
- Fixed override functionality not working correctly

### Maintenance & Improvements

- Added comprehensive test suite:
  - Unit tests with coverage reporting
  - Automated visual regression tests ([view report](example/visual-test-report.html))
  - Improved code quality and reliability
- Updated screenshot automation to run in headless mode
- Refactored time translation logic for better maintainability
- Added comprehensive test coverage for translation system

### Documentation

- Updated sensor documentation with EC measurement details and typical ranges
- Added `min_limit` parameter description in configuration guide

## Breaking Changes

- None

## Notes

- None

---

## Installation

Install via HACS (recommended)

   - Make sure you have [HACS](https://hacs.xyz) installed
   - Search for "Pool Monitor Card" in HACS
   - Click Install

## Important Migration Note

If you're upgrading from v1 to v2, please note that v2 introduces breaking changes in the configuration structure. The new version requires changes to your configuration yaml:
- All display options are now grouped under the `display` key
- Sensor configurations are grouped under the `sensors` key
- Multiple entities per sensor type are now supported

Please refer to the [Migration Guide](docs/MIGRATION.md) for detailed instructions on updating your configuration.

[github-link]: https://github.com/wilsto/pool-monitor-card

## Support

If you like this card, please star it on [GitHub][github-link] or buy me a coffee [!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/wilsto)

[github-link]: https://github.com/wilsto/pool-monitor-card

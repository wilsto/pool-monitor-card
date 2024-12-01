# [v2.1.0] 

## What's Changed

### New Features
- Added support for Electrical Conductivity (EC) sensor with default settings:
  - Unit: µS/cm (microSiemens per centimeter)
  - Default setpoint: 4000 µS/cm
  - Step adjustment: 200 µS/cm
  - Ideal range visualization with color gradient
- Introduced `min_limit` parameter for all sensors to set minimum acceptable values
  - Prevents display of negative or invalid readings
  - Improves data visualization accuracy
  - Default set to 0 for most sensors

### Bug Fixes
- None

### Maintenance & Improvements
- None

### Documentation
- Updated sensor documentation with EC measurement details and typical ranges
- Added `min_limit` parameter description in configuration guide

## Breaking Changes

- None

## Notes

- None

---
## Installation

1. Install via HACS (recommended)
   - Make sure you have [HACS](https://hacs.xyz) installed
   - Search for "Pool Monitor Card" in HACS
   - Click Install

2. Manual Installation
   - Download the latest release
   - Copy the content to your `config/www/community/pool-monitor-card/` directory

## Support

If you like this card, please star it on [GitHub][github-link]
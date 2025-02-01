# [v2.2.0]

## What's Changed

### New Features

- Added support for entity-specific display precision (#56)
  - Card now respects the `display_precision` and `precision` attributes configured in Home Assistant for each sensor
  - Maintains consistent decimal places based on entity configuration
  - Falls back to the sensor's native precision if no display precision is configured

### Bug Fixes

- None

### Maintenance & Improvements

- None

### Documentation

- None

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

## Support

If you like this card, please star it on [GitHub][github-link] or buy me a coffee [!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/wilsto)

[github-link]: https://github.com/wilsto/pool-monitor-card

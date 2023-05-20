# Pool Monitor Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)

## Multilanguage ReadMe

Click on the following button to choose the language of your ReadMe : [![fr](https://img.shields.io/badge/lang-fr-green.svg)](https://github.com/wilsto/pool-monitor-card/blob/master/README-fr.md) [![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/wilsto/pool-monitor-card/blob/master/README.md)

## Description

The "Pool Monitor Card" is a home assistant plugin that provides information about the temperature, pH, ORP levels and TDS of your swimming pool.

- **Temperature**: This refers to the temperature of the water in your pool. The ideal range for temperature in a pool is between 26°C and 28°C.  Knowing the temperature can help you decide if it's warm enough for swimming or if it's too cold and might need to be heated.

- **pH**: This is a measure of how acidic or alkaline the water in your pool is. The ideal range for pH in a pool is between 7.0 and 7.4. Maintaining the proper pH level can help prevent skin and eye irritation and keep the pool water safe for swimming.

- **ORP**: This stands for Oxidation Reduction Potential and measures the ability of the water to oxidize or reduce substances in the pool. The ORP level is related to the amount of chlorine or other sanitizers in the pool.  The ideal range for chlorine in a pool is between 650 and 750 mV. Maintaining the correct ORP level can help ensure that the pool water is properly sanitized and free of harmful bacteria.

- **TDS**: This stands for Total Dissolved Solids and measures the amount of inorganic and organic substances in the water, such as minerals, salts, and other particles. High levels of TDS can affect water clarity and make it difficult to balance chemicals in the pool. The ideal range for TDS in a saltwater pool is between 3000 and 5000 parts per million (ppm) (3 and 5 g/L).

With the "Pool Monitor Card", you can easily monitor these important aspects of your swimming pool and make any necessary adjustments to ensure that the water is safe and comfortable for swimming.

![all](example/compact-card.png)

## Support

Hey dude! Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://bmc.link/wilsto)

## Install

### via HACS

Home assistant Pool Monitor Card is available by default on HACS directory. More info [here](https://hacs.xyz/).

or click on:
[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=wilsto&repository=pool-monitor-card&category=plugin)

### Manualy

1. Download the `pool_monitor_card.js` file from the [latest release available](https://github.com/wilsto/pool-monitor-card/releases) and save it in your `configuration/www` folder.
1. Go to `Configuration > Lovelace dashboard > Resources` in Home Assistant and click on `Add resource`.
    1. Add `/local/community/pool-monitor-card/pool_monitor_card.js` to the URL.
    1. Choose `Javascript Module` as Resource type.

## Lovelace Set up

### Using UI

1. Go to your dashboard, enter in edit mode and click on `Add card`, you should be able to find `Custom: Pool Monitor card` in the list.
1. Once in the UI editor you can modify the card behavior by adding some of the config that you will find below

Note: If `Custom: Pool Monitor card` doesn't appear you will have to reload cleaning the cache.

### Using YAML

1. You just need to add a new card with `type: 'custom:pool-monitor-card'` to your cards list and any of the config that you will find below if you want to customize more your card.

#### Example of code

```yaml
type: 'custom:pool-monitor-card'
temperature: sensor.temperature_sensor
ph: sensor.ph_sensor
orp: sensor.orp_sensor
tds: sensor.tds_sensor
```

### Main Options

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type` | string | **Required** | `custom:pool-monitor-card` ||
| `temperature` | string | **Optional*** | Temperature sensor entity |`none`|
| `ph` | string | **Optional*** | ph sensor entity |`none`|
| `orp` | string | **Optional*** | ORP sensor entity |`none`|
| `tds` | String | **Optional*** | Entité TDS  |`aucune`|
| `title` | string | **Optional** | Pool Monitor Card Title |`none`|
| `compact` | boolean | **Optional** | Compact Mode |`false`|

*You need to define at least one of theses 4 entities

### Advanced options

You can go further with the card by modifying, if needed or desired, the unit, setpoint, and step of each measured entity.


#### Température

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `temperature_unit` | String | **Optional** | Temperature Unit (°C or °F) |`°C`|
| `temperature_setpoint` | Number | **Optional** | Temperature Set Point |If unit=°C:`27` <br/> If unit=°F:`80`|
| `temperature_step` | Number | **Optional** | Temperature Step |If unit=°C:`1` <br/> If unit=°F:`2`|

#### pH

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ph_unit` | String | **Optional** | pH Unit |`pH`|
| `ph_setpoint` | Number | **Optional** | pH Set Point |`7.2`|
| `ph_step` | Number | **Optional** | pH Step |`0.2`|

#### ORP

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `orp_unit` | String | **Optional*** | ORP Unit |`mV`|
| `orp_setpoint` | Number | **Optional** | ORP Set Point |`700`|
| `orp_step` | Number | **Optional** | ORP Step |`50`|

#### TDS

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tds_unit` | String | **Optional** | TDS Unit (g/L or ppm) |`g/L`|
| `tds_setpoint` | Number | **Optional** | TDS Set Point |If unit=g/L:`4` <br/> If unit=ppm:`4000`|
| `tds_step` | Number | **Optional** | TDS Step  |If unit=g/L:`1` <br/> If unit=ppm:`1000`|

## Other screenshots

![dark_light](example/light-dark-card.png)

![change_unit](example/change_units.png)

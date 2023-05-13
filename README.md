# Pool Monitor Card
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)
[![GitHub Release][releases-shield]][releases]

## Description
The "Pool Monitor Card" is a home assistant plugin that provides information about the temperature, pH, and ORP levels of your swimming pool. 

 - **Temperature**: This refers to the temperature of the water in your pool. The ideal range for temperature in a pool is between 26°C and 28°C.  Knowing the temperature can help you decide if it's warm enough for swimming or if it's too cold and might need to be heated.

 - **pH**: This is a measure of how acidic or alkaline the water in your pool is. The ideal range for pH in a pool is between 7.0 and 7.4. Maintaining the proper pH level can help prevent skin and eye irritation and keep the pool water safe for swimming.

 - **ORP**: This stands for Oxidation Reduction Potential and measures the ability of the water to oxidize or reduce substances in the pool. The ORP level is related to the amount of chlorine or other sanitizers in the pool.  The ideal range for chlorine in a pool is between 650 and 750 mV. Maintaining the correct ORP level can help ensure that the pool water is properly sanitized and free of harmful bacteria.

With the "Pool Monitor Card", you can easily monitor these important aspects of your swimming pool and make any necessary adjustments to ensure that the water is safe and comfortable for swimming.

![all](example/light-dark-card.png)

## Support

Hey dude! Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://bmc.link/wilsto)

## Install
### via HACS
Home assistant Sun card is available by default on HACS directory. More info [here](https://hacs.xyz/).

or click on: 
[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=wilsto&repository=pool-monitor-card&category=plugin)



### Manualy

1. Download the `pool_monitor_card.js` file from the [latest release available](https://github.com/wilsto/pool-monitor-card/releases) and save it in your `configuration/www` folder.
1. Go to `Configuration > Lovelace dashboard > Resources` in Home Assistant and click on `Add resource`.
    1. Add `/local/community/pool_monitor_card.js` to the URL.
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
type: 'custom:pool-monitor'
temperature: sensor.temperature_sensor
ph: sensor.ph_sensor
orp: sensor.orp_sensor
```

### Main Options
| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type` | string | **Required** | `custom:pool-monitor` ||
| `temperature` | string | **Option*** | Temperature sensor entity |`none`|
| `temperature_setpoint` | number | **Option** |Temperature setpoint |`27`|
| `ph` | string | **Option*** | ph sensor entity |`none`|
| `ph_setpoint` | number | **Option** | pH setpoint |`7.2`|
| `orp` | string | **Option*** | ORP sensor entity |`none`|
| `orp_setpoint` | number | **Option** |ORP Setpoint |`700`|
| `title` | string | **Option** | Pool Monitor Card Title |`none`|

*You need to define at least one of theses 3 entities
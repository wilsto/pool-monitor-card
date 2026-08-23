export default {
  language: 'Svenska',
  state: {
    1: 'För Lågt',
    2: 'Lågt, Acceptabelt',
    3: 'Idealt',
    4: 'Idealt',
    5: 'Högt, Acceptabelt',
    6: 'För Högt',
  },
  // Trendens uppläsning för en skärmläsare.
  trend: {
    rising_1: 'stiger långsamt',
    rising_2: 'stiger',
    rising_3: 'stiger snabbt',
    falling_1: 'faller långsamt',
    falling_2: 'faller',
    falling_3: 'faller snabbt',
  },
  out_of_scale: {
    above: 'över skalan',
    below: 'under skalan',
  },
  // Warnings the card paints instead of a reading. A locale carries all of
  // them, unlike the editor labels, which may fall back to English: a warning
  // is read at the moment something is refused.
  //
  // `{limits}`, `{setpoint}`, `{step}`, `{min}`, `{max}` and `{sensors}` are
  // YAML option names. They are never translated.
  warning: {
    no_sensors:
      'Det här kortet har ingen sensor att visa. Lägg till minst en under {sensors} i kortets konfiguration.',
    no_data: 'Inga data för den här sensorn.',
    not_supported:
      'Sensorn {name} är okänd för det här kortet. Välj en sensor i listan i den visuella redigeraren, eller skriv nyckeln exakt som i dokumentationen.',
    not_found:
      'Entiteten {entity} hittades inte. Kontrollera att entitets-ID:t är skrivet precis som i Home Assistant och att integrationen som tillhandahåller den är laddad.',
    no_scale:
      'Sensorn {name} saknar skala, så inget värde kan bedömas. Ge den fyra {limits}, eller en {setpoint} med ett {step}. Observera att {min} och {max} bara bestämmer stapelns bredd, de är ingen skala.',
    unknown: 'okänd',
  },
  sensor: {
    humidity: 'Luftfuktighet',
    filtration_time: 'Filtreringstid',
    pump_energy: 'Pumpenergi',
    co: 'Kolmonoxid',
    temperature: 'Temperatur',
    ph: 'pH',
    orp: 'ORP',
    tds: 'TDS',
    salinity: 'Salthalt',
    cya: 'Cyanursyra',
    calcium: 'Kalcium',
    phosphate: 'Fosfat',
    alkalinity: 'Alkalinitet',
    free_chlorine: 'Klor Fritt',
    total_chlorine: 'Klor Total',
    pressure: 'Tryck Filter',
    specific_gravity: 'Densitet',
    magnesium: 'Magnesium',
    water_level: 'Vattennivå',
    flow_rate: 'Flödeshastighet',
    uv_radiation: 'UV-Strålning',
    product_volume: 'Produkt Volym',
    product_weight: 'Produkt Vikt',
    ec: 'Elektrisk Ledningsförmåga',
    bromine: 'Brom',
    chlorinator: 'Kloratorinställning',
    pump_speed: 'Pumphastighet',
    light_brightness: 'Ljusstyrka',
    heat_pump_setpoint: 'Värmepump börvärde',
    co2: 'CO2',
    pm1: 'PM1',
    pm25: 'PM2.5',
    pm4: 'PM4',
    pm10: 'PM10',
    voc: 'VOC',
    tvoc: 'TVOC',
    formaldehyde: 'Formaldehyd',
    radon: 'Radon',
    aqi: 'Luftkvalitetsindex',
    noise: 'Ljudnivå',
    ammonia: 'Ammoniak',
    nitrite: 'Nitrit',
    nitrate: 'Nitrat',
    gh: 'Total hårdhet',
    kh: 'Karbonathårdhet',
    // the same key means the weather here, not a pool filter
    'air-monitor-card': {
      pressure: 'Lufttryck',
    },
  },
  time: {
    seconds: 'nu',
    minutes: '{minutes} minut tillbaka',
    hours: '{hours} timme tillbaka',
    days: '{days} dag tillbaka',
  },
  time_plural: {
    seconds: 'nu',
    minutes: '{minutes} minuter tillbaka',
    hours: '{hours} timmar tillbaka',
    days: '{days} dagar tillbaka',
  },
};

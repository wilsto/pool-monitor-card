export default {
  language: 'Nederlands',
  state: {
    1: 'Te laag',
    2: 'Acceptabel laag',
    3: 'Ideaal',
    4: 'Ideaal',
    5: 'Acceptabel hoog',
    6: 'Te hoog',
  },
  // Aankondiging van de trend voor een schermlezer.
  trend: {
    rising_1: 'stijgt langzaam',
    rising_2: 'stijgt',
    rising_3: 'stijgt snel',
    falling_1: 'daalt langzaam',
    falling_2: 'daalt',
    falling_3: 'daalt snel',
  },
  out_of_scale: {
    above: 'boven de schaal',
    below: 'onder de schaal',
  },
  // Warnings the card paints instead of a reading. A locale carries all of
  // them, unlike the editor labels, which may fall back to English: a warning
  // is read at the moment something is refused.
  //
  // `{limits}`, `{setpoint}`, `{step}`, `{min}`, `{max}` and `{sensors}` are
  // YAML option names. They are never translated.
  warning: {
    no_sensors:
      'Deze kaart heeft geen sensor om te tonen. Voeg er minstens één toe onder {sensors} in de kaartconfiguratie.',
    no_data: 'Geen gegevens voor deze sensor.',
    not_supported:
      'De sensor {name} is onbekend voor deze kaart. Kies een sensor uit de lijst in de visuele editor, of schrijf de sleutel precies zoals in de documentatie.',
    not_found:
      'Entiteit {entity} is niet gevonden. Controleer of de entiteits-ID precies zo is geschreven als in Home Assistant, en of de integratie die hem levert geladen is.',
    no_scale:
      'De sensor {name} heeft geen schaal, dus geen enkele meting kan worden beoordeeld. Geef hem vier {limits}, of een {setpoint} met een {step}. Let op: {min} en {max} bepalen alleen de breedte van de balk, ze zijn geen schaal.',
    unknown: 'onbekend',
  },
  sensor: {
    humidity: 'Luchtvochtigheid',
    filtration_time: 'Filtertijd',
    pump_energy: 'Pompenergie',
    co: 'Koolmonoxide',
    temperature: 'Temperatuur',
    ph: 'pH',
    orp: 'ORP',
    tds: 'TDS',
    salinity: 'Zoutgehalte',
    cya: 'Cyanuurzuur',
    calcium: 'Calcium',
    phosphate: 'Fosfaat',
    alkalinity: 'Alkaliteit',
    free_chlorine: 'Vrij chloor',
    total_chlorine: 'Totaal chloor',
    pressure: 'Filterdruk',
    specific_gravity: 'Soortelijk gewicht',
    magnesium: 'Magnesium',
    water_level: 'Waterniveau',
    flow_rate: 'Debiet',
    uv_radiation: 'UV-straling',
    product_volume: 'Productvolume',
    product_weight: 'Productgewicht',
    ec: 'Elektrische Geleidbaarheid',
    bromine: 'Broom',
    chlorinator: 'Chloormaker instelling',
    pump_speed: 'Pompsnelheid',
    light_brightness: 'Lichthelderheid',
    heat_pump_setpoint: 'Warmtepomp instelpunt',
    co2: 'CO2',
    pm1: 'PM1',
    pm25: 'PM2.5',
    pm4: 'PM4',
    pm10: 'PM10',
    voc: 'VOC',
    tvoc: 'TVOC',
    formaldehyde: 'Formaldehyde',
    radon: 'Radon',
    aqi: 'Luchtkwaliteitsindex',
    noise: 'Geluidsniveau',
    ammonia: 'Ammoniak',
    nitrite: 'Nitriet',
    nitrate: 'Nitraat',
    gh: 'Totale hardheid',
    kh: 'Carbonaathardheid',
    // the same key means the weather here, not a pool filter
    'air-monitor-card': {
      pressure: 'Luchtdruk',
    },
  },
  time: {
    seconds: 'zojuist',
    minutes: '{minutes} minuut geleden',
    hours: '{hours} uur geleden',
    days: '{days} dag geleden',
  },
  time_plural: {
    seconds: 'zojuist',
    minutes: '{minutes} minuten geleden',
    hours: '{hours} uur geleden',
    days: '{days} dagen geleden',
  },
};

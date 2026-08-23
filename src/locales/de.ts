export default {
  language: 'Deutsch',
  state: {
    1: 'Zu niedrig',
    2: 'Akzeptabler Tiefstwert',
    3: 'Ideal',
    4: 'Ideal',
    5: 'Akzeptabler Hochwert',
    6: 'Zu hoch',
  },
  // Ansage des Trends für einen Screenreader.
  trend: {
    rising_1: 'steigt langsam',
    rising_2: 'steigt',
    rising_3: 'steigt schnell',
    falling_1: 'fällt langsam',
    falling_2: 'fällt',
    falling_3: 'fällt schnell',
  },
  out_of_scale: {
    above: 'über der Skala',
    below: 'unter der Skala',
  },
  // Warnings the card paints instead of a reading. A locale carries all of
  // them, unlike the editor labels, which may fall back to English: a warning
  // is read at the moment something is refused.
  //
  // `{limits}`, `{setpoint}`, `{step}`, `{min}`, `{max}` and `{sensors}` are
  // YAML option names. They are never translated.
  warning: {
    no_sensors:
      'Diese Karte hat keinen Sensor zum Anzeigen. Fügen Sie mindestens einen unter {sensors} in der Kartenkonfiguration hinzu.',
    no_data: 'Keine Daten für diesen Sensor.',
    not_supported:
      'Der Sensor {name} ist dieser Karte nicht bekannt. Wählen Sie einen Sensor aus der Liste im visuellen Editor, oder schreiben Sie seinen Schlüssel genau so wie in der Dokumentation.',
    not_found:
      'Die Entität {entity} wurde nicht gefunden. Prüfen Sie, ob die Entitäts-ID genau so geschrieben ist wie in Home Assistant, und ob die Integration, die sie liefert, geladen ist.',
    no_scale:
      'Der Sensor {name} hat keine Skala, daher kann kein Messwert bewertet werden. Geben Sie ihm vier {limits}, oder einen {setpoint} mit einem {step}. Beachten Sie: {min} und {max} bestimmen nur die Breite des Balkens, sie sind keine Skala.',
    unknown: 'unbekannt',
  },
  sensor: {
    humidity: 'Luftfeuchtigkeit',
    filtration_time: 'Filterlaufzeit',
    pump_energy: 'Pumpenenergie',
    co: 'Kohlenmonoxid',
    temperature: 'Temperatur',
    ph: 'pH',
    orp: 'ORP',
    tds: 'TDS',
    salinity: 'Salzgehalt',
    cya: 'Cyanursäure',
    calcium: 'Kalzium',
    phosphate: 'Phosphat',
    alkalinity: 'Alkalinität',
    free_chlorine: 'Freies Chlor',
    total_chlorine: 'Gesamtchlor',
    pressure: 'Sandfilterdruck',
    specific_gravity: 'Spezifisches Gewicht',
    magnesium: 'Magnesium',
    water_level: 'Wasserstand',
    flow_rate: 'Durchfluss',
    uv_radiation: 'UV-Strahlung',
    product_volume: 'Produktvolumen',
    product_weight: 'Produktgewicht',
    ec: 'Elektrische Leitfähigkeit',
    bromine: 'Brom',
    chlorinator: 'Chlorator-Einstellung',
    pump_speed: 'Pumpengeschwindigkeit',
    light_brightness: 'Lichthelligkeit',
    heat_pump_setpoint: 'Wärmepumpe Sollwert',
    co2: 'CO2',
    pm1: 'PM1',
    pm25: 'PM2.5',
    pm4: 'PM4',
    pm10: 'PM10',
    voc: 'VOC',
    tvoc: 'TVOC',
    formaldehyde: 'Formaldehyd',
    radon: 'Radon',
    aqi: 'Luftqualitätsindex',
    noise: 'Geräuschpegel',
    ammonia: 'Ammoniak',
    nitrite: 'Nitrit',
    nitrate: 'Nitrat',
    gh: 'Gesamthärte',
    kh: 'Karbonathärte',
    // the same key means the weather here, not a pool filter
    'air-monitor-card': {
      pressure: 'Luftdruck',
    },
  },
  time: {
    seconds: 'gerade erst',
    minutes: 'vor {minutes} Minute',
    hours: 'vor {hours} Stunde',
    days: 'vor {days} Tag',
  },
  time_plural: {
    seconds: 'gerade erst',
    minutes: 'vor {minutes} Minuten',
    hours: 'vor {hours} Stunden',
    days: 'vor {days} Tagen',
  },
};

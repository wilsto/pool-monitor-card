export default {
  language: 'Română',
  state: {
    1: 'Prea mic',
    2: 'Mic',
    3: 'Ideal',
    4: 'Ideal',
    5: 'Mare',
    6: 'Prea mare',
  },
  // Anunțarea tendinței pentru un cititor de ecran.
  trend: {
    rising_1: 'crește lent',
    rising_2: 'crește',
    rising_3: 'crește rapid',
    falling_1: 'scade lent',
    falling_2: 'scade',
    falling_3: 'scade rapid',
  },
  out_of_scale: {
    above: 'peste scară',
    below: 'sub scară',
  },
  // Warnings the card paints instead of a reading. A locale carries all of
  // them, unlike the editor labels, which may fall back to English: a warning
  // is read at the moment something is refused.
  //
  // `{limits}`, `{setpoint}`, `{step}`, `{min}`, `{max}` and `{sensors}` are
  // YAML option names. They are never translated.
  warning: {
    no_sensors:
      'Acest card nu are niciun senzor de afișat. Adăugați cel puțin unul la {sensors} în configurația cardului.',
    no_data: 'Nu există date pentru acest senzor.',
    not_supported:
      'Senzorul {name} nu este cunoscut de acest card. Alegeți un senzor din lista editorului vizual, sau scrieți cheia exact ca în documentație.',
    not_found:
      'Entitatea {entity} nu a fost găsită. Verificați dacă identificatorul este scris exact așa cum îl înregistrează Home Assistant și dacă integrarea care o furnizează este încărcată.',
    no_scale:
      'Senzorul {name} nu are o scală, așa că nicio valoare nu poate fi evaluată. Dați-i patru {limits}, sau un {setpoint} cu un {step}. Rețineți că {min} și {max} doar dimensionează bara, nu sunt o scală.',
    unknown: 'necunoscut',
  },
  sensor: {
    humidity: 'Umiditate',
    filtration_time: 'Timp de filtrare',
    pump_energy: 'Energie pompă',
    co: 'Monoxid de carbon',
    temperature: 'Temperatură',
    ph: 'pH',
    orp: 'ORP',
    tds: 'TDS',
    salinity: 'Salinitate',
    cya: 'Acid cianuric',
    calcium: 'Calciu',
    phosphate: 'Fosfat',
    alkalinity: 'Alcalinitate',
    free_chlorine: 'Clor liber',
    total_chlorine: 'Clor total',
    pressure: 'Presiune filtru',
    specific_gravity: 'Greutate specifică',
    magnesium: 'Magneziu',
    water_level: 'Nivel apă',
    flow_rate: 'Debit',
    uv_radiation: 'Radiație UV',
    product_volume: 'Volum produs',
    product_weight: 'Greutate produs',
    ec: 'Conductivitate Electrică',
    bromine: 'Brom',
    chlorinator: 'Setare clorinator',
    pump_speed: 'Viteza pompei',
    light_brightness: 'Luminozitate lumina',
    heat_pump_setpoint: 'Punct de reglaj pompa de caldura',
    co2: 'CO2',
    pm1: 'PM1',
    pm25: 'PM2.5',
    pm4: 'PM4',
    pm10: 'PM10',
    voc: 'VOC',
    tvoc: 'TVOC',
    formaldehyde: 'Formaldehidă',
    radon: 'Radon',
    aqi: 'Indicele calității aerului',
    noise: 'Nivel de zgomot',
    ammonia: 'Amoniac',
    nitrite: 'Nitriți',
    nitrate: 'Nitrați',
    gh: 'Duritate generală',
    kh: 'Duritate carbonatică',
    // the same key means the weather here, not a pool filter
    'air-monitor-card': {
      pressure: 'Presiune atmosferică',
    },
  },
  time: {
    seconds: 'chiar acum',
    minutes: 'acum {minutes} minut',
    hours: 'acum {hours} oră',
    days: 'acum {days} zi',
  },
  time_plural: {
    seconds: 'chiar acum',
    minutes: 'acum {minutes} minute',
    hours: 'acum {hours} ore',
    days: 'acum {days} zile',
  },
};

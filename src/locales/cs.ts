export default {
  language: 'Čeština',
  state: {
    1: 'Příliš nízká',
    2: 'Přijatelně nízká',
    3: 'Ideální',
    4: 'Ideální',
    5: 'Přijatelně vysoká',
    6: 'Příliš vysoká',
  },
  // Oznámení trendu pro čtečku obrazovky.
  trend: {
    rising_1: 'pomalu stoupá',
    rising_2: 'stoupá',
    rising_3: 'rychle stoupá',
    falling_1: 'pomalu klesá',
    falling_2: 'klesá',
    falling_3: 'rychle klesá',
  },
  out_of_scale: {
    above: 'nad stupnicí',
    below: 'pod stupnicí',
  },
  // Warnings the card paints instead of a reading. A locale carries all of
  // them, unlike the editor labels, which may fall back to English: a warning
  // is read at the moment something is refused.
  //
  // `{limits}`, `{setpoint}`, `{step}`, `{min}`, `{max}` and `{sensors}` are
  // YAML option names. They are never translated.
  warning: {
    no_sensors:
      'Tato karta nemá žádný senzor k zobrazení. Přidejte alespoň jeden do {sensors} v konfiguraci karty.',
    no_data: 'Žádná data pro tento senzor.',
    not_supported:
      'Senzor {name} tato karta nezná. Vyberte senzor ze seznamu ve vizuálním editoru, nebo napište jeho klíč přesně tak, jak je uveden v dokumentaci.',
    not_found:
      'Entita {entity} nebyla nalezena. Zkontrolujte, zda je identifikátor napsán přesně tak, jak jej eviduje Home Assistant, a zda je načtena integrace, která ji poskytuje.',
    no_scale:
      'Senzor {name} nemá škálu, takže žádné měření nelze vyhodnotit. Zadejte mu čtyři {limits}, nebo {setpoint} spolu s {step}. Hodnoty {min} a {max} určují jen šířku pruhu, nejsou škálou.',
    unknown: 'neznámý',
  },
  sensor: {
    humidity: 'Vlhkost',
    filtration_time: 'Doba filtrace',
    pump_energy: 'Energie čerpadla',
    co: 'Oxid uhelnatý',
    temperature: 'Teplota',
    ph: 'pH',
    orp: 'ORP',
    tds: 'TDS',
    salinity: 'Salinita',
    cya: 'Kyselina kyanurová',
    calcium: 'Vápník',
    phosphate: 'Fosfát',
    alkalinity: 'Alkalita',
    free_chlorine: 'Volný chlór',
    total_chlorine: 'Celkový chlór',
    pressure: 'Tlak filtrace',
    specific_gravity: 'Měrná hmotnost',
    magnesium: 'Hořčík',
    water_level: 'Hladina vody',
    flow_rate: 'Průtok',
    uv_radiation: 'UV záření',
    product_volume: 'Objem přípravku',
    product_weight: 'Hmotnost přípravku',
    ec: 'Elektrická vodivost',
    bromine: 'Brom',
    chlorinator: 'Nastavení chlorátoru',
    pump_speed: 'Rychlost čerpadla',
    light_brightness: 'Jas světla',
    heat_pump_setpoint: 'Nastavená hodnota tepelného čerpadla',
    co2: 'CO2',
    pm1: 'PM1',
    pm25: 'PM2.5',
    pm4: 'PM4',
    pm10: 'PM10',
    voc: 'VOC',
    tvoc: 'TVOC',
    formaldehyde: 'Formaldehyd',
    radon: 'Radon',
    aqi: 'Index kvality ovzduší',
    noise: 'Hladina hluku',
    ammonia: 'Amoniak',
    nitrite: 'Dusitany',
    nitrate: 'Dusičnany',
    gh: 'Celková tvrdost',
    kh: 'Uhličitanová tvrdost',
    // the same key means the weather here, not a pool filter
    'air-monitor-card': {
      pressure: 'Atmosférický tlak',
    },
  },
  time: {
    seconds: 'právě nyní',
    minutes: 'před {minutes} minutou',
    hours: 'před {hours} hodinou',
    days: 'před {days} dnem',
  },
  time_plural: {
    seconds: 'právě nyní',
    minutes: 'před {minutes} minutami',
    hours: 'před {hours} hodinami',
    days: 'před {days} dny',
  },
};

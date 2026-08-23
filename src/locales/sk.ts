export default {
  language: 'Slovenčina',
  state: {
    1: 'Príliš nízky',
    2: 'Akceptovateľne nízky',
    3: 'Ideálny',
    4: 'Ideálny',
    5: 'Akceptovateľne vysoký',
    6: 'Príliš vysoký',
  },
  // Ohlásenie trendu pre čítačku obrazovky.
  trend: {
    rising_1: 'pomaly stúpa',
    rising_2: 'stúpa',
    rising_3: 'rýchlo stúpa',
    falling_1: 'pomaly klesá',
    falling_2: 'klesá',
    falling_3: 'rýchlo klesá',
  },
  out_of_scale: {
    above: 'nad stupnicou',
    below: 'pod stupnicou',
  },
  // Warnings the card paints instead of a reading. A locale carries all of
  // them, unlike the editor labels, which may fall back to English: a warning
  // is read at the moment something is refused.
  //
  // `{limits}`, `{setpoint}`, `{step}`, `{min}`, `{max}` and `{sensors}` are
  // YAML option names. They are never translated.
  warning: {
    no_sensors:
      'Táto karta nemá žiadny senzor na zobrazenie. Pridajte aspoň jeden do {sensors} v konfigurácii karty.',
    no_data: 'Žiadne údaje pre tento senzor.',
    not_supported:
      'Senzor {name} táto karta nepozná. Vyberte senzor zo zoznamu vo vizuálnom editore, alebo napíšte jeho kľúč presne tak, ako je v dokumentácii.',
    not_found:
      'Entita {entity} sa nenašla. Skontrolujte, či je identifikátor napísaný presne tak, ako ho eviduje Home Assistant, a či je načítaná integrácia, ktorá ju poskytuje.',
    no_scale:
      'Senzor {name} nemá škálu, takže žiadne meranie nemožno vyhodnotiť. Zadajte mu štyri {limits}, alebo {setpoint} spolu s {step}. {min} a {max} určujú iba šírku pruhu, nie sú škálou.',
    unknown: 'neznámy',
  },
  sensor: {
    humidity: 'Vlhkosť',
    filtration_time: 'Čas filtrácie',
    pump_energy: 'Energia čerpadla',
    co: 'Oxid uhoľnatý',
    temperature: 'Teplota',
    ph: 'pH',
    orp: 'ORP',
    tds: 'TDS',
    salinity: 'Salinita',
    cya: 'Kyselina kyanurová',
    calcium: 'Vápnik',
    phosphate: 'Fosfát',
    alkalinity: 'Alkalinita',
    free_chlorine: 'Voľný chlór',
    total_chlorine: 'Celkový chlór',
    pressure: 'Tlak filtra',
    specific_gravity: 'Špecifická hmotnosť',
    magnesium: 'Magnézium',
    water_level: 'Úroveň vody',
    flow_rate: 'Prietok',
    uv_radiation: 'UV žiarenie',
    product_volume: 'Objem produktu',
    product_weight: 'Hmotnosť produktu',
    ec: 'Elektrická Vodivosť',
    bromine: 'Bróm',
    chlorinator: 'Nastavenie chlórovača',
    pump_speed: 'Rýchlosť čerpadla',
    light_brightness: 'Jas svetla',
    heat_pump_setpoint: 'Nastavená teplota tepelného čerpadla',
    co2: 'CO2',
    pm1: 'PM1',
    pm25: 'PM2.5',
    pm4: 'PM4',
    pm10: 'PM10',
    voc: 'VOC',
    tvoc: 'TVOC',
    formaldehyde: 'Formaldehyd',
    radon: 'Radón',
    aqi: 'Index kvality ovzdušia',
    noise: 'Hladina hluku',
    ammonia: 'Amoniak',
    nitrite: 'Dusitany',
    nitrate: 'Dusičnany',
    gh: 'Celková tvrdosť',
    kh: 'Uhličitanová tvrdosť',
    // the same key means the weather here, not a pool filter
    'air-monitor-card': {
      pressure: 'Atmosférický tlak',
    },
  },
  time: {
    seconds: 'práve teraz',
    minutes: 'pred {minutes} minútou',
    hours: 'pred {hours} hodinou',
    days: 'pred {days} dňom',
  },
  time_plural: {
    seconds: 'práve teraz',
    minutes: 'pred {minutes} minútami',
    hours: 'pred {hours} hodinami',
    days: 'pred {days} dňami',
  },
};

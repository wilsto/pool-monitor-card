export default {
  language: 'Italiano',
  state: {
    1: 'Troppo basso',
    2: 'Accettabile basso',
    3: 'Ideale',
    4: 'Ideale',
    5: 'Accettabile alto',
    6: 'Troppo alto',
  },
  // Annuncio della tendenza per uno screen reader.
  trend: {
    rising_1: 'sale lentamente',
    rising_2: 'sale',
    rising_3: 'sale rapidamente',
    falling_1: 'scende lentamente',
    falling_2: 'scende',
    falling_3: 'scende rapidamente',
  },
  out_of_scale: {
    above: 'sopra la scala',
    below: 'sotto la scala',
  },
  // Warnings the card paints instead of a reading. A locale carries all of
  // them, unlike the editor labels, which may fall back to English: a warning
  // is read at the moment something is refused.
  //
  // `{limits}`, `{setpoint}`, `{step}`, `{min}`, `{max}` and `{sensors}` are
  // YAML option names. They are never translated.
  warning: {
    no_sensors:
      'Questa scheda non ha alcun sensore da mostrare. Aggiungine almeno uno sotto {sensors} nella configurazione della scheda.',
    no_data: 'Nessun dato per questo sensore.',
    not_supported:
      "Il sensore {name} non è noto a questa scheda. Scegli un sensore dall'elenco nell'editor visuale, oppure scrivi la sua chiave esattamente come nella documentazione.",
    not_found:
      "Impossibile trovare l'entità {entity}. Verifica che l'ID sia scritto come lo registra Home Assistant e che l'integrazione che la fornisce sia caricata.",
    no_scale:
      'Il sensore {name} non ha una scala, quindi nessuna lettura può essere valutata. Assegnagli quattro {limits}, oppure un {setpoint} con uno {step}. Nota che {min} e {max} dimensionano solo la barra, non sono una scala.',
    unknown: 'sconosciuto',
  },
  sensor: {
    humidity: 'Umidità',
    filtration_time: 'Tempo di filtrazione',
    pump_energy: 'Energia pompa',
    co: 'Monossido di carbonio',
    temperature: 'Temperatura',
    ph: 'pH',
    orp: 'ORP',
    tds: 'TDS',
    salinity: 'Salinità',
    cya: 'Acido cianurico',
    calcium: 'Calcio',
    phosphate: 'Fosfato',
    alkalinity: 'Alcalinità',
    free_chlorine: 'Cloro libero',
    total_chlorine: 'Cloro totale',
    pressure: 'Pressione filtro',
    specific_gravity: 'Gravità specifica',
    magnesium: 'Magnesio',
    water_level: "Livello dell'acqua",
    flow_rate: 'Portata',
    uv_radiation: 'Radiazione UV',
    product_volume: 'Volume prodotto',
    product_weight: 'Peso prodotto',
    ec: 'Conducibilità Elettrica',
    bromine: 'Bromo',
    chlorinator: 'Impostazione clorinatore',
    pump_speed: 'Velocità pompa',
    light_brightness: 'Luminosità luce',
    heat_pump_setpoint: 'Setpoint pompa di calore',
    co2: 'CO2',
    pm1: 'PM1',
    pm25: 'PM2.5',
    pm4: 'PM4',
    pm10: 'PM10',
    voc: 'VOC',
    tvoc: 'TVOC',
    formaldehyde: 'Formaldeide',
    radon: 'Radon',
    aqi: "Indice di qualità dell'aria",
    noise: 'Livello di rumore',
    ammonia: 'Ammoniaca',
    nitrite: 'Nitriti',
    nitrate: 'Nitrati',
    gh: 'Durezza totale',
    kh: 'Durezza carbonatica',
    // the same key means the weather here, not a pool filter
    'air-monitor-card': {
      pressure: 'Pressione atmosferica',
    },
  },
  time: {
    seconds: 'proprio ora',
    minutes: '{minutes} minuto fa',
    hours: '{hours} ora fa',
    days: '{days} giorno fa',
  },
  time_plural: {
    seconds: 'proprio ora',
    minutes: '{minutes} minuti fa',
    hours: '{hours} ore fa',
    days: '{days} giorni fa',
  },
};

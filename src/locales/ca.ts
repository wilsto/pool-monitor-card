// Contributed by @XattSPT, wilsto/pool-monitor-card#86.
// Ported here rather than merged there: the distribution repository is
// regenerated on every release, so nothing committed to it survives.
export default {
  language: 'Català',
  state: {
    1: 'Massa baix',
    2: 'Aceptable baix',
    3: 'Perfecte',
    4: 'Perfecte',
    5: 'Aceptable alt',
    6: 'Massa alt',
  },
  // Anunci de la tendència per a un lector de pantalla.
  trend: {
    rising_1: 'puja lentament',
    rising_2: 'puja',
    rising_3: 'puja ràpidament',
    falling_1: 'baixa lentament',
    falling_2: 'baixa',
    falling_3: 'baixa ràpidament',
  },
  out_of_scale: {
    above: "per sobre de l'escala",
    below: "per sota de l'escala",
  },
  // Warnings the card paints instead of a reading. A locale carries all of
  // them, unlike the editor labels, which may fall back to English: a warning
  // is read at the moment something is refused.
  //
  // `{limits}`, `{setpoint}`, `{step}`, `{min}`, `{max}` and `{sensors}` are
  // YAML option names. They are never translated.
  warning: {
    no_sensors:
      'Aquesta targeta no té cap sensor per mostrar. Afegiu-ne almenys un a {sensors} dins la configuració de la targeta.',
    no_data: 'Sense dades per a aquest sensor.',
    not_supported:
      "Aquesta targeta no coneix el sensor {name}. Trieu un sensor de la llista de l'editor visual, o escriviu-ne la clau tal com apareix a la documentació.",
    not_found:
      "No s'ha trobat l'entitat {entity}. Comproveu que l'identificador estigui escrit tal com el registra Home Assistant i que la integració que la proporciona estigui carregada.",
    no_scale:
      'El sensor {name} no té escala, així que cap lectura no es pot valorar. Doneu-li quatre {limits}, o un {setpoint} amb un {step}. Tingueu en compte que {min} i {max} només dimensionen la barra, no són una escala.',
    unknown: 'desconegut',
  },
  sensor: {
    humidity: 'Humitat',
    filtration_time: 'Temps de filtració',
    pump_energy: 'Energia de la bomba',
    co: 'Monòxid de carboni',
    temperature: 'Temperatura',
    ph: 'pH',
    orp: 'ORP',
    tds: 'TDS',
    salinity: 'Salinitat',
    cya: 'Ácid cianúric',
    calcium: 'Calci',
    phosphate: 'Fosfat',
    alkalinity: 'Alcalinitat',
    free_chlorine: 'Clor lliure',
    total_chlorine: 'Clor total',
    pressure: 'Presió del filtre relativa',
    specific_gravity: 'Densitat relativa',
    magnesium: 'Magnesi',
    water_level: 'Nivell aigua',
    flow_rate: 'Cabal',
    uv_radiation: 'Radiació UV',
    product_volume: 'Volum Producte',
    product_weight: 'Pes Producte',
    ec: 'Conductivitat Eléctrica',
    bromine: 'Brom',
    chlorinator: 'Ajust del clorador',
    pump_speed: 'Velocitat de bomba',
    light_brightness: 'Brillantor de llum',
    heat_pump_setpoint: 'Consigna bomba de calor',
    co2: 'CO2',
    pm1: 'PM1',
    pm25: 'PM2.5',
    pm4: 'PM4',
    pm10: 'PM10',
    voc: 'VOC',
    tvoc: 'TVOC',
    formaldehyde: 'Formaldehid',
    radon: 'Radó',
    aqi: "Índex de qualitat de l'aire",
    noise: 'Nivell de soroll',
    ammonia: 'Amoníac',
    nitrite: 'Nitrits',
    nitrate: 'Nitrats',
    gh: 'Duresa general',
    kh: 'Duresa carbonatada',
    // the same key means the weather here, not a pool filter
    'air-monitor-card': {
      pressure: 'Pressió atmosfèrica',
    },
  },
  time: {
    seconds: 'ara mateix',
    minutes: 'fa {minutes} minut',
    hours: 'fa {hours} hora',
    days: 'fa {days} dia',
  },
  time_plural: {
    seconds: 'ara mateix',
    minutes: 'fa {minutes} minuts',
    hours: 'fa {hours} hores',
    days: 'fa {days} dies',
  },
};

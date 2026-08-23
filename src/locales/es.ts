export default {
  language: 'Español',
  state: {
    1: 'Demasiado bajo',
    2: 'Aceptable bajo',
    3: 'Perfecto',
    4: 'Perfecto',
    5: 'Aceptable alto',
    6: 'Demasiado alto',
  },
  // Anuncio de la tendencia para un lector de pantalla.
  trend: {
    rising_1: 'sube lentamente',
    rising_2: 'sube',
    rising_3: 'sube rápidamente',
    falling_1: 'baja lentamente',
    falling_2: 'baja',
    falling_3: 'baja rápidamente',
  },
  out_of_scale: {
    above: 'por encima de la escala',
    below: 'por debajo de la escala',
  },
  // Warnings the card paints instead of a reading. A locale carries all of
  // them, unlike the editor labels, which may fall back to English: a warning
  // is read at the moment something is refused.
  //
  // `{limits}`, `{setpoint}`, `{step}`, `{min}`, `{max}` and `{sensors}` are
  // YAML option names. They are never translated.
  warning: {
    no_sensors:
      'Esta tarjeta no tiene ningún sensor que mostrar. Añada al menos uno en {sensors} dentro de la configuración de la tarjeta.',
    no_data: 'Sin datos para este sensor.',
    not_supported:
      'Esta tarjeta no conoce el sensor {name}. Elija un sensor de la lista del editor visual, o escriba su clave tal como aparece en la documentación.',
    not_found:
      'No se encuentra la entidad {entity}. Compruebe que el identificador está escrito como lo registra Home Assistant y que la integración que la proporciona está cargada.',
    no_scale:
      'El sensor {name} no tiene escala, así que ninguna lectura puede valorarse. Déle cuatro {limits}, o un {setpoint} con un {step}. Tenga en cuenta que {min} y {max} solo dimensionan la barra, no son una escala.',
    unknown: 'desconocido',
  },
  sensor: {
    humidity: 'Humedad',
    filtration_time: 'Tiempo de filtración',
    pump_energy: 'Energía de la bomba',
    co: 'Monóxido de carbono',
    temperature: 'Temperatura',
    ph: 'pH',
    orp: 'ORP',
    tds: 'TDS',
    salinity: 'Salinidad',
    cya: 'Acido cianúrico',
    calcium: 'Calcio',
    phosphate: 'Fosfato',
    alkalinity: 'Alcalinidad',
    free_chlorine: 'Cloro libre',
    total_chlorine: 'Cloro total',
    pressure: 'Pressione du filter relativa',
    specific_gravity: 'Densidad relativa',
    magnesium: 'Magnesio',
    water_level: 'Nivel de agua',
    flow_rate: 'Caudal',
    uv_radiation: 'Radiación UV',
    product_volume: 'Volumen Producto',
    product_weight: 'Peso Producto',
    ec: 'Conductividad Eléctrica',
    bromine: 'Bromo',
    chlorinator: 'Ajuste de clorador',
    pump_speed: 'Velocidad de bomba',
    light_brightness: 'Brillo de luz',
    heat_pump_setpoint: 'Consigna bomba de calor',
    co2: 'CO2',
    pm1: 'PM1',
    pm25: 'PM2.5',
    pm4: 'PM4',
    pm10: 'PM10',
    voc: 'VOC',
    tvoc: 'TVOC',
    formaldehyde: 'Formaldehído',
    radon: 'Radón',
    aqi: 'Índice de calidad del aire',
    noise: 'Nivel de ruido',
    ammonia: 'Amoníaco',
    nitrite: 'Nitritos',
    nitrate: 'Nitratos',
    gh: 'Dureza general',
    kh: 'Dureza carbonatada',
    // the same key means the weather here, not a pool filter
    'air-monitor-card': {
      pressure: 'Presión atmosférica',
    },
  },
  time: {
    seconds: 'justo ahora',
    minutes: 'hace {minutes} minuto',
    hours: 'hace {hours} hora',
    days: 'hace {days} día',
  },
  time_plural: {
    seconds: 'justo ahora',
    minutes: 'hace {minutes} minutos',
    hours: 'hace {hours} horas',
    days: 'hace {days} días',
  },
};

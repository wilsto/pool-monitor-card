export default {
  language: 'Português',
  state: {
    1: 'Muito Baixo',
    2: 'Torelavel mas Baixo',
    3: 'Ideal',
    4: 'Ideal',
    5: 'Toleravel mas Alto',
    6: 'Muito Alto',
  },
  // Anúncio da tendência para um leitor de ecrã.
  trend: {
    rising_1: 'a subir lentamente',
    rising_2: 'a subir',
    rising_3: 'a subir rapidamente',
    falling_1: 'a descer lentamente',
    falling_2: 'a descer',
    falling_3: 'a descer rapidamente',
  },
  out_of_scale: {
    above: 'acima da escala',
    below: 'abaixo da escala',
  },
  // Warnings the card paints instead of a reading. A locale carries all of
  // them, unlike the editor labels, which may fall back to English: a warning
  // is read at the moment something is refused.
  //
  // `{limits}`, `{setpoint}`, `{step}`, `{min}`, `{max}` and `{sensors}` are
  // YAML option names. They are never translated.
  warning: {
    no_sensors:
      'Este cartão não tem nenhum sensor para mostrar. Adicione pelo menos um em {sensors} na configuração do cartão.',
    no_data: 'Sem dados para este sensor.',
    not_supported:
      'O sensor {name} não é conhecido por este cartão. Escolha um sensor da lista no editor visual, ou escreva a sua chave exatamente como na documentação.',
    not_found:
      'A entidade {entity} não foi encontrada. Verifique se o identificador está escrito como o Home Assistant o regista e se a integração que a fornece está carregada.',
    no_scale:
      'O sensor {name} não tem escala, por isso nenhuma leitura pode ser avaliada. Dê-lhe quatro {limits}, ou um {setpoint} com um {step}. Note que {min} e {max} apenas dimensionam a barra, não são uma escala.',
    unknown: 'desconhecido',
  },
  sensor: {
    humidity: 'Humidade',
    filtration_time: 'Tempo de filtração',
    pump_energy: 'Energia da bomba',
    co: 'Monóxido de carbono',
    temperature: 'Temperatura',
    ph: 'pH',
    orp: 'ORP',
    tds: 'TDS',
    salinity: 'Salinidade',
    cya: 'Ácido cianúrico',
    calcium: 'Calcio',
    phosphate: 'Fosfato',
    alkalinity: 'Alcalinidade',
    free_chlorine: 'Cloro livres',
    total_chlorine: 'Cloro total',
    pressure: 'Pressão do filtro',
    specific_gravity: 'Gravidade específica',
    magnesium: 'Magnésio',
    water_level: 'Nivel de agua',
    flow_rate: 'Caudal',
    uv_radiation: 'Radiação UV',
    product_volume: 'Volume Produto',
    product_weight: 'Peso Produto',
    ec: 'Condutividade Elétrica',
    bromine: 'Bromo',
    chlorinator: 'Configuração do clorador',
    pump_speed: 'Velocidade da bomba',
    light_brightness: 'Brilho da luz',
    heat_pump_setpoint: 'Ponto de ajuste bomba de calor',
    co2: 'CO2',
    pm1: 'PM1',
    pm25: 'PM2.5',
    pm4: 'PM4',
    pm10: 'PM10',
    voc: 'VOC',
    tvoc: 'TVOC',
    formaldehyde: 'Formaldeído',
    radon: 'Radão',
    aqi: 'Índice de qualidade do ar',
    noise: 'Nível de ruído',
    ammonia: 'Amoníaco',
    nitrite: 'Nitritos',
    nitrate: 'Nitratos',
    gh: 'Dureza geral',
    kh: 'Dureza carbonatada',
    // the same key means the weather here, not a pool filter
    'air-monitor-card': {
      pressure: 'Pressão atmosférica',
    },
  },
  time: {
    seconds: 'agora mesmo',
    minutes: 'há {minutes} minuto',
    hours: 'há {hours} hora',
    days: 'há {days} dia',
  },
  time_plural: {
    seconds: 'agora mesmo',
    minutes: 'há {minutes} minutos',
    hours: 'há {hours} horas',
    days: 'há {days} dias',
  },
};

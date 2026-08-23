export default {
  language: 'Magyar',
  state: {
    1: 'Túl alacsony',
    2: 'Elfogadhatóan alacsony',
    3: 'Ideális',
    4: 'Ideális',
    5: 'Elfogadhatóan magas',
    6: 'Túl magas',
  },
  // A trend bemondása képernyőolvasónak.
  trend: {
    rising_1: 'lassan emelkedik',
    rising_2: 'emelkedik',
    rising_3: 'gyorsan emelkedik',
    falling_1: 'lassan csökken',
    falling_2: 'csökken',
    falling_3: 'gyorsan csökken',
  },
  out_of_scale: {
    above: 'a skála felett',
    below: 'a skála alatt',
  },
  // Warnings the card paints instead of a reading. A locale carries all of
  // them, unlike the editor labels, which may fall back to English: a warning
  // is read at the moment something is refused.
  //
  // `{limits}`, `{setpoint}`, `{step}`, `{min}`, `{max}` and `{sensors}` are
  // YAML option names. They are never translated.
  warning: {
    no_sensors:
      'Ezen a kártyán nincs megjeleníthető érzékelő. Vegyen fel legalább egyet a {sensors} alá a kártya beállításaiban.',
    no_data: 'Nincs adat ehhez az érzékelőhöz.',
    not_supported:
      'A(z) {name} érzékelőt nem ismeri ez a kártya. Válasszon érzékelőt a vizuális szerkesztő listájából, vagy írja be a kulcsát pontosan úgy, ahogy a dokumentációban szerepel.',
    not_found:
      'A(z) {entity} entitás nem található. Ellenőrizze, hogy az azonosító pontosan úgy szerepel-e, ahogy a Home Assistant tárolja, és hogy be van-e töltve az azt biztosító integráció.',
    no_scale:
      'A(z) {name} érzékelőnek nincs skálája, ezért egyetlen mérés sem értékelhető. Adjon meg neki négy {limits} értéket, vagy egy {setpoint} értéket {step} lépésközzel. A {min} és a {max} csak a sáv szélességét adja meg, nem skála.',
    unknown: 'ismeretlen',
  },
  sensor: {
    humidity: 'Páratartalom',
    filtration_time: 'Szűrési idő',
    pump_energy: 'Szivattyú energia',
    co: 'Szén-monoxid',
    temperature: 'Hőmérséklet',
    ph: 'pH',
    orp: 'ORP',
    tds: 'TDS',
    salinity: 'Sótartalom',
    cya: 'Cianursav',
    calcium: 'Kalcium',
    phosphate: 'Foszfát',
    alkalinity: 'Lúgosság',
    free_chlorine: 'Szabad klór',
    total_chlorine: 'Összes klór',
    pressure: 'Szűrő nyomás',
    specific_gravity: 'Fajsúly',
    magnesium: 'Magnézium',
    water_level: 'Vízszint',
    flow_rate: 'Áramlási sebesség',
    uv_radiation: 'UV sugárzás',
    product_volume: 'Termék térfogat',
    product_weight: 'Termék tömeg',
    ec: 'Elektromos vezetőképesség',
    bromine: 'Bróm',
    chlorinator: 'Klórozó beállítás',
    pump_speed: 'Szivattyú sebesség',
    light_brightness: 'Fény fényerő',
    heat_pump_setpoint: 'Hőszivattyú beállítás',
    co2: 'CO2',
    pm1: 'PM1',
    pm25: 'PM2.5',
    pm4: 'PM4',
    pm10: 'PM10',
    voc: 'VOC',
    tvoc: 'TVOC',
    formaldehyde: 'Formaldehid',
    radon: 'Radon',
    aqi: 'Levegőminőségi index',
    noise: 'Zajszint',
    ammonia: 'Ammónia',
    nitrite: 'Nitrit',
    nitrate: 'Nitrát',
    gh: 'Összes keménység',
    kh: 'Karbonátkeménység',
    // the same key means the weather here, not a pool filter
    'air-monitor-card': {
      pressure: 'Légnyomás',
    },
  },
  time: {
    seconds: 'éppen most',
    minutes: '{minutes} perce',
    hours: '{hours} órája',
    days: '{days} napja',
  },
  time_plural: {
    seconds: 'éppen most',
    minutes: '{minutes} perce',
    hours: '{hours} órája',
    days: '{days} napja',
  },
};

export default {
  language: 'עברית',
  state: {
    1: 'נמוך מדי',
    2: 'נמוך מאוד',
    3: 'אידיאלי',
    4: 'אידיאלי',
    5: 'גבוה מאוד',
    6: 'גבוה מדי',
  },
  // הכרזת המגמה לקורא מסך.
  trend: {
    rising_1: 'עולה לאט',
    rising_2: 'עולה',
    rising_3: 'עולה מהר',
    falling_1: 'יורד לאט',
    falling_2: 'יורד',
    falling_3: 'יורד מהר',
  },
  out_of_scale: {
    above: 'מעל הסולם',
    below: 'מתחת לסולם',
  },
  // Warnings the card paints instead of a reading. A locale carries all of
  // them, unlike the editor labels, which may fall back to English: a warning
  // is read at the moment something is refused.
  //
  // `{limits}`, `{setpoint}`, `{step}`, `{min}`, `{max}` and `{sensors}` are
  // YAML option names. They are never translated.
  warning: {
    no_sensors: 'לכרטיס הזה אין חיישן להצגה. הוסיפו לפחות אחד תחת {sensors} בהגדרות הכרטיס.',
    no_data: 'אין נתונים לחיישן הזה.',
    not_supported:
      'הכרטיס הזה לא מכיר את החיישן {name}. בחרו חיישן מהרשימה בעורך הוויזואלי, או כתבו את המפתח שלו בדיוק כפי שמופיע בתיעוד.',
    not_found:
      'הישות {entity} לא נמצאה. ודאו שמזהה הישות כתוב בדיוק כפי שהוא רשום ב-Home Assistant, ושהאינטגרציה שמספקת אותה נטענה.',
    no_scale:
      'לחיישן {name} אין סולם, ולכן אי אפשר להעריך שום קריאה. הגדירו לו ארבעה {limits}, או {setpoint} יחד עם {step}. שימו לב ש-{min} ו-{max} רק קובעים את רוחב הפס, הם אינם סולם.',
    unknown: 'לא ידוע',
  },
  sensor: {
    humidity: 'לחות',
    filtration_time: 'זמן סינון',
    pump_energy: 'אנרגיית משאבה',
    co: 'פחמן חד-חמצני',
    temperature: 'טמפרטורה',
    ph: 'PH',
    orp: 'ORP',
    tds: 'TDS',
    salinity: 'מליחות',
    cya: 'חומצה ציאנורית',
    calcium: 'סידן',
    phosphate: 'פוספט',
    alkalinity: 'אלקליניות',
    free_chlorine: 'כלור חופשי',
    total_chlorine: 'כלור כולל',
    pressure: 'לחץ מסנן',
    specific_gravity: 'משקל סגולי',
    magnesium: 'מגנזיום',
    water_level: 'מפלס מים',
    flow_rate: 'קצב זרימה',
    uv_radiation: 'קרינת UV',
    product_volume: 'נפח מוצר',
    product_weight: 'משקל מוצר',
    ec: 'מוליכות חשמלית',
    bromine: 'ברום',
    chlorinator: 'הגדרת מחלור',
    pump_speed: 'מהירות משאבה',
    light_brightness: 'בהירות תאורה',
    heat_pump_setpoint: 'נקודת כיוון משאבת חום',
    co2: 'CO2',
    pm1: 'PM1',
    pm25: 'PM2.5',
    pm4: 'PM4',
    pm10: 'PM10',
    voc: 'VOC',
    tvoc: 'TVOC',
    formaldehyde: 'פורמלדהיד',
    radon: 'רדון',
    aqi: 'מדד איכות האוויר',
    noise: 'עוצמת רעש',
    ammonia: 'אמוניה',
    nitrite: 'ניטריט',
    nitrate: 'ניטרט',
    gh: 'קשיות כללית',
    kh: 'קשיות פחמתית',
    // the same key means the weather here, not a pool filter
    'air-monitor-card': {
      pressure: 'לחץ אטמוספרי',
    },
  },
  time: {
    seconds: 'כרגע',
    minutes: 'לפני {minutes} דקה',
    hours: 'לפני {hours} שעה',
    days: 'לפני {days} יום',
  },
  time_plural: {
    seconds: 'כרגע',
    minutes: 'לפני {minutes} דקות',
    hours: 'לפני {hours} שעות',
    days: 'לפני {days} ימים',
  },
};

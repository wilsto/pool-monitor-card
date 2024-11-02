
var LitElement = LitElement || Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
var html = LitElement.prototype.html;
var css = LitElement.prototype.css;

const CARD_VERSION = '1.6.0';

// eslint-disable-next-line no-console
console.info(
  `%c POOL-MONITORING-CARD %c ${CARD_VERSION} `,
  'color: white; background: green; font-weight: 700;',
  'color: green; background: white; font-weight: 700;',
);

const translations = {
  'pt-br': {
    "state": {
      "1": "Muito Baixo",
      "2": "Aceitavel Baixo",
      "3": "Ideal",
      "4": "Ideal",
      "5": "AAceitavel Alto",
      "6": "Muito Alto"
    },
    "sensor": {
      "temperature": "Temperatura",
      "temperature_2": "Temperatura 2",
      "ph": "pH",
      "orp": "ORP",
      "tds": "TDS",
      "salinity": "Salinidade",
      "cya": "Acidp Cianuronico",
      "calcium": "Calcio",
      "phosphate": "fosfate",
      "alkalinity": "Alcalinidade",
      "free_chlorine": "Cloro Livre",
      "total_chlorine": "Cloro Total",
      "pressure": "Pressáo no  Filtro",
      "sg": "Gravidade específica"
    },
    "time": {
      "seconds": "Agora mesmo",
      "minutes": `{minuts} minutos{plural} atras`,
      "hours": `{hours} horas{plural} atras`,
      "days": `{days} Dias{plural} atras`
    }
  },
  'en': {
    "state": {
      "1": "Too Low",
      "2": "Acceptable Low",
      "3": "Ideal",
      "4": "Ideal",
      "5": "Acceptable High",
      "6": "Too High"
    },
    "sensor": {
      "temperature": "Temperature",
      "temperature_2": "Temperature 2",
      "ph": "pH",
      "orp": "ORP",
      "tds": "TDS",
      "salinity": "Salinity",
      "cya": "Cyanuric Acid",
      "calcium": "Calcium",
      "phosphate": "Phosphate",
      "alkalinity": "Alkalinity",
      "free_chlorine": "Free Chlorine",
      "total_chlorine": "Total Chlorine",
      "pressure": "filtro de presion",
      "sg": "Specific Gravity"
    },
    "time": {
      "seconds": "just now",
      "minutes": `{minutes} minute{plural} ago`,
      "hours": `{hours} hour{plural} ago`,
      "days": `{days} day{plural} ago`
    }
   },
    'de': {
    "state": {
      "1": "Zu niedrig",
      "2": "Akzeptabler Tiefstwert",
      "3": "Ideal",
      "4": "Ideal",
      "5": "Akzeptabler Hochwert",
      "6": "Zu hoch"
    },
    "sensor": {
      "temperature": "Temperatur",
      "temperature_2": "Temperatur 2",
      "ph": "pH",
      "orp": "ORP",
      "tds": "TDS",
      "salinity": "Salzgehalt",
      "cya": "Cyanursäure",
      "calcium": "Kalzium",
      "phosphate": "Phosphat",
      "alkalinity": "Alkalinität",
      "free_chlorine": "Freies Chlor",
      "total_chlorine": "Gesamtchlor",
      "pressure": "Sandfilterdruck"
    },
    "time": {
      "seconds": "gerade erst",
      "minutes": `{minutes} minute{plural} ago`,
      "hours": `{hours} hour{plural} ago`,
      "days": `{days} day{plural} ago`
    }
  },
  'ro': {
    "state": {
      "1": "Prea mic",
      "2": "Mic",
      "3": "Ideal",
      "4": "Ideal",
      "5": "Mare",
      "6": "Prea mare"
    },
    "sensor": {
      "temperatură": "Temperatură",
      "temperatură_2": "Temperatură 2",
      "ph": "pH",
      "orp": "ORP",
      "tds": "TDS",
      "salinity": "Salinitate",
      "cya": "Acid cianuric",
      "calcium": "Calciu",
      "phosphate": "Fosfat",
      "alkalinity": "Alcalinitate",
      "free_chlorine": "Clor liber",
      "total_chlorine": "Clor total",
      "pressure": "Presiune filtru"
    },
    "time": {
      "seconds": "acum",
      "minutes": `acum {minutes} minut{plural}`,
      "hours": `acum {hours} oră{plural}`,
      "days": `acum {days} zi{plural}`
    }
  },
  'sk': {
    "state": {
      "1": "Príliš nízky",
      "2": "Akceptovateľne nízky",
      "3": "Ideálny",
      "4": "Ideálny",
      "5": "Akceptovateľne vysoký",
      "6": "Príliš vysoký"
    },
    "sensor": {
      "temperature": "Teplota",
      "temperature_2": "Templota 2",
      "ph": "pH",
      "orp": "ORP",
      "tds": "TDS",
      "salinity": "Salinita",
      "cya": "Kyselina kyanurová",
      "calcium": "Vápnik",
      "phosphate": "Fosfát",
      "alkalinity": "Alkalinita",
      "free_chlorine": "Voľný chlór",
      "total_chlorine": "Celkový chlór",
      "pressure": "Tlak filtra"
    },
    "time": {
      "seconds": "práve teraz",
      "minutes": `{minutes} minút{plural} pred`,
      "hours": `{hours} hodín{plural} pred`,
      "days": `{days} dní {plural} pred`
    }
  },  
  'fr': {
    "state": {
      "1": "Trop bas",
      "2": "Acceptable bas",
      "3": "Idéal",
      "4": "Idéal",
      "5": "Acceptable élevé",
      "6": "Trop élevé"
    },
    "sensor": {
      "temperature": "Température",
      "temperature_2": "Température 2",
      "ph": "pH",
      "orp": "ORP",
      "tds": "TDS",
      "salinity": "Salinité",
      "cya": "Acide cyanurique",
      "calcium": "Calcium",
      "phosphate": "Phosphate",
      "alkalinity": "Alcalinité",
      "free_chlorine": "Chlore libre",
      "total_chlorine": "Chlore total",
      "pressure": "Pression du filtre",
      "sg": "specific gravities"
    },
    "time": {
      "seconds": "il y a {seconds} seconde{plural}",
      "minutes": `il y a {minutes} minute{plural}`,
      "hours": `il y a {hours} heure{plural}`,
      "days": `il y a {days} jour{plural}`
    }
  },
  'pt': {
    "state": {
      "1": "Muito Baixo",
      "2": "Torelavel mas Baixo",
      "3": "Ideal",
      "4": "Ideal",
      "5": "Toleravel mas Alto",
      "6": "Muito Alto"
    },
    "sensor": {
      "temperature": "Temperatura",
      "temperature_2": "Temperatura 2",
      "ph": "pH",
      "orp": "ORP",
      "tds": "TDS",
      "salinity": "Salinidade",
      "cya": "ácido cianúrico",
      "calcium": "Calcio",
      "phosphate": "Fosfato",
      "alkalinity": "Alcalinidade",
      "free_chlorine": "Cloro livres",
      "total_chlorine": "Cloro total",
      "pressure": "Pressão do filtro"
    },
    "time": {
      "seconds": "Agora",
      "minutes": `{minutes} Muntos{plural} atrás`,
      "hours": `{hours} horas{plural} atrás`,
      "days": `{days} dias{plural} atrás`
    }
  },  
  'es': {
    "state": {
      "1": "Demasiado bajo",
      "2": "Aceptable bajo",
      "3": "Perfecto",
      "4": "Perfecto",
      "5": "Aceptable alto",
      "6": "Demasiado alto"
    },
    "sensor": {
      "temperature": "Temperatura",
      "temperature_2": "Temperatura 2",
      "ph": "pH",
      "orp": "ORP",
      "tds": "TDS",
      "salinity": "Salinidad",
      "cya": "Acido cianúrico",
      "calcium": "Calcio",
      "phosphate": "Fosfato",
      "alkalinity": "Alcalinidad",
      "free_chlorine": "Cloro libre",
      "total_chlorine": "Cloro total",
      "pressure": " pressione du filter relativa",
      "sg": " densidad relativa"
    },
    "time": {
      "seconds": "justo ahora",
      "minutes": "hace {minutes} minuto{plural}",
      "hours": "hace {hours} hora{plural}",
      "days": "hace {days} día{plural}"
    }
  },
  'de': {
    "state": {
      "1": "zu niedrig",
      "2": "akzeptabel niedrig",
      "3": "ideal",
      "4": "ideal",
      "5": "akzeptabel hoch",
      "6": "zu hoch"
    },
    "sensor": {
      "temperature": "Temperatur",
      "temperature_2": "Temperatur 2",
      "ph": "pH",
      "orp": "Redox",
      "tds": "TDS",
      "salinity": "Salzgehalt",
      "cya": "Cyanursäure",
      "calcium": "Calcium",
      "phosphate": "Phosphat",
      "alkalinity": "Alkalinität",
      "free_chlorine": "freies Chlor",
      "total_chlorine": "Gesamtchlor",
      "pressure": "Filterdruck"
    },
    "time": {
      "seconds": "jetzt",
      "minutes": `vor {minutes} Minute{plural}`,
      "hours": `vor {hours} Stunde{plural}`,
      "days": `vor {days} Tage{plural}`
    }
}

class PoolMonitorCard extends LitElement {
  static cardType = 'pool-monitor-card'
  static cardName = 'Pool Monitor Card'
  static cardDescription = 'The "Pool Monitor Card" is a home assistant plugin that provides information about the temperature, pH, and ORP levels of your swimming pool'

  static get properties() {
    return {
      hass: {},
      config: {}
    };
  }

  static styles = [
    css`
  :host {
    background: var(--ha-card-background, var(--card-background-color, white));
    border-radius: var(--ha-card-border-radius, 12px);
    border-width: var(--ha-card-border-width,4px);
    box-shadow: var(
      --ha-card-box-shadow
    );
    color: var(--primary-text-color);
    display: block;
    transition: all 0.3s ease-out 0s;
    position: relative;
    padding-top: 25px;
  }

  .section{
    padding-bottom:10px;
  }

  .pool-monitor-title{
    font-size: 1.5rem;
    font-weight: 500;
    padding-left: 15px;
    padding-bottom: 15px;
    margin: 0;
  }
  
  .pool-monitor-entity-img {
    text-align:right;
    width:10%;
    float:left;
  }
  .pool-monitor-container {
    display: grid;
    grid-template-columns: 10% repeat(6, 1fr) 5%;
    padding: 5px;
  }

  .pool-monitor-container-values {
    display: grid;
    grid-template-columns:12% repeat(6, 1fr) 2% ;
    padding: 5px;
  }

  .pool-monitor-container-marker {
    display: grid;
    grid-template-columns: 10% repeat(6, 1fr) 5%;
    padding: 10px;
    grid-template-rows:15px;
    line-height: 15px;
    position: relative;
  }

  .pool-monitor-container-marker .marker {
    text-align: center;
    justify-self: center;
    width: 40px;
    height:20px;
    padding-top:5px;
    border-radius: 5px;
    position: absolute;
    z-index: 1;
  }
  
  .pool-monitor-container-marker .marker-state {
    width: 60px;
    position: absolute;
    z-index: 1;
  }

  .pool-monitor-container-marker .triangle {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    position: absolute;
    bottom: 0px;
    transform: translateX(-50%);
  }

  .grid-item {
    padding-top: 150%;
    padding-bottom: 20%;
    padding: 0;
  }

  .grid-item-text-box {
    font-size: 0.8em;
    text-align: center;
    font-weight: 700;
  }
  
  .item-row {
    grid-row: 1;
  }

  .cursor{
    text-align: center;
    justify-self: center;
    font-size:20px;
    font-weight: 900;
    color: black;
    position: absolute;
    z-index: 1;
  }
  .cursor-text{
    width: 150px;
    height: 22px;
    padding-left: 3px;
    padding-right: 3px;
    padding-top:2px;
    font-size: 12px;
    font-weight: 700;
    text-align: right;
    color: black;
    justify-self: right;
    position: absolute;
    z-index: 1;
  }
  
`
  ];

  constructor() {
    super();
  }
  render() {
    const config = this.getConfig()
    const data = this.processData()
    if (config.compact) {
      return html`
      <div id="pool-monitor-card">
        ${cardContent.generateTitle(config)}
   


        ${data.temperature !== undefined ? cardContent.generateCompactBody(config,data.temperature): ''}
        ${data.temperature_2 !== undefined ? cardContent.generateCompactBody(config,data.temperature_2): ''}
        ${data.ph !== undefined ? cardContent.generateCompactBody(config,data.ph): ''}
        ${data.orp !== undefined ? cardContent.generateCompactBody(config,data.orp): ''}
        ${data.tds !== undefined ? cardContent.generateCompactBody(config,data.tds): ''}      
        ${data.salinity !== undefined ? cardContent.generateCompactBody(config,data.salinity): ''}      
        ${data.cya !== undefined ? cardContent.generateCompactBody(config,data.cya): ''}      
        ${data.calcium !== undefined ? cardContent.generateCompactBody(config,data.calcium): ''}      
        ${data.phosphate !== undefined ? cardContent.generateCompactBody(config,data.phosphate): ''}      
        ${data.alkalinity !== undefined ? cardContent.generateCompactBody(config,data.alkalinity): ''}      
        ${data.free_chlorine !== undefined ? cardContent.generateCompactBody(config,data.free_chlorine): ''}      
        ${data.total_chlorine !== undefined ? cardContent.generateCompactBody(config,data.total_chlorine): ''}      
        ${data.pressure !== undefined ? cardContent.generateCompactBody(config,data.pressure): ''}      
        ${data.sg !== undefined ? cardContent.generateCompactBody(config,data.sg): ''}      
      </div>`;
    } else {
      return html`
      <div id="pool-monitor-card">
        ${cardContent.generateTitle(config)}

        ${data.temperature !== undefined ? cardContent.generateBody(config,data.temperature): ''}
        ${data.temperature_2 !== undefined ? cardContent.generateBody(config,data.temperature_2): ''}
        ${data.ph !== undefined ? cardContent.generateBody(config,data.ph): ''}
        ${data.orp !== undefined ? cardContent.generateBody(config,data.orp): ''}
        ${data.tds !== undefined ? cardContent.generateBody(config,data.tds): ''}      
        ${data.salinity !== undefined ? cardContent.generateBody(config,data.salinity): ''}      
        ${data.cya !== undefined ? cardContent.generateBody(config,data.cya): ''}      
        ${data.calcium !== undefined ? cardContent.generateBody(config,data.calcium): ''}      
        ${data.phosphate !== undefined ? cardContent.generateBody(config,data.phosphate): ''}      
        ${data.alkalinity !== undefined ? cardContent.generateBody(config,data.alkalinity): ''}      
        ${data.free_chlorine !== undefined ? cardContent.generateBody(config,data.free_chlorine): ''}      
        ${data.total_chlorine !== undefined ? cardContent.generateBody(config,data.total_chlorine): ''}      
        ${data.pressure !== undefined ? cardContent.generateBody(config,data.pressure): ''}      
        ${data.sg !== undefined ? cardContent.generateBody(config,data.sg): ''}   
      </div>`;
    }

  }

  getConfig () {
    const config = {};

    config.title = this.config.title ;
    config.compact = this.config.compact ?? false;
    config.show_names = this.config.show_names ?? true;
    config.show_labels = this.config.show_labels ?? true;
    config.language = this.config.language ?? 'en';

    config.normal_color = this.config.normal_color ?? "#00b894";
    config.low_color = this.config.low_color ?? "#fdcb6e";
    config.warn_color = this.config.warn_color ?? "#e17055";
    config.marker_color = this.config.marker_color ?? "rgba(0, 0, 0, 1)";
    config.hi_low_color = this.config.hi_low_color ?? "rgba(0, 0, 0, .6)";

    config.override = this.config.override ?? false;

    config.temperature = this.config.temperature ;
    config.temperature_min = this.config.temperature_min ;
    config.temperature_max = this.config.temperature_max ;
    config.temperature = this.config.temperature ;
    config.temperature_name = this.config.temperature_name ?? translations[config.language]["sensor"]["temperature"];
    config.temperature_unit = this.config.temperature_unit ?? "°C";
    config.temperature_unit = config.temperature_unit.toUpperCase()
    config.temperature_setpoint = this.config.temperature_setpoint ?? (config.temperature_unit === "°F" ? 80 : 27) ;
    config.temperature_step = this.config.temperature_step ?? (config.temperature_unit === "°F" ? 2 : 1) ;
    config.temperature_override = config.temperature_unit === "°F" ? 79 : 26.5;

    config.temperature_2 = this.config.temperature_2 ;
    config.temperature_2_min = this.config.temperature_2_min ;
    config.temperature_2_max = this.config.temperature_2_max ;
    config.temperature_2_name = this.config.temperature_2_name ?? translations[config.language]["sensor"]["temperature_2"];
    config.temperature_2_unit = this.config.temperature_2_unit ?? "°C";
    config.temperature_2_unit = config.temperature_2_unit.toUpperCase()
    config.temperature_2_setpoint = this.config.temperature_2_setpoint ?? (config.temperature_2_unit === "°F" ? 80 : 27) ;
    config.temperature_2_step = this.config.temperature_2_step ?? (config.temperature_2_unit === "°F" ? 2 : 1) ;
    config.temperature_2_override = config.temperature_2_unit === "°F" ? 92 : 28.5;

    config.ph = this.config.ph;
    config.ph_min = this.config.ph_min;
    config.ph_max = this.config.ph_max;
    config.ph_name = this.config.ph_name ?? translations[config.language]["sensor"]["ph"];
    config.ph_unit = this.config.ph_unit ?? "pH";
    config.ph_setpoint = this.config.ph_setpoint ?? 7.2;
    config.ph_step = this.config.ph_step ?? 0.2 ;
    config.ph_override = 7.5;
    
    config.orp = this.config.orp ;
    config.orp_min = this.config.orp_min ;
    config.orp_max = this.config.orp_max ;
    config.orp_name = this.config.orp_name ?? translations[config.language]["sensor"]["orp"];
    config.orp_unit = this.config.orp_unit ?? "mV";
    config.orp_setpoint = this.config.orp_setpoint ?? 700;
    config.orp_step = this.config.orp_step ?? 50 ;
    config.orp_override = 551;

    config.tds = this.config.tds ;
    config.tds_min = this.config.tds_min ;
    config.tds_max = this.config.tds_max ;
    config.tds_name = this.config.tds_name ?? translations[config.language]["sensor"]["tds"];
    config.tds_unit = this.config.tds_unit ?? "g/L";
    config.tds_unit = config.tds_unit.toLowerCase()
    config.tds_setpoint = this.config.tds_setpoint ?? (config.tds_unit === "ppm" ? 4000 : 4) ;
    config.tds_step = this.config.tds_step ?? (config.tds_unit === "ppm" ? 1000 : 1) ;
    config.tds_override = config.tds_unit === "ppm" ? 7000 : 7;

    config.salinity = this.config.salinity ;
    config.salinity_min = this.config.salinity_min ;
    config.salinity_max = this.config.salinity_max ;
    config.salinity_name = this.config.salinity_name ?? translations[config.language]["sensor"]["salinity"];
    config.salinity_unit = this.config.salinity_unit ?? "ppm";
    config.salinity_setpoint = this.config.salinity_setpoint ?? (config.salinity_unit === "ppm" ? 3000 : 4.5) ;
    config.salinity_step = this.config.salinity_step ?? (config.salinity_unit === "ppm" ? 500 : 0.5)  ;
    config.salinity_override = config.salinity_unit === "ppm" ? 2750 : 4;

    config.cya = this.config.cya ;
    config.cya_min = this.config.cya_min ;
    config.cya_max = this.config.cya_max ;
    config.cya_name = this.config.cya_name ?? translations[config.language]["sensor"]["cya"];
    config.cya_unit = this.config.cya_unit ?? "ppm";
    config.cya_setpoint = this.config.cya_setpoint ?? 40;
    config.cya_step = this.config.cya_step ?? 10 ;
    config.cya_override = 27;

    config.calcium = this.config.calcium ;
    config.calcium_min = this.config.calcium_min ;
    config.calcium_max = this.config.calcium_max ;
    config.calcium_name = this.config.calcium_name ?? translations[config.language]["sensor"]["calcium"];
    config.calcium_unit = this.config.calcium_unit ?? "ppm";
    config.calcium_setpoint = this.config.calcium_setpoint ?? 300;
    config.calcium_step = this.config.calcium_step ?? 100 ;
    config.calcium_override = 425;

    config.phosphate = this.config.phosphate ;
    config.phosphate_min = this.config.phosphate_min ;
    config.phosphate_max = this.config.phosphate_max ;
    config.phosphate_name = this.config.phosphate_name ?? translations[config.language]["sensor"]["phosphate"];
    config.phosphate_unit = this.config.phosphate_unit ?? "ppb";
    config.phosphate_setpoint = this.config.phosphate_setpoint ?? 100;
    config.phosphate_step = this.config.phosphate_step ?? 100 ;
    config.phosphate_override = 30;

    config.alkalinity = this.config.alkalinity ;
    config.alkalinity_min = this.config.alkalinity_min ;
    config.alkalinity_max = this.config.alkalinity_max ;
    config.alkalinity_name = this.config.alkalinity_name ?? translations[config.language]["sensor"]["alkalinity"];
    config.alkalinity_unit = this.config.alkalinity_unit ?? "ppm";
    config.alkalinity_setpoint = this.config.alkalinity_setpoint ?? 100;
    config.alkalinity_step = this.config.alkalinity_step ?? 20 ;
    config.alkalinity_override = 50;

    config.free_chlorine = this.config.free_chlorine ;
    config.free_chlorine_min = this.config.free_chlorine_min ;
    config.free_chlorine_max = this.config.free_chlorine_max ;
    config.free_chlorine_name = this.config.free_chlorine_name ?? translations[config.language]["sensor"]["free_chlorine"];
    config.free_chlorine_unit = this.config.free_chlorine_unit ?? "ppm";
    config.free_chlorine_setpoint = this.config.free_chlorine_setpoint ?? 2;
    config.free_chlorine_step = this.config.free_chlorine_step ?? 1 ;
    config.free_chlorine_override = 1.5;

    config.total_chlorine = this.config.total_chlorine ;
    config.total_chlorine_min = this.config.total_chlorine_min ;
    config.total_chlorine_max = this.config.total_chlorine_max ;
    config.total_chlorine_name = this.config.total_chlorine_name ?? translations[config.language]["sensor"]["total_chlorine"];
    config.total_chlorine_unit = this.config.total_chlorine_unit ?? "ppm";
    config.total_chlorine_setpoint = this.config.total_chlorine_setpoint ?? 3;
    config.total_chlorine_step = this.config.total_chlorine_step ?? 1 ;
    config.total_chlorine_override = 5.5;

    config.pressure = this.config.pressure ;
    config.pressure_min = this.config.pressure_min ;
    config.pressure_max = this.config.pressure_max ;
    config.pressure_name = this.config.pressure_name ?? translations[config.language]["sensor"]["pressure"];
    config.pressure_unit = this.config.pressure_unit ?? "psi";
    config.pressure_setpoint = this.config.pressure_setpoint ?? (config.pressure_unit === "bar" ? 1.5 : 23);
    config.pressure_step = this.config.pressure_step ?? (config.pressure_unit === "bar" ? 0.5 : 7);
    config.pressure_override = 32  ;

    config.sg = this.config.sg ;
    config.sg_name = this.config.sg_name ?? translations[config.language]["sensor"]["sg"];
    config.sg_unit = this.config.sg_unit ?? "";
    config.sg_setpoint = this.config.sg_setpoint ?? (config.sg_unit === "Ratio" ? 0.5 : 1.5);
    config.sg_step = this.config.sg_step ?? 0.001;
    config.sg_override = 1  ;


    return config;
  }

  processData () {    

    const data = {}
    const config = this.getConfig()

    if (config.temperature) {
      data.temperature = this.calculateData('temperature', config.temperature_name, config.temperature, config.temperature_min, config.temperature_max, config.temperature_setpoint, config.temperature_step,config.temperature_unit,  config.temperature_override, config.override) 
    }
    if (config.temperature_2) {
      data.temperature_2 = this.calculateData('temperature_2', config.temperature_2_name, config.temperature_2, config.temperature_2_min, config.temperature_2_max, config.temperature_2_setpoint, config.temperature_2_step,config.temperature_2_unit,  config.temperature_2_override, config.override) 
    }
    if (config.ph) {
      data.ph = this.calculateData('ph', config.ph_name, config.ph, config.ph_min, config.ph_max, config.ph_setpoint,config.ph_step,config.ph_unit,config.ph_override, config.override) 
    }
    if (config.orp) {
      data.orp = this.calculateData('orp', config.orp_name, config.orp, config.orp_min, config.orp_max, config.orp_setpoint,config.orp_step ,config.orp_unit, config.orp_override, config.override) 
    }
    if (config.tds) {
      data.tds = this.calculateData('tds', config.tds_name, config.tds, config.tds_min, config.tds_max, config.tds_setpoint,config.tds_step, config.tds_unit, config.tds_override, config.override) 
    }
    if (config.salinity) {
      data.salinity = this.calculateData('salinity', config.salinity_name, config.salinity, config.salinity_min, config.salinity_max, config.salinity_setpoint,config.salinity_step, config.salinity_unit, config.salinity_override, config.override) 
    }
    if (config.cya) {
      data.cya = this.calculateData('cya', config.cya_name, config.cya_min, config.cya_max, config.cya, config.cya_setpoint,config.cya_step, config.cya_unit, config.cya_override, config.override) 
    }
    if (config.calcium) {
      data.calcium = this.calculateData('calcium', config.calcium_name, config.calcium, config.calcium_min, config.calcium_max, config.calcium_setpoint,config.calcium_step, config.calcium_unit, config.calcium_override, config.override) 
    }
    if (config.phosphate) {
      data.phosphate = this.calculateData('phosphate', config.phosphate_name, config.phosphate, config.phosphate_min, config.phosphate_max, config.phosphate_setpoint,config.phosphate_step, config.phosphate_unit, config.phosphate_override, config.override) 
    }
    if (config.alkalinity) {
      data.alkalinity = this.calculateData('alkalinity', config.alkalinity_name, config.alkalinity, config.alkalinity_min, config.alkalinity_max, config.alkalinity_setpoint,config.alkalinity_step, config.alkalinity_unit, config.alkalinity_override, config.override) 
    }    
    if (config.free_chlorine) {
      data.free_chlorine = this.calculateData('free_chlorine', config.free_chlorine_name, config.free_chlorine, config.free_chlorine_min, config.free_chlorine_max, config.free_chlorine_setpoint,config.free_chlorine_step, config.free_chlorine_unit, config.free_chlorine_override, config.override) 
    }    
    if (config.total_chlorine) {
      data.total_chlorine = this.calculateData('total_chlorine', config.total_chlorine_name, config.total_chlorine, config.total_chlorine_min, config.total_chlorine_max, config.total_chlorine_setpoint,config.total_chlorine_step, config.total_chlorine_unit, config.total_chlorine_override, config.override) 
    }    
    if (config.pressure) {
      data.pressure = this.calculateData('pressure', config.pressure_name, config.pressure, config.pressure_min, config.pressure_max, config.pressure_setpoint,config.pressure_step, config.pressure_unit, config.pressure_override, config.override) 
    }    
    if (config.sg) {
      data.sg = this.calculateData('sg', config.sg_name, config.sg, config.sg_setpoint,config.sg_step, config.sg_unit, config.sg_override, config.override) 
    }    
    return data
  }

  calculateData(name, title, entity, entity_min, entity_max, setpoint, setpoint_step, unit, override_value, override) {
    const newData = {};
    const config = this.getConfig()

    newData.name = name;
    newData.title = config.show_names ? title : html`&nbsp;`;
    newData.img_src ="https://raw.githubusercontent.com/wilsto/pool-monitor-card/master/resources/"+ name +".png"
    newData.value = parseFloat(this.hass.states[entity].state);
    newData.entity = entity;
    newData.last_updated = this.timeFromNow(this.hass.states[entity].last_updated, config.language);

    newData.unit = unit;
    if (override){
      newData.value = override_value;
    }

    newData.min_value = entity_min !== undefined ? parseFloat(this.hass.states[entity_min].state):newData.value;
    newData.max_value = entity_max !== undefined ? parseFloat(this.hass.states[entity_max].state):newData.value;

    newData.setpoint = setpoint ;
    const countDecimals = this.countDecimals(setpoint);
    if (newData.value) {
      newData.value = (newData.value < 10 ? newData.value.toFixed(2): newData.value < 100 ? newData.value.toFixed(1): newData.value.toFixed(0))
      }
    if (newData.min_value) {
      newData.min_value = (newData.min_value < 10 ? newData.min_value.toFixed(2): newData.min_value < 100 ? newData.min_value.toFixed(1): newData.min_value.toFixed(0))
    }
    if (newData.max_value) {
      newData.max_value = (newData.max_value < 10 ? newData.max_value.toFixed(2): newData.max_value < 100 ? newData.max_value.toFixed(1): newData.max_value.toFixed(0))
    }
    newData.setpoint_class = [
      (setpoint - 2 *setpoint_step).toFixed(countDecimals),
      (setpoint - setpoint_step).toFixed(countDecimals),
      (setpoint).toFixed(countDecimals),
      (setpoint + setpoint_step).toFixed(countDecimals),
      (setpoint + 2 *setpoint_step).toFixed(countDecimals)
    ]

    newData.separator = config.show_labels ? "-":"";
    newData.color = "transparent";
    if (Number(newData.value)  < Number(newData.setpoint_class[0])) {
      newData.state = config.show_labels ? translations[config.language]["state"][1]:"";
      newData.color = config.warn_color;
    } else if (Number(newData.value)  >= Number(newData.setpoint_class[0]) && Number(newData.value)  < Number(newData.setpoint_class[1])) {
      newData.state = config.show_labels ? translations[config.language]["state"][2]:"";
      newData.color = config.low_color;
    } else if (Number(newData.value)  >= Number(newData.setpoint_class[1]) && Number(newData.value)  < Number(newData.setpoint_class[2])) {
      newData.state = config.show_labels ? translations[config.language]["state"][3]:"";
      newData.color = config.normal_color;
    } else if (Number(newData.value)  >= Number(newData.setpoint_class[2]) && Number(newData.value)  < Number(newData.setpoint_class[3])) {
      newData.state = config.show_labels ? translations[config.language]["state"][4]:"";
      newData.color = config.normal_color;
    } else if (Number(newData.value)  >= Number(newData.setpoint_class[3]) && Number(newData.value)  < Number(newData.setpoint_class[4])) {
      newData.state = config.show_labels ? translations[config.language]["state"][5]:"";
      newData.color = config.low_color;
    } else if (Number(newData.value)  >= Number(newData.setpoint_class[4])) {
      newData.state = config.show_labels ? translations[config.language]["state"][6]:"";
      newData.color = config.warn_color;
    }

    newData.pct = Math.max(0, Math.min(95, (Math.max(0, newData.value - (setpoint - 3 *setpoint_step)) / (6 * setpoint_step)) * 0.73 * 100 + 22)).toFixed(0);
    newData.pct_min = Math.max(0, Math.min(95, (Math.max(0, newData.min_value - (setpoint - 3 *setpoint_step)) / (6 * setpoint_step)) * 0.73 * 100 + 22)).toFixed(0);
    newData.pct_max = Math.max(0, Math.min(95, (Math.max(0, newData.max_value - (setpoint - 3 *setpoint_step)) / (6 * setpoint_step)) * 0.73 * 100 + 22)).toFixed(0);
    newData.side_align = newData.value > setpoint ? "right" : "left" ;
    newData.pct_cursor = newData.value > setpoint ? 100 - parseFloat(newData.pct) : parseFloat(newData.pct) -2;
    newData.pct_state_step = newData.value > setpoint ? 100 - parseFloat(newData.pct): parseFloat(newData.pct);
    newData.pct_min = newData.value > setpoint ? 100 - parseFloat(newData.pct_min) : parseFloat(newData.pct_min) -2;
    newData.pct_max = newData.value > setpoint ? 100 - parseFloat(newData.pct_max) : parseFloat(newData.pct_max) -2;
    return newData
  }

  countDecimals(number) {
    if (Math.floor(number) === number) { // si c'est un nombre entier
      return 0;
    }
    return number.toString().split(".")[1].length || 0;
  }

  timeFromNow(dateTime, language) {
    const date = new Date(dateTime);
    const diff = Date.now() - date.getTime();
  
    const t = (key, n) => {
      let plural = n == 1 ? '' : 's'
      let translation = translations[language]["time"][key] ;
      translation = translation.replace('{'+ key + '}', n) 
      translation = translation.replace('{plural}', plural) 
      return translation ;

    };

    if (diff < 60 * 1000) {
      const seconds = Math.floor(diff / (1000));
      return t('seconds', seconds);;
    } else if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return t('minutes', minutes);
    } else if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return t('hours', hours);;
    } else {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return t('days', days);;
    }
  }


  setConfig(config) {
    if (!config.temperature && !config.ph && !config.orp && !config.tds && !config.salinity && !config.cya && !config.calcium && !config.phosphate && !config.alkalinity && !config.free_chlorine && !config.total_chlorine && !config.pressure && !config.sg) {
      throw new Error("You need to define entities");
    }
    this.config =  { ...config };
  }

  static _moreinfo(entityinfo) {
    const popupEvent = new Event("hass-more-info", {
      bubbles: true,
      cancelable: false,
      composed: true,
    });
    popupEvent.detail = { entityId: entityinfo };
    document.querySelector("home-assistant").dispatchEvent(popupEvent);
  }
}

class cardContent {

  static generateTitle (config) {
      const title = config.title !== undefined ? html`
        <h1 class="pool-monitor-title">${config.title}</h1>
      ` : html``
  
      return html`
      ${title}
      `
    }

    static generateBody (config,data) {
      return html`
      <!-- ##### ${data.name} section ##### -->    
      <div class="section" @click=${() => 
          PoolMonitorCard._moreinfo(data.entity)}>   

        <div class="pool-monitor-container-marker" >
          <div class="marker" style="background-color: ${data.color} ;color: black;left: ${data.pct-5}%;">${data.value}</div>
          <div class="marker-state" style="padding-${data.side_align}:40px;text-align:${data.side_align};background-color:transparent ;${data.side_align}: ${data.pct_state_step}%;">${data.state}</div>
          <div class="triangle" style="border-top: 10px solid ${data.color} ;left: ${data.pct-1}%;"></div>
        </div>
        <div class="pool-monitor-entity-img"><img src="${data.img_src}"></div>
        <div class="pool-monitor-container">
          <div style="background-color: transparent; grid-column: 1 ; border: 0px; box-shadow:none" class="grid-item item-row"> <div style="font-size: 0.8em;color:lightgrey;text-align:left;margin:3px 2px 0 0 ">${data.unit}</div></div>
          <div style="background-color: ${config.warn_color}; grid-column: 2 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> </div>
          <div style="background-color: ${config.low_color}; grid-column: 3 ;" class="grid-item item-row"></div>
          <div style="background-color: ${config.normal_color}; grid-column: 4 ;" class="grid-item item-row"></div>  
          <div style="background-color: ${config.normal_color}; grid-column: 5 ;" class="grid-item item-row"></div>  
          <div style="background-color: ${config.low_color}; grid-column: 6 ;" class="grid-item item-row"></div>
          <div style="background-color: ${config.warn_color}; grid-column: 7 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
          ${data.pct_min !== data.pct_cursor ? html`<div class="cursor-text" style="border-${data.side_align}: 5px solid ${config.hi_low_color}; text-align:${data.side_align};background-color:transparent ;${data.side_align}: ${data.pct_min}%;"></div>` : ''}
          ${data.pct_max !== data.pct_cursor ? html`<div class="cursor-text" style="border-${data.side_align}: 5px solid ${config.hi_low_color}; text-align:${data.side_align};background-color:transparent ;${data.side_align}: ${data.pct_max}%;"></div>` : ''}
        </div>
        <div class="pool-monitor-container-values">
          <div style="background-color: transparent; grid-column: 2 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[0]}</div></div>
          <div style="background-color: transparent; grid-column: 3 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[1]}</div></div>
          <div style="background-color: transparent; grid-column: 4 ;" class="grid-item item-row"><div style="font-size: 0.8em;color:${config.normal_color};text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[2]}</div></div>  
          <div style="background-color: transparent; grid-column: 5 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[3]}</div></div>  
          <div style="background-color: transparent; grid-column: 6 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[4]}</div></div>
          <div style="background-color: transparent; grid-column: 7 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
        </div> 
      </div> 
      <div style="position: relative;top:-25px;margin-bottom:-25px;text-align:left;left:15px;">${data.title}<br/><small style="position: relative;top:-5px;font-size:9px;color:lightgrey">${data.last_updated}</small></div>

      `
    }

    static generateCompactBody (config,data) {    
      return html`
      <!-- ##### ${data.name} section ##### -->    
      <div class="section-compact"  @click=${() => 
          PoolMonitorCard._moreinfo(data.entity)}>   
        <div class="pool-monitor-entity-img"><img src="${data.img_src}"></div>
        <div class="pool-monitor-container">
          <div style="background-color: transparent; grid-column: 1 ; border: 0px; box-shadow:none" class="grid-item item-row"> <div style="font-size: 0.8em;color:lightgrey;text-align:left;margin:3px 2px 0 0 ">${data.unit}</div></div>
          <div style="background-color: ${config.warn_color}; grid-column: 2 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> </div>
          <div style="background-color: ${config.low_color}; grid-column: 3 ;" class="grid-item item-row"></div>
          <div style="background-color: ${config.normal_color}; grid-column: 4 ;" class="grid-item item-row"></div>  
          ${data.pct_min !== data.pct_cursor ? html`<div class="cursor-text" style="border-${data.side_align}: 5px solid ${config.hi_low_color}; text-align:${data.side_align};background-color:transparent ;${data.side_align}: ${data.pct_min}%;"></div>` : ''}
          ${data.pct_max !== data.pct_cursor ? html`<div class="cursor-text" style="border-${data.side_align}: 5px solid ${config.hi_low_color}; text-align:${data.side_align};background-color:transparent ;${data.side_align}: ${data.pct_max}%;"></div>` : ''}
          <div class="cursor-text" style="border-${data.side_align}: 5px solid ${config.marker_color}; text-align:${data.side_align};background-color:transparent ;${data.side_align}: ${data.pct_cursor}%;">${data.value} ${data.separator} ${data.state}</div>
          <div style="background-color: ${config.normal_color}; grid-column: 5 ;" class="grid-item item-row"></div>  
          <div style="background-color: ${config.low_color}; grid-column: 6 ;" class="grid-item item-row"></div>
          <div style="background-color: ${config.warn_color}; grid-column: 7 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
        </div>
        <div class="pool-monitor-container-values">
          <div style="background-color: transparent; grid-column: 2 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[0]}</div></div>
          <div style="background-color: transparent; grid-column: 3 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[1]}</div></div>
          <div style="background-color: transparent; grid-column: 4 ;" class="grid-item item-row"><div style="font-size: 0.8em;color:${config.normal_color};text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[2]}</div></div>  
          <div style="background-color: transparent; grid-column: 5 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[3]}</div></div>  
          <div style="background-color: transparent; grid-column: 6 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[4]}</div></div>
          <div style="background-color: transparent; grid-column: 7 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
        </div> 
      </div> 
          
      <div style="position: relative;margin-top:-30px;text-align:left;left:-30px;font-size:9px;padding-bottom: 5px;">${data.title}</div>

      `
    }    
}

customElements.define("pool-monitor-card", PoolMonitorCard);

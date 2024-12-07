var PoolMonitorCard=function(e){"use strict";const i={state:{1:"Too Low",2:"Acceptable Low",3:"Ideal",4:"Ideal",5:"Acceptable High",6:"Too High"},sensor:{temperature:"Temperature",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinity",cya:"Cyanuric Acid",calcium:"Calcium",phosphate:"Phosphate",alkalinity:"Alkalinity",free_chlorine:"Free Chlorine",total_chlorine:"Total Chlorine",pressure:"Filter Pressure",specific_gravity:"Specific Gravity",magnesium:"Magnesium",water_level:"Water Level",flow_rate:"Flow Rate",uv_radiation:"UV Radiation",product_volume:"Product Volume",product_weight:"Product Weight",ec:"Electrical Conductivity"},time:{seconds:"just now",minutes:"{minutes} minute ago",hours:"{hours} hour ago",days:"{days} day ago"},time_plural:{seconds:"just now",minutes:"{minutes} minutes ago",hours:"{hours} hours ago",days:"{days} days ago"}};const o={state:{1:"Trop bas",2:"Acceptable bas",3:"Idéal",4:"Idéal",5:"Acceptable élevé",6:"Trop élevé"},sensor:{temperature:"Température",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinité",cya:"Acide cyanurique",calcium:"Calcium",phosphate:"Phosphate",alkalinity:"Alcalinité",free_chlorine:"Chlore libre",total_chlorine:"Chlore total",pressure:"Pression du filtre",specific_gravity:"Densité spécifique",magnesium:"Magnésium",water_level:"Niveau d'eau",flow_rate:"Débit",uv_radiation:"Radiation UV",product_volume:"Volume Produit",product_weight:"Poids Produit",ec:"Conductivité Électrique"},time:{seconds:"à l'instant",minutes:"il y a {minutes} minute",hours:"il y a {hours} heure",days:"il y a {days} jour"},time_plural:{seconds:"à l'instant",minutes:"il y a {minutes} minutes",hours:"il y a {hours} heures",days:"il y a {days} jours"}};const a={state:{1:"Demasiado bajo",2:"Aceptable bajo",3:"Perfecto",4:"Perfecto",5:"Aceptable alto",6:"Demasiado alto"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidad",cya:"Acido cianúrico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidad",free_chlorine:"Cloro libre",total_chlorine:"Cloro total",pressure:"Pressione du filter relativa",specific_gravity:"Densidad relativa",magnesium:"Magnesio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiación UV",product_volume:"Volumen Producto",product_weight:"Peso Producto",ec:"Conductividad Eléctrica"},time:{seconds:"justo ahora",minutes:"hace {minutes} minuto",hours:"hace {hours} hora",days:"hace {days} día"},time_plural:{seconds:"justo ahora",minutes:"hace {minutes} minutos",hours:"hace {hours} horas",days:"hace {days} días"}};const r={state:{1:"Zu niedrig",2:"Akzeptabler Tiefstwert",3:"Ideal",4:"Ideal",5:"Akzeptabler Hochwert",6:"Zu hoch"},sensor:{temperature:"Temperatur",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salzgehalt",cya:"Cyanursäure",calcium:"Kalzium",phosphate:"Phosphat",alkalinity:"Alkalinität",free_chlorine:"Freies Chlor",total_chlorine:"Gesamtchlor",pressure:"Sandfilterdruck",specific_gravity:"Spezifisches Gewicht",magnesium:"Magnesium",water_level:"Wasserstand",flow_rate:"Durchfluss",uv_radiation:"UV-Strahlung",product_volume:"Produktvolumen",product_weight:"Produktgewicht",ec:"Elektrische Leitfähigkeit"},time:{seconds:"gerade erst",minutes:"vor {minutes} Minute",hours:"vor {hours} Stunde",days:"vor {days} Tag"},time_plural:{seconds:"gerade erst",minutes:"vor {minutes} Minuten",hours:"vor {hours} Stunden",days:"vor {days} Tagen"}};const s={state:{1:"Troppo basso",2:"Accettabile basso",3:"Ideale",4:"Ideale",5:"Accettabile alto",6:"Troppo alto"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinità",cya:"Acido cianurico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinità",free_chlorine:"Cloro libero",total_chlorine:"Cloro totale",pressure:"Pressione filtro",specific_gravity:"Gravità specifica",magnesium:"Magnesio",water_level:"Livello dell'acqua",flow_rate:"Portata",uv_radiation:"Radiazione UV",product_volume:"Volume prodotto",product_weight:"Peso prodotto",ec:"Conducibilità Elettrica"},time:{seconds:"proprio ora",minutes:"{minutes} minuto fa",hours:"{hours} ora fa",days:"{days} giorno fa"},time_plural:{seconds:"proprio ora",minutes:"{minutes} minuti fa",hours:"{hours} ore fa",days:"{days} giorni fa"}};const n={state:{1:"Te laag",2:"Acceptabel laag",3:"Ideaal",4:"Ideaal",5:"Acceptabel hoog",6:"Te hoog"},sensor:{temperature:"Temperatuur",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Zoutgehalte",cya:"Cyanuurzuur",calcium:"Calcium",phosphate:"Fosfaat",alkalinity:"Alkaliteit",free_chlorine:"Vrij chloor",total_chlorine:"Totaal chloor",pressure:"Filterdruk",specific_gravity:"Soortelijk gewicht",magnesium:"Magnesium",water_level:"Waterniveau",flow_rate:"Debiet",uv_radiation:"UV-straling",product_volume:"Productvolume",product_weight:"Productgewicht",ec:"Elektrische Geleidbaarheid"},time:{seconds:"zojuist",minutes:"{minutes} minuut geleden",hours:"{hours} uur geleden",days:"{days} dag geleden"},time_plural:{seconds:"zojuist",minutes:"{minutes} minuten geleden",hours:"{hours} uur geleden",days:"{days} dagen geleden"}};const l={state:{1:"Muito Baixo",2:"Torelavel mas Baixo",3:"Ideal",4:"Ideal",5:"Toleravel mas Alto",6:"Muito Alto"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidade",cya:"Ácido cianúrico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidade",free_chlorine:"Cloro livres",total_chlorine:"Cloro total",pressure:"Pressão do filtro",specific_gravity:"Gravidade específica",magnesium:"Magnésio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiação UV",product_volume:"Volume Produto",product_weight:"Peso Produto",ec:"Condutividade Elétrica"},time:{seconds:"agora mesmo",minutes:"há {minutes} minuto",hours:"há {hours} hora",days:"há {days} dia"},time_plural:{seconds:"agora mesmo",minutes:"há {minutes} minutos",hours:"há {hours} horas",days:"há {days} dias"}};const c={state:{1:"Muito Baixo",2:"Aceitavel Baixo",3:"Ideal",4:"Ideal",5:"Aceitavel Alto",6:"Muito Alto"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidade",cya:"Acido Cianurico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidade",free_chlorine:"Cloro Livre",total_chlorine:"Cloro Total",pressure:"Pressão no Filtro",specific_gravity:"Gravidade específica",magnesium:"Magnésio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiação UV",product_volume:"Volume Produto",product_weight:"Peso Produto",ec:"Condutividade Elétrica"},time:{seconds:"agora mesmo",minutes:"há {minutes} minuto",hours:"há {hours} hora",days:"há {days} dia"},time_plural:{seconds:"agora mesmo",minutes:"há {minutes} minutos",hours:"há {hours} horas",days:"há {days} dias"}};const d={state:{1:"Prea mic",2:"Mic",3:"Ideal",4:"Ideal",5:"Mare",6:"Prea mare"},sensor:{temperature:"Temperatură",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinitate",cya:"Acid cianuric",calcium:"Calciu",phosphate:"Fosfat",alkalinity:"Alcalinitate",free_chlorine:"Clor liber",total_chlorine:"Clor total",pressure:"Presiune filtru",specific_gravity:"Greutate specifică",magnesium:"Magneziu",water_level:"Nivel apă",flow_rate:"Debit",uv_radiation:"Radiație UV",product_volume:"Volum produs",product_weight:"Greutate produs",ec:"Conductivitate Electrică"},time:{seconds:"chiar acum",minutes:"acum {minutes} minut",hours:"acum {hours} oră",days:"acum {days} zi"},time_plural:{seconds:"chiar acum",minutes:"acum {minutes} minute",hours:"acum {hours} ore",days:"acum {days} zile"}};const p={state:{1:"Príliš nízky",2:"Akceptovateľne nízky",3:"Ideálny",4:"Ideálny",5:"Akceptovateľne vysoký",6:"Príliš vysoký"},sensor:{temperature:"Teplota",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinita",cya:"Kyselina kyanurová",calcium:"Vápnik",phosphate:"Fosfát",alkalinity:"Alkalinita",free_chlorine:"Voľný chlór",total_chlorine:"Celkový chlór",pressure:"Tlak filtra",specific_gravity:"Špecifická hmotnosť",magnesium:"Magnézium",water_level:"Úroveň vody",flow_rate:"Prietok",uv_radiation:"UV žiarenie",product_volume:"Objem produktu",product_weight:"Hmotnosť produktu",ec:"Elektrická Vodivosť"},time:{seconds:"práve teraz",minutes:"pred {minutes} minútou",hours:"pred {hours} hodinou",days:"pred {days} dňom"},time_plural:{seconds:"práve teraz",minutes:"pred {minutes} minútami",hours:"pred {hours} hodinami",days:"pred {days} dňami"}};const u={state:{1:"נמוך מדי",2:"נמוך מאוד",3:"אידיאלי",4:"אידיאלי",5:"גבוה מאוד",6:"גבוה מדי"},sensor:{temperature:"טמפרטורה",ph:"PH",orp:"ORP",tds:"TDS",salinity:"מליחות",cya:"חומצה ציאנורית",calcium:"סידן",phosphate:"פוספט",alkalinity:"אלקליניות",free_chlorine:"כלור חופשי",total_chlorine:"כלור כולל",pressure:"לחץ מסנן",specific_gravity:"משקל סגולי",magnesium:"מגנזיום",water_level:"מפלס מים",flow_rate:"קצב זרימה",uv_radiation:"קרינת UV",product_volume:"נפח מוצר",product_weight:"משקל מוצר",ec:"מוליכות חשמלית"},time:{seconds:"כרגע",minutes:"לפני {minutes} דקה",hours:"לפני {hours} שעה",days:"לפני {days} יום"},time_plural:{seconds:"כרגע",minutes:"לפני {minutes} דקות",hours:"לפני {hours} שעות",days:"לפני {days} ימים"}};const m={state:{1:"Слишком низкий",2:"Приемлемо низкий",3:"Идеальный",4:"Идеальный",5:"Приемлемо высокий",6:"Слишком высокий"},sensor:{temperature:"Температура",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Соленость",cya:"Циануровая кислота",calcium:"Кальций",phosphate:"Фосфаты",alkalinity:"Щелочность",free_chlorine:"Свободный хлор",total_chlorine:"Общий хлор",pressure:"Давление фильтра",specific_gravity:"Удельный вес",magnesium:"Магний",water_level:"Уровень воды",flow_rate:"Расход воды",uv_radiation:"УФ-излучение",product_volume:"Объем продукта",product_weight:"Вес продукта",ec:"Электропроводность"},time:{seconds:"только что",minutes:"{minutes} минуту назад",hours:"{hours} час назад",days:"{days} день назад"},time_plural:{seconds:"только что",minutes:"{minutes} минут назад",hours:"{hours} часов назад",days:"{days} дней назад"}};const g={en:i,fr:o,es:a,de:r,it:s,nl:n,pt:l,"pt-br":c,ro:d,sk:p,he:u,ru:m};const getTranslation=(e,i)=>{const o=i.split(".");let a=g[e]||g.en;for(const e of o)if(a&&typeof a==="object")a=a[e];else return i;return a||i};const formatTranslation=(e,i)=>{if(!i)return e;return Object.entries(i).reduce(((e,[i,o])=>e.replace(`{${i}}`,o)),e)};const h={display:{compact:false,show_names:true,show_labels:true,show_last_updated:false,show_icons:true,show_units:true,gradient:true,language:"en"},colors:{low:"#fdcb6e",warn:"#e17055",normal:"#00b894",cool:"#00BFFF",marker:"#000000",hi_low:"#00000099"},sensors:{temperature:{name:"Temperature",unit:"°C",setpoint:27,step:1,mode:"heatflow"},orp:{name:"ORP",unit:"mV",setpoint:700,step:50,mode:"centric",min_limit:0},ec:{name:"Electrical Conductivity",unit:"µS/cm",setpoint:4e3,step:200,mode:"centric",min_limit:0},tds:{name:"TDS",unit:"g/L",setpoint:5,step:.5,mode:"centric",min_limit:0},ph:{name:"pH",unit:"pH",setpoint:7.2,step:.2,mode:"centric",min_limit:0},salinity:{name:"Salinity",unit:"ppm",setpoint:3e3,step:500,mode:"centric",min_limit:0},cya:{name:"Cyanuric Acid",unit:"ppm",setpoint:40,step:10,mode:"centric",min_limit:0},calcium:{name:"Calcium",unit:"ppm",setpoint:300,step:100,mode:"centric",min_limit:0},phosphate:{name:"Phosphate",unit:"ppb",setpoint:50,step:10,mode:"centric",min_limit:0},alkalinity:{name:"Alkalinity",unit:"ppm",setpoint:100,step:20,mode:"centric",min_limit:0},free_chlorine:{name:"Free Chlorine",unit:"ppm",setpoint:3,step:.5,mode:"centric",min_limit:0},total_chlorine:{name:"Total Chlorine",unit:"ppm",setpoint:3,step:.5,mode:"centric",min_limit:0},pressure:{name:"Filter Pressure",unit:"psi",setpoint:12,step:2,mode:"centric"},specific_gravity:{name:"Specific Gravity",unit:"sg",setpoint:1.1,step:.2,mode:"centric"},magnesium:{name:"Magnesium",unit:"ppm",setpoint:1200,step:100,mode:"centric",min_limit:0},water_level:{name:"Water Level",unit:"%",setpoint:100,step:10,mode:"centric",min_limit:0},flow_rate:{name:"Flow Rate",unit:"m³/h",setpoint:10,step:1,mode:"centric",min_limit:0},uv_radiation:{name:"UV Radiation",unit:"mW/cm²",setpoint:4,step:1,mode:"centric",min_limit:0},product_volume:{name:"Product Volume",unit:"L",setpoint:20,step:5,mode:"centric",min_limit:0},product_weight:{name:"Product Weight",unit:"kg",setpoint:25,step:5,mode:"centric",min_limit:0}}};function getSensorConfig(e){if(!v.includes(e))throw new Error(`Unsupported sensor type: ${e}`);return{...h.sensors[e]}}function getDisplayConfig(){return{...h.display}}function getColorConfig(){return{...h.colors}}const v=Object.keys(h.sensors);const y="2.1.0";const _="2024-12-07-07-59";const f=`${y} (${_})`;const x={cardType:"pool-monitor-card",cardName:"Pool Monitor Card",cardDescription:'The "Pool Monitor Card" is a home assistant plugin that provides information about the temperature, pH, and ORP levels of your swimming pool'};const w={title:"color: white; background: green; font-weight: 700;",version:"color: green; background: white; font-weight: 700;"};var b=b||Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));var $=b.prototype.css;const k=$`
  /** Host element styles */
  :host {
    background: var(--ha-card-background, var(--card-background-color, white));
    border-radius: var(--ha-card-border-radius, 12px);
    border-width: var(--ha-card-border-width, 4px);
    box-shadow: var(--ha-card-box-shadow);
    color: var(--primary-text-color);
    display: block;
    transition: all 0.3s ease-out 0s;
    position: relative;
    padding-top: 25px;
  }

  /** Section layouts */
  .section {
    padding-bottom: 10px;
    padding: 0px;
  }

  .section-compact {
    padding-bottom: 5px;
    padding: 0px;
  }

  /** Title styles */
  .pool-monitor-title {
    font-size: 1.5rem;
    font-weight: 500;
    padding-left: 15px;
    padding-bottom: 15px;
    margin: 0;
  }

  /** Entity image container */
  .pool-monitor-entity-img {
    text-align: right;
    width: 10%;
    float: left;
  }

  /** Main container layouts */
  .pool-monitor-container {
    display: grid;
    padding: 5px;
    height: 15px;
  }

  .pool-monitor-container-values {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    padding-top: 0px;
    padding-left: 20px;
    margin-top: -10px;
  }

  .pool-monitor-container-marker {
    display: grid;
    grid-template-columns: 10% repeat(6, 1fr) 5%;
    padding: 10px;
    grid-template-rows: 15px;
    line-height: 15px;
    position: relative;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    padding: 0;
    grid-template-rows: 15px;
    line-height: 15px;
    position: relative;
    margin: 0px;
  }

  .pool-monitor-container-marker .marker {
    text-align: center;
    justify-self: center;
    width: 80px;
    height: 20px;
    padding-top: 5px;
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
    padding: 7px 0;
    margin: 0;
  }

  .grid-item-text-box {
    font-size: 0.8em;
    text-align: center;
    font-weight: 700;
  }

  .item-row {
    grid-row: 1;
  }

  .cursor {
    text-align: center;
    justify-self: center;
    font-size: 13px;
    font-weight: 600;
    color: black;
    position: absolute;
    z-index: 1;
  }

  .cursor-text {
    position: absolute;
    width: 200px;
    height: 17px;
    padding-left: 3px;
    padding-right: 3px;
    padding-top: 0px;
    margin-top: -1px;
    font-size: 11px;
    font-weight: 500;
    text-align: right;
    color: black;
    justify-self: right;
    z-index: 1;
  }

  .progress-bar-child {
    height: 100%;
    width: 100%;
    border-radius: 5px;
  }

  .sensor-monitor-container {
    position: relative;
    height: 20px;
    margin: 0px 0px 0px 0px;
    border-radius: 5px;
    overflow: hidden;
  }

  .warning-message {
    background-color: var(--warning-color, rgba(255, 152, 0, 0.1));
    border-left: 4px solid var(--warning-color, #ff9800);
    border-radius: 4px;
    padding: 12px 16px;
    margin: 8px 0;
    color: var(--warning-text-color, var(--primary-text-color));
    font-size: 0.95em;
    line-height: 1.4;
    display: flex;
    align-items: center;
    animation: fadeIn 0.3s ease-in-out;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .warning-message ha-icon {
    color: var(--warning-color, #ff9800);
    margin-right: 12px;
    flex-shrink: 0;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;var T=T||Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));var C=T.prototype.html;class cardContent{static generateTitle(e){const i=e.title!==void 0?C` <h1 class="pool-monitor-title">${e.title}</h1> `:C``;return C`${i}`}static generateBody(e,i){if(!i)return C` <div class="warning-message">No sensor data available</div> `;return C`
      <!-- ##### ${i.name} section ##### -->
      <div class="section" @click=${()=>cardContent._moreinfo(i.entity)}>
        <div class="pool-monitor-container-marker">
          <div
            class="marker"
            style="background-color: ${i.color} ;color: black;left: ${i.pct_marker}%;"
          >
            ${i.value} ${i.unit}
          </div>
          <div
            class="marker-state"
            style="font-size: 0.8em; padding-top: 5px;color:${i.color};width: 200px;padding-${i.side_align}:40px;text-align:${i.side_align};background-color:transparent ;${i.side_align}: ${i.pct_state_step}%;"
          >
            ${i.state}
          </div>
          <div
            class="triangle"
            style="border-top: 10px solid ${i.color} ;left: ${i.pct-1}%;"
          ></div>
        </div>
        ${!i.hide_icon?C`
              <div class="pool-monitor-entity-img">
                ${i.is_mdi?C`
                      <ha-icon icon="${i.mdi_icon}" style="width: 32px; height: 32px;"></ha-icon>
                    `:C` <img src="${i.img_src}" style="width: 32px; height: 32px;" /> `}
              </div>
            `:""}
        <div class="pool-monitor-container">
          ${e.display.gradient?C`
                <div
                  class="progress-bar-child"
                  style="background: linear-gradient(to right, 
              ${i.mode==="heatflow"?`${e.colors.cool} 15%, \n                 ${e.colors.low} 50%, \n                 ${e.colors.warn} 85%`:`${e.colors.warn} 5%, \n                 ${e.colors.low} 30%, \n                 ${e.colors.normal}, \n                 ${e.colors.normal}, \n                 ${e.colors.low} 70%, \n                 ${e.colors.warn} 95%`}
            );"
                ></div>
              `:C`
                <div class="grid-container">
                  <div
                    style="background-color: ${e.colors.warn}; grid-column: 1; border-radius: 5px 0px 0px 5px"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.low}; grid-column: 2;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.normal}; grid-column: 3;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.normal}; grid-column: 4;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.low}; grid-column: 5;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.warn}; grid-column: 6; border-radius: 0px 5px 5px 0px;"
                    class="grid-item item-row"
                  ></div>
                </div>
                <div
                  style="display: flex; justify-content: space-between; margin: 0 10px; font-size: 0.7em; color: var(--secondary-text-color);"
                >
                  <span>${i.min}</span>
                  <span>${i.max}</span>
                </div>
              `}
          ${i.pct_min!==i.pct_cursor?C`<div
                class="cursor-text"
                style="border-left: 2px solid ${e.colors.hi_low}; border-top: 2px solid ${e.colors.hi_low}; border-bottom: 2px solid ${e.colors.hi_low}; width: 2px; height: 12px; text-align:${i.side_align}; background-color:transparent; ${i.side_align}: ${i.pct_min}%;"
              ></div>`:""}
          ${i.pct_max!==i.pct_cursor?C`<div
                class="cursor-text"
                style="border-right: 2px solid ${e.colors.hi_low}; border-top: 2px solid ${e.colors.hi_low}; border-bottom: 2px solid ${e.colors.hi_low}; width: 2px; height: 12px; text-align:${i.side_align}; background-color:transparent; ${i.side_align}: ${i.pct_max}%;"
              ></div>`:""}
        </div>
        <div class="pool-monitor-container-values">
          <div
            style="background-color: transparent; grid-column: 1 ; border-radius: 5px 0px 0px 5px"
            class="grid-item item-row"
          >
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${i.setpoint_class[0]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 2 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${i.setpoint_class[1]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 3 ;" class="grid-item item-row">
            <div
              style="font-size: 0.8em;color:${e.colors.normal};text-align:right;margin:-5px 2px 0 0 "
            >
              ${i.setpoint_class[2]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 4 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${i.setpoint_class[3]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 5 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${i.setpoint_class[4]}
            </div>
          </div>
          <div
            style="background-color: transparent; grid-column: 6 ; border-radius: 0px 5px 5px 0px;"
            class="grid-item item-row"
          ></div>
        </div>
      </div>
      <div style="text-align:left;padding-left:15px;">
        ${i.title}<br /><small style="position: relative;top:-5px;font-size:9px;color:lightgrey"
          >${i.last_updated}</small
        >
      </div>
    `}static generateCompactBody(e,i){if(!i)return C` <div class="warning-message">No sensor data available</div> `;return C`
      <!-- ##### ${i.name} section ##### -->
      <div class="section-compact" @click=${()=>cardContent._moreinfo(i.entity)}>
        ${!i.hide_icon?C`
              <div class="pool-monitor-entity-img">
                ${i.is_mdi?C`
                      <ha-icon icon="${i.mdi_icon}" style="width: 24px; height: 24px;"></ha-icon>
                    `:C` <img src="${i.img_src}" style="width: 24px; height: 24px;" /> `}
              </div>
            `:""}
        <div class="pool-monitor-container">
          ${e.display.gradient?C`
                <div
                  class="progress-bar-child"
                  style="background: linear-gradient(to right, 
              ${i.mode==="heatflow"?`${e.colors.cool} 15%, \n                 ${e.colors.low} 50%, \n                 ${e.colors.warn} 85%`:`${e.colors.warn} 5%, \n                 ${e.colors.low} 30%, \n                 ${e.colors.normal}, \n                 ${e.colors.normal}, \n                 ${e.colors.low} 70%, \n                 ${e.colors.warn} 95%`}
            );"
                ></div>
              `:C`
                <div class="grid-container">
                  <!-- <div style="background-color: transparent; grid-column: 1 ; border: 0px; box-shadow:none" class="grid-item item-row"> <div style="font-size: 0.8em;color:lightgrey;text-align:left;margin:3px 2px 0 0 ">${i.unit}</div></div> -->
                  <div
                    style="background-color: ${e.colors.warn}; grid-column: 1; border-radius: 5px 0px 0px 5px"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.low}; grid-column: 2;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.normal}; grid-column: 3;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.normal}; grid-column: 4;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.low}; grid-column: 5;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.warn}; grid-column: 6; border-radius: 0px 5px 5px 0px;"
                    class="grid-item item-row"
                  ></div>
                </div>
                <div
                  style="display: flex; justify-content: space-between; margin: 0 10px; font-size: 0.7em; color: var(--secondary-text-color);"
                >
                  <span>${i.min}</span>
                  <span>${i.max}</span>
                </div>
              `}
          <div
            class="cursor-text"
            style="border-${i.side_align}: 5px solid ${e.marker}; text-align:${i.side_align};background-color:transparent ;${i.side_align}: ${i.pct_cursor}%;"
          >
            &nbsp; ${i.title} ${i.value} ${i.unit} ${i.separator} ${i.state} &nbsp;
          </div>
          ${i.pct_min!==i.pct_cursor?C`<div
                class="cursor-text"
                style="border-left: 2px solid ${e.colors.hi_low}; border-top: 2px solid ${e.colors.hi_low}; border-bottom: 2px solid ${e.colors.hi_low}; width: 2px; height: 12px; text-align:${i.side_align}; background-color:transparent; ${i.side_align}: ${i.pct_min}%;"
              ></div>`:""}
          ${i.pct_max!==i.pct_cursor?C`<div
                class="cursor-text"
                style="border-right: 2px solid ${e.colors.hi_low}; border-top: 2px solid ${e.colors.hi_low}; border-bottom: 2px solid ${e.colors.hi_low}; width: 2px; height: 12px; text-align:${i.side_align}; background-color:transparent; ${i.side_align}: ${i.pct_max}%;"
              ></div>`:""}
        </div>
        <div class="pool-monitor-container-values">
          <div
            style="background-color: transparent; grid-column: 1 ; border-radius: 5px 0px 0px 5px"
            class="grid-item item-row"
          >
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${i.setpoint_class[0]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 2 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${i.setpoint_class[1]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 3 ;" class="grid-item item-row">
            <div
              style="font-size: 0.8em;color:${e.colors.normal};text-align:right;margin:-5px 2px 0 0 "
            >
              ${i.setpoint_class[2]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 4 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${i.setpoint_class[3]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 5 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${i.setpoint_class[4]}
            </div>
          </div>
          <div
            style="background-color: transparent; grid-column: 6 ; border-radius: 0px 5px 5px 0px;"
            class="grid-item item-row"
          ></div>
        </div>
      </div>
    `}static _moreinfo(e){const i=new Event("hass-more-info",{bubbles:true,composed:true});i.detail={entityId:e};const o=document.querySelector("home-assistant");if(o)o.dispatchEvent(i)}}var P=P||Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));var M=P.prototype.html;console.info(`%c POOL-MONITORING-CARD %c ${f} `,w.title,w.version);class PoolMonitorCard extends P{static cardType=x.cardType;static cardName=x.cardName;static cardDescription=x.cardDescription;static get properties(){return{hass:{},config:{}}}static styles=k;constructor(){super()}render(){const e=this.getConfig();const i=this.processData();const o=e.display.compact?cardContent.generateCompactBody:cardContent.generateBody;if(!i||Object.keys(i).length===0)return M` <div id="pool-monitor-card">
        <div class="warning-message">
          <ha-icon icon="mdi:alert"></ha-icon>
          <span>No valid sensor data available</span>
        </div>
      </div>`;return M` <div id="pool-monitor-card">
      ${cardContent.generateTitle(e)}
      ${Object.values(i).map((i=>{if(i?.invalid)return M`
            <div class="warning-message">
              <ha-icon icon="mdi:alert"></ha-icon>
              <span
                >Sensor ${i?.name||"unknown"} is not supported. Please verify its
                configuration and ensure it is compatible with the card.</span
              >
            </div>
          `;else if(i?.value===null)return M`
            <div class="warning-message">
              <ha-icon icon="mdi:alert"></ha-icon>
              <span
                >Entity ${i?.entity||"unknown"} could not be found. Please verify its
                name and ensure the entity is properly configured.</span
              >
            </div>
          `;return o(e,i)}))}
    </div>`}processData(){const e={};const i=this.getConfig();Object.entries(i.sensors).forEach((([i,o])=>{const a=Array.isArray(o)?o:[o];a.forEach(((o,a)=>{const r=`${i}_${a+1}`;e[r]=this.calculateData(i,o.title||this.getTranslatedText("sensor."+i),o.entity,o.min,o.max,o.setpoint,o.step,o.unit,o.icon,o.image_url,o.mode,o.min_limit,o.override_value,o.override,o.invalid)}))}));return e}getTranslatedText(e,i){const o=this.config?.display.language||"en";const a=getTranslation(o,e);return formatTranslation(a,i)}calculateData(e,i,o,a,r,s,n,l,c,d,p,u,m,g,h){const v={};const y=this.getConfig();const _=getSensorConfig(e)||{};v.name=e;v.invalid=h;v.mode=p;v.title=y.display.show_names?i:M`&nbsp;`;v.hide_icon=false;v.is_mdi=false;if(!y.display.show_icons)v.hide_icon=true;else{const i=c||"";const o=d||"";if(i==="hide")v.hide_icon=true;else if(o)v.img_src=o;else if(i&&typeof i==="string"&&i.startsWith("mdi:")){v.is_mdi=true;v.mdi_icon=i}else v.img_src=`https://raw.githubusercontent.com/wilsto/pool-monitor-card/master/resources/${e}.png`}if(!this.hass||!this.hass.states||!this.hass.states[o]){console.warn(`Entity not found: ${o}`);v.value=null;v.entity=o;return v}v.value=parseFloat(this.hass.states[o].state);v.entity=o;if(y.display.show_last_updated)v.last_updated=this.timeFromNow(this.hass.states[o].last_updated);v.unit=y.display.show_units?l||_.unit||"":"";if(g)v.value=m||_.override;v.min_value=a!==void 0&&this.hass.states[a]&&!isNaN(parseFloat(this.hass.states[a].state))?parseFloat(this.hass.states[a].state):v.value;v.max_value=r!==void 0&&this.hass.states[r]&&!isNaN(parseFloat(this.hass.states[r].state))?parseFloat(this.hass.states[r].state):v.value;s=s!==void 0?parseFloat(s):_.setpoint!==void 0?parseFloat(_.setpoint):v.value;n=n!==void 0?parseFloat(n):_.step!==void 0?parseFloat(_.step):.1;const f=Math.max(this.countDecimals(s),this.countDecimals(n));v.setpoint=s;const x=u!==void 0?Number(u):-1/0;const w=Math.max(x,s-2*n);const b=Math.max(x,s-n);const $=Math.max(x,s);const k=Math.max(x,s+n);const T=Math.max(x,s+2*n);v.setpoint_class=[w.toFixed(f),b.toFixed(f),$.toFixed(f),k.toFixed(f),T.toFixed(f)];v.separator=y.display.show_labels?"-":"";v.color="transparent";if(v.value!==null)v.value=Math.max(x,v.value);if(p==="heatflow")if(Number(v.value)<Number(v.setpoint_class[1])){v.state=y.display.show_labels?this.getTranslatedText("state.1"):"";v.color=y.colors.cool}else if(Number(v.value)>=Number(v.setpoint_class[1])&&Number(v.value)<Number(v.setpoint_class[3])){v.state=y.display.show_labels?this.getTranslatedText("state.3"):"";v.color=y.colors.low}else{v.state=y.display.show_labels?this.getTranslatedText("state.5"):"";v.color=y.colors.warn}else if(Number(v.value)<Number(v.setpoint_class[0])){v.state=y.display.show_labels?this.getTranslatedText("state.1"):"";v.color=y.colors.warn}else if(Number(v.value)>=Number(v.setpoint_class[0])&&Number(v.value)<Number(v.setpoint_class[1])){v.state=y.display.show_labels?this.getTranslatedText("state.2"):"";v.color=y.colors.low}else if(Number(v.value)>=Number(v.setpoint_class[1])&&Number(v.value)<Number(v.setpoint_class[2])){v.state=y.display.show_labels?this.getTranslatedText("state.3"):"";v.color=y.colors.normal}else if(Number(v.value)>=Number(v.setpoint_class[2])&&Number(v.value)<Number(v.setpoint_class[3])){v.state=y.display.show_labels?this.getTranslatedText("state.4"):"";v.color=y.colors.normal}else if(Number(v.value)>=Number(v.setpoint_class[3])&&Number(v.value)<Number(v.setpoint_class[4])){v.state=y.display.show_labels?this.getTranslatedText("state.5"):"";v.color=y.colors.low}else if(Number(v.value)>=Number(v.setpoint_class[4])){v.state=y.display.show_labels?this.getTranslatedText("state.6"):"";v.color=y.colors.warn}v.progressClass=e==="temperature"?"progress-temp":"progress";v.pct=Math.max(0,Math.min(98.5,Math.max(0,v.value-(s-3*n))/(6*n)*.85*100+15)).toFixed(0);v.pct_min=Math.max(0,Math.min(98.5,Math.max(0,v.min_value-(s-3*n))/(6*n)*.85*100+15)).toFixed(0);v.pct_max=Math.max(0,Math.min(98.5,Math.max(0,v.max_value-(s-3*n))/(6*n)*.85*100+15)).toFixed(0);v.pct_marker=v.value>v.setpoint?v.pct-12:v.pct-5;v.side_align=v.value>s?"right":"left";v.pct_cursor=v.value>s?100-parseFloat(v.pct):parseFloat(v.pct)-2;v.pct_state_step=v.value>s?105-parseFloat(v.pct):parseFloat(v.pct)+5;v.pct_min=v.value>s?100-parseFloat(v.pct_min):parseFloat(v.pct_min)-2;v.pct_max=v.value>s?100-parseFloat(v.pct_max):parseFloat(v.pct_max)-2;return v}countDecimals(e){if(e===void 0||e===null)return 0;if(Math.floor(e)===e)return 0;const i=e.toString();if(i.includes("."))return i.split(".")[1].length||0;return 0}timeFromNow(e){const i=new Date(e);const o=Date.now()-i.getTime();const t=(e,i)=>{const o=i===1?"time":"time_plural";const a={[e]:i};return this.getTranslatedText(`${o}.${e}`,a)};const a=Math.floor(o/6e4);const r=Math.floor(a/60);const s=Math.floor(r/24);if(a<1)return t("seconds",0);if(a<60)return t("minutes",a);if(r<24)return t("hours",r);return t("days",s)}getConfig(){return this.config}setConfig(e){const i={display:getDisplayConfig(),colors:getColorConfig()};const o={...e,display:{...i.display,...e.display||{}},colors:{...i.colors,...e.colors||{}},sensors:{}};if(!e.sensors){console.warn(`Legacy configuration detected, please move sensors under "sensors" key`,{config:e});throw new Error('Legacy configuration detected. Please update your setup to define all sensors under the "sensors" key as required by the version 2.0 of the card.')}Object.entries(e.sensors).forEach((([i,a])=>{const r=getSensorConfig(i);const s=Array.isArray(a)?[...a]:[{...a}];if(s.length===0)throw new Error(`Empty sensor array for ${i}`);const n=s.map((e=>({...r,...e,nameDefinedByUser:!!e.name})));n.forEach(((o,a)=>{if(!o.entity)throw new Error(`Missing entity for ${i}[${a}]`);if(o.nameDefinedByUser)o.title=o.name;if(!v.includes(i)){console.warn(`Unsupported sensor type: ${i}`,{sensorType:i,supportedSensors:v,config:e,sensorConfig:o});o.invalid=true}else o.invalid=false}));o.sensors[i]=n}));this.config=o}}customElements.define("pool-monitor-card",PoolMonitorCard);e.PoolMonitorCard=PoolMonitorCard;Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});return e}({});
//# sourceMappingURL=pool-monitor-card.js.map

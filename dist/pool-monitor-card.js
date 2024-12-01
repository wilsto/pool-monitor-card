(function(){"use strict";var e={state:{1:"Too Low",2:"Acceptable Low",3:"Ideal",4:"Ideal",5:"Acceptable High",6:"Too High"},sensor:{temperature:"Temperature",temperature_2:"Temperature 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinity",cya:"Cyanuric Acid",calcium:"Calcium",phosphate:"Phosphate",alkalinity:"Alkalinity",free_chlorine:"Free Chlorine",total_chlorine:"Total Chlorine",pressure:"Filter Pressure",sg:"Specific Gravity",magnesium:"Magnesium",water_level:"Water Level",flow_rate:"Flow Rate",uv_radiation:"UV Radiation",product_volume:"Product Volume",product_weight:"Product Weight"},time:{seconds:"just now",minutes:"{minutes} minute{plural} ago",hours:"{hours} hour{plural} ago",days:"{days} day{plural} ago"}};var o={state:{1:"Trop bas",2:"Acceptable bas",3:"Idéal",4:"Idéal",5:"Acceptable élevé",6:"Trop élevé"},sensor:{temperature:"Température",temperature_2:"Température 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinité",cya:"Acide cyanurique",calcium:"Calcium",phosphate:"Phosphate",alkalinity:"Alcalinité",free_chlorine:"Chlore libre",total_chlorine:"Chlore total",pressure:"Pression du filtre",sg:"Densité spécifique",magnesium:"Magnésium",water_level:"Niveau d'eau",flow_rate:"Débit",uv_radiation:"Radiation UV",product_volume:"Volume Produit",product_weight:"Poids Produit"},time:{seconds:"il y a {seconds} seconde{plural}",minutes:"il y a {minutes} minute{plural}",hours:"il y a {hours} heure{plural}",days:"il y a {days} jour{plural}"}};var i={state:{1:"Demasiado bajo",2:"Aceptable bajo",3:"Perfecto",4:"Perfecto",5:"Aceptable alto",6:"Demasiado alto"},sensor:{temperature:"Temperatura",temperature_2:"Temperatura 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidad",cya:"Acido cianúrico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidad",free_chlorine:"Cloro libre",total_chlorine:"Cloro total",pressure:"Pressione du filter relativa",sg:"Densidad relativa",magnesium:"Magnesio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiación UV",product_volume:"Volumen Producto",product_weight:"Peso Producto"},time:{seconds:"justo ahora",minutes:"hace {minutes} minuto{plural}",hours:"hace {hours} hora{plural}",days:"hace {days} día{plural}"}};var r={state:{1:"Zu niedrig",2:"Akzeptabler Tiefstwert",3:"Ideal",4:"Ideal",5:"Akzeptabler Hochwert",6:"Zu hoch"},sensor:{temperature:"Temperatur",temperature_2:"Temperatur 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salzgehalt",cya:"Cyanursäure",calcium:"Kalzium",phosphate:"Phosphat",alkalinity:"Alkalinität",free_chlorine:"Freies Chlor",total_chlorine:"Gesamtchlor",pressure:"Sandfilterdruck",sg:"Spezifisches Gewicht",magnesium:"Magnesium",water_level:"Wasserstand",flow_rate:"Durchfluss",uv_radiation:"UV-Strahlung",product_volume:"Produktvolumen",product_weight:"Produktgewicht"},time:{seconds:"gerade erst",minutes:"vor {minutes} Minute{plural}",hours:"vor {hours} Stunde{plural}",days:"vor {days} Tag{plural}"}};var a={state:{1:"Troppo basso",2:"Accettabile basso",3:"Ideale",4:"Ideale",5:"Accettabile alto",6:"Troppo alto"},sensor:{temperature:"Temperatura",temperature_2:"Temperatura 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinità",cya:"Acido cianurico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinità",free_chlorine:"Cloro libero",total_chlorine:"Cloro totale",pressure:"Pressione filtro",sg:"Gravità specifica",magnesium:"Magnesio",water_level:"Livello dell'acqua",flow_rate:"Portata",uv_radiation:"Radiazione UV",product_volume:"Volume prodotto",product_weight:"Peso prodotto"},time:{seconds:"proprio ora",minutes:"{minutes} minuto{plural} fa",hours:"{hours} ora{plural} fa",days:"{days} giorno{plural} fa"}};var s={state:{1:"Te laag",2:"Acceptabel laag",3:"Ideaal",4:"Ideaal",5:"Acceptabel hoog",6:"Te hoog"},sensor:{temperature:"Temperatuur",temperature_2:"Temperatuur 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Zoutgehalte",cya:"Cyanuurzuur",calcium:"Calcium",phosphate:"Fosfaat",alkalinity:"Alkaliteit",free_chlorine:"Vrij chloor",total_chlorine:"Totaal chloor",pressure:"Filterdruk",sg:"Soortelijk gewicht",magnesium:"Magnesium",water_level:"Waterniveau",flow_rate:"Debiet",uv_radiation:"UV-straling",product_volume:"Productvolume",product_weight:"Productgewicht"},time:{seconds:"zojuist",minutes:"{minutes} minuut{plural} geleden",hours:"{hours} uur{plural} geleden",days:"{days} dag{plural} geleden"}};var l={state:{1:"Muito Baixo",2:"Torelavel mas Baixo",3:"Ideal",4:"Ideal",5:"Toleravel mas Alto",6:"Muito Alto"},sensor:{temperature:"Temperatura",temperature_2:"Temperatura 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidade",cya:"Ácido cianúrico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidade",free_chlorine:"Cloro livres",total_chlorine:"Cloro total",pressure:"Pressão do filtro",sg:"Gravidade específica",magnesium:"Magnésio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiação UV",product_volume:"Volume Produto",product_weight:"Peso Produto"},time:{seconds:"Agora",minutes:"{minutes} Muntos{plural} atrás",hours:"{hours} horas{plural} atrás",days:"{days} dias{plural} atrás"}};var n={state:{1:"Muito Baixo",2:"Aceitavel Baixo",3:"Ideal",4:"Ideal",5:"Aceitavel Alto",6:"Muito Alto"},sensor:{temperature:"Temperatura",temperature_2:"Temperatura 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidade",cya:"Acido Cianurico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidade",free_chlorine:"Cloro Livre",total_chlorine:"Cloro Total",pressure:"Pressão no Filtro",sg:"Gravidade específica",magnesium:"Magnésio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiação UV",product_volume:"Volume Produto",product_weight:"Peso Produto"},time:{seconds:"Agora mesmo",minutes:"{minutes} minutos{plural} atras",hours:"{hours} horas{plural} atras",days:"{days} Dias{plural} atras"}};var c={state:{1:"Prea mic",2:"Mic",3:"Ideal",4:"Ideal",5:"Mare",6:"Prea mare"},sensor:{temperature:"Temperatură",temperature_2:"Temperatură 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinitate",cya:"Acid cianuric",calcium:"Calciu",phosphate:"Fosfat",alkalinity:"Alcalinitate",free_chlorine:"Clor liber",total_chlorine:"Clor total",pressure:"Presiune filtru",sg:"Greutate specifică",magnesium:"Magneziu",water_level:"Nivel apă",flow_rate:"Debit",uv_radiation:"Radiație UV",product_volume:"Volum produs",product_weight:"Greutate produs"},time:{seconds:"acum",minutes:"acum {minutes} minut{plural}",hours:"acum {hours} oră{plural}",days:"acum {days} zi{plural}"}};var d={state:{1:"Príliš nízky",2:"Akceptovateľne nízky",3:"Ideálny",4:"Ideálny",5:"Akceptovateľne vysoký",6:"Príliš vysoký"},sensor:{temperature:"Teplota",temperature_2:"Teplota 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinita",cya:"Kyselina kyanurová",calcium:"Vápnik",phosphate:"Fosfát",alkalinity:"Alkalinita",free_chlorine:"Voľný chlór",total_chlorine:"Celkový chlór",pressure:"Tlak filtra",sg:"Špecifická hmotnosť",magnesium:"Magnézium",water_level:"Úroveň vody",flow_rate:"Prietok",uv_radiation:"UV žiarenie",product_volume:"Objem produktu",product_weight:"Hmotnosť produktu"},time:{seconds:"práve teraz",minutes:"{minutes} minút{plural} pred",hours:"{hours} hodín{plural} pred",days:"{days} dní{plural} pred"}};var p={state:{1:"נמוך מדי",2:"נמוך מאוד",3:"אידיאלי",4:"אידיאלי",5:"גבוה מאוד",6:"גבוה מדי"},sensor:{temperature:"טמפרטורה",temperature_2:"טמפרטורה 2",ph:"PH",orp:"ORP",tds:"TDS",salinity:"מליחות",cya:"חומצה ציאנורית",calcium:"סידן",phosphate:"פוספט",alkalinity:"אלקליניות",free_chlorine:"כלור חופשי",total_chlorine:"כלור כולל",pressure:"לחץ מסנן",sg:"משקל סגולי",magnesium:"מגנזיום",water_level:"מפלס מים",flow_rate:"קצב זרימה",uv_radiation:"קרינת UV",product_volume:"נפח מוצר",product_weight:"משקל מוצר"},time:{seconds:"הרגע",minutes:"לפני {minutes} דקות",hours:"לפני {hours} שעות",days:"לפני {days} ימים"}};var u={state:{1:"Слишком низкий",2:"Приемлемо низкий",3:"Идеальный",4:"Идеальный",5:"Приемлемо высокий",6:"Слишком высокий"},sensor:{temperature:"Температура",temperature_2:"Температура 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Соленость",cya:"Циануровая кислота",calcium:"Кальций",phosphate:"Фосфаты",alkalinity:"Щелочность",free_chlorine:"Свободный хлор",total_chlorine:"Общий хлор",pressure:"Давление фильтра",sg:"Удельный вес",magnesium:"Магний",water_level:"Уровень воды",flow_rate:"Расход воды",uv_radiation:"УФ-излучение",product_volume:"Объем продукта",product_weight:"Вес продукта"},time:{seconds:"{seconds} секунд{plural}",minutes:"{minutes} минут{plural} назад",hours:"{hours} часов{plural} назад",days:"{days} дней{plural} назад"}};const m={en:e,fr:o,es:i,de:r,it:a,nl:s,pt:l,"pt-br":n,ro:c,sk:d,he:p,ru:u};const getTranslation=(e,o)=>{const i=o.split(".");let r=m[e]||m.en;for(const e of i)if(r&&typeof r==="object")r=r[e];else return o;return r||o};const formatTranslation=(e,o)=>{if(!o)return e;return Object.entries(o).reduce(((e,[o,i])=>e.replace(`{${o}}`,i)),e)};const g={display:{compact:false,show_names:true,show_labels:true,show_last_updated:false,show_icons:true,show_units:true,gradient:true,language:"en"},colors:{low:"#fdcb6e",warn:"#e17055",normal:"#00b894",cool:"#00BFFF",marker:"#000000",hi_low:"#00000099"},sensors:{temperature:{name:"Temperature",unit:"°C",setpoint:27,step:1,mode:"heatflow"},orp:{name:"ORP",unit:"mV",setpoint:700,step:50,mode:"centric",min_limit:0},ec:{name:"Electrical Conductivity",unit:"µS/cm",setpoint:4e3,step:200,mode:"centric",min_limit:0},tds:{name:"TDS",unit:"g/L",setpoint:5,step:.5,mode:"centric",min_limit:0},ph:{name:"pH",unit:"pH",setpoint:7.2,step:.2,mode:"centric",min_limit:0},salinity:{name:"Salinity",unit:"ppm",setpoint:3e3,step:500,mode:"centric",min_limit:0},cya:{name:"Cyanuric Acid",unit:"ppm",setpoint:40,step:10,mode:"centric",min_limit:0},calcium:{name:"Calcium",unit:"ppm",setpoint:300,step:100,mode:"centric",min_limit:0},phosphate:{name:"Phosphate",unit:"ppb",setpoint:50,step:10,mode:"centric",min_limit:0},alkalinity:{name:"Alkalinity",unit:"ppm",setpoint:100,step:20,mode:"centric",min_limit:0},free_chlorine:{name:"Free Chlorine",unit:"ppm",setpoint:3,step:.5,mode:"centric",min_limit:0},total_chlorine:{name:"Total Chlorine",unit:"ppm",setpoint:3,step:.5,mode:"centric",min_limit:0},pressure:{name:"Filter Pressure",unit:"psi",setpoint:12,step:2,mode:"centric"},specific_gravity:{name:"Specific Gravity",unit:"sg",setpoint:1.1,step:.2,mode:"centric"},magnesium:{name:"Magnesium",unit:"ppm",setpoint:1200,step:100,mode:"centric",min_limit:0},water_level:{name:"Water Level",unit:"%",setpoint:100,step:10,mode:"centric",min_limit:0},flow_rate:{name:"Flow Rate",unit:"m³/h",setpoint:10,step:1,mode:"centric",min_limit:0},uv_radiation:{name:"UV Radiation",unit:"mW/cm²",setpoint:4,step:1,mode:"centric",min_limit:0},product_volume:{name:"Product Volume",unit:"L",setpoint:20,step:5,mode:"centric",min_limit:0},product_weight:{name:"Product Weight",unit:"kg",setpoint:25,step:5,mode:"centric",min_limit:0}}};const getSensorConfig=e=>g.sensors[e];const getDisplayConfig=()=>g.display;const getColorConfig=()=>g.colors;const h=Object.keys(g.sensors);const v="2.1.0";const _="2024-12-01-10-06";const y=`${v} (${_})`;const x={cardType:"pool-monitor-card",cardName:"Pool Monitor Card",cardDescription:'The "Pool Monitor Card" is a home assistant plugin that provides information about the temperature, pH, and ORP levels of your swimming pool'};const f={title:"color: white; background: green; font-weight: 700;",version:"color: green; background: white; font-weight: 700;"};var w=w||Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));var b=w.prototype.css;const $=b`
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
    padding:0px;
  }

  .section-compact {
    padding-bottom: 5px;
    padding: 0px;
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
    padding: 5px;
    height: 15px;
  }

  .pool-monitor-container-values {
    display: grid;
    grid-template-columns: repeat(6,1fr) ;
    padding-top: 0px;
    padding-left: 20px;
    margin-top: -10px;
  }

  .pool-monitor-container-marker {
    display: grid;
    grid-template-columns: 10% repeat(6, 1fr) 5%;
    padding: 10px;
    grid-template-rows:15px;
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

  .cursor{
    text-align: center;
    justify-self: center;
    font-size:13px;
    font-weight: 600;
    color: black;
    position: absolute;
    z-index: 1;
  }

  .cursor-text{
    position: absolute;
    width: 200px;
    height: 17px;
    padding-left: 3px;
    padding-right: 3px;
    padding-top:0px;
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
`;var k=k||Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));var T=k.prototype.html;class cardContent{static generateTitle(e){const o=e.title!==void 0?T`
      <h1 class="pool-monitor-title">${e.title}</h1>
    `:T``;return T`${o}`}static generateBody(e,o){return T`
      <!-- ##### ${o.name} section ##### -->    
      <div class="section" @click=${()=>this._moreinfo(o.entity)}>   
        <div class="pool-monitor-container-marker">
          <div class="marker" style="background-color: ${o.color} ;color: black;left: ${o.pct_marker}%;">${o.value} ${o.unit}</div>
          <div class="marker-state" style="font-size: 0.8em; padding-top: 5px;color:${o.color};width: 200px;padding-${o.side_align}:40px;text-align:${o.side_align};background-color:transparent ;${o.side_align}: ${o.pct_state_step}%;">${o.state}</div>
          <div class="triangle" style="border-top: 10px solid ${o.color} ;left: ${o.pct-1}%;"></div>
        </div>
        ${!o.hide_icon?T`
          <div class="pool-monitor-entity-img">
            ${o.is_mdi?T`
              <ha-icon icon="${o.mdi_icon}" style="width: 32px; height: 32px;"></ha-icon>
            `:T`
              <img src="${o.img_src}" style="width: 32px; height: 32px;">
            `}
          </div>
        `:""}
        <div class="pool-monitor-container">
          ${e.display.gradient?T`
            <div class="progress-bar-child" style="background: linear-gradient(to right, 
              ${o.mode==="heatflow"?`${e.colors.cool} 15%, \n                 ${e.colors.low} 50%, \n                 ${e.colors.warn} 85%`:`${e.colors.warn} 5%, \n                 ${e.colors.low} 30%, \n                 ${e.colors.normal}, \n                 ${e.colors.normal}, \n                 ${e.colors.low} 70%, \n                 ${e.colors.warn} 95%`}
            );"></div>
          `:T`
          <div class="grid-container">
            <div style="background-color: ${e.colors.warn}; grid-column: 1; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> </div>
            <div style="background-color: ${e.colors.low}; grid-column: 2;" class="grid-item item-row"></div>
            <div style="background-color: ${e.colors.normal}; grid-column: 3;" class="grid-item item-row"></div>  
            <div style="background-color: ${e.colors.normal}; grid-column: 4;" class="grid-item item-row"></div>  
            <div style="background-color: ${e.colors.low}; grid-column: 5;" class="grid-item item-row"></div>
            <div style="background-color: ${e.colors.warn}; grid-column: 6; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 0 10px; font-size: 0.7em; color: var(--secondary-text-color);">
            <span>${o.min}</span>
            <span>${o.max}</span>
          </div>            
          `}
          ${o.pct_min!==o.pct_cursor?T`<div class="cursor-text" style="border-left: 2px solid ${e.colors.hi_low}; border-top: 2px solid ${e.colors.hi_low}; border-bottom: 2px solid ${e.colors.hi_low}; width: 2px; height: 12px; text-align:${o.side_align}; background-color:transparent; ${o.side_align}: ${o.pct_min}%;"></div>`:""}
          ${o.pct_max!==o.pct_cursor?T`<div class="cursor-text" style="border-right: 2px solid ${e.colors.hi_low}; border-top: 2px solid ${e.colors.hi_low}; border-bottom: 2px solid ${e.colors.hi_low}; width: 2px; height: 12px; text-align:${o.side_align}; background-color:transparent; ${o.side_align}: ${o.pct_max}%;"></div>`:""}
        </div>
        <div class="pool-monitor-container-values">
          <div style="background-color: transparent; grid-column: 1 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${o.setpoint_class[0]}</div></div>
          <div style="background-color: transparent; grid-column: 2 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${o.setpoint_class[1]}</div></div>
          <div style="background-color: transparent; grid-column: 3 ;" class="grid-item item-row"><div style="font-size: 0.8em;color:${e.colors.normal};text-align:right;margin:-5px 2px 0 0 ">${o.setpoint_class[2]}</div></div>  
          <div style="background-color: transparent; grid-column: 4 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${o.setpoint_class[3]}</div></div>  
          <div style="background-color: transparent; grid-column: 5 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${o.setpoint_class[4]}</div></div>
          <div style="background-color: transparent; grid-column: 6 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
        </div> 
      </div> 
      <div style="text-align:left;padding-left:15px;">${o.title}<br/><small style="position: relative;top:-5px;font-size:9px;color:lightgrey">${o.last_updated}</small></div>
    `}static generateCompactBody(e,o){return T`
      <!-- ##### ${o.name} section ##### -->    
      <div class="section-compact" @click=${()=>this._moreinfo(o.entity)}>   
        ${!o.hide_icon?T`
          <div class="pool-monitor-entity-img">
            ${o.is_mdi?T`
              <ha-icon icon="${o.mdi_icon}" style="width: 24px; height: 24px;"></ha-icon>
            `:T`
              <img src="${o.img_src}" style="width: 24px; height: 24px;">
            `}
          </div>
        `:""}
        <div class="pool-monitor-container">
          ${e.display.gradient?T`
            <div class="progress-bar-child" style="background: linear-gradient(to right, 
              ${o.mode==="heatflow"?`${e.colors.cool} 15%, \n                 ${e.colors.low} 50%, \n                 ${e.colors.warn} 85%`:`${e.colors.warn} 5%, \n                 ${e.colors.low} 30%, \n                 ${e.colors.normal}, \n                 ${e.colors.normal}, \n                 ${e.colors.low} 70%, \n                 ${e.colors.warn} 95%`}
            );"></div>
          `:T`
          <div class="grid-container">
            <!-- <div style="background-color: transparent; grid-column: 1 ; border: 0px; box-shadow:none" class="grid-item item-row"> <div style="font-size: 0.8em;color:lightgrey;text-align:left;margin:3px 2px 0 0 ">${o.unit}</div></div> -->
            <div style="background-color: ${e.colors.warn}; grid-column: 1; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> </div>
            <div style="background-color: ${e.colors.low}; grid-column: 2;" class="grid-item item-row"></div>
            <div style="background-color: ${e.colors.normal}; grid-column: 3;" class="grid-item item-row"></div>  
            <div style="background-color: ${e.colors.normal}; grid-column: 4;" class="grid-item item-row"></div>  
            <div style="background-color: ${e.colors.low}; grid-column: 5;" class="grid-item item-row"></div>
            <div style="background-color: ${e.colors.warn}; grid-column: 6; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 0 10px; font-size: 0.7em; color: var(--secondary-text-color);">
            <span>${o.min}</span>
            <span>${o.max}</span>
          </div>            
          `}
          <div class="cursor-text" style="border-${o.side_align}: 5px solid ${e.marker}; text-align:${o.side_align};background-color:transparent ;${o.side_align}: ${o.pct_cursor}%;">&nbsp; ${o.title} ${o.value} ${o.unit} ${o.separator} ${o.state} &nbsp; </div>
          ${o.pct_min!==o.pct_cursor?T`<div class="cursor-text" style="border-left: 2px solid ${e.colors.hi_low}; border-top: 2px solid ${e.colors.hi_low}; border-bottom: 2px solid ${e.colors.hi_low}; width: 2px; height: 12px; text-align:${o.side_align}; background-color:transparent; ${o.side_align}: ${o.pct_min}%;"></div>`:""}
          ${o.pct_max!==o.pct_cursor?T`<div class="cursor-text" style="border-right: 2px solid ${e.colors.hi_low}; border-top: 2px solid ${e.colors.hi_low}; border-bottom: 2px solid ${e.colors.hi_low}; width: 2px; height: 12px; text-align:${o.side_align}; background-color:transparent; ${o.side_align}: ${o.pct_max}%;"></div>`:""}
        </div>
        <div class="pool-monitor-container-values">
          <div style="background-color: transparent; grid-column: 1 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${o.setpoint_class[0]}</div></div>
          <div style="background-color: transparent; grid-column: 2 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${o.setpoint_class[1]}</div></div>
          <div style="background-color: transparent; grid-column: 3 ;" class="grid-item item-row"><div style="font-size: 0.8em;color:${e.colors.normal};text-align:right;margin:-5px 2px 0 0 ">${o.setpoint_class[2]}</div></div>  
          <div style="background-color: transparent; grid-column: 4 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${o.setpoint_class[3]}</div></div>  
          <div style="background-color: transparent; grid-column: 5 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${o.setpoint_class[4]}</div></div>
          <div style="background-color: transparent; grid-column: 6 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
        </div> 
      </div> 
    `}static _moreinfo(e){const o=new Event("hass-more-info",{bubbles:true,composed:true});o.detail={entityId:e};document.querySelector("home-assistant").dispatchEvent(o)}}var P=P||Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));var C=P.prototype.html;console.info(`%c POOL-MONITORING-CARD %c ${y} `,f.title,f.version);class PoolMonitorCard extends P{static cardType=x.cardType;static cardName=x.cardName;static cardDescription=x.cardDescription;static get properties(){return{hass:{},config:{}}}static styles=$;constructor(){super()}render(){const e=this.getConfig();const o=this.processData();const i=e.display.compact?cardContent.generateCompactBody:cardContent.generateBody;if(!o||Object.keys(o).length===0)return C`
        <div id="pool-monitor-card">
          <div class="warning-message">
            <ha-icon icon="mdi:alert"></ha-icon>
            <span>No valid sensor data available</span>
          </div>
        </div>`;return C`
      <div id="pool-monitor-card">
        ${cardContent.generateTitle(e)}
        ${Object.values(o).map((o=>{if(o?.invalid)return C`
              <div class="warning-message">
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>Sensor ${o?.name||"unknown"} is not supported. Please verify its configuration and ensure it is compatible with the card.</span>
              </div>
            `;else if(o?.value===null)return C`
              <div class="warning-message">
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>Entity ${o?.entity||"unknown"} could not be found. Please verify its name and ensure the entity is properly configured.</span>
              </div>
            `;return i(e,o)}))}
      </div>`}processData(){const e={};const o=this.getConfig();Object.entries(o.sensors).forEach((([o,i])=>{const r=Array.isArray(i)?i:[i];r.forEach(((i,r)=>{const a=`${o}_${r+1}`;e[a]=this.calculateData(o,i.title||this.getTranslatedText("sensor."+o),i.entity,i.min,i.max,i.setpoint,i.step,i.unit,i.icon,i.image_url,i.mode,i.min_limit,i.override_value,i.override,i.invalid)}))}));return e}getTranslatedText(e,o){const i=this.config?.display.language||"en";const r=getTranslation(i,e);return formatTranslation(r,o)}calculateData(e,o,i,r,a,s,l,n,c,d,p,u,m,g,h){const v={};const _=this.getConfig();const y=getSensorConfig(e)||{};v.name=e;v.invalid=h;v.mode=p;v.title=_.display.show_names?o:C`&nbsp;`;if(!_.display.show_icons)v.hide_icon=true;else{const o=c||"";const i=d||"";if(o==="hide")v.hide_icon=true;else if(i){v.is_mdi=false;v.img_src=i}else if(o&&typeof o==="string"&&o.startsWith("mdi:")){v.is_mdi=true;v.mdi_icon=o}else v.img_src=`https://raw.githubusercontent.com/wilsto/pool-monitor-card/master/resources/${e}.png`}if(!this.hass||!this.hass.states||!this.hass.states[i]){console.warn(`Entity not found: ${i}`);v.value=null;v.entity=i;return v}v.value=parseFloat(this.hass.states[i].state);v.entity=i;if(_.display.show_last_updated)v.last_updated=this.timeFromNow(this.hass.states[i].last_updated);v.unit=_.display.show_units?n||y.unit||"":"";if(g)v.value=m||y.override;v.min_value=r!==void 0&&this.hass.states[r]&&!isNaN(parseFloat(this.hass.states[r].state))?parseFloat(this.hass.states[r].state):v.value;v.max_value=a!==void 0&&this.hass.states[a]&&!isNaN(parseFloat(this.hass.states[a].state))?parseFloat(this.hass.states[a].state):v.value;s=s!==void 0?parseFloat(s):y.setpoint!==void 0?parseFloat(y.setpoint):v.value;l=l!==void 0?parseFloat(l):y.step!==void 0?parseFloat(y.step):.1;const x=Math.max(this.countDecimals(s),this.countDecimals(l));if(v.value)v.value=parseFloat(this.hass.states[i].state);v.setpoint=s;const f=u!==void 0?Number(u):-1/0;const w=Math.max(f,s-2*l);const b=Math.max(f,s-l);const $=Math.max(f,s);const k=Math.max(f,s+l);const T=Math.max(f,s+2*l);v.setpoint_class=[w.toFixed(x),b.toFixed(x),$.toFixed(x),k.toFixed(x),T.toFixed(x)];v.separator=_.display.show_labels?"-":"";v.color="transparent";if(v.value!==null)v.value=Math.max(f,v.value);if(p==="heatflow")if(Number(v.value)<Number(v.setpoint_class[1])){v.state=_.display.show_labels?this.getTranslatedText("state.1"):"";v.color=_.colors.cool}else if(Number(v.value)>=Number(v.setpoint_class[1])&&Number(v.value)<Number(v.setpoint_class[3])){v.state=_.display.show_labels?this.getTranslatedText("state.3"):"";v.color=_.colors.low}else{v.state=_.display.show_labels?this.getTranslatedText("state.5"):"";v.color=_.colors.warn}else if(Number(v.value)<Number(v.setpoint_class[0])){v.state=_.display.show_labels?this.getTranslatedText("state.1"):"";v.color=_.colors.warn}else if(Number(v.value)>=Number(v.setpoint_class[0])&&Number(v.value)<Number(v.setpoint_class[1])){v.state=_.display.show_labels?this.getTranslatedText("state.2"):"";v.color=_.colors.low}else if(Number(v.value)>=Number(v.setpoint_class[1])&&Number(v.value)<Number(v.setpoint_class[2])){v.state=_.display.show_labels?this.getTranslatedText("state.3"):"";v.color=_.colors.normal}else if(Number(v.value)>=Number(v.setpoint_class[2])&&Number(v.value)<Number(v.setpoint_class[3])){v.state=_.display.show_labels?this.getTranslatedText("state.4"):"";v.color=_.colors.normal}else if(Number(v.value)>=Number(v.setpoint_class[3])&&Number(v.value)<Number(v.setpoint_class[4])){v.state=_.display.show_labels?this.getTranslatedText("state.5"):"";v.color=_.colors.low}else if(Number(v.value)>=Number(v.setpoint_class[4])){v.state=_.display.show_labels?this.getTranslatedText("state.6"):"";v.color=_.colors.warn}v.progressClass=e==="temperature"?"progress-temp":"progress";v.pct=Math.max(0,Math.min(98.5,Math.max(0,v.value-(s-3*l))/(6*l)*.85*100+15)).toFixed(0);v.pct_min=Math.max(0,Math.min(98.5,Math.max(0,v.min_value-(s-3*l))/(6*l)*.85*100+15)).toFixed(0);v.pct_max=Math.max(0,Math.min(98.5,Math.max(0,v.max_value-(s-3*l))/(6*l)*.85*100+15)).toFixed(0);v.pct_marker=v.value>v.setpoint?v.pct-12:v.pct-5;v.side_align=v.value>s?"right":"left";v.pct_cursor=v.value>s?100-parseFloat(v.pct):parseFloat(v.pct)-2;v.pct_state_step=v.value>s?105-parseFloat(v.pct):parseFloat(v.pct)+5;v.pct_min=v.value>s?100-parseFloat(v.pct_min):parseFloat(v.pct_min)-2;v.pct_max=v.value>s?100-parseFloat(v.pct_max):parseFloat(v.pct_max)-2;return v}countDecimals(e){if(e===void 0||e===null)return 0;if(Math.floor(e)===e)return 0;const o=e.toString();if(o.includes("."))return o.split(".")[1].length||0;return 0}timeFromNow(e){const o=new Date(e);const i=Date.now()-o.getTime();const t=(e,o)=>{let i=o==1?"":"s";let r=this.getTranslatedText(`time.${e}`);r=r.replace("{"+e+"}",o);r=r.replace("{plural}",i);return r};const r=Math.floor(i/6e4);const a=Math.floor(r/60);const s=Math.floor(a/24);if(r<1)return t("seconds",0);if(r<60)return t("minutes",r);if(a<24)return t("hours",a);return t("days",s)}getConfig(){return this.config}setConfig(e){const o={display:getDisplayConfig(),colors:getColorConfig()};const i={...e,display:{...o.display,...e.display||{}},colors:{...o.colors,...e.colors||{}},sensors:{}};if(!e.sensors){console.warn(`Legacy configuration detected, please move sensors under "sensors" key`,{config:e});throw new Error('Legacy configuration detected. Please update your setup to define all sensors under the "sensors" key as required by the version 2.0 of the card.')}Object.entries(e.sensors).forEach((([o,r])=>{const a=getSensorConfig(o);const s=Array.isArray(r)?[...r]:[{...r}];if(s.length===0)throw new Error(`Empty sensor array for ${o}`);const l=s.map((e=>({...a,...e,nameDefinedByUser:!!e.name})));l.forEach(((i,r)=>{if(!i.entity)throw new Error(`Missing entity for ${o}[${r}]`);if(i.nameDefinedByUser)i.title=i.name;if(!h.includes(o)){console.warn(`Unsupported sensor type: ${o}`,{sensorType:o,supportedSensors:h,config:e,sensorConfig:i});i.invalid=true}else i.invalid=false}));i.sensors[o]=l}));this.config=i}static _moreinfo(e){const o=new Event("hass-more-info",{bubbles:true,cancelable:false,composed:true});o.detail={entityId:e};document.querySelector("home-assistant").dispatchEvent(o)}}customElements.define("pool-monitor-card",PoolMonitorCard)})();
//# sourceMappingURL=pool-monitor-card.js.map

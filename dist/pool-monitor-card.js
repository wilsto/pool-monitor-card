(function(){"use strict";var e={state:{1:"Too Low",2:"Acceptable Low",3:"Ideal",4:"Ideal",5:"Acceptable High",6:"Too High"},sensor:{temperature:"Temperature",temperature_2:"Temperature 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinity",cya:"Cyanuric Acid",calcium:"Calcium",phosphate:"Phosphate",alkalinity:"Alkalinity",free_chlorine:"Free Chlorine",total_chlorine:"Total Chlorine",pressure:"Filter Pressure",sg:"Specific Gravity",magnesium:"Magnesium",water_level:"Water Level",flow_rate:"Flow Rate",uv_radiation:"UV Radiation",product_volume:"Product Volume",product_weight:"Product Weight"},time:{seconds:"just now",minutes:"{minutes} minute{plural} ago",hours:"{hours} hour{plural} ago",days:"{days} day{plural} ago"}};var o={state:{1:"Trop bas",2:"Acceptable bas",3:"Idéal",4:"Idéal",5:"Acceptable élevé",6:"Trop élevé"},sensor:{temperature:"Température",temperature_2:"Température 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinité",cya:"Acide cyanurique",calcium:"Calcium",phosphate:"Phosphate",alkalinity:"Alcalinité",free_chlorine:"Chlore libre",total_chlorine:"Chlore total",pressure:"Pression du filtre",sg:"Densité spécifique",magnesium:"Magnésium",water_level:"Niveau d'eau",flow_rate:"Débit",uv_radiation:"Radiation UV",product_volume:"Volume Produit",product_weight:"Poids Produit"},time:{seconds:"il y a {seconds} seconde{plural}",minutes:"il y a {minutes} minute{plural}",hours:"il y a {hours} heure{plural}",days:"il y a {days} jour{plural}"}};var r={state:{1:"Demasiado bajo",2:"Aceptable bajo",3:"Perfecto",4:"Perfecto",5:"Aceptable alto",6:"Demasiado alto"},sensor:{temperature:"Temperatura",temperature_2:"Temperatura 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidad",cya:"Acido cianúrico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidad",free_chlorine:"Cloro libre",total_chlorine:"Cloro total",pressure:"Pressione du filter relativa",sg:"Densidad relativa",magnesium:"Magnesio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiación UV",product_volume:"Volumen Producto",product_weight:"Peso Producto"},time:{seconds:"justo ahora",minutes:"hace {minutes} minuto{plural}",hours:"hace {hours} hora{plural}",days:"hace {days} día{plural}"}};var a={state:{1:"Zu niedrig",2:"Akzeptabler Tiefstwert",3:"Ideal",4:"Ideal",5:"Akzeptabler Hochwert",6:"Zu hoch"},sensor:{temperature:"Temperatur",temperature_2:"Temperatur 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salzgehalt",cya:"Cyanursäure",calcium:"Kalzium",phosphate:"Phosphat",alkalinity:"Alkalinität",free_chlorine:"Freies Chlor",total_chlorine:"Gesamtchlor",pressure:"Sandfilterdruck",sg:"Spezifisches Gewicht",magnesium:"Magnesium",water_level:"Wasserstand",flow_rate:"Durchfluss",uv_radiation:"UV-Strahlung",product_volume:"Produktvolumen",product_weight:"Produktgewicht"},time:{seconds:"gerade erst",minutes:"vor {minutes} Minute{plural}",hours:"vor {hours} Stunde{plural}",days:"vor {days} Tag{plural}"}};var i={state:{1:"Troppo basso",2:"Accettabile basso",3:"Ideale",4:"Ideale",5:"Accettabile alto",6:"Troppo alto"},sensor:{temperature:"Temperatura",temperature_2:"Temperatura 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinità",cya:"Acido cianurico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinità",free_chlorine:"Cloro libero",total_chlorine:"Cloro totale",pressure:"Pressione filtro",sg:"Gravità specifica",magnesium:"Magnesio",water_level:"Livello dell'acqua",flow_rate:"Portata",uv_radiation:"Radiazione UV",product_volume:"Volume prodotto",product_weight:"Peso prodotto"},time:{seconds:"proprio ora",minutes:"{minutes} minuto{plural} fa",hours:"{hours} ora{plural} fa",days:"{days} giorno{plural} fa"}};var s={state:{1:"Te laag",2:"Acceptabel laag",3:"Ideaal",4:"Ideaal",5:"Acceptabel hoog",6:"Te hoog"},sensor:{temperature:"Temperatuur",temperature_2:"Temperatuur 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Zoutgehalte",cya:"Cyanuurzuur",calcium:"Calcium",phosphate:"Fosfaat",alkalinity:"Alkaliteit",free_chlorine:"Vrij chloor",total_chlorine:"Totaal chloor",pressure:"Filterdruk",sg:"Soortelijk gewicht",magnesium:"Magnesium",water_level:"Waterniveau",flow_rate:"Debiet",uv_radiation:"UV-straling",product_volume:"Productvolume",product_weight:"Productgewicht"},time:{seconds:"zojuist",minutes:"{minutes} minuut{plural} geleden",hours:"{hours} uur{plural} geleden",days:"{days} dag{plural} geleden"}};var l={state:{1:"Muito Baixo",2:"Torelavel mas Baixo",3:"Ideal",4:"Ideal",5:"Toleravel mas Alto",6:"Muito Alto"},sensor:{temperature:"Temperatura",temperature_2:"Temperatura 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidade",cya:"Ácido cianúrico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidade",free_chlorine:"Cloro livres",total_chlorine:"Cloro total",pressure:"Pressão do filtro",sg:"Gravidade específica",magnesium:"Magnésio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiação UV",product_volume:"Volume Produto",product_weight:"Peso Produto"},time:{seconds:"Agora",minutes:"{minutes} Muntos{plural} atrás",hours:"{hours} horas{plural} atrás",days:"{days} dias{plural} atrás"}};var n={state:{1:"Muito Baixo",2:"Aceitavel Baixo",3:"Ideal",4:"Ideal",5:"Aceitavel Alto",6:"Muito Alto"},sensor:{temperature:"Temperatura",temperature_2:"Temperatura 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidade",cya:"Acido Cianurico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidade",free_chlorine:"Cloro Livre",total_chlorine:"Cloro Total",pressure:"Pressão no Filtro",sg:"Gravidade específica",magnesium:"Magnésio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiação UV",product_volume:"Volume Produto",product_weight:"Peso Produto"},time:{seconds:"Agora mesmo",minutes:"{minutes} minutos{plural} atras",hours:"{hours} horas{plural} atras",days:"{days} Dias{plural} atras"}};var c={state:{1:"Prea mic",2:"Mic",3:"Ideal",4:"Ideal",5:"Mare",6:"Prea mare"},sensor:{temperature:"Temperatură",temperature_2:"Temperatură 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinitate",cya:"Acid cianuric",calcium:"Calciu",phosphate:"Fosfat",alkalinity:"Alcalinitate",free_chlorine:"Clor liber",total_chlorine:"Clor total",pressure:"Presiune filtru",sg:"Greutate specifică",magnesium:"Magneziu",water_level:"Nivel apă",flow_rate:"Debit",uv_radiation:"Radiație UV",product_volume:"Volum produs",product_weight:"Greutate produs"},time:{seconds:"acum",minutes:"acum {minutes} minut{plural}",hours:"acum {hours} oră{plural}",days:"acum {days} zi{plural}"}};var d={state:{1:"Príliš nízky",2:"Akceptovateľne nízky",3:"Ideálny",4:"Ideálny",5:"Akceptovateľne vysoký",6:"Príliš vysoký"},sensor:{temperature:"Teplota",temperature_2:"Teplota 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinita",cya:"Kyselina kyanurová",calcium:"Vápnik",phosphate:"Fosfát",alkalinity:"Alkalinita",free_chlorine:"Voľný chlór",total_chlorine:"Celkový chlór",pressure:"Tlak filtra",sg:"Špecifická hmotnosť",magnesium:"Magnézium",water_level:"Úroveň vody",flow_rate:"Prietok",uv_radiation:"UV žiarenie",product_volume:"Objem produktu",product_weight:"Hmotnosť produktu"},time:{seconds:"práve teraz",minutes:"{minutes} minút{plural} pred",hours:"{hours} hodín{plural} pred",days:"{days} dní{plural} pred"}};var p={state:{1:"נמוך מדי",2:"נמוך מאוד",3:"אידיאלי",4:"אידיאלי",5:"גבוה מאוד",6:"גבוה מדי"},sensor:{temperature:"טמפרטורה",temperature_2:"טמפרטורה 2",ph:"PH",orp:"ORP",tds:"TDS",salinity:"מליחות",cya:"חומצה ציאנורית",calcium:"סידן",phosphate:"פוספט",alkalinity:"אלקליניות",free_chlorine:"כלור חופשי",total_chlorine:"כלור כולל",pressure:"לחץ מסנן",sg:"משקל סגולי",magnesium:"מגנזיום",water_level:"מפלס מים",flow_rate:"קצב זרימה",uv_radiation:"קרינת UV",product_volume:"נפח מוצר",product_weight:"משקל מוצר"},time:{seconds:"הרגע",minutes:"לפני {minutes} דקות",hours:"לפני {hours} שעות",days:"לפני {days} ימים"}};var u={state:{1:"Слишком низкий",2:"Приемлемо низкий",3:"Идеальный",4:"Идеальный",5:"Приемлемо высокий",6:"Слишком высокий"},sensor:{temperature:"Температура",temperature_2:"Температура 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Соленость",cya:"Циануровая кислота",calcium:"Кальций",phosphate:"Фосфаты",alkalinity:"Щелочность",free_chlorine:"Свободный хлор",total_chlorine:"Общий хлор",pressure:"Давление фильтра",sg:"Удельный вес",magnesium:"Магний",water_level:"Уровень воды",flow_rate:"Расход воды",uv_radiation:"УФ-излучение",product_volume:"Объем продукта",product_weight:"Вес продукта"},time:{seconds:"{seconds} секунд{plural}",minutes:"{minutes} минут{plural} назад",hours:"{hours} часов{plural} назад",days:"{days} дней{plural} назад"}};const m={en:e,fr:o,es:r,de:a,it:i,nl:s,pt:l,"pt-br":n,ro:c,sk:d,he:p,ru:u};const getTranslation=(e,o)=>{const r=o.split(".");let a=m[e]||m.en;for(const e of r)if(a&&typeof a==="object")a=a[e];else return o;return a||o};const formatTranslation=(e,o)=>{if(!o)return e;return Object.entries(o).reduce(((e,[o,r])=>e.replace(`{${o}}`,r)),e)};const g="2.0.0-Alpha";const h="2024-11-24-16-59";const v=`${g} (${h})`;const y={cardType:"pool-monitor-card",cardName:"Pool Monitor Card",cardDescription:'The "Pool Monitor Card" is a home assistant plugin that provides information about the temperature, pH, and ORP levels of your swimming pool'};const _=["temperature","orp","tds","ph","salinity","cya","calcium","phosphate","alkalinity","free_chlorine","total_chlorine","pressure","sg","magnesium","water_level","flow_rate","uv_radiation","product_volume","product_weight"];const x={title:"color: white; background: green; font-weight: 700;",version:"color: green; background: white; font-weight: 700;"};var f=f||Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));var w=f.prototype.css;const b=w`
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
    padding:15px;
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
    grid-template-columns: repeat(5,2fr) 1fr;
    padding-top: 0px;
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
    width: 70px;
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
    font-size:13px;
    font-weight: 600;
    color: black;
    position: absolute;
    z-index: 1;
  }

  .cursor-text{
    width: 150px;
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
    position: absolute;
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
`;var $=$||Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));var k=$.prototype.html;class cardContent{static generateTitle(e){const o=e.title!==void 0?k`
      <h1 class="pool-monitor-title">${e.title}</h1>
    `:k``;return k`${o}`}static generateBody(e,o){console.log("Data:",o);return k`
      <!-- ##### ${o.name} section ##### -->    
      <div class="section" @click=${()=>this._moreinfo(o.entity)}>   
        <div class="pool-monitor-container-marker">
          <div class="marker" style="background-color: ${o.color} ;color: black;left: ${o.pct_marker}%;">${o.value} ${o.unit}</div>
          <div class="marker-state" style="padding-${o.side_align}:40px;text-align:${o.side_align};background-color:transparent ;${o.side_align}: ${o.pct_state_step}%;">${o.state}</div>
          <div class="triangle" style="border-top: 10px solid ${o.color} ;left: ${o.pct-1}%;"></div>
        </div>
        ${!o.hide_icon?k`
          <div class="pool-monitor-entity-img">
            ${o.is_mdi?k`
              <ha-icon icon="${o.mdi_icon}" style="width: 32px; height: 32px;"></ha-icon>
            `:k`
              <img src="${o.img_src}" style="width: 32px; height: 32px;">
            `}
          </div>
        `:""}
        <div class="pool-monitor-container">
          ${e.display.gradient?k`
            <div class="progress-bar-child" style="background: linear-gradient(to right, 
              ${e.colors.warn} 5%, 
              ${e.colors.low} 30%, 
              ${e.colors.normal}, 
              ${e.colors.normal}, 
              ${e.colors.low} 70%, 
              ${e.colors.warn} 95%
            );"></div>
          `:k`
            <div style="background-color: ${e.colors.warn}; grid-column: 2 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> </div>
            <div style="background-color: ${e.colors.low}; grid-column: 3 ;" class="grid-item item-row"></div>
            <div style="background-color: ${e.colors.normal}; grid-column: 4 ;" class="grid-item item-row"></div>  
            <div style="background-color: ${e.colors.normal}; grid-column: 5 ;" class="grid-item item-row"></div>  
            <div style="background-color: ${e.colors.low}; grid-column: 6 ;" class="grid-item item-row"></div>
            <div style="background-color: ${e.colors.warn}; grid-column: 7 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
            ${o.pct_min!==o.pct_cursor?k`<div class="cursor-text" style="border-${o.side_align}: 5px solid ${e.colors.hi_low}; text-align:${o.side_align};background-color:transparent ;${o.side_align}: ${o.pct_min}%;"></div>`:""}
            ${o.pct_max!==o.pct_cursor?k`<div class="cursor-text" style="border-${o.side_align}: 5px solid ${e.colors.hi_low}; text-align:${o.side_align};background-color:transparent ;${o.side_align}: ${o.pct_max}%;"></div>`:""}
          `}
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
      <div style="position: relative;top:-25px;margin-bottom:-25px;text-align:left;left:15px;">${o.title}<br/><small style="position: relative;top:-5px;font-size:9px;color:lightgrey">${o.last_updated}</small></div>
    `}static generateCompactBody(e,o){return k`
      <!-- ##### ${o.name} section ##### -->    
      <div class="section-compact" @click=${()=>this._moreinfo(o.entity)}>   
        ${!o.hide_icon?k`
          <div class="pool-monitor-entity-img">
            ${o.is_mdi?k`
              <ha-icon icon="${o.mdi_icon}" style="width: 24px; height: 24px;"></ha-icon>
            `:k`
              <img src="${o.img_src}" style="width: 24px; height: 24px;">
            `}
          </div>
        `:""}
        <div class="pool-monitor-container">
          ${e.display.gradient?k`
            <div class="progress-bar-child" style="background: linear-gradient(to right, 
              ${e.colors.warn} 5%, 
              ${e.colors.low} 30%, 
              ${e.colors.normal}, 
              ${e.colors.normal}, 
              ${e.colors.low} 70%, 
              ${e.colors.warn} 95%
            );"></div>
          `:k`
            <!-- <div style="background-color: transparent; grid-column: 1 ; border: 0px; box-shadow:none" class="grid-item item-row"> <div style="font-size: 0.8em;color:lightgrey;text-align:left;margin:3px 2px 0 0 ">${o.unit}</div></div> -->
            <div style="background-color: ${e.colors.warn}; grid-column: 2 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> </div>
            <div style="background-color: ${e.colors.low}; grid-column: 3 ;" class="grid-item item-row"></div>
            <div style="background-color: ${e.colors.normal}; grid-column: 4 ;" class="grid-item item-row"></div>  
            <div style="background-color: ${e.colors.normal}; grid-column: 5 ;" class="grid-item item-row"></div>  
            <div style="background-color: ${e.colors.low}; grid-column: 6 ;" class="grid-item item-row"></div>
            <div style="background-color: ${e.colors.warn}; grid-column: 7 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
          `}
          <div class="cursor-text" style="border-${o.side_align}: 5px solid ${e.marker}; text-align:${o.side_align};background-color:transparent ;${o.side_align}: ${o.pct_cursor}%;">${o.value} ${o.unit} ${o.separator} ${o.state}</div>
          ${o.pct_min!==o.pct_cursor?k`<div class="cursor-text" style="border-${o.side_align}: 5px solid ${e.colors.hi_low}; text-align:${o.side_align};background-color:transparent ;${o.side_align}: ${o.pct_min}%;"></div>`:""}
          ${o.pct_max!==o.pct_cursor?k`<div class="cursor-text" style="border-${o.side_align}: 5px solid ${e.colors.hi_low}; text-align:${o.side_align};background-color:transparent ;${o.side_align}: ${o.pct_max}%;"></div>`:""}
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
      <div style="position: relative;margin-top:-21px;text-align:left;left:-30px;font-size:9px;padding-bottom: 5px;">${o.title}</div>
    `}static _moreinfo(e){const o=new Event("hass-more-info",{bubbles:true,composed:true});o.detail={entityId:e};document.querySelector("home-assistant").dispatchEvent(o)}}const T={display:{compact:false,show_names:true,show_labels:true,show_last_updated:false,show_icons:true,show_units:true,gradient:true,language:"en"},colors:{mode:"centric",normal:"#00b894",low:"#fdcb6e",warn:"#e17055",marker:"#000000",hi_low:"#00000099"},sensors:{temperature:{name:"Temperature",entity:"sensor.pool_temperature",unit:"°C",setpoint:27,step:1},orp:{name:"ORP",entity:"sensor.pool_orp",unit:"mV",setpoint:700,step:50},tds:{name:"TDS",entity:"sensor.pool_tds",unit:"g/L",setpoint:4,step:1},ph:{name:"pH",entity:"sensor.pool_ph",unit:"pH",setpoint:7.2,step:.2},salinity:{name:"Salinity",entity:"sensor.pool_salinity",unit:"ppm",setpoint:3e3,step:500},cya:{name:"Cyanuric Acid",entity:"sensor.pool_cya",unit:"ppm",setpoint:40,step:10},calcium:{name:"Calcium",entity:"sensor.pool_calcium",unit:"ppm",setpoint:300,step:100},phosphate:{name:"Phosphate",entity:"sensor.pool_phosphate",unit:"ppb",setpoint:100,step:100},alkalinity:{name:"Alkalinity",entity:"sensor.pool_alkalinity",unit:"ppm",setpoint:100,step:20},free_chlorine:{name:"Free Chlorine",entity:"sensor.pool_free_chlorine",unit:"ppm",setpoint:3,step:.5}}};const getSensorConfig=e=>T.sensors[e];const getDisplayConfig=()=>T.display;const getColorConfig=()=>T.colors;var P=P||Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));var C=P.prototype.html;console.info(`%c POOL-MONITORING-CARD %c ${v} `,x.title,x.version);class PoolMonitorCard extends P{static cardType=y.cardType;static cardName=y.cardName;static cardDescription=y.cardDescription;static get properties(){return{hass:{},config:{}}}static styles=b;constructor(){super()}render(){const e=this.getConfig();const o=this.processData();const r=e.display.compact?cardContent.generateCompactBody:cardContent.generateBody;if(!o||Object.keys(o).length===0)return C`
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
            `;return r(e,o)}))}
      </div>`}processData(){const e={};const o=this.getConfig();Object.entries(o.sensors).forEach((([o,r])=>{const a=Array.isArray(r)?r:[r];a.forEach(((r,a)=>{console.log(`Processing sensor: ${o}`,r);const i=`${o}_${a+1}`;e[i]=this.calculateData(o,r.name||`${o} ${a+1}`,r.entity,r.min,r.max,r.setpoint,r.step,r.unit,r.icon,r.image_url,r.override_value,r.override,r.invalid)}))}));return e}getTranslatedText(e,o){const r=this.config?.language||"en";const a=getTranslation(r,e);return formatTranslation(a,o)}calculateData(e,o,r,a,i,s,l,n,c,d,p,u,m){const g={};const h=this.getConfig();const v=getSensorConfig(e)||{};g.name=e;g.invalid=m;g.title=h.display.show_names?o:C`&nbsp;`;if(!h.display.show_icons)g.hide_icon=true;else{const o=c||"";const r=d||"";if(o==="hide")g.hide_icon=true;else if(r){g.is_mdi=false;g.img_src=r}else if(o&&typeof o==="string"&&o.startsWith("mdi:")){g.is_mdi=true;g.mdi_icon=o}else g.img_src=`https://raw.githubusercontent.com/wilsto/pool-monitor-card/master/resources/${e}.png`}if(!this.hass||!this.hass.states||!this.hass.states[r]){console.warn(`Entity not found: ${r}`);g.value=null;g.entity=r;return g}g.value=parseFloat(this.hass.states[r].state);g.entity=r;if(h.display.show_last_updated)g.last_updated=this.timeFromNow(this.hass.states[r].last_updated);g.unit=h.display.show_units?n||v.unit||"":"";if(u)g.value=p||v.override;g.min_value=a!==void 0&&this.hass.states[a]&&!isNaN(parseFloat(this.hass.states[a].state))?parseFloat(this.hass.states[a].state):g.value;g.max_value=i!==void 0&&this.hass.states[i]&&!isNaN(parseFloat(this.hass.states[i].state))?parseFloat(this.hass.states[i].state):g.value;s=s!==void 0?parseFloat(s):v.setpoint!==void 0?parseFloat(v.setpoint):g.value;l=l!==void 0?parseFloat(l):v.step!==void 0?parseFloat(v.step):.1;const y=Math.max(this.countDecimals(s),this.countDecimals(l));if(g.value)g.value=parseFloat(this.hass.states[r].state);g.setpoint=s;g.setpoint_class=[(s-2*l).toFixed(y),(s-l).toFixed(y),s.toFixed(y),(s+l).toFixed(y),(s+2*l).toFixed(y)];g.separator=h.show_labels?"-":"";g.color="transparent";if(Number(g.value)<Number(g.setpoint_class[0])){g.state=h.show_labels?this.getTranslatedText("state.1"):"";g.color=h.colors.warn}else if(Number(g.value)>=Number(g.setpoint_class[0])&&Number(g.value)<Number(g.setpoint_class[1])){g.state=h.show_labels?this.getTranslatedText("state.2"):"";g.color=h.colors.low}else if(Number(g.value)>=Number(g.setpoint_class[1])&&Number(g.value)<Number(g.setpoint_class[2])){g.state=h.show_labels?this.getTranslatedText("state.3"):"";g.color=h.colors.normal}else if(Number(g.value)>=Number(g.setpoint_class[2])&&Number(g.value)<Number(g.setpoint_class[3])){g.state=h.show_labels?this.getTranslatedText("state.4"):"";g.color=h.colors.normal}else if(Number(g.value)>=Number(g.setpoint_class[3])&&Number(g.value)<Number(g.setpoint_class[4])){g.state=h.show_labels?this.getTranslatedText("state.5"):"";g.color=h.colors.low}else if(Number(g.value)>=Number(g.setpoint_class[4])){g.state=h.show_labels?this.getTranslatedText("state.6"):"";g.color=h.colors.warn}g.progressClass=e==="temperature"?"progress-temp":"progress";g.pct=Math.max(0,Math.min(98.5,Math.max(0,g.value-(s-3*l))/(6*l)*.85*100+13)).toFixed(0);g.pct_min=Math.max(0,Math.min(98.5,Math.max(0,g.min_value-(s-3*l))/(6*l)*.85*100+13)).toFixed(0);g.pct_max=Math.max(0,Math.min(98.5,Math.max(0,g.max_value-(s-3*l))/(6*l)*.85*100+13)).toFixed(0);g.pct_marker=g.value>g.setpoint?g.pct-13:g.pct-5;g.side_align=g.value>s?"right":"left";g.pct_cursor=g.value>s?100-parseFloat(g.pct):parseFloat(g.pct)-2;g.pct_state_step=g.value>s?105-parseFloat(g.pct):parseFloat(g.pct)+5;g.pct_min=g.value>s?100-parseFloat(g.pct_min):parseFloat(g.pct_min)-2;g.pct_max=g.value>s?100-parseFloat(g.pct_max):parseFloat(g.pct_max)-2;return g}countDecimals(e){if(e===void 0||e===null)return 0;if(Math.floor(e)===e)return 0;const o=e.toString();if(o.includes("."))return o.split(".")[1].length||0;return 0}timeFromNow(e){const o=new Date(e);const r=Date.now()-o.getTime();const t=(e,o)=>{let r=o==1?"":"s";let a=this.getTranslatedText(`time.${e}`);a=a.replace("{"+e+"}",o);a=a.replace("{plural}",r);return a};const a=Math.floor(r/6e4);const i=Math.floor(a/60);const s=Math.floor(i/24);if(a<1)return t("seconds",0);if(a<60)return t("minutes",a);if(i<24)return t("hours",i);return t("days",s)}getConfig(){return this.config}setConfig(e){const o={display:getDisplayConfig(),colors:getColorConfig()};const r={...e,display:{...o.display,...e.display||{}},colors:{...o.colors,...e.colors||{}},sensors:{}};if(!e.sensors){console.warn(`Legacy configuration detected, please move sensors under "sensors" key`,{config:e});throw new Error('Legacy configuration detected. Please update your setup to define all sensors under the "sensors" key as required by the version 2.0 of the card.')}Object.entries(e.sensors).forEach((([o,a])=>{const i=getSensorConfig(o);if(!_.includes(o))console.warn(`Unsupported sensor type: ${o}`,{sensorType:o,supportedSensors:_,config:e,sensorConfig:a});const s=Array.isArray(a)?[...a]:[{...a}];if(s.length===0)throw new Error(`Empty sensor array for ${o}`);const l=s.map((e=>({...i,...e})));l.forEach(((e,r)=>{if(!e.entity)throw new Error(`Missing entity for ${o}[${r}]`)}));r.sensors[o]=l}));this.config=r}static _moreinfo(e){const o=new Event("hass-more-info",{bubbles:true,cancelable:false,composed:true});o.detail={entityId:e};document.querySelector("home-assistant").dispatchEvent(o)}}customElements.define("pool-monitor-card",PoolMonitorCard)})();
//# sourceMappingURL=pool-monitor-card.js.map

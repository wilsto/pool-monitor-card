(function(){"use strict";var e={state:{1:"Too Low",2:"Acceptable Low",3:"Ideal",4:"Ideal",5:"Acceptable High",6:"Too High"},sensor:{temperature:"Temperature",temperature_2:"Temperature 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinity",cya:"Cyanuric Acid",calcium:"Calcium",phosphate:"Phosphate",alkalinity:"Alkalinity",free_chlorine:"Free Chlorine",total_chlorine:"Total Chlorine",pressure:"Filter Pressure",sg:"Specific Gravity",magnesium:"Magnesium",water_level:"Water Level",flow_rate:"Flow Rate",uv_radiation:"UV Radiation",product_volume:"Product Volume",product_weight:"Product Weight"},time:{seconds:"just now",minutes:"{minutes} minute{plural} ago",hours:"{hours} hour{plural} ago",days:"{days} day{plural} ago"}};var i={state:{1:"Trop bas",2:"Acceptable bas",3:"Idéal",4:"Idéal",5:"Acceptable élevé",6:"Trop élevé"},sensor:{temperature:"Température",temperature_2:"Température 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinité",cya:"Acide cyanurique",calcium:"Calcium",phosphate:"Phosphate",alkalinity:"Alcalinité",free_chlorine:"Chlore libre",total_chlorine:"Chlore total",pressure:"Pression du filtre",sg:"Densité spécifique",magnesium:"Magnésium",water_level:"Niveau d'eau",flow_rate:"Débit",uv_radiation:"Radiation UV",product_volume:"Volume Produit",product_weight:"Poids Produit"},time:{seconds:"il y a {seconds} seconde{plural}",minutes:"il y a {minutes} minute{plural}",hours:"il y a {hours} heure{plural}",days:"il y a {days} jour{plural}"}};var a={state:{1:"Demasiado bajo",2:"Aceptable bajo",3:"Perfecto",4:"Perfecto",5:"Aceptable alto",6:"Demasiado alto"},sensor:{temperature:"Temperatura",temperature_2:"Temperatura 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidad",cya:"Acido cianúrico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidad",free_chlorine:"Cloro libre",total_chlorine:"Cloro total",pressure:"Pressione du filter relativa",sg:"Densidad relativa",magnesium:"Magnesio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiación UV",product_volume:"Volumen Producto",product_weight:"Peso Producto"},time:{seconds:"justo ahora",minutes:"hace {minutes} minuto{plural}",hours:"hace {hours} hora{plural}",days:"hace {days} día{plural}"}};var r={state:{1:"Zu niedrig",2:"Akzeptabler Tiefstwert",3:"Ideal",4:"Ideal",5:"Akzeptabler Hochwert",6:"Zu hoch"},sensor:{temperature:"Temperatur",temperature_2:"Temperatur 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salzgehalt",cya:"Cyanursäure",calcium:"Kalzium",phosphate:"Phosphat",alkalinity:"Alkalinität",free_chlorine:"Freies Chlor",total_chlorine:"Gesamtchlor",pressure:"Sandfilterdruck",sg:"Spezifisches Gewicht",magnesium:"Magnesium",water_level:"Wasserstand",flow_rate:"Durchfluss",uv_radiation:"UV-Strahlung",product_volume:"Produktvolumen",product_weight:"Produktgewicht"},time:{seconds:"gerade erst",minutes:"vor {minutes} Minute{plural}",hours:"vor {hours} Stunde{plural}",days:"vor {days} Tag{plural}"}};var o={state:{1:"Troppo basso",2:"Accettabile basso",3:"Ideale",4:"Ideale",5:"Accettabile alto",6:"Troppo alto"},sensor:{temperature:"Temperatura",temperature_2:"Temperatura 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinità",cya:"Acido cianurico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinità",free_chlorine:"Cloro libero",total_chlorine:"Cloro totale",pressure:"Pressione filtro",sg:"Gravità specifica",magnesium:"Magnesio",water_level:"Livello dell'acqua",flow_rate:"Portata",uv_radiation:"Radiazione UV",product_volume:"Volume prodotto",product_weight:"Peso prodotto"},time:{seconds:"proprio ora",minutes:"{minutes} minuto{plural} fa",hours:"{hours} ora{plural} fa",days:"{days} giorno{plural} fa"}};var s={state:{1:"Te laag",2:"Acceptabel laag",3:"Ideaal",4:"Ideaal",5:"Acceptabel hoog",6:"Te hoog"},sensor:{temperature:"Temperatuur",temperature_2:"Temperatuur 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Zoutgehalte",cya:"Cyanuurzuur",calcium:"Calcium",phosphate:"Fosfaat",alkalinity:"Alkaliteit",free_chlorine:"Vrij chloor",total_chlorine:"Totaal chloor",pressure:"Filterdruk",sg:"Soortelijk gewicht",magnesium:"Magnesium",water_level:"Waterniveau",flow_rate:"Debiet",uv_radiation:"UV-straling",product_volume:"Productvolume",product_weight:"Productgewicht"},time:{seconds:"zojuist",minutes:"{minutes} minuut{plural} geleden",hours:"{hours} uur{plural} geleden",days:"{days} dag{plural} geleden"}};var n={state:{1:"Muito Baixo",2:"Torelavel mas Baixo",3:"Ideal",4:"Ideal",5:"Toleravel mas Alto",6:"Muito Alto"},sensor:{temperature:"Temperatura",temperature_2:"Temperatura 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidade",cya:"Ácido cianúrico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidade",free_chlorine:"Cloro livres",total_chlorine:"Cloro total",pressure:"Pressão do filtro",sg:"Gravidade específica",magnesium:"Magnésio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiação UV",product_volume:"Volume Produto",product_weight:"Peso Produto"},time:{seconds:"Agora",minutes:"{minutes} Muntos{plural} atrás",hours:"{hours} horas{plural} atrás",days:"{days} dias{plural} atrás"}};var l={state:{1:"Muito Baixo",2:"Aceitavel Baixo",3:"Ideal",4:"Ideal",5:"Aceitavel Alto",6:"Muito Alto"},sensor:{temperature:"Temperatura",temperature_2:"Temperatura 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidade",cya:"Acido Cianurico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidade",free_chlorine:"Cloro Livre",total_chlorine:"Cloro Total",pressure:"Pressão no Filtro",sg:"Gravidade específica",magnesium:"Magnésio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiação UV",product_volume:"Volume Produto",product_weight:"Peso Produto"},time:{seconds:"Agora mesmo",minutes:"{minutes} minutos{plural} atras",hours:"{hours} horas{plural} atras",days:"{days} Dias{plural} atras"}};var c={state:{1:"Prea mic",2:"Mic",3:"Ideal",4:"Ideal",5:"Mare",6:"Prea mare"},sensor:{temperature:"Temperatură",temperature_2:"Temperatură 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinitate",cya:"Acid cianuric",calcium:"Calciu",phosphate:"Fosfat",alkalinity:"Alcalinitate",free_chlorine:"Clor liber",total_chlorine:"Clor total",pressure:"Presiune filtru",sg:"Greutate specifică",magnesium:"Magneziu",water_level:"Nivel apă",flow_rate:"Debit",uv_radiation:"Radiație UV",product_volume:"Volum produs",product_weight:"Greutate produs"},time:{seconds:"acum",minutes:"acum {minutes} minut{plural}",hours:"acum {hours} oră{plural}",days:"acum {days} zi{plural}"}};var p={state:{1:"Príliš nízky",2:"Akceptovateľne nízky",3:"Ideálny",4:"Ideálny",5:"Akceptovateľne vysoký",6:"Príliš vysoký"},sensor:{temperature:"Teplota",temperature_2:"Teplota 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinita",cya:"Kyselina kyanurová",calcium:"Vápnik",phosphate:"Fosfát",alkalinity:"Alkalinita",free_chlorine:"Voľný chlór",total_chlorine:"Celkový chlór",pressure:"Tlak filtra",sg:"Špecifická hmotnosť",magnesium:"Magnézium",water_level:"Úroveň vody",flow_rate:"Prietok",uv_radiation:"UV žiarenie",product_volume:"Objem produktu",product_weight:"Hmotnosť produktu"},time:{seconds:"práve teraz",minutes:"{minutes} minút{plural} pred",hours:"{hours} hodín{plural} pred",days:"{days} dní{plural} pred"}};var d={state:{1:"נמוך מדי",2:"נמוך מאוד",3:"אידיאלי",4:"אידיאלי",5:"גבוה מאוד",6:"גבוה מדי"},sensor:{temperature:"טמפרטורה",temperature_2:"טמפרטורה 2",ph:"PH",orp:"ORP",tds:"TDS",salinity:"מליחות",cya:"חומצה ציאנורית",calcium:"סידן",phosphate:"פוספט",alkalinity:"אלקליניות",free_chlorine:"כלור חופשי",total_chlorine:"כלור כולל",pressure:"לחץ מסנן",sg:"משקל סגולי",magnesium:"מגנזיום",water_level:"מפלס מים",flow_rate:"קצב זרימה",uv_radiation:"קרינת UV",product_volume:"נפח מוצר",product_weight:"משקל מוצר"},time:{seconds:"הרגע",minutes:"לפני {minutes} דקות",hours:"לפני {hours} שעות",days:"לפני {days} ימים"}};var u={state:{1:"Слишком низкий",2:"Приемлемо низкий",3:"Идеальный",4:"Идеальный",5:"Приемлемо высокий",6:"Слишком высокий"},sensor:{temperature:"Температура",temperature_2:"Температура 2",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Соленость",cya:"Циануровая кислота",calcium:"Кальций",phosphate:"Фосфаты",alkalinity:"Щелочность",free_chlorine:"Свободный хлор",total_chlorine:"Общий хлор",pressure:"Давление фильтра",sg:"Удельный вес",magnesium:"Магний",water_level:"Уровень воды",flow_rate:"Расход воды",uv_radiation:"УФ-излучение",product_volume:"Объем продукта",product_weight:"Вес продукта"},time:{seconds:"{seconds} секунд{plural}",minutes:"{minutes} минут{plural} назад",hours:"{hours} часов{plural} назад",days:"{days} дней{plural} назад"}};const _={en:e,fr:i,es:a,de:r,it:o,nl:s,pt:n,"pt-br":l,ro:c,sk:p,he:d,ru:u};const getTranslation=(e,i)=>{const a=i.split(".");let r=_[e]||_.en;for(const e of a)if(r&&typeof r==="object")r=r[e];else return i;return r||i};const formatTranslation=(e,i)=>{if(!i)return e;return Object.entries(i).reduce(((e,[i,a])=>e.replace(`{${i}}`,a)),e)};const m="1.10.0";const h="2024-11-23-13-17";const g=`${m} (${h})`;const v={cardType:"pool-monitor-card",cardName:"Pool Monitor Card",cardDescription:'The "Pool Monitor Card" is a home assistant plugin that provides information about the temperature, pH, and ORP levels of your swimming pool'};const f={title:"color: white; background: green; font-weight: 700;",version:"color: green; background: white; font-weight: 700;"};var y=y||Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));var x=y.prototype.css;const w=x`
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

  .progress {
    background: linear-gradient(to right, #e17055 5%, #fdcb6e 30%, #00b894, #00b894, #fdcb6e 70%, #e17055 95%);
  }

  .progress-temp {
    background: linear-gradient(to right, #69AEFF 15%,#ffdb3a 30%, #ffdb3a 60%, #e5405e 95%);
  }

  .progress-bar-child {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
`;var b=b||Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));var $=b.prototype.html;class cardContent{static generateTitle(e){const i=e.title!==void 0?$`
      <h1 class="pool-monitor-title">${e.title}</h1>
    `:$``;return $`${i}`}static generateBody(e,i){return $`
      <!-- ##### ${i.name} section ##### -->    
      <div class="section" @click=${()=>this._moreinfo(i.entity)}>   
        <div class="pool-monitor-container-marker">
          <div class="marker" style="background-color: ${i.color} ;color: black;left: ${i.pct_marker}%;">${i.value} ${i.unit}</div>
          <div class="marker-state" style="padding-${i.side_align}:40px;text-align:${i.side_align};background-color:transparent ;${i.side_align}: ${i.pct_state_step}%;">${i.state}</div>
          <div class="triangle" style="border-top: 10px solid ${i.color} ;left: ${i.pct-1}%;"></div>
        </div>
        ${!i.hide_icon?$`
          <div class="pool-monitor-entity-img">
            ${i.is_mdi?$`
              <ha-icon icon="${i.mdi_icon}" style="width: 32px; height: 32px;"></ha-icon>
            `:$`
              <img src="${i.img_src}" style="width: 32px; height: 32px;">
            `}
          </div>
        `:""}
        <div class="pool-monitor-container">
          ${e.gradient?$`
            <div class="progress-bar-child ${i.progressClass}"></div>
          `:$`
            <div style="background-color: ${e.warn_color}; grid-column: 2 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> </div>
            <div style="background-color: ${e.low_color}; grid-column: 3 ;" class="grid-item item-row"></div>
            <div style="background-color: ${e.normal_color}; grid-column: 4 ;" class="grid-item item-row"></div>  
            <div style="background-color: ${e.normal_color}; grid-column: 5 ;" class="grid-item item-row"></div>  
            <div style="background-color: ${e.low_color}; grid-column: 6 ;" class="grid-item item-row"></div>
            <div style="background-color: ${e.warn_color}; grid-column: 7 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
            ${i.pct_min!==i.pct_cursor?$`<div class="cursor-text" style="border-${i.side_align}: 5px solid ${e.hi_low_color}; text-align:${i.side_align};background-color:transparent ;${i.side_align}: ${i.pct_min}%;"></div>`:""}
            ${i.pct_max!==i.pct_cursor?$`<div class="cursor-text" style="border-${i.side_align}: 5px solid ${e.hi_low_color}; text-align:${i.side_align};background-color:transparent ;${i.side_align}: ${i.pct_max}%;"></div>`:""}
          `}
        </div>
        <div class="pool-monitor-container-values">
          <div style="background-color: transparent; grid-column: 1 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${i.setpoint_class[0]}</div></div>
          <div style="background-color: transparent; grid-column: 2 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${i.setpoint_class[1]}</div></div>
          <div style="background-color: transparent; grid-column: 3 ;" class="grid-item item-row"><div style="font-size: 0.8em;color:${e.normal_color};text-align:right;margin:-5px 2px 0 0 ">${i.setpoint_class[2]}</div></div>  
          <div style="background-color: transparent; grid-column: 4 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${i.setpoint_class[3]}</div></div>  
          <div style="background-color: transparent; grid-column: 5 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${i.setpoint_class[4]}</div></div>
          <div style="background-color: transparent; grid-column: 6 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
        </div> 
      </div> 
      <div style="position: relative;top:-25px;margin-bottom:-25px;text-align:left;left:15px;">${i.title}<br/><small style="position: relative;top:-5px;font-size:9px;color:lightgrey">${i.last_updated}</small></div>
    `}static generateCompactBody(e,i){return $`
      <!-- ##### ${i.name} section ##### -->    
      <div class="section-compact" @click=${()=>this._moreinfo(i.entity)}>   
        ${!i.hide_icon?$`
          <div class="pool-monitor-entity-img">
            ${i.is_mdi?$`
              <ha-icon icon="${i.mdi_icon}" style="width: 24px; height: 24px;"></ha-icon>
            `:$`
              <img src="${i.img_src}" style="width: 24px; height: 24px;">
            `}
          </div>
        `:""}
        <div class="pool-monitor-container">
          ${e.gradient?$`
            <div class="progress-bar-child ${i.progressClass}"></div>
          `:$`
            <!-- <div style="background-color: transparent; grid-column: 1 ; border: 0px; box-shadow:none" class="grid-item item-row"> <div style="font-size: 0.8em;color:lightgrey;text-align:left;margin:3px 2px 0 0 ">${i.unit}</div></div> -->
            <div style="background-color: ${e.warn_color}; grid-column: 2 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> </div>
            <div style="background-color: ${e.low_color}; grid-column: 3 ;" class="grid-item item-row"></div>
            <div style="background-color: ${e.normal_color}; grid-column: 4 ;" class="grid-item item-row"></div>  
            <div style="background-color: ${e.normal_color}; grid-column: 5 ;" class="grid-item item-row"></div>  
            <div style="background-color: ${e.low_color}; grid-column: 6 ;" class="grid-item item-row"></div>
            <div style="background-color: ${e.warn_color}; grid-column: 7 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
          `}
          <div class="cursor-text" style="border-${i.side_align}: 5px solid ${e.marker_color}; text-align:${i.side_align};background-color:transparent ;${i.side_align}: ${i.pct_cursor}%;">${i.value} ${i.unit} ${i.separator} ${i.state}</div>
          ${i.pct_min!==i.pct_cursor?$`<div class="cursor-text" style="border-${i.side_align}: 5px solid ${e.hi_low_color}; text-align:${i.side_align};background-color:transparent ;${i.side_align}: ${i.pct_min}%;"></div>`:""}
          ${i.pct_max!==i.pct_cursor?$`<div class="cursor-text" style="border-${i.side_align}: 5px solid ${e.hi_low_color}; text-align:${i.side_align};background-color:transparent ;${i.side_align}: ${i.pct_max}%;"></div>`:""}
        </div>
        <div class="pool-monitor-container-values">
          <div style="background-color: transparent; grid-column: 1 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${i.setpoint_class[0]}</div></div>
          <div style="background-color: transparent; grid-column: 2 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${i.setpoint_class[1]}</div></div>
          <div style="background-color: transparent; grid-column: 3 ;" class="grid-item item-row"><div style="font-size: 0.8em;color:${e.normal_color};text-align:right;margin:-5px 2px 0 0 ">${i.setpoint_class[2]}</div></div>  
          <div style="background-color: transparent; grid-column: 4 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${i.setpoint_class[3]}</div></div>  
          <div style="background-color: transparent; grid-column: 5 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${i.setpoint_class[4]}</div></div>
          <div style="background-color: transparent; grid-column: 6 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
        </div> 
      </div> 
      <div style="position: relative;margin-top:-21px;text-align:left;left:-30px;font-size:9px;padding-bottom: 5px;">${i.title}</div>
    `}static _moreinfo(e){const i=new Event("hass-more-info",{bubbles:true,composed:true});i.detail={entityId:e};document.querySelector("home-assistant").dispatchEvent(i)}}var k=k||Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));var C=k.prototype.html;console.info(`%c POOL-MONITORING-CARD %c ${g} `,f.title,f.version);class PoolMonitorCard extends k{static cardType=v.cardType;static cardName=v.cardName;static cardDescription=v.cardDescription;static get properties(){return{hass:{},config:{}}}static styles=w;constructor(){super()}render(){const e=this.getConfig();const i=this.processData();if(e.compact)return C`
      <div id="pool-monitor-card">
        ${cardContent.generateTitle(e)}
   
        ${i.temperature!==void 0?cardContent.generateCompactBody(e,i.temperature):""}
        ${i.temperature_2!==void 0?cardContent.generateCompactBody(e,i.temperature_2):""}
        ${i.ph!==void 0?cardContent.generateCompactBody(e,i.ph):""}
        ${i.orp!==void 0?cardContent.generateCompactBody(e,i.orp):""}
        ${i.tds!==void 0?cardContent.generateCompactBody(e,i.tds):""}      
        ${i.salinity!==void 0?cardContent.generateCompactBody(e,i.salinity):""}      
        ${i.cya!==void 0?cardContent.generateCompactBody(e,i.cya):""}      
        ${i.calcium!==void 0?cardContent.generateCompactBody(e,i.calcium):""}      
        ${i.phosphate!==void 0?cardContent.generateCompactBody(e,i.phosphate):""}      
        ${i.alkalinity!==void 0?cardContent.generateCompactBody(e,i.alkalinity):""}      
        ${i.free_chlorine!==void 0?cardContent.generateCompactBody(e,i.free_chlorine):""}      
        ${i.total_chlorine!==void 0?cardContent.generateCompactBody(e,i.total_chlorine):""}      
        ${i.pressure!==void 0?cardContent.generateCompactBody(e,i.pressure):""}      
        ${i.sg!==void 0?cardContent.generateCompactBody(e,i.sg):""}      
        ${i.magnesium!==void 0?cardContent.generateCompactBody(e,i.magnesium):""}
        ${i.water_level!==void 0?cardContent.generateCompactBody(e,i.water_level):""}
        ${i.flow_rate!==void 0?cardContent.generateCompactBody(e,i.flow_rate):""}
        ${i.uv_radiation!==void 0?cardContent.generateCompactBody(e,i.uv_radiation):""}
        ${i.product_volume!==void 0?cardContent.generateCompactBody(e,i.product_volume):""}
        ${i.product_weight!==void 0?cardContent.generateCompactBody(e,i.product_weight):""}
      </div>`;else return C`
      <div id="pool-monitor-card">
        ${cardContent.generateTitle(e)}

        ${i.temperature!==void 0?cardContent.generateBody(e,i.temperature):""}
        ${i.temperature_2!==void 0?cardContent.generateBody(e,i.temperature_2):""}
        ${i.ph!==void 0?cardContent.generateBody(e,i.ph):""}
        ${i.orp!==void 0?cardContent.generateBody(e,i.orp):""}
        ${i.tds!==void 0?cardContent.generateBody(e,i.tds):""}      
        ${i.salinity!==void 0?cardContent.generateBody(e,i.salinity):""}      
        ${i.cya!==void 0?cardContent.generateBody(e,i.cya):""}      
        ${i.calcium!==void 0?cardContent.generateBody(e,i.calcium):""}      
        ${i.phosphate!==void 0?cardContent.generateBody(e,i.phosphate):""}      
        ${i.alkalinity!==void 0?cardContent.generateBody(e,i.alkalinity):""}      
        ${i.free_chlorine!==void 0?cardContent.generateBody(e,i.free_chlorine):""}      
        ${i.total_chlorine!==void 0?cardContent.generateBody(e,i.total_chlorine):""}      
        ${i.pressure!==void 0?cardContent.generateBody(e,i.pressure):""}      
        ${i.sg!==void 0?cardContent.generateBody(e,i.sg):""}
        ${i.magnesium!==void 0?cardContent.generateBody(e,i.magnesium):""}
        ${i.water_level!==void 0?cardContent.generateBody(e,i.water_level):""}
        ${i.flow_rate!==void 0?cardContent.generateBody(e,i.flow_rate):""}
        ${i.uv_radiation!==void 0?cardContent.generateBody(e,i.uv_radiation):""}
        ${i.product_volume!==void 0?cardContent.generateBody(e,i.product_volume):""}
        ${i.product_weight!==void 0?cardContent.generateBody(e,i.product_weight):""}
      </div>`}getConfig(){const e={};e.title=this.config.title;e.compact=this.config.compact??false;e.show_names=this.config.show_names??true;e.show_labels=this.config.show_labels??true;e.show_icons=this.config.show_icons??true;e.show_last_updated=this.config.show_last_updated??false;e.show_units=this.config.show_units??true;e.gradient=this.config.gradient??true;e.language=this.config.language??"en";e.normal_color=this.config.normal_color??"#00b894";e.low_color=this.config.low_color??"#fdcb6e";e.warn_color=this.config.warn_color??"#e17055";e.marker_color=this.config.marker_color??"rgba(0, 0, 0, 1)";e.hi_low_color=this.config.hi_low_color??"rgba(0, 0, 0, .6)";e.override=this.config.override??false;e.temperature=this.config.temperature;e.temperature_min=this.config.temperature_min;e.temperature_max=this.config.temperature_max;e.temperature=this.config.temperature;e.temperature_name=this.getTranslatedText("sensor.temperature");e.temperature_unit=this.config.temperature_unit??"°C";e.temperature_unit=e.temperature_unit.toUpperCase();e.temperature_setpoint=this.config.temperature_setpoint??(e.temperature_unit==="°F"?80:27);e.temperature_step=this.config.temperature_step??(e.temperature_unit==="°F"?2:1);e.temperature_override=e.temperature_unit==="°F"?79:26.5;e.temperature_2=this.config.temperature_2;e.temperature_2_min=this.config.temperature_2_min;e.temperature_2_max=this.config.temperature_2_max;e.temperature_2_name=this.getTranslatedText("sensor.temperature_2");e.temperature_2_unit=this.config.temperature_2_unit??"°C";e.temperature_2_unit=e.temperature_2_unit.toUpperCase();e.temperature_2_setpoint=this.config.temperature_2_setpoint??(e.temperature_2_unit==="°F"?80:27);e.temperature_2_step=this.config.temperature_2_step??(e.temperature_2_unit==="°F"?2:1);e.temperature_2_override=e.temperature_2_unit==="°F"?92:28.5;e.ph=this.config.ph;e.ph_min=this.config.ph_min;e.ph_max=this.config.ph_max;e.ph_name=this.getTranslatedText("sensor.ph");e.ph_unit=this.config.ph_unit??"pH";e.ph_setpoint=this.config.ph_setpoint??7.2;e.ph_step=this.config.ph_step??.2;e.ph_override=7.5;e.orp=this.config.orp;e.orp_min=this.config.orp_min;e.orp_max=this.config.orp_max;e.orp_name=this.getTranslatedText("sensor.orp");e.orp_unit=this.config.orp_unit??"mV";e.orp_setpoint=this.config.orp_setpoint??700;e.orp_step=this.config.orp_step??50;e.orp_override=551;e.tds=this.config.tds;e.tds_min=this.config.tds_min;e.tds_max=this.config.tds_max;e.tds_name=this.getTranslatedText("sensor.tds");e.tds_unit=this.config.tds_unit??"g/L";e.tds_unit=e.tds_unit.toLowerCase();e.tds_setpoint=this.config.tds_setpoint??(e.tds_unit==="ppm"?4e3:4);e.tds_step=this.config.tds_step??(e.tds_unit==="ppm"?1e3:1);e.tds_override=e.tds_unit==="ppm"?7e3:7;e.salinity=this.config.salinity;e.salinity_min=this.config.salinity_min;e.salinity_max=this.config.salinity_max;e.salinity_name=this.getTranslatedText("sensor.salinity");e.salinity_unit=this.config.salinity_unit??"ppm";e.salinity_setpoint=this.config.salinity_setpoint??(e.salinity_unit==="ppm"?3e3:4.5);e.salinity_step=this.config.salinity_step??(e.salinity_unit==="ppm"?500:.5);e.salinity_override=e.salinity_unit==="ppm"?2750:4;e.cya=this.config.cya;e.cya_min=this.config.cya_min;e.cya_max=this.config.cya_max;e.cya_name=this.getTranslatedText("sensor.cya");e.cya_unit=this.config.cya_unit??"ppm";e.cya_setpoint=this.config.cya_setpoint??40;e.cya_step=this.config.cya_step??10;e.cya_override=27;e.calcium=this.config.calcium;e.calcium_min=this.config.calcium_min;e.calcium_max=this.config.calcium_max;e.calcium_name=this.getTranslatedText("sensor.calcium");e.calcium_unit=this.config.calcium_unit??"ppm";e.calcium_setpoint=this.config.calcium_setpoint??300;e.calcium_step=this.config.calcium_step??100;e.calcium_override=425;e.phosphate=this.config.phosphate;e.phosphate_min=this.config.phosphate_min;e.phosphate_max=this.config.phosphate_max;e.phosphate_name=this.getTranslatedText("sensor.phosphate");e.phosphate_unit=this.config.phosphate_unit??"ppb";e.phosphate_setpoint=this.config.phosphate_setpoint??100;e.phosphate_step=this.config.phosphate_step??100;e.phosphate_override=30;e.alkalinity=this.config.alkalinity;e.alkalinity_min=this.config.alkalinity_min;e.alkalinity_max=this.config.alkalinity_max;e.alkalinity_name=this.getTranslatedText("sensor.alkalinity");e.alkalinity_unit=this.config.alkalinity_unit??"ppm";e.alkalinity_setpoint=this.config.alkalinity_setpoint??100;e.alkalinity_step=this.config.alkalinity_step??20;e.alkalinity_override=50;e.free_chlorine=this.config.free_chlorine;e.free_chlorine_min=this.config.free_chlorine_min;e.free_chlorine_max=this.config.free_chlorine_max;e.free_chlorine_name=this.getTranslatedText("sensor.free_chlorine");e.free_chlorine_unit=this.config.free_chlorine_unit??"ppm";e.free_chlorine_setpoint=this.config.free_chlorine_setpoint??2;e.free_chlorine_step=this.config.free_chlorine_step??1;e.free_chlorine_override=1.5;e.total_chlorine=this.config.total_chlorine;e.total_chlorine_min=this.config.total_chlorine_min;e.total_chlorine_max=this.config.total_chlorine_max;e.total_chlorine_name=this.getTranslatedText("sensor.total_chlorine");e.total_chlorine_unit=this.config.total_chlorine_unit??"ppm";e.total_chlorine_setpoint=this.config.total_chlorine_setpoint??3;e.total_chlorine_step=this.config.total_chlorine_step??1;e.total_chlorine_override=5.5;e.pressure=this.config.pressure;e.pressure_min=this.config.pressure_min;e.pressure_max=this.config.pressure_max;e.pressure_name=this.getTranslatedText("sensor.pressure");e.pressure_unit=this.config.pressure_unit??"psi";e.pressure_setpoint=this.config.pressure_setpoint??(e.pressure_unit==="bar"?1.5:23);e.pressure_step=this.config.pressure_step??(e.pressure_unit==="bar"?.5:7);e.pressure_override=32;e.sg=this.config.sg;e.sg_name=this.getTranslatedText("sensor.sg");e.sg_unit=this.config.sg_unit??"g/cm³";e.sg_setpoint=this.config.sg_setpoint??(e.sg_unit==="Ratio"?.5:1.5);e.sg_step=this.config.sg_step??.001;e.sg_override=1;e.magnesium=this.config.magnesium;e.magnesium_min=this.config.magnesium_min;e.magnesium_max=this.config.magnesium_max;e.magnesium_name=this.getTranslatedText("sensor.magnesium");e.magnesium_unit=this.config.magnesium_unit??"ppm";e.magnesium_setpoint=this.config.magnesium_setpoint??700;e.magnesium_step=this.config.magnesium_step??100;e.magnesium_override=e.magnesium_unit==="ppm"?2100:2.1;e.water_level=this.config.water_level;e.water_level_min=this.config.water_level_min;e.water_level_max=this.config.water_level_max;e.water_level_name=this.getTranslatedText("sensor.water_level");e.water_level_unit=this.config.water_level_unit??"%";e.water_level_setpoint=this.config.water_level_setpoint??50;e.water_level_step=this.config.water_level_step??10;e.water_level_override=75;e.flow_rate=this.config.flow_rate;e.flow_rate_min=this.config.flow_rate_min;e.flow_rate_max=this.config.flow_rate_max;e.flow_rate_name=this.getTranslatedText("sensor.flow_rate");e.flow_rate_unit=this.config.flow_rate_unit??"L/min";e.flow_rate_setpoint=this.config.flow_rate_setpoint??100;e.flow_rate_step=this.config.flow_rate_step??20;e.flow_rate_override=150;e.uv_radiation=this.config.uv_radiation;e.uv_radiation_min=this.config.uv_radiation_min;e.uv_radiation_max=this.config.uv_radiation_max;e.uv_radiation_name=this.getTranslatedText("sensor.uv_radiation");e.uv_radiation_unit=this.config.uv_radiation_unit??"mW/cm²";e.uv_radiation_setpoint=this.config.uv_radiation_setpoint??30;e.uv_radiation_step=this.config.uv_radiation_step??5;e.uv_radiation_override=40;e.product_volume=this.config.product_volume;e.product_volume_min=this.config.product_volume_min;e.product_volume_max=this.config.product_volume_max;e.product_volume_name=this.getTranslatedText("sensor.product_volume");e.product_volume_unit=this.config.product_volume_unit??"L";e.product_volume_setpoint=this.config.product_volume_setpoint??20;e.product_volume_step=this.config.product_volume_step??5;e.product_volume_override=15;e.product_weight=this.config.product_weight;e.product_weight_min=this.config.product_weight_min;e.product_weight_max=this.config.product_weight_max;e.product_weight_name=this.getTranslatedText("sensor.product_weight");e.product_weight_unit=this.config.product_weight_unit??"kg";e.product_weight_setpoint=this.config.product_weight_setpoint??25;e.product_weight_step=this.config.product_weight_step??5;e.product_weight_override=20;return e}processData(){const e={};const i=this.getConfig();if(i.temperature)e.temperature=this.calculateData("temperature",i.temperature_name,i.temperature,i.temperature_min,i.temperature_max,i.temperature_setpoint,i.temperature_step,i.temperature_unit,i.temperature_override,i.override);if(i.temperature_2)e.temperature_2=this.calculateData("temperature_2",i.temperature_2_name,i.temperature_2,i.temperature_2_min,i.temperature_2_max,i.temperature_2_setpoint,i.temperature_2_step,i.temperature_2_unit,i.temperature_2_override,i.override);if(i.ph)e.ph=this.calculateData("ph",i.ph_name,i.ph,i.ph_min,i.ph_max,i.ph_setpoint,i.ph_step,i.ph_unit,i.ph_override,i.override);if(i.orp)e.orp=this.calculateData("orp",i.orp_name,i.orp,i.orp_min,i.orp_max,i.orp_setpoint,i.orp_step,i.orp_unit,i.orp_override,i.override);if(i.tds)e.tds=this.calculateData("tds",i.tds_name,i.tds,i.tds_min,i.tds_max,i.tds_setpoint,i.tds_step,i.tds_unit,i.tds_override,i.override);if(i.salinity)e.salinity=this.calculateData("salinity",i.salinity_name,i.salinity,i.salinity_min,i.salinity_max,i.salinity_setpoint,i.salinity_step,i.salinity_unit,i.salinity_override,i.override);if(i.cya)e.cya=this.calculateData("cya",i.cya_name,i.cya,i.cya_min,i.cya_max,i.cya_setpoint,i.cya_step,i.cya_unit,i.cya_override,i.override);if(i.calcium)e.calcium=this.calculateData("calcium",i.calcium_name,i.calcium,i.calcium_min,i.calcium_max,i.calcium_setpoint,i.calcium_step,i.calcium_unit,i.calcium_override,i.override);if(i.phosphate)e.phosphate=this.calculateData("phosphate",i.phosphate_name,i.phosphate,i.phosphate_min,i.phosphate_max,i.phosphate_setpoint,i.phosphate_step,i.phosphate_unit,i.phosphate_override,i.override);if(i.alkalinity)e.alkalinity=this.calculateData("alkalinity",i.alkalinity_name,i.alkalinity,i.alkalinity_min,i.alkalinity_max,i.alkalinity_setpoint,i.alkalinity_step,i.alkalinity_unit,i.alkalinity_override,i.override);if(i.free_chlorine)e.free_chlorine=this.calculateData("free_chlorine",i.free_chlorine_name,i.free_chlorine,i.free_chlorine_min,i.free_chlorine_max,i.free_chlorine_setpoint,i.free_chlorine_step,i.free_chlorine_unit,i.free_chlorine_override,i.override);if(i.total_chlorine)e.total_chlorine=this.calculateData("total_chlorine",i.total_chlorine_name,i.total_chlorine,i.total_chlorine_min,i.total_chlorine_max,i.total_chlorine_setpoint,i.total_chlorine_step,i.total_chlorine_unit,i.total_chlorine_override,i.override);if(i.pressure)e.pressure=this.calculateData("pressure",i.pressure_name,i.pressure,i.pressure_min,i.pressure_max,i.pressure_setpoint,i.pressure_step,i.pressure_unit,i.pressure_override,i.override);if(i.sg)e.sg=this.calculateData("sg",i.sg_name,i.sg,i.sg_min,i.sg_max,i.sg_setpoint,i.sg_step,i.sg_unit,i.sg_override,i.override);if(i.magnesium)e.magnesium=this.calculateData("magnesium",i.magnesium_name,i.magnesium,i.magnesium_min,i.magnesium_max,i.magnesium_setpoint,i.magnesium_step,i.magnesium_unit,i.magnesium_override,i.override);if(i.water_level)e.water_level=this.calculateData("water_level",i.water_level_name,i.water_level,i.water_level_min,i.water_level_max,i.water_level_setpoint,i.water_level_step,i.water_level_unit,i.water_level_override,i.override);if(i.flow_rate)e.flow_rate=this.calculateData("flow_rate",i.flow_rate_name,i.flow_rate,i.flow_rate_min,i.flow_rate_max,i.flow_rate_setpoint,i.flow_rate_step,i.flow_rate_unit,i.flow_rate_override,i.override);if(i.uv_radiation)e.uv_radiation=this.calculateData("uv_radiation",i.uv_radiation_name,i.uv_radiation,i.uv_radiation_min,i.uv_radiation_max,i.uv_radiation_setpoint,i.uv_radiation_step,i.uv_radiation_unit,i.uv_radiation_override,i.override);if(i.product_volume)e.product_volume=this.calculateData("product_volume",i.product_volume_name,i.product_volume,i.product_volume_min,i.product_volume_max,i.product_volume_setpoint,i.product_volume_step,i.product_volume_unit,i.product_volume_override,i.override);if(i.product_weight)e.product_weight=this.calculateData("product_weight",i.product_weight_name,i.product_weight,i.product_weight_min,i.product_weight_max,i.product_weight_setpoint,i.product_weight_step,i.product_weight_unit,i.product_weight_override,i.override);return e}getTranslatedText(e,i){const a=this.config?.language||"en";const r=getTranslation(a,e);return formatTranslation(r,i)}calculateData(e,i,a,r,o,s,n,l,c,p){const d={};const u=this.getConfig();d.name=e;d.title=u.show_names?i:C`&nbsp;`;if(!u.show_icons)d.hide_icon=true;else{const i=this.config[`${e}_icon`]||{};if(i.hide)d.hide_icon=true;else if(i.image_url)d.img_src=i.image_url;else if(i.mdi){d.is_mdi=true;d.mdi_icon=i.mdi}else d.img_src="https://raw.githubusercontent.com/wilsto/pool-monitor-card/master/resources/"+e+".png"}d.value=parseFloat(this.hass.states[a].state);d.entity=a;if(u.show_last_updated)d.last_updated=this.timeFromNow(this.hass.states[a].last_updated);d.unit=u.show_units?l:"";if(p)d.value=c;d.min_value=r!==void 0?parseFloat(this.hass.states[r].state):d.value;d.max_value=o!==void 0?parseFloat(this.hass.states[o].state):d.value;d.setpoint=s;const _=Math.max(this.countDecimals(s),this.countDecimals(n));if(d.value)d.value=this.hass.states[a].state;if(d.min_value)d.min_value=r!==void 0?this.hass.states[r].state:d.value;if(d.max_value)d.max_value=o!==void 0?this.hass.states[o].state:d.value;d.setpoint_class=[(s-2*n).toFixed(_),(s-n).toFixed(_),s.toFixed(_),(s+n).toFixed(_),(s+2*n).toFixed(_)];d.separator=u.show_labels?"-":"";d.color="transparent";if(Number(d.value)<Number(d.setpoint_class[0])){d.state=u.show_labels?this.getTranslatedText("state.1"):"";d.color=u.warn_color}else if(Number(d.value)>=Number(d.setpoint_class[0])&&Number(d.value)<Number(d.setpoint_class[1])){d.state=u.show_labels?this.getTranslatedText("state.2"):"";d.color=u.low_color}else if(Number(d.value)>=Number(d.setpoint_class[1])&&Number(d.value)<Number(d.setpoint_class[2])){d.state=u.show_labels?this.getTranslatedText("state.3"):"";d.color=u.normal_color}else if(Number(d.value)>=Number(d.setpoint_class[2])&&Number(d.value)<Number(d.setpoint_class[3])){d.state=u.show_labels?this.getTranslatedText("state.4"):"";d.color=u.normal_color}else if(Number(d.value)>=Number(d.setpoint_class[3])&&Number(d.value)<Number(d.setpoint_class[4])){d.state=u.show_labels?this.getTranslatedText("state.5"):"";d.color=u.low_color}else if(Number(d.value)>=Number(d.setpoint_class[4])){d.state=u.show_labels?this.getTranslatedText("state.6"):"";d.color=u.warn_color}d.progressClass=e==="temperature"?"progress-temp":"progress";d.pct=Math.max(0,Math.min(98.5,Math.max(0,d.value-(s-3*n))/(6*n)*.85*100+13)).toFixed(0);d.pct_min=Math.max(0,Math.min(98.5,Math.max(0,d.min_value-(s-3*n))/(6*n)*.85*100+13)).toFixed(0);d.pct_max=Math.max(0,Math.min(98.5,Math.max(0,d.max_value-(s-3*n))/(6*n)*.85*100+13)).toFixed(0);d.pct_marker=d.value>d.setpoint?d.pct-13:d.pct-5;d.side_align=d.value>s?"right":"left";d.pct_cursor=d.value>s?100-parseFloat(d.pct):parseFloat(d.pct)-2;d.pct_state_step=d.value>s?105-parseFloat(d.pct):parseFloat(d.pct)+5;d.pct_min=d.value>s?100-parseFloat(d.pct_min):parseFloat(d.pct_min)-2;d.pct_max=d.value>s?100-parseFloat(d.pct_max):parseFloat(d.pct_max)-2;return d}countDecimals(e){if(Math.floor(e)===e)return 0;return e.toString().split(".")[1].length||0}timeFromNow(e){const i=new Date(e);const a=Date.now()-i.getTime();const t=(e,i)=>{let a=i==1?"":"s";let r=this.getTranslatedText(`time.${e}`);r=r.replace("{"+e+"}",i);r=r.replace("{plural}",a);return r};const r=Math.floor(a/6e4);const o=Math.floor(r/60);const s=Math.floor(o/24);if(r<1)return t("now",0);if(r<60)return t("minute",r);if(o<24)return t("hour",o);return t("day",s)}setConfig(e){if(!e.temperature&&!e.ph&&!e.orp&&!e.tds&&!e.salinity&&!e.cya&&!e.calcium&&!e.phosphate&&!e.alkalinity&&!e.free_chlorine&&!e.total_chlorine&&!e.pressure&&!e.sg&&!e.water_level&&!e.flow_rate&&!e.uv_radiation&&!e.product_volume&&!e.product_weight)throw new Error("You need to define entities");this.config={...e}}static _moreinfo(e){const i=new Event("hass-more-info",{bubbles:true,cancelable:false,composed:true});i.detail={entityId:e};document.querySelector("home-assistant").dispatchEvent(i)}}customElements.define("pool-monitor-card",PoolMonitorCard)})();
//# sourceMappingURL=pool-monitor-card.js.map


var LitElement = LitElement || Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
var html = LitElement.prototype.html;
var css = LitElement.prototype.css;

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
    border-radius: 5px;
    width: 90px;
    text-align: right;
    justify-self: right;
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
        ${data.temperature !== undefined ? cardContent.generateCompactBody(data.temperature): ''}
        ${data.ph !== undefined ? cardContent.generateCompactBody(data.ph): ''}
        ${data.orp !== undefined ? cardContent.generateCompactBody(data.orp): ''}
        ${data.tds !== undefined ? cardContent.generateCompactBody(data.tds): ''}      
      </div>`;
    } else {
      return html`
      <div id="pool-monitor-card">
        ${cardContent.generateTitle(config)}
        ${data.temperature !== undefined ? cardContent.generateBody(data.temperature): ''}
        ${data.ph !== undefined ? cardContent.generateBody(data.ph): ''}
        ${data.orp !== undefined ? cardContent.generateBody(data.orp): ''}
        ${data.tds !== undefined ? cardContent.generateBody(data.tds): ''}      
      </div>`;
    }

  }

  getConfig () {
    const config = {};
    config.temperature = this.config.temperature ;
    config.temperature_setpoint = this.config.temperature_setpoint ?? 27;

    config.ph = this.config.ph ;
    config.ph_setpoint = this.config.ph_setpoint ?? 7.2;
    
    config.orp = this.config.orp ;
    config.orp_setpoint = this.config.orp_setpoint ?? 700;

    config.tds = this.config.tds ;
    config.tds_setpoint = this.config.tds_setpoint ?? 4;
    
    config.title = this.config.title;
    config.compact = this.config.compact ?? false;
    
    config.override = this.config.override ?? false;
    return config;
  }

  processData () {    

    const data = {}
    const config = this.getConfig()
    // console.log("config:",config);

    if (config.temperature) {
      data.temperature = this.calculateData('temperature', config.temperature, config.temperature_setpoint, 1,"°C", 26.5, config.override) 
    }
    if (config.ph) {
      data.ph = this.calculateData('ph', config.ph, config.ph_setpoint,0.2,"pH",6.9, config.override) 
    }
    if (config.orp) {
      data.orp = this.calculateData('orp', config.orp, config.orp_setpoint,50,"mV", 551, config.override) 
    }
    if (config.tds) {
      data.tds = this.calculateData('tds', config.tds, config.tds_setpoint,1,"g/L", 7, 1, config.override) 
    }

    // console.log("data:",data);
    return data
  }

  calculateData(name, entity, setpoint, setpoint_offset, unit, override_value, override) {
    const newData = {};
    newData.name = name;
    newData.img_src ="https://raw.githubusercontent.com/wilsto/pool-monitor-card/master/resources/"+ name +".png"
    newData.value = this.hass.states[entity].state;
    newData.entity = entity;
    newData.unit = unit;
    if (override){
      newData.value = override_value;
    }
    newData.setpoint = setpoint ;
    const countDecimals = this.countDecimals(setpoint);
    newData.setpoint_class = [
      (setpoint - 2 *setpoint_offset).toFixed(countDecimals),
      (setpoint - setpoint_offset).toFixed(countDecimals),
      (setpoint).toFixed(countDecimals),
      (setpoint + setpoint_offset).toFixed(countDecimals),
      (setpoint + 2 *setpoint_offset).toFixed(countDecimals)
    ]

    newData.state = "no data";
    newData.color = "transparent";
    if (newData.value < newData.setpoint_class[0]) {
      newData.state = "Too Low";
      newData.color = "#e17055";
    } else if (newData.value >= newData.setpoint_class[0] && newData.value < newData.setpoint_class[1]) {
      newData.state = "Acceptable Low";
      newData.color = "#fdcb6e";
    } else if (newData.value >= newData.setpoint_class[1] && newData.value < newData.setpoint_class[2]) {
      newData.state = "Ideal";
      newData.color = "#00b894";
    } else if (newData.value >= newData.setpoint_class[2] && newData.value < newData.setpoint_class[3]) {
      newData.state = "Ideal";
      newData.color = "#00b894";
    } else if (newData.value >= newData.setpoint_class[3] && newData.value < newData.setpoint_class[4]) {
      newData.state = "Acceptable High";
      newData.color = "#fdcb6e";
    } else if (newData.value >= newData.setpoint_class[4]) {
      newData.state = "Too High";
      newData.color = "#e17055";
    }
    newData.pct = Math.max(0, Math.min(95, (Math.max(0, newData.value - (setpoint - 3 *setpoint_offset)) / (6 * setpoint_offset)) * 0.80 * 100 + 22)).toFixed(0);
    var side_offset = newData.value > setpoint ? -26 : 5 ;
    var side_offset_cursor = newData.value > setpoint ? -30 : 0 ;
    newData.side_align = newData.value > setpoint ? "right" : "left" ;
    newData.pct_state_offset = parseFloat(newData.pct) + parseFloat(side_offset) ;
    newData.pct_state_offset_cursor = parseFloat(newData.pct) + parseFloat(side_offset_cursor) ;

    return newData
  }

  countDecimals(number) {
    if (Math.floor(number) === number) { // si c'est un nombre entier
      return 0;
    }
    return number.toString().split(".")[1].length || 0;
  }

  setConfig(config) {
    if (!config.temperature && !config.ph && !config.orp) {
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
    console.log("entityinfo", entityinfo)
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

    static generateBody (data) {
      return html`
      <!-- ##### ${data.name} section ##### -->    
      <div class="section" @click=${() => 
          PoolMonitorCard._moreinfo(data.entity)}>   
        <div class="pool-monitor-container-marker" >
          <div class="marker" style="background-color: ${data.color} ;color: black;left: ${data.pct-5}%;">${data.value}</div>
          <div class="marker-state" style="text-align:${data.side_align};background-color:transparent ;left: ${data.pct_state_offset}%;">${data.state}</div>
          <div class="triangle" style="border-top: 10px solid ${data.color} ;left: ${data.pct-1}%;"></div>
        </div>
        <div style="padding-left:20px;float:left"><img src="${data.img_src}"></div>
        <div class="pool-monitor-container">
          <div style="background-color: transparent; grid-column: 1 ; border: 0px; box-shadow:none" class="grid-item item-row"> <div style="font-size: 0.8em;text-align:left;margin:3px 2px 0 0 ">${data.unit}</div></div>
          <div style="background-color: #e17055; grid-column: 2 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> </div>
          <div style="background-color: #fdcb6e; grid-column: 3 ;" class="grid-item item-row"></div>
          <div style="background-color: #00b894; grid-column: 4 ;" class="grid-item item-row"></div>  
          <div style="background-color: #00b894; grid-column: 5 ;" class="grid-item item-row"></div>  
          <div style="background-color: #fdcb6e; grid-column: 6 ;" class="grid-item item-row"></div>
          <div style="background-color: #e17055; grid-column: 7 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
        </div>
        <div class="pool-monitor-container-values">
          <div style="background-color: transparent; grid-column: 2 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[0]}</div></div>
          <div style="background-color: transparent; grid-column: 3 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[1]}</div></div>
          <div style="background-color: transparent; grid-column: 4 ;" class="grid-item item-row"><div style="font-size: 0.8em;color:#00b894;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[2]}</div></div>  
          <div style="background-color: transparent; grid-column: 5 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[3]}</div></div>  
          <div style="background-color: transparent; grid-column: 6 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[4]}</div></div>
          <div style="background-color: transparent; grid-column: 7 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
        </div> 
      </div> 
      `
    }

    static generateCompactBody (data) {
      return html`
      <!-- ##### ${data.name} section ##### -->    
      <div class="section-compact"  @click=${() => 
          PoolMonitorCard._moreinfo(data.entity)}>   
        <div style="padding-left:20px;float:left"><img src="${data.img_src}"></div>
        <div class="pool-monitor-container">
          <div style="background-color: transparent; grid-column: 1 ; border: 0px; box-shadow:none" class="grid-item item-row"> <div style="font-size: 0.8em;text-align:left;margin:3px 2px 0 0 ">${data.unit}</div></div>
          <div style="background-color: #e17055; grid-column: 2 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> </div>
          <div style="background-color: #fdcb6e; grid-column: 3 ;" class="grid-item item-row"></div>
          <div style="background-color: #00b894; grid-column: 4 ;" class="grid-item item-row"></div>  
          <div style="background-color: #00b894; grid-column: 5 ;" class="grid-item item-row"></div>  
          <div style="background-color: #fdcb6e; grid-column: 6 ;" class="grid-item item-row"></div>
          <div style="background-color: #e17055; grid-column: 7 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
          <div class="cursor-text" style="border-${data.side_align}: 5px solid black; text-align:${data.side_align};background-color:transparent ;left: ${data.pct_state_offset_cursor - 2}%;">${data.value} - ${data.state}</div>
        </div>
        <div class="pool-monitor-container-values">
          <div style="background-color: transparent; grid-column: 2 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[0]}</div></div>
          <div style="background-color: transparent; grid-column: 3 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[1]}</div></div>
          <div style="background-color: transparent; grid-column: 4 ;" class="grid-item item-row"><div style="font-size: 0.8em;color:#00b894;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[2]}</div></div>  
          <div style="background-color: transparent; grid-column: 5 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[3]}</div></div>  
          <div style="background-color: transparent; grid-column: 6 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[4]}</div></div>
          <div style="background-color: transparent; grid-column: 7 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
        </div> 
      </div> 
      `
    }    
}

customElements.define("pool-monitor-card", PoolMonitorCard);

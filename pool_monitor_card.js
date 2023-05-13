
var LitElement = LitElement || Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
var html = LitElement.prototype.html;
var css = LitElement.prototype.css;

import { cardStyles } from './cardStyles.js';
import { cardContent } from './cardContent.js'

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
    cardStyles
  ];

  constructor() {
    super();
  }
  render() {
    const config = this.getConfig()
    const data = this.processData()
      
    return html`
    <div id="pool-monitor-card")>
      ${cardContent.generateTitle(config)}
      ${cardContent.generateBody(data.temperature)}
      <div style="height:20px">&nbsp;</div>
      ${cardContent.generateBody(data.ph)}
      <div style="height:20px">&nbsp;</div>
      ${cardContent.generateBody(data.orp)}
    `;
  }

  getConfig () {
    const config = {};
    config.temperature = this.config.temperature ;
    config.temperature_setpoint = this.config.temperature_setpoint ?? 27;

    config.ph = this.config.ph ;
    config.ph_setpoint = this.config.ph_setpoint ?? 7.2;
    config.orp = this.config.orp ;

    config.orp_setpoint = this.config.orp_setpoint ?? 700;
    config.title = this.config.title;

    return config;
  }

  processData () {    

    const data = {}
    const config = this.getConfig()
    // console.log("config:",config);

    data.temperature = this.calculateData('temperature', config.temperature, config.temperature_setpoint, 1,"°C", 26.5) 
    data.ph = this.calculateData('ph', config.ph, config.ph_setpoint,0.2,"pH",6.9) 
    data.orp = this.calculateData('orp', config.orp, config.orp_setpoint,50,"mV", 558) 

    // console.log("data:",data);
    return data
  }

  calculateData(name, entity, setpoint, setpoint_offset, unit, override_value) {
    const newData = {};
    newData.name = name;
    newData.img_src ="/hacsfiles/pool-monitor-card/"+ name +".png"
    newData.value = this.hass.states[entity].state;
    newData.unit = unit;
    const override = false
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
    newData.pct = Math.max(0, Math.min(95, (Math.max(0, newData.value - (setpoint - 3 *setpoint_offset)) / (6 * setpoint_offset)) * 0.79 * 100 + 21)).toFixed(0);
    var side_offset = newData.value > setpoint ? -26 : 5 ;
    newData.side_align = newData.value > setpoint ? "right" : "left" ;
    newData.pct_state_offset = parseFloat(newData.pct) + parseFloat(side_offset) ;

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

  _moreinfo(entityinfo) {
    const popupEvent = new Event("hass-more-info", {
      bubbles: true,
      cancelable: false,
      composed: true,
    });
    popupEvent.detail = { entityId: entityinfo };
    this.ownerDocument
      .querySelector("home-assistant")
      .dispatchEvent(popupEvent);
  }

}
customElements.define("pool-monitor-card", PoolMonitorCard);

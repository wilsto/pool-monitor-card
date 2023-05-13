
var LitElement = LitElement || Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
var html = LitElement.prototype.html;

export class cardContent {


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
        <div  class="pool-monitor-container-marker" >
          <div class="marker" style="background-color: ${data.color} ;color: black;left: ${data.pct-5}%;">${data.value}</div>
          <div class="marker-state" style="text-align:${data.side_align};background-color:transparent ;left: ${data.pct_state_offset}%;">${data.state}</div>
          <div class="triangle" style="border-top: 10px solid ${data.color} ;left: ${data.pct-1}%;"></div>
        </div>
  
        <div style="padding-left:20px;float:left"><img src="${data.img_src}"></div>
        <div  class="pool-monitor-container" @click=${() => 
          this._moreinfo(data.entity)}>
          <div style="background-color: transparent; grid-column: 1 ; border: 0px; box-shadow:none" class="grid-item item-row"> <div style="font-size: 0.8em;text-align:left;margin:3px 2px 0 0 ">${data.unit}</div></div>
          <div style="background-color: #e17055; grid-column: 2 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> </div>
          <div style="background-color: #fdcb6e; grid-column: 3 ;" class="grid-item item-row"></div>
          <div style="background-color: #00b894; grid-column: 4 ;" class="grid-item item-row"></div>  
          <div style="background-color: #00b894; grid-column: 5 ;" class="grid-item item-row"></div>  
          <div style="background-color: #fdcb6e; grid-column: 6 ;" class="grid-item item-row"></div>
          <div style="background-color: #e17055; grid-column: 7 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
        </div>
        <div  class="pool-monitor-container-values" @click=${() => 
          this._moreinfo(data.entity)}>
          <div style="background-color: transparent; grid-column: 2 ; border-radius: 5px 0px 0px 5px" class="grid-item item-row"> <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[0]}</div></div>
          <div style="background-color: transparent; grid-column: 3 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[1]}</div></div>
          <div style="background-color: transparent; grid-column: 4 ;" class="grid-item item-row"><div style="font-size: 0.8em;color:#00b894;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[2]}</div></div>  
          <div style="background-color: transparent; grid-column: 5 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[3]}</div></div>  
          <div style="background-color: transparent; grid-column: 6 ;" class="grid-item item-row"><div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">${data.setpoint_class[4]}</div></div>
          <div style="background-color: transparent; grid-column: 7 ; border-radius: 0px 5px 5px 0px;" class="grid-item item-row"></div>
        </div> 
        `
      }




}
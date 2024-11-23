var LitElement = LitElement || Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
var css = LitElement.prototype.css;

export const styles = css`
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
`;

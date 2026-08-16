import { css } from 'lit';

export const editorStyles = css`
  .card-config {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .section-header {
    font-weight: 500;
    font-size: 14px;
    color: var(--primary-text-color);
    margin-bottom: 4px;
  }

  ha-expansion-panel {
    --expansion-panel-summary-padding: 0 16px;
    --expansion-panel-content-padding: 0 16px 16px;
  }

  /* Sensor editor styles */
  .sensor-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .sensor-row {
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    overflow: hidden;
  }

  .sensor-row-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    cursor: pointer;
    background: var(--secondary-background-color);
  }

  .sensor-row-header:hover {
    background: var(--primary-background-color);
  }

  .sensor-row-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
  }

  .sensor-row-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .sensor-row-content {
    padding: 8px 12px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-top: 1px solid var(--divider-color);
  }

  .sensor-row-entity {
    display: flex;
    gap: 8px;
    align-items: flex-end;
  }

  .sensor-row-entity ha-entity-picker {
    flex: 1;
  }

  .sensor-advanced {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 8px;
    border-top: 1px dashed var(--divider-color);
  }

  .sensor-field-row {
    display: flex;
    gap: 8px;
  }

  .sensor-field-row > * {
    flex: 1;
  }

  .add-sensor-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .add-sensor-row > *:first-child {
    flex: 1;
  }

  .freeform-input {
    display: flex;
    gap: 8px;
    align-items: flex-end;
  }

  .freeform-input .text-field {
    flex: 1;
  }

  /* Native text field. HA removed ha-textfield in 2026.5 and states plainly
     that custom cards should not depend on its internal components, so the
     editor styles its own inputs with HA's CSS variables instead. */
  .text-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    min-width: 0;
  }

  .text-field-label {
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .text-field-input {
    width: 100%;
    box-sizing: border-box;
    padding: 8px 12px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    font-size: 14px;
    font-family: inherit;
  }

  .text-field-input:hover {
    border-color: var(--primary-color);
  }

  .text-field-input:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  ha-icon-button {
    --mdc-icon-button-size: 36px;
    --mdc-icon-size: 20px;
  }

  .delete-btn {
    color: var(--error-color);
  }

  .expand-btn {
    color: var(--secondary-text-color);
  }

  .sensor-select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    font-size: 14px;
    cursor: pointer;
    appearance: auto;
  }

  .sensor-select:hover {
    border-color: var(--primary-color);
  }

  .sensor-select:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  .empty-message {
    padding: 16px;
    text-align: center;
    color: var(--secondary-text-color);
    font-style: italic;
  }

  /* Collapsible groups. Eighteen fields at the same visual weight made every
     one of them look like work waiting to be done, while only the entity is
     actually required. */
  .sensor-section {
    border-top: 1px solid var(--divider-color);
    margin-top: 4px;
  }

  .sensor-section:last-of-type {
    border-bottom: 1px solid var(--divider-color);
  }

  .sensor-section-head {
    display: flex;
    align-items: baseline;
    gap: 8px;
    padding: 10px 2px;
    cursor: pointer;
    list-style: none;
  }

  .sensor-section-head::-webkit-details-marker {
    display: none;
  }

  .sensor-section-head::before {
    content: '▸';
    color: var(--secondary-text-color);
    font-size: 0.8em;
    width: 12px;
    flex: none;
  }

  .sensor-section[open] > .sensor-section-head::before {
    content: '▾';
  }

  .sensor-section-head:hover .sensor-section-name {
    color: var(--primary-color);
  }

  .sensor-section-name {
    font-weight: 500;
  }

  .sensor-section-sub {
    margin-left: auto;
    text-align: right;
    color: var(--secondary-text-color);
    font-size: 0.85em;
  }

  .sensor-section-body {
    padding: 2px 0 12px 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* The one field that is genuinely required says so, and says it where the
     eye already is rather than in a panel to the side. */
  .sensor-required.missing {
    border-left: 3px solid var(--error-color, #db4437);
    padding-left: 8px;
    margin-left: -11px;
  }

  .sensor-error {
    color: var(--error-color, #db4437);
    font-size: 0.8em;
    margin: 4px 0 0;
  }

  .sensor-hint {
    color: var(--secondary-text-color);
    font-size: 0.8em;
    margin: 2px 0 6px;
    line-height: 1.4;
  }
`;

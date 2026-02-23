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

  .freeform-input ha-textfield {
    flex: 1;
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

  .empty-message {
    padding: 16px;
    text-align: center;
    color: var(--secondary-text-color);
    font-style: italic;
  }
`;

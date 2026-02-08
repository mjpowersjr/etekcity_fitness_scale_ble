import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, ScaleConfig, ScaleUser, WeightMeasurement } from "../types";
import { DOMAIN } from "../const";
import { formatTimestamp } from "../utils/format";

@customElement("scale-history-list")
export class ScaleHistoryList extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) user!: ScaleUser;
  @property({ attribute: false }) scaleConfig!: ScaleConfig;

  @state() private _confirmDelete: string | null = null;

  static styles = css`
    .history-header {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
      margin-bottom: 8px;
    }
    .history-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .history-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      font-size: 14px;
    }
    .history-left {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .history-weight {
      font-weight: 500;
      color: var(--primary-text-color, #212121);
    }
    .history-time {
      font-size: 12px;
      color: var(--secondary-text-color, #757575);
    }
    .history-impedance {
      font-size: 12px;
      color: var(--secondary-text-color, #757575);
    }
    .delete-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      color: var(--secondary-text-color, #757575);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.15s, background 0.15s;
    }
    .delete-btn:hover {
      color: var(--error-color, #f44336);
      background: rgba(244, 67, 54, 0.1);
    }
    .confirm-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--error-color, #f44336);
      color: #fff;
      border-radius: 8px;
      font-size: 13px;
    }
    .confirm-row span {
      flex: 1;
    }
    .confirm-btn {
      background: rgba(255, 255, 255, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 4px;
      padding: 4px 10px;
      cursor: pointer;
      color: inherit;
      font-size: 12px;
    }
    .confirm-btn:hover {
      background: rgba(255, 255, 255, 0.4);
    }
    .cancel-btn {
      background: none;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 4px;
      padding: 4px 10px;
      cursor: pointer;
      color: inherit;
      font-size: 12px;
    }
    .no-history {
      text-align: center;
      padding: 16px;
      color: var(--secondary-text-color, #888);
      font-size: 14px;
    }
  `;

  private _getHistory(): WeightMeasurement[] {
    const entityId = this.user.entities["weight"];
    if (!entityId) return [];
    const state = this.hass.states[entityId];
    if (!state) return [];
    const history = state.attributes["weight_history"] as WeightMeasurement[] | undefined;
    if (!history || !Array.isArray(history)) return [];
    // Return sorted newest first
    return [...history].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  private _onDeleteClick(timestamp: string): void {
    this._confirmDelete = timestamp;
  }

  private _onCancelDelete(): void {
    this._confirmDelete = null;
  }

  private async _onConfirmDelete(timestamp: string): Promise<void> {
    this._confirmDelete = null;
    try {
      await this.hass.callService(DOMAIN, "remove_measurement", {
        device_id: this.scaleConfig.device_id,
        user_id: this.user.user_id,
        timestamp,
      });
    } catch (err) {
      console.error("Failed to remove measurement:", err);
    }
  }

  render() {
    const history = this._getHistory();

    if (history.length === 0) {
      return html`<div class="no-history">No measurement history</div>`;
    }

    return html`
      <div>
        <div class="history-header">Recent Measurements</div>
        <div class="history-list">
          ${history.map((m) => {
            if (this._confirmDelete === m.timestamp) {
              return html`
                <div class="confirm-row">
                  <span>Delete this measurement?</span>
                  <button
                    class="confirm-btn"
                    @click=${() => this._onConfirmDelete(m.timestamp)}
                  >
                    Delete
                  </button>
                  <button class="cancel-btn" @click=${this._onCancelDelete}>
                    Cancel
                  </button>
                </div>
              `;
            }
            return html`
              <div class="history-item">
                <div class="history-left">
                  <span class="history-weight">
                    ${m.weight} ${m.unit}
                  </span>
                  <span class="history-time">
                    ${formatTimestamp(m.timestamp)}
                    ${m.impedance !== undefined
                      ? html` &middot; <span class="history-impedance">${m.impedance} \u03A9</span>`
                      : nothing}
                  </span>
                </div>
                <button
                  class="delete-btn"
                  @click=${() => this._onDeleteClick(m.timestamp)}
                  title="Delete measurement"
                >
                  <ha-icon icon="mdi:trash-can-outline" style="--mdc-icon-size: 18px;"></ha-icon>
                </button>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

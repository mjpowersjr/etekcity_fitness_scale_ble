import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, ScaleConfig, PendingMeasurement } from "../types";
import { DOMAIN } from "../const";
import { formatNumber } from "../utils/format";

@customElement("scale-pending-banner")
export class ScalePendingBanner extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) scaleConfig!: ScaleConfig;

  @state() private _confirmDismiss: string | null = null;

  static styles = css`
    .banner {
      background: var(--card-background-color, #fff);
      border-left: 4px solid var(--warning-color, #ff9800);
      color: var(--primary-text-color, #212121);
      border-radius: 12px;
      padding: 12px 16px;
      margin-bottom: 16px;
    }
    .banner-title {
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--warning-color, #ff9800);
    }
    .banner-title ha-icon {
      --mdc-icon-size: 20px;
    }
    .pending-item {
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 8px;
      position: relative;
    }
    .pending-item:last-child {
      margin-bottom: 0;
    }
    .pending-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
    .pending-weight {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 6px;
    }
    .pending-time {
      font-size: 12px;
      color: var(--secondary-text-color, #757575);
      margin-bottom: 8px;
    }
    .dismiss-btn {
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
      flex-shrink: 0;
    }
    .dismiss-btn:hover {
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
      margin-bottom: 8px;
    }
    .confirm-row:last-child {
      margin-bottom: 0;
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
    .assign-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .assign-btn {
      background: var(--primary-color, #03a9f4);
      border: none;
      border-radius: 20px;
      padding: 8px 20px;
      font-size: 14px;
      min-height: 36px;
      color: var(--text-primary-color, #fff);
      cursor: pointer;
      transition: opacity 0.15s;
    }
    .assign-btn:hover {
      opacity: 0.85;
    }
  `;

  private _getPendingMeasurements(): PendingMeasurement[] {
    const entityId = this.scaleConfig.diagnostics?.pending_measurements;
    if (!entityId) return [];
    const state = this.hass.states[entityId];
    if (!state) return [];
    const pending = state.attributes["pending"] as PendingMeasurement[] | undefined;
    return pending ?? [];
  }

  private async _assignMeasurement(timestamp: string, userId: string): Promise<void> {
    // Find device_id from device registry for this scale
    const deviceId = this.scaleConfig.device_id;
    try {
      await this.hass.callService(DOMAIN, "assign_measurement", {
        device_id: deviceId,
        timestamp,
        user_id: userId,
      });
    } catch (err) {
      console.error("Failed to assign measurement:", err);
    }
  }

  private _onDismissClick(timestamp: string): void {
    this._confirmDismiss = timestamp;
  }

  private _onCancelDismiss(): void {
    this._confirmDismiss = null;
  }

  private async _onConfirmDismiss(timestamp: string): Promise<void> {
    this._confirmDismiss = null;
    try {
      await this.hass.callService(DOMAIN, "dismiss_measurement", {
        device_id: this.scaleConfig.device_id,
        timestamp,
      });
    } catch (err) {
      console.error("Failed to dismiss measurement:", err);
    }
  }

  render() {
    const pending = this._getPendingMeasurements();
    if (pending.length === 0) return nothing;

    return html`
      <div class="banner">
        <div class="banner-title">
          <ha-icon icon="mdi:scale-balance"></ha-icon>
          ${pending.length === 1
            ? "1 Pending Measurement"
            : `${pending.length} Pending Measurements`}
        </div>
        ${pending.map((m) => {
          const weight =
            m["Weight (lbs)"] !== undefined
              ? `${formatNumber(m["Weight (lbs)"], 1)} lbs`
              : m["Weight (kg)"] !== undefined
              ? `${formatNumber(m["Weight (kg)"], 1)} kg`
              : "--";
          const time = m.Timestamp;
          const timeStr = (() => {
            try {
              return new Date(time).toLocaleString(undefined, {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              });
            } catch {
              return time;
            }
          })();

          if (this._confirmDismiss === time) {
            return html`
              <div class="confirm-row">
                <span>Discard this measurement?</span>
                <button
                  class="confirm-btn"
                  @click=${() => this._onConfirmDismiss(time)}
                >
                  Discard
                </button>
                <button class="cancel-btn" @click=${this._onCancelDismiss}>
                  Cancel
                </button>
              </div>
            `;
          }

          return html`
            <div class="pending-item">
              <div class="pending-header">
                <div>
                  <div class="pending-weight">${weight}</div>
                  <div class="pending-time">${timeStr}</div>
                </div>
                <button
                  class="dismiss-btn"
                  @click=${() => this._onDismissClick(time)}
                  title="Discard measurement"
                >
                  <ha-icon icon="mdi:close" style="--mdc-icon-size: 18px;"></ha-icon>
                </button>
              </div>
              <div class="assign-buttons">
                ${this.scaleConfig.users.map(
                  (user) => html`
                    <button
                      class="assign-btn"
                      @click=${() => this._assignMeasurement(time, user.user_id)}
                    >
                      ${user.name}
                    </button>
                  `
                )}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}

import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { HomeAssistant, ScaleConfig, PendingMeasurement } from "../types";
import { DOMAIN } from "../const";
import { formatNumber } from "../utils/format";

@customElement("scale-pending-banner")
export class ScalePendingBanner extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) scaleConfig!: ScaleConfig;

  static styles = css`
    .banner {
      background: var(--warning-color, #ff9800);
      color: var(--text-primary-color, #fff);
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
    }
    .banner-title ha-icon {
      --mdc-icon-size: 20px;
    }
    .pending-item {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 8px;
    }
    .pending-item:last-child {
      margin-bottom: 0;
    }
    .pending-weight {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 6px;
    }
    .pending-time {
      font-size: 12px;
      opacity: 0.85;
      margin-bottom: 8px;
    }
    .assign-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .assign-btn {
      background: rgba(255, 255, 255, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 16px;
      padding: 4px 12px;
      font-size: 13px;
      color: inherit;
      cursor: pointer;
      transition: background 0.15s;
    }
    .assign-btn:hover {
      background: rgba(255, 255, 255, 0.4);
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
          return html`
            <div class="pending-item">
              <div class="pending-weight">${weight}</div>
              <div class="pending-time">${timeStr}</div>
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

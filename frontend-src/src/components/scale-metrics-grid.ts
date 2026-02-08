import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { HomeAssistant, ScaleUser } from "../types";
import { METRICS } from "../const";
import { formatNumber } from "../utils/format";

@customElement("scale-metrics-grid")
export class ScaleMetricsGrid extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) user!: ScaleUser;

  static styles = css`
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .metric-card {
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 10px 12px;
    }
    .metric-label {
      font-size: 12px;
      color: var(--secondary-text-color, #757575);
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 4px;
    }
    .metric-label ha-icon {
      --mdc-icon-size: 14px;
    }
    .metric-value {
      font-size: 20px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
    }
    .metric-unit {
      font-size: 12px;
      font-weight: 400;
      color: var(--secondary-text-color, #757575);
    }
    .no-metrics {
      text-align: center;
      padding: 16px;
      color: var(--secondary-text-color, #888);
      font-size: 14px;
      grid-column: 1 / -1;
    }
  `;

  render() {
    if (!this.user.has_body_metrics) {
      return html`
        <div class="grid">
          <div class="no-metrics">
            Body metrics not enabled for this user.
            <br />
            Enable in integration settings.
          </div>
        </div>
      `;
    }

    // Weight + impedance first, then body metrics
    const allMetrics = [
      { key: "weight", label: "Weight", icon: "mdi:human-handsdown", unit: "", precision: 1 },
      { key: "impedance", label: "Impedance", icon: "mdi:omega", unit: "", precision: 0 },
      ...METRICS,
    ];

    return html`
      <div class="grid">
        ${allMetrics.map((metric) => {
          const entityId = this.user.entities[metric.key];
          if (!entityId) return nothing;
          const state = this.hass.states[entityId];
          if (!state) {
            return html`
              <div class="metric-card">
                <div class="metric-label">
                  <ha-icon icon="${metric.icon}"></ha-icon>
                  ${metric.label}
                </div>
                <div class="metric-value">--</div>
              </div>
            `;
          }
          const val = formatNumber(state.state, metric.precision);
          const unit = (state.attributes["unit_of_measurement"] as string) ?? metric.unit;
          return html`
            <div class="metric-card">
              <div class="metric-label">
                <ha-icon icon="${metric.icon}"></ha-icon>
                ${metric.label}
              </div>
              <div class="metric-value">
                ${val}<span class="metric-unit">${unit ? ` ${unit}` : ""}</span>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}

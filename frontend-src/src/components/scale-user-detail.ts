import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { HomeAssistant, ScaleConfig, ScaleUser, WeightMeasurement } from "../types";
import { formatNumber } from "../utils/format";
import { SUMMARY_KEYS, METRICS } from "../const";
import "./scale-metrics-grid";
import "./scale-history-list";
import "./scale-weight-chart";

@customElement("scale-user-detail")
export class ScaleUserDetail extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) user!: ScaleUser;
  @property({ attribute: false }) scaleConfig!: ScaleConfig;

  static styles = css`
    :host {
      display: block;
    }
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--primary-color, #03a9f4);
      font-size: 14px;
      padding: 4px 0;
      margin-bottom: 12px;
    }
    .back-btn:hover {
      text-decoration: underline;
    }
    .back-btn ha-icon {
      --mdc-icon-size: 18px;
    }
    .user-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: 500;
      overflow: hidden;
      flex-shrink: 0;
    }
    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .user-info {
      flex: 1;
    }
    .user-name {
      font-size: 20px;
      font-weight: 600;
      color: var(--primary-text-color, #212121);
    }
    .user-weight {
      font-size: 14px;
      color: var(--secondary-text-color, #757575);
    }
    .section-title {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
      margin: 16px 0 8px;
    }
    .chart-section {
      margin: 16px 0;
    }
  `;

  private _getEntityPicture(): string | null {
    if (!this.user.person_entity) return null;
    const state = this.hass.states[this.user.person_entity];
    if (!state) return null;
    return (state.attributes["entity_picture"] as string) ?? null;
  }

  private _getWeight(): { value: string; unit: string } {
    const entityId = this.user.entities["weight"];
    if (!entityId) return { value: "--", unit: "" };
    const state = this.hass.states[entityId];
    if (!state) return { value: "--", unit: "" };
    const unit = (state.attributes["unit_of_measurement"] as string) ?? "";
    return { value: formatNumber(state.state, 1), unit };
  }

  private _getChartData(): { timestamp: string; value: number }[] {
    const entityId = this.user.entities["weight"];
    if (!entityId) return [];
    const state = this.hass.states[entityId];
    if (!state) return [];
    const history = state.attributes["weight_history"] as WeightMeasurement[] | undefined;
    if (!history || !Array.isArray(history)) return [];
    return history.map((m) => ({ timestamp: m.timestamp, value: m.weight }));
  }

  render() {
    const pic = this._getEntityPicture();
    const weight = this._getWeight();
    const chartData = this._getChartData();
    const initial = this.user.name ? this.user.name[0].toUpperCase() : "?";

    return html`
      <button class="back-btn" @click=${this._onBack}>
        <ha-icon icon="mdi:arrow-left"></ha-icon>
        Back
      </button>

      <div class="user-header">
        <div class="avatar">
          ${pic
            ? html`<img src="${pic}" alt="${this.user.name}" />`
            : initial}
        </div>
        <div class="user-info">
          <div class="user-name">${this.user.name}</div>
          <div class="user-weight">${weight.value} ${weight.unit}</div>
        </div>
      </div>

      <div class="section-title">Body Composition</div>
      <scale-metrics-grid
        .hass=${this.hass}
        .user=${this.user}
      ></scale-metrics-grid>

      ${chartData.length > 0
        ? html`
            <div class="chart-section">
              <div class="section-title">Weight History</div>
              <scale-weight-chart
                .data=${chartData}
                .unit=${weight.unit}
              ></scale-weight-chart>
            </div>
          `
        : nothing}

      <div style="margin-top: 16px;">
        <scale-history-list
          .hass=${this.hass}
          .user=${this.user}
          .scaleConfig=${this.scaleConfig}
        ></scale-history-list>
      </div>
    `;
  }

  private _onBack(): void {
    this.dispatchEvent(
      new CustomEvent("back-to-overview", {
        bubbles: true,
        composed: true,
      })
    );
  }
}

import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { HomeAssistant, ScaleUser, WeightMeasurement } from "../types";
import { SUMMARY_KEYS, METRICS } from "../const";
import { formatNumber } from "../utils/format";
import "./scale-sparkline";

@customElement("scale-user-overview")
export class ScaleUserOverview extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) user!: ScaleUser;
  @property({ type: Number }) chartDays = 7;
  @property({ type: Boolean }) showCharts = true;

  static styles = css`
    :host {
      display: block;
    }
    .user-card {
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
      padding: 16px;
      cursor: pointer;
      transition: box-shadow 0.15s, border-color 0.15s;
    }
    .user-card:hover {
      border-color: var(--primary-color, #03a9f4);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .user-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
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
      min-width: 0;
    }
    .user-name {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
    }
    .user-weight {
      font-size: 24px;
      font-weight: 600;
      color: var(--primary-text-color, #212121);
    }
    .user-summary {
      font-size: 12px;
      color: var(--secondary-text-color, #757575);
      margin-top: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .user-bottom {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: 8px;
    }
    .unavailable-indicator {
      font-size: 11px;
      color: var(--secondary-text-color, #888);
      font-style: italic;
    }
  `;

  private _getEntityPicture(): string | null {
    if (!this.user.person_entity) return null;
    const state = this.hass.states[this.user.person_entity];
    if (!state) return null;
    return (state.attributes["entity_picture"] as string) ?? null;
  }

  private _getWeight(): { value: string; unit: string; available: boolean } {
    const entityId = this.user.entities["weight"];
    if (!entityId) return { value: "--", unit: "", available: false };
    const state = this.hass.states[entityId];
    if (!state) return { value: "--", unit: "", available: false };
    const available = state.state !== "unavailable" && state.state !== "unknown";
    const unit = (state.attributes["unit_of_measurement"] as string) ?? "";
    return {
      value: available ? formatNumber(state.state, 1) : formatNumber(state.state, 1),
      unit,
      available,
    };
  }

  private _getSummaryLine(): string {
    const parts: string[] = [];
    for (const key of SUMMARY_KEYS) {
      const entityId = this.user.entities[key];
      if (!entityId) continue;
      const state = this.hass.states[entityId];
      if (!state || state.state === "unavailable" || state.state === "unknown") continue;
      const metric = METRICS.find((m) => m.key === key);
      if (!metric) continue;
      const val = formatNumber(state.state, metric.precision);
      if (val === "--") continue;
      const unit = (state.attributes["unit_of_measurement"] as string) ?? metric.unit;
      parts.push(`${metric.label} ${val}${unit}`);
    }
    return parts.join("  \u00b7  ");
  }

  private _getSparklineData(): { timestamp: string; value: number }[] {
    const entityId = this.user.entities["weight"];
    if (!entityId) return [];
    const state = this.hass.states[entityId];
    if (!state) return [];
    const history = state.attributes["weight_history"] as WeightMeasurement[] | undefined;
    if (!history || !Array.isArray(history)) return [];

    const cutoff = Date.now() - this.chartDays * 24 * 60 * 60 * 1000;
    return history
      .filter((m) => {
        try {
          return new Date(m.timestamp).getTime() >= cutoff;
        } catch {
          return false;
        }
      })
      .map((m) => ({ timestamp: m.timestamp, value: m.weight }));
  }

  render() {
    const pic = this._getEntityPicture();
    const weight = this._getWeight();
    const summary = this._getSummaryLine();
    const sparkData = this.showCharts ? this._getSparklineData() : [];
    const initial = this.user.name ? this.user.name[0].toUpperCase() : "?";

    return html`
      <div class="user-card" @click=${this._onClick}>
        <div class="user-header">
          <div class="avatar">
            ${pic
              ? html`<img src="${pic}" alt="${this.user.name}" />`
              : initial}
          </div>
          <div class="user-info">
            <div class="user-name">${this.user.name}</div>
          </div>
        </div>
        <div class="user-weight">
          ${weight.value}${weight.value !== "--" ? html` <span style="font-size: 14px; font-weight: 400;">${weight.unit}</span>` : nothing}
        </div>
        ${summary
          ? html`<div class="user-summary">${summary}</div>`
          : nothing}
        <div class="user-bottom">
          ${!weight.available && weight.value !== "--"
            ? html`<span class="unavailable-indicator">Last known</span>`
            : html`<span></span>`}
          ${this.showCharts && sparkData.length > 0
            ? html`<scale-sparkline .data=${sparkData}></scale-sparkline>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _onClick(): void {
    this.dispatchEvent(
      new CustomEvent("user-select", {
        detail: { userId: this.user.user_id },
        bubbles: true,
        composed: true,
      })
    );
  }
}

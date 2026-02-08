import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { normalizeData, polylinePoints, DataPoint } from "../utils/chart";
import { formatShortDate } from "../utils/format";

@customElement("scale-weight-chart")
export class ScaleWeightChart extends LitElement {
  @property({ type: Array }) data: { timestamp: string; value: number }[] = [];
  @property({ type: String }) unit = "";

  static styles = css`
    :host {
      display: block;
    }
    .chart-container {
      position: relative;
      width: 100%;
    }
    svg {
      display: block;
      width: 100%;
      height: auto;
    }
    .line {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .area {
      fill: var(--primary-color, #03a9f4);
      opacity: 0.1;
    }
    .dot {
      fill: var(--primary-color, #03a9f4);
    }
    .axis-label {
      font-size: 10px;
      fill: var(--secondary-text-color, #888);
    }
    .grid-line {
      stroke: var(--divider-color, #e0e0e0);
      stroke-width: 0.5;
      stroke-dasharray: 4 2;
    }
    .no-data {
      text-align: center;
      padding: 24px;
      color: var(--secondary-text-color, #888);
      font-size: 14px;
    }
  `;

  render() {
    if (!this.data || this.data.length === 0) {
      return html`<div class="no-data">No weight data yet</div>`;
    }

    const W = 400;
    const H = 200;
    const padLeft = 50;
    const padRight = 16;
    const padTop = 16;
    const padBottom = 28;

    const { points, min, max } = normalizeData(this.data);

    const chartW = W - padLeft - padRight;
    const chartH = H - padTop - padBottom;

    // Build polyline points in chart space
    const linePts = points
      .map((p) => `${padLeft + p.x * chartW},${padTop + (1 - p.y) * chartH}`)
      .join(" ");

    // Build area polygon (line + close to bottom)
    const first = points[0];
    const last = points[points.length - 1];
    const areaPts =
      linePts +
      ` ${padLeft + last.x * chartW},${padTop + chartH}` +
      ` ${padLeft + first.x * chartW},${padTop + chartH}`;

    // Y-axis labels (3-5 ticks)
    const yRange = max - min;
    const tickCount = 4;
    const yTicks: { value: number; y: number }[] = [];
    for (let i = 0; i <= tickCount; i++) {
      const val = min + (yRange * i) / tickCount;
      const y = padTop + (1 - i / tickCount) * chartH;
      yTicks.push({ value: val, y });
    }

    // X-axis date labels (spread evenly from data)
    const xLabelCount = Math.min(points.length, 5);
    const xLabels: { label: string; x: number }[] = [];
    if (points.length > 1) {
      for (let i = 0; i < xLabelCount; i++) {
        const idx = Math.round((i * (points.length - 1)) / (xLabelCount - 1));
        const p = points[idx];
        xLabels.push({
          label: formatShortDate(p.label!),
          x: padLeft + p.x * chartW,
        });
      }
    } else {
      xLabels.push({
        label: formatShortDate(points[0].label!),
        x: padLeft + points[0].x * chartW,
      });
    }

    return html`
      <div class="chart-container">
        <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
          <!-- Grid lines -->
          ${yTicks.map(
            (t) => html`
              <line
                class="grid-line"
                x1="${padLeft}"
                y1="${t.y}"
                x2="${W - padRight}"
                y2="${t.y}"
              />
            `
          )}

          <!-- Area fill -->
          <polygon class="area" points="${areaPts}" />

          <!-- Data line -->
          <polyline class="line" points="${linePts}" />

          <!-- Data points -->
          ${points.map((p) => {
            const cx = padLeft + p.x * chartW;
            const cy = padTop + (1 - p.y) * chartH;
            return html`<circle class="dot" cx="${cx}" cy="${cy}" r="3" />`;
          })}

          <!-- Y-axis labels -->
          ${yTicks.map(
            (t) => html`
              <text
                class="axis-label"
                x="${padLeft - 6}"
                y="${t.y + 3}"
                text-anchor="end"
              >
                ${t.value.toFixed(1)}
              </text>
            `
          )}

          <!-- X-axis labels -->
          ${xLabels.map(
            (l) => html`
              <text
                class="axis-label"
                x="${l.x}"
                y="${H - 4}"
                text-anchor="middle"
              >
                ${l.label}
              </text>
            `
          )}
        </svg>
      </div>
    `;
  }
}

import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { normalizeData, polylinePoints } from "../utils/chart";

@customElement("scale-sparkline")
export class ScaleSparkline extends LitElement {
  @property({ type: Array }) data: { timestamp: string; value: number }[] = [];
  @property({ type: Number }) width = 120;
  @property({ type: Number }) height = 40;

  static styles = css`
    :host {
      display: inline-block;
    }
    svg {
      display: block;
    }
    .line {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .dot {
      fill: var(--primary-color, #03a9f4);
    }
  `;

  render() {
    if (!this.data || this.data.length === 0) {
      return html`<span style="color: var(--secondary-text-color, #888); font-size: 12px;">No data yet</span>`;
    }

    const { points } = normalizeData(this.data);
    const pad = 4;
    const pts = polylinePoints(points, this.width, this.height, pad);

    // Last point for the dot
    const last = points[points.length - 1];
    const dotX = pad + last.x * (this.width - pad * 2);
    const dotY = pad + (1 - last.y) * (this.height - pad * 2);

    return html`
      <svg
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
      >
        <polyline class="line" points="${pts}" />
        <circle class="dot" cx="${dotX}" cy="${dotY}" r="2.5" />
      </svg>
    `;
  }
}

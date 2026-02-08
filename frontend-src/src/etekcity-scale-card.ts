import { LitElement, html, css, nothing, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type {
  HomeAssistant,
  ScaleCardConfig,
  ScaleConfig,
  ActiveView,
} from "./types";
import { DOMAIN } from "./const";
import { fetchCardConfig } from "./entity-discovery";
import "./components/scale-pending-banner";
import "./components/scale-user-overview";
import "./components/scale-user-detail";

@customElement("etekcity-scale-card")
export class EtekcityScaleCard extends LitElement {
  @state() private _config!: ScaleCardConfig;
  @state() private _scaleConfig?: ScaleConfig;
  @state() private _activeView: ActiveView = { type: "overview" };
  @state() private _error?: string;
  @state() private _loading = true;

  private _hass?: HomeAssistant;
  private _configFetched = false;

  static styles = css`
    :host {
      display: block;
    }
    ha-card {
      padding: 16px;
      overflow: hidden;
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .card-title {
      font-size: 18px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
    }
    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 12px;
    }
    .error-msg {
      color: var(--error-color, #f44336);
      padding: 16px;
      text-align: center;
    }
    .loading {
      text-align: center;
      padding: 32px;
      color: var(--secondary-text-color, #888);
    }
    .no-users {
      text-align: center;
      padding: 24px;
      color: var(--secondary-text-color, #888);
    }
    .no-users a {
      color: var(--primary-color, #03a9f4);
      text-decoration: none;
    }
    .no-users a:hover {
      text-decoration: underline;
    }
  `;

  setConfig(config: ScaleCardConfig): void {
    this._config = {
      show_pending: true,
      show_charts: true,
      chart_days: 7,
      ...config,
    };
  }

  set hass(hass: HomeAssistant) {
    const old = this._hass;
    this._hass = hass;

    if (!this._configFetched && hass) {
      this._configFetched = true;
      this._fetchConfig(hass);
    }

    this.requestUpdate("hass", old);
  }

  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  private async _fetchConfig(hass: HomeAssistant): Promise<void> {
    this._loading = true;
    try {
      const result = await fetchCardConfig(hass, this._config?.device_id);
      if (result) {
        this._scaleConfig = result;
        this._error = undefined;
      } else {
        // Check if multiple scales exist but no device_id specified
        const resp = (await hass.connection.sendMessagePromise({
          type: `${DOMAIN}/card_config`,
        })) as { scales: ScaleConfig[] };
        if (resp.scales && resp.scales.length > 1) {
          const ids = resp.scales
            .map((s) => `  device_id: "${s.device_id}" # ${s.device_name}`)
            .join("\n");
          this._error = `Multiple scales found. Please specify device_id in card config:\n${ids}`;
        } else if (resp.scales && resp.scales.length === 0) {
          this._error = "No scales configured. Set up the Etekcity Scale integration first.";
        } else {
          this._error = "Could not load scale configuration.";
        }
      }
    } catch (err: any) {
      this._error = `Failed to load: ${err.message || err}`;
    }
    this._loading = false;
  }

  private _handleUserSelect(e: CustomEvent): void {
    this._activeView = { type: "detail", userId: e.detail.userId };
  }

  private _handleBackToOverview(): void {
    this._activeView = { type: "overview" };
  }

  render(): TemplateResult {
    if (!this._hass || !this._config) {
      return html`<ha-card><div class="loading">Loading...</div></ha-card>`;
    }

    if (this._loading) {
      return html`<ha-card><div class="loading">Loading scale data...</div></ha-card>`;
    }

    if (this._error) {
      return html`
        <ha-card>
          <div class="error-msg">
            <ha-icon icon="mdi:alert-circle-outline" style="--mdc-icon-size: 36px; display: block; margin: 0 auto 8px;"></ha-icon>
            <pre style="white-space: pre-wrap; font-family: inherit; margin: 0;">${this._error}</pre>
          </div>
        </ha-card>
      `;
    }

    if (!this._scaleConfig) {
      return html`<ha-card><div class="loading">No data</div></ha-card>`;
    }

    const title = this._config.title ?? this._scaleConfig.device_name;

    // Detail view
    if (this._activeView.type === "detail") {
      const detailUserId = this._activeView.userId;
      const detailUser = this._scaleConfig.users.find(
        (u) => u.user_id === detailUserId
      );
      if (!detailUser) {
        this._activeView = { type: "overview" };
        return this._renderOverview(title);
      }
      return html`
        <ha-card>
          <scale-user-detail
            .hass=${this._hass}
            .user=${detailUser}
            .scaleConfig=${this._scaleConfig}
            @back-to-overview=${this._handleBackToOverview}
          ></scale-user-detail>
        </ha-card>
      `;
    }

    return this._renderOverview(title);
  }

  private _renderOverview(title: string): TemplateResult {
    return html`
      <ha-card>
        <div class="card-header">
          <div class="card-title">${title}</div>
        </div>

        ${this._config.show_pending
          ? html`
              <scale-pending-banner
                .hass=${this._hass!}
                .scaleConfig=${this._scaleConfig!}
              ></scale-pending-banner>
            `
          : nothing}

        ${this._scaleConfig!.users.length === 0
          ? html`
              <div class="no-users">
                No users configured.
                <br />
                Add users in the
                <a href="/config/integrations/integration/${DOMAIN}"
                  >integration settings</a
                >.
              </div>
            `
          : html`
              <div class="users-grid">
                ${this._scaleConfig!.users.map(
                  (user) => html`
                    <scale-user-overview
                      .hass=${this._hass!}
                      .user=${user}
                      .chartDays=${this._config.chart_days ?? 7}
                      .showCharts=${this._config.show_charts ?? true}
                      @user-select=${this._handleUserSelect}
                    ></scale-user-overview>
                  `
                )}
              </div>
            `}
      </ha-card>
    `;
  }

  getCardSize(): number {
    if (!this._scaleConfig) return 3;
    return Math.max(2, this._scaleConfig.users.length * 2 + 1);
  }

  static getConfigElement(): undefined {
    return undefined;
  }

  static getStubConfig(): ScaleCardConfig {
    return {
      type: "custom:etekcity-scale-card",
    };
  }
}

// Register for the card picker
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "etekcity-scale-card",
  name: "Etekcity Fitness Scale",
  description: "Body composition dashboard for Etekcity BLE scales",
  preview: true,
  documentationURL:
    "https://github.com/ronnnnnnnnnnnnn/etekcity_fitness_scale_ble",
});

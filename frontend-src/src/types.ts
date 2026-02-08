/** Home Assistant types (minimal subset needed by the card). */

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>
  ): Promise<void>;
  connection: {
    sendMessagePromise(msg: Record<string, unknown>): Promise<unknown>;
  };
  themes: { darkMode: boolean };
  language: string;
  locale: {
    language: string;
    number_format: string;
  };
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

/** Card configuration from YAML. */
export interface ScaleCardConfig {
  type: string;
  device_id?: string;
  title?: string;
  show_pending?: boolean;
  show_charts?: boolean;
  chart_days?: number;
}

/** Data returned by the WebSocket card_config endpoint. */
export interface CardConfigResponse {
  scales: ScaleConfig[];
}

export interface ScaleConfig {
  device_id: string;
  device_name: string;
  users: ScaleUser[];
  diagnostics: {
    user_directory?: string;
    pending_measurements?: string;
  };
}

export interface ScaleUser {
  user_id: string;
  name: string;
  person_entity: string | null;
  has_body_metrics: boolean;
  entities: Record<string, string>;
}

/** A single measurement from weight_history attribute. */
export interface WeightMeasurement {
  timestamp: string;
  weight: number;
  unit: string;
  impedance?: number;
}

/** A pending measurement from the pending_measurements sensor. */
export interface PendingMeasurement {
  Timestamp: string;
  "Weight (kg)"?: number;
  "Weight (lbs)"?: number;
  "Impedance (Ω)"?: number;
}

/** View state for internal navigation. */
export type ActiveView =
  | { type: "overview" }
  | { type: "detail"; userId: string };

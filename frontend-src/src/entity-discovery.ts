import { HomeAssistant, CardConfigResponse, ScaleConfig } from "./types";
import { WS_CARD_CONFIG } from "./const";

/** Cached config result keyed by device_id (or "__all__" for full response). */
const _cache = new Map<string, { data: ScaleConfig; ts: number }>();
const CACHE_TTL = 60_000; // 1 minute

/**
 * Fetch the card configuration from the backend WebSocket API.
 * Caches results for CACHE_TTL milliseconds.
 */
export async function fetchCardConfig(
  hass: HomeAssistant,
  deviceId?: string
): Promise<ScaleConfig | undefined> {
  const now = Date.now();
  const cacheKey = deviceId ?? "__single__";

  const cached = _cache.get(cacheKey);
  if (cached && now - cached.ts < CACHE_TTL) {
    return cached.data;
  }

  try {
    const resp = (await hass.connection.sendMessagePromise({
      type: WS_CARD_CONFIG,
    })) as CardConfigResponse;

    if (!resp || !resp.scales || resp.scales.length === 0) {
      return undefined;
    }

    // Cache all scales
    for (const scale of resp.scales) {
      _cache.set(scale.device_id, { data: scale, ts: now });
    }

    if (deviceId) {
      const match = resp.scales.find((s) => s.device_id === deviceId);
      if (match) {
        return match;
      }
      return undefined;
    }

    // No device_id specified - return single scale or undefined if multiple
    if (resp.scales.length === 1) {
      _cache.set("__single__", { data: resp.scales[0], ts: now });
      return resp.scales[0];
    }

    return undefined;
  } catch (err) {
    console.error("etekcity-scale-card: Failed to fetch card config:", err);
    return undefined;
  }
}

/** Invalidate the cache so next call fetches fresh data. */
export function invalidateCache(): void {
  _cache.clear();
}

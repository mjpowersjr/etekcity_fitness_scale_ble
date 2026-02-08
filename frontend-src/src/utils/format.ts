/** Format a number with specified decimal places. Returns "--" for invalid values. */
export function formatNumber(
  value: string | number | undefined | null,
  precision: number = 1
): string {
  if (value === undefined || value === null || value === "" || value === "unknown" || value === "unavailable") {
    return "--";
  }
  const num = typeof value === "number" ? value : parseFloat(value);
  if (isNaN(num)) {
    return "--";
  }
  return num.toFixed(precision);
}

/** Format a weight value, detecting unit from entity state. */
export function formatWeight(
  value: string | number | undefined | null,
  unit?: string
): string {
  const formatted = formatNumber(value, 1);
  if (formatted === "--") return formatted;
  return unit ? `${formatted} ${unit}` : formatted;
}

/** Format a timestamp string to a short locale date/time. */
export function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

/** Format a timestamp to just a short date. */
export function formatShortDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export interface DataPoint {
  x: number; // normalized 0-1
  y: number; // normalized 0-1
  label?: string;
  value: number;
}

/**
 * Generate an SVG polyline points string from normalized data points.
 * Maps (0-1, 0-1) coordinates to (0-width, height-0) SVG space.
 */
export function polylinePoints(
  points: DataPoint[],
  width: number,
  height: number,
  padding: number = 0
): string {
  if (points.length === 0) return "";
  const w = width - padding * 2;
  const h = height - padding * 2;
  return points
    .map((p) => `${padding + p.x * w},${padding + (1 - p.y) * h}`)
    .join(" ");
}

/**
 * Normalize an array of values to 0-1 range.
 * Returns { points, min, max } where points have x (time-based) and y (value-based) normalized.
 */
export function normalizeData(
  values: { timestamp: string; value: number }[]
): { points: DataPoint[]; min: number; max: number } {
  if (values.length === 0) {
    return { points: [], min: 0, max: 0 };
  }

  const nums = values.map((v) => v.value);
  let min = Math.min(...nums);
  let max = Math.max(...nums);

  // Add 5% margin
  const range = max - min || 1;
  min -= range * 0.05;
  max += range * 0.05;

  const times = values.map((v) => new Date(v.timestamp).getTime());
  const tMin = Math.min(...times);
  const tMax = Math.max(...times);
  const tRange = tMax - tMin || 1;

  const points: DataPoint[] = values.map((v, i) => ({
    x: (times[i] - tMin) / tRange,
    y: (v.value - min) / (max - min),
    label: v.timestamp,
    value: v.value,
  }));

  return { points, min, max };
}

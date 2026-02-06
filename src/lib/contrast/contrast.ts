export type RGB = { r: number; g: number; b: number };

export function normaliseHex(hex: string): string {
  const raw = (hex || "").trim().replace("#", "");
  if (raw.length === 3) {
    // e.g. "abc" -> "aabbcc"
    return "#" + raw.split("").map((c) => c + c).join("");
  }
  if (raw.length === 6) return "#" + raw.toLowerCase();
  return "#000000"; // safe fallback
}

export function hexToRgb(hex: string): RGB {
  const h = normaliseHex(hex).replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return { r, g, b };
}

/**
 * Convert sRGB channel (0..255) to linear value (0..1)
 */
export function srgbChannelToLinear(channel255: number): number {
  const c = channel255 / 255;
  // WCAG 2.x formula
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * WCAG relative luminance (0..1)
 */
export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const R = srgbChannelToLinear(r);
  const G = srgbChannelToLinear(g);
  const B = srgbChannelToLinear(b);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * WCAG contrast ratio, always >= 1
 */
export function contrastRatio(foregroundHex: string, backgroundHex: string): number {
  const L1 = relativeLuminance(foregroundHex);
  const L2 = relativeLuminance(backgroundHex);

  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);

  return (lighter + 0.05) / (darker + 0.05);
}

export function roundRatio(ratio: number, decimals = 1): number {
  const p = Math.pow(10, decimals);
  return Math.round(ratio * p) / p;
}
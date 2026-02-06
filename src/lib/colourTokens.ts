import type { TokenConfig } from "@/lib/config";

export type ColourToken = {
  key: string;      // stable id for select
  label: string;    // human label
  value: string;    // hex
};

export function getColourTokens(config: TokenConfig): ColourToken[] {
  const out: ColourToken[] = [];

  // Brand
  const b = config.colour.brand;
  out.push(
    { key: "brand.primary", label: "Primary", value: b.primary },
    { key: "brand.primaryDark", label: "Primary Dark", value: b.primaryDark },
    { key: "brand.primaryLight", label: "Primary Light", value: b.primaryLight },
    { key: "brand.accent", label: "Accent", value: b.accent }
  );

  // Semantic
  const s = config.colour.semantic;
  out.push(
    { key: "semantic.background", label: "Background", value: s.background },
    { key: "semantic.surface", label: "Surface", value: s.surface },
    { key: "semantic.text", label: "Text", value: s.text },
    { key: "semantic.mutedText", label: "Muted Text", value: s.mutedText },
    { key: "semantic.border", label: "Border", value: s.border }
  );

  // Neutral
  const n = config.colour.neutral;
  (Object.keys(n) as Array<keyof typeof n>).forEach((k) => {
    out.push({ key: `neutral.${k}`, label: `Neutral ${k}`, value: n[k] });
  });

  return out.filter((t) => typeof t.value === "string" && t.value.length > 0);
}

export function findToken(tokens: ColourToken[], key: string): ColourToken | undefined {
  return tokens.find((t) => t.key === key);
}
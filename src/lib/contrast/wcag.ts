// src/lib/contrast/wcag.ts

export type WcagLevel = "AAA" | "AA" | "AA_LARGE" | "FAIL";

/**
 * Two useful rule types for Token Studio:
 * - text: SC 1.4.3 (normal/large text)
 * - ui: SC 1.4.11 (UI components + graphical objects)
 */
export type ContrastContext =
  | {
      kind: "text";
      fontSizePx: number;
      fontWeight?: number; // used for 14pt bold rule
    }
  | {
      kind: "ui";
    };

export type WcagResult = {
  level: WcagLevel;
  thresholds: {
    AA: number;
    AAA?: number;
  };
  notes?: string;
};

function isLargeText(fontSizePx: number, fontWeight?: number): boolean {
  // WCAG large text:
  // - 18pt+ normal (~24px) OR
  // - 14pt+ bold (~18.66px) with bold weight
  const is18ptPlus = fontSizePx >= 24;
  const is14ptBoldPlus = fontSizePx >= 18.66 && (fontWeight ?? 400) >= 700;
  return is18ptPlus || is14ptBoldPlus;
}

export function getWcagResult(ratio: number, ctx: ContrastContext): WcagResult {
  if (ctx.kind === "ui") {
    // SC 1.4.11: UI components/graphics need 3:1 (AA only)
    const AA = 3.0;
    return ratio >= AA
      ? { level: "AA", thresholds: { AA }, notes: "UI components (3:1)" }
      : { level: "FAIL", thresholds: { AA }, notes: "UI components (3:1)" };
  }

  // Text (SC 1.4.3)
  const large = isLargeText(ctx.fontSizePx, ctx.fontWeight);
  const AA = large ? 3.0 : 4.5;
  const AAA = large ? 4.5 : 7.0;

  if (ratio >= AAA) return { level: "AAA", thresholds: { AA, AAA } };
  if (ratio >= AA) return { level: large ? "AA_LARGE" : "AA", thresholds: { AA, AAA } };
  return { level: "FAIL", thresholds: { AA, AAA } };
}

export function levelLabel(level: WcagLevel): string {
  switch (level) {
    case "AAA":
      return "AAA Pass";
    case "AA":
      return "AA Pass";
    case "AA_LARGE":
      return "AA (Large text)";
    default:
      return "Fail";
  }
}
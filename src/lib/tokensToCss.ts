import type { TokenConfig } from "./config";

export function tokensToCssVars(config: TokenConfig): Record<string, string> {
  return {
    "--ts-color-primary": config.colour.primary,
    "--ts-color-bg": config.colour.background,
    "--ts-color-text": config.colour.text,
    "--ts-font-body": config.typography.fontFamily,
    "--ts-font-size-base": `${config.typography.baseSizePx}px`,
  };
}

export function cssVarsToString(vars: Record<string, string>) {
  return `:root{\n${Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n")}\n}`;
}
export function downloadTextFile(filename: string, content: string, mime = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
"use client";

import { useMemo, useState } from "react";
import type { TokenConfig } from "@/lib/config";
import { getColourTokens, findToken } from "@/lib/colourTokens";
import { contrastRatio, roundRatio } from "@/lib/contrast/contrast";
import { getWcagResult, levelLabel } from "@/lib/contrast/wcag";

function pillStyle(level: string): React.CSSProperties {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.12)",
    fontSize: 12,
    fontWeight: 700
  };

  if (level === "AAA") return { ...base, background: "rgba(16,185,129,0.12)" };
  if (level === "AA" || level === "AA_LARGE") return { ...base, background: "rgba(245,158,11,0.12)" };
  return { ...base, background: "rgba(239,68,68,0.12)" };
}

export default function ValidatorPanel({ config }: { config: TokenConfig }) {
  const tokens = useMemo(() => getColourTokens(config), [config]);

  const [textKey, setTextKey] = useState<string>("semantic.text");
  const [bgKey, setBgKey] = useState<string>("semantic.background");

  const textTok = findToken(tokens, textKey) ?? tokens[0];
  const bgTok = findToken(tokens, bgKey) ?? tokens[1];

  const ratio = useMemo(() => {
    if (!textTok?.value || !bgTok?.value) return 1;
    return contrastRatio(textTok.value, bgTok.value);
  }, [textTok?.value, bgTok?.value]);

  const ratioRounded = roundRatio(ratio, 1);
  const wcag = getWcagResult(ratio, { fontSizePx: config.typography.baseSizePx });

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // ignore
    }
  }

  return (
    <section
      style={{
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 16,
        padding: 18,
        background: "rgba(255,255,255,0.55)"
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16 }}>Validator</h3>
      <p style={{ marginTop: 6, marginBottom: 14, opacity: 0.8, maxWidth: 720 }}>
        Check text ↔ background contrast using your current tokens.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 180px", gap: 12, alignItems: "end" }}>
        <label style={{ display: "grid", gap: 6 }}>
          <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 700 }}>Text colour</div>
          <select value={textKey} onChange={(e) => setTextKey(e.target.value)} style={{ padding: 10, borderRadius: 12 }}>
            {tokens.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label} ({t.value})
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 700 }}>Background colour</div>
          <select value={bgKey} onChange={(e) => setBgKey(e.target.value)} style={{ padding: 10, borderRadius: 12 }}>
            {tokens.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label} ({t.value})
              </option>
            ))}
          </select>
        </label>

        <div style={{ display: "grid", gap: 8, justifyItems: "start" }}>
          <div style={pillStyle(wcag.level)}>{levelLabel(wcag.level)}</div>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Contrast: {ratioRounded}:1</div>
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          borderRadius: config.shape.radiusPx,
          border: "1px solid rgba(0,0,0,0.12)",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            background: bgTok?.value,
            color: textTok?.value,
            padding: 18,
            display: "grid",
            gap: 10
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 18 }}>The quick brown fox jumps over the lazy dog</div>
          <div style={{ opacity: 0.85 }}>Live preview using the selected tokens.</div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => copy(textTok?.value ?? "")}
              style={{ padding: "8px 10px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.2)", background: "transparent", cursor: "pointer" }}
            >
              Copy text: {textTok?.value}
            </button>
            <button
              type="button"
              onClick={() => copy(bgTok?.value ?? "")}
              style={{ padding: "8px 10px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.2)", background: "transparent", cursor: "pointer" }}
            >
              Copy bg: {bgTok?.value}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
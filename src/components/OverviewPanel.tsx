"use client";

import { useMemo, useState } from "react";
import type { TokenConfig } from "@/lib/config";
import { tokensToCssVars, cssVarsToString, downloadTextFile } from "@/lib/tokensToCss";

function ColourTile({
  label,
  value,
  copied,
  onCopy
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onCopy}
      style={{
        width: "100%",
        textAlign: "left",
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 14,
        padding: 12,
        background: "rgba(255,255,255,0.65)",
        cursor: "pointer"
      }}
      title="Click to copy"
    >
      <div
        style={{
          height: 56,
          borderRadius: 12,
          background: value,
          border: "1px solid rgba(0,0,0,0.06)"
        }}
      />
      <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
          <div style={{ fontSize: 13, fontWeight: 800 }}>{value.toUpperCase()}</div>
        </div>
        <div style={{ fontSize: 12, opacity: copied ? 0.95 : 0.6, fontWeight: copied ? 800 : 600 }}>
          {copied ? "Copied" : "Copy"}
        </div>
      </div>
    </button>
  );
}

export default function OverviewPanel({
  config,
  showActions = true
}: {
  config: TokenConfig;
  showActions?: boolean;
}) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const cssVars = useMemo(() => tokensToCssVars(config), [config]);
  const cssText = useMemo(() => cssVarsToString(cssVars), [cssVars]);

  const copy = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 900);
  };

  return (
    <>
      {/* Inject token CSS variables for this view */}
      <style>{cssText}</style>

      <div
        style={{
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: 16,
          padding: 24,
          background: "rgba(255,255,255,0.55)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <div>
            <h2 style={{ margin: 0 }}>{config.meta.title}</h2>
            <p style={{ margin: "6px 0 0", maxWidth: 620, opacity: 0.8 }}>
              Styleguide overview. Click any token to copy.
            </p>
          </div>

          {showActions && (
            <div style={{ display: "grid", gap: 10, minWidth: 220 }}>
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(cssText);
                }}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.2)",
                  background: "transparent",
                  cursor: "pointer",
                  fontWeight: 700
                }}
              >
                Copy CSS variables
              </button>

              <button
                type="button"
                onClick={() =>
                  downloadTextFile(
                    "tokens.json",
                    JSON.stringify(config, null, 2),
                    "application/json"
                  )
                }
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.2)",
                  background: "transparent",
                  cursor: "pointer",
                  fontWeight: 700
                }}
              >
                Download tokens.json
              </button>
            </div>
          )}
        </div>

        {/* Colours */}
        <section style={{ marginTop: 22 }}>
          <h3 style={{ margin: "0 0 10px", fontSize: 13, letterSpacing: 0.2, opacity: 0.85 }}>
            Colours
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
            <ColourTile
              label="Primary"
              value={config.colour.primary}
              copied={copiedKey === "primary"}
              onCopy={() => copy("primary", config.colour.primary)}
            />
            <ColourTile
              label="Background"
              value={config.colour.background}
              copied={copiedKey === "background"}
              onCopy={() => copy("background", config.colour.background)}
            />
            <ColourTile
              label="Text"
              value={config.colour.text}
              copied={copiedKey === "text"}
              onCopy={() => copy("text", config.colour.text)}
            />
          </div>
        </section>

        {/* Component gallery preview */}
        <section style={{ marginTop: 22 }}>
          <h3 style={{ margin: "0 0 10px", fontSize: 13, letterSpacing: 0.2, opacity: 0.85 }}>
            Component preview
          </h3>

          <div style={{ display: "grid", gap: 14 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                style={{
                  background: "var(--ts-color-primary)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontWeight: 700
                }}
              >
                Primary action
              </button>

              <button
                style={{
                  background: "transparent",
                  color: "var(--ts-color-text)",
                  border: "1px solid rgba(0,0,0,0.18)",
                  borderRadius: 12,
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontWeight: 700
                }}
              >
                Secondary
              </button>
            </div>

            <div style={{ display: "grid", gap: 8, maxWidth: 520 }}>
              <label style={{ fontSize: 12, opacity: 0.75 }}>Text input</label>
              <input
                placeholder="Type here…"
                style={{
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.2)",
                  background: "transparent",
                  color: "inherit"
                }}
              />
            </div>

            <div
              style={{
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 14,
                padding: 16,
                maxWidth: 680
              }}
            >
              <div style={{ fontWeight: 800 }}>Card</div>
              <div style={{ marginTop: 6, opacity: 0.8 }}>
                This block uses your tokens for background, text, and typography.
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
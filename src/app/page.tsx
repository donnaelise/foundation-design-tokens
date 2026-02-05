"use client";
import { createId, saveConfig } from "@/lib/storage";

import { useMemo, useState } from "react";
import { defaultConfig, type TokenConfig } from "@/lib/config";
import {
  tokensToCssVars,
  cssVarsToString,
  downloadTextFile
} from "@/lib/tokensToCss";

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
        borderRadius: 12,
        padding: 12,
        background: "rgba(255,255,255,0.6)",
        cursor: "pointer"
      }}
      title="Click to copy"
    >
      <div
        style={{
          height: 56,
          borderRadius: 10,
          background: value,
          border: "1px solid rgba(0,0,0,0.06)"
        }}
      />
      <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>{value.toUpperCase()}</div>
        </div>
        <div style={{ fontSize: 12, opacity: copied ? 0.9 : 0.6, fontWeight: copied ? 800 : 600 }}>
          {copied ? "Copied" : "Copy"}
        </div>
      </div>
    </button>
  );
}

export default function Home() {
  const [config, setConfig] = useState<TokenConfig>(defaultConfig);
const [saveId, setSaveId] = useState<string | null>(null);
  const cssVars = useMemo(() => tokensToCssVars(config), [config]);
  const cssText = useMemo(() => cssVarsToString(cssVars), [cssVars]);

const [copiedKey, setCopiedKey] = useState<string | null>(null);

const copy = async (key: string, value: string) => {
  await navigator.clipboard.writeText(value);
  setCopiedKey(key);
  window.setTimeout(() => setCopiedKey(null), 900);
};
  return (
    <>
      {/* Inject token CSS variables */}
      <style>{cssText}</style>

      <div
        style={{
          background: "var(--ts-color-bg)",
          color: "var(--ts-color-text)",
          fontFamily: "var(--ts-font-body)",
          fontSize: "var(--ts-font-size-base)",
          minHeight: "100vh",
          padding: 24
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 24
          }}
        >
          {/* Editor */}
          <aside
            style={{
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 12,
              padding: 16
            }}
          >
            <h1 style={{ margin: 0, fontSize: 18 }}>Editor</h1>

            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(cssText);
                } catch (e) {
                  console.error(e);
                }
              }}
              style={{
                marginTop: 12,
                width: "100%",
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.2)",
                background: "transparent",
                cursor: "pointer",
                fontWeight: 600
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
                marginTop: 10,
                width: "100%",
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.2)",
                background: "transparent",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              Download tokens.json
            </button>
<button
  type="button"
  onClick={async () => {
    const id = saveId ?? createId();
    saveConfig(id, config);
    saveConfig(id, config);
console.log("Saved id:", id);
console.log("Saved item:", localStorage.getItem("ts:item:" + id));
    setSaveId(id);

    const url = `${window.location.origin}/view/${id}`;
    await navigator.clipboard.writeText(url);
  }}
  style={{
    marginTop: 10,
    width: "100%",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.2)",
    background: "transparent",
    cursor: "pointer",
    fontWeight: 600
  }}
>
  Save + copy local link
</button>
            <label style={{ display: "block", marginTop: 16 }}>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Title</div>
              <input
                placeholder="Type here…"
                value={config.meta.title}
                onChange={(e) =>
                  setConfig((c) => ({
                    ...c,
                    meta: { ...c.meta, title: e.target.value }
                  }))
                }
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                suppressHydrationWarning
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.2)",
                  background: "transparent",
                  color: "inherit"
                }}
              />
            </label>

            <label style={{ display: "block", marginTop: 16 }}>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Primary colour</div>
              <input
                type="color"
                value={config.colour.primary ?? defaultConfig.colour.primary}

                onChange={(e) =>
                  setConfig((c) => ({
                    ...c,
                    colour: { ...c.colour, primary: e.target.value }
                  }))
                }
                style={{
                  width: "100%",
                  height: 40,
                  padding: 0,
                  border: "none",
                  background: "transparent"
                }}
              />
            </label>

            <label style={{ display: "block", marginTop: 16 }}>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Background</div>
              <input
                type="color"
                value={config.colour.background ?? defaultConfig.colour.background}
                onChange={(e) =>
                  setConfig((c) => ({
                    ...c,
                    colour: { ...c.colour, background: e.target.value }
                  }))
                }
                style={{
                  width: "100%",
                  height: 40,
                  padding: 0,
                  border: "none",
                  background: "transparent"
                }}
              />
            </label>

            <label style={{ display: "block", marginTop: 16 }}>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Text</div>
              <input
                type="color"
                  value={config.colour.text ?? defaultConfig.colour.text}

                onChange={(e) =>
                  setConfig((c) => ({
                    ...c,
                    colour: { ...c.colour, text: e.target.value }
                  }))
                }
                style={{
                  width: "100%",
                  height: 40,
                  padding: 0,
                  border: "none",
                  background: "transparent"
                }}
              />
            </label>

            <label style={{ display: "block", marginTop: 16 }}>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Base font size</div>
              <input
                type="range"
                min={12}
                max={20}
                value={config.typography.baseSizePx}
                onChange={(e) =>
                  setConfig((c) => ({
                    ...c,
                    typography: {
                      ...c.typography,
                      baseSizePx: Number(e.target.value)
                    }
                  }))
                }
                style={{ width: "100%" }}
              />
              <div style={{ fontSize: 12, opacity: 0.8 }}>
                {config.typography.baseSizePx}px
              </div>
            </label>
          </aside>

          {/* Preview */}
          <main
            style={{
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 12,
              padding: 24
            }}
          >
            <h2 style={{ marginTop: 0 }}>{config.meta.title}</h2>
            <p style={{ maxWidth: 520, opacity: 0.9 }}>
              This is the smallest Foundation loop: edit a few tokens and see the
              UI update instantly.
            </p>

            <button
              style={{
                background: "var(--ts-color-primary)",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "12px 16px",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              Primary button
            </button>

            <div style={{ marginTop: 24, display: "grid", gap: 12, maxWidth: 520 }}>
              <label style={{ fontSize: 12, opacity: 0.8 }}>Example input</label>
              <input
                placeholder="Type here…"
                suppressHydrationWarning
                style={{
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.2)",
                  background: "transparent",
                  color: "inherit"
                }}
              />
            </div>
            <section style={{ marginTop: 28 }}>
  <h3 style={{ margin: "0 0 10px", fontSize: 14, opacity: 0.85 }}>Colours</h3>

  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
    <ColourTile
      label="Primary"
      value={config.colour.primary ?? defaultConfig.colour.primary}
      copied={copiedKey === "primary"}
      onCopy={() => copy("primary", config.colour.primary ?? defaultConfig.colour.primary)}
    />
    <ColourTile
      label="Background"
      value={config.colour.background ?? defaultConfig.colour.background}
      copied={copiedKey === "background"}
      onCopy={() => copy("background", config.colour.background ?? defaultConfig.colour.background)}
    />
    <ColourTile
      label="Text"
      value={config.colour.text ?? defaultConfig.colour.text}
      copied={copiedKey === "text"}
      onCopy={() => copy("text", config.colour.text ?? defaultConfig.colour.text)}
    />
  </div>
</section>
          </main>
        </div>
      </div>
    </>
  );
}

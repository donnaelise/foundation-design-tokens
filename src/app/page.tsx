"use client";

import { useState } from "react";
import { defaultConfig, type TokenConfig } from "@/lib/config";
import { createId, saveConfig } from "@/lib/storage";
import { downloadTextFile } from "@/lib/tokensToCss";
import OverviewPanel from "@/components/OverviewPanel";
import { contrastRatio, roundRatio } from "@/lib/contrast/contrast";
import { getWcagResult } from "@/lib/contrast/wcag";

const ratio = contrastRatio("#111827", "#FFFFFF");
console.log(roundRatio(ratio, 1), getWcagResult(ratio, { fontSizePx: 16 }));
export default function Home() {
  const [config, setConfig] = useState<TokenConfig>(defaultConfig);
  const [saveId, setSaveId] = useState<string | null>(null);

  return (
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
          gridTemplateColumns: "340px 1fr",
          gap: 24,
          alignItems: "start"
        }}
      >
        {/* Editor */}
        <aside
          style={{
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 16,
            padding: 16,
            background: "rgba(255,255,255,0.55)"
          }}
        >
          <h1 style={{ margin: 0, fontSize: 18 }}>Editor</h1>

          {/* Actions */}
          <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
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

            <button
              type="button"
              onClick={async () => {
                const id = saveId ?? createId();
                saveConfig(id, config);
                setSaveId(id);

                const url = `${window.location.origin}/view/${id}`;
                try {
                  await navigator.clipboard.writeText(url);
                } catch (e) {
                  console.error(e);
                }
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
              Save + copy local link
            </button>

            {saveId && (
              <a
                href={`/view/${saveId}`}
                style={{
                  fontSize: 12,
                  opacity: 0.8,
                  textDecoration: "underline"
                }}
              >
                Open saved view
              </a>
            )}
          </div>

          {/* Meta */}
          <label style={{ display: "block", marginTop: 16 }}>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Title</div>
            <input
  data-lpignore="true"
  data-1p-ignore="true"
  suppressHydrationWarning 
              placeholder="Token Studio"
              value={config.meta.title}
              onChange={(e) =>
                setConfig((c) => ({
                  ...c,
                  meta: { ...c.meta, title: e.target.value }
                }))
              }
              autoComplete="off"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.2)",
                background: "transparent",
                color: "inherit",
                marginTop: 6
              }}
            />
          </label>

          {/* Colours */}
          <div style={{ marginTop: 18 }}>
            <div style={{ fontSize: 12, opacity: 0.8, fontWeight: 700 }}>
              Colours
            </div>

            <label style={{ display: "block", marginTop: 12 }}>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Brand primary</div>
              <input
                type="color"
                value={config.colour.brand.primary}
                onChange={(e) =>
                  setConfig((c) => ({
                    ...c,
                    colour: {
                      ...c.colour,
                      brand: {
                        ...c.colour.brand,
                        primary: e.target.value
                      }
                    }
                  }))
                }
                style={{
                  width: "100%",
                  height: 40,
                  padding: 0,
                  border: "none",
                  background: "transparent",
                  marginTop: 6
                }}
              />
            </label>

            <label style={{ display: "block", marginTop: 12 }}>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Background</div>
              <input

                type="color"
                value={config.colour.semantic.background}
                onChange={(e) =>
                  setConfig((c) => ({
                    ...c,
                    colour: {
                      ...c.colour,
                      semantic: {
                        ...c.colour.semantic,
                        background: e.target.value
                      }
                    }
                  }))
                }
                style={{
                  width: "100%",
                  height: 40,
                  padding: 0,
                  border: "none",
                  background: "transparent",
                  marginTop: 6
                }}
              />
            </label>

            <label style={{ display: "block", marginTop: 12 }}>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Text</div>
              <input
                type="color"
                value={config.colour.semantic.text}
                onChange={(e) =>
                  setConfig((c) => ({
                    ...c,
                    colour: {
                      ...c.colour,
                      semantic: {
                        ...c.colour.semantic,
                        text: e.target.value
                      }
                    }
                  }))
                }
                style={{
                  width: "100%",
                  height: 40,
                  padding: 0,
                  border: "none",
                  background: "transparent",
                  marginTop: 6
                }}
              />
            </label>
          </div>

          {/* Typography */}
          <div style={{ marginTop: 18 }}>
            <div style={{ fontSize: 12, opacity: 0.8, fontWeight: 700 }}>
              Typography
            </div>

            <label style={{ display: "block", marginTop: 12 }}>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Font family</div>
             <input
  value={config.typography.fontFamily}
  onChange={(e) =>
    setConfig((c) => ({
      ...c,
      typography: { ...c.typography, fontFamily: e.target.value }
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
                  color: "inherit",
                  marginTop: 6
                }}
              />
            </label>

            <label style={{ display: "block", marginTop: 12 }}>
              <div style={{ fontSize: 12, opacity: 0.75 }}>
                Base font size ({config.typography.baseSizePx}px)
              </div>
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
                style={{ width: "100%", marginTop: 6 }}
              />
            </label>
          </div>

          {/* Shape */}
          <div style={{ marginTop: 18 }}>
            <div style={{ fontSize: 12, opacity: 0.8, fontWeight: 700 }}>
              Shape
            </div>

            <label style={{ display: "block", marginTop: 12 }}>
              <div style={{ fontSize: 12, opacity: 0.75 }}>
                Border radius ({config.shape.radiusPx}px)
              </div>
              <input
                
                type="range"
                min={6}
                max={24}
                value={config.shape.radiusPx}
                onChange={(e) =>
                  setConfig((c) => ({
                    ...c,
                    shape: { ...c.shape, radiusPx: Number(e.target.value) }
                  }))
                }
                style={{ width: "100%", marginTop: 6 }}
              />
            </label>
          </div>
        </aside>

        {/* Overview */}
        <main style={{ display: "grid", gap: 24 }}>
          <OverviewPanel config={config} showActions />
        </main>
      </div>
    </div>
  );
}
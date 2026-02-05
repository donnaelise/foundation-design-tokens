"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import type { TokenConfig } from "@/lib/config";
import { loadConfig } from "@/lib/storage";
import { tokensToCssVars, cssVarsToString } from "@/lib/tokensToCss";
import OverviewPanel from "@/components/OverviewPanel";

export default function ViewByIdPage() {
  const params = useParams<{ id: string }>();
  const rawId = (params?.id ?? "").toString();
  const id = decodeURIComponent(rawId).trim();

  const [config, setConfig] = useState<TokenConfig | null>(null);

  useEffect(() => {
    if (!id) return;
    setConfig(loadConfig(id));
  }, [id]);

  const cssVars = useMemo(() => (config ? tokensToCssVars(config) : {}), [config]);
  const cssText = useMemo(() => cssVarsToString(cssVars), [cssVars]);

  if (!id) {
    return (
      <div style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1 style={{ marginTop: 0 }}>Missing id</h1>
        <p>Open a saved link like <code>/view/&lt;id&gt;</code>.</p>
      </div>
    );
  }

  if (!config) {
    return (
      <div style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1 style={{ marginTop: 0 }}>Not found</h1>
        <p>This saved styleguide isn’t available on this device/browser (local saves are per origin).</p>
        <p style={{ fontSize: 12, opacity: 0.8 }}>Tried id: <code>{id}</code></p>
      </div>
    );
  }

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
    <OverviewPanel config={config} showActions={true} />
  </div>
);
}
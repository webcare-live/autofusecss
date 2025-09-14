import {
  buildCssVariables,
  defaultTokens
} from "./chunk-U4JQ6BVB.js";

// src/react/Provider.tsx
import { useMemo, useState } from "react";
import merge from "deepmerge";

// src/react/context.tsx
import { createContext, useContext } from "react";
var AutofuseContext = createContext(null);
function useAutofuse() {
  const ctx = useContext(AutofuseContext);
  if (!ctx) throw new Error("useAutofuse must be used within <AutofuseProvider>");
  return ctx;
}

// src/react/Provider.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function AutofuseProvider({
  tokens,
  theme: themeProp = "light",
  density: densityProp = "comfortable",
  as = "div",
  children
}) {
  const Component = as;
  const [localTokens, setLocalTokens] = useState({});
  const [theme, setTheme] = useState(themeProp);
  const [density, setDensity] = useState(densityProp);
  const merged = useMemo(() => {
    return merge(merge(defaultTokens, tokens || {}), localTokens || {});
  }, [tokens, localTokens]);
  const vars = useMemo(() => buildCssVariables(merged), [merged]);
  const styleTag = `/* autofusecss variables */
${vars.css}`;
  return /* @__PURE__ */ jsxs(Component, { "data-theme": theme, "data-density": density, children: [
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: styleTag } }),
    /* @__PURE__ */ jsx(
      AutofuseContext.Provider,
      {
        value: {
          tokens: merged,
          setTokens: (patch) => setLocalTokens((prev) => merge(prev || {}, patch || {})),
          theme,
          setTheme,
          density,
          setDensity
        },
        children
      }
    )
  ] });
}

// src/react/theme-studio.tsx
import React3 from "react";
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Row({ label, children }) {
  return /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr 2fr", gap: "var(--af-space-4)", alignItems: "center", margin: "var(--af-space-2) 0" }, children: [
    /* @__PURE__ */ jsx2("div", { style: { fontSize: "var(--af-text-sm)", color: "var(--af-color-neutral-500)" }, children: label }),
    /* @__PURE__ */ jsx2("div", { children })
  ] });
}
var SHADE_KEYS = ["50", "100", "300", "500", "700", "900"];
function ThemeStudio() {
  const { tokens, setTokens, theme, setTheme, density, setDensity } = useAutofuse();
  const scale = tokens.typography.scale;
  const baseRem = tokens.typography.baseRem;
  const spaceBase = tokens.spacing.base;
  const setColor = (role, shade, value) => {
    const roleScale = { ...tokens.colors[role] };
    roleScale[shade] = value;
    setTokens({ colors: { ...tokens.colors, [role]: roleScale } });
  };
  const setRadius = (k, v) => setTokens({ radius: { ...tokens.radius, [k]: v } });
  const setShadow = (k, v) => setTokens({ shadows: { ...tokens.shadows, [k]: v } });
  const exportConfig = () => {
    const content = `// autofusecss config generated from ThemeStudio
import { defineConfig } from 'autofusecss';

export default defineConfig(${JSON.stringify(tokens, null, 2)});
`;
    if (typeof window !== "undefined") {
      const blob = new Blob([content], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "autofusecss.config.mjs";
      a.click();
      URL.revokeObjectURL(a.href);
    }
  };
  const saveToServer = async () => {
    try {
      await fetch("/api/tokens", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ tokens }) });
      alert("Saved tokens to /api/tokens");
    } catch (e) {
      console.error(e);
      alert("Save failed. Is the API running?");
    }
  };
  const [wsUrl, setWsUrl] = React3.useState("ws://localhost:4001");
  const [connected, setConnected] = React3.useState(false);
  const wsRef = React3.useRef(null);
  const connectWs = () => {
    try {
      wsRef.current?.close();
    } catch {
    }
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg?.type === "tokens:update" && msg.tokens) {
          setTokens(msg.tokens);
        }
      } catch {
      }
    };
  };
  const hexToRgb = (hex) => {
    const h = hex.replace("#", "");
    const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const n = parseInt(full, 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  };
  const luminance = (hex) => {
    const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
    const conv = (c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    const [R, G, B] = [conv(r), conv(g), conv(b)];
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };
  const contrast = (fg, bg) => {
    const L1 = luminance(fg) + 0.05;
    const L2 = luminance(bg) + 0.05;
    const ratio = L1 > L2 ? L1 / L2 : L2 / L1;
    return Math.round(ratio * 100) / 100;
  };
  const hexToHsl = (hex) => {
    const [r0, g0, b0] = hexToRgb(hex).map((v) => v / 255);
    const max = Math.max(r0, g0, b0), min = Math.min(r0, g0, b0);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r0:
          h = (g0 - b0) / d + (g0 < b0 ? 6 : 0);
          break;
        case g0:
          h = (b0 - r0) / d + 2;
          break;
        case b0:
          h = (r0 - g0) / d + 4;
          break;
      }
      h /= 6;
    }
    return [h * 360, s, l];
  };
  const hslToHex = (h, s, l) => {
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const c = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
      return Math.round(255 * c).toString(16).padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };
  const generateShades = (base) => {
    const [h, s, l] = hexToHsl(base);
    const steps = { 50: "", 100: "", 300: "", 500: base, 700: "", 900: "" };
    const light = (delta) => hslToHex(h, s, Math.min(0.98, l + delta));
    const dark = (delta) => hslToHex(h, s, Math.max(0.02, l - delta));
    steps["50"] = light(0.45);
    steps["100"] = light(0.3);
    steps["300"] = light(0.1);
    steps["700"] = dark(0.15);
    steps["900"] = dark(0.3);
    return steps;
  };
  return /* @__PURE__ */ jsxs2("div", { style: { display: "block", padding: "var(--af-space-4)", border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-md)" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsx2("h3", { style: { fontSize: "var(--af-text-lg)", margin: 0 }, children: "Autofuse Theme Studio" }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: "var(--af-space-2)" }, children: [
        /* @__PURE__ */ jsx2("button", { onClick: exportConfig, style: { padding: "0.25rem 0.5rem", border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)" }, children: "Export" }),
        /* @__PURE__ */ jsx2("button", { onClick: saveToServer, style: { padding: "0.25rem 0.5rem", border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)" }, children: "Save" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr auto", gap: "var(--af-space-2)", alignItems: "center", marginTop: "var(--af-space-2)" }, children: [
      /* @__PURE__ */ jsx2("input", { type: "text", value: wsUrl, onChange: (e) => setWsUrl(e.target.value), placeholder: "ws://localhost:4001", style: { border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)", padding: "0.25rem 0.5rem" } }),
      /* @__PURE__ */ jsx2("button", { onClick: connectWs, style: { padding: "0.25rem 0.5rem", border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)", background: connected ? "var(--af-color-success-500)" : "transparent", color: connected ? "white" : "inherit" }, children: connected ? "Connected" : "Connect WS" })
    ] }),
    /* @__PURE__ */ jsx2(Row, { label: "Theme mode", children: /* @__PURE__ */ jsxs2("select", { value: theme, onChange: (e) => setTheme(e.target.value), style: { border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)", padding: "0.25rem 0.5rem" }, children: [
      /* @__PURE__ */ jsx2("option", { value: "light", children: "Light" }),
      /* @__PURE__ */ jsx2("option", { value: "dark", children: "Dark" }),
      /* @__PURE__ */ jsx2("option", { value: "hc", children: "High Contrast" })
    ] }) }),
    /* @__PURE__ */ jsx2(Row, { label: "Density", children: /* @__PURE__ */ jsxs2("select", { value: density, onChange: (e) => setDensity(e.target.value), style: { border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)", padding: "0.25rem 0.5rem" }, children: [
      /* @__PURE__ */ jsx2("option", { value: "comfortable", children: "Comfortable" }),
      /* @__PURE__ */ jsx2("option", { value: "compact", children: "Compact" })
    ] }) }),
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: "var(--af-space-4)" }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontWeight: 600, marginBottom: "var(--af-space-2)" }, children: "Palette" }),
      ["primary", "neutral"].map((role) => /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "120px repeat(6, minmax(0, 1fr))", gap: "var(--af-space-2)", alignItems: "center", marginBottom: "var(--af-space-2)" }, children: [
        /* @__PURE__ */ jsx2("div", { style: { color: "var(--af-color-neutral-500)" }, children: role }),
        SHADE_KEYS.map((s) => /* @__PURE__ */ jsx2("input", { type: "color", value: tokens.colors[role]?.[s] || "#ffffff", onChange: (e) => setColor(role, s, e.target.value) }, s))
      ] }, role)),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [
        /* @__PURE__ */ jsx2("button", { onClick: () => setTokens({ colors: { ...tokens.colors, primary: generateShades(tokens.colors.primary?.["500"] || "#3b82f6") } }), style: { padding: "0.25rem 0.5rem", border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)" }, children: "Auto\u2011generate Primary Shades" }),
        /* @__PURE__ */ jsx2("input", { type: "file", accept: "application/json", onChange: async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          try {
            const txt = await f.text();
            setTokens(JSON.parse(txt));
          } catch {
            alert("Invalid JSON");
          }
        } })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: "var(--af-space-4)" }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontWeight: 600, marginBottom: "var(--af-space-2)" }, children: "Typography" }),
      /* @__PURE__ */ jsx2(Row, { label: `Scale (${scale.toFixed(2)})`, children: /* @__PURE__ */ jsx2("input", { type: "range", min: 1.05, max: 1.5, step: 0.01, value: scale, onChange: (e) => setTokens({ typography: { ...tokens.typography, scale: Number(e.target.value) } }) }) }),
      /* @__PURE__ */ jsx2(Row, { label: `Base size (rem) (${baseRem})`, children: /* @__PURE__ */ jsx2("input", { type: "range", min: 0.75, max: 1.25, step: 0.01, value: baseRem, onChange: (e) => setTokens({ typography: { ...tokens.typography, baseRem: Number(e.target.value) } }) }) })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: "var(--af-space-4)" }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontWeight: 600, marginBottom: "var(--af-space-2)" }, children: "Spacing" }),
      /* @__PURE__ */ jsx2(Row, { label: `Base step (px) (${spaceBase})`, children: /* @__PURE__ */ jsx2("input", { type: "range", min: 2, max: 8, step: 1, value: spaceBase, onChange: (e) => setTokens({ spacing: { ...tokens.spacing, base: Number(e.target.value) } }) }) })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: "var(--af-space-4)" }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontWeight: 600, marginBottom: "var(--af-space-2)" }, children: "Radius" }),
      Object.entries(tokens.radius).map(([k, v]) => /* @__PURE__ */ jsx2(Row, { label: k, children: /* @__PURE__ */ jsx2("input", { type: "text", value: v, onChange: (e) => setRadius(k, e.target.value) }) }, k))
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: "var(--af-space-4)" }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontWeight: 600, marginBottom: "var(--af-space-2)" }, children: "Shadows" }),
      Object.entries(tokens.shadows).map(([k, v]) => /* @__PURE__ */ jsx2(Row, { label: k, children: /* @__PURE__ */ jsx2("input", { type: "text", value: v, onChange: (e) => setShadow(k, e.target.value) }) }, k))
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gap: "var(--af-space-2)", marginTop: "var(--af-space-4)" }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: "var(--af-text-sm)", color: "var(--af-color-neutral-500)" }, children: "Preview" }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gap: "var(--af-space-2)", padding: "var(--af-space-4)", border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-md)" }, children: [
        /* @__PURE__ */ jsx2("h1", { style: { fontSize: "var(--af-text-3xl)", color: "var(--af-color-primary-700)", margin: 0 }, children: "Heading H1" }),
        /* @__PURE__ */ jsx2("p", { style: { fontSize: "var(--af-text-base)", margin: 0 }, children: "Body text scales with viewport width." }),
        /* @__PURE__ */ jsx2("button", { style: { backgroundColor: "var(--af-color-primary-500)", color: "white", padding: "0.5rem 1rem", borderRadius: "var(--af-radius-md)", border: 0 }, children: "Button" })
      ] }),
      /* @__PURE__ */ jsx2("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--af-space-2)" }, children: (() => {
        const p700 = tokens.colors.primary?.["700"] || "#1d4ed8";
        const n50 = tokens.colors.neutral?.["50"] || "#f8fafc";
        const n900 = tokens.colors.neutral?.["900"] || "#0f172a";
        const c1 = contrast(p700, n50);
        const c2 = contrast(p700, n900);
        const passAA1 = c1 >= 4.5;
        const passAA2 = c2 >= 4.5;
        return /* @__PURE__ */ jsxs2(Fragment, { children: [
          /* @__PURE__ */ jsxs2("div", { style: { border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)", padding: "0.75rem" }, children: [
            /* @__PURE__ */ jsx2("div", { style: { background: n50, color: p700, padding: "0.5rem", borderRadius: "var(--af-radius-sm)" }, children: "Text sample" }),
            /* @__PURE__ */ jsxs2("div", { style: { fontSize: "var(--af-text-sm)" }, children: [
              "Contrast: ",
              c1,
              ":1 ",
              passAA1 ? "\u2713 AA" : "\u2715"
            ] })
          ] }),
          /* @__PURE__ */ jsxs2("div", { style: { border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)", padding: "0.75rem" }, children: [
            /* @__PURE__ */ jsx2("div", { style: { background: n900, color: p700, padding: "0.5rem", borderRadius: "var(--af-radius-sm)" }, children: "Text sample" }),
            /* @__PURE__ */ jsxs2("div", { style: { fontSize: "var(--af-text-sm)" }, children: [
              "Contrast: ",
              c2,
              ":1 ",
              passAA2 ? "\u2713 AA" : "\u2715"
            ] })
          ] }),
          /* @__PURE__ */ jsx2("div", {})
        ] });
      })() })
    ] })
  ] });
}

export {
  useAutofuse,
  AutofuseProvider,
  ThemeStudio
};

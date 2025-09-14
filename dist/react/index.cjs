var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/react/index.ts
var react_exports = {};
__export(react_exports, {
  AutofuseProvider: () => AutofuseProvider,
  ThemeStudio: () => ThemeStudio,
  useAutofuse: () => useAutofuse
});
module.exports = __toCommonJS(react_exports);

// src/react/Provider.tsx
var import_react2 = require("react");
var import_deepmerge = __toESM(require("deepmerge"), 1);

// src/tokens.ts
var defaultTokens = {
  colors: {
    primary: { 50: "#f0f6ff", 100: "#dce9ff", 300: "#8db4ff", 500: "#3b82f6", 700: "#1d4ed8", 900: "#1e3a8a" },
    neutral: { 50: "#f8fafc", 100: "#f1f5f9", 300: "#cbd5e1", 500: "#64748b", 700: "#334155", 900: "#0f172a" },
    success: { 500: "#10b981" },
    warning: { 500: "#f59e0b" },
    danger: { 500: "#ef4444" }
  },
  modes: {
    dark: {
      primary: { 50: "#0b1220", 100: "#0e1a2e", 300: "#1e3a8a", 500: "#3b82f6", 700: "#93c5fd", 900: "#dbeafe" },
      neutral: { 50: "#0b1220", 100: "#111827", 300: "#374151", 500: "#9ca3af", 700: "#e5e7eb", 900: "#f9fafb" },
      success: { 500: "#34d399" },
      warning: { 500: "#fbbf24" },
      danger: { 500: "#f87171" }
    }
  },
  typography: { baseRem: 1, scale: 1.2, minViewport: 360, maxViewport: 1440 },
  spacing: { base: 4, steps: 20 },
  radius: { none: "0px", sm: "0.125rem", md: "0.375rem", lg: "0.5rem", xl: "0.75rem", full: "9999px" },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px rgba(0,0,0,0.1)",
    lg: "0 10px 15px rgba(0,0,0,0.1)",
    xl: "0 20px 25px rgba(0,0,0,0.15)"
  },
  breakpoints: { xs: 360, sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 }
};
function clamp(min, minVwPx, maxVwPx, vwMin, vwMax) {
  const slope = (maxVwPx - minVwPx) / (vwMax - vwMin);
  const yAxis = -(vwMin * slope) + minVwPx;
  return `clamp(${min.toFixed(4)}rem, calc(${(yAxis / 16).toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw), ${(maxVwPx / 16).toFixed(4)}rem)`;
}
function buildCssVariables(tokens) {
  const { typography, spacing, colors, modes, radius, shadows, breakpoints } = tokens;
  const sizes = {};
  const names = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"];
  let current = typography.baseRem;
  for (let i = 0; i < names.length; i++) {
    const minRem = current;
    const maxPx = Math.round(minRem * 16 * Math.pow(typography.scale, 2));
    const val = clamp(minRem, minRem * 16, maxPx, breakpoints.xs, breakpoints.xl);
    sizes[names[i]] = val;
    current = current * typography.scale;
  }
  const space = {};
  for (let i = 0; i <= spacing.steps; i++) {
    const basePx = spacing.base * i;
    const maxPx = Math.round(basePx * 1.5);
    space[i] = clamp(basePx / 16, basePx, maxPx, breakpoints.xs, breakpoints.lg);
  }
  const colorVars = [];
  Object.entries(colors).forEach(([name, scale]) => {
    Object.entries(scale).forEach(([k, v]) => {
      colorVars.push(`--af-color-${name}-${k}: ${v};`);
    });
  });
  const radiusVars = Object.entries(radius).map(([k, v]) => `--af-radius-${k}: ${v};`);
  const shadowVars = Object.entries(shadows).map(([k, v]) => `--af-shadow-${k}: ${v};`);
  const darkColorVars = [];
  const hcColorVars = [];
  if (modes?.dark) {
    Object.entries(modes.dark).forEach(([name, scale]) => {
      Object.entries(scale).forEach(([k, v]) => {
        darkColorVars.push(`--af-color-${name}-${k}: ${v};`);
      });
    });
  }
  if (modes?.highContrast) {
    Object.entries(modes.highContrast).forEach(([name, scale]) => {
      Object.entries(scale).forEach(([k, v]) => {
        hcColorVars.push(`--af-color-${name}-${k}: ${v};`);
      });
    });
  }
  return {
    sizes,
    space,
    css: `:root{${[...colorVars, ...radiusVars, ...shadowVars].join("")}}
:root{${Object.entries(sizes).map(([k, v]) => `--af-text-${k}:${v};`).join("")}}
:root{${Object.entries(space).map(([k, v]) => `--af-space-${k}:${v};`).join("")}}` + (darkColorVars.length ? `
[data-theme="dark"]{${darkColorVars.join("")}}` : "") + (hcColorVars.length ? `
[data-theme="hc"]{${hcColorVars.join("")}}` : "")
  };
}

// src/react/context.tsx
var import_react = require("react");
var AutofuseContext = (0, import_react.createContext)(null);
function useAutofuse() {
  const ctx = (0, import_react.useContext)(AutofuseContext);
  if (!ctx) throw new Error("useAutofuse must be used within <AutofuseProvider>");
  return ctx;
}

// src/react/Provider.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function AutofuseProvider({
  tokens,
  theme: themeProp = "light",
  density: densityProp = "comfortable",
  as = "div",
  children
}) {
  const Component = as;
  const [localTokens, setLocalTokens] = (0, import_react2.useState)({});
  const [theme, setTheme] = (0, import_react2.useState)(themeProp);
  const [density, setDensity] = (0, import_react2.useState)(densityProp);
  const merged = (0, import_react2.useMemo)(() => {
    return (0, import_deepmerge.default)((0, import_deepmerge.default)(defaultTokens, tokens || {}), localTokens || {});
  }, [tokens, localTokens]);
  const vars = (0, import_react2.useMemo)(() => buildCssVariables(merged), [merged]);
  const styleTag = `/* autofusecss variables */
${vars.css}`;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Component, { "data-theme": theme, "data-density": density, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { dangerouslySetInnerHTML: { __html: styleTag } }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      AutofuseContext.Provider,
      {
        value: {
          tokens: merged,
          setTokens: (patch) => setLocalTokens((prev) => (0, import_deepmerge.default)(prev || {}, patch || {})),
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
var import_react3 = __toESM(require("react"), 1);
var import_jsx_runtime2 = require("react/jsx-runtime");
function Row({ label, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "1fr 2fr", gap: "var(--af-space-4)", alignItems: "center", margin: "var(--af-space-2) 0" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "var(--af-text-sm)", color: "var(--af-color-neutral-500)" }, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children })
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
  const [wsUrl, setWsUrl] = import_react3.default.useState("ws://localhost:4001");
  const [connected, setConnected] = import_react3.default.useState(false);
  const wsRef = import_react3.default.useRef(null);
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "block", padding: "var(--af-space-4)", border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-md)" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { style: { fontSize: "var(--af-text-lg)", margin: 0 }, children: "Autofuse Theme Studio" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", gap: "var(--af-space-2)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: exportConfig, style: { padding: "0.25rem 0.5rem", border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)" }, children: "Export" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: saveToServer, style: { padding: "0.25rem 0.5rem", border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)" }, children: "Save" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "1fr auto", gap: "var(--af-space-2)", alignItems: "center", marginTop: "var(--af-space-2)" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: wsUrl, onChange: (e) => setWsUrl(e.target.value), placeholder: "ws://localhost:4001", style: { border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)", padding: "0.25rem 0.5rem" } }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: connectWs, style: { padding: "0.25rem 0.5rem", border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)", background: connected ? "var(--af-color-success-500)" : "transparent", color: connected ? "white" : "inherit" }, children: connected ? "Connected" : "Connect WS" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label: "Theme mode", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { value: theme, onChange: (e) => setTheme(e.target.value), style: { border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)", padding: "0.25rem 0.5rem" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "light", children: "Light" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "dark", children: "Dark" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "hc", children: "High Contrast" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label: "Density", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { value: density, onChange: (e) => setDensity(e.target.value), style: { border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)", padding: "0.25rem 0.5rem" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "comfortable", children: "Comfortable" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "compact", children: "Compact" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginTop: "var(--af-space-4)" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 600, marginBottom: "var(--af-space-2)" }, children: "Palette" }),
      ["primary", "neutral"].map((role) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "120px repeat(6, minmax(0, 1fr))", gap: "var(--af-space-2)", alignItems: "center", marginBottom: "var(--af-space-2)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { color: "var(--af-color-neutral-500)" }, children: role }),
        SHADE_KEYS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "color", value: tokens.colors[role]?.[s] || "#ffffff", onChange: (e) => setColor(role, s, e.target.value) }, s))
      ] }, role)),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => setTokens({ colors: { ...tokens.colors, primary: generateShades(tokens.colors.primary?.["500"] || "#3b82f6") } }), style: { padding: "0.25rem 0.5rem", border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)" }, children: "Auto\u2011generate Primary Shades" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "file", accept: "application/json", onChange: async (e) => {
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
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginTop: "var(--af-space-4)" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 600, marginBottom: "var(--af-space-2)" }, children: "Typography" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label: `Scale (${scale.toFixed(2)})`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "range", min: 1.05, max: 1.5, step: 0.01, value: scale, onChange: (e) => setTokens({ typography: { ...tokens.typography, scale: Number(e.target.value) } }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label: `Base size (rem) (${baseRem})`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "range", min: 0.75, max: 1.25, step: 0.01, value: baseRem, onChange: (e) => setTokens({ typography: { ...tokens.typography, baseRem: Number(e.target.value) } }) }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginTop: "var(--af-space-4)" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 600, marginBottom: "var(--af-space-2)" }, children: "Spacing" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label: `Base step (px) (${spaceBase})`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "range", min: 2, max: 8, step: 1, value: spaceBase, onChange: (e) => setTokens({ spacing: { ...tokens.spacing, base: Number(e.target.value) } }) }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginTop: "var(--af-space-4)" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 600, marginBottom: "var(--af-space-2)" }, children: "Radius" }),
      Object.entries(tokens.radius).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label: k, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: v, onChange: (e) => setRadius(k, e.target.value) }) }, k))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginTop: "var(--af-space-4)" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 600, marginBottom: "var(--af-space-2)" }, children: "Shadows" }),
      Object.entries(tokens.shadows).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label: k, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: v, onChange: (e) => setShadow(k, e.target.value) }) }, k))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gap: "var(--af-space-2)", marginTop: "var(--af-space-4)" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "var(--af-text-sm)", color: "var(--af-color-neutral-500)" }, children: "Preview" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gap: "var(--af-space-2)", padding: "var(--af-space-4)", border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-md)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { style: { fontSize: "var(--af-text-3xl)", color: "var(--af-color-primary-700)", margin: 0 }, children: "Heading H1" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { style: { fontSize: "var(--af-text-base)", margin: 0 }, children: "Body text scales with viewport width." }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { style: { backgroundColor: "var(--af-color-primary-500)", color: "white", padding: "0.5rem 1rem", borderRadius: "var(--af-radius-md)", border: 0 }, children: "Button" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--af-space-2)" }, children: (() => {
        const p700 = tokens.colors.primary?.["700"] || "#1d4ed8";
        const n50 = tokens.colors.neutral?.["50"] || "#f8fafc";
        const n900 = tokens.colors.neutral?.["900"] || "#0f172a";
        const c1 = contrast(p700, n50);
        const c2 = contrast(p700, n900);
        const passAA1 = c1 >= 4.5;
        const passAA2 = c2 >= 4.5;
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)", padding: "0.75rem" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { background: n50, color: p700, padding: "0.5rem", borderRadius: "var(--af-radius-sm)" }, children: "Text sample" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { fontSize: "var(--af-text-sm)" }, children: [
              "Contrast: ",
              c1,
              ":1 ",
              passAA1 ? "\u2713 AA" : "\u2715"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)", padding: "0.75rem" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { background: n900, color: p700, padding: "0.5rem", borderRadius: "var(--af-radius-sm)" }, children: "Text sample" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { fontSize: "var(--af-text-sm)" }, children: [
              "Contrast: ",
              c2,
              ":1 ",
              passAA2 ? "\u2713 AA" : "\u2715"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {})
        ] });
      })() })
    ] })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AutofuseProvider,
  ThemeStudio,
  useAutofuse
});

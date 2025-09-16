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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AutofuseProvider: () => AutofuseProvider,
  buildCssVariables: () => buildCssVariables,
  defaultTokens: () => defaultTokens,
  defineConfig: () => defineConfig,
  modernTokens: () => modernTokens
});
module.exports = __toCommonJS(index_exports);

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
  const canonicalShades = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ];
  const nearestShade = (target, present) => {
    const toNum = (s) => Number(s);
    const t = toNum(target);
    let best = present[0];
    let bestDist = Math.abs(toNum(best) - t);
    for (const p of present) {
      const d = Math.abs(toNum(p) - t);
      if (d < bestDist) {
        best = p;
        bestDist = d;
      }
    }
    return best;
  };
  const completeScale = (scale) => {
    const present = Object.keys(scale || {});
    const out = { ...scale };
    for (const s of canonicalShades) {
      if (!(s in out) && present.length) {
        const pick = nearestShade(s, present);
        out[s] = out[pick];
      }
    }
    return out;
  };
  const completePalette = (pal) => {
    const out = {};
    Object.entries(pal).forEach(([name, scale]) => {
      if (!scale) return;
      out[name] = completeScale(scale);
    });
    return out;
  };
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
  const baseComplete = completePalette(colors);
  const colorVars = [];
  Object.entries(baseComplete).forEach(([name, scale]) => {
    Object.entries(scale).forEach(([k, v]) => {
      colorVars.push(`--af-color-${name}-${k}: ${v};`);
    });
  });
  const radiusVars = Object.entries(radius).map(([k, v]) => `--af-radius-${k}: ${v};`);
  const shadowVars = Object.entries(shadows).map(([k, v]) => `--af-shadow-${k}: ${v};`);
  const darkColorVars = [];
  const hcColorVars = [];
  if (modes?.dark) {
    const darkComplete = completePalette(modes.dark);
    Object.entries(darkComplete).forEach(([name, scale]) => {
      Object.entries(scale).forEach(([k, v]) => {
        darkColorVars.push(`--af-color-${name}-${k}: ${v};`);
      });
    });
  }
  if (modes?.highContrast) {
    const hcComplete = completePalette(modes.highContrast);
    Object.entries(hcComplete).forEach(([name, scale]) => {
      Object.entries(scale).forEach(([k, v]) => {
        hcColorVars.push(`--af-color-${name}-${k}: ${v};`);
      });
    });
  }
  const baseUiVars = [
    `--af-text: ${colors.neutral?.[900] || "#0f172a"}`,
    `--af-bg-page: ${colors.neutral?.[50] || "#f8fafc"}`,
    `--af-surface: #ffffff`,
    `--af-surface-soft: rgba(255,255,255,0.8)`,
    `--af-border: ${colors.neutral?.[300] || "#e5e7eb"}`
  ];
  const darkUiVars = [];
  if (modes?.dark) {
    const dn = modes.dark.neutral || {};
    darkUiVars.push(
      `--af-text: ${dn["900"] || "#f9fafb"}`,
      `--af-bg-page: ${dn["50"] || "#0b1220"}`,
      `--af-surface: ${dn["100"] || "#111827"}`,
      `--af-surface-soft: rgba(15,23,42,0.85)`,
      `--af-border: rgba(148,163,184,0.25)`
    );
  }
  return {
    sizes,
    space,
    css: `:root{${[...colorVars, ...radiusVars, ...shadowVars, ...baseUiVars].join("")}}
:root{${Object.entries(sizes).map(([k, v]) => `--af-text-${k}:${v};`).join("")}}
:root{${Object.entries(space).map(([k, v]) => `--af-space-${k}:${v};`).join("")}}` + (darkColorVars.length || darkUiVars.length ? `
[data-theme="dark"]{${[...darkColorVars, ...darkUiVars].join("")}}` : "") + (hcColorVars.length ? `
[data-theme="hc"]{${hcColorVars.join("")}}` : "")
  };
}
function defineConfig(config) {
  return config;
}

// src/presets.ts
var modernTokens = {
  ...defaultTokens,
  colors: {
    ...defaultTokens.colors,
    primary: {
      50: "#eef2ff",
      100: "#e0e7ff",
      300: "#a5b4fc",
      500: "#6366f1",
      // indigo 500 vibe
      700: "#4f46e5",
      900: "#312e81"
    },
    neutral: {
      50: "#f8fafc",
      100: "#f1f5f9",
      300: "#d1d5db",
      500: "#6b7280",
      700: "#374151",
      900: "#0f172a"
    },
    success: { 500: "#10b981" },
    warning: { 500: "#f59e0b" },
    danger: { 500: "#ef4444" }
  },
  // Slightly smaller base and scale to avoid oversized previews
  typography: { ...defaultTokens.typography, baseRem: 0.98, scale: 1.18, maxViewport: 1440 },
  spacing: { ...defaultTokens.spacing, steps: 24 },
  radius: { ...defaultTokens.radius, md: "0.5rem", lg: "0.75rem", xl: "1rem" },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 6px 16px rgba(0,0,0,0.08)",
    lg: "0 12px 24px rgba(0,0,0,0.10)",
    xl: "0 20px 35px rgba(0,0,0,0.12)"
  }
};

// src/react/Provider.tsx
var import_react2 = require("react");
var import_deepmerge = __toESM(require("deepmerge"), 1);

// src/react/context.tsx
var import_react = require("react");
var AutofuseContext = (0, import_react.createContext)(null);

// src/react/Provider.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function AutofuseProvider({
  tokens,
  theme: themeProp = "light",
  density: densityProp = "comfortable",
  as = "div",
  anchorOffset,
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
  const extraVars = anchorOffset != null ? `
:root{--af-anchor-offset:${typeof anchorOffset === "number" ? `${anchorOffset}px` : anchorOffset};}` : "";
  const styleTag = `/* autofusecss variables */
${vars.css}${extraVars}`;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AutofuseProvider,
  buildCssVariables,
  defaultTokens,
  defineConfig,
  modernTokens
});

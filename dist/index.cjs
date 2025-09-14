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
  defineConfig: () => defineConfig
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
function defineConfig(config) {
  return config;
}

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AutofuseProvider,
  buildCssVariables,
  defaultTokens,
  defineConfig
});

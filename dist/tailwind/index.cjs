var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/tailwind/index.ts
var tailwind_exports = {};
__export(tailwind_exports, {
  default: () => autofusePlugin,
  defaultTokens: () => defaultTokens
});
module.exports = __toCommonJS(tailwind_exports);

// node_modules/tailwindcss/dist/plugin.mjs
function g(i, n) {
  return { handler: i, config: n };
}
g.withOptions = function(i, n = () => ({})) {
  function t(o) {
    return { handler: i(o), config: n(o) };
  }
  return t.__isOptionsFunction = true, t;
};
var u = g;

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

// src/tailwind/index.ts
function autofusePlugin(_opts = {}) {
  const tokens = {
    ...defaultTokens,
    ..._opts.tokens || {}
  };
  return u(
    function({ addBase, addUtilities, addVariant }) {
      const rootColorVars = {};
      Object.entries(tokens.colors).forEach(([name, scale]) => {
        Object.entries(scale).forEach(([k, v]) => {
          rootColorVars[`--af-color-${name}-${k}`] = String(v);
        });
      });
      const built = buildCssVariables(tokens);
      const sizeVars = {};
      Object.entries(built.sizes).forEach(([k, v]) => {
        sizeVars[`--af-text-${k}`] = v;
      });
      const spaceVars = {};
      Object.entries(built.space).forEach(([k, v]) => {
        spaceVars[`--af-space-${k}`] = v;
      });
      addBase({
        ":root": { ...rootColorVars, ...sizeVars, ...spaceVars }
      });
      addVariant("theme-dark", "[data-theme=dark] &");
      addVariant("density-compact", "[data-density=compact] &");
      addVariant("theme-hc", "[data-theme=hc] &");
      const spacingUtils = {};
      for (let i = 0; i <= tokens.spacing.steps; i++) {
        const v = `var(--af-space-${i})`;
        spacingUtils[`.af-m-${i}`] = { margin: v };
        spacingUtils[`.af-mx-${i}`] = { marginLeft: v, marginRight: v };
        spacingUtils[`.af-my-${i}`] = { marginTop: v, marginBottom: v };
        spacingUtils[`.af-mt-${i}`] = { marginTop: v };
        spacingUtils[`.af-mr-${i}`] = { marginRight: v };
        spacingUtils[`.af-mb-${i}`] = { marginBottom: v };
        spacingUtils[`.af-ml-${i}`] = { marginLeft: v };
        spacingUtils[`.af-p-${i}`] = { padding: v };
        spacingUtils[`.af-px-${i}`] = { paddingLeft: v, paddingRight: v };
        spacingUtils[`.af-py-${i}`] = { paddingTop: v, paddingBottom: v };
        spacingUtils[`.af-pt-${i}`] = { paddingTop: v };
        spacingUtils[`.af-pr-${i}`] = { paddingRight: v };
        spacingUtils[`.af-pb-${i}`] = { paddingBottom: v };
        spacingUtils[`.af-pl-${i}`] = { paddingLeft: v };
        if (i > 0) {
          const nv = `calc(${v} * -1)`;
          spacingUtils[`.-af-m-${i}`] = { margin: nv };
          spacingUtils[`.-af-mx-${i}`] = { marginLeft: nv, marginRight: nv };
          spacingUtils[`.-af-my-${i}`] = { marginTop: nv, marginBottom: nv };
          spacingUtils[`.-af-mt-${i}`] = { marginTop: nv };
          spacingUtils[`.-af-mr-${i}`] = { marginRight: nv };
          spacingUtils[`.-af-mb-${i}`] = { marginBottom: nv };
          spacingUtils[`.-af-ml-${i}`] = { marginLeft: nv };
        }
      }
      addUtilities(spacingUtils);
      const gapUtils = {};
      for (let i = 0; i <= tokens.spacing.steps; i++) {
        const v = `var(--af-space-${i})`;
        gapUtils[`.af-gap-${i}`] = { gap: v };
        gapUtils[`.af-gap-x-${i}`] = { columnGap: v };
        gapUtils[`.af-gap-y-${i}`] = { rowGap: v };
      }
      addUtilities(gapUtils);
      const stackUtils = {};
      for (let i = 0; i <= tokens.spacing.steps; i++) {
        const v = `var(--af-space-${i})`;
        stackUtils[`.af-stack-${i} > * + *`] = { marginTop: v };
      }
      addUtilities(stackUtils);
      addUtilities({
        [`.af-block`]: { display: "block" },
        [`.af-inline-block`]: { display: "inline-block" },
        [`.af-flex`]: { display: "flex" },
        [`.af-inline-flex`]: { display: "inline-flex" },
        [`.af-grid`]: { display: "grid" },
        [`.af-inline-grid`]: { display: "inline-grid" },
        [`.af-hidden`]: { display: "none" },
        [`.af-visible`]: { visibility: "visible" },
        [`.af-invisible`]: { visibility: "hidden" },
        [`.af-flex-row`]: { flexDirection: "row" },
        [`.af-flex-col`]: { flexDirection: "column" },
        [`.af-flex-wrap`]: { flexWrap: "wrap" },
        [`.af-flex-nowrap`]: { flexWrap: "nowrap" },
        [`.af-items-start`]: { alignItems: "flex-start" },
        [`.af-items-center`]: { alignItems: "center" },
        [`.af-items-end`]: { alignItems: "flex-end" },
        [`.af-items-stretch`]: { alignItems: "stretch" },
        [`.af-justify-start`]: { justifyContent: "flex-start" },
        [`.af-justify-center`]: { justifyContent: "center" },
        [`.af-justify-end`]: { justifyContent: "flex-end" },
        [`.af-justify-between`]: { justifyContent: "space-between" },
        [`.af-justify-around`]: { justifyContent: "space-around" },
        [`.af-justify-evenly`]: { justifyContent: "space-evenly" }
      });
      const gridUtils = {};
      for (let n = 1; n <= 12; n++) {
        gridUtils[`.af-grid-cols-${n}`] = { gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` };
        gridUtils[`.af-col-span-${n}`] = { gridColumn: `span ${n} / span ${n}` };
      }
      addUtilities(gridUtils);
      const borderUtils = {
        ".af-border-t": { borderTopWidth: "1px", borderStyle: "solid" },
        ".af-border-r": { borderRightWidth: "1px", borderStyle: "solid" },
        ".af-border-b": { borderBottomWidth: "1px", borderStyle: "solid" },
        ".af-border-l": { borderLeftWidth: "1px", borderStyle: "solid" }
      };
      Object.entries(tokens.colors).forEach(([name, scale]) => {
        Object.keys(scale).forEach((k) => {
          borderUtils[`.af-border-${name}-${k}`] = { borderColor: `var(--af-color-${name}-${k})` };
        });
      });
      addUtilities(borderUtils);
      const divideUtils = {
        ".af-divide-y": { "& > * + *": { borderTopWidth: "1px", borderStyle: "solid", borderColor: "var(--af-color-neutral-300)" } },
        ".af-divide-x": { "& > * + *": { borderLeftWidth: "1px", borderStyle: "solid", borderColor: "var(--af-color-neutral-300)" } }
      };
      Object.entries(tokens.colors).forEach(([name, scale]) => {
        Object.keys(scale).forEach((k) => {
          divideUtils[`.af-divide-y-${name}-${k}`] = { "& > * + *": { borderTopWidth: "1px", borderStyle: "solid", borderColor: `var(--af-color-${name}-${k})` } };
          divideUtils[`.af-divide-x-${name}-${k}`] = { "& > * + *": { borderLeftWidth: "1px", borderStyle: "solid", borderColor: `var(--af-color-${name}-${k})` } };
        });
      });
      addUtilities(divideUtils);
      const opacityUtils = {};
      for (let i = 0; i <= 100; i += 5) {
        opacityUtils[`.af-opacity-${i}`] = { opacity: String(i / 100) };
      }
      addUtilities(opacityUtils);
      addUtilities({
        ".af-relative": { position: "relative" },
        ".af-absolute": { position: "absolute" },
        ".af-fixed": { position: "fixed" },
        ".af-sticky": { position: "sticky" }
      });
      const zUtils = {};
      [0, 10, 20, 30, 40, 50, 100, 1e3].forEach((z) => {
        zUtils[`.af-z-${z}`] = { zIndex: String(z) };
      });
      addUtilities(zUtils);
      const rounded = {
        ".af-rounded-none": { borderRadius: "var(--af-radius-none)" },
        ".af-rounded-sm": { borderRadius: "var(--af-radius-sm)" },
        ".af-rounded-md": { borderRadius: "var(--af-radius-md)" },
        ".af-rounded-lg": { borderRadius: "var(--af-radius-lg)" },
        ".af-rounded-xl": { borderRadius: "var(--af-radius-xl)" },
        ".af-rounded-full": { borderRadius: "var(--af-radius-full)" }
      };
      addUtilities(rounded);
      const shadows = {
        ".af-shadow-sm": { boxShadow: "var(--af-shadow-sm)" },
        ".af-shadow-md": { boxShadow: "var(--af-shadow-md)" },
        ".af-shadow-lg": { boxShadow: "var(--af-shadow-lg)" },
        ".af-shadow-xl": { boxShadow: "var(--af-shadow-xl)" }
      };
      addUtilities(shadows);
      addUtilities({
        ".af-ring": { outline: "2px solid hsl(var(--af-ring))", outlineOffset: "2px" },
        // Recipes (basic)
        ".af-btn": { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.5rem 0.875rem", borderRadius: "var(--af-radius-md)", border: "1px solid transparent", fontWeight: "600" },
        ".af-btn-outline": { backgroundColor: "transparent", borderColor: "var(--af-color-neutral-300)", color: "var(--af-color-neutral-900)" },
        ".af-card": { border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-md)", padding: "var(--af-space-4)", background: "white", boxShadow: "var(--af-shadow-sm)" },
        ".af-input": { appearance: "none", border: "1px solid var(--af-color-neutral-300)", borderRadius: "var(--af-radius-sm)", padding: "0.5rem 0.75rem", background: "white", color: "var(--af-color-neutral-900)" }
      });
      const textNames = [
        "xs",
        "sm",
        "base",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl"
      ];
      const textUtils = {};
      for (const n of textNames) {
        textUtils[`.af-text-${n}`] = { fontSize: `var(--af-text-${n})` };
      }
      addUtilities(textUtils);
      const colorUtils = {};
      Object.entries(tokens.colors).forEach(([name, scale]) => {
        Object.keys(scale).forEach((k) => {
          colorUtils[`.af-text-${name}-${k}`] = {
            color: `var(--af-color-${name}-${k})`
          };
          colorUtils[`.af-bg-${name}-${k}`] = {
            backgroundColor: `var(--af-color-${name}-${k})`
          };
          colorUtils[`.af-btn-${name}`] = {
            backgroundColor: `var(--af-color-${name}-500)`,
            color: "#fff"
          };
        });
      });
      addUtilities(colorUtils);
    },
    {
      theme: {
        extend: {
          colors: {
            primary: tokens.colors.primary,
            neutral: tokens.colors.neutral,
            success: tokens.colors.success,
            warning: tokens.colors.warning,
            danger: tokens.colors.danger
          },
          borderRadius: tokens.radius,
          boxShadow: tokens.shadows
        }
      }
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defaultTokens
});

"use client";
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
  AcssImportWizard: () => AcssImportWizard,
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

// src/react/theme-studio.tsx
var import_react4 = __toESM(require("react"), 1);
var import_deepmerge3 = __toESM(require("deepmerge"), 1);
var import_chroma_js2 = __toESM(require("chroma-js"), 1);

// src/react/acss-import.tsx
var import_react3 = __toESM(require("react"), 1);
var import_chroma_js = __toESM(require("chroma-js"), 1);
var import_deepmerge2 = __toESM(require("deepmerge"), 1);
var import_jsx_runtime2 = require("react/jsx-runtime");
function diffCount(a, b) {
  let c = 0;
  if (typeof a !== "object" || typeof b !== "object" || !a || !b)
    return a === b ? 0 : 1;
  const keys = /* @__PURE__ */ new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) c += diffCount(a[k], b[k]);
  return c;
}
function AcssImportWizard({
  current,
  onApply
}) {
  const [json, setJson] = import_react3.default.useState(null);
  const [include, setInclude] = import_react3.default.useState({
    colors: true,
    typography: true,
    spacing: true,
    radius: true,
    shadows: true
  });
  const [error, setError] = import_react3.default.useState(null);
  const [selected, setSelected] = import_react3.default.useState({});
  const handleFile = async (f) => {
    if (!f) return;
    const text = await f.text();
    try {
      setJson(JSON.parse(text));
      setError(null);
    } catch {
      setError("Invalid JSON");
    }
  };
  import_react3.default.useEffect(() => {
    if (!json?.colors) {
      setSelected({});
      return;
    }
    const next = {};
    for (const role of Object.keys(json.colors)) {
      next[role] = {};
      for (const shade of Object.keys(json.colors[role])) {
        const cur = current.colors[role]?.[shade];
        const incoming = json.colors[role][shade];
        next[role][shade] = cur !== incoming;
      }
    }
    setSelected(next);
  }, [json]);
  const buildPatch = () => {
    const patch2 = {};
    if (!json) return patch2;
    if (include.colors && json.colors) {
      const colors = {};
      for (const role of Object.keys(json.colors)) {
        const roleSel = selected[role] || {};
        const shades = json.colors[role];
        for (const shade of Object.keys(shades)) {
          if (roleSel[shade]) {
            colors[role] = colors[role] || {};
            colors[role][shade] = shades[shade];
          }
        }
      }
      if (Object.keys(colors).length) patch2.colors = colors;
    }
    if (include.typography && json.typography)
      patch2.typography = {
        baseRem: json.typography.baseRem ?? current.typography.baseRem,
        scale: json.typography.ratio ?? current.typography.scale,
        minViewport: current.typography.minViewport,
        maxViewport: current.typography.maxViewport
      };
    if (include.spacing && json.spacing)
      patch2.spacing = {
        base: json.spacing.base ?? current.spacing.base,
        steps: current.spacing.steps
      };
    if (include.radius && json.radius)
      patch2.radius = { ...current.radius, ...json.radius };
    if (include.shadows && json.shadows)
      patch2.shadows = { ...current.shadows, ...json.shadows };
    return patch2;
  };
  const patch = buildPatch();
  const merged = (0, import_deepmerge2.default)(current, patch);
  const changes = diffCount(current, merged);
  const colorKeys = Object.keys(patch.colors || json?.colors || {});
  function deltaLch(a, b) {
    if (!a || !b) return null;
    try {
      const colorA = (0, import_chroma_js.default)(a);
      const colorB = (0, import_chroma_js.default)(b);
      const labA = colorA.lab();
      const labB = colorB.lab();
      const dL = Math.abs(labA[0] - labB[0]);
      const dA = Math.abs(labA[1] - labB[1]);
      const dB = Math.abs(labA[2] - labB[2]);
      return { dL: +dL.toFixed(3), dA: +dA.toFixed(3), dB: +dB.toFixed(1) };
    } catch {
      return null;
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      style: {
        border: "1px solid var(--af-color-neutral-300)",
        borderRadius: "var(--af-radius-md)",
        padding: "1rem"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: "ACSS Import Wizard" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { style: { fontSize: "var(--af-text-sm)" }, children: [
                "Upload JSON",
                " ",
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "input",
                  {
                    type: "file",
                    accept: "application/json",
                    onChange: (e) => handleFile(e.target.files?.[0] || null)
                  }
                )
              ] })
            ]
          }
        ),
        error && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { color: "red" }, children: error }),
        json && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginTop: "0.5rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "div",
            {
              style: {
                fontSize: "var(--af-text-sm)",
                color: "var(--af-color-neutral-500)"
              },
              children: "Detected fields"
            }
          ),
          ["colors", "typography", "spacing", "radius", "shadows"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { style: { display: "block" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "input",
              {
                type: "checkbox",
                checked: include[k],
                onChange: (e) => setInclude({ ...include, [k]: e.target.checked })
              }
            ),
            " ",
            k
          ] }, k)),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginTop: "0.5rem", fontSize: "var(--af-text-sm)" }, children: [
            "Change count: ",
            changes
          ] }),
          include.colors && colorKeys.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginTop: "0.5rem" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 600, marginBottom: "0.25rem" }, children: "Colors preview (select per-shade)" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "grid", gap: "0.75rem" }, children: colorKeys.map((role) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 600, marginBottom: "0.25rem" }, children: role }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                    gap: "0.25rem",
                    fontSize: "var(--af-text-sm)"
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: "Shade" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { textAlign: "center" }, children: "Current" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { textAlign: "center" }, children: "Incoming" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { textAlign: "center" }, children: "Diff" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { textAlign: "center" }, children: "Apply" }),
                    ["50", "100", "300", "500", "700", "900"].map((s) => {
                      const incoming = (json?.colors?.[role] || {})[s];
                      const cur = current.colors?.[role]?.[s];
                      const changed = incoming !== void 0 && incoming !== cur;
                      const d = deltaLch(cur, incoming);
                      const checked = (selected[role] || {})[s] || false;
                      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react3.default.Fragment, { children: [
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: s }),
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                          "div",
                          {
                            title: String(cur),
                            style: {
                              display: "grid",
                              gridTemplateColumns: "16px 1fr",
                              gap: 6,
                              alignItems: "center"
                            },
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                                "div",
                                {
                                  style: {
                                    width: 16,
                                    height: 16,
                                    background: cur,
                                    border: "1px solid var(--af-color-neutral-300)",
                                    borderRadius: 3
                                  }
                                }
                              ),
                              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { children: cur || "-" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                          "div",
                          {
                            title: String(incoming),
                            style: {
                              display: "grid",
                              gridTemplateColumns: "16px 1fr",
                              gap: 6,
                              alignItems: "center"
                            },
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                                "div",
                                {
                                  style: {
                                    width: 16,
                                    height: 16,
                                    background: incoming,
                                    border: "1px solid var(--af-color-neutral-300)",
                                    borderRadius: 3
                                  }
                                }
                              ),
                              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { children: incoming || "-" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                          "div",
                          {
                            style: {
                              color: changed ? "var(--af-color-warning-500, #b45309)" : "var(--af-color-neutral-500)"
                            },
                            children: changed ? d ? `\u0394L ${d.dL} \u0394a ${d.dA} \u0394b ${d.dB}` : "changed" : "same"
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                          "input",
                          {
                            type: "checkbox",
                            checked,
                            onChange: (e) => setSelected((prev) => ({
                              ...prev,
                              [role]: {
                                ...prev[role] || {},
                                [s]: e.target.checked
                              }
                            }))
                          }
                        ) })
                      ] }, s);
                    })
                  ]
                }
              )
            ] }, role)) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              onClick: () => onApply(patch),
              style: {
                marginTop: "0.5rem",
                padding: "0.25rem 0.5rem",
                border: "1px solid var(--af-color-neutral-300)",
                borderRadius: "var(--af-radius-sm)"
              },
              children: "Apply Selected"
            }
          )
        ] })
      ]
    }
  );
}

// src/react/theme-studio.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}
function hexToHsl(hex) {
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
}
function hslToHex(h, s, l) {
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const c = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * c).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
function Row({ label, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-grid-12 af-gap-3 af-items-center mt-2 mb-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-col-span-4 text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-col-span-8 min-w-0", children })
  ] });
}
var CONTROL_CLASS = "h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background transition";
var SELECT_CLASS = `${CONTROL_CLASS} appearance-none`;
var SMALL_CONTROL_CLASS = "h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background transition";
var BUTTON_PRIMARY_CLASS = "af-btn-modern af-btn-primary h-9 px-4 focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background transition";
var BUTTON_OUTLINE_CLASS = "af-btn-modern af-btn-outline h-9 px-4 focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background transition";
var BUTTON_GHOST_CLASS = "af-btn-modern af-btn-outline h-9 px-3 focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background transition";
var SHADE_KEYS = ["50", "100", "300", "500", "700", "900"];
function clampHex(v) {
  const x = v.trim().replace(/^#?/, "").toUpperCase();
  if (x.length === 3 || x.length === 6) return `#${x}`;
  if (x.length > 6) return `#${x.slice(0, 6)}`;
  return `#${x.padEnd(6, "0")}`;
}
function ColorCell({ value, onChange }) {
  const [open, setOpen] = import_react4.default.useState(false);
  const ref = import_react4.default.useRef(null);
  const [hex, setHex] = import_react4.default.useState(value);
  import_react4.default.useEffect(() => setHex(value), [value]);
  import_react4.default.useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  import_react4.default.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  const sysRef = import_react4.default.useRef(null);
  const adjust = (deltaL) => {
    try {
      const c = (0, import_chroma_js2.default)(hex);
      const [l, a, b] = c.lab();
      const nl = Math.max(0, Math.min(100, l + deltaL));
      const out = import_chroma_js2.default.lab(nl, a, b).hex();
      setHex(out);
      onChange(out);
    } catch {
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { position: "relative" }, ref, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "af-color-picker", "aria-label": "Pick color", onClick: () => setOpen((s) => !s), style: { background: value } }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { ref: sysRef, type: "color", value, onChange: (e) => onChange(e.target.value), style: { position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }, "aria-hidden": true }),
    open && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "fixed inset-0 z-overlay bg-overlay backdrop-blur-sm", "aria-hidden": true, onClick: () => setOpen(false) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          className: "af-popover z-popover",
          role: "dialog",
          "aria-label": "Color picker",
          "aria-modal": "true",
          style: { top: "2.75rem", left: 0 },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-popover-row", style: { marginBottom: "0.25rem" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "af-popover-title", children: "Color" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "af-color-swatch", style: { background: hex } })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-popover-row", style: { marginBottom: "0.25rem" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "input",
                {
                  className: `${SMALL_CONTROL_CLASS} af-input-hex`,
                  value: hex,
                  onChange: (e) => {
                    const v = clampHex(e.target.value);
                    setHex(v);
                    onChange(v);
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: BUTTON_GHOST_CLASS,
                  onClick: () => {
                    try {
                      sysRef.current?.click();
                    } catch {
                    }
                  },
                  children: "System\u2026"
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-popover-row", style: { gap: "0.75rem", marginBottom: "0.25rem" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "af-text-sm", style: { width: "1.25rem" }, children: "H" }),
              (() => {
                let [h, s, l] = hexToHsl(hex);
                return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "input",
                  {
                    className: "af-flex-1",
                    type: "range",
                    min: 0,
                    max: 360,
                    step: 1,
                    value: h,
                    onChange: (e) => {
                      const nh = Number(e.target.value);
                      const v = hslToHex(nh, s, l);
                      setHex(v);
                      onChange(v);
                    }
                  }
                );
              })()
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-popover-row", style: { gap: "0.75rem", marginBottom: "0.25rem" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "af-text-sm", style: { width: "1.25rem" }, children: "S" }),
              (() => {
                let [h, s, l] = hexToHsl(hex);
                return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "input",
                  {
                    className: "af-flex-1",
                    type: "range",
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: s,
                    onChange: (e) => {
                      const ns = Number(e.target.value);
                      const v = hslToHex(h, ns, l);
                      setHex(v);
                      onChange(v);
                    }
                  }
                );
              })()
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-color-actions", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: BUTTON_GHOST_CLASS, onClick: () => adjust(-10), children: "-10L" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: BUTTON_GHOST_CLASS, onClick: () => adjust(-5), children: "-5L" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: BUTTON_GHOST_CLASS, onClick: () => adjust(5), children: "+5L" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: BUTTON_GHOST_CLASS, onClick: () => adjust(10), children: "+10L" })
            ] })
          ]
        }
      )
    ] })
  ] });
}
function ThemeStudio() {
  const { tokens, setTokens, theme, setTheme, density, setDensity } = useAutofuse();
  const scale = tokens.typography.scale;
  const baseRem = tokens.typography.baseRem;
  const spaceBase = tokens.spacing.base;
  const wsRef = import_react4.default.useRef(null);
  const clientId = import_react4.default.useRef(Math.random().toString(36).slice(2));
  const applyPatch = (patch) => {
    setTokens(patch);
    try {
      const next = (0, import_deepmerge3.default)(tokens, patch);
      wsRef.current?.send(
        JSON.stringify({
          type: "tokens:update",
          clientId: clientId.current,
          tokens: next
        })
      );
    } catch {
    }
  };
  const setColor = (role, shade, value) => {
    const roleScale = {
      ...tokens.colors[role]
    };
    roleScale[shade] = value;
    applyPatch({ colors: { ...tokens.colors, [role]: roleScale } });
  };
  const setRadius = (k, v) => applyPatch({ radius: { ...tokens.radius, [k]: v } });
  const setShadow = (k, v) => applyPatch({ shadows: { ...tokens.shadows, [k]: v } });
  const [copied, setCopied] = import_react4.default.useState(false);
  const [exported, setExported] = import_react4.default.useState(false);
  const [saving, setSaving] = import_react4.default.useState(false);
  const [savedOk, setSavedOk] = import_react4.default.useState(false);
  const [loadingTokens, setLoadingTokens] = import_react4.default.useState(false);
  const exportConfig = () => {
    const content = `// autofusecss config generated from ThemeStudio
import { defineConfig } from 'autofusecss';

export default defineConfig(${JSON.stringify(
      tokens,
      null,
      2
    )});
`;
    if (typeof window !== "undefined") {
      const blob = new Blob([content], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "autofusecss.config.mjs";
      a.click();
      URL.revokeObjectURL(a.href);
      setExported(true);
      setTimeout(() => setExported(false), 1200);
      try {
        window.dispatchEvent(new CustomEvent("af:toast", { detail: { type: "ok", msg: "Config exported" } }));
      } catch {
      }
    }
  };
  const copyTailwindConfig = async () => {
    const cfg = `// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require('autofusecss/tailwind')({ tokens: ${JSON.stringify(
      tokens,
      null,
      2
    )} })]
};
`;
    try {
      await navigator.clipboard.writeText(cfg);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
      try {
        window.dispatchEvent(new CustomEvent("af:toast", { detail: { type: "ok", msg: "Tailwind config copied" } }));
      } catch {
      }
    } catch {
      try {
        window.dispatchEvent(new CustomEvent("af:toast", { detail: { type: "err", msg: "Copy failed" } }));
      } catch {
      }
    }
  };
  const [presetName, setPresetName] = import_react4.default.useState("default");
  const [presetKey, setPresetKey] = import_react4.default.useState("");
  const getPresets = () => {
    try {
      return JSON.parse(localStorage.getItem("af-presets") || "{}");
    } catch {
      return {};
    }
  };
  const savePreset = () => {
    try {
      const p = getPresets();
      p[presetName || "preset"] = tokens;
      localStorage.setItem("af-presets", JSON.stringify(p));
      try {
        window.dispatchEvent(new CustomEvent("af:toast", { detail: { type: "ok", msg: "Preset saved" } }));
      } catch {
      }
    } catch {
      try {
        window.dispatchEvent(new CustomEvent("af:toast", { detail: { type: "err", msg: "Save preset failed" } }));
      } catch {
      }
    }
  };
  const loadPreset = () => {
    try {
      const p = getPresets();
      const data = p[presetKey];
      if (data) applyPatch(data);
    } catch {
    }
  };
  const deletePreset = () => {
    try {
      const p = getPresets();
      delete p[presetKey];
      localStorage.setItem("af-presets", JSON.stringify(p));
      setPresetKey("");
    } catch {
    }
  };
  const apiFromWs = (ws) => {
    try {
      const u = new URL(ws);
      const proto = u.protocol === "wss:" ? "https:" : "http:";
      return `${proto}//${u.host}`;
    } catch {
      return "";
    }
  };
  const saveToServer = async () => {
    const base = apiFromWs(wsUrl);
    const url = base ? `${base}/api/tokens?room=${encodeURIComponent(room)}` : `/api/tokens?room=${encodeURIComponent(room)}`;
    try {
      setSaving(true);
      await fetch(url, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(tokens) });
      setSavedOk(true);
      setTimeout(() => setSavedOk(false), 1200);
      try {
        window.dispatchEvent(new CustomEvent("af:toast", { detail: { type: "ok", msg: "Tokens saved" } }));
      } catch {
      }
    } catch (e) {
      console.error(e);
      try {
        window.dispatchEvent(new CustomEvent("af:toast", { detail: { type: "err", msg: "Save failed" } }));
      } catch {
      }
    } finally {
      setSaving(false);
    }
  };
  const loadFromServer = async (targetRoom) => {
    const r = targetRoom || room;
    const base = apiFromWs(wsUrl);
    const url = base ? `${base}/api/tokens?room=${encodeURIComponent(r)}` : `/api/tokens?room=${encodeURIComponent(r)}`;
    try {
      setLoadingTokens(true);
      const res = await fetch(url);
      const data = await res.json();
      const t = data && data.colors ? data : data?.tokens;
      if (t) {
        applyPatch(t);
        try {
          window.dispatchEvent(new CustomEvent("af:toast", { detail: { type: "ok", msg: "Tokens loaded" } }));
        } catch {
        }
      } else try {
        window.dispatchEvent(new CustomEvent("af:toast", { detail: { type: "err", msg: "No tokens stored" } }));
      } catch {
      }
    } catch (e) {
      console.error(e);
      try {
        window.dispatchEvent(new CustomEvent("af:toast", { detail: { type: "err", msg: "Load failed" } }));
      } catch {
      }
    } finally {
      setLoadingTokens(false);
    }
  };
  const [wsUrl, setWsUrl] = import_react4.default.useState("ws://localhost:4001");
  const [room, setRoom] = import_react4.default.useState(
    () => typeof window !== "undefined" ? localStorage.getItem("af-room") || "default" : "default"
  );
  const [token, setToken] = import_react4.default.useState(
    () => typeof window !== "undefined" ? localStorage.getItem("af-token") || "" : ""
  );
  const [connected, setConnected] = import_react4.default.useState(false);
  const [cloneRoom, setCloneRoom] = import_react4.default.useState("production");
  const connectWs = () => {
    try {
      wsRef.current?.close();
    } catch {
    }
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("af-room", room);
        localStorage.setItem("af-token", token);
      } catch {
      }
    }
    const url = `${wsUrl.replace(/\/$/, "")}/ws?room=${encodeURIComponent(
      room
    )}${token ? `&token=${encodeURIComponent(token)}` : ""}`;
    const ws = new WebSocket(url);
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
  const hexToRgb2 = (hex) => {
    const h = hex.replace("#", "");
    const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const n = parseInt(full, 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  };
  const luminance = (hex) => {
    const [r, g, b] = hexToRgb2(hex).map((v) => v / 255);
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
  const generateShades = (base) => {
    const [h, s, l] = hexToHsl(base);
    const steps = {
      50: "",
      100: "",
      300: "",
      500: base,
      700: "",
      900: ""
    };
    const light = (delta) => hslToHex(h, s, Math.min(0.98, l + delta));
    const dark = (delta) => hslToHex(h, s, Math.max(0.02, l - delta));
    steps["50"] = light(0.45);
    steps["100"] = light(0.3);
    steps["300"] = light(0.1);
    steps["700"] = dark(0.15);
    steps["900"] = dark(0.3);
    return steps;
  };
  const generateOklchShades = (base) => {
    const color = (0, import_chroma_js2.default)(base);
    const lab = color.lab();
    const [l, a, b] = lab;
    const generateShade = (lightnessFactor) => {
      return import_chroma_js2.default.lab(l * lightnessFactor, a, b).hex();
    };
    return {
      50: generateShade(1.4),
      // Much lighter
      100: generateShade(1.25),
      // Lighter
      300: generateShade(1.1),
      // Slightly lighter
      500: color.hex(),
      // Base color
      700: generateShade(0.85),
      // Darker
      900: generateShade(0.6)
      // Much darker
    };
  };
  const adjustForContrastAAA = (fgHex, bgHex) => {
    const fgColor = (0, import_chroma_js2.default)(fgHex);
    const lab = fgColor.lab();
    const [l, a, b] = lab;
    let lo = 0, hi = 100, best = l, target = 7;
    for (let i = 0; i < 18; i++) {
      const mid = (lo + hi) / 2;
      const testColor = import_chroma_js2.default.lab(mid, a, b);
      const r = contrast(testColor.hex(), bgHex);
      if (r >= target) {
        best = mid;
        if (l > mid) hi = mid;
        else lo = mid;
      } else {
        if (l > mid) lo = mid;
        else hi = mid;
      }
    }
    return import_chroma_js2.default.lab(best, a, b).hex();
  };
  const [showReport, setShowReport] = import_react4.default.useState(false);
  const [toasts, setToasts] = import_react4.default.useState([]);
  import_react4.default.useEffect(() => {
    const onToast = (e) => {
      const id = Date.now() + Math.random();
      setToasts((q) => [...q, { id, ...e.detail || { type: "ok", msg: "" } }]);
      setTimeout(() => setToasts((q) => q.filter((t) => t.id !== id)), 1800);
    };
    window.addEventListener("af:toast", onToast);
    return () => window.removeEventListener("af:toast", onToast);
  }, []);
  const lastToast = toasts.length ? toasts[toasts.length - 1]?.msg : "";
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-theme-studio bg-background text-foreground border border-border shadow-lg rounded-xl", children: [
    toasts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-toast-container", children: toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `af-toast ${t.type === "ok" ? "af-toast-ok" : "af-toast-err"}`, children: t.msg }, t.id)) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-sr-only", "aria-live": "polite", role: "status", children: [
      saving ? "Saving\u2026" : savedOk ? "Saved" : "",
      " ",
      lastToast || ""
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-studio-header sticky top-0 z-header bg-background/80 backdrop-blur border-b border-border", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-studio-title-section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "af-studio-title", children: "Autofuse Theme Studio" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "af-studio-subtitle", children: "Craft your perfect design system with real-time visual feedback" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-studio-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "button",
          {
            type: "button",
            onClick: exportConfig,
            className: BUTTON_OUTLINE_CLASS,
            "aria-label": "Export Config",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "\u{1F4BE}" }),
              "Export Config",
              exported && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "af-ghost-tip", "aria-hidden": true, children: "\u2713 Copied" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "button",
          {
            type: "button",
            onClick: saveToServer,
            className: `${BUTTON_PRIMARY_CLASS} ${saving ? "af-btn-loading" : ""}`,
            disabled: saving,
            "aria-pressed": saving,
            "aria-busy": saving,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "\u{1F4BE}" }),
              saving ? "Saving\u2026" : savedOk ? "Saved \u2713" : "Save"
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "button",
          {
            type: "button",
            onClick: copyTailwindConfig,
            className: BUTTON_OUTLINE_CLASS,
            "aria-label": "Copy Tailwind Config",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "\u{1F343}" }),
              "Copy Tailwind Config",
              copied && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "af-ghost-tip", "aria-hidden": true, children: "\u2713 Copied" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-studio-content", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-grid-12 af-gap-3 af-items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-col-span-6", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "input",
          {
            className: CONTROL_CLASS,
            type: "text",
            value: wsUrl,
            onChange: (e) => setWsUrl(e.target.value),
            placeholder: "ws://localhost:4001"
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-col-span-3", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "input",
          {
            className: CONTROL_CLASS,
            type: "text",
            value: room,
            onChange: (e) => setRoom(e.target.value),
            placeholder: "room"
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-col-span-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "input",
          {
            className: CONTROL_CLASS,
            type: "password",
            value: token,
            onChange: (e) => setToken(e.target.value),
            placeholder: "token (optional)"
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-col-span-1", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", onClick: connectWs, className: BUTTON_OUTLINE_CLASS, children: connected ? "Connected" : "Connect" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Row, { label: "Theme mode", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("select", { className: SELECT_CLASS, value: theme, onChange: (e) => setTheme(e.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "light", children: "Light" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "dark", children: "Dark" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "hc", children: "High Contrast" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mt-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-sm text-muted-foreground mb-2", children: "Room actions" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-form-row af-cols-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "input",
            {
              className: CONTROL_CLASS,
              type: "text",
              placeholder: "clone to room",
              value: cloneRoom,
              onChange: (e) => setCloneRoom(e.target.value)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              type: "button",
              className: `${BUTTON_OUTLINE_CLASS} ${loadingTokens ? "af-btn-loading" : ""}`,
              disabled: loadingTokens,
              onClick: () => loadFromServer(),
              children: "Load"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              type: "button",
              className: `${BUTTON_PRIMARY_CLASS} ${saving ? "af-btn-loading" : ""}`,
              disabled: saving,
              onClick: saveToServer,
              children: saving ? "Saving\u2026" : savedOk ? "Saved \u2713" : "Save"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "grid", style: { gridTemplateColumns: "1fr auto", gap: "var(--af-space-2)", marginTop: "var(--af-space-2)" }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            type: "button",
            onClick: async () => {
              const base = apiFromWs(wsUrl);
              const url = base ? `${base}/api/tokens?room=${encodeURIComponent(cloneRoom)}` : `/api/tokens?room=${encodeURIComponent(cloneRoom)}`;
              try {
                await fetch(url, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(tokens) });
                try {
                  window.dispatchEvent(new CustomEvent("af:toast", { detail: { type: "ok", msg: `Cloned to ${cloneRoom}` } }));
                } catch {
                }
              } catch {
                try {
                  window.dispatchEvent(new CustomEvent("af:toast", { detail: { type: "err", msg: "Clone failed" } }));
                } catch {
                }
              }
            },
            className: BUTTON_OUTLINE_CLASS,
            children: "Clone to room"
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Row, { label: "Density", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("select", { className: SELECT_CLASS, value: density, onChange: (e) => setDensity(e.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "comfortable", children: "Comfortable" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "compact", children: "Compact" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { marginTop: "var(--af-space-4)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: { fontWeight: 600, marginBottom: "var(--af-space-2)" }, children: "Palette" }),
        ["primary", "neutral"].map((role) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-palette-grid", style: { marginBottom: "var(--af-space-2)" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-text-sm af-text-muted", children: role }),
          SHADE_KEYS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            ColorCell,
            {
              value: tokens.colors[role]?.[s] || "#ffffff",
              onChange: (v) => setColor(role, s, v)
            },
            s
          ))
        ] }, role)),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-wrap items-center gap-2 mt-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              type: "button",
              className: BUTTON_OUTLINE_CLASS,
              onClick: () => applyPatch({
                colors: {
                  ...tokens.colors,
                  primary: generateShades(
                    tokens.colors.primary?.["500"] || "#3b82f6"
                  )
                }
              }),
              children: "Auto\u2011generate Primary Shades"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              type: "button",
              className: BUTTON_OUTLINE_CLASS,
              onClick: () => applyPatch({
                colors: {
                  ...tokens.colors,
                  primary: generateOklchShades(
                    tokens.colors.primary?.["500"] || "#3b82f6"
                  )
                }
              }),
              children: "OKLCH Shades"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              type: "button",
              className: BUTTON_OUTLINE_CLASS,
              onClick: () => {
                const invert = (hex) => {
                  try {
                    const [l, a, b] = (0, import_chroma_js2.default)(hex).lab();
                    return import_chroma_js2.default.lab(Math.max(0, Math.min(100, 100 - l)), a, b).hex();
                  } catch {
                    return hex;
                  }
                };
                const mapScale = (scale2) => Object.fromEntries(Object.entries(scale2).map(([k, v]) => [k, invert(v)]));
                const dark = {};
                Object.entries(tokens.colors).forEach(([name, scale2]) => {
                  dark[name] = mapScale(scale2);
                });
                applyPatch({ modes: { ...tokens.modes || {}, dark } });
              },
              children: "Derive Dark Mode"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              type: "button",
              className: BUTTON_OUTLINE_CLASS,
              onClick: () => {
                const boost = (hex) => {
                  try {
                    const c = (0, import_chroma_js2.default)(hex);
                    const [l, a, b] = c.lab();
                    const nl = l < 50 ? Math.max(15, l - 20) : Math.min(95, l + 20);
                    return import_chroma_js2.default.lab(nl, a, b).hex();
                  } catch {
                    return hex;
                  }
                };
                const mapScale = (scale2) => Object.fromEntries(Object.entries(scale2).map(([k, v]) => [k, boost(v)]));
                const hc = {};
                Object.entries(tokens.colors).forEach(([name, scale2]) => {
                  hc[name] = mapScale(scale2);
                });
                applyPatch({ modes: { ...tokens.modes || {}, highContrast: hc } });
              },
              children: "Derive High\u2011Contrast"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "input",
            {
              type: "file",
              accept: "application/json",
              onChange: async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                try {
                  const txt = await f.text();
                  applyPatch(JSON.parse(txt));
                  window.dispatchEvent(new CustomEvent("af:toast", { detail: { type: "ok", msg: "JSON applied" } }));
                } catch {
                  try {
                    window.dispatchEvent(new CustomEvent("af:toast", { detail: { type: "err", msg: "Invalid JSON" } }));
                  } catch {
                  }
                }
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { marginTop: "var(--af-space-4)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: { fontWeight: 600, marginBottom: "var(--af-space-2)" }, children: "Presets" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-form-row af-cols-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "input",
            {
              className: CONTROL_CLASS,
              type: "text",
              placeholder: "Preset name",
              value: presetName,
              onChange: (e) => setPresetName(e.target.value)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: BUTTON_OUTLINE_CLASS, onClick: savePreset, children: "Save Preset" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              gap: "var(--af-space-2)",
              marginTop: "0.5rem"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("select", { className: SELECT_CLASS, value: presetKey, onChange: (e) => setPresetKey(e.target.value), children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "", children: "Select preset\u2026" }),
                Object.keys(
                  (() => {
                    try {
                      return JSON.parse(localStorage.getItem("af-presets") || "{}");
                    } catch {
                      return {};
                    }
                  })()
                ).map((k) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: k, children: k }, k))
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: BUTTON_OUTLINE_CLASS, onClick: loadPreset, children: "Load" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: BUTTON_OUTLINE_CLASS, onClick: deletePreset, children: "Delete" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: { marginTop: "var(--af-space-4)" }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        AcssImportWizard,
        {
          current: tokens,
          onApply: (patch) => applyPatch(patch)
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { marginTop: "var(--af-space-4)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: { fontWeight: 600, marginBottom: "var(--af-space-2)" }, children: "Typography" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Row, { label: `Scale (${scale.toFixed(2)})`, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-flex af-items-center af-gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "input",
            {
              type: "range",
              min: 1.05,
              max: 1.5,
              step: 0.01,
              value: scale,
              onChange: (e) => applyPatch({
                typography: {
                  ...tokens.typography,
                  scale: Number(e.target.value)
                }
              }),
              className: "af-flex-1"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "input",
            {
              "aria-label": "Scale",
              type: "number",
              step: 0.01,
              value: Number(scale).toFixed(2),
              onChange: (e) => applyPatch({ typography: { ...tokens.typography, scale: Number(e.target.value) } }),
              className: `${CONTROL_CLASS} af-input-num`
            }
          )
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Row, { label: `Base size (rem) (${baseRem})`, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-flex af-items-center af-gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "input",
            {
              type: "range",
              min: 0.75,
              max: 1.25,
              step: 0.01,
              value: baseRem,
              onChange: (e) => applyPatch({
                typography: {
                  ...tokens.typography,
                  baseRem: Number(e.target.value)
                }
              }),
              className: "af-flex-1"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "input",
            {
              "aria-label": "Base size rem",
              type: "number",
              step: 0.01,
              value: Number(baseRem).toFixed(2),
              onChange: (e) => applyPatch({ typography: { ...tokens.typography, baseRem: Number(e.target.value) } }),
              className: `${CONTROL_CLASS} af-input-num`
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { marginTop: "var(--af-space-4)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: { fontWeight: 600, marginBottom: "var(--af-space-2)" }, children: "Spacing" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Row, { label: `Base step (px) (${spaceBase})`, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "input",
          {
            type: "range",
            min: 2,
            max: 8,
            step: 1,
            value: spaceBase,
            onChange: (e) => applyPatch({
              spacing: {
                ...tokens.spacing,
                base: Number(e.target.value)
              }
            })
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { marginTop: "var(--af-space-4)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: { fontWeight: 600, marginBottom: "var(--af-space-2)" }, children: "Radius" }),
        Object.entries(tokens.radius).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Row, { label: k, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "input",
          {
            type: "text",
            value: v,
            onChange: (e) => setRadius(k, e.target.value),
            className: CONTROL_CLASS
          }
        ) }, k))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { marginTop: "var(--af-space-4)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: { fontWeight: 600, marginBottom: "var(--af-space-2)" }, children: "Shadows" }),
        Object.entries(tokens.shadows).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Row, { label: k, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "input",
          {
            type: "text",
            value: v,
            onChange: (e) => setShadow(k, e.target.value),
            className: CONTROL_CLASS
          }
        ) }, k))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          style: {
            display: "grid",
            gap: "var(--af-space-2)",
            marginTop: "var(--af-space-4)"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-sm text-muted-foreground", children: "Preview" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-preview-card", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-preview-grid", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h1", { style: { fontSize: "var(--af-text-2xl)", color: "var(--af-color-primary-700)", margin: 0 }, children: "Heading H1" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { style: { fontSize: "var(--af-text-base)", margin: 0, color: "var(--af-color-neutral-700)" }, children: "Body text scales with viewport width." }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: BUTTON_PRIMARY_CLASS, style: { alignSelf: "start" }, children: "Button" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "var(--af-space-2)"
                },
                children: (() => {
                  const p700 = tokens.colors.primary?.["700"] || "#1d4ed8";
                  const n50 = tokens.colors.neutral?.["50"] || "#f8fafc";
                  const n900 = tokens.colors.neutral?.["900"] || "#0f172a";
                  const c1 = contrast(p700, n50);
                  const c2 = contrast(p700, n900);
                  const passAA1 = c1 >= 4.5;
                  const passAA2 = c2 >= 4.5;
                  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-card-sm", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                        "div",
                        {
                          style: {
                            background: n50,
                            color: p700,
                            padding: "0.5rem",
                            borderRadius: "var(--af-radius-sm)"
                          },
                          children: "Text sample"
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { fontSize: "var(--af-text-sm)" }, children: [
                        "Contrast: ",
                        c1,
                        ":1 ",
                        passAA1 ? "\u2713 AA" : "\u2715"
                      ] }),
                      !passAA1 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                        "button",
                        {
                          type: "button",
                          className: `${BUTTON_OUTLINE_CLASS} mt-2`,
                          onClick: () => applyPatch({
                            colors: {
                              ...tokens.colors,
                              primary: {
                                ...tokens.colors.primary,
                                700: adjustForContrastAAA(p700, n50)
                              }
                            }
                          }),
                          children: "Auto-fix AAA"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-card-sm", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                        "div",
                        {
                          style: {
                            background: n900,
                            color: p700,
                            padding: "0.5rem",
                            borderRadius: "var(--af-radius-sm)"
                          },
                          children: "Text sample"
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { fontSize: "var(--af-text-sm)" }, children: [
                        "Contrast: ",
                        c2,
                        ":1 ",
                        passAA2 ? "\u2713 AA" : "\u2715"
                      ] }),
                      !passAA2 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                        "button",
                        {
                          type: "button",
                          className: `${BUTTON_OUTLINE_CLASS} mt-2`,
                          onClick: () => applyPatch({
                            colors: {
                              ...tokens.colors,
                              primary: {
                                ...tokens.colors.primary,
                                700: adjustForContrastAAA(p700, n900)
                              }
                            }
                          }),
                          children: "Auto-fix AAA"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", {})
                  ] });
                })()
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: { marginTop: "var(--af-space-2)" }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { type: "button", className: BUTTON_OUTLINE_CLASS, onClick: () => setShowReport((s) => !s), children: [
              showReport ? "Hide" : "Generate",
              " Report"
            ] }) }),
            showReport && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-card af-card-muted", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-report-header", style: { marginBottom: "0.5rem" }, children: "Palette Report (\u0394LCH and AA/AAA)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-report-grid", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-report-header", children: "Role" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-report-header", children: "\u0394LCH(700\u2192500)" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-report-header", children: "Contrast on Neutral 50" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-report-header", children: "Contrast on Neutral 900" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-report-header", children: "Notes" }),
                Object.keys(tokens.colors).map((role) => {
                  const r = tokens.colors[role];
                  const n = tokens.colors.neutral || {};
                  const p700 = r?.["700"];
                  const p500 = r?.["500"];
                  const n50 = n?.["50"] || "#f8fafc";
                  const n900 = n?.["900"] || "#0f172a";
                  const d = (() => {
                    try {
                      const colorA = (0, import_chroma_js2.default)(p700);
                      const colorB = (0, import_chroma_js2.default)(p500);
                      const labA = colorA.lab();
                      const labB = colorB.lab();
                      const dL = Math.abs(labA[0] - labB[0]);
                      const dA = Math.abs(labA[1] - labB[1]);
                      const dB = Math.abs(labA[2] - labB[2]);
                      return `\u0394L ${dL.toFixed(3)} \u0394a ${dA.toFixed(
                        3
                      )} \u0394b ${dB.toFixed(1)}`;
                    } catch {
                      return "n/a";
                    }
                  })();
                  const c1 = contrast(p700 || "#000", n50);
                  const c2 = contrast(p700 || "#000", n900);
                  const tag = (ratio) => ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "Fail";
                  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react4.default.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-report-cell", children: role }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-report-cell", children: d }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-report-cell", children: [
                      c1,
                      ":1 ",
                      tag(c1)
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "af-report-cell", children: [
                      c2,
                      ":1 ",
                      tag(c2)
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "af-report-cell", children: tag(c1) === "Fail" || tag(c2) === "Fail" ? "Consider auto-fix" : "" })
                  ] }, role);
                })
              ] })
            ] })
          ]
        }
      )
    ] })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AcssImportWizard,
  AutofuseProvider,
  ThemeStudio,
  useAutofuse
});

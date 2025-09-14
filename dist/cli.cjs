#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/cli.ts
var import_node_fs = __toESM(require("fs"), 1);
var import_node_path = __toESM(require("path"), 1);
var import_node_url = require("url");

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

// src/cli.ts
var import_meta = {};
function findPackageStyles() {
  const dirname = import_node_path.default.dirname((0, import_node_url.fileURLToPath)(import_meta.url));
  const stylesPath = import_node_path.default.resolve(dirname, "css", "styles.css");
  if (import_node_fs.default.existsSync(stylesPath)) return stylesPath;
  const alt = import_node_path.default.resolve(dirname, "../src/css/styles.css");
  if (import_node_fs.default.existsSync(alt)) return alt;
  throw new Error("Cannot locate bundled styles.css");
}
async function loadConfig(cwd) {
  const candidates = [
    "autofusecss.config.mjs",
    "autofusecss.config.js"
  ];
  for (const f of candidates) {
    const p = import_node_path.default.join(cwd, f);
    if (import_node_fs.default.existsSync(p)) {
      const mod = await import((0, import_node_url.pathToFileURL)(p).href);
      const cfg = mod.default ?? mod.config ?? mod;
      return cfg;
    }
  }
  return null;
}
async function cmdInit(cwd, useTs) {
  const target = import_node_path.default.join(cwd, `autofusecss.config.${useTs ? "ts" : "mjs"}`);
  if (import_node_fs.default.existsSync(target)) {
    console.log("\u2714 autofusecss.config.mjs already exists");
    return;
  }
  const template = useTs ? `// AutofuseCSS config (TypeScript)
import { defineConfig, defaultTokens } from 'autofusecss';

export default defineConfig({
  ...defaultTokens,
});
` : `// AutofuseCSS config (ESM)
import { defaultTokens } from 'autofusecss';

export default {
  // Start from defaults and override what you need
  ...defaultTokens,
  // Example: change primary palette or spacing density
  // colors: { ...defaultTokens.colors, primary: { ...defaultTokens.colors.primary, 500: '#2563eb' } },
};
`;
  import_node_fs.default.writeFileSync(target, template, "utf8");
  console.log("\u2714 Created autofusecss.config.mjs");
}
function extractSections(css, includes) {
  if (!includes || includes.size === 0) return css;
  const lines = css.split("\n");
  const out = [];
  let keep = false;
  for (const line of lines) {
    const m = line.match(/\/\*\s*@af:([a-z-]+)\s*\*\//i);
    if (m) keep = includes.has(m[1]);
    if (keep) out.push(line);
  }
  return out.join("\n");
}
function minifyCss(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").trim();
}
async function cmdBuild(cwd, opts) {
  const cfg = await loadConfig(cwd);
  const tokens = { ...defaultTokens, ...cfg || {} };
  const cssVars = buildCssVariables(tokens).css;
  let baseCss = import_node_fs.default.readFileSync(findPackageStyles(), "utf8");
  let includes = null;
  if (opts.include && opts.include.length) {
    includes = new Set(opts.include);
    baseCss = extractSections(baseCss, includes);
  }
  let out = `${cssVars}
${baseCss}`;
  if (opts.minify) out = minifyCss(out);
  const outPath = import_node_path.default.join(cwd, opts.out || "autofuse.css");
  import_node_fs.default.writeFileSync(outPath, out, "utf8");
  console.log(`\u2714 Wrote ${outPath}`);
}
async function main() {
  const [, , cmd, ...rest] = process.argv;
  const cwd = process.cwd();
  switch (cmd) {
    case "init":
      await cmdInit(cwd, rest.includes("--ts"));
      break;
    case "build":
      {
        let out;
        let minify = false;
        let include = [];
        for (let i = 0; i < rest.length; i++) {
          const a = rest[i];
          if (a === "--out") out = rest[++i];
          else if (a === "--minify") minify = true;
          else if (a === "--include-utils") include = (rest[++i] || "").split(",").filter(Boolean);
        }
        await cmdBuild(cwd, { out, minify, include });
      }
      break;
    default:
      console.log("AutofuseCSS CLI");
      console.log("  Usage: autofusecss <init|build> [options]");
      console.log("    init [--ts]");
      console.log("    build [--out <file>] [--minify] [--include-utils <list>]");
  }
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});

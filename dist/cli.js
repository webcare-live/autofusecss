#!/usr/bin/env node
import {
  buildCssVariables,
  defaultTokens
} from "./chunk-U4JQ6BVB.js";

// src/cli.ts
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
function findPackageStyles() {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const stylesPath = path.resolve(dirname, "css", "styles.css");
  if (fs.existsSync(stylesPath)) return stylesPath;
  const alt = path.resolve(dirname, "../src/css/styles.css");
  if (fs.existsSync(alt)) return alt;
  throw new Error("Cannot locate bundled styles.css");
}
async function loadConfig(cwd) {
  const candidates = [
    "autofusecss.config.mjs",
    "autofusecss.config.js"
  ];
  for (const f of candidates) {
    const p = path.join(cwd, f);
    if (fs.existsSync(p)) {
      const mod = await import(pathToFileURL(p).href);
      const cfg = mod.default ?? mod.config ?? mod;
      return cfg;
    }
  }
  return null;
}
async function cmdInit(cwd, useTs) {
  const target = path.join(cwd, `autofusecss.config.${useTs ? "ts" : "mjs"}`);
  if (fs.existsSync(target)) {
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
  fs.writeFileSync(target, template, "utf8");
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
  let baseCss = fs.readFileSync(findPackageStyles(), "utf8");
  let includes = null;
  if (opts.include && opts.include.length) {
    includes = new Set(opts.include);
    baseCss = extractSections(baseCss, includes);
  }
  let out = `${cssVars}
${baseCss}`;
  if (opts.minify) out = minifyCss(out);
  const outPath = path.join(cwd, opts.out || "autofuse.css");
  fs.writeFileSync(outPath, out, "utf8");
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

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
  const candidates = ["autofusecss.config.mjs", "autofusecss.config.js"];
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
function analyzeSections(css) {
  const lines = css.split("\n");
  const sections = {};
  let currentSection = "base";
  let sectionLines = [];
  for (const line of lines) {
    const m = line.match(/\/\*\s*@af:([a-z-]+)\s*\*\//i);
    if (m) {
      if (sectionLines.length > 0) {
        const sectionCss = sectionLines.join("\n");
        const selectors = extractSelectors(sectionCss);
        sections[currentSection] = {
          size: Buffer.byteLength(sectionCss, "utf8"),
          rules: countRules(sectionCss),
          selectors
        };
      }
      currentSection = m[1];
      sectionLines = [];
    }
    sectionLines.push(line);
  }
  if (sectionLines.length > 0) {
    const sectionCss = sectionLines.join("\n");
    const selectors = extractSelectors(sectionCss);
    sections[currentSection] = {
      size: Buffer.byteLength(sectionCss, "utf8"),
      rules: countRules(sectionCss),
      selectors
    };
  }
  return sections;
}
function extractSelectors(css) {
  const selectors = [];
  const rules = css.match(/[^{}]+\s*\{[^}]*\}/g) || [];
  for (const rule of rules) {
    const parts = rule.split("{");
    const selectorPart = parts[0]?.trim();
    if (selectorPart && !selectorPart.startsWith("/*") && !selectorPart.startsWith("*/")) {
      const multiSelectors = selectorPart.split(",").map((s) => s.trim()).filter(Boolean);
      selectors.push(...multiSelectors);
    }
  }
  return selectors;
}
function countRules(css) {
  const rules = css.match(/[^{}]+\s*\{[^}]*\}/g) || [];
  return rules.filter((rule) => {
    const parts = rule.split("{");
    const selectorPart = parts[0]?.trim();
    return selectorPart && !selectorPart.startsWith("/*") && !selectorPart.startsWith("*/");
  }).length;
}
function generateOptimizationSuggestions(sections, includes, totalSize) {
  console.log("\n\uFFFD Optimization Suggestions:");
  console.log("=".repeat(50));
  const sectionSizes = Object.entries(sections).sort(
    ([, a], [, b]) => b.size - a.size
  );
  const largestSections = sectionSizes.slice(0, 3);
  if (!includes || includes.size === 0) {
    console.log("\u{1F4A1} Use selective builds to reduce bundle size:");
    console.log(
      "   autofusecss build --include-utils typography,spacing,colors --minify"
    );
    const coreSize = (sections.typography?.size || 0) + (sections.spacing?.size || 0) + (sections.colors?.size || 0);
    const coreSavings = totalSize - coreSize;
    console.log(
      `   Potential core-only build: ${(coreSize / 1024).toFixed(
        2
      )} kB (saves ${(coreSavings / 1024).toFixed(2)} kB)`
    );
  }
  console.log("\n\u{1F4E6} Build optimizations:");
  console.log("   \u2022 Add --minify flag (saves ~20-30% size)");
  console.log("   \u2022 Use compact preset for smaller spacing (--preset compact)");
  console.log("   \u2022 Consider purging unused CSS in production builds");
  console.log("\n\u{1F4CA} Section recommendations:");
  for (const [name, data] of largestSections) {
    const percentage = (data.size / totalSize * 100).toFixed(1);
    if (data.size > 2048) {
      console.log(
        `   \u2022 ${name} (${percentage}%): Consider selective inclusion if not all utilities needed`
      );
    }
  }
  const availableSections = Object.keys(sections).filter((s) => s !== "base");
  if (availableSections.length > 0) {
    console.log("\n\u{1F4CB} Available sections for selective builds:");
    console.log(`   ${availableSections.join(", ")}`);
  }
}
function minifyCss(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").trim();
}
function applyPreset(tokens, preset) {
  if (!preset) return tokens;
  const t = JSON.parse(JSON.stringify(tokens));
  switch (preset) {
    case "compact":
      t.spacing.base = Math.max(2, t.spacing.base - 1);
      t.typography.baseRem = Math.max(0.9, t.typography.baseRem - 0.05);
      break;
    case "comfortable":
      t.spacing.base = t.spacing.base + 1;
      t.typography.baseRem = t.typography.baseRem + 0.05;
      break;
    case "spacious":
      t.spacing.base = t.spacing.base + 2;
      t.typography.baseRem = t.typography.baseRem + 0.1;
      break;
    case "dark":
      break;
  }
  return t;
}
async function cmdBuild(cwd, opts) {
  const cfg = await loadConfig(cwd);
  let tokens = { ...defaultTokens, ...cfg || {} };
  tokens = applyPreset(tokens, opts.preset);
  const cssVars = buildCssVariables(tokens).css;
  let baseCss = fs.readFileSync(findPackageStyles(), "utf8");
  let includes = null;
  if (opts.include && opts.include.length) {
    includes = new Set(opts.include);
    baseCss = extractSections(baseCss, includes);
  }
  let out = `${cssVars}
${baseCss}`;
  const preMinifySize = Buffer.byteLength(out, "utf8");
  const sections = analyzeSections(out);
  if (opts.minify) out = minifyCss(out);
  const outPath = path.join(cwd, opts.out || "autofuse.css");
  fs.writeFileSync(outPath, out, "utf8");
  console.log(`\u2714 Wrote ${outPath}`);
  if (opts.report || opts.analyze) {
    const finalSize = Buffer.byteLength(out, "utf8");
    const lines = out.split("\n").length;
    console.log(`
\u{1F4CB} Build Report:`);
    console.log(`  preset: ${opts.preset || "none"}`);
    console.log(`  size: ${(finalSize / 1024).toFixed(2)} kB, lines: ${lines}`);
    console.log(
      `  spacing base: ${tokens.spacing.base}px, type base: ${tokens.typography.baseRem}rem`
    );
    if (opts.minify) {
      const savings = preMinifySize - finalSize;
      const savingsPercent = (savings / preMinifySize * 100).toFixed(1);
      console.log(
        `  minification: saved ${(savings / 1024).toFixed(
          2
        )} kB (${savingsPercent}%)`
      );
    }
    if (opts.analyze) {
      generateSizeReport(sections, preMinifySize);
      generateOptimizationSuggestions(sections, includes, preMinifySize);
    }
  }
}
function generateSizeReport(sections, totalSize) {
  console.log("\n\u{1F4CA} Bundle Size Analysis:");
  console.log("=".repeat(50));
  const sortedSections = Object.entries(sections).sort(
    ([, a], [, b]) => b.size - a.size
  );
  for (const [name, data] of sortedSections) {
    const percentage = (data.size / totalSize * 100).toFixed(1);
    const kbSize = (data.size / 1024).toFixed(2);
    console.log(
      `${name.padEnd(20)} ${kbSize.padStart(8)} kB (${percentage.padStart(
        5
      )}%) - ${data.rules} rules`
    );
  }
  console.log("=".repeat(50));
  console.log(
    `Total Bundle Size      ${(totalSize / 1024).toFixed(2).padStart(8)} kB (100.0%)`
  );
  console.log("\n\u{1F3AF} Most Common Selectors by Section:");
  for (const [name, data] of sortedSections.slice(0, 5)) {
    if (data.selectors.length > 0) {
      console.log(`
${name}:`);
      const topSelectors = data.selectors.slice(0, 3);
      topSelectors.forEach((sel) => console.log(`  \u2022 ${sel}`));
      if (data.selectors.length > 3) {
        console.log(`  ... and ${data.selectors.length - 3} more`);
      }
    }
  }
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
        let preset;
        let report = false;
        let analyze = false;
        let optimize = false;
        for (let i = 0; i < rest.length; i++) {
          const a = rest[i];
          if (a === "--out") out = rest[++i];
          else if (a === "--minify") minify = true;
          else if (a === "--include-utils")
            include = (rest[++i] || "").split(",").filter(Boolean);
          else if (a === "--preset") preset = rest[++i];
          else if (a === "--report") report = true;
          else if (a === "--analyze") analyze = true;
          else if (a === "--optimize") optimize = true;
        }
        await cmdBuild(cwd, {
          out,
          minify,
          include,
          preset,
          report,
          analyze,
          optimize
        });
      }
      break;
    default:
      console.log("AutofuseCSS CLI");
      console.log("  Usage: autofusecss <init|build> [options]");
      console.log("    init [--ts]");
      console.log(
        "    build [--out <file>] [--minify] [--include-utils <list>] [--preset <compact|comfortable|spacious|dark>] [--report] [--analyze] [--optimize]"
      );
      console.log("");
      console.log("  Analysis flags:");
      console.log("    --report    Basic size and configuration report");
      console.log(
        "    --analyze   Detailed bundle analysis with section breakdown"
      );
      console.log(
        "    --optimize  Include optimization suggestions and recommendations"
      );
  }
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});

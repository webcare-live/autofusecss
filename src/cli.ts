#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  buildCssVariables,
  defaultTokens,
  type AutofuseTokens,
} from "./tokens.js";

function findPackageStyles(): string {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const stylesPath = path.resolve(dirname, "css", "styles.css");
  if (fs.existsSync(stylesPath)) return stylesPath;
  // Fallback when bundled layout differs
  const alt = path.resolve(dirname, "../src/css/styles.css");
  if (fs.existsSync(alt)) return alt;
  throw new Error("Cannot locate bundled styles.css");
}

async function loadConfig(
  cwd: string
): Promise<Partial<AutofuseTokens> | null> {
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

async function cmdInit(cwd: string, useTs: boolean) {
  const target = path.join(cwd, `autofusecss.config.${useTs ? "ts" : "mjs"}`);
  if (fs.existsSync(target)) {
    console.log("✔ autofusecss.config.mjs already exists");
    return;
  }
  const template = useTs
    ? `// AutofuseCSS config (TypeScript)\nimport { defineConfig, defaultTokens } from 'autofusecss';\n\nexport default defineConfig({\n  ...defaultTokens,\n});\n`
    : `// AutofuseCSS config (ESM)\nimport { defaultTokens } from 'autofusecss';\n\nexport default {\n  // Start from defaults and override what you need\n  ...defaultTokens,\n  // Example: change primary palette or spacing density\n  // colors: { ...defaultTokens.colors, primary: { ...defaultTokens.colors.primary, 500: '#2563eb' } },\n};\n`;
  fs.writeFileSync(target, template, "utf8");
  console.log("✔ Created autofusecss.config.mjs");
}

function extractSections(css: string, includes: Set<string> | null) {
  if (!includes || includes.size === 0) return css;
  const lines = css.split("\n");
  const out: string[] = [];
  let keep = false;
  for (const line of lines) {
    const m = line.match(/\/\*\s*@af:([a-z-]+)\s*\*\//i);
    if (m) keep = includes.has(m[1]);
    if (keep) out.push(line);
  }
  return out.join("\n");
}

function analyzeSections(
  css: string
): Record<string, { size: number; rules: number; selectors: string[] }> {
  const lines = css.split("\n");
  const sections: Record<
    string,
    { size: number; rules: number; selectors: string[] }
  > = {};
  let currentSection = "base";
  let sectionLines: string[] = [];

  for (const line of lines) {
    const m = line.match(/\/\*\s*@af:([a-z-]+)\s*\*\//i);
    if (m) {
      // Finalize previous section
      if (sectionLines.length > 0) {
        const sectionCss = sectionLines.join("\n");
        const selectors = extractSelectors(sectionCss);
        sections[currentSection] = {
          size: Buffer.byteLength(sectionCss, "utf8"),
          rules: countRules(sectionCss),
          selectors,
        };
      }
      // Start new section
      currentSection = m[1];
      sectionLines = [];
    }
    sectionLines.push(line);
  }

  // Handle final section
  if (sectionLines.length > 0) {
    const sectionCss = sectionLines.join("\n");
    const selectors = extractSelectors(sectionCss);
    sections[currentSection] = {
      size: Buffer.byteLength(sectionCss, "utf8"),
      rules: countRules(sectionCss),
      selectors,
    };
  }

  return sections;
}

function extractSelectors(css: string): string[] {
  const selectors: string[] = [];
  const rules: string[] = css.match(/[^{}]+\s*\{[^}]*\}/g) || [];

  for (const rule of rules) {
    const parts = rule.split("{");
    const selectorPart = parts[0]?.trim();
    if (
      selectorPart &&
      !selectorPart.startsWith("/*") &&
      !selectorPart.startsWith("*/")
    ) {
      // Split multiple selectors and clean them
      const multiSelectors = selectorPart
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      selectors.push(...multiSelectors);
    }
  }

  return selectors;
}

function countRules(css: string): number {
  const rules: string[] = css.match(/[^{}]+\s*\{[^}]*\}/g) || [];
  return rules.filter((rule) => {
    const parts = rule.split("{");
    const selectorPart = parts[0]?.trim();
    return (
      selectorPart &&
      !selectorPart.startsWith("/*") &&
      !selectorPart.startsWith("*/")
    );
  }).length;
}

function generateOptimizationSuggestions(
  sections: Record<
    string,
    { size: number; rules: number; selectors: string[] }
  >,
  includes: Set<string> | null,
  totalSize: number
) {
  console.log("\n� Optimization Suggestions:");
  console.log("=".repeat(50));

  const sectionSizes = Object.entries(sections).sort(
    ([, a], [, b]) => b.size - a.size
  );
  const largestSections = sectionSizes.slice(0, 3);

  // Suggest selective builds if no includes specified
  if (!includes || includes.size === 0) {
    console.log("💡 Use selective builds to reduce bundle size:");
    console.log(
      "   autofusecss build --include-utils typography,spacing,colors --minify"
    );

    // Calculate potential savings
    const coreSize =
      (sections.typography?.size || 0) +
      (sections.spacing?.size || 0) +
      (sections.colors?.size || 0);
    const coreSavings = totalSize - coreSize;
    console.log(
      `   Potential core-only build: ${(coreSize / 1024).toFixed(
        2
      )} kB (saves ${(coreSavings / 1024).toFixed(2)} kB)`
    );
  }

  // Minification suggestion
  console.log("\n📦 Build optimizations:");
  console.log("   • Add --minify flag (saves ~20-30% size)");
  console.log("   • Use compact preset for smaller spacing (--preset compact)");
  console.log("   • Consider purging unused CSS in production builds");

  // Section-specific suggestions
  console.log("\n📊 Section recommendations:");
  for (const [name, data] of largestSections) {
    const percentage = ((data.size / totalSize) * 100).toFixed(1);
    if (data.size > 2048) {
      // > 2KB
      console.log(
        `   • ${name} (${percentage}%): Consider selective inclusion if not all utilities needed`
      );
    }
  }

  // Available sections
  const availableSections = Object.keys(sections).filter((s) => s !== "base");
  if (availableSections.length > 0) {
    console.log("\n📋 Available sections for selective builds:");
    console.log(`   ${availableSections.join(", ")}`);
  }
}

function minifyCss(css: string) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .trim();
}

type BuildOpts = {
  out?: string;
  minify?: boolean;
  include?: string[];
  preset?: string;
  report?: boolean;
  analyze?: boolean;
  optimize?: boolean;
};

function applyPreset(tokens: AutofuseTokens, preset?: string): AutofuseTokens {
  if (!preset) return tokens;
  const t = JSON.parse(JSON.stringify(tokens)) as AutofuseTokens;
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
      // no token changes; projects use data-theme=dark; keep preset for report
      break;
  }
  return t;
}

async function cmdBuild(cwd: string, opts: BuildOpts) {
  const cfg = await loadConfig(cwd);
  let tokens = { ...defaultTokens, ...(cfg || {}) } as AutofuseTokens;
  tokens = applyPreset(tokens, opts.preset);
  const cssVars = buildCssVariables(tokens).css;
  let baseCss = fs.readFileSync(findPackageStyles(), "utf8");

  let includes: Set<string> | null = null;
  if (opts.include && opts.include.length) {
    includes = new Set(opts.include);
    baseCss = extractSections(baseCss, includes);
  }

  let out = `${cssVars}\n${baseCss}`;

  // Pre-minification analysis for optimization suggestions
  const preMinifySize = Buffer.byteLength(out, "utf8");
  const sections = analyzeSections(out);

  if (opts.minify) out = minifyCss(out);

  const outPath = path.join(cwd, opts.out || "autofuse.css");
  fs.writeFileSync(outPath, out, "utf8");
  console.log(`✔ Wrote ${outPath}`);

  if (opts.report || opts.analyze) {
    const finalSize = Buffer.byteLength(out, "utf8");
    const lines = out.split("\n").length;

    console.log(`\n📋 Build Report:`);
    console.log(`  preset: ${opts.preset || "none"}`);
    console.log(`  size: ${(finalSize / 1024).toFixed(2)} kB, lines: ${lines}`);
    console.log(
      `  spacing base: ${tokens.spacing.base}px, type base: ${tokens.typography.baseRem}rem`
    );

    if (opts.minify) {
      const savings = preMinifySize - finalSize;
      const savingsPercent = ((savings / preMinifySize) * 100).toFixed(1);
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

function generateSizeReport(
  sections: Record<
    string,
    { size: number; rules: number; selectors: string[] }
  >,
  totalSize: number
) {
  console.log("\n📊 Bundle Size Analysis:");
  console.log("=".repeat(50));

  const sortedSections = Object.entries(sections).sort(
    ([, a], [, b]) => b.size - a.size
  );

  for (const [name, data] of sortedSections) {
    const percentage = ((data.size / totalSize) * 100).toFixed(1);
    const kbSize = (data.size / 1024).toFixed(2);
    console.log(
      `${name.padEnd(20)} ${kbSize.padStart(8)} kB (${percentage.padStart(
        5
      )}%) - ${data.rules} rules`
    );
  }

  console.log("=".repeat(50));
  console.log(
    `Total Bundle Size      ${(totalSize / 1024)
      .toFixed(2)
      .padStart(8)} kB (100.0%)`
  );

  // Top selectors by section
  console.log("\n🎯 Most Common Selectors by Section:");
  for (const [name, data] of sortedSections.slice(0, 5)) {
    if (data.selectors.length > 0) {
      console.log(`\n${name}:`);
      const topSelectors = data.selectors.slice(0, 3);
      topSelectors.forEach((sel) => console.log(`  • ${sel}`));
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
        let out: string | undefined;
        let minify = false;
        let include: string[] = [];
        let preset: string | undefined;
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
          optimize,
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

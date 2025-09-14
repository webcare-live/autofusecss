AutofuseCSS CLI Spec

Commands

01. init
- Purpose: Scaffold a project config file.
- Usage:
  - `autofusecss init` → creates `autofusecss.config.mjs` (ESM)
  - `autofusecss init --ts` → creates `autofusecss.config.ts` with `defineConfig()`

02. build
- Purpose: Generate a single CSS file with variables + selected utility sections.
- Usage:
  - `autofusecss build` → writes `./autofuse.css`
  - Flags:
    - `--out <file>`: Output path (default `autofuse.css`).
    - `--minify`: Minify CSS (whitespace/comment stripping).
    - `--include-utils <list>`: Comma-separated sections. Recognized markers:
      - container, stack, spacing, typography, colors, density, ring, border, opacity, z, aspect
      - example: `--include-utils spacing,typography,colors`

Implementation Notes
- Base CSS includes markers `/* @af:<section> */` for section selection.
- Minifier is conservative (strip comments and condense whitespace) to avoid changing semantics.
- Config loader supports `.mjs` and `.js`; TypeScript config (`--ts`) is authored but not executed at runtime by CLI.


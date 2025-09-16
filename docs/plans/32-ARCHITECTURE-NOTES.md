Architecture Notes — Scalability and Maintainability

Layers
- Core tokens (src/tokens.ts): Types + defaults + CSS variable builder.
- React runtime (src/react/*): Provider + context + ThemeStudio.
- Tailwind plugin (src/tailwind/index.ts): utilities and recipes from tokens.
- CLI (src/cli.ts): config discovery, CSS build, analysis.
- Optional tokens server (server/tokens-server.ts): persistence + WS.

Principles
- Single source of truth: tokens → all outputs.
- Minimal runtime: everything compiles to CSS variables; minimal JS.
- Extensibility: tokens.modes (dark/HC/brand) + data attributes (theme/density).
- Isolation: `af-` namespace and optional `@layer` (planned) to prevent collisions.
- Testability: smoke tests for builder and plugin; size checks in CI.

Performance
- Fluid clamp computed once; not per-element.
- Selective build sections (
  e.g., include `typography,spacing,colors,masks`)
- Minify option; future gzip-size check in CI.

Accessibility
- Contrast checker and AAA auto-fix in Studio.
- Focus ring and keyboard styles in base.
- Planned axe-ci against docs pages.

Roadmap pointers
- See 30-ROADMAP.md for phased deliverables.


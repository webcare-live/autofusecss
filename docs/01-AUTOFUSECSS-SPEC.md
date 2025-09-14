# AutofuseCSS — React-First Design System Utilities (Phase 15)

Version: 0.1 (planning)

Authoring context: Math Learning Platform monorepo

Goal: Build a React-friendly CSS framework inspired by Automatic.css (WordPress) that ships as a reusable npm module usable in any React/Next.js app, integrates cleanly with Tailwind or standalone, and aligns with our platform’s design tokens and performance standards.

01. Objectives

- Parity with core Automatic.css concepts: design tokens, fluid scales, utilities, responsive variants, theming.
- React-first: a Provider to mount theme tokens, SSR/CSR safe, minimal runtime.
- Works three ways: (1) drop-in stylesheet utility classes, (2) Tailwind plugin to inject tokens, (3) CSS-in-TS export of tokens for custom styling.
- Strong a11y defaults, Romanian locale nuances supported (e.g., number formatting irrelevant to CSS but documented for components).
- Build performance: small initial CSS with tree-shakable utilities; keep CLS low via fluid clamps.

02. Package Name & Handles

- npm: `autofusecss` (claimed via placeholder package — see publish checklist).
- GitHub: org/repo `autofusecss` (create when ready; mirror planning docs and issues).

03. Deliverables

- `packages/autofusecss` with:
  - Core CSS: tokens + base utilities, fluid typography/spacing using `clamp()`.
- React Provider: sets CSS variables for theme + density, supports dark mode via `data-theme`.
- Tailwind plugin: injects tokens into `theme.extend` and generates typed utilities.
- CLI (later milestone): `autofusecss init/build` to generate a project-local stylesheet from config.
  - CLI (scaffolded now): `autofusecss init` creates `autofusecss.config.mjs`; `autofusecss build` emits `autofuse.css` with variables + base utilities.
  - Documentation site (later phase) with live playground.

04. Architecture

- Source structure:
  - `src/tokens.ts`: canonical tokens schema + defaults.
  - `src/css/base.css`: minimal reset + variables + a tiny utility layer prefixed `af-`.
  - `src/react/Provider.tsx`: mounts tokens to DOM via CSS variables; merges overrides.
  - `src/tailwind/index.ts`: Tailwind plugin that maps tokens to theme and utilities.
  - `src/index.ts`: public API surface.

05. Token Model (extensible)

- Color: semantic roles (`primary`, `secondary`, `neutral`, `accent`, `success`, `warning`, `danger`) with light/dark variants.
- Typography: font families, scale ratios, line-height presets, fluid size scale (xs–7xl) via clamp.
- Spacing: modular scale (0–20) using fluid clamp; negative spacing supported in utilities.
- Radius: `none` to `full`, defaults aligned with Tailwind radii.
- Shadows: `sm` to `xl`, with focus ring variables.
- Breakpoints: `xs, sm, md, lg, xl, 2xl` (configurable).
- Density: `comfortable | compact` toggles padding/margins via data attribute.

06. Fluid Scales (clamp)

- Typography example: `clamp(minRem, calc(vwFactor), maxRem)` computed from config and breakpoints.
- Spacing example: `--af-space-4: clamp(0.75rem, 0.5rem + 0.5vw, 1rem);` (calculated). Initial version ships with sane defaults.

07. Utilities (initial set)

- Spacing: `af-m-*`, `af-p-*`, `af-mx-*`, `af-my-*` (maps to spacing tokens).
- Layout: `af-container`, `af-stack-*` (vertical rhythm), `af-grid-*` presets.
- Typography: `af-text-*` size classes, `af-leading-*`, `af-font-*` families.
- Display: `af-flex`, `af-inline-flex`, `af-grid`, `af-hidden` etc. (small curated subset to avoid overlap with Tailwind when used together).
- Color helpers: `af-bg-primary`, `af-text-muted` mapping to semantic tokens.

08. Variants

- Responsive: `xs:`, `sm:`, `md:`, `lg:`, `xl:`, `2xl:` based on config.
- State: `hover:`, `focus:`, `active:`, `disabled:` forwarded using standard CSS selectors.
- Theme: `[data-theme="dark"]` variables override; per-scope themes supported by applying the attribute on a subtree.

09. Tailwind Integration

- Plugin injects tokens into `theme.extend.colors`, `fontSize`, `spacing`, `borderRadius`, `boxShadow`.
- Optional `@layer utilities` output with `af-` class names for projects not wanting to use Tailwind’s own utility names but still benefit from its JIT pruning.

10. React Provider

- `<AutofuseProvider tokens={overrides} theme="dark" density="compact">` applies variables on a wrapper element.
- SSR-friendly: renders an inline `<style>` with resolved variables to avoid FOUC, then hydrates on client.

11. Configuration File

- `autofusecss.config.ts` exports a typed object with tokens; referenced by CLI or imported by app code.
- Supports partial overrides (deep merge) and environment-specific presets.

12. Performance Strategy

- Ship tiny default CSS (~3–8KB gz) with on-demand utility generation via Tailwind plugin or future CLI.
- Minimize repaint on theme switch; variables live on container element; prefers-reduced-motion honored.

13. Accessibility Defaults

- Color contrast targets WCAG AA by default; palettes auto-adjustable in CLI.
- Focus ring variables consistent across components (`--af-ring`).

14. Testing & Validation

- Unit tests: token merging, clamp outputs, Tailwind plugin mapping.
- Visual regression (later): Storybook + Chromatic/Playwright.
- A11y lints for color contrast samples.

15. Package Publishing

- Placeholder publication flow (manual for now):
  1. `cd packages/autofusecss`
  2. `pnpm build`
  3. `npm publish --access public` (requires npm auth). Name appears available at planning time.

16. Incremental Milestones

- M1 (this phase): skeleton package with tokens, base.css, React Provider, Tailwind plugin, docs, examples.
- M2: CLI `autofusecss init/build` + per-project stylesheet generation, theme presets.
- M3: Docs site + playground, more utilities, patterns, and presets.

17. Adoption in Math Platform

- Add `@math-platform/web` integration using Tailwind plugin mode first (lowest friction).
- Replace ad‑hoc rhythm helpers with `af-stack-*` and `af-container` where appropriate.

18. Naming & Prefixing

- Class prefix: `af-` to avoid collisions.
- CSS variable prefix: `--af-*`.

19. Security & Governance

- No remote code execution; CLI reads local config only.
- Semantic versioning; breaking changes documented.

20. Open Questions

- How much overlap with Tailwind utilities should we ship by default? (recommend minimal set initially)
- Do we add CSS Grid layout primitives as utilities or recipes only?

Appendix A — Example Config (TypeScript)

```ts
import { defineConfig } from "autofusecss";

export default defineConfig({
  colors: {
    primary: { 50: "#f1f8ff", 500: "#1d4ed8", 700: "#1e40af" },
    neutral: { 50: "#f8fafc", 900: "#0f172a" },
  },
  typography: { scale: 1.2, baseRem: 1, minViewport: 360, maxViewport: 1440 },
  spacing: { base: 4, steps: 20 },
});
```

Appendix B — Example Usage (React)

```tsx
import "autofusecss/styles.css";
import { AutofuseProvider } from "autofusecss/react";

export default function App({ children }) {
  return (
    <AutofuseProvider theme="light" density="comfortable">
      <div className="af-container af-stack-6">
        <h1 className="af-text-3xl af-text-primary-700">Salut!</h1>
        {children}
      </div>
    </AutofuseProvider>
  );
}
```

AutofuseCSS Docs Playground (Next.js) — Spec

01. Goals
- Interactive examples of tokens and utilities.
- Live theme/density toggles.
- Copy-paste snippets for Tailwind and stylesheet modes.

02. Location
- Standalone repo (preferred): webcare-live/autofusecss → `apps/docs` (Next.js).
- Or inside monorepo: `apps/autofusecss-docs` (excluded from turbo type-check by default).

03. Pages
- `/` Overview and quick start.
- `/tokens` Editable tokens (JSON/TS), generated variables preview.
- `/utilities` Interactive examples (spacing, stack, grid, color, typography).
- `/theming` Light/dark/high-contrast, density toggle.

04. Components
- TokenEditor, LivePreview, UtilityGrid, ThemeSwitch, DensitySwitch.

05. Integration
- Import `autofusecss/styles.css` globally.
- Add Tailwind plugin for demo app.

06. Testing
- Basic Playwright snapshots for main pages and theme toggles.


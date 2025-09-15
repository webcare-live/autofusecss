Phase P4 — Docs, Studio, QA

Objective
- Match ACSS docs depth (and exceed with live playgrounds), complete testing coverage, and accessibility validation.

Tasks
- Docs
  - [x] MDX site with sidebar/search/TOC/playground; utilities index auto-listing
  - [ ] Each utility category: code examples + interactive Playground
  - [ ] Pages: Buttons & Links, Cards, Forms, Layout patterns, Overlays
- Studio
  - [x] Presets, import wizard, per-shade diffs (ΔLCH), copy Tailwind config
  - [ ] Advanced palette designer (OKLCH/OKLAB), role harmonies, contrast dashboard
- Testing
  - [x] Vitest unit tests for tokens; Playwright baselines for core pages
  - [ ] Playwright: more utilities pages + Studio flows (save preset, import ACSS)
  - [ ] A11y checks (axe) for docs examples

Acceptance Criteria
- Docs cover all categories from screenshot with runnable snippets
- Visual snapshots stable across CI


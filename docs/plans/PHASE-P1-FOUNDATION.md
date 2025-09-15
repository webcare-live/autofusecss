Phase P1 — Utility Foundation (Parity Baseline)

Objective
- Deliver a minimal but complete utility set aligned with ACSS categories so developers can build end-to-end layouts.

Status legend: [ ] pending  [~] partial  [x] done

Tasks
- [x] Spacing: margin/padding axes/sides, negative, gap, stack rhythm
- [x] Typography: fluid sizes xs..7xl; TODO leading, families, weight helpers
- [x] Colors: semantic roles + shades; dark/hc; React variables
- [x] Display & Visibility: block/inline-block/grid/flex + hidden/visible/invisible; sr-only
- [x] Borders & Dividers: border sides + width; semantic border colors; divide-x/y (+ color)
- [x] Position & Z-Index: relative/absolute/fixed/sticky + curated z-index scale
- [x] Radius & Shadows: tokenized rounded + shadow utilities
- [x] Layout: container, grid cols 1..12, col-span utilities
- [~] Backgrounds: overlay helpers, gradients (basic) — expand gradient API
- [~] Shadow & Filters: shadows done, filters pending
- [ ] Dimension: width/height/min/max helpers
- [ ] Columns (CSS Columns): multi-column text helpers
- [ ] Masks: more masks and parameters

Acceptance Criteria
- All above ship via Tailwind plugin and baseline stylesheet
- Documented in docs/utilities/* with examples + Playground snippets

Docs to touch
- docs/utilities/*.md (Backgrounds, Shadow & Filters, Dimension, Columns, Masks)


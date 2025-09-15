AutofuseCSS Documentation Structure

Purpose: Recreate (and improve) the Automatic.css docs for a React + Node.js stack. This mirrors the categories in your screenshot and maps them to AutofuseCSS features.

Primary sections

1) Getting Started
- Overview: What is AutofuseCSS?
- Installation: npm, CLI, Tailwind plugin
- Quick Start: Provider + first utilities
- Configuration: `autofusecss.config.(mjs|ts)`
- Terminology: tokens, utilities, variants

2) Core Concepts
- Design Tokens: colors, typography, spacing, radius, shadows, breakpoints
- Fluid Scales: how clamp() is computed
- Theming: light, dark, high‑contrast + per‑scope themes
- Provider: SSR/CSR safety and data attributes
- Tailwind Integration: using the plugin and pruning utilities

3) Utilities (full index)
- Accessibility
- Backgrounds
- Borders & Dividers
- Builder Configuration
- Buttons & Links
- Cards
- Colors
- Columns
- Dimension
- Display & Visibility
- Elements
- Flexbox
- Forms
- Functions
- Grids
- Icons
- Layout
- Masks
- Mixins
- Overlays
- Platforms
- Position & Z‑Index
- Recipes
- Shadow & Filters
- Spacing
- Textures & Overlays
- Typography
- Workflow Enhancements

4) Guides
- Patterns: common layouts, rhythm, grids
- Theming Guide: live editing with Studio
- Migration: from Automatic.css/Tailwind‑only
- Performance: JIT, pruning, and CSS size

5) Reference
- API: React Provider + hooks
- CLI: init/build options
- Tailwind Plugin: exposed theme keys and utilities

File mapping

- docs/getting-started/*.md
- docs/concepts/*.md
- docs/utilities/*.md (one file per category above)
- docs/guides/*.md
- docs/reference/*.md
- docs/plans/* (roadmap, checklists, site plan)
- docs/implemented/* (what’s shipped + file map)

Next step: populate docs/utilities with stubs and checklists (added in this change).

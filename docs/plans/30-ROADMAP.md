AutofuseCSS Roadmap and Phases

Goal: a modern, scalable, accessible CSS utility system with live tokens, Tailwind integration, and strong docs.

Phase 1 — Core polish (ready)
- Tokens → CSS variables builder (light/dark/HC)
- React Provider + ThemeStudio (palette, type, spacing, radius, shadows)
- Tailwind plugin utilities (spacing, text, grid/flex, borders/dividers, masks, filters, overlays, dimensions)
- CLI build with selective sections and analysis

Phase 2 — Typography & sizing (this PR)
- Font utilities: af-font-*, weights
- Line-height: af-leading-*
- Black/white helpers: af-text-white / af-text-black
- Numeric width/height based on spacing scale (.af-w-16 etc.)
- Studio: room-aware load/save/clone + “derive dark/HC” helpers

Phase 3 — Advanced utilities
- Logical properties (inline/start/end) aliases
- Container queries (where available) for responsive patterns
- Motion system: prefers-reduced-motion, animation tokens and utilities
- Data-* driven theming per scope (nested providers with CSS layers)

Phase 4 — Accessibility & audits
- Color contrast enforcement and auto-fixes across recipes
- Focus ring and outline consistency across components
- Docs checklists and automated axe run on examples

Phase 5 — Performance and DX
- @layer strategy and namespacing for conflict-free integration
- More granular sections for selective builds
- CSS size budget checker in CLI
- Tailwind 4 compatibility layer

Phase 6 — Recipes and components
- Buttons, inputs, tables, cards, overlays, layouts
- Form states and validation styles
- Example gallery with playgrounds and code tabs

Phase 7 — Multi-tenant theming
- Tokens server adapters (filesystem, Redis, Postgres)
- Scoped theming per tenant with SSR hydration helpers

Phase 8 — Tooling & CI
- Snapshot tests for generated CSS (size + rules)
- Visual regression on docs (Playwright)


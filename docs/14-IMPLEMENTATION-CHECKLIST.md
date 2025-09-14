AutofuseCSS Implementation Checklist (Advanced)

Core
- [x] Tokens → CSS variables builder (light/dark/hc)
- [x] React Provider + runtime context/hook
- [x] ThemeStudio (palette, radius, shadows, export)
  - [x] Import JSON, WS receive updates, contrast checker, auto shade generation
- [x] Tailwind plugin (spacing, stack, grid, flex, text, colors, radius, shadows, ring)
- [x] Utilities expanded: borders, dividers, display/visibility, opacity, position/z-index

Docs Site
- [x] Next.js app scaffold with MDX rendering
- [x] Dynamic doc route wired to `docs/`
- [x] Utilities index auto-listing
- [x] Studio page (client) under `/studio`
- [x] Minimal API route `/api/tokens` for persistence
  - [x] Sidebar nav
  - [x] MDX components: Callout, CodeTabs, Playground
  - [ ] Client-side search (filename filter)

Servers
- [x] Standalone tokens server (Express + ws)
- [ ] Live subscribe in Studio (WebSocket)
  - [x] Implement WS receive; optional standalone server

Next Up
- [ ] Add more utility categories (forms, elements, columns, overlays, masks)
  - [x] Initial forms/elements/overlays recipes in base CSS
- [ ] Recipes: buttons, cards, inputs, layout blocks
  - [x] Initial CSS added: `.af-btn`, `.af-card`, `.af-input`, `.af-chip`
- [ ] Docs site search + sidebar nav
- [ ] MDX components for callouts, code tabs, and playground embeds
- [ ] Color contrast checker in Studio
- [ ] Import JSON/ACSS config

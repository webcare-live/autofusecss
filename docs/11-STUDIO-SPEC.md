Autofuse Studio — Live Token Editor (UI Spec)

Goal
- Allow designers and devs to customize tokens (colors, spacing, typography, radius, shadows) from a React UI and preview changes immediately. Export changes to `autofusecss.config.(mjs|ts)` and/or persist via a Node API.

Architecture
- React UI embedded in docs site using `<AutofuseProvider>`.
- Uses `useAutofuse()` hook to update tokens live (implemented).
- Node service exposes `GET/PUT /api/tokens` + WebSocket `tokens:update` for collaborative editing.

Core UI
- Theme Mode: light | dark | high‑contrast
- Density: comfortable | compact
- Colors: semantic roles → shades (50..900); color pickers + contrast readouts
- Typography: baseRem, scale ratio, min/max viewport; preview headings and paragraphs
- Spacing: base step (px), steps count; preview stack and grid gaps
- Radius & Shadows: presets with preview cards
- Live updates: WebSocket connect field; applies external `tokens:update`
 - Broadcast: Studio sends `tokens:update` on local edits for multi-client sync (implemented)

Export & Persistence
- Export button: downloads `autofusecss.config.mjs` with current tokens (implemented)
- Import JSON: upload tokens JSON to merge (implemented)
- Save button (if API enabled): `PUT /api/tokens` (implemented)
- WebSocket connect: `ws://localhost:4001` by default; listens to `tokens:update` (implemented)
 - Broadcast on edit to WS server (implemented)

Developer API
- `useAutofuse()` returns `{ tokens, setTokens, theme, setTheme, density, setDensity }`
- `buildCssVariables(tokens)` returns `{ css, sizes, space }` for low‑level use

MVP Scope
- Implement Colors (primary/neutral key shades), Typography scale, Spacing base, Theme + Density (done)
- Radius & Shadows editors (done)
- Export/Import JSON (done)
- WS receive (done)
- Contrast checker cards (done)

Stretch
- Palette generation (auto‑tint/shade), contrast validator, import from JSON, shareable links

Colors

Concepts
- Semantic palettes: primary, neutral, success, warning, danger, etc.
- Shades: 50..900 per role.
- Variables: `--af-color-{role}-{shade}`

Utilities
- Text: `.af-text-{role}-{shade}` (done)
- Background: `.af-bg-{role}-{shade}` (done)

Theming
- `[data-theme="dark"]` and `[data-theme="hc"]` override variables (done)

Tailwind mapping
- Plugin exposes `theme.extend.colors` with the same roles and shades.


# Surface System — Theme-Aware UI Tokens

AutofuseCSS exposes a small set of UI variables derived from your color tokens. They guarantee readable contrast in both light and dark modes and give you a consistent vocabulary for building surfaces.

## Variables

- `--af-text`: default text color
- `--af-bg-page`: page background (outer shell)
- `--af-surface`: card/sheet background
- `--af-surface-soft`: elevated/glass surface
- `--af-border`: low‑contrast border color

These are emitted by the Provider at runtime based on your tokens. In dark mode the values are computed from `modes.dark.neutral` so text and surfaces remain readable.

## Usage

```html
<div class="af-card" style="color: var(--af-text); background: var(--af-surface); border: 1px solid var(--af-border)">
  Content
</div>
```

The framework classes already map to these variables:

- `.af-main-content`, `.af-sidebar-content`, `.af-theme-studio` use `--af-surface`/`--af-surface-soft` and `--af-border`.
- Form controls (`.af-input`, `.af-select`, `.af-textarea`) inherit text color and use surface + border tokens.

## Mapping to tokens

- Light theme uses `colors.neutral` for text/background/border.
- Dark theme uses `modes.dark.neutral` (with sensible fallbacks) for the same roles.

## Principles (inspired by Automatic.css)

- Fluid scales: typography and spacing are generated with `clamp()` from your tokens.
- Semantic roles: UI surfaces and text derive from palette roles; you don’t hardcode rgb values.
- Accessibility: default contrast meets AA on surfaces; Studio includes contrast checks and auto‑fix suggestions.
- Maintainability: changing your palette or switching themes updates the entire UI consistently.


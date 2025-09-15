Recipes — Buttons, Inputs, Cards (Tokenized)

Goal
- Provide composable recipes that use semantic color tokens and adapt to theme changes.

Implementation (Tailwind Plugin)
- `.af-btn` base style
- `.af-btn-{role}` sets background to `--af-color-{role}-500`, white text, hover brightness
- `.af-btn-{role}-outline` transparent bg, tokenized border/text colors with hover brightness
- Size variants: `.af-btn-sm`, `.af-btn-lg`
- States: `.af-btn-disabled`, `:active` brightness, `:focus-visible` ring (`--af-ring`)
- Ghost & Subtle: `.af-btn-ghost-{role}`, `.af-btn-subtle-{role}`
- Destructive aliases: `.af-btn-destructive`, `.af-btn-destructive-outline`
- `.af-card` neutral border, radius, padding, shadow
- `.af-input` tokenized border, radius, padding, focus ring
- Input states: `.af-input-success|warn|error`; disabled styles
- Form groups: `.af-form-row`, `.af-form-col-2|3`, select/textarea/checkbox/radio recipes

Files
- `src/tailwind/index.ts` — emits utility classes above
- `src/css/styles.css` — mirrors minimal recipes for stylesheet‑only mode

Next
- Disabled/active states, focus-visible styles for buttons
- Size variants (sm, md, lg) via CSS variables or utility combos
- Semantic input states (error/warn/success) tied to tokens

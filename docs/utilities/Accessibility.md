Accessibility

Scope
- Focus styles, screen-reader utilities, motion/contrast preferences.

Utilities and variants
- `.af-focus-ring` — consistent focus outline.
- `.af-sr-only` / `.af-not-sr-only` — visually hide or reveal to screen readers.
- Motion:
  - Variants: `motion-safe:` and `motion-reduce:`
  - Utilities: `.af-animate-none|spin|pulse`, `.af-transition-none|base`
- Contrast preferences:
  - Variants: `contrast-more:` and `contrast-less:` (where supported)
  - High‑contrast systems: `forced-colors:` matches Windows High Contrast

Examples
```html
<button class="af-btn motion-reduce:af-animate-none motion-safe:af-animate-pulse">
  Loading
</button>

<div class="forced-colors:af-border af-border">
  High‑contrast borders on forced-colors systems
</div>

<p class="contrast-more:af-text-black contrast-less:af-text-neutral-700">
  Adjusted text contrast based on user preference
</p>
```

Live Playground

<Playground>
{`
<div class="af-stack-3">
  <button class="af-btn motion-safe:af-animate-pulse motion-reduce:af-animate-none">Motion aware</button>
  <div class="af-card forced-colors:af-border" style="border-color: CanvasText">Forced colors outline</div>
  <p class="contrast-more:af-text-black contrast-less:af-text-neutral-700">Prefers-contrast demo</p>
</div>
`}
</Playground>

Notes
- Prefer semantic HTML and aria-* attributes; utilities complement, not replace.

Logical Properties

Why
- RTL and internationalization require spacing utilities that adapt to writing direction.

Utilities
- Inline (left/right aware):
  - Margin: `.af-m-inline-N`
  - Padding: `.af-p-inline-N`
  - Start/End shorthands: `.af-ms-N`, `.af-me-N`, `.af-ps-N`, `.af-pe-N`
- Block (top/bottom aware):
  - Margin: `.af-m-block-N`
  - Padding: `.af-p-block-N`
- Negative margins supported for start/end and inline: `.-af-ms-N`, `.-af-me-N`, `.-af-m-inline-N`

Notes
- N maps to the spacing scale: `var(--af-space-N)` and scales fluidly.
- Combine with responsive or container-query variants as needed.

Examples
```html
<div class="af-ms-4 af-me-2">Start/End spacing that flips in RTL</div>
<div class="af-m-inline-6">Inline margin both sides</div>
<div class="af-p-block-4">Block padding top and bottom</div>
```

RTL Live Example

<Playground>
{`
<div dir="ltr" class="af-stack-2">
  <div class="af-card af-ms-6 af-ps-4">LTR start margin/padding</div>
  <div dir="rtl" class="af-card af-ms-6 af-ps-4">RTL start margin/padding (flips)</div>
  <div class="af-card af-m-inline-4">Inline margins both sides (dir-aware)</div>
</div>
`}
</Playground>

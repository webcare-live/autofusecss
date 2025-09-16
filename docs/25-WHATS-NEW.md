What's New in AutofuseCSS

Highlights
- Logical properties: RTL-aware spacing (`af-ms-*`, `af-m-inline-*`, etc.).
- Container queries: `af-cq`, `cq-*` variants (including named containers).
- Motion/Contrast: `motion-safe|reduce`, `contrast-more|less`, `forced-colors`.
- CLI: `autofusecss build` now wraps utilities in `@layer autofuse` by default. Use `--layer none` to disable or `--layer <name>` to customize.

Container Queries (Playground)

<Playground>
{`
<section class="af-cq af-card af-stack-4">
  <div class="af-grid cq-xs:af-grid-cols-1 cq-sm:af-grid-cols-2 cq-lg:af-grid-cols-3 af-gap-4">
    <div class="af-card">A</div>
    <div class="af-card">B</div>
    <div class="af-card">C</div>
  </div>
</section>
`}
</Playground>

RTL Logical Properties (Playground)

<Playground>
{`
<div class="af-stack-2">
  <div dir="ltr" class="af-card af-ms-6 af-ps-4">LTR start margin/padding</div>
  <div dir="rtl" class="af-card af-ms-6 af-ps-4">RTL start margin/padding (flips)</div>
  <div class="af-card af-m-inline-4">Inline margins both sides (dir-aware)</div>
</div>
`}
</Playground>

Motion & Contrast (Playground)

<Playground>
{`
<div class="af-stack-3">
  <button class="af-btn motion-safe:af-animate-pulse motion-reduce:af-animate-none">Motion aware</button>
  <div class="af-card forced-colors:af-border" style="border-color: CanvasText">Forced colors outline</div>
  <p class="contrast-more:af-text-black contrast-less:af-text-neutral-700">Prefers-contrast demo</p>
</div>
`}
</Playground>


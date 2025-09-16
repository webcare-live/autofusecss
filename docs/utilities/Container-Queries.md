Container Queries

Enable container queries on any element so its children can adapt to the container’s width instead of the viewport.

Enable containers
- `.af-cq` — sets `container-type: inline-size`
- `.af-cq-content` — `container-type: inline-size; container-name: content`
- `.af-cq-layout` — named `layout`

Variants
- Unnamed: `cq-xs|sm|md|lg|xl` → `@container (min-width: 20|30|48|64|80rem)`
- Named `content`: `cq-content-xs|sm|md|lg|xl` → `@container content (min-width: …)`
- Named `layout`: `cq-layout-xs|sm|md|lg|xl`

Examples
```html
<section class="af-cq">
  <div class="af-grid cq-sm:af-grid-cols-2 cq-md:af-grid-cols-3 af-gap-4">
    ...
  </div>
</section>

<aside class="af-cq-content">
  <div class="cq-content-md:af-flex cq-content-lg:af-justify-between">
    ...
  </div>
</aside>
```

Live Playground

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

Notes
- Container queries require modern browsers; fallbacks remain usable.
- You can mix with regular responsive breakpoints where appropriate.

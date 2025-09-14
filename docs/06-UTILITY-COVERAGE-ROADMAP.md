AutofuseCSS Utility Coverage Roadmap

01. Completed (M1)
- Spacing: m/p with sides/axes, negatives; gap.
- Stack rhythm: af-stack-0..20.
- Typography: af-text-xs..7xl (fluid).
- Colors: af-text-{role}-{shade}, af-bg-{role}-{shade}.
- Layout: container sizes (sm/md/lg), flex/grid basics, grid-cols-1..12, col-span-1..12.
- Radius/Shadows: af-rounded-*, af-shadow-*.
- Ring: af-ring.
- Density variants: density-compact: ; Theme variants: theme-dark:, theme-hc:.

02. Next (M2)
- Borders: color utilities per semantic roles + border-sides.
- Opacity: 0,5,10..100 steps.
- Z-index: scale 0..1000 (curated set: 0,10,20,30,40,50,100,1000).
- Aspect: more presets (2/1, 4/3, 21/9).
- Container presets: content, readable, wide, full-bleed helpers.
- Recipes: card, button, chip, input layout without opinions (composition-friendly).

03. Later (M3)
- Grid recipes, stack/gap combinators, responsive stacks (xs:af-stack-2 etc.).
- Motion (prefers-reduced-motion honored), utility classes for transition patterns.
- A11y helpers: focus-visible variants, reduced motion toggles, SR-only utilities.

Notes
- All utilities prefixed `af-` to avoid collisions.
- Tailwind plugin emits utilities for JIT pruning; stylesheet provides a minimal baseline.


Implemented — What’s in AutofuseCSS

Overview
- Tokens → CSS variables with fluid typography/spacing
- React Provider with SSR-safe inline style and configurable `anchorOffset`
- Tailwind plugin exposing tokens and curated utilities
- Base stylesheet with essential utilities and recipes
- Theme Studio with live tokens editing, presets, import wizard, OKLCH tools
- Docs site with MDX, sidebar, search, TOC, playground, visual tests
- Tokens WS server with rooms, auth, and history

Key Files
- Tokens: `src/tokens.ts`
- Provider: `src/react/Provider.tsx` (`anchorOffset` via `--af-anchor-offset`)
- Tailwind plugin: `src/tailwind/index.ts`
- Stylesheet: `src/css/styles.css`
- Studio: `src/react/theme-studio.tsx`, `src/react/acss-import.tsx`
- Docs app: `apps/docs/*` (components + routes)
- WS server: `server/tokens-server.ts`

Utilities (selected)
- Spacing: `.af-m-*, .af-p-*, .af-gap-*`, stack `.af-stack-*`
- Display/visibility: `.af-block|inline-block|hidden|visible|invisible`, sr-only
- Borders/dividers: sides, semantic colors, `.af-divide-x|y(-role-shade)`
- Typography sizes: `.af-text-xs..7xl`
- Flex/Grid basics: `.af-flex|grid`, `.af-grid-cols-1..12`, `.af-col-span-*`
- Position/Z: `.af-relative|absolute|fixed|sticky`, `.af-z-*`
- Recipes: `.af-btn(-sm|-lg|-disabled|-primary|-outline)`, `.af-card(-muted|-elevated)`, `.af-input(-success|-warn|-error)`

Integration
- Import `autofusecss/styles.css` and wrap app with `<AutofuseProvider>`
- Use Tailwind plugin `require('autofusecss/tailwind')`
- Configure heading offset with Provider `anchorOffset` if you have a fixed header


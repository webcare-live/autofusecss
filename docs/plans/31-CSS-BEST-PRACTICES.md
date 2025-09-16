Modern CSS Best Practices Applied in AutofuseCSS

Core guidelines
- Tokens-first: All design decisions flow through tokens → CSS variables.
- Fluid scales: clamp() for text and spacing across breakpoints.
- Semantic colors: roles (primary, neutral, danger…) not raw hex in markup.
- Progressive enhancement: utilities degrade gracefully; JS optional at runtime.

Recommended techniques (and how we use them)
- Cascade layers (@layer): ship utilities in a predictable layer to avoid specificity wars (planned for Phase 5).
- Color spaces: OKLCH/LAB for palette generation and deltas (supported via chroma.js in ThemeStudio).
- Logical properties: margin-inline, padding-block for better i18n (planned aliases).
- Container queries: prefer @container over rigid breakpoints for composable components (planned utilities/patterns).
- System fonts: default stacks with sans/serif/mono utilities to reduce FOIT.
- Reduced motion: respect prefers-reduced-motion for animations and transitions (planned).
- Media features: prefers-color-scheme, forced-colors/Windows HC consideration (HC mode supported via tokens; audits planned).
- Viewport units: dvh/svh/vi/vb where appropriate for mobile safe areas (planned helpers).
- Accessibility: focus states, contrast, hit areas; Token-level contrast reports and auto-fix (present in ThemeStudio; expanding across recipes).

Integration best practices
- Namespacing: prefix utilities with `af-` to coexist with Tailwind/other CSS.
- Selective builds: CLI flags to include only needed sections.
- Purge/treeshake: let app toolchain purge unused classes.
- SSR-safe Provider: inject variables inline to avoid FOUC.


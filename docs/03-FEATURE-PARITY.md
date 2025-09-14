Automatic.css → AutofuseCSS Parity Map

01. Design Tokens

- Automatic.css: Global color palette, font sizes, line heights, spacing.
- AutofuseCSS: Semantic palette, typography scale via clamp, spacing clamp, radius, shadows. Status: M1 parity, extensible.

02. Fluid Typography

- Automatic.css: Fluid type scales across breakpoints.
- AutofuseCSS: `--af-text-*` computed with clamp from config. Status: M1.

03. Fluid Spacing

- Automatic.css: Consistent spacing scale.
- AutofuseCSS: `--af-space-0..20` computed with clamp. Status: M1.

04. Utility Classes

- Automatic.css: Naming like `padding--m`, `margin--l` etc.
- AutofuseCSS: Prefixed `af-` utilities (subset in M1): spacing, container, stack, text sizes, colors. Status: M1 subset; expand in M2.

05. Breakpoints & Variants

- Automatic.css: Standard breakpoints and responsive variants.
- AutofuseCSS: xs..2xl with responsive variant prefixes in Tailwind mode; base utilities are mobile-first. Status: M1.

06. Theming

- Automatic.css: Light/dark presets.
- AutofuseCSS: `[data-theme]` overrides via Provider, sub-tree theming supported. Status: M1.

07. Integration

- Automatic.css: WordPress plugin builder.
- AutofuseCSS: React Provider + Tailwind plugin; CLI planned (M2) for config-driven stylesheet generation. Status: M1 partial, M2 full.

08. Accessibility

- Automatic.css: Sensible defaults.
- AutofuseCSS: WCAG AA color intent, focus ring variables; a11y docs planned. Status: M1 baseline, expand in M3.

09. Performance

- Automatic.css: Production-optimized CSS.
- AutofuseCSS: Small base CSS, Tailwind JIT pruning, variables for low repaint on theme switch. Status: M1.

10. Docs & Playground

- Automatic.css: Comprehensive docs.
- AutofuseCSS: Spec + plan in Phase 15; full docs site planned in M3.


import plugin from "tailwindcss/plugin";
import { defaultTokens, AutofuseTokens, buildCssVariables } from "../tokens.js";

export interface AutofuseTailwindOptions {
  tokens?: Partial<AutofuseTokens>;
}

export default function autofusePlugin(
  _opts: AutofuseTailwindOptions = {}
): any {
  const tokens = {
    ...defaultTokens,
    ...(_opts.tokens || {}),
  } as AutofuseTokens;

  return plugin(
    function ({ addBase, addUtilities, addVariant }) {
      // Base CSS variables using token values (colors + sizes + spacing)
      const rootColorVars: Record<string, string> = {};
      Object.entries(tokens.colors).forEach(([name, scale]) => {
        Object.entries(scale).forEach(([k, v]) => {
          rootColorVars[`--af-color-${name}-${k}`] = String(v);
        });
      });

      const built = buildCssVariables(tokens);
      const sizeVars: Record<string, string> = {};
      Object.entries(built.sizes).forEach(([k, v]) => {
        sizeVars[`--af-text-${k}`] = v;
      });
      const spaceVars: Record<string, string> = {};
      Object.entries(built.space).forEach(([k, v]) => {
        spaceVars[`--af-space-${k}`] = v;
      });

      addBase({
        ":root": { ...rootColorVars, ...sizeVars, ...spaceVars },
      });

      // Variants for theme and density
      addVariant("theme-dark", "[data-theme=dark] &");
      addVariant("density-compact", "[data-density=compact] &");
      addVariant("theme-hc", "[data-theme=hc] &");

      // Utilities: spacing (m/p + axis/sides)
      const spacingUtils: Record<string, any> = {};
      for (let i = 0; i <= tokens.spacing.steps; i++) {
        const v = `var(--af-space-${i})`;
        spacingUtils[`.af-m-${i}`] = { margin: v };
        spacingUtils[`.af-mx-${i}`] = { marginLeft: v, marginRight: v };
        spacingUtils[`.af-my-${i}`] = { marginTop: v, marginBottom: v };
        spacingUtils[`.af-mt-${i}`] = { marginTop: v };
        spacingUtils[`.af-mr-${i}`] = { marginRight: v };
        spacingUtils[`.af-mb-${i}`] = { marginBottom: v };
        spacingUtils[`.af-ml-${i}`] = { marginLeft: v };
        spacingUtils[`.af-p-${i}`] = { padding: v };
        spacingUtils[`.af-px-${i}`] = { paddingLeft: v, paddingRight: v };
        spacingUtils[`.af-py-${i}`] = { paddingTop: v, paddingBottom: v };
        spacingUtils[`.af-pt-${i}`] = { paddingTop: v };
        spacingUtils[`.af-pr-${i}`] = { paddingRight: v };
        spacingUtils[`.af-pb-${i}`] = { paddingBottom: v };
        spacingUtils[`.af-pl-${i}`] = { paddingLeft: v };
        // negative margins
        if (i > 0) {
          const nv = `calc(${v} * -1)`;
          spacingUtils[`.\-af-m-${i}`] = { margin: nv };
          spacingUtils[`.\-af-mx-${i}`] = { marginLeft: nv, marginRight: nv };
          spacingUtils[`.\-af-my-${i}`] = { marginTop: nv, marginBottom: nv };
          spacingUtils[`.\-af-mt-${i}`] = { marginTop: nv };
          spacingUtils[`.\-af-mr-${i}`] = { marginRight: nv };
          spacingUtils[`.\-af-mb-${i}`] = { marginBottom: nv };
          spacingUtils[`.\-af-ml-${i}`] = { marginLeft: nv };
        }
      }
      addUtilities(spacingUtils);

      // Utilities: gap
      const gapUtils: Record<string, any> = {};
      for (let i = 0; i <= tokens.spacing.steps; i++) {
        const v = `var(--af-space-${i})`;
        gapUtils[`.af-gap-${i}`] = { gap: v };
        gapUtils[`.af-gap-x-${i}`] = { columnGap: v };
        gapUtils[`.af-gap-y-${i}`] = { rowGap: v };
      }
      addUtilities(gapUtils);

      // Utilities: stack rhythm
      const stackUtils: Record<string, any> = {};
      for (let i = 0; i <= tokens.spacing.steps; i++) {
        const v = `var(--af-space-${i})`;
        stackUtils[`.af-stack-${i} > * + *`] = { marginTop: v } as any;
      }
      addUtilities(stackUtils);

      // Utilities: display & flex/grid basics
      addUtilities({
        [`.af-block`]: { display: 'block' },
        [`.af-inline-block`]: { display: 'inline-block' },
        [`.af-flex`]: { display: 'flex' },
        [`.af-inline-flex`]: { display: 'inline-flex' },
        [`.af-grid`]: { display: 'grid' },
        [`.af-inline-grid`]: { display: 'inline-grid' },
        [`.af-hidden`]: { display: 'none' },
        [`.af-visible`]: { visibility: 'visible' },
        [`.af-invisible`]: { visibility: 'hidden' },
        [`.af-flex-row`]: { flexDirection: 'row' },
        [`.af-flex-col`]: { flexDirection: 'column' },
        [`.af-flex-wrap`]: { flexWrap: 'wrap' },
        [`.af-flex-nowrap`]: { flexWrap: 'nowrap' },
        [`.af-items-start`]: { alignItems: 'flex-start' },
        [`.af-items-center`]: { alignItems: 'center' },
        [`.af-items-end`]: { alignItems: 'flex-end' },
        [`.af-items-stretch`]: { alignItems: 'stretch' },
        [`.af-justify-start`]: { justifyContent: 'flex-start' },
        [`.af-justify-center`]: { justifyContent: 'center' },
        [`.af-justify-end`]: { justifyContent: 'flex-end' },
        [`.af-justify-between`]: { justifyContent: 'space-between' },
        [`.af-justify-around`]: { justifyContent: 'space-around' },
        [`.af-justify-evenly`]: { justifyContent: 'space-evenly' },
      });

      // Utilities: grid columns (1..12) and column spans
      const gridUtils: Record<string, any> = {};
      for (let n = 1; n <= 12; n++) {
        gridUtils[`.af-grid-cols-${n}`] = { gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` };
        gridUtils[`.af-col-span-${n}`] = { gridColumn: `span ${n} / span ${n}` };
      }
      addUtilities(gridUtils);

      // Utilities: borders & dividers
      const borderUtils: Record<string, any> = {
        '.af-border-t': { borderTopWidth: '1px', borderStyle: 'solid' },
        '.af-border-r': { borderRightWidth: '1px', borderStyle: 'solid' },
        '.af-border-b': { borderBottomWidth: '1px', borderStyle: 'solid' },
        '.af-border-l': { borderLeftWidth: '1px', borderStyle: 'solid' },
      };
      // Semantic border colors
      Object.entries(tokens.colors).forEach(([name, scale]) => {
        Object.keys(scale).forEach((k) => {
          borderUtils[`.af-border-${name}-${k}`] = { borderColor: `var(--af-color-${name}-${k})` };
        });
      });
      addUtilities(borderUtils);

      // Dividers (y/x) with optional color modifiers
      const divideUtils: Record<string, any> = {
        '.af-divide-y': { '& > * + *': { borderTopWidth: '1px', borderStyle: 'solid', borderColor: 'var(--af-color-neutral-300)' } },
        '.af-divide-x': { '& > * + *': { borderLeftWidth: '1px', borderStyle: 'solid', borderColor: 'var(--af-color-neutral-300)' } },
      } as any;
      Object.entries(tokens.colors).forEach(([name, scale]) => {
        Object.keys(scale).forEach((k) => {
          divideUtils[`.af-divide-y-${name}-${k}`] = { '& > * + *': { borderTopWidth: '1px', borderStyle: 'solid', borderColor: `var(--af-color-${name}-${k})` } };
          divideUtils[`.af-divide-x-${name}-${k}`] = { '& > * + *': { borderLeftWidth: '1px', borderStyle: 'solid', borderColor: `var(--af-color-${name}-${k})` } };
        });
      });
      addUtilities(divideUtils);

      // Utilities: opacity 0..100 step 5
      const opacityUtils: Record<string, any> = {};
      for (let i = 0; i <= 100; i += 5) {
        opacityUtils[`.af-opacity-${i}`] = { opacity: String(i / 100) };
      }
      addUtilities(opacityUtils);

      // Utilities: position & z-index
      addUtilities({
        '.af-relative': { position: 'relative' },
        '.af-absolute': { position: 'absolute' },
        '.af-fixed': { position: 'fixed' },
        '.af-sticky': { position: 'sticky' },
      });
      const zUtils: Record<string, any> = {};
      [0, 10, 20, 30, 40, 50, 100, 1000].forEach((z) => {
        zUtils[`.af-z-${z}`] = { zIndex: String(z) };
      });
      addUtilities(zUtils);

      // Utilities: radius & shadow helpers
      const rounded: Record<string, any> = {
        '.af-rounded-none': { borderRadius: 'var(--af-radius-none)' },
        '.af-rounded-sm': { borderRadius: 'var(--af-radius-sm)' },
        '.af-rounded-md': { borderRadius: 'var(--af-radius-md)' },
        '.af-rounded-lg': { borderRadius: 'var(--af-radius-lg)' },
        '.af-rounded-xl': { borderRadius: 'var(--af-radius-xl)' },
        '.af-rounded-full': { borderRadius: 'var(--af-radius-full)' },
      };
      addUtilities(rounded);

      const shadows: Record<string, any> = {
        '.af-shadow-sm': { boxShadow: 'var(--af-shadow-sm)' },
        '.af-shadow-md': { boxShadow: 'var(--af-shadow-md)' },
        '.af-shadow-lg': { boxShadow: 'var(--af-shadow-lg)' },
        '.af-shadow-xl': { boxShadow: 'var(--af-shadow-xl)' },
      };
      addUtilities(shadows);

      // Utilities: ring helpers
      addUtilities({
        '.af-ring': { outline: '2px solid hsl(var(--af-ring))', outlineOffset: '2px' },
        // Recipes (basic)
        '.af-btn': { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.5rem 0.875rem', borderRadius: 'var(--af-radius-md)', border: '1px solid transparent', fontWeight: '600' },
        '.af-btn-outline': { backgroundColor: 'transparent', borderColor: 'var(--af-color-neutral-300)', color: 'var(--af-color-neutral-900)' },
        '.af-card': { border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-md)', padding: 'var(--af-space-4)', background: 'white', boxShadow: 'var(--af-shadow-sm)' },
        '.af-input': { appearance: 'none', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', padding: '0.5rem 0.75rem', background: 'white', color: 'var(--af-color-neutral-900)' },
      });

      // Utilities: typography sizes
      const textNames = [
        "xs",
        "sm",
        "base",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
      ];
      const textUtils: Record<string, any> = {};
      for (const n of textNames) {
        textUtils[`.af-text-${n}`] = { fontSize: `var(--af-text-${n})` };
      }
      addUtilities(textUtils);

      // Utilities: semantic color helpers
      const colorUtils: Record<string, any> = {};
      Object.entries(tokens.colors).forEach(([name, scale]) => {
        Object.keys(scale).forEach((k) => {
          colorUtils[`.af-text-${name}-${k}`] = {
            color: `var(--af-color-${name}-${k})`,
          };
          colorUtils[`.af-bg-${name}-${k}`] = {
            backgroundColor: `var(--af-color-${name}-${k})`,
          };
          // Button variants
          colorUtils[`.af-btn-${name}`] = {
            backgroundColor: `var(--af-color-${name}-500)`,
            color: '#fff',
          };
        });
      });
      addUtilities(colorUtils);
    },
    {
      theme: {
        extend: {
          colors: {
            primary: tokens.colors.primary,
            neutral: tokens.colors.neutral,
            success: tokens.colors.success,
            warning: tokens.colors.warning,
            danger: tokens.colors.danger,
          },
          borderRadius: tokens.radius,
          boxShadow: tokens.shadows,
        },
      },
    } as any
  );
}

export { defaultTokens } from "../tokens.js";

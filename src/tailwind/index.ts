import plugin from "tailwindcss/plugin";
import { defaultTokens, AutofuseTokens, buildCssVariables } from "../tokens.js";

export interface AutofuseTailwindOptions {
  tokens?: Partial<AutofuseTokens>;
  layer?: 'base' | 'components' | 'utilities';
}

export default function autofusePlugin(
  _opts: AutofuseTailwindOptions = {}
): any {
  const tokens = {
    ...defaultTokens,
    ...(_opts.tokens || {}),
  } as AutofuseTokens;

  return plugin(
    function ({ addBase, addUtilities: twAddUtilities, addVariant }) {
      const layer = (_opts.layer || 'utilities') as 'base' | 'components' | 'utilities';
      const addUtilities = (obj: Record<string, any>) => twAddUtilities(obj, { layer } as any);
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

      // Reduced motion variants
      addVariant('motion-safe', '@media (prefers-reduced-motion: no-preference) &');
      addVariant('motion-reduce', '@media (prefers-reduced-motion: reduce) &');

      // Container query variants (width breakpoints)
      addVariant('cq-xs', '@container (min-width: 20rem) &');
      addVariant('cq-sm', '@container (min-width: 30rem) &');
      addVariant('cq-md', '@container (min-width: 48rem) &');
      addVariant('cq-lg', '@container (min-width: 64rem) &');
      addVariant('cq-xl', '@container (min-width: 80rem) &');

      // Named container query variants
      addVariant('cq-content-xs', '@container content (min-width: 20rem) &');
      addVariant('cq-content-sm', '@container content (min-width: 30rem) &');
      addVariant('cq-content-md', '@container content (min-width: 48rem) &');
      addVariant('cq-content-lg', '@container content (min-width: 64rem) &');
      addVariant('cq-content-xl', '@container content (min-width: 80rem) &');
      addVariant('cq-layout-xs', '@container layout (min-width: 20rem) &');
      addVariant('cq-layout-sm', '@container layout (min-width: 30rem) &');
      addVariant('cq-layout-md', '@container layout (min-width: 48rem) &');
      addVariant('cq-layout-lg', '@container layout (min-width: 64rem) &');
      addVariant('cq-layout-xl', '@container layout (min-width: 80rem) &');

      // Contrast and high-contrast system variants
      addVariant('contrast-more', '@media (prefers-contrast: more) &');
      addVariant('contrast-less', '@media (prefers-contrast: less) &');
      addVariant('forced-colors', '@media (forced-colors: active) &');

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
        [`.af-block`]: { display: "block" },
        [`.af-inline-block`]: { display: "inline-block" },
        [`.af-flex`]: { display: "flex" },
        [`.af-inline-flex`]: { display: "inline-flex" },
        [`.af-grid`]: { display: "grid" },
        [`.af-inline-grid`]: { display: "inline-grid" },
        [`.af-hidden`]: { display: "none" },
        [`.af-visible`]: { visibility: "visible" },
        [`.af-invisible`]: { visibility: "hidden" },
        [`.af-flex-row`]: { flexDirection: "row" },
        [`.af-flex-col`]: { flexDirection: "column" },
        [`.af-flex-wrap`]: { flexWrap: "wrap" },
        [`.af-flex-nowrap`]: { flexWrap: "nowrap" },
        [`.af-items-start`]: { alignItems: "flex-start" },
        [`.af-items-center`]: { alignItems: "center" },
        [`.af-items-end`]: { alignItems: "flex-end" },
        [`.af-items-stretch`]: { alignItems: "stretch" },
        [`.af-justify-start`]: { justifyContent: "flex-start" },
        [`.af-justify-center`]: { justifyContent: "center" },
        [`.af-justify-end`]: { justifyContent: "flex-end" },
        [`.af-justify-between`]: { justifyContent: "space-between" },
        [`.af-justify-around`]: { justifyContent: "space-around" },
        [`.af-justify-evenly`]: { justifyContent: "space-evenly" },
      });

      // Utilities: grid columns (1..12) and column spans
      const gridUtils: Record<string, any> = {};
      for (let n = 1; n <= 12; n++) {
        gridUtils[`.af-grid-cols-${n}`] = {
          gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
        };
        gridUtils[`.af-col-span-${n}`] = {
          gridColumn: `span ${n} / span ${n}`,
        };
      }
      addUtilities(gridUtils);

      // Utilities: columns (CSS columns)
      const columnUtils: Record<string, any> = {
        ".af-break-inside-avoid": { breakInside: "avoid" },
      };
      for (let n = 1; n <= 6; n++)
        columnUtils[`.af-columns-${n}`] = { columnCount: String(n) };
      for (let i = 0; i <= tokens.spacing.steps; i++) {
        columnUtils[`.af-column-gap-${i}`] = {
          columnGap: `var(--af-space-${i})`,
        };
      }
      addUtilities(columnUtils);

      // Utilities: dimension (width/height/min/max)
      const dimensionUtils: Record<string, any> = {
        // Width utilities
        ".af-w-auto": { width: "auto" },
        ".af-w-full": { width: "100%" },
        ".af-w-1/2": { width: "50%" },
        ".af-w-1/3": { width: "33.333333%" },
        ".af-w-2/3": { width: "66.666667%" },
        ".af-w-1/4": { width: "25%" },
        ".af-w-3/4": { width: "75%" },
        ".af-w-1/5": { width: "20%" },
        ".af-w-2/5": { width: "40%" },
        ".af-w-3/5": { width: "60%" },
        ".af-w-4/5": { width: "80%" },
        ".af-w-fit": { width: "fit-content" },
        ".af-w-min": { width: "min-content" },
        ".af-w-max": { width: "max-content" },
        ".af-w-screen": { width: "100vw" },

        // Height utilities
        ".af-h-auto": { height: "auto" },
        ".af-h-full": { height: "100%" },
        ".af-h-1/2": { height: "50%" },
        ".af-h-1/3": { height: "33.333333%" },
        ".af-h-2/3": { height: "66.666667%" },
        ".af-h-1/4": { height: "25%" },
        ".af-h-3/4": { height: "75%" },
        ".af-h-fit": { height: "fit-content" },
        ".af-h-min": { height: "min-content" },
        ".af-h-max": { height: "max-content" },
        ".af-h-screen": { height: "100vh" },

        // Min width utilities
        ".af-min-w-0": { minWidth: "0" },
        ".af-min-w-full": { minWidth: "100%" },
        ".af-min-w-min": { minWidth: "min-content" },
        ".af-min-w-max": { minWidth: "max-content" },
        ".af-min-w-fit": { minWidth: "fit-content" },

        // Min height utilities
        ".af-min-h-0": { minHeight: "0" },
        ".af-min-h-full": { minHeight: "100%" },
        ".af-min-h-screen": { minHeight: "100vh" },
        ".af-min-h-min": { minHeight: "min-content" },
        ".af-min-h-max": { minHeight: "max-content" },
        ".af-min-h-fit": { minHeight: "fit-content" },

        // Max width utilities
        ".af-max-w-none": { maxWidth: "none" },
        ".af-max-w-xs": { maxWidth: "20rem" },
        ".af-max-w-sm": { maxWidth: "24rem" },
        ".af-max-w-md": { maxWidth: "28rem" },
        ".af-max-w-lg": { maxWidth: "32rem" },
        ".af-max-w-xl": { maxWidth: "36rem" },
        ".af-max-w-2xl": { maxWidth: "42rem" },
        ".af-max-w-3xl": { maxWidth: "48rem" },
        ".af-max-w-4xl": { maxWidth: "56rem" },
        ".af-max-w-5xl": { maxWidth: "64rem" },
        ".af-max-w-6xl": { maxWidth: "72rem" },
        ".af-max-w-7xl": { maxWidth: "80rem" },
        ".af-max-w-full": { maxWidth: "100%" },
        ".af-max-w-min": { maxWidth: "min-content" },
        ".af-max-w-max": { maxWidth: "max-content" },
        ".af-max-w-fit": { maxWidth: "fit-content" },
        ".af-max-w-prose": { maxWidth: "65ch" },

        // Max height utilities
        ".af-max-h-none": { maxHeight: "none" },
        ".af-max-h-full": { maxHeight: "100%" },
        ".af-max-h-screen": { maxHeight: "100vh" },
        ".af-max-h-min": { maxHeight: "min-content" },
        ".af-max-h-max": { maxHeight: "max-content" },
        ".af-max-h-fit": { maxHeight: "fit-content" },
      };
      addUtilities(dimensionUtils);

      const screenUtils: Record<string, any> = {};
      (Object.entries(tokens.breakpoints) as any).forEach(
        ([name, px]: [string, number]) => {
          screenUtils[`.af-max-w-screen-${name}`] = { maxWidth: `${px}px` };
        }
      );
      addUtilities(screenUtils);

      // Utilities: background gradients
      addUtilities({
        ".af-bg-gradient": {
          backgroundImage:
            "linear-gradient(var(--af-grad-direction, to bottom), var(--af-grad-from, transparent), var(--af-grad-via, initial), var(--af-grad-to, transparent))",
        },
        ".af-bg-gradient-radial": {
          backgroundImage:
            "radial-gradient(var(--af-grad-shape, circle) var(--af-grad-size, farthest-corner) at var(--af-grad-position, center), var(--af-grad-from, transparent), var(--af-grad-via, initial), var(--af-grad-to, transparent))",
        },
        ".af-bg-gradient-conic": {
          backgroundImage:
            "conic-gradient(from var(--af-grad-angle, 0deg) at var(--af-grad-position, center), var(--af-grad-from, transparent), var(--af-grad-via, initial), var(--af-grad-to, transparent))",
        },

        // Linear gradient directions
        ".af-gradient-to-t": { "--af-grad-direction": "to top" },
        ".af-gradient-to-tr": { "--af-grad-direction": "to top right" },
        ".af-gradient-to-r": { "--af-grad-direction": "to right" },
        ".af-gradient-to-br": { "--af-grad-direction": "to bottom right" },
        ".af-gradient-to-b": { "--af-grad-direction": "to bottom" },
        ".af-gradient-to-bl": { "--af-grad-direction": "to bottom left" },
        ".af-gradient-to-l": { "--af-grad-direction": "to left" },
        ".af-gradient-to-tl": { "--af-grad-direction": "to top left" },

        // Angled gradients
        ".af-gradient-45": { "--af-grad-direction": "45deg" },
        ".af-gradient-90": { "--af-grad-direction": "90deg" },
        ".af-gradient-135": { "--af-grad-direction": "135deg" },
        ".af-gradient-180": { "--af-grad-direction": "180deg" },
        ".af-gradient-225": { "--af-grad-direction": "225deg" },
        ".af-gradient-270": { "--af-grad-direction": "270deg" },
        ".af-gradient-315": { "--af-grad-direction": "315deg" },

        // Radial gradient shapes and sizes
        ".af-radial-circle": { "--af-grad-shape": "circle" },
        ".af-radial-ellipse": { "--af-grad-shape": "ellipse" },
        ".af-radial-closest-side": { "--af-grad-size": "closest-side" },
        ".af-radial-closest-corner": { "--af-grad-size": "closest-corner" },
        ".af-radial-farthest-side": { "--af-grad-size": "farthest-side" },
        ".af-radial-farthest-corner": { "--af-grad-size": "farthest-corner" },

        // Gradient positions
        ".af-grad-center": { "--af-grad-position": "center" },
        ".af-grad-top": { "--af-grad-position": "top" },
        ".af-grad-bottom": { "--af-grad-position": "bottom" },
        ".af-grad-left": { "--af-grad-position": "left" },
        ".af-grad-right": { "--af-grad-position": "right" },
        ".af-grad-top-left": { "--af-grad-position": "top left" },
        ".af-grad-top-right": { "--af-grad-position": "top right" },
        ".af-grad-bottom-left": { "--af-grad-position": "bottom left" },
        ".af-grad-bottom-right": { "--af-grad-position": "bottom right" },

        // Conic gradient angles
        ".af-conic-0": { "--af-grad-angle": "0deg" },
        ".af-conic-45": { "--af-grad-angle": "45deg" },
        ".af-conic-90": { "--af-grad-angle": "90deg" },
        ".af-conic-135": { "--af-grad-angle": "135deg" },
        ".af-conic-180": { "--af-grad-angle": "180deg" },
        ".af-conic-225": { "--af-grad-angle": "225deg" },
        ".af-conic-270": { "--af-grad-angle": "270deg" },
        ".af-conic-315": { "--af-grad-angle": "315deg" },

        // Preset gradient combinations
        ".af-bg-gradient-rainbow": {
          backgroundImage:
            "linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)",
        },
        ".af-bg-gradient-sunset": {
          backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        ".af-bg-gradient-ocean": {
          backgroundImage: "linear-gradient(120deg, #a8edea 0%, #fed6e3 100%)",
        },
        ".af-bg-gradient-cool": {
          backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        ".af-bg-gradient-warm": {
          backgroundImage: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        },
        ".af-bg-gradient-forest": {
          backgroundImage: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
        },
        ".af-bg-gradient-midnight": {
          backgroundImage: "linear-gradient(135deg, #232526 0%, #414345 100%)",
        },
      } as any);

      const gradColorUtils: Record<string, any> = {};
      Object.entries(tokens.colors).forEach(([name, scale]) => {
        Object.keys(scale).forEach((k) => {
          gradColorUtils[`.af-from-${name}-${k}`] = {
            "--af-grad-from": `var(--af-color-${name}-${k})`,
          };
          gradColorUtils[`.af-via-${name}-${k}`] = {
            "--af-grad-via": `var(--af-color-${name}-${k})`,
          };
          gradColorUtils[`.af-to-${name}-${k}`] = {
            "--af-grad-to": `var(--af-color-${name}-${k})`,
          };
        });
      });
      addUtilities(gradColorUtils);

      // Utilities: filters
      addUtilities({
        // Blur filters
        ".af-blur-none": { filter: "blur(0)" },
        ".af-blur-sm": { filter: "blur(4px)" },
        ".af-blur-md": { filter: "blur(8px)" },
        ".af-blur-lg": { filter: "blur(12px)" },
        ".af-blur-xl": { filter: "blur(16px)" },
        ".af-blur-2xl": { filter: "blur(24px)" },
        ".af-blur-3xl": { filter: "blur(40px)" },

        // Brightness filters
        ".af-brightness-0": { filter: "brightness(0)" },
        ".af-brightness-50": { filter: "brightness(0.5)" },
        ".af-brightness-75": { filter: "brightness(0.75)" },
        ".af-brightness-90": { filter: "brightness(0.9)" },
        ".af-brightness-95": { filter: "brightness(0.95)" },
        ".af-brightness-100": { filter: "brightness(1)" },
        ".af-brightness-105": { filter: "brightness(1.05)" },
        ".af-brightness-110": { filter: "brightness(1.10)" },
        ".af-brightness-125": { filter: "brightness(1.25)" },
        ".af-brightness-150": { filter: "brightness(1.5)" },
        ".af-brightness-200": { filter: "brightness(2)" },

        // Contrast filters
        ".af-contrast-0": { filter: "contrast(0)" },
        ".af-contrast-50": { filter: "contrast(0.5)" },
        ".af-contrast-75": { filter: "contrast(0.75)" },
        ".af-contrast-100": { filter: "contrast(1)" },
        ".af-contrast-125": { filter: "contrast(1.25)" },
        ".af-contrast-150": { filter: "contrast(1.5)" },
        ".af-contrast-200": { filter: "contrast(2)" },

        // Grayscale filters
        ".af-grayscale-0": { filter: "grayscale(0)" },
        ".af-grayscale": { filter: "grayscale(100%)" },
        ".af-grayscale-50": { filter: "grayscale(50%)" },

        // Sepia filters
        ".af-sepia-0": { filter: "sepia(0)" },
        ".af-sepia": { filter: "sepia(100%)" },
        ".af-sepia-50": { filter: "sepia(50%)" },

        // Hue rotate filters
        ".af-hue-rotate-0": { filter: "hue-rotate(0deg)" },
        ".af-hue-rotate-15": { filter: "hue-rotate(15deg)" },
        ".af-hue-rotate-30": { filter: "hue-rotate(30deg)" },
        ".af-hue-rotate-60": { filter: "hue-rotate(60deg)" },
        ".af-hue-rotate-90": { filter: "hue-rotate(90deg)" },
        ".af-hue-rotate-180": { filter: "hue-rotate(180deg)" },
        ".af-hue-rotate-270": { filter: "hue-rotate(270deg)" },
        ".-af-hue-rotate-15": { filter: "hue-rotate(-15deg)" },
        ".-af-hue-rotate-30": { filter: "hue-rotate(-30deg)" },
        ".-af-hue-rotate-60": { filter: "hue-rotate(-60deg)" },
        ".-af-hue-rotate-90": { filter: "hue-rotate(-90deg)" },
        ".-af-hue-rotate-180": { filter: "hue-rotate(-180deg)" },

        // Saturate filters
        ".af-saturate-0": { filter: "saturate(0)" },
        ".af-saturate-50": { filter: "saturate(0.5)" },
        ".af-saturate-100": { filter: "saturate(1)" },
        ".af-saturate-150": { filter: "saturate(1.5)" },
        ".af-saturate-200": { filter: "saturate(2)" },

        // Invert filters
        ".af-invert-0": { filter: "invert(0)" },
        ".af-invert": { filter: "invert(100%)" },
        ".af-invert-50": { filter: "invert(50%)" },

        // Drop shadow filters
        ".af-drop-shadow-none": { filter: "drop-shadow(0 0 0 transparent)" },
        ".af-drop-shadow-sm": {
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.05))",
        },
        ".af-drop-shadow": {
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))",
        },
        ".af-drop-shadow-md": {
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
        },
        ".af-drop-shadow-lg": {
          filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))",
        },
        ".af-drop-shadow-xl": {
          filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.25))",
        },
        ".af-drop-shadow-2xl": {
          filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.25))",
        },

        // Filter combinations (common presets)
        ".af-filter-none": { filter: "none" },
        ".af-filter-vintage": {
          filter: "sepia(50%) contrast(1.2) brightness(1.1)",
        },
        ".af-filter-warm": {
          filter: "sepia(20%) saturate(1.2) hue-rotate(15deg)",
        },
        ".af-filter-cool": {
          filter: "saturate(1.1) hue-rotate(-15deg) brightness(1.05)",
        },
        ".af-filter-dramatic": {
          filter: "contrast(1.5) saturate(1.3) brightness(0.9)",
        },
        ".af-filter-soft": {
          filter: "blur(1px) brightness(1.1) contrast(0.9)",
        },
        ".af-filter-sharp": { filter: "contrast(1.3) saturate(1.2)" },
        ".af-filter-noir": {
          filter: "grayscale(100%) contrast(1.3) brightness(0.9)",
        },
      });

      // Utilities: masks and clipping
      addUtilities({
        // Basic mask utilities
        ".af-mask-none": { mask: "none" },
        ".af-mask-linear": { mask: "linear-gradient(black, transparent)" },
        ".af-mask-radial": {
          mask: "radial-gradient(circle, black 60%, transparent 70%)",
        },
        ".af-mask-linear-to-t": {
          mask: "linear-gradient(to top, transparent, black)",
        },
        ".af-mask-linear-to-b": {
          mask: "linear-gradient(to bottom, transparent, black)",
        },
        ".af-mask-linear-to-l": {
          mask: "linear-gradient(to left, transparent, black)",
        },
        ".af-mask-linear-to-r": {
          mask: "linear-gradient(to right, transparent, black)",
        },
        ".af-mask-linear-to-br": {
          mask: "linear-gradient(to bottom right, transparent, black)",
        },
        ".af-mask-linear-to-bl": {
          mask: "linear-gradient(to bottom left, transparent, black)",
        },
        ".af-mask-linear-to-tr": {
          mask: "linear-gradient(to top right, transparent, black)",
        },
        ".af-mask-linear-to-tl": {
          mask: "linear-gradient(to top left, transparent, black)",
        },

        // Mask sizing
        ".af-mask-auto": { maskSize: "auto" },
        ".af-mask-cover": { maskSize: "cover" },
        ".af-mask-contain": { maskSize: "contain" },
        ".af-mask-size-full": { maskSize: "100% 100%" },

        // Mask positioning
        ".af-mask-center": { maskPosition: "center" },
        ".af-mask-top": { maskPosition: "top" },
        ".af-mask-bottom": { maskPosition: "bottom" },
        ".af-mask-left": { maskPosition: "left" },
        ".af-mask-right": { maskPosition: "right" },
        ".af-mask-top-left": { maskPosition: "top left" },
        ".af-mask-top-right": { maskPosition: "top right" },
        ".af-mask-bottom-left": { maskPosition: "bottom left" },
        ".af-mask-bottom-right": { maskPosition: "bottom right" },

        // Mask repeat
        ".af-mask-repeat": { maskRepeat: "repeat" },
        ".af-mask-no-repeat": { maskRepeat: "no-repeat" },
        ".af-mask-repeat-x": { maskRepeat: "repeat-x" },
        ".af-mask-repeat-y": { maskRepeat: "repeat-y" },
        ".af-mask-repeat-round": { maskRepeat: "round" },
        ".af-mask-repeat-space": { maskRepeat: "space" },

        // Clip path utilities
        ".af-clip-none": { clipPath: "none" },
        ".af-clip-circle": { clipPath: "circle(50%)" },
        ".af-clip-circle-sm": { clipPath: "circle(25%)" },
        ".af-clip-circle-lg": { clipPath: "circle(75%)" },
        ".af-clip-ellipse": { clipPath: "ellipse(50% 40%)" },
        ".af-clip-triangle": {
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        },
        ".af-clip-triangle-up": {
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        },
        ".af-clip-triangle-down": {
          clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
        },
        ".af-clip-triangle-left": {
          clipPath: "polygon(0% 50%, 100% 0%, 100% 100%)",
        },
        ".af-clip-triangle-right": {
          clipPath: "polygon(0% 0%, 0% 100%, 100% 50%)",
        },
        ".af-clip-diamond": {
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        },
        ".af-clip-hexagon": {
          clipPath:
            "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        },
        ".af-clip-pentagon": {
          clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
        },
        ".af-clip-octagon": {
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        },
        ".af-clip-star": {
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        },
        ".af-clip-arrow-right": {
          clipPath:
            "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",
        },
        ".af-clip-arrow-left": {
          clipPath:
            "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)",
        },
        ".af-clip-chevron-right": {
          clipPath:
            "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)",
        },
        ".af-clip-chevron-left": {
          clipPath:
            "polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)",
        },
        ".af-clip-parallelogram": {
          clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
        },
        ".af-clip-trapezoid": {
          clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
        },

        // Shape margin utilities for clip paths
        ".af-shape-margin-none": { shapeMargin: "0" },
        ".af-shape-margin-sm": { shapeMargin: "0.25rem" },
        ".af-shape-margin-md": { shapeMargin: "0.5rem" },
        ".af-shape-margin-lg": { shapeMargin: "1rem" },
        ".af-shape-margin-xl": { shapeMargin: "1.5rem" },
      });

      // Utilities: borders & dividers
      const borderUtils: Record<string, any> = {
        ".af-border-t": { borderTopWidth: "1px", borderStyle: "solid" },
        ".af-border-r": { borderRightWidth: "1px", borderStyle: "solid" },
        ".af-border-b": { borderBottomWidth: "1px", borderStyle: "solid" },
        ".af-border-l": { borderLeftWidth: "1px", borderStyle: "solid" },
      };
      // Semantic border colors
      Object.entries(tokens.colors).forEach(([name, scale]) => {
        Object.keys(scale).forEach((k) => {
          borderUtils[`.af-border-${name}-${k}`] = {
            borderColor: `var(--af-color-${name}-${k})`,
          };
        });
      });
      addUtilities(borderUtils);

      // Dividers (y/x) with optional color modifiers
      const divideUtils: Record<string, any> = {
        ".af-divide-y": {
          "& > * + *": {
            borderTopWidth: "1px",
            borderStyle: "solid",
            borderColor: "var(--af-color-neutral-300)",
          },
        },
        ".af-divide-x": {
          "& > * + *": {
            borderLeftWidth: "1px",
            borderStyle: "solid",
            borderColor: "var(--af-color-neutral-300)",
          },
        },
      } as any;
      Object.entries(tokens.colors).forEach(([name, scale]) => {
        Object.keys(scale).forEach((k) => {
          divideUtils[`.af-divide-y-${name}-${k}`] = {
            "& > * + *": {
              borderTopWidth: "1px",
              borderStyle: "solid",
              borderColor: `var(--af-color-${name}-${k})`,
            },
          };
          divideUtils[`.af-divide-x-${name}-${k}`] = {
            "& > * + *": {
              borderLeftWidth: "1px",
              borderStyle: "solid",
              borderColor: `var(--af-color-${name}-${k})`,
            },
          };
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
        ".af-relative": { position: "relative" },
        ".af-absolute": { position: "absolute" },
        ".af-fixed": { position: "fixed" },
        ".af-sticky": { position: "sticky" },
      });
      const zUtils: Record<string, any> = {};
      [0, 10, 20, 30, 40, 50, 100, 1000].forEach((z) => {
        zUtils[`.af-z-${z}`] = { zIndex: String(z) };
      });
      addUtilities(zUtils);

      // Utilities: radius & shadow helpers
      const rounded: Record<string, any> = {
        ".af-rounded-none": { borderRadius: "var(--af-radius-none)" },
        ".af-rounded-sm": { borderRadius: "var(--af-radius-sm)" },
        ".af-rounded-md": { borderRadius: "var(--af-radius-md)" },
        ".af-rounded-lg": { borderRadius: "var(--af-radius-lg)" },
        ".af-rounded-xl": { borderRadius: "var(--af-radius-xl)" },
        ".af-rounded-full": { borderRadius: "var(--af-radius-full)" },
      };
      // Aliases to match docs/examples using `af-radius-*`
      const radiusAliases: Record<string, any> = {
        ".af-radius-none": { borderRadius: "var(--af-radius-none)" },
        ".af-radius-sm": { borderRadius: "var(--af-radius-sm)" },
        ".af-radius-md": { borderRadius: "var(--af-radius-md)" },
        ".af-radius-lg": { borderRadius: "var(--af-radius-lg)" },
        ".af-radius-xl": { borderRadius: "var(--af-radius-xl)" },
        ".af-radius-full": { borderRadius: "var(--af-radius-full)" },
      };
      addUtilities({ ...rounded, ...radiusAliases });

      const shadows: Record<string, any> = {
        ".af-shadow-sm": { boxShadow: "var(--af-shadow-sm)" },
        ".af-shadow-md": { boxShadow: "var(--af-shadow-md)" },
        ".af-shadow-lg": { boxShadow: "var(--af-shadow-lg)" },
        ".af-shadow-xl": { boxShadow: "var(--af-shadow-xl)" },
      };
      addUtilities(shadows);

      // Utilities: ring helpers
      addUtilities({
        ".af-ring": {
          outline: "2px solid hsl(var(--af-ring))",
          outlineOffset: "2px",
        },
        // Recipes (basic)
        ".af-btn": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "0.5rem 0.875rem",
          borderRadius: "var(--af-radius-md)",
          border: "1px solid transparent",
          fontWeight: "600",
        },
        ".af-btn-sm": {
          padding: "0.25rem 0.5rem",
          fontSize: "var(--af-text-sm)",
        },
        ".af-btn-lg": {
          padding: "0.75rem 1.25rem",
          fontSize: "var(--af-text-lg)",
        },
        ".af-btn-disabled": { opacity: "0.6", cursor: "not-allowed" },
        ".af-btn-outline": {
          backgroundColor: "transparent",
          borderColor: "var(--af-color-neutral-300)",
          color: "var(--af-color-neutral-900)",
        },
        ".af-card": {
          border: "1px solid var(--af-color-neutral-300)",
          borderRadius: "var(--af-radius-md)",
          padding: "var(--af-space-4)",
          background: "white",
          boxShadow: "var(--af-shadow-sm)",
        },
        ".af-card-muted": { background: "var(--af-color-neutral-50, #f8fafc)" },
        ".af-card-elevated": { boxShadow: "var(--af-shadow-lg)" },

        // Form base styles
        ".af-input": {
          appearance: "none",
          border: "1px solid var(--af-color-neutral-300)",
          borderRadius: "var(--af-radius-sm)",
          padding: "0.5rem 0.75rem",
          background: "white",
          color: "var(--af-color-neutral-900)",
          fontSize: "var(--af-text-base)",
          lineHeight: "1.5",
          transition:
            "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
          "&:focus": {
            outline: "none",
            borderColor: "var(--af-color-primary-500)",
            boxShadow: "0 0 0 3px var(--af-color-primary-100)",
          },
          "&:disabled": {
            backgroundColor: "var(--af-color-neutral-100)",
            borderColor: "var(--af-color-neutral-200)",
            color: "var(--af-color-neutral-500)",
            cursor: "not-allowed",
          },
        },

        // Input sizes
        ".af-input-sm": {
          padding: "0.25rem 0.5rem",
          fontSize: "var(--af-text-sm)",
        },
        ".af-input-lg": {
          padding: "0.75rem 1rem",
          fontSize: "var(--af-text-lg)",
        },

        // Input states
        ".af-input-success": {
          borderColor: "var(--af-color-success-500, #10b981)",
          "&:focus": {
            borderColor: "var(--af-color-success-500)",
            boxShadow: "0 0 0 3px var(--af-color-success-100)",
          },
        },
        ".af-input-warn": {
          borderColor: "var(--af-color-warning-500, #f59e0b)",
          "&:focus": {
            borderColor: "var(--af-color-warning-500)",
            boxShadow: "0 0 0 3px var(--af-color-warning-100)",
          },
        },
        ".af-input-error": {
          borderColor: "var(--af-color-danger-500, #ef4444)",
          "&:focus": {
            borderColor: "var(--af-color-danger-500)",
            boxShadow: "0 0 0 3px var(--af-color-danger-100)",
          },
        },

        // Textarea specific
        ".af-textarea": {
          appearance: "none",
          border: "1px solid var(--af-color-neutral-300)",
          borderRadius: "var(--af-radius-sm)",
          padding: "0.5rem 0.75rem",
          background: "white",
          color: "var(--af-color-neutral-900)",
          fontSize: "var(--af-text-base)",
          lineHeight: "1.5",
          minHeight: "5rem",
          resize: "vertical",
          transition:
            "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
          "&:focus": {
            outline: "none",
            borderColor: "var(--af-color-primary-500)",
            boxShadow: "0 0 0 3px var(--af-color-primary-100)",
          },
          "&:disabled": {
            backgroundColor: "var(--af-color-neutral-100)",
            borderColor: "var(--af-color-neutral-200)",
            color: "var(--af-color-neutral-500)",
            cursor: "not-allowed",
          },
        },

        // Select dropdown
        ".af-select": {
          appearance: "none",
          border: "1px solid var(--af-color-neutral-300)",
          borderRadius: "var(--af-radius-sm)",
          padding: "0.5rem 2.5rem 0.5rem 0.75rem",
          background:
            "white url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\") no-repeat right 0.5rem center/1.5rem 1.5rem",
          color: "var(--af-color-neutral-900)",
          fontSize: "var(--af-text-base)",
          lineHeight: "1.5",
          cursor: "pointer",
          transition:
            "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
          "&:focus": {
            outline: "none",
            borderColor: "var(--af-color-primary-500)",
            boxShadow: "0 0 0 3px var(--af-color-primary-100)",
          },
          "&:disabled": {
            backgroundColor: "var(--af-color-neutral-100)",
            borderColor: "var(--af-color-neutral-200)",
            color: "var(--af-color-neutral-500)",
            cursor: "not-allowed",
          },
        },

        // Checkbox and radio base
        ".af-checkbox, .af-radio": {
          appearance: "none",
          width: "1rem",
          height: "1rem",
          border: "1px solid var(--af-color-neutral-300)",
          backgroundColor: "white",
          cursor: "pointer",
          position: "relative",
          transition: "all 0.15s ease-in-out",
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 3px var(--af-color-primary-100)",
          },
          "&:checked": {
            backgroundColor: "var(--af-color-primary-500)",
            borderColor: "var(--af-color-primary-500)",
          },
          "&:disabled": {
            backgroundColor: "var(--af-color-neutral-100)",
            borderColor: "var(--af-color-neutral-200)",
            cursor: "not-allowed",
          },
        },

        // Checkbox specific
        ".af-checkbox": {
          borderRadius: "var(--af-radius-sm)",
          "&:checked::after": {
            content: '""',
            position: "absolute",
            top: "1px",
            left: "4px",
            width: "4px",
            height: "8px",
            border: "2px solid white",
            borderTop: "none",
            borderLeft: "none",
            transform: "rotate(45deg)",
          },
        },

        // Radio specific
        ".af-radio": {
          borderRadius: "50%",
          "&:checked::after": {
            content: '""',
            position: "absolute",
            top: "2px",
            left: "2px",
            width: "8px",
            height: "8px",
            backgroundColor: "white",
            borderRadius: "50%",
          },
        },

        // Form groups and layout
        ".af-form-group": {
          display: "flex",
          flexDirection: "column",
          gap: "var(--af-space-2)",
        },
        ".af-form-group-horizontal": {
          display: "flex",
          alignItems: "center",
          gap: "var(--af-space-3)",
        },
        ".af-form-row": {
          display: "grid",
          gap: "var(--af-space-3, 0.75rem)",
          alignItems: "start",
        },
        ".af-form-col-1": { gridTemplateColumns: "1fr" },
        ".af-form-col-2": { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" },
        ".af-form-col-3": { gridTemplateColumns: "repeat(3, minmax(0, 1fr))" },
        ".af-form-col-4": { gridTemplateColumns: "repeat(4, minmax(0, 1fr))" },

        // Field groups (checkbox/radio groups)
        ".af-field-group": {
          display: "flex",
          flexDirection: "column",
          gap: "var(--af-space-2)",
        },
        ".af-field-group-horizontal": {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "var(--af-space-4)",
        },
        ".af-field-item": {
          display: "flex",
          alignItems: "center",
          gap: "var(--af-space-2)",
          cursor: "pointer",
        },

        // Form labels
        ".af-label": {
          fontSize: "var(--af-text-sm)",
          fontWeight: "500",
          color: "var(--af-color-neutral-700)",
          cursor: "pointer",
        },
        ".af-label-required::after": {
          content: " *",
          color: "var(--af-color-danger-500)",
        },

        // Help text and validation messages
        ".af-help-text": {
          fontSize: "var(--af-text-xs)",
          color: "var(--af-color-neutral-600)",
          marginTop: "var(--af-space-1)",
        },
        ".af-error-text": {
          fontSize: "var(--af-text-xs)",
          color: "var(--af-color-danger-600)",
          marginTop: "var(--af-space-1)",
        },
        ".af-success-text": {
          fontSize: "var(--af-text-xs)",
          color: "var(--af-color-success-600)",
          marginTop: "var(--af-space-1)",
        },

        // Input groups (with icons/buttons)
        ".af-input-group": {
          position: "relative",
          display: "flex",
        },
        ".af-input-group-left": {
          ".af-input": {
            paddingLeft: "2.5rem",
          },
        },
        ".af-input-group-right": {
          ".af-input": {
            paddingRight: "2.5rem",
          },
        },
        ".af-input-group-icon": {
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width: "1rem",
          height: "1rem",
          color: "var(--af-color-neutral-500)",
          pointerEvents: "none",
        },
        ".af-input-group-icon-left": {
          left: "0.75rem",
        },
        ".af-input-group-icon-right": {
          right: "0.75rem",
        },
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

      // Utilities: font families and weights
      addUtilities({
        ".af-font-sans": {
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\"",
        },
        ".af-font-serif": {
          fontFamily:
            "ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif",
        },
        ".af-font-mono": {
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
        },
        ".af-font-thin": { fontWeight: "100" },
        ".af-font-extralight": { fontWeight: "200" },
        ".af-font-light": { fontWeight: "300" },
        ".af-font-normal": { fontWeight: "400" },
        ".af-font-medium": { fontWeight: "500" },
        ".af-font-semibold": { fontWeight: "600" },
        ".af-font-bold": { fontWeight: "700" },
        ".af-font-extrabold": { fontWeight: "800" },
        ".af-font-black": { fontWeight: "900" },
      });

      // Utilities: line-height (leading)
      addUtilities({
        ".af-leading-none": { lineHeight: "1" },
        ".af-leading-tight": { lineHeight: "1.25" },
        ".af-leading-snug": { lineHeight: "1.375" },
        ".af-leading-normal": { lineHeight: "1.5" },
        ".af-leading-relaxed": { lineHeight: "1.625" },
        ".af-leading-loose": { lineHeight: "2" },
      });

      // Utilities: black/white helpers
      addUtilities({
        ".af-text-white": { color: "#ffffff" },
        ".af-text-black": { color: "#000000" },
        ".af-bg-white": { backgroundColor: "#ffffff" },
        ".af-bg-black": { backgroundColor: "#000000" },
      });

      // Utilities: numeric width/height based on spacing scale
      const whUtils: Record<string, any> = {};
      for (let i = 0; i <= tokens.spacing.steps; i++) {
        const v = `var(--af-space-${i})`;
        whUtils[`.af-w-${i}`] = { width: v };
        whUtils[`.af-h-${i}`] = { height: v };
        whUtils[`.af-size-${i}`] = { width: v, height: v };
        whUtils[`.af-min-w-${i}`] = { minWidth: v };
        whUtils[`.af-min-h-${i}`] = { minHeight: v };
        whUtils[`.af-max-w-${i}`] = { maxWidth: v };
        whUtils[`.af-max-h-${i}`] = { maxHeight: v };
      }
      addUtilities(whUtils);

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
            color: "#fff",
            "&:hover": { filter: "brightness(0.95)" },
          };
          colorUtils[`.af-btn-${name}-outline`] = {
            backgroundColor: "transparent",
            borderColor: `var(--af-color-${name}-500)`,
            color: `var(--af-color-${name}-700)`,
            borderWidth: "1px",
            "&:hover": { filter: "brightness(0.95)" },
          };
          // Ghost and subtle variants
          colorUtils[`.af-btn-ghost-${name}`] = {
            backgroundColor: "transparent",
            color: `var(--af-color-${name}-700)`,
            "&:hover": { backgroundColor: `var(--af-color-${name}-50)` },
          };
          colorUtils[`.af-btn-subtle-${name}`] = {
            backgroundColor: `var(--af-color-${name}-50)`,
            color: `var(--af-color-${name}-700)`,
            "&:hover": { filter: "brightness(0.98)" },
          };
        });
      });
      addUtilities(colorUtils);

      // Aliases: destructive
      addUtilities({
        ".af-btn-destructive": {
          backgroundColor: "var(--af-color-danger-500)",
          color: "#fff",
        },
        ".af-btn-destructive-outline": {
          backgroundColor: "transparent",
          borderColor: "var(--af-color-danger-500)",
          color: "var(--af-color-danger-700)",
          borderWidth: "1px",
        },
      });

      // Layout grids and patterns
      addUtilities({
        // Auto-fill responsive grids
        ".af-grid-auto-fill-sm": {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(12rem, 1fr))",
          gap: "var(--af-space-4)",
        },
        ".af-grid-auto-fill-md": {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
          gap: "var(--af-space-4)",
        },
        ".af-grid-auto-fill-lg": {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
          gap: "var(--af-space-4)",
        },
        ".af-grid-auto-fill-xl": {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(24rem, 1fr))",
          gap: "var(--af-space-4)",
        },

        // Auto-fit responsive grids (stretches to fill)
        ".af-grid-auto-fit-sm": {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))",
          gap: "var(--af-space-4)",
        },
        ".af-grid-auto-fit-md": {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
          gap: "var(--af-space-4)",
        },
        ".af-grid-auto-fit-lg": {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
          gap: "var(--af-space-4)",
        },

        // Holy Grail layout pattern
        ".af-layout-holy-grail": {
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          gridTemplateColumns: "auto 1fr auto",
          gridTemplateAreas: `
            "header header header"
            "sidebar main aside"
            "footer footer footer"
          `,
          minHeight: "100vh",
          gap: "var(--af-space-4)",
        },
        ".af-layout-header": { gridArea: "header" },
        ".af-layout-sidebar": { gridArea: "sidebar" },
        ".af-layout-main": { gridArea: "main" },
        ".af-layout-aside": { gridArea: "aside" },
        ".af-layout-footer": { gridArea: "footer" },

        // Sidebar layouts
        ".af-layout-sidebar-left": {
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "var(--af-space-4)",
          minHeight: "100vh",
        },
        ".af-layout-sidebar-right": {
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "var(--af-space-4)",
          minHeight: "100vh",
        },
        ".af-layout-sidebar-content": {
          display: "flex",
          flexDirection: "column",
          gap: "var(--af-space-4)",
        },

        // Card layouts
        ".af-layout-card-grid": {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "var(--af-space-6)",
        },
        ".af-layout-masonry": {
          columns: "300px",
          columnGap: "var(--af-space-4)",
          ".af-masonry-item": {
            breakInside: "avoid",
            marginBottom: "var(--af-space-4)",
          },
        },

        // Gallery layouts
        ".af-gallery-grid": {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "var(--af-space-3)",
        },
        ".af-gallery-masonry": {
          columns: "250px",
          columnGap: "var(--af-space-3)",
          ".af-gallery-item": {
            breakInside: "avoid",
            marginBottom: "var(--af-space-3)",
          },
        },

        // Feature grid patterns
        ".af-feature-grid-2x2": {
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "var(--af-space-4)",
        },
        ".af-feature-grid-3x3": {
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: "var(--af-space-4)",
        },

        // Dashboard layouts
        ".af-dashboard-grid": {
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "auto auto 1fr",
          gap: "var(--af-space-4)",
          minHeight: "100vh",
        },
        ".af-dashboard-header": {
          gridColumn: "1 / -1",
          gridRow: "1",
        },
        ".af-dashboard-nav": {
          gridColumn: "1 / -1",
          gridRow: "2",
        },
        ".af-dashboard-sidebar": {
          gridColumn: "1 / 3",
          gridRow: "3",
        },
        ".af-dashboard-main": {
          gridColumn: "3 / -1",
          gridRow: "3",
        },

        // Content layouts
        ".af-content-layout": {
          display: "grid",
          gridTemplateColumns: "1fr min(65ch, 100%) 1fr",
          gap: "var(--af-space-4)",
          "& > *": {
            gridColumn: "2",
          },
        },
        ".af-content-wide": {
          gridColumn: "1 / -1",
        },

        // Article layout
        ".af-article-layout": {
          display: "grid",
          gridTemplateColumns: "1fr min(65ch, 90%) 250px 1fr",
          gridTemplateRows: "auto 1fr",
          gap: "var(--af-space-6)",
          maxWidth: "1200px",
          margin: "0 auto",
        },
        ".af-article-header": {
          gridColumn: "2 / 3",
          gridRow: "1",
        },
        ".af-article-content": {
          gridColumn: "2 / 3",
          gridRow: "2",
        },
        ".af-article-sidebar": {
          gridColumn: "3 / 4",
          gridRow: "1 / -1",
        },

        // Landing page sections
        ".af-section-hero": {
          display: "grid",
          gridTemplateColumns: "1fr",
          justifyItems: "center",
          textAlign: "center",
          padding: "var(--af-space-16) var(--af-space-6)",
          minHeight: "60vh",
          alignContent: "center",
        },
        ".af-section-split": {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--af-space-8)",
          alignItems: "center",
          padding: "var(--af-space-12) var(--af-space-6)",
        },
        ".af-section-feature": {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "var(--af-space-8)",
          padding: "var(--af-space-12) var(--af-space-6)",
        },

        // Responsive modifiers (using CSS Grid auto-fit/fill behavior)
        "@media (max-width: 768px)": {
          ".af-layout-holy-grail": {
            gridTemplateColumns: "1fr",
            gridTemplateAreas: `
              "header"
              "main"
              "sidebar"
              "aside"
              "footer"
            `,
          },
          ".af-layout-sidebar-left, .af-layout-sidebar-right": {
            gridTemplateColumns: "1fr",
          },
          ".af-section-split": {
            gridTemplateColumns: "1fr",
          },
          ".af-article-layout": {
            gridTemplateColumns: "1fr min(90%, 65ch) 1fr",
          },
          ".af-article-sidebar": {
            gridColumn: "2 / 3",
            gridRow: "3",
          },
        },
      });

      // Overlay utilities with strength/angle parameters and blend modes
      addUtilities({
        // Basic overlay system
        ".af-overlay": {
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "0",
            background:
              "var(--af-overlay-bg, linear-gradient(var(--af-overlay-angle, 180deg), var(--af-overlay-from, rgba(0,0,0,0.4)), var(--af-overlay-to, rgba(0,0,0,0))))",
            mixBlendMode: "var(--af-overlay-blend, normal)",
            pointerEvents: "none",
            zIndex: "1",
          },
          "& > *": {
            position: "relative",
            zIndex: "2",
          },
        },

        // Overlay strengths
        ".af-overlay-light": {
          "--af-overlay-from": "rgba(0,0,0,0.2)",
          "--af-overlay-to": "rgba(0,0,0,0)",
        },
        ".af-overlay-medium": {
          "--af-overlay-from": "rgba(0,0,0,0.4)",
          "--af-overlay-to": "rgba(0,0,0,0)",
        },
        ".af-overlay-strong": {
          "--af-overlay-from": "rgba(0,0,0,0.6)",
          "--af-overlay-to": "rgba(0,0,0,0)",
        },
        ".af-overlay-solid": {
          "--af-overlay-from": "rgba(0,0,0,0.8)",
          "--af-overlay-to": "rgba(0,0,0,0.2)",
        },

        // White overlays
        ".af-overlay-white-light": {
          "--af-overlay-from": "rgba(255,255,255,0.2)",
          "--af-overlay-to": "rgba(255,255,255,0)",
        },
        ".af-overlay-white-medium": {
          "--af-overlay-from": "rgba(255,255,255,0.4)",
          "--af-overlay-to": "rgba(255,255,255,0)",
        },
        ".af-overlay-white-strong": {
          "--af-overlay-from": "rgba(255,255,255,0.6)",
          "--af-overlay-to": "rgba(255,255,255,0)",
        },

        // Colored overlays using semantic colors
        ".af-overlay-primary": {
          "--af-overlay-from": "var(--af-color-primary-500)",
          "--af-overlay-to": "transparent",
        },
        ".af-overlay-accent": {
          "--af-overlay-from": "var(--af-color-accent-500)",
          "--af-overlay-to": "transparent",
        },

        // Overlay directions/angles
        ".af-overlay-to-t": { "--af-overlay-angle": "0deg" },
        ".af-overlay-to-tr": { "--af-overlay-angle": "45deg" },
        ".af-overlay-to-r": { "--af-overlay-angle": "90deg" },
        ".af-overlay-to-br": { "--af-overlay-angle": "135deg" },
        ".af-overlay-to-b": { "--af-overlay-angle": "180deg" },
        ".af-overlay-to-bl": { "--af-overlay-angle": "225deg" },
        ".af-overlay-to-l": { "--af-overlay-angle": "270deg" },
        ".af-overlay-to-tl": { "--af-overlay-angle": "315deg" },

        // Radial overlays
        ".af-overlay-radial": {
          "--af-overlay-bg":
            "radial-gradient(circle at var(--af-overlay-position, center), var(--af-overlay-from, rgba(0,0,0,0.4)), var(--af-overlay-to, rgba(0,0,0,0)))",
        },
        ".af-overlay-radial-center": { "--af-overlay-position": "center" },
        ".af-overlay-radial-top": { "--af-overlay-position": "top" },
        ".af-overlay-radial-bottom": { "--af-overlay-position": "bottom" },
        ".af-overlay-radial-left": { "--af-overlay-position": "left" },
        ".af-overlay-radial-right": { "--af-overlay-position": "right" },

        // Spotlight effects
        ".af-overlay-spotlight": {
          "--af-overlay-bg":
            "radial-gradient(circle at var(--af-overlay-position, center), transparent 20%, rgba(0,0,0,0.8) 70%)",
        },
        ".af-overlay-vignette": {
          "--af-overlay-bg":
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)",
        },

        // Blend modes
        ".af-overlay-multiply": { "--af-overlay-blend": "multiply" },
        ".af-overlay-screen": { "--af-overlay-blend": "screen" },
        ".af-overlay-overlay-blend": { "--af-overlay-blend": "overlay" },
        ".af-overlay-soft-light": { "--af-overlay-blend": "soft-light" },
        ".af-overlay-hard-light": { "--af-overlay-blend": "hard-light" },
        ".af-overlay-color-dodge": { "--af-overlay-blend": "color-dodge" },
        ".af-overlay-color-burn": { "--af-overlay-blend": "color-burn" },
        ".af-overlay-darken": { "--af-overlay-blend": "darken" },
        ".af-overlay-lighten": { "--af-overlay-blend": "lighten" },
        ".af-overlay-difference": { "--af-overlay-blend": "difference" },
        ".af-overlay-exclusion": { "--af-overlay-blend": "exclusion" },
        ".af-overlay-hue": { "--af-overlay-blend": "hue" },
        ".af-overlay-saturation": { "--af-overlay-blend": "saturation" },
        ".af-overlay-color": { "--af-overlay-blend": "color" },
        ".af-overlay-luminosity": { "--af-overlay-blend": "luminosity" },

        // Pattern overlays
        ".af-overlay-dots": {
          "--af-overlay-bg":
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          "&::before": {
            backgroundSize: "20px 20px",
          },
        },
        ".af-overlay-grid": {
          "--af-overlay-bg":
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          "&::before": {
            backgroundSize: "20px 20px",
          },
        },
        ".af-overlay-diagonal": {
          "--af-overlay-bg":
            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)",
        },

        // Film/photo effects
        ".af-overlay-film-grain": {
          "--af-overlay-bg":
            'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPGZpbHRlciBpZD0iZ3JhaW4iPiA8ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgcmVzdWx0PSJub2lzZSIvPiA8ZmVDb2xvck1hdHJpeCBpbj0ibm9pc2UiIHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz4gPGZlQ29tcG9uZW50VHJhbnNmZXIgaW49Im5vaXNlIiByZXN1bHQ9Im5vaXNlIj4gPGZlRnVuY0EgdHlwZT0iZGlzY3JldGUiIHRhYmxlVmFsdWVzPSIuMzggLjUgLjYgLjciLz4gPC9mZUNvbXBvbmVudFRyYW5zZmVyPiA8L2ZpbHRlcj4gPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2dyYWluKSIgb3BhY2l0eT0iMC4zIi8+IDwvc3ZnPg==")',
          "&::before": {
            opacity: "0.1",
            mixBlendMode: "multiply",
          },
        },

        // Texture overlays
        ".af-overlay-noise": {
          "--af-overlay-bg":
            "url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          "&::before": {
            opacity: "0.15",
            mixBlendMode: "overlay",
          },
        },

        // Interactive overlays
        ".af-overlay-hover": {
          "&::before": {
            opacity: "0",
            transition: "opacity 0.3s ease",
          },
          "&:hover::before": {
            opacity: "1",
          },
        },

        // Background overlay (legacy support)
        ".af-bg-overlay": {
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "0",
            background:
              "linear-gradient(var(--af-overlay-angle, 180deg), var(--af-overlay-from, rgba(0,0,0,0.35)), var(--af-overlay-to, rgba(0,0,0,0)))",
            pointerEvents: "none",
            zIndex: "1",
          },
          "& > *": {
            position: "relative",
            zIndex: "2",
          },
        },
      });

      // Logical properties (inline/block/start/end) and container query helpers
      const logicalUtils: Record<string, any> = {};
      for (let i = 0; i <= tokens.spacing.steps; i++) {
        const v = `var(--af-space-${i})`;
        logicalUtils[`.af-m-inline-${i}`] = { marginInline: v };
        logicalUtils[`.af-m-block-${i}`] = { marginBlock: v };
        logicalUtils[`.af-p-inline-${i}`] = { paddingInline: v };
        logicalUtils[`.af-p-block-${i}`] = { paddingBlock: v };
        logicalUtils[`.af-ms-${i}`] = { marginInlineStart: v };
        logicalUtils[`.af-me-${i}`] = { marginInlineEnd: v };
        logicalUtils[`.af-ps-${i}`] = { paddingInlineStart: v };
        logicalUtils[`.af-pe-${i}`] = { paddingInlineEnd: v };
        if (i > 0) {
          const nv = `calc(${v} * -1)`;
          logicalUtils[`.\\-af-ms-${i}`] = { marginInlineStart: nv };
          logicalUtils[`.\\-af-me-${i}`] = { marginInlineEnd: nv };
          logicalUtils[`.\\-af-m-inline-${i}`] = { marginInline: nv };
        }
      }
      // Container query enablement
      logicalUtils[`.af-cq`] = { containerType: 'inline-size' };
      logicalUtils[`.af-cq-content`] = { containerType: 'inline-size', containerName: 'content' };
      logicalUtils[`.af-cq-layout`] = { containerType: 'inline-size', containerName: 'layout' };
      addUtilities(logicalUtils);

      // Motion helpers (animations/transitions)
      addBase({
        '@keyframes af-spin': { to: { transform: 'rotate(360deg)' } },
        '@keyframes af-pulse': {
          '50%': { opacity: '0.5' },
        },
      });
      addUtilities({
        '.af-animate-none': { animation: 'none' },
        '.af-animate-spin': { animation: 'af-spin 1s linear infinite' },
        '.af-animate-pulse': { animation: 'af-pulse 2s ease-in-out infinite' },
        '.af-transition-none': { transitionProperty: 'none' },
        '.af-transition-base': { transition: 'all 150ms ease-out' },
      });
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

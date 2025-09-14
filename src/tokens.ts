export type ColorScale = Record<string, string>;

export interface SemanticPalette {
  primary: ColorScale;
  secondary?: ColorScale;
  neutral: ColorScale;
  accent?: ColorScale;
  success?: ColorScale;
  warning?: ColorScale;
  danger?: ColorScale;
}

export interface TypographyTokens {
  baseRem: number; // 1 = 16px
  scale: number; // modular scale ratio
  minViewport: number; // px
  maxViewport: number; // px
}

export interface SpacingTokens {
  base: number; // px base step
  steps: number; // how many steps to generate
}

export interface RadiusTokens {
  none: string; sm: string; md: string; lg: string; xl: string; full: string;
}

export interface ShadowTokens {
  sm: string; md: string; lg: string; xl: string;
}

export interface Breakpoints {
  xs: number; sm: number; md: number; lg: number; xl: number; ['2xl']: number;
}

export interface ThemeModes {
  dark?: SemanticPalette;
  highContrast?: SemanticPalette;
}

export interface AutofuseTokens {
  colors: SemanticPalette;
  modes?: ThemeModes;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  shadows: ShadowTokens;
  breakpoints: Breakpoints;
}

export const defaultTokens: AutofuseTokens = {
  colors: {
    primary: { 50: '#f0f6ff', 100: '#dce9ff', 300: '#8db4ff', 500: '#3b82f6', 700: '#1d4ed8', 900: '#1e3a8a' },
    neutral: { 50: '#f8fafc', 100: '#f1f5f9', 300: '#cbd5e1', 500: '#64748b', 700: '#334155', 900: '#0f172a' },
    success: { 500: '#10b981' },
    warning: { 500: '#f59e0b' },
    danger: { 500: '#ef4444' },
  },
  modes: {
    dark: {
      primary: { 50: '#0b1220', 100: '#0e1a2e', 300: '#1e3a8a', 500: '#3b82f6', 700: '#93c5fd', 900: '#dbeafe' },
      neutral: { 50: '#0b1220', 100: '#111827', 300: '#374151', 500: '#9ca3af', 700: '#e5e7eb', 900: '#f9fafb' },
      success: { 500: '#34d399' },
      warning: { 500: '#fbbf24' },
      danger: { 500: '#f87171' },
    }
  },
  typography: { baseRem: 1, scale: 1.2, minViewport: 360, maxViewport: 1440 },
  spacing: { base: 4, steps: 20 },
  radius: { none: '0px', sm: '0.125rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', full: '9999px' },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
    xl: '0 20px 25px rgba(0,0,0,0.15)'
  },
  breakpoints: { xs: 360, sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 },
};

export function clamp(min: number, minVwPx: number, maxVwPx: number, vwMin: number, vwMax: number) {
  const slope = (maxVwPx - minVwPx) / (vwMax - vwMin);
  const yAxis = -(vwMin * slope) + minVwPx;
  return `clamp(${min.toFixed(4)}rem, calc(${(yAxis / 16).toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw), ${(maxVwPx / 16).toFixed(4)}rem)`;
}

export function buildCssVariables(tokens: AutofuseTokens) {
  const { typography, spacing, colors, modes, radius, shadows, breakpoints } = tokens;

  // Typography scale
  const sizes: Record<string, string> = {};
  const names = ['xs','sm','base','lg','xl','2xl','3xl','4xl','5xl','6xl','7xl'];
  let current = typography.baseRem;
  for (let i = 0; i < names.length; i++) {
    const minRem = current;
    const maxPx = Math.round(minRem * 16 * Math.pow(typography.scale, 2));
    const val = clamp(minRem, minRem * 16, maxPx, breakpoints.xs, breakpoints.xl);
    sizes[names[i]] = val;
    current = current * typography.scale;
  }

  // Spacing scale
  const space: Record<string, string> = {};
  for (let i = 0; i <= spacing.steps; i++) {
    const basePx = spacing.base * i;
    const maxPx = Math.round(basePx * 1.5);
    space[i] = clamp(basePx/16, basePx, maxPx, breakpoints.xs, breakpoints.lg);
  }

  // Colors (semantic variables)
  const colorVars: string[] = [];
  Object.entries(colors).forEach(([name, scale]) => {
    Object.entries(scale).forEach(([k, v]) => {
      colorVars.push(`--af-color-${name}-${k}: ${v};`);
    });
  });

  // Radius & shadows
  const radiusVars = Object.entries(radius).map(([k,v]) => `--af-radius-${k}: ${v};`);
  const shadowVars = Object.entries(shadows).map(([k,v]) => `--af-shadow-${k}: ${v};`);

  // Dark/HC mode overrides if present
  const darkColorVars: string[] = [];
  const hcColorVars: string[] = [];
  if (modes?.dark) {
    Object.entries(modes.dark).forEach(([name, scale]) => {
      Object.entries(scale).forEach(([k, v]) => {
        darkColorVars.push(`--af-color-${name}-${k}: ${v};`);
      });
    });
  }
  if (modes?.highContrast) {
    Object.entries(modes.highContrast).forEach(([name, scale]) => {
      Object.entries(scale).forEach(([k, v]) => {
        hcColorVars.push(`--af-color-${name}-${k}: ${v};`);
      });
    });
  }

  return {
    sizes, space,
    css:
      `:root{${[...colorVars, ...radiusVars, ...shadowVars].join('')}}` +
      `\n:root{${Object.entries(sizes).map(([k,v])=>`--af-text-${k}:${v};`).join('')}}` +
      `\n:root{${Object.entries(space).map(([k,v])=>`--af-space-${k}:${v};`).join('')}}` +
      (darkColorVars.length ? `\n[data-theme="dark"]{${darkColorVars.join('')}}` : '') +
      (hcColorVars.length ? `\n[data-theme="hc"]{${hcColorVars.join('')}}` : '')
  };
}

export function defineConfig<T extends Partial<AutofuseTokens>>(config: T): T {
  return config;
}

type ColorScale = Record<string, string>;
interface SemanticPalette {
    primary: ColorScale;
    secondary?: ColorScale;
    neutral: ColorScale;
    accent?: ColorScale;
    success?: ColorScale;
    warning?: ColorScale;
    danger?: ColorScale;
}
interface TypographyTokens {
    baseRem: number;
    scale: number;
    minViewport: number;
    maxViewport: number;
}
interface SpacingTokens {
    base: number;
    steps: number;
}
interface RadiusTokens {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
}
interface ShadowTokens {
    sm: string;
    md: string;
    lg: string;
    xl: string;
}
interface Breakpoints {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    ['2xl']: number;
}
interface ThemeModes {
    dark?: SemanticPalette;
    highContrast?: SemanticPalette;
}
interface AutofuseTokens {
    colors: SemanticPalette;
    modes?: ThemeModes;
    typography: TypographyTokens;
    spacing: SpacingTokens;
    radius: RadiusTokens;
    shadows: ShadowTokens;
    breakpoints: Breakpoints;
}
declare const defaultTokens: AutofuseTokens;
declare function buildCssVariables(tokens: AutofuseTokens): {
    sizes: Record<string, string>;
    space: Record<string, string>;
    css: string;
};
declare function defineConfig<T extends Partial<AutofuseTokens>>(config: T): T;

export { type AutofuseTokens as A, defineConfig as a, buildCssVariables as b, defaultTokens as d };

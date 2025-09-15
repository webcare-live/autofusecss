import { A as AutofuseTokens } from './tokens-CFYw5wM2.cjs';
export { b as buildCssVariables, d as defaultTokens, a as defineConfig } from './tokens-CFYw5wM2.cjs';
import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { PropsWithChildren } from 'react';

interface AutofuseProviderProps {
    tokens?: Partial<AutofuseTokens>;
    theme?: "light" | "dark" | "hc";
    density?: "comfortable" | "compact";
    as?: keyof React.JSX.IntrinsicElements;
    anchorOffset?: number | string;
}
declare function AutofuseProvider({ tokens, theme: themeProp, density: densityProp, as, anchorOffset, children, }: PropsWithChildren<AutofuseProviderProps>): react_jsx_runtime.JSX.Element;

export { AutofuseProvider, type AutofuseProviderProps, AutofuseTokens };

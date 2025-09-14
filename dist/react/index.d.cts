export { AutofuseProvider, AutofuseProviderProps } from '../index.cjs';
import { A as AutofuseTokens } from '../tokens-CFYw5wM2.cjs';
import * as react_jsx_runtime from 'react/jsx-runtime';
import 'react';

interface AutofuseContextValue {
    tokens: AutofuseTokens;
    setTokens: (patch: Partial<AutofuseTokens>) => void;
    theme: "light" | "dark" | "hc";
    setTheme: (t: "light" | "dark" | "hc") => void;
    density: "comfortable" | "compact";
    setDensity: (d: "comfortable" | "compact") => void;
}
declare function useAutofuse(): AutofuseContextValue;

declare function ThemeStudio(): react_jsx_runtime.JSX.Element;

export { ThemeStudio, useAutofuse };

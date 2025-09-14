"use client";

import React, { PropsWithChildren, useMemo, useState } from "react";
import merge from "deepmerge";
import { AutofuseTokens, defaultTokens, buildCssVariables } from "../tokens.js";
import { AutofuseContext } from "./context.js";

export interface AutofuseProviderProps {
  tokens?: Partial<AutofuseTokens>;
  theme?: "light" | "dark" | "hc";
  density?: "comfortable" | "compact";
  as?: keyof React.JSX.IntrinsicElements;
}

export function AutofuseProvider({
  tokens,
  theme: themeProp = "light",
  density: densityProp = "comfortable",
  as = "div",
  children,
}: PropsWithChildren<AutofuseProviderProps>) {
  const Component: any = as;

  const [localTokens, setLocalTokens] = useState<Partial<AutofuseTokens>>({});
  const [theme, setTheme] = useState<"light" | "dark" | "hc">(themeProp);
  const [density, setDensity] = useState<"comfortable" | "compact">(densityProp);

  const merged = useMemo<AutofuseTokens>(() => {
    // default <- prop tokens <- local patches
    return merge(merge(defaultTokens, tokens || {}), localTokens || {});
  }, [tokens, localTokens]);

  const vars = useMemo(() => buildCssVariables(merged), [merged]);

  // Inline style avoids FOUC/SSR mismatch by hydrating with computed variables
  const styleTag = `/* autofusecss variables */\n${vars.css}`;

  return (
    <Component data-theme={theme} data-density={density}>
      <style dangerouslySetInnerHTML={{ __html: styleTag }} />
      <AutofuseContext.Provider
        value={{
          tokens: merged,
          setTokens: (patch) => setLocalTokens((prev) => merge(prev || {}, patch || {})),
          theme,
          setTheme,
          density,
          setDensity,
        }}
      >
        {children}
      </AutofuseContext.Provider>
    </Component>
  );
}

export default AutofuseProvider;

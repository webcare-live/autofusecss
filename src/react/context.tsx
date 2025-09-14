"use client";

import React, { createContext, useContext } from "react";
import type { AutofuseTokens } from "../tokens.js";

export interface AutofuseContextValue {
  tokens: AutofuseTokens;
  setTokens: (patch: Partial<AutofuseTokens>) => void;
  theme: "light" | "dark" | "hc";
  setTheme: (t: "light" | "dark" | "hc") => void;
  density: "comfortable" | "compact";
  setDensity: (d: "comfortable" | "compact") => void;
}

export const AutofuseContext = createContext<AutofuseContextValue | null>(null);

export function useAutofuse(): AutofuseContextValue {
  const ctx = useContext(AutofuseContext);
  if (!ctx) throw new Error("useAutofuse must be used within <AutofuseProvider>");
  return ctx;
}


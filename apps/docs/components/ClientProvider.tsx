"use client";

import React, { createContext, useContext, useMemo, useState } from 'react';
import { AutofuseProvider } from 'autofusecss/react';

type DocsConfig = { anchorOffset: number | string; setAnchorOffset: (v: number | string) => void };
const DocsConfigContext = createContext<DocsConfig | null>(null);
export function useDocsConfig() {
  const ctx = useContext(DocsConfigContext);
  if (!ctx) throw new Error('useDocsConfig must be used within ClientProvider');
  return ctx;
}

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const [anchorOffset, setAnchorOffset] = useState<number | string>(() => {
    if (typeof window === 'undefined') return 80;
    const v = localStorage.getItem('af-anchor-offset');
    return v ? (isNaN(Number(v)) ? v : Number(v)) : 80;
  });
  const ctx = useMemo<DocsConfig>(() => ({ anchorOffset, setAnchorOffset: (v) => { setAnchorOffset(v); try { localStorage.setItem('af-anchor-offset', String(v)); } catch {} } }), [anchorOffset]);

  return (
    <DocsConfigContext.Provider value={ctx}>
      <AutofuseProvider anchorOffset={anchorOffset}>{children}</AutofuseProvider>
    </DocsConfigContext.Provider>
  );
}

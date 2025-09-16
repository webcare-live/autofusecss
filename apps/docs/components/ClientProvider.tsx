"use client";

import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { AutofuseProvider } from 'autofusecss/react';
import { modernTokens } from 'autofusecss';

type DocsConfig = { anchorOffset: number | string; setAnchorOffset: (v: number | string) => void };
const DocsConfigContext = createContext<DocsConfig | null>(null);
export function useDocsConfig() {
  const ctx = useContext(DocsConfigContext);
  if (!ctx) throw new Error('useDocsConfig must be used within ClientProvider');
  return ctx;
}

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  // Use a deterministic initial value for SSR to prevent hydration mismatches.
  const [anchorOffset, setAnchorOffset] = useState<number | string>(80);
  // Load any persisted value after hydration.
  useEffect(() => {
    try {
      const v = localStorage.getItem('af-anchor-offset');
      if (v != null) setAnchorOffset(isNaN(Number(v)) ? v : Number(v));
    } catch {}
  }, []);
  const ctx = useMemo<DocsConfig>(() => ({ anchorOffset, setAnchorOffset: (v) => { setAnchorOffset(v); try { localStorage.setItem('af-anchor-offset', String(v)); } catch {} } }), [anchorOffset]);

  return (
    <DocsConfigContext.Provider value={ctx}>
      <AutofuseProvider
        tokens={modernTokens}
        theme="dark"
        density="compact"
        anchorOffset={anchorOffset}
      >
        {children}
      </AutofuseProvider>
    </DocsConfigContext.Provider>
  );
}

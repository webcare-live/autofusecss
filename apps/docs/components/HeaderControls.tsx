"use client";

import React, { useEffect } from 'react';
import { useDocsConfig } from './ClientProvider';
import { useAutofuse } from 'autofusecss/react';

export default function HeaderControls() {
  const { anchorOffset, setAnchorOffset } = useDocsConfig();
  const { theme, setTheme, density, setDensity } = useAutofuse();

  // Load persisted theme/density once
  useEffect(() => {
    try {
      const t = localStorage.getItem('af-theme');
      const d = localStorage.getItem('af-density');
      if (t === 'light' || t === 'dark' || t === 'hc') setTheme(t as any);
      if (d === 'comfortable' || d === 'compact') setDensity(d as any);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on change
  useEffect(() => { try { localStorage.setItem('af-theme', theme); } catch {} }, [theme]);
  useEffect(() => { try { localStorage.setItem('af-density', density); } catch {} }, [density]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === '/') {
        const el = document.getElementById('af-docs-search') as HTMLInputElement | null;
        if (el) { e.preventDefault(); el.focus(); }
      }
      if (e.key.toLowerCase() === 'd') {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }
      if (e.key.toLowerCase() === 'c') {
        setDensity(density === 'compact' ? 'comfortable' : 'compact');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [theme, density, setTheme, setDensity]);

  const initialUnit = typeof anchorOffset === 'string' && String(anchorOffset).includes('rem') ? 'rem' : 'px';
  const [unit, setUnit] = React.useState<'px' | 'rem'>(initialUnit as any);
  const numeric = typeof anchorOffset === 'number' ? anchorOffset : parseFloat(String(anchorOffset)) || 80;
  const update = (n: number, u: 'px' | 'rem') => setAnchorOffset(u === 'px' ? n : `${(n / 16).toFixed(3)}rem`);

  return (
    <>
    <div className="af-controls-row">
      {/* Theme */}
      <div role="group" aria-label="Theme" className="af-segment">
        <button
          onClick={() => setTheme('light')}
          className={`af-nav-link ${theme === 'light' ? 'af-nav-link-primary' : ''}`}
        >Light</button>
        <button
          onClick={() => setTheme('dark')}
          className={`af-nav-link ${theme === 'dark' ? 'af-nav-link-primary' : ''}`}
        >Dark</button>
      </div>
      {/* Density */}
      <div role="group" aria-label="Density" className="af-segment">
        <button
          onClick={() => setDensity('comfortable')}
          className={`af-nav-link ${density === 'comfortable' ? 'af-nav-link-primary' : ''}`}
        >Comfort</button>
        <button
          onClick={() => setDensity('compact')}
          className={`af-nav-link ${density === 'compact' ? 'af-nav-link-primary' : ''}`}
        >Compact</button>
      </div>
      {/* Anchor offset (compact) */}
      <label className="af-text-sm af-text-muted">
        Anchor
        <input
          type="number"
          value={numeric}
          onChange={(e) => update(Number(e.target.value), unit)}
          className="af-input af-input-num"
        />
        <select
          value={unit}
          onChange={(e) => { const u = e.target.value as 'px' | 'rem'; setUnit(u); update(numeric, u); }}
          className="af-select"
        >
          <option value="px">px</option>
          <option value="rem">rem</option>
        </select>
      </label>
      {/* Reset */}
      <button
        className="af-btn af-btn-outline"
        onClick={() => {
          try {
            localStorage.removeItem('af-theme');
            localStorage.removeItem('af-density');
            localStorage.removeItem('af-anchor-offset');
          } catch {}
          setTheme('dark');
          setDensity('compact');
          setAnchorOffset(80);
          setUnit('px');
        }}
        title="Reset theme, density, and anchor"
      >
        Reset
      </button>
    </div>
      <div className="af-hint" aria-hidden="true">
        Shortcuts: <span className="af-kbd">/</span> search • <span className="af-kbd">d</span> theme • <span className="af-kbd">c</span> density
      </div>
  </>
  );
}

"use client";

import React from 'react';
import { useDocsConfig } from './ClientProvider';

export default function HeaderControls() {
  const { anchorOffset, setAnchorOffset } = useDocsConfig();
  const initialUnit = typeof anchorOffset === 'string' && String(anchorOffset).includes('rem') ? 'rem' : 'px';
  const [unit, setUnit] = React.useState<'px' | 'rem'>(initialUnit as any);
  const numeric = typeof anchorOffset === 'number' ? anchorOffset : parseFloat(String(anchorOffset)) || 80;
  const update = (n: number, u: 'px' | 'rem') => {
    setAnchorOffset(u === 'px' ? n : `${(n / 16).toFixed(3)}rem`);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <label style={{ fontSize: 'var(--af-text-sm)', color: 'var(--af-color-neutral-500)' }}>
        Anchor offset
        <input
          type="number"
          value={numeric}
          onChange={(e) => update(Number(e.target.value), unit)}
          style={{ marginLeft: 6, width: 80, border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', padding: '0.125rem 0.25rem' }}
        />
        <select value={unit} onChange={(e) => { const u = e.target.value as 'px' | 'rem'; setUnit(u); update(numeric, u); }} style={{ marginLeft: 6, border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', padding: '0.125rem 0.25rem' }}>
          <option value="px">px</option>
          <option value="rem">rem</option>
        </select>
      </label>
    </div>
  );
}

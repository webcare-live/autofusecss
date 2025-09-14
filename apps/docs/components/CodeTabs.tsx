"use client";

import React, { useState } from 'react';

export function CodeTabs({ tabs }: { tabs: { label: string; code: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-md)' }}>
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--af-color-neutral-300)', padding: '0.25rem 0.5rem' }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ padding: '0.25rem 0.5rem', border: 0, background: 'transparent', borderBottom: i === active ? '2px solid var(--af-color-primary-500)' : '2px solid transparent' }}>{t.label}</button>
        ))}
      </div>
      <pre style={{ margin: 0, padding: '0.75rem 1rem', overflowX: 'auto' }}><code>{tabs[active]?.code}</code></pre>
    </div>
  );
}

export default CodeTabs;


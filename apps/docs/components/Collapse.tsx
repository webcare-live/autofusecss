"use client";

import React from 'react';

export default function Collapse({ id, title, children, defaultOpen = true }: { id: string; title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState<boolean>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('collapse:' + id) : null;
    return saved ? saved === '1' : defaultOpen;
  });
  React.useEffect(() => { try { localStorage.setItem('collapse:' + id, open ? '1' : '0'); } catch {} }, [id, open]);
  return (
    <div>
      <button onClick={() => setOpen((o) => !o)} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: 700, background: 'transparent', border: 0, padding: 0 }}>
        <span>{open ? '▾' : '▸'}</span>
        <span>{title}</span>
      </button>
      {open && <div style={{ marginTop: '0.25rem' }}>{children}</div>}
    </div>
  );
}


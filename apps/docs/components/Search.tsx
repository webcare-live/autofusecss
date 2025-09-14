"use client";

import React from 'react';
import Link from 'next/link';

export default function Search({ items }: { items: { href: string; label: string }[] }) {
  const [q, setQ] = React.useState('');
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <input
        placeholder="Search docs"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{ width: '100%', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', padding: '0.25rem 0.5rem', marginBottom: '0.5rem' }}
      />
      {q && (
        <div style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', maxHeight: 240, overflow: 'auto' }}>
          {filtered.length === 0 && <div style={{ padding: '0.5rem', color: 'var(--af-color-neutral-500)' }}>No results</div>}
          {filtered.map((i) => (
            <Link key={i.href} href={i.href} style={{ display: 'block', padding: '0.25rem 0.5rem', textDecoration: 'none' }}>
              {i.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


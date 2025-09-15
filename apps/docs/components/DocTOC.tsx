"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DocTOC() {
  const [items, setItems] = React.useState<{ id: string; text: string; level: number }[]>([]);
  const [active, setActive] = React.useState<string>('');
  const pathname = usePathname();

  React.useEffect(() => {
    // Only track H2–H3 for a cleaner TOC
    const heads = Array.from(document.querySelectorAll('article h2, article h3')) as HTMLElement[];
    const all = heads.map((h) => ({ id: h.id, text: h.innerText, level: Number(h.tagName.slice(1)) }));
    setItems(all);
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => (a.target as any).offsetTop - (b.target as any).offsetTop);
      if (visible[0]) setActive((visible[0].target as HTMLElement).id);
    }, { rootMargin: '0px 0px -70% 0px', threshold: 0.1 });
    heads.forEach((h) => io.observe(h));
    return () => { io.disconnect(); };
  }, [pathname]);

  if (items.length === 0) return null;
  return (
    <div style={{ borderTop: '1px solid var(--af-color-neutral-300)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
      <div style={{ fontSize: 'var(--af-text-sm)', color: 'var(--af-color-neutral-500)', marginBottom: '0.25rem' }}>On this page</div>
      <nav style={{ display: 'grid', gap: '0.25rem' }}>
        {items.map((i) => (
          <a
            key={i.id}
            href={`#${i.id}`}
            onClick={(e) => { e.preventDefault(); document.getElementById(i.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.pushState(null, '', `#${i.id}`); }}
            style={{ paddingLeft: i.level > 1 ? (i.level - 1) * 8 : 0, color: i.id === active ? 'var(--af-color-primary-700)' : 'inherit', textDecoration: 'none' }}
          >
            {i.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

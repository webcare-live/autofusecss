import fs from 'node:fs/promises';
import path from 'node:path';
import Link from 'next/link';
import { workspaceDocsRoot } from '../../lib/mdx';

export default async function UtilitiesPage() {
  const utilDir = path.join(workspaceDocsRoot(), 'utilities');
  const files = (await fs.readdir(utilDir)).filter((f) => f.endsWith('.md')).sort();
  return (
    <div className="af-stack-4">
      <h1 className="af-text-3xl">Utilities</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {files.map((f) => {
          const name = f.replace(/\.md$/, '');
          return (
            <Link key={f} href={`/doc/utilities/${name}`}
              style={{ display: 'block', padding: '1rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-md)', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ fontWeight: 600 }}>{name.replace(/-/g, ' ')}</div>
              <div style={{ fontSize: 'var(--af-text-sm)', color: 'var(--af-color-neutral-500)' }}>Documentation</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}


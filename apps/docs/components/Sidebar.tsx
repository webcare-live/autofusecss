import fs from 'node:fs/promises';
import path from 'node:path';
import Link from 'next/link';
import Search from './Search';
import { workspaceDocsRoot } from '../lib/mdx';

export default async function Sidebar() {
  const root = workspaceDocsRoot();
  const files = (await fs.readdir(root)).filter((f) => f.endsWith('.md')).sort();
  const utilDir = path.join(root, 'utilities');
  const utilFiles = (await fs.readdir(utilDir)).filter((f) => f.endsWith('.md')).sort();

  const searchItems = [
    ...files.map((f) => ({ href: `/doc/${f.replace(/\.md$/, '')}`, label: f.replace(/\.md$/, '') })),
    ...utilFiles.map((f) => ({ href: `/doc/utilities/${f.replace(/\.md$/, '')}`, label: f.replace(/\.md$/, '') })),
  ];
  return (
    <aside style={{ position: 'sticky', top: 16, alignSelf: 'start', display: 'grid', gap: '0.5rem' }}>
      <Search items={searchItems} />
      <div style={{ fontWeight: 700 }}>Docs</div>
      <nav style={{ display: 'grid', gap: '0.25rem' }}>
        {files.map((f) => (
          <Link key={f} href={`/doc/${f.replace(/\.md$/, '')}`}>{f.replace(/\.md$/, '')}</Link>
        ))}
      </nav>
      <div style={{ fontWeight: 700, marginTop: '1rem' }}>Utilities</div>
      <nav style={{ display: 'grid', gap: '0.25rem' }}>
        {utilFiles.map((f) => (
          <Link key={f} href={`/doc/utilities/${f.replace(/\.md$/, '')}`}>{f.replace(/\.md$/, '')}</Link>
        ))}
      </nav>
    </aside>
  );
}

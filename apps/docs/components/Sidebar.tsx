import fs from 'node:fs/promises';
import path from 'node:path';
import Link from 'next/link';
import Search from './Search';
import ActiveLink from './ActiveLink';
import { buildSearchIndex } from '../lib/search-index';
import Collapse from './Collapse';
import DocTOC from './DocTOC';
import { workspaceDocsRoot } from '../lib/mdx';

export default async function Sidebar() {
  const root = workspaceDocsRoot();
  const files = (await fs.readdir(root)).filter((f) => f.endsWith('.md')).sort();
  const utilDir = path.join(root, 'utilities');
  const utilFiles = (await fs.readdir(utilDir)).filter((f) => f.endsWith('.md')).sort();

  const searchItems = [
    ...files.map((f) => ({ href: `/doc/${f.replace(/\.md$/, '')}`, label: f.replace(/\.md$/, '') })),
    ...utilFiles.map((f) => ({ href: `/doc/utilities/${f.replace(/\.md$/, '')}`, label: f.replace(/\.md$/, '') })),
    ...await buildSearchIndex(),
  ];
  return (
    <aside style={{ position: 'sticky', top: 16, alignSelf: 'start', display: 'grid', gap: '0.5rem' }}>
      <Search items={searchItems} />
      <Collapse id="docs" title="Docs">
        <nav style={{ display: 'grid', gap: '0.25rem' }}>
          {files.map((f) => {
            const href = `/doc/${f.replace(/\.md$/, '')}`;
            const label = f.replace(/\.md$/, '');
            return <ActiveLink key={f} href={href}>{label}</ActiveLink>;
          })}
        </nav>
      </Collapse>
      <Collapse id="utilities" title="Utilities">
        <nav style={{ display: 'grid', gap: '0.25rem' }}>
          {utilFiles.map((f) => {
            const href = `/doc/utilities/${f.replace(/\.md$/, '')}`;
            const label = f.replace(/\.md$/, '');
            return <ActiveLink key={f} href={href}>{label}</ActiveLink>;
          })}
        </nav>
      </Collapse>
      <DocTOC />
    </aside>
  );
}

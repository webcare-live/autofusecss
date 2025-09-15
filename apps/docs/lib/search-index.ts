import path from 'node:path';
import fs from 'node:fs/promises';
import { workspaceDocsRoot } from './mdx';
import GithubSlugger from 'github-slugger';

export interface SearchItem { href: string; label: string; type: 'file' | 'heading'; }

function slugFromHeading(text: string) {
  const slugger = new GithubSlugger();
  return slugger.slug(text);
}

export async function buildSearchIndex(): Promise<SearchItem[]> {
  const root = workspaceDocsRoot();
  const utilDir = path.join(root, 'utilities');
  const entries: SearchItem[] = [];

  const files = (await fs.readdir(root)).filter((f) => f.endsWith('.md')).sort();
  for (const f of files) {
    const full = path.join(root, f);
    const base = f.replace(/\.md$/, '');
    entries.push({ href: `/doc/${base}`, label: base, type: 'file' });
    const src = await fs.readFile(full, 'utf8');
    const headings = Array.from(src.matchAll(/^\s{0,3}#{1,6}\s+(.+)$/gm), (m) => m[1]);
    for (const h of headings) {
      const slug = slugFromHeading(h);
      entries.push({ href: `/doc/${base}#${slug}`, label: h, type: 'heading' });
    }
  }

  const utils = (await fs.readdir(utilDir)).filter((f) => f.endsWith('.md')).sort();
  for (const f of utils) {
    const full = path.join(utilDir, f);
    const base = f.replace(/\.md$/, '');
    entries.push({ href: `/doc/utilities/${base}`, label: base, type: 'file' });
    const src = await fs.readFile(full, 'utf8');
    const headings = Array.from(src.matchAll(/^\s{0,3}#{1,6}\s+(.+)$/gm), (m) => m[1]);
    for (const h of headings) {
      const slug = slugFromHeading(h);
      entries.push({ href: `/doc/utilities/${base}#${slug}`, label: h, type: 'heading' });
    }
  }

  return entries;
}


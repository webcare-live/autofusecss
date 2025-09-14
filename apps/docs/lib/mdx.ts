import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import fs from 'node:fs/promises';
import path from 'node:path';
import dynamic from 'next/dynamic';

const Callout = dynamic(() => import('../components/Callout')); // client component
const CodeTabs = dynamic(() => import('../components/CodeTabs'));
const Playground = dynamic(() => import('../components/Playground'));

export async function loadDocByPath(filePath: string) {
  const source = await fs.readFile(filePath, 'utf8');
  const { content } = await compileMDX({
    source,
    options: { mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } },
    components: { Callout: Callout as any, CodeTabs: CodeTabs as any, Playground: Playground as any } as any,
  });
  return content;
}

export function workspaceDocsRoot() {
  // ../../docs from apps/docs
  return path.resolve(process.cwd(), '../../docs');
}

export async function listDocs(dir = workspaceDocsRoot()) {
  const entries = await fs.readdir(dir);
  return entries.filter((f) => f.endsWith('.md')).sort();
}

export function filePathFromSlug(slug: string[]) {
  const root = workspaceDocsRoot();
  const fp = path.join(root, ...slug) + (slug[slug.length - 1].endsWith('.md') ? '' : '.md');
  return fp;
}

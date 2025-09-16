import { notFound } from 'next/navigation';
import path from 'node:path';
import fs from 'node:fs/promises';
import { filePathFromSlug, loadDocByPath } from '../../../lib/mdx';

// Next.js 15: params are async (Promise)
export default async function DocPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  if (slug.length === 0) return notFound();
  const fp = filePathFromSlug(slug);
  try {
    await fs.stat(fp);
  } catch {
    return notFound();
  }
  const content = await loadDocByPath(fp);
  return (
    <article className="af-stack-4">
      {content}
      <footer style={{ fontSize: 'var(--af-text-sm)', color: 'var(--af-color-neutral-500)' }}>
        Source: <code>{path.relative(process.cwd(), fp)}</code>
      </footer>
    </article>
  );
}

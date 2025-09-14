Docs Components (MDX)

We ship simple MDX components for interactive docs in the Next.js site.

Available components
- `Callout` — content box with types: `info | warn | success | danger`
- `CodeTabs` — switch between multiple code blocks
- `Playground` — live React code editor/preview (uses react-live)

Usage

```mdx
<Callout type="info">Heads up! This utility is fluid by default.</Callout>

<CodeTabs tabs={[
  { label: 'React', code: `<div className="af-card">Hello</div>` },
  { label: 'HTML', code: `<div class=\"af-card\">Hello</div>` }
]} />

<Playground code={`() => <button className=\"af-btn af-btn-primary\">Click</button>`} />
```

These components are wired automatically in the docs renderer (`apps/docs/lib/mdx.ts`).


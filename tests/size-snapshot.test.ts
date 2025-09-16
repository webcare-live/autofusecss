import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { buildCssVariables, defaultTokens } from '../src/tokens';

function extractSelectors(css: string): string[] {
  const rules: string[] = css.match(/[^{}]+\s*\{[^}]*\}/g) || [];
  return rules.map(r => r.split('{')[0].trim()).filter(Boolean);
}

describe('bundle size snapshot', () => {
  it('base css + vars above minimal threshold', () => {
    const base = readFileSync('src/css/styles.css','utf8');
    const vars = buildCssVariables(defaultTokens).css;
    const out = `${vars}\n${base}`;
    const size = Buffer.byteLength(out,'utf8');
    const selectors = extractSelectors(out);
    expect(size).toBeGreaterThan(4_000); // sanity threshold
    expect(selectors.length).toBeGreaterThan(60);
  });
});


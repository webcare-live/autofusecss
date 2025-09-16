import { describe, it, expect, vi } from 'vitest';

vi.mock('tailwindcss/plugin', () => ({
  default: (handler: any) => {
    // Return a function that Tailwind would call with its API
    return (api: any) => handler(api);
  },
}));

import { defaultTokens, buildCssVariables } from '../src/tokens';
import autofusePlugin from '../src/tailwind';

describe('autofusecss smoke', () => {
  it('builds CSS variables from tokens', () => {
    const result = buildCssVariables(defaultTokens);
    expect(result.css).toContain(':root');
    expect(result.css).toContain('--af-text-base');
    expect(result.css).toContain('--af-color-primary-500');
  });

  it('registers tailwind utilities via plugin', () => {
    const counters = { base: 0, utils: 0, variants: 0 };
    const run = autofusePlugin();
    run({
      addBase: () => { counters.base++; },
      addUtilities: (obj: Record<string, any>) => { counters.utils += Object.keys(obj || {}).length; },
      addVariant: () => { counters.variants++; },
    });
    expect(counters.base).toBeGreaterThan(0);
    expect(counters.utils).toBeGreaterThan(50);
  });
});


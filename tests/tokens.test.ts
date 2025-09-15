import { describe, it, expect } from 'vitest';
import { defaultTokens, buildCssVariables, clamp } from '../src/tokens';

describe('tokens', () => {
  it('clamp produces expected pattern', () => {
    const v = clamp(1, 16, 24, 360, 1440);
    expect(v.startsWith('clamp(')).toBe(true);
    expect(v.includes('vw')).toBe(true);
  });

  it('buildCssVariables yields sizes and space scales', () => {
    const built = buildCssVariables(defaultTokens);
    expect(built.sizes['base']).toBeTruthy();
    expect(built.space['4']).toBeTruthy();
    expect(built.css.includes(':root')).toBe(true);
  });
});


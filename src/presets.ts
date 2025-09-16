import type { AutofuseTokens } from './tokens.js';
import { defaultTokens } from './tokens.js';

// Ultra‑modern visual preset: punchier primary, softer neutrals, larger radii,
// slightly higher type scale and smoother shadows. Meant for immediate polish in demos.
export const modernTokens: AutofuseTokens = {
  ...defaultTokens,
  colors: {
    ...defaultTokens.colors,
    primary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      300: '#a5b4fc',
      500: '#6366f1', // indigo 500 vibe
      700: '#4f46e5',
      900: '#312e81',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      300: '#d1d5db',
      500: '#6b7280',
      700: '#374151',
      900: '#0f172a',
    },
    success: { 500: '#10b981' },
    warning: { 500: '#f59e0b' },
    danger: { 500: '#ef4444' },
  },
  // Slightly smaller base and scale to avoid oversized previews
  typography: { ...defaultTokens.typography, baseRem: 0.98, scale: 1.18, maxViewport: 1440 },
  spacing: { ...defaultTokens.spacing, steps: 24 },
  radius: { ...defaultTokens.radius, md: '0.5rem', lg: '0.75rem', xl: '1rem' },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 6px 16px rgba(0,0,0,0.08)',
    lg: '0 12px 24px rgba(0,0,0,0.10)',
    xl: '0 20px 35px rgba(0,0,0,0.12)',
  },
};

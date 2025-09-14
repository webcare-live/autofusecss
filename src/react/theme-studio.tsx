"use client";

import React from "react";
import { useAutofuse } from "./context.js";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--af-space-4)', alignItems: 'center', margin: 'var(--af-space-2) 0' }}>
      <div style={{ fontSize: 'var(--af-text-sm)', color: 'var(--af-color-neutral-500)' }}>{label}</div>
      <div>{children}</div>
    </div>
  );
}

const SHADE_KEYS = ["50","100","300","500","700","900"] as const;

export function ThemeStudio() {
  const { tokens, setTokens, theme, setTheme, density, setDensity } = useAutofuse();

  const scale = tokens.typography.scale;
  const baseRem = tokens.typography.baseRem;
  const spaceBase = tokens.spacing.base;

  const setColor = (role: string, shade: string, value: string) => {
    const roleScale: Record<string, string> = { ...(tokens.colors as any)[role] };
    roleScale[shade] = value;
    setTokens({ colors: { ...tokens.colors, [role]: roleScale } as any });
  };

  const setRadius = (k: string, v: string) => setTokens({ radius: { ...tokens.radius, [k]: v } as any });
  const setShadow = (k: string, v: string) => setTokens({ shadows: { ...tokens.shadows, [k]: v } as any });

  const exportConfig = () => {
    const content = `// autofusecss config generated from ThemeStudio\nimport { defineConfig } from 'autofusecss';\n\nexport default defineConfig(${JSON.stringify(tokens, null, 2)});\n`;
    if (typeof window !== 'undefined') {
      const blob = new Blob([content], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'autofusecss.config.mjs';
      a.click();
      URL.revokeObjectURL(a.href);
    }
  };

  const saveToServer = async () => {
    try {
      await fetch('/api/tokens', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ tokens }) });
      alert('Saved tokens to /api/tokens');
    } catch (e) {
      console.error(e);
      alert('Save failed. Is the API running?');
    }
  };

  // Live updates via WebSocket (optional)
  const [wsUrl, setWsUrl] = React.useState('ws://localhost:4001');
  const [connected, setConnected] = React.useState(false);
  const wsRef = React.useRef<WebSocket | null>(null);
  const connectWs = () => {
    try { wsRef.current?.close(); } catch {}
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg?.type === 'tokens:update' && msg.tokens) {
          setTokens(msg.tokens);
        }
      } catch {}
    };
  };

  // A11y: contrast helpers
  const hexToRgb = (hex: string) => {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const n = parseInt(full, 16);
    return [ (n >> 16) & 255, (n >> 8) & 255, n & 255 ] as const;
  };
  const luminance = (hex: string) => {
    const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
    const conv = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    const [R, G, B] = [conv(r), conv(g), conv(b)];
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };
  const contrast = (fg: string, bg: string) => {
    const L1 = luminance(fg) + 0.05;
    const L2 = luminance(bg) + 0.05;
    const ratio = L1 > L2 ? L1 / L2 : L2 / L1;
    return Math.round(ratio * 100) / 100;
  };

  // Auto shade generation from a base hex (simple HSL lightness steps)
  const hexToHsl = (hex: string) => {
    const [r0, g0, b0] = hexToRgb(hex).map((v) => v / 255);
    const max = Math.max(r0, g0, b0), min = Math.min(r0, g0, b0);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r0: h = (g0 - b0) / d + (g0 < b0 ? 6 : 0); break;
        case g0: h = (b0 - r0) / d + 2; break;
        case b0: h = (r0 - g0) / d + 4; break;
      }
      h /= 6;
    }
    return [h * 360, s, l] as const;
  };
  const hslToHex = (h: number, s: number, l: number) => {
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const c = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
      return Math.round(255 * c).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };
  const generateShades = (base: string) => {
    const [h, s, l] = hexToHsl(base);
    const steps: Record<string, string> = { 50: '', 100: '', 300: '', 500: base, 700: '', 900: '' } as any;
    const light = (delta: number) => hslToHex(h, s, Math.min(0.98, l + delta));
    const dark = (delta: number) => hslToHex(h, s, Math.max(0.02, l - delta));
    steps["50"] = light(0.45);
    steps["100"] = light(0.3);
    steps["300"] = light(0.1);
    steps["700"] = dark(0.15);
    steps["900"] = dark(0.3);
    return steps;
  };

  return (
    <div style={{ display: 'block', padding: 'var(--af-space-4)', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-md)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 'var(--af-text-lg)', margin: 0 }}>Autofuse Theme Studio</h3>
        <div style={{ display: 'flex', gap: 'var(--af-space-2)' }}>
          <button onClick={exportConfig} style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>Export</button>
          <button onClick={saveToServer} style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>Save</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--af-space-2)', alignItems: 'center', marginTop: 'var(--af-space-2)' }}>
        <input type="text" value={wsUrl} onChange={(e) => setWsUrl(e.target.value)} placeholder="ws://localhost:4001" style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', padding: '0.25rem 0.5rem' }} />
        <button onClick={connectWs} style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', background: connected ? 'var(--af-color-success-500)' : 'transparent', color: connected ? 'white' : 'inherit' }}>{connected ? 'Connected' : 'Connect WS'}</button>
      </div>

      <Row label="Theme mode">
        <select value={theme} onChange={(e) => setTheme(e.target.value as any)} style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', padding: '0.25rem 0.5rem' }}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="hc">High Contrast</option>
        </select>
      </Row>

      <Row label="Density">
        <select value={density} onChange={(e) => setDensity(e.target.value as any)} style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', padding: '0.25rem 0.5rem' }}>
          <option value="comfortable">Comfortable</option>
          <option value="compact">Compact</option>
        </select>
      </Row>

      <div style={{ marginTop: 'var(--af-space-4)' }}>
        <div style={{ fontWeight: 600, marginBottom: 'var(--af-space-2)' }}>Palette</div>
        {(["primary", "neutral"] as const).map((role) => (
          <div key={role} style={{ display: 'grid', gridTemplateColumns: '120px repeat(6, minmax(0, 1fr))', gap: 'var(--af-space-2)', alignItems: 'center', marginBottom: 'var(--af-space-2)' }}>
            <div style={{ color: 'var(--af-color-neutral-500)' }}>{role}</div>
            {SHADE_KEYS.map((s) => (
              <input key={s} type="color" value={(tokens.colors as any)[role]?.[s] || '#ffffff'} onChange={(e) => setColor(role, s, e.target.value)} />
            ))}
          </div>
        ))}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button onClick={() => setTokens({ colors: { ...tokens.colors, primary: generateShades((tokens.colors as any).primary?.["500"] || '#3b82f6') } as any })} style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>Auto‑generate Primary Shades</button>
          <input type="file" accept="application/json" onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; try { const txt = await f.text(); setTokens(JSON.parse(txt)); } catch { alert('Invalid JSON'); } }} />
        </div>
      </div>

      <div style={{ marginTop: 'var(--af-space-4)' }}>
        <div style={{ fontWeight: 600, marginBottom: 'var(--af-space-2)' }}>Typography</div>
        <Row label={`Scale (${scale.toFixed(2)})`}>
          <input type="range" min={1.05} max={1.5} step={0.01} value={scale} onChange={(e) => setTokens({ typography: { ...tokens.typography, scale: Number(e.target.value) } as any })} />
        </Row>
        <Row label={`Base size (rem) (${baseRem})`}>
          <input type="range" min={0.75} max={1.25} step={0.01} value={baseRem} onChange={(e) => setTokens({ typography: { ...tokens.typography, baseRem: Number(e.target.value) } as any })} />
        </Row>
      </div>

      <div style={{ marginTop: 'var(--af-space-4)' }}>
        <div style={{ fontWeight: 600, marginBottom: 'var(--af-space-2)' }}>Spacing</div>
        <Row label={`Base step (px) (${spaceBase})`}>
          <input type="range" min={2} max={8} step={1} value={spaceBase} onChange={(e) => setTokens({ spacing: { ...tokens.spacing, base: Number(e.target.value) } as any })} />
        </Row>
      </div>

      <div style={{ marginTop: 'var(--af-space-4)' }}>
        <div style={{ fontWeight: 600, marginBottom: 'var(--af-space-2)' }}>Radius</div>
        {Object.entries(tokens.radius).map(([k, v]) => (
          <Row key={k} label={k}>
            <input type="text" value={v} onChange={(e) => setRadius(k, e.target.value)} />
          </Row>
        ))}
      </div>

      <div style={{ marginTop: 'var(--af-space-4)' }}>
        <div style={{ fontWeight: 600, marginBottom: 'var(--af-space-2)' }}>Shadows</div>
        {Object.entries(tokens.shadows).map(([k, v]) => (
          <Row key={k} label={k}>
            <input type="text" value={v} onChange={(e) => setShadow(k, e.target.value)} />
          </Row>
        ))}
      </div>

      <div style={{ display: 'grid', gap: 'var(--af-space-2)', marginTop: 'var(--af-space-4)' }}>
        <div style={{ fontSize: 'var(--af-text-sm)', color: 'var(--af-color-neutral-500)' }}>Preview</div>
        <div style={{ display: 'grid', gap: 'var(--af-space-2)', padding: 'var(--af-space-4)', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-md)' }}>
          <h1 style={{ fontSize: 'var(--af-text-3xl)', color: 'var(--af-color-primary-700)', margin: 0 }}>Heading H1</h1>
          <p style={{ fontSize: 'var(--af-text-base)', margin: 0 }}>Body text scales with viewport width.</p>
          <button style={{ backgroundColor: 'var(--af-color-primary-500)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--af-radius-md)', border: 0 }}>Button</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--af-space-2)' }}>
          {(() => {
            const p700 = (tokens.colors as any).primary?.["700"] || '#1d4ed8';
            const n50 = (tokens.colors as any).neutral?.["50"] || '#f8fafc';
            const n900 = (tokens.colors as any).neutral?.["900"] || '#0f172a';
            const c1 = contrast(p700, n50); const c2 = contrast(p700, n900);
            const passAA1 = c1 >= 4.5; const passAA2 = c2 >= 4.5;
            return (
              <>
                <div style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', padding: '0.75rem' }}>
                  <div style={{ background: n50, color: p700, padding: '0.5rem', borderRadius: 'var(--af-radius-sm)' }}>Text sample</div>
                  <div style={{ fontSize: 'var(--af-text-sm)' }}>Contrast: {c1}:1 {passAA1 ? '✓ AA' : '✕'}</div>
                </div>
                <div style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', padding: '0.75rem' }}>
                  <div style={{ background: n900, color: p700, padding: '0.5rem', borderRadius: 'var(--af-radius-sm)' }}>Text sample</div>
                  <div style={{ fontSize: 'var(--af-text-sm)' }}>Contrast: {c2}:1 {passAA2 ? '✓ AA' : '✕'}</div>
                </div>
                <div />
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

export default ThemeStudio;

"use client";

import React from "react";
import merge from "deepmerge";
import { converter, formatHex } from "culori";
import { useAutofuse } from "./context.js";
import { AcssImportWizard } from "./acss-import.js";

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

  // WS broadcast helpers
  const wsRef = React.useRef<WebSocket | null>(null);
  const clientId = React.useRef(Math.random().toString(36).slice(2));
  const applyPatch = (patch: any) => {
    setTokens(patch);
    try {
      const next = merge(tokens as any, patch as any);
      wsRef.current?.send(JSON.stringify({ type: 'tokens:update', clientId: clientId.current, tokens: next }));
    } catch {}
  };

  const setColor = (role: string, shade: string, value: string) => {
    const roleScale: Record<string, string> = { ...(tokens.colors as any)[role] };
    roleScale[shade] = value;
    applyPatch({ colors: { ...tokens.colors, [role]: roleScale } as any });
  };

  const setRadius = (k: string, v: string) => applyPatch({ radius: { ...tokens.radius, [k]: v } as any });
  const setShadow = (k: string, v: string) => applyPatch({ shadows: { ...tokens.shadows, [k]: v } as any });

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

  const copyTailwindConfig = async () => {
    const cfg = `// tailwind.config.js\nmodule.exports = {\n  content: [\"./src/**/*.{js,ts,jsx,tsx}\"],\n  plugins: [require('autofusecss/tailwind')({ tokens: ${JSON.stringify(tokens, null, 2)} })]\n};\n`;
    try { await navigator.clipboard.writeText(cfg); alert('Tailwind config copied'); } catch {}
  };

  // Presets (save/load to localStorage)
  const [presetName, setPresetName] = React.useState('default');
  const [presetKey, setPresetKey] = React.useState('');
  const getPresets = (): Record<string, any> => {
    try { return JSON.parse(localStorage.getItem('af-presets') || '{}'); } catch { return {}; }
  };
  const savePreset = () => {
    try { const p = getPresets(); p[presetName || 'preset'] = tokens; localStorage.setItem('af-presets', JSON.stringify(p)); alert('Preset saved'); } catch {}
  };
  const loadPreset = () => {
    try { const p = getPresets(); const data = p[presetKey]; if (data) applyPatch(data); } catch {}
  };
  const deletePreset = () => {
    try { const p = getPresets(); delete p[presetKey]; localStorage.setItem('af-presets', JSON.stringify(p)); setPresetKey(''); } catch {}
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
  const [room, setRoom] = React.useState<string>(() => (typeof window !== 'undefined' ? localStorage.getItem('af-room') || 'default' : 'default'));
  const [token, setToken] = React.useState<string>(() => (typeof window !== 'undefined' ? localStorage.getItem('af-token') || '' : ''));
  const [connected, setConnected] = React.useState(false);
  const connectWs = () => {
    try { wsRef.current?.close(); } catch {}
    if (typeof window !== 'undefined') { try { localStorage.setItem('af-room', room); localStorage.setItem('af-token', token); } catch {} }
    const url = `${wsUrl.replace(/\/$/, '')}/ws?room=${encodeURIComponent(room)}${token ? `&token=${encodeURIComponent(token)}` : ''}`;
    const ws = new WebSocket(url);
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

  // OKLCH shades using culori
  const toOklch = converter('oklch');
  const toRgb = converter('rgb');
  const oklchToHex = (l: number, c: number, h: number) => formatHex(toRgb({ mode: 'oklch', l, c, h }) as any);
  const generateOklchShades = (base: string) => {
    const ok = toOklch(base) as any;
    const make = (l: number) => oklchToHex(l, ok.c, ok.h);
    return {
      50: make(Math.min(0.98, ok.l + 0.4)),
      100: make(Math.min(0.95, ok.l + 0.25)),
      300: make(Math.min(0.9, ok.l + 0.1)),
      500: formatHex(toRgb(ok) as any),
      700: make(Math.max(0.2, ok.l - 0.15)),
      900: make(Math.max(0.05, ok.l - 0.3)),
    } as any;
  };

  // AAA contrast auto-fix for foreground vs background using OKLCH L adjustments
  const adjustForContrastAAA = (fgHex: string, bgHex: string) => {
    const ok = toOklch(fgHex) as any;
    let lo = 0, hi = 1, best = ok.l, target = 7.0;
    for (let i = 0; i < 18; i++) {
      const mid = (lo + hi) / 2;
      const hex = oklchToHex(mid, ok.c, ok.h);
      const r = contrast(hex, bgHex);
      if (r >= target) { best = mid; if (ok.l > mid) hi = mid; else lo = mid; }
      else { if (ok.l > mid) lo = mid; else hi = mid; }
    }
    return oklchToHex(best, ok.c, ok.h);
  };

  const [showReport, setShowReport] = React.useState(false);

  return (
    <div style={{ display: 'block', padding: 'var(--af-space-4)', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-md)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 'var(--af-text-lg)', margin: 0 }}>Autofuse Theme Studio</h3>
        <div style={{ display: 'flex', gap: 'var(--af-space-2)' }}>
          <button onClick={exportConfig} style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>Export</button>
          <button onClick={saveToServer} style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>Save</button>
          <button onClick={copyTailwindConfig} style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>Copy Tailwind Config</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 'var(--af-space-2)', alignItems: 'center', marginTop: 'var(--af-space-2)' }}>
        <input type="text" value={wsUrl} onChange={(e) => setWsUrl(e.target.value)} placeholder="ws://localhost:4001" style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', padding: '0.25rem 0.5rem' }} />
        <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="room" style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', padding: '0.25rem 0.5rem' }} />
        <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="token (optional)" style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', padding: '0.25rem 0.5rem' }} />
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
          <button onClick={() => applyPatch({ colors: { ...tokens.colors, primary: generateShades((tokens.colors as any).primary?.["500"] || '#3b82f6') } as any })} style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>Auto‑generate Primary Shades</button>
          <button onClick={() => applyPatch({ colors: { ...tokens.colors, primary: generateOklchShades((tokens.colors as any).primary?.["500"] || '#3b82f6') } as any })} style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>OKLCH Shades</button>
          <input type="file" accept="application/json" onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; try { const txt = await f.text(); applyPatch(JSON.parse(txt)); } catch { alert('Invalid JSON'); } }} />
        </div>
      </div>

      <div style={{ marginTop: 'var(--af-space-4)' }}>
        <div style={{ fontWeight: 600, marginBottom: 'var(--af-space-2)' }}>Presets</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--af-space-2)' }}>
          <input type="text" placeholder="Preset name" value={presetName} onChange={(e) => setPresetName(e.target.value)} style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', padding: '0.25rem 0.5rem' }} />
          <button onClick={savePreset} style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>Save Preset</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 'var(--af-space-2)', marginTop: '0.5rem' }}>
          <select value={presetKey} onChange={(e) => setPresetKey(e.target.value)} style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', padding: '0.25rem 0.5rem' }}>
            <option value="">Select preset…</option>
            {Object.keys((() => { try { return JSON.parse(localStorage.getItem('af-presets') || '{}'); } catch { return {}; } })()).map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
          <button onClick={loadPreset} style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>Load</button>
          <button onClick={deletePreset} style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>Delete</button>
        </div>
      </div>

      <div style={{ marginTop: 'var(--af-space-4)' }}>
        <AcssImportWizard current={tokens as any} onApply={(patch) => applyPatch(patch)} />
      </div>

      <div style={{ marginTop: 'var(--af-space-4)' }}>
        <div style={{ fontWeight: 600, marginBottom: 'var(--af-space-2)' }}>Typography</div>
        <Row label={`Scale (${scale.toFixed(2)})`}>
          <input type="range" min={1.05} max={1.5} step={0.01} value={scale} onChange={(e) => applyPatch({ typography: { ...tokens.typography, scale: Number(e.target.value) } as any })} />
        </Row>
        <Row label={`Base size (rem) (${baseRem})`}>
          <input type="range" min={0.75} max={1.25} step={0.01} value={baseRem} onChange={(e) => applyPatch({ typography: { ...tokens.typography, baseRem: Number(e.target.value) } as any })} />
        </Row>
      </div>

      <div style={{ marginTop: 'var(--af-space-4)' }}>
        <div style={{ fontWeight: 600, marginBottom: 'var(--af-space-2)' }}>Spacing</div>
        <Row label={`Base step (px) (${spaceBase})`}>
          <input type="range" min={2} max={8} step={1} value={spaceBase} onChange={(e) => applyPatch({ spacing: { ...tokens.spacing, base: Number(e.target.value) } as any })} />
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
                  {!passAA1 && <button onClick={() => applyPatch({ colors: { ...tokens.colors, primary: { ...(tokens.colors as any).primary, 700: adjustForContrastAAA(p700, n50) } } as any })} style={{ marginTop: '0.25rem', padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>Auto-fix AAA</button>}
                </div>
                <div style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', padding: '0.75rem' }}>
                  <div style={{ background: n900, color: p700, padding: '0.5rem', borderRadius: 'var(--af-radius-sm)' }}>Text sample</div>
                  <div style={{ fontSize: 'var(--af-text-sm)' }}>Contrast: {c2}:1 {passAA2 ? '✓ AA' : '✕'}</div>
                  {!passAA2 && <button onClick={() => applyPatch({ colors: { ...tokens.colors, primary: { ...(tokens.colors as any).primary, 700: adjustForContrastAAA(p700, n900) } } as any })} style={{ marginTop: '0.25rem', padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>Auto-fix AAA</button>}
                </div>
                <div />
              </>
            );
          })()}
        </div>
        <div style={{ marginTop: 'var(--af-space-2)' }}>
          <button onClick={() => setShowReport((s)=>!s)} style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>{showReport ? 'Hide' : 'Generate'} Report</button>
        </div>
        {showReport && (
          <div style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)', padding: '0.75rem' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Palette Report (ΔLCH and AA/AAA)</div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px repeat(4, minmax(0, 1fr))', gap: '0.5rem', fontSize: 'var(--af-text-sm)' }}>
              <div>Role</div>
              <div>ΔLCH(700→500)</div>
              <div>Contrast on Neutral 50</div>
              <div>Contrast on Neutral 900</div>
              <div>Notes</div>
              {Object.keys(tokens.colors).map((role) => {
                const r: any = (tokens.colors as any)[role];
                const n: any = (tokens.colors as any).neutral || {};
                const p700 = r?.['700'];
                const p500 = r?.['500'];
                const n50 = n?.['50'] || '#f8fafc';
                const n900 = n?.['900'] || '#0f172a';
                const d = (() => {
                  try {
                    const ok = (converter as any)('oklch');
                    const A: any = ok(p700);
                    const B: any = ok(p500);
                    const dL = Math.abs((A?.l ?? 0) - (B?.l ?? 0));
                    const dC = Math.abs((A?.c ?? 0) - (B?.c ?? 0));
                    let dH = Math.abs((A?.h ?? 0) - (B?.h ?? 0));
                    dH = dH > 180 ? 360 - dH : dH;
                    return `ΔL ${dL.toFixed(3)} ΔC ${dC.toFixed(3)} ΔH ${dH.toFixed(1)}°`;
                  } catch { return 'n/a'; }
                })();
                const c1 = contrast(p700 || '#000', n50);
                const c2 = contrast(p700 || '#000', n900);
                const tag = (ratio: number) => ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Fail';
                return (
                  <React.Fragment key={role}>
                    <div>{role}</div>
                    <div>{d}</div>
                    <div>{c1}:1 {tag(c1)}</div>
                    <div>{c2}:1 {tag(c2)}</div>
                    <div>{(tag(c1)==='Fail'||tag(c2)==='Fail') ? 'Consider auto-fix' : ''}</div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThemeStudio;

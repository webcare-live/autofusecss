"use client";

import React from "react";
import merge from "deepmerge";
import chroma from "chroma-js";
import type { AutofuseTokens } from "../tokens.js";
import { useAutofuse } from "./context.js";
import { AcssImportWizard } from "./acss-import.js";

// Top-level HSL helpers (used by color popover and generators)
function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
}
function hexToHsl(hex: string) {
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
}
function hslToHex(h: number, s: number, l: number) {
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const c = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * c).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="af-grid-12 af-gap-3 af-items-center mt-2 mb-2">
      <div className="af-col-span-4 text-sm text-muted-foreground">{label}</div>
      <div className="af-col-span-8 min-w-0">{children}</div>
    </div>
  );
}

const CONTROL_CLASS =
  "h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background transition";
const SELECT_CLASS = `${CONTROL_CLASS} appearance-none`;
const SMALL_CONTROL_CLASS =
  "h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background transition";
const BUTTON_PRIMARY_CLASS =
  "af-btn-modern af-btn-primary h-9 px-4 focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background transition";
const BUTTON_OUTLINE_CLASS =
  "af-btn-modern af-btn-outline h-9 px-4 focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background transition";
const BUTTON_GHOST_CLASS =
  "af-btn-modern af-btn-outline h-9 px-3 focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background transition";

const SHADE_KEYS = ["50", "100", "300", "500", "700", "900"] as const;

function clampHex(v: string) {
  const x = v.trim().replace(/^#?/, "").toUpperCase();
  if (x.length === 3 || x.length === 6) return `#${x}`;
  if (x.length > 6) return `#${x.slice(0, 6)}`;
  return `#${x.padEnd(6, '0')}`;
}

function ColorCell({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [hex, setHex] = React.useState(value);
  React.useEffect(() => setHex(value), [value]);
  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, []);
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);
  const sysRef = React.useRef<HTMLInputElement | null>(null);
  const adjust = (deltaL: number) => {
    try { const c = chroma(hex); const [l,a,b] = c.lab(); const nl = Math.max(0, Math.min(100, l + deltaL)); const out = chroma.lab(nl,a,b).hex(); setHex(out); onChange(out); } catch {}
  };
  return (
    <div style={{ position: 'relative' }} ref={ref}>
      <button type="button" className="af-color-picker" aria-label="Pick color" onClick={() => setOpen((s) => !s)} style={{ background: value }} />
      <input ref={sysRef} type="color" value={value} onChange={(e) => onChange(e.target.value)} style={{ position:'absolute', width:1, height:1, opacity:0, pointerEvents:'none' }} aria-hidden />
      {open && (
        <>
          <div className="fixed inset-0 z-overlay bg-overlay backdrop-blur-sm" aria-hidden onClick={() => setOpen(false)} />
          <div
            className="af-popover z-popover"
            role="dialog"
            aria-label="Color picker"
            aria-modal="true"
            style={{ top: '2.75rem', left: 0 }}
          >
            <div className="af-popover-row" style={{ marginBottom: '0.25rem' }}>
              <span className="af-popover-title">Color</span>
              <span className="af-color-swatch" style={{ background: hex }} />
            </div>
            <div className="af-popover-row" style={{ marginBottom: '0.25rem' }}>
              <input
                className={`${SMALL_CONTROL_CLASS} af-input-hex`}
                value={hex}
                onChange={(e) => {
                  const v = clampHex(e.target.value);
                  setHex(v);
                  onChange(v);
                }}
              />
              <button
                type="button"
                className={BUTTON_GHOST_CLASS}
                onClick={() => {
                  try { sysRef.current?.click(); } catch {}
                }}
              >
                System…
              </button>
            </div>
            <div className="af-popover-row" style={{ gap: '0.75rem', marginBottom: '0.25rem' }}>
              <label className="af-text-sm" style={{ width: '1.25rem' }}>H</label>
              {(() => {
                let [h,s,l] = hexToHsl(hex);
                return (
                  <input
                    className="af-flex-1"
                    type="range"
                    min={0}
                    max={360}
                    step={1}
                    value={h}
                    onChange={(e) => {
                      const nh = Number(e.target.value);
                      const v = hslToHex(nh, s, l);
                      setHex(v);
                      onChange(v);
                    }}
                  />
                );
              })()}
            </div>
            <div className="af-popover-row" style={{ gap: '0.75rem', marginBottom: '0.25rem' }}>
              <label className="af-text-sm" style={{ width: '1.25rem' }}>S</label>
              {(() => {
                let [h,s,l] = hexToHsl(hex);
                return (
                  <input
                    className="af-flex-1"
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={s}
                    onChange={(e) => {
                      const ns = Number(e.target.value);
                      const v = hslToHex(h, ns, l);
                      setHex(v);
                      onChange(v);
                    }}
                  />
                );
              })()}
            </div>
            <div className="af-color-actions">
              <button type="button" className={BUTTON_GHOST_CLASS} onClick={() => adjust(-10)}>-10L</button>
              <button type="button" className={BUTTON_GHOST_CLASS} onClick={() => adjust(-5)}>-5L</button>
              <button type="button" className={BUTTON_GHOST_CLASS} onClick={() => adjust(5)}>+5L</button>
              <button type="button" className={BUTTON_GHOST_CLASS} onClick={() => adjust(10)}>+10L</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function ThemeStudio() {
  const { tokens, setTokens, theme, setTheme, density, setDensity } =
    useAutofuse();

  const scale = tokens.typography.scale;
  const baseRem = tokens.typography.baseRem;
  const spaceBase = tokens.spacing.base;

  // WS broadcast helpers
  const wsRef = React.useRef<WebSocket | null>(null);
  const clientId = React.useRef<string>(Math.random().toString(36).slice(2));
  const applyPatch = (patch: Partial<AutofuseTokens>) => {
    setTokens(patch);
    try {
      const next = merge(tokens as AutofuseTokens, patch as Partial<AutofuseTokens>);
      wsRef.current?.send(
        JSON.stringify({
          type: "tokens:update",
          clientId: clientId.current,
          tokens: next,
        })
      );
    } catch {}
  };

  const setColor = (role: string, shade: string, value: string) => {
    const roleScale: Record<string, string> = {
      ...(tokens.colors as any)[role],
    };
    roleScale[shade] = value;
    applyPatch({ colors: { ...(tokens.colors as any), [role]: roleScale } as any });
  };

  const setRadius = (k: string, v: string) =>
    applyPatch({ radius: { ...tokens.radius, [k]: v } as any });
  const setShadow = (k: string, v: string) =>
    applyPatch({ shadows: { ...tokens.shadows, [k]: v } as any });

  const [copied, setCopied] = React.useState(false);
  const [exported, setExported] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [savedOk, setSavedOk] = React.useState(false);
  const [loadingTokens, setLoadingTokens] = React.useState(false);

  const exportConfig = () => {
    const content = `// autofusecss config generated from ThemeStudio\nimport { defineConfig } from 'autofusecss';\n\nexport default defineConfig(${JSON.stringify(
      tokens,
      null,
      2
    )});\n`;
    if (typeof window !== "undefined") {
      const blob = new Blob([content], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "autofusecss.config.mjs";
      a.click();
      URL.revokeObjectURL(a.href);
      setExported(true);
      setTimeout(() => setExported(false), 1200);
      try { window.dispatchEvent(new CustomEvent('af:toast', { detail: { type: 'ok', msg: 'Config exported' } })); } catch {}
    }
  };

  const copyTailwindConfig = async () => {
    const cfg = `// tailwind.config.js\nmodule.exports = {\n  content: [\"./src/**/*.{js,ts,jsx,tsx}\"],\n  plugins: [require('autofusecss/tailwind')({ tokens: ${JSON.stringify(
      tokens,
      null,
      2
    )} })]\n};\n`;
    try {
      await navigator.clipboard.writeText(cfg);
      setCopied(true); setTimeout(() => setCopied(false), 1200);
      try { window.dispatchEvent(new CustomEvent('af:toast', { detail: { type: 'ok', msg: 'Tailwind config copied' } })); } catch {}
    } catch { try { window.dispatchEvent(new CustomEvent('af:toast', { detail: { type: 'err', msg: 'Copy failed' } })); } catch {} }
  };

  // Presets (save/load to localStorage)
  const [presetName, setPresetName] = React.useState<string>("default");
  const [presetKey, setPresetKey] = React.useState<string>("");
  const getPresets = (): Record<string, AutofuseTokens> => {
    try {
      return JSON.parse(localStorage.getItem("af-presets") || "{}") as Record<string, AutofuseTokens>;
    } catch {
      return {};
    }
  };
  const savePreset = () => {
    try {
      const p = getPresets();
      p[presetName || "preset"] = tokens;
      localStorage.setItem("af-presets", JSON.stringify(p));
      try { window.dispatchEvent(new CustomEvent('af:toast', { detail: { type: 'ok', msg: 'Preset saved' } })); } catch {}
    } catch { try { window.dispatchEvent(new CustomEvent('af:toast', { detail: { type: 'err', msg: 'Save preset failed' } })); } catch {} }
  };
  const loadPreset = () => {
    try {
      const p = getPresets();
      const data = p[presetKey];
      if (data) applyPatch(data);
    } catch {}
  };
  const deletePreset = () => {
    try {
      const p = getPresets();
      delete p[presetKey];
      localStorage.setItem("af-presets", JSON.stringify(p));
      setPresetKey("");
    } catch {}
  };

  const apiFromWs = (ws: string) => {
    try {
      const u = new URL(ws);
      const proto = u.protocol === "wss:" ? "https:" : "http:";
      return `${proto}//${u.host}`;
    } catch {
      return "";
    }
  };

  const saveToServer = async () => {
    const base = apiFromWs(wsUrl);
    const url = base ? `${base}/api/tokens?room=${encodeURIComponent(room)}` : `/api/tokens?room=${encodeURIComponent(room)}`;
    try {
      setSaving(true);
      await fetch(url, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(tokens) });
      setSavedOk(true);
      setTimeout(() => setSavedOk(false), 1200);
      try { window.dispatchEvent(new CustomEvent('af:toast', { detail: { type: 'ok', msg: 'Tokens saved' } })); } catch {}
    } catch (e) {
      console.error(e);
      try { window.dispatchEvent(new CustomEvent('af:toast', { detail: { type: 'err', msg: 'Save failed' } })); } catch {}
    } finally { setSaving(false); }
  };

  const loadFromServer = async (targetRoom?: string) => {
    const r = targetRoom || room;
    const base = apiFromWs(wsUrl);
    const url = base ? `${base}/api/tokens?room=${encodeURIComponent(r)}` : `/api/tokens?room=${encodeURIComponent(r)}`;
    try {
      setLoadingTokens(true);
      const res = await fetch(url);
      const data = await res.json();
      const t = (data && data.colors) ? data : data?.tokens;
      if (t) { applyPatch(t); try { window.dispatchEvent(new CustomEvent('af:toast', { detail: { type: 'ok', msg: 'Tokens loaded' } })); } catch {} }
      else try { window.dispatchEvent(new CustomEvent('af:toast', { detail: { type: 'err', msg: 'No tokens stored' } })); } catch {}
    } catch (e) {
      console.error(e);
      try { window.dispatchEvent(new CustomEvent('af:toast', { detail: { type: 'err', msg: 'Load failed' } })); } catch {}
    } finally { setLoadingTokens(false); }
  };

  // Live updates via WebSocket (optional)
  const [wsUrl, setWsUrl] = React.useState("ws://localhost:4001");
  const [room, setRoom] = React.useState<string>(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("af-room") || "default"
      : "default"
  );
  const [token, setToken] = React.useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("af-token") || "" : ""
  );
  const [connected, setConnected] = React.useState(false);
  const [cloneRoom, setCloneRoom] = React.useState<string>("production");
  const connectWs = () => {
    try {
      wsRef.current?.close();
    } catch {}
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("af-room", room);
        localStorage.setItem("af-token", token);
      } catch {}
    }
    const url = `${wsUrl.replace(/\/$/, "")}/ws?room=${encodeURIComponent(
      room
    )}${token ? `&token=${encodeURIComponent(token)}` : ""}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg?.type === "tokens:update" && msg.tokens) {
          setTokens(msg.tokens);
        }
      } catch {}
    };
  };

  // A11y: contrast helpers
  const hexToRgb = (hex: string) => {
    const h = hex.replace("#", "");
    const full =
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h;
    const n = parseInt(full, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
  };
  const luminance = (hex: string) => {
    const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
    const conv = (c: number) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
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
  const generateShades = (base: string) => {
    const [h, s, l] = hexToHsl(base);
    const steps: Record<string, string> = {
      50: "",
      100: "",
      300: "",
      500: base,
      700: "",
      900: "",
    } as any;
    const light = (delta: number) => hslToHex(h, s, Math.min(0.98, l + delta));
    const dark = (delta: number) => hslToHex(h, s, Math.max(0.02, l - delta));
    steps["50"] = light(0.45);
    steps["100"] = light(0.3);
    steps["300"] = light(0.1);
    steps["700"] = dark(0.15);
    steps["900"] = dark(0.3);
    return steps;
  };

  // OKLCH shades using chroma-js
  const generateOklchShades = (base: string) => {
    const color = chroma(base);
    // Convert to OKLCH using LAB as intermediary (chroma-js doesn't have OKLCH directly)
    const lab = color.lab();
    const [l, a, b] = lab;

    // Generate shades by adjusting lightness
    const generateShade = (lightnessFactor: number) => {
      return chroma.lab(l * lightnessFactor, a, b).hex();
    };

    return {
      50: generateShade(1.4), // Much lighter
      100: generateShade(1.25), // Lighter
      300: generateShade(1.1), // Slightly lighter
      500: color.hex(), // Base color
      700: generateShade(0.85), // Darker
      900: generateShade(0.6), // Much darker
    } as any;
  };

  // AAA contrast auto-fix for foreground vs background using LAB lightness adjustments
  const adjustForContrastAAA = (fgHex: string, bgHex: string) => {
    const fgColor = chroma(fgHex);
    const lab = fgColor.lab();
    const [l, a, b] = lab;

    let lo = 0,
      hi = 100,
      best = l,
      target = 7.0;
    for (let i = 0; i < 18; i++) {
      const mid = (lo + hi) / 2;
      const testColor = chroma.lab(mid, a, b);
      const r = contrast(testColor.hex(), bgHex);
      if (r >= target) {
        best = mid;
        if (l > mid) hi = mid;
        else lo = mid;
      } else {
        if (l > mid) lo = mid;
        else hi = mid;
      }
    }
    return chroma.lab(best, a, b).hex();
  };

  const [showReport, setShowReport] = React.useState(false);
  const [toasts, setToasts] = React.useState<Array<{ id: number; type: 'ok'|'err'; msg: string }>>([]);
  React.useEffect(() => {
    const onToast = (e: any) => {
      const id = Date.now() + Math.random();
      setToasts((q) => [...q, { id, ...(e.detail || { type: 'ok', msg: '' }) }]);
      setTimeout(() => setToasts((q) => q.filter((t) => t.id !== id)), 1800);
    };
    window.addEventListener('af:toast' as any, onToast);
    return () => window.removeEventListener('af:toast' as any, onToast);
  }, []);

  const lastToast = toasts.length ? toasts[toasts.length - 1]?.msg : '';

  return (
    <div className="af-theme-studio bg-background text-foreground border border-border shadow-lg rounded-xl">
      {toasts.length > 0 && (
        <div className="af-toast-container">
          {toasts.map((t) => (
            <div key={t.id} className={`af-toast ${t.type === 'ok' ? 'af-toast-ok' : 'af-toast-err'}`}>{t.msg}</div>
          ))}
        </div>
      )}
      <div className="af-sr-only" aria-live="polite" role="status">{saving ? 'Saving…' : savedOk ? 'Saved' : ''} {lastToast || ''}</div>
      <div className="af-studio-header sticky top-0 z-header bg-background/80 backdrop-blur border-b border-border">
        <div className="af-studio-title-section">
          <h3 className="af-studio-title">Autofuse Theme Studio</h3>
          <p className="af-studio-subtitle">Craft your perfect design system with real-time visual feedback</p>
        </div>
        <div className="af-studio-actions">
          <button
            type="button"
            onClick={exportConfig}
            className={BUTTON_OUTLINE_CLASS}
            aria-label="Export Config"
          >
            <span>💾</span>
            Export Config
            {exported && <span className="af-ghost-tip" aria-hidden>✓ Copied</span>}
          </button>
          <button
            type="button"
            onClick={saveToServer}
            className={`${BUTTON_PRIMARY_CLASS} ${saving ? 'af-btn-loading' : ''}`}
            disabled={saving}
            aria-pressed={saving}
            aria-busy={saving}
          >
            <span>💾</span>
            {saving ? 'Saving…' : savedOk ? 'Saved ✓' : 'Save'}
          </button>
          <button
            type="button"
            onClick={copyTailwindConfig}
            className={BUTTON_OUTLINE_CLASS}
            aria-label="Copy Tailwind Config"
          >
            <span>🍃</span>
            Copy Tailwind Config
            {copied && <span className="af-ghost-tip" aria-hidden>✓ Copied</span>}
          </button>
        </div>
      </div>

      <div className="af-studio-content">
        <div className="af-grid-12 af-gap-3 af-items-center">
          <div className="af-col-span-6">
            <input
              className={CONTROL_CLASS}
              type="text"
              value={wsUrl}
              onChange={(e) => setWsUrl(e.target.value)}
              placeholder="ws://localhost:4001"
            />
          </div>
          <div className="af-col-span-3">
            <input
              className={CONTROL_CLASS}
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="room"
            />
          </div>
          <div className="af-col-span-2">
            <input
              className={CONTROL_CLASS}
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="token (optional)"
            />
          </div>
          <div className="af-col-span-1">
            <button type="button" onClick={connectWs} className={BUTTON_OUTLINE_CLASS}>
              {connected ? 'Connected' : 'Connect'}
            </button>
          </div>
        </div>
      <Row label="Theme mode">
        <select className={SELECT_CLASS} value={theme} onChange={(e) => setTheme(e.target.value as any)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="hc">High Contrast</option>
        </select>
      </Row>

      <div className="mt-3">
        <div className="text-sm text-muted-foreground mb-2">Room actions</div>
        <div className="af-form-row af-cols-3">
          <input
            className={CONTROL_CLASS}
            type="text"
            placeholder="clone to room"
            value={cloneRoom}
            onChange={(e) => setCloneRoom(e.target.value)}
          />
          <button
            type="button"
            className={`${BUTTON_OUTLINE_CLASS} ${loadingTokens ? 'af-btn-loading' : ''}`}
            disabled={loadingTokens}
            onClick={() => loadFromServer()}
          >
            Load
          </button>
          <button
            type="button"
            className={`${BUTTON_PRIMARY_CLASS} ${saving ? 'af-btn-loading' : ''}`}
            disabled={saving}
            onClick={saveToServer}
          >
            {saving ? 'Saving…' : savedOk ? 'Saved ✓' : 'Save'}
          </button>
        </div>
        <div className="grid" style={{ gridTemplateColumns: '1fr auto', gap: 'var(--af-space-2)', marginTop: 'var(--af-space-2)' }}>
          <button
            type="button"
            onClick={async () => {
              const base = apiFromWs(wsUrl);
              const url = base ? `${base}/api/tokens?room=${encodeURIComponent(cloneRoom)}` : `/api/tokens?room=${encodeURIComponent(cloneRoom)}`;
              try {
                await fetch(url, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(tokens) });
                try { window.dispatchEvent(new CustomEvent('af:toast', { detail: { type: 'ok', msg: `Cloned to ${cloneRoom}` } })); } catch {}
              } catch {
                try { window.dispatchEvent(new CustomEvent('af:toast', { detail: { type: 'err', msg: 'Clone failed' } })); } catch {}
              }
            }}
            className={BUTTON_OUTLINE_CLASS}
          >
            Clone to room
          </button>
        </div>
      </div>

      <Row label="Density">
        <select className={SELECT_CLASS} value={density} onChange={(e) => setDensity(e.target.value as any)}>
          <option value="comfortable">Comfortable</option>
          <option value="compact">Compact</option>
        </select>
      </Row>

      <div style={{ marginTop: "var(--af-space-4)" }}>
        <div style={{ fontWeight: 600, marginBottom: "var(--af-space-2)" }}>
          Palette
        </div>
        {(["primary", "neutral"] as const).map((role) => (
          <div key={role} className="af-palette-grid" style={{ marginBottom: 'var(--af-space-2)' }}>
            <div className="af-text-sm af-text-muted">{role}</div>
            {SHADE_KEYS.map((s) => (
              <ColorCell
                key={s}
                value={(tokens.colors as any)[role]?.[s] || "#ffffff"}
                onChange={(v) => setColor(role, s, v)}
              />
            ))}
          </div>
        ))}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <button
            type="button"
            className={BUTTON_OUTLINE_CLASS}
            onClick={() =>
              applyPatch({
                colors: {
                  ...tokens.colors,
                  primary: generateShades(
                    (tokens.colors as any).primary?.["500"] || "#3b82f6"
                  ),
                } as any,
              })
            }
          >
            Auto‑generate Primary Shades
          </button>
          <button
            type="button"
            className={BUTTON_OUTLINE_CLASS}
            onClick={() =>
              applyPatch({
                colors: {
                  ...tokens.colors,
                  primary: generateOklchShades(
                    (tokens.colors as any).primary?.["500"] || "#3b82f6"
                  ),
                } as any,
              })
            }
          >
            OKLCH Shades
          </button>
          <button
            type="button"
            className={BUTTON_OUTLINE_CLASS}
            onClick={() => {
              const invert = (hex: string) => {
                try { const [l,a,b] = chroma(hex).lab(); return chroma.lab(Math.max(0, Math.min(100, 100 - l)), a, b).hex(); } catch { return hex; }
              };
              const mapScale = (scale: Record<string,string>) => Object.fromEntries(Object.entries(scale).map(([k,v]) => [k, invert(v as string)]));
              const dark: any = {};
              Object.entries(tokens.colors).forEach(([name, scale]) => { dark[name] = mapScale(scale as any); });
              applyPatch({ modes: { ...(tokens.modes||{}), dark } as any });
            }}
          >
            Derive Dark Mode
          </button>
          <button
            type="button"
            className={BUTTON_OUTLINE_CLASS}
            onClick={() => {
              const boost = (hex: string) => {
                try { const c = chroma(hex); const [l,a,b] = c.lab(); const nl = l < 50 ? Math.max(15, l - 20) : Math.min(95, l + 20); return chroma.lab(nl,a,b).hex(); } catch { return hex; }
              };
              const mapScale = (scale: Record<string,string>) => Object.fromEntries(Object.entries(scale).map(([k,v]) => [k, boost(v as string)]));
              const hc: any = {};
              Object.entries(tokens.colors).forEach(([name, scale]) => { hc[name] = mapScale(scale as any); });
              applyPatch({ modes: { ...(tokens.modes||{}), highContrast: hc } as any });
            }}
          >
            Derive High‑Contrast
          </button>
          <input
            type="file"
            accept="application/json"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              try { const txt = await f.text(); applyPatch(JSON.parse(txt)); window.dispatchEvent(new CustomEvent('af:toast', { detail: { type: 'ok', msg: 'JSON applied' } })); }
              catch { try { window.dispatchEvent(new CustomEvent('af:toast', { detail: { type: 'err', msg: 'Invalid JSON' } })); } catch {} }
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: "var(--af-space-4)" }}>
        <div style={{ fontWeight: 600, marginBottom: "var(--af-space-2)" }}>
          Presets
        </div>
        <div className="af-form-row af-cols-2">
          <input
            className={CONTROL_CLASS}
            type="text"
            placeholder="Preset name"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
          />
          <button type="button" className={BUTTON_OUTLINE_CLASS} onClick={savePreset}>
            Save Preset
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            gap: "var(--af-space-2)",
            marginTop: "0.5rem",
          }}
        >
          <select className={SELECT_CLASS} value={presetKey} onChange={(e) => setPresetKey(e.target.value)}>
            <option value="">Select preset…</option>
            {Object.keys(
              (() => {
                try {
                  return JSON.parse(localStorage.getItem("af-presets") || "{}");
                } catch {
                  return {};
                }
              })()
            ).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          <button type="button" className={BUTTON_OUTLINE_CLASS} onClick={loadPreset}>
            Load
          </button>
          <button type="button" className={BUTTON_OUTLINE_CLASS} onClick={deletePreset}>
            Delete
          </button>
        </div>
      </div>

      <div style={{ marginTop: "var(--af-space-4)" }}>
        <AcssImportWizard
          current={tokens as any}
          onApply={(patch) => applyPatch(patch)}
        />
      </div>

      <div style={{ marginTop: "var(--af-space-4)" }}>
        <div style={{ fontWeight: 600, marginBottom: "var(--af-space-2)" }}>
          Typography
        </div>
        <Row label={`Scale (${scale.toFixed(2)})`}>
          <div className="af-flex af-items-center af-gap-3">
            <input
              type="range"
              min={1.05}
              max={1.5}
              step={0.01}
              value={scale}
              onChange={(e) =>
                applyPatch({
                  typography: {
                    ...tokens.typography,
                    scale: Number(e.target.value),
                  } as any,
                })
              }
              className="af-flex-1"
            />
            <input
              aria-label="Scale"
              type="number"
              step={0.01}
              value={Number(scale).toFixed(2)}
              onChange={(e) =>
                applyPatch({ typography: { ...tokens.typography, scale: Number(e.target.value) } as any })
              }
              className={`${CONTROL_CLASS} af-input-num`}
            />
          </div>
        </Row>
        <Row label={`Base size (rem) (${baseRem})`}>
          <div className="af-flex af-items-center af-gap-3">
            <input
              type="range"
              min={0.75}
              max={1.25}
              step={0.01}
              value={baseRem}
              onChange={(e) =>
                applyPatch({
                  typography: {
                    ...tokens.typography,
                    baseRem: Number(e.target.value),
                  } as any,
                })
              }
              className="af-flex-1"
            />
            <input
              aria-label="Base size rem"
              type="number"
              step={0.01}
              value={Number(baseRem).toFixed(2)}
              onChange={(e) =>
                applyPatch({ typography: { ...tokens.typography, baseRem: Number(e.target.value) } as any })
              }
              className={`${CONTROL_CLASS} af-input-num`}
            />
          </div>
        </Row>
      </div>

      <div style={{ marginTop: "var(--af-space-4)" }}>
        <div style={{ fontWeight: 600, marginBottom: "var(--af-space-2)" }}>
          Spacing
        </div>
        <Row label={`Base step (px) (${spaceBase})`}>
          <input
            type="range"
            min={2}
            max={8}
            step={1}
            value={spaceBase}
            onChange={(e) =>
              applyPatch({
                spacing: {
                  ...tokens.spacing,
                  base: Number(e.target.value),
                } as any,
              })
            }
          />
        </Row>
      </div>

      <div style={{ marginTop: "var(--af-space-4)" }}>
        <div style={{ fontWeight: 600, marginBottom: "var(--af-space-2)" }}>
          Radius
        </div>
        {Object.entries(tokens.radius).map(([k, v]) => (
          <Row key={k} label={k}>
            <input
              type="text"
              value={v}
              onChange={(e) => setRadius(k, e.target.value)}
              className={CONTROL_CLASS}
            />
          </Row>
        ))}
      </div>

      <div style={{ marginTop: "var(--af-space-4)" }}>
        <div style={{ fontWeight: 600, marginBottom: "var(--af-space-2)" }}>
          Shadows
        </div>
        {Object.entries(tokens.shadows).map(([k, v]) => (
          <Row key={k} label={k}>
            <input
              type="text"
              value={v}
              onChange={(e) => setShadow(k, e.target.value)}
              className={CONTROL_CLASS}
            />
          </Row>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gap: "var(--af-space-2)",
          marginTop: "var(--af-space-4)",
        }}
      >
        <div className="text-sm text-muted-foreground">Preview</div>
        <div className="af-preview-card">
          <div className="af-preview-grid">
            <h1 style={{ fontSize: 'var(--af-text-2xl)', color: 'var(--af-color-primary-700)', margin: 0 }}>Heading H1</h1>
            <p style={{ fontSize: 'var(--af-text-base)', margin: 0, color: 'var(--af-color-neutral-700)' }}>Body text scales with viewport width.</p>
            <button type="button" className={BUTTON_PRIMARY_CLASS} style={{ alignSelf: 'start' }}>
              Button
            </button>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "var(--af-space-2)",
          }}
        >
          {(() => {
            const p700 = (tokens.colors as any).primary?.["700"] || "#1d4ed8";
            const n50 = (tokens.colors as any).neutral?.["50"] || "#f8fafc";
            const n900 = (tokens.colors as any).neutral?.["900"] || "#0f172a";
            const c1 = contrast(p700, n50);
            const c2 = contrast(p700, n900);
            const passAA1 = c1 >= 4.5;
            const passAA2 = c2 >= 4.5;
            return (
              <>
                <div className="af-card-sm">
                  <div
                    style={{
                      background: n50,
                      color: p700,
                      padding: "0.5rem",
                      borderRadius: "var(--af-radius-sm)",
                    }}
                  >
                    Text sample
                  </div>
                  <div style={{ fontSize: "var(--af-text-sm)" }}>
                    Contrast: {c1}:1 {passAA1 ? "✓ AA" : "✕"}
                  </div>
                  {!passAA1 && (
                    <button
                      type="button"
                      className={`${BUTTON_OUTLINE_CLASS} mt-2`}
                      onClick={() =>
                        applyPatch({
                          colors: {
                            ...tokens.colors,
                            primary: {
                              ...(tokens.colors as any).primary,
                              700: adjustForContrastAAA(p700, n50),
                            },
                          } as any,
                        })
                      }
                    >
                      Auto-fix AAA
                    </button>
                  )}
                </div>
                <div className="af-card-sm">
                  <div
                    style={{
                      background: n900,
                      color: p700,
                      padding: "0.5rem",
                      borderRadius: "var(--af-radius-sm)",
                    }}
                  >
                    Text sample
                  </div>
                  <div style={{ fontSize: "var(--af-text-sm)" }}>
                    Contrast: {c2}:1 {passAA2 ? "✓ AA" : "✕"}
                  </div>
                  {!passAA2 && (
                    <button
                      type="button"
                      className={`${BUTTON_OUTLINE_CLASS} mt-2`}
                      onClick={() =>
                        applyPatch({
                          colors: {
                            ...tokens.colors,
                            primary: {
                              ...(tokens.colors as any).primary,
                              700: adjustForContrastAAA(p700, n900),
                            },
                          } as any,
                        })
                      }
                    >
                      Auto-fix AAA
                    </button>
                  )}
                </div>
                <div />
              </>
            );
          })()}
        </div>
        <div style={{ marginTop: "var(--af-space-2)" }}>
          <button type="button" className={BUTTON_OUTLINE_CLASS} onClick={() => setShowReport((s) => !s)}>
            {showReport ? "Hide" : "Generate"} Report
          </button>
        </div>
        {showReport && (
          <div className="af-card af-card-muted">
            <div className="af-report-header" style={{ marginBottom: '0.5rem' }}>Palette Report (ΔLCH and AA/AAA)</div>
            <div className="af-report-grid">
              <div className="af-report-header">Role</div>
              <div className="af-report-header">ΔLCH(700→500)</div>
              <div className="af-report-header">Contrast on Neutral 50</div>
              <div className="af-report-header">Contrast on Neutral 900</div>
              <div className="af-report-header">Notes</div>
              {Object.keys(tokens.colors).map((role) => {
                const r: any = (tokens.colors as any)[role];
                const n: any = (tokens.colors as any).neutral || {};
                const p700 = r?.["700"];
                const p500 = r?.["500"];
                const n50 = n?.["50"] || "#f8fafc";
                const n900 = n?.["900"] || "#0f172a";
                const d = (() => {
                  try {
                    const colorA = chroma(p700);
                    const colorB = chroma(p500);
                    const labA = colorA.lab();
                    const labB = colorB.lab();
                    const dL = Math.abs(labA[0] - labB[0]);
                    const dA = Math.abs(labA[1] - labB[1]);
                    const dB = Math.abs(labA[2] - labB[2]);
                    return `ΔL ${dL.toFixed(3)} Δa ${dA.toFixed(
                      3
                    )} Δb ${dB.toFixed(1)}`;
                  } catch {
                    return "n/a";
                  }
                })();
                const c1 = contrast(p700 || "#000", n50);
                const c2 = contrast(p700 || "#000", n900);
                const tag = (ratio: number) =>
                  ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "Fail";
                return (
                  <React.Fragment key={role}>
                    <div className="af-report-cell">{role}</div>
                    <div className="af-report-cell">{d}</div>
                    <div className="af-report-cell">{c1}:1 {tag(c1)}</div>
                    <div className="af-report-cell">{c2}:1 {tag(c2)}</div>
                    <div className="af-report-cell">{(tag(c1) === 'Fail' || tag(c2) === 'Fail') ? 'Consider auto-fix' : ''}</div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default ThemeStudio;

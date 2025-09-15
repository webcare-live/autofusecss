"use client";

import React from 'react';
import { converter } from 'culori';
import merge from 'deepmerge';
import type { AutofuseTokens } from '../tokens.js';

function diffCount(a: any, b: any): number {
  let c = 0;
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return a === b ? 0 : 1;
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) c += diffCount(a[k], b[k]);
  return c;
}

export function AcssImportWizard({ current, onApply }: { current: AutofuseTokens; onApply: (patch: Partial<AutofuseTokens>) => void }) {
  const [json, setJson] = React.useState<any | null>(null);
  const [include, setInclude] = React.useState<Record<string, boolean>>({ colors: true, typography: true, spacing: true, radius: true, shadows: true });
  const [error, setError] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<Record<string, Record<string, boolean>>>({});

  const handleFile = async (f: File | null) => {
    if (!f) return;
    const text = await f.text();
    try { setJson(JSON.parse(text)); setError(null); } catch { setError('Invalid JSON'); }
  };

  // initialize per-shade selection on JSON load
  React.useEffect(() => {
    if (!json?.colors) { setSelected({}); return; }
    const next: Record<string, Record<string, boolean>> = {};
    for (const role of Object.keys(json.colors)) {
      next[role] = {} as any;
      for (const shade of Object.keys(json.colors[role])) {
        const cur = (current.colors as any)[role]?.[shade];
        const incoming = json.colors[role][shade];
        next[role][shade] = cur !== incoming; // preselect changed values
      }
    }
    setSelected(next);
  }, [json]);

  const buildPatch = (): Partial<AutofuseTokens> => {
    const patch: any = {};
    if (!json) return patch;
    if (include.colors && json.colors) {
      const colors: any = {};
      for (const role of Object.keys(json.colors)) {
        const roleSel = selected[role] || {};
        const shades = json.colors[role];
        for (const shade of Object.keys(shades)) {
          if (roleSel[shade]) {
            colors[role] = colors[role] || {};
            colors[role][shade] = shades[shade];
          }
        }
      }
      if (Object.keys(colors).length) patch.colors = colors;
    }
    if (include.typography && json.typography) patch.typography = { baseRem: json.typography.baseRem ?? current.typography.baseRem, scale: json.typography.ratio ?? current.typography.scale, minViewport: current.typography.minViewport, maxViewport: current.typography.maxViewport };
    if (include.spacing && json.spacing) patch.spacing = { base: json.spacing.base ?? current.spacing.base, steps: current.spacing.steps };
    if (include.radius && json.radius) patch.radius = { ...current.radius, ...json.radius };
    if (include.shadows && json.shadows) patch.shadows = { ...current.shadows, ...json.shadows };
    return patch;
  };

  const patch = buildPatch();
  const merged = merge(current, patch as any) as AutofuseTokens;
  const changes = diffCount(current, merged);
  const colorKeys = Object.keys((patch as any).colors || json?.colors || {});
  const toOklch = converter('oklch');
  function deltaLch(a?: string, b?: string) {
    if (!a || !b) return null;
    const A: any = toOklch(a);
    const B: any = toOklch(b);
    if (!A || !B) return null;
    const dL = Math.abs((A.l ?? 0) - (B.l ?? 0));
    const dC = Math.abs((A.c ?? 0) - (B.c ?? 0));
    let dH = Math.abs((A.h ?? 0) - (B.h ?? 0));
    dH = dH > 180 ? 360 - dH : dH; // shortest arc
    return { dL: +(dL).toFixed(3), dC: +(dC).toFixed(3), dH: +dH.toFixed(1) };
  }

  return (
    <div style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-md)', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>ACSS Import Wizard</strong>
        <label style={{ fontSize: 'var(--af-text-sm)' }}>Upload JSON <input type="file" accept="application/json" onChange={(e) => handleFile(e.target.files?.[0] || null)} /></label>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {json && (
        <div style={{ marginTop: '0.5rem' }}>
          <div style={{ fontSize: 'var(--af-text-sm)', color: 'var(--af-color-neutral-500)' }}>Detected fields</div>
          {['colors','typography','spacing','radius','shadows'].map((k) => (
            <label key={k} style={{ display: 'block' }}>
              <input type="checkbox" checked={include[k]} onChange={(e) => setInclude({ ...include, [k]: e.target.checked })} /> {k}
            </label>
          ))}
          <div style={{ marginTop: '0.5rem', fontSize: 'var(--af-text-sm)' }}>Change count: {changes}</div>
          {include.colors && colorKeys.length > 0 && (
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Colors preview (select per-shade)</div>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {colorKeys.map((role) => (
                  <div key={role}>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{role}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '0.25rem', fontSize: 'var(--af-text-sm)' }}>
                      <div>Shade</div>
                      <div style={{ textAlign: 'center' }}>Current</div>
                      <div style={{ textAlign: 'center' }}>Incoming</div>
                      <div style={{ textAlign: 'center' }}>Diff</div>
                      <div style={{ textAlign: 'center' }}>Apply</div>
                      {['50','100','300','500','700','900'].map((s) => {
                        const incoming = (json?.colors?.[role] || {})[s];
                        const cur = (current.colors as any)?.[role]?.[s];
                        const changed = incoming !== undefined && incoming !== cur;
                        const d = deltaLch(cur, incoming);
                        const checked = (selected[role] || {})[s] || false;
                        return (
                          <React.Fragment key={s}>
                            <div>{s}</div>
                            <div title={String(cur)} style={{ display: 'grid', gridTemplateColumns: '16px 1fr', gap: 6, alignItems: 'center' }}>
                              <div style={{ width: 16, height: 16, background: cur, border: '1px solid var(--af-color-neutral-300)', borderRadius: 3 }} />
                              <code>{cur || '-'}</code>
                            </div>
                            <div title={String(incoming)} style={{ display: 'grid', gridTemplateColumns: '16px 1fr', gap: 6, alignItems: 'center' }}>
                              <div style={{ width: 16, height: 16, background: incoming, border: '1px solid var(--af-color-neutral-300)', borderRadius: 3 }} />
                              <code>{incoming || '-'}</code>
                            </div>
                            <div style={{ color: changed ? 'var(--af-color-warning-500, #b45309)' : 'var(--af-color-neutral-500)' }}>
                              {changed ? (d ? `ΔL ${d.dL} ΔC ${d.dC} ΔH ${d.dH}°` : 'changed') : 'same'}
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <input type="checkbox" checked={checked}
                                onChange={(e) => setSelected((prev) => ({ ...prev, [role]: { ...(prev[role] || {}), [s]: e.target.checked } }))} />
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button onClick={() => onApply(patch)} style={{ marginTop: '0.5rem', padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>Apply Selected</button>
        </div>
      )}
    </div>
  );
}

export default AcssImportWizard;

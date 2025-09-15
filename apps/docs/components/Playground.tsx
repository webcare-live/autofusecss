"use client";

import React from 'react';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';

export function Playground({ code, scope = {} as Record<string, any> }) {
  const combinedScope = { React, ...scope };
  const previewRef = React.useRef<HTMLDivElement | null>(null);
  const onCopy = async () => { try { await navigator.clipboard.writeText(code); } catch {} };
  const onCopyHtml = async () => {
    try {
      const html = previewRef.current?.innerHTML?.trim() || '';
      await navigator.clipboard.writeText(html);
    } catch {}
  };
  return (
    <LiveProvider code={code} scope={combinedScope} language="tsx">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.25rem 0.5rem', borderBottom: '1px solid var(--af-color-neutral-300)' }}>
            <div style={{ fontSize: 'var(--af-text-sm)', color: 'var(--af-color-neutral-500)' }}>Editable Code</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={onCopy} style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>Copy</button>
              <button onClick={onCopyHtml} style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-sm)' }}>Copy HTML</button>
            </div>
          </div>
          <LiveEditor style={{ fontSize: '0.875rem' }} />
        </div>
        <div ref={previewRef} style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-md)', padding: '1rem' }}>
          <LivePreview />
        </div>
      </div>
      <LiveError />
    </LiveProvider>
  );
}

export default Playground;

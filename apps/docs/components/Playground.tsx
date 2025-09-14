"use client";

import React from 'react';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';

export function Playground({ code, scope = {} as Record<string, any> }) {
  const combinedScope = { React, ...scope };
  return (
    <LiveProvider code={code} scope={combinedScope} language="tsx">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-md)' }}>
          <LiveEditor style={{ fontSize: '0.875rem' }} />
        </div>
        <div style={{ border: '1px solid var(--af-color-neutral-300)', borderRadius: 'var(--af-radius-md)', padding: '1rem' }}>
          <LivePreview />
        </div>
      </div>
      <LiveError />
    </LiveProvider>
  );
}

export default Playground;


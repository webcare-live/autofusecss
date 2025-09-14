"use client";

import React from 'react';

export function Callout({ type = 'info', children }: { type?: 'info' | 'warn' | 'success' | 'danger'; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    info: 'var(--af-color-primary-500)',
    warn: 'var(--af-color-warning-500, #f59e0b)',
    success: 'var(--af-color-success-500, #10b981)',
    danger: 'var(--af-color-danger-500, #ef4444)'
  };
  const border = `1px solid ${colors[type] || colors.info}`;
  return (
    <div style={{ border, borderLeftWidth: '4px', padding: '0.75rem 1rem', borderRadius: 'var(--af-radius-md)', background: 'rgba(0,0,0,0.02)' }}>
      {children}
    </div>
  );
}

export default Callout;


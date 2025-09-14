import Link from 'next/link';
import React from 'react';

export default function Page() {
  return (
    <div className="af-stack-4">
      <h1 className="af-text-3xl">AutofuseCSS</h1>
      <p className="af-text-base">React‑first utilities and tokens with fluid scales. This docs site renders the markdown in <code>docs/</code>.</p>
      <div className="af-stack-2">
        <Link className="af-text-primary-700" href="/doc/01-AUTOFUSECSS-SPEC">Spec & Overview</Link>
        <Link className="af-text-primary-700" href="/utilities">Utilities Index</Link>
        <Link className="af-text-primary-700" href="/studio">Theme Studio</Link>
      </div>
    </div>
  );
}


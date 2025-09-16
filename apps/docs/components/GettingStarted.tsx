"use client";

import React from "react";
import Link from "next/link";
import { useAutofuse } from "autofusecss/react";

export default function GettingStarted() {
  const { tokens } = useAutofuse();
  const primary = (tokens.colors as any).primary || {};
  const swatches = ["50", "100", "300", "500", "700", "900"].map((k) => ({
    k,
    v: primary[k],
  }));

  return (
    <div className="af-getting-started">
      <div className="af-section-header">
        <h2 className="af-section-title">Get Started</h2>
        <Link href="/studio" className="af-btn af-btn-modern af-btn-primary">
          <span>🎨</span>
          Open Theme Studio
        </Link>
      </div>

      <div className="af-getting-started-content">
        <div className="af-quick-steps">
          <h3 className="af-subsection-title">Quick Setup</h3>
          <ol className="af-step-list">
            <li className="af-step-item">
              <div className="af-step-number">1</div>
              <div className="af-step-content">
                <div className="af-step-title">Install CSS</div>
                <code className="af-code-snippet">
                  import 'autofusecss/styles.css'
                </code>
              </div>
            </li>
            <li className="af-step-item">
              <div className="af-step-number">2</div>
              <div className="af-step-content">
                <div className="af-step-title">Wrap your app</div>
                <code className="af-code-snippet">
                  &lt;AutofuseProvider&gt;...&lt;/AutofuseProvider&gt;
                </code>
              </div>
            </li>
            <li className="af-step-item">
              <div className="af-step-number">3</div>
              <div className="af-step-content">
                <div className="af-step-title">Customize tokens</div>
                <div className="af-step-desc">
                  Use the{" "}
                  <Link href="/studio" className="af-inline-link">
                    Theme Studio
                  </Link>{" "}
                  to tweak your design tokens
                </div>
              </div>
            </li>
          </ol>
        </div>

        <div className="af-color-preview">
          <h3 className="af-subsection-title">Current Primary Palette</h3>
          <div className="af-color-swatches">
            {swatches.map(({ k, v }) => (
              <div key={k} className="af-color-swatch">
                <div
                  className="af-color-preview-box"
                  style={{ background: v || "transparent" }}
                />
                <div className="af-color-label">{k}</div>
                <div className="af-color-value">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

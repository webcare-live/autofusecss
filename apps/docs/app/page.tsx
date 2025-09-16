import Link from "next/link";
import React from "react";
import GettingStarted from "../components/GettingStarted";

export default function Page() {
  return (
    <div className="af-stack-6">
      <div className="af-hero-section">
        <h1 className="af-hero-title">AutofuseCSS</h1>
        <p className="af-hero-subtitle">
          React-first utilities and tokens with fluid scales. Build modern
          interfaces with a powerful design system that adapts to your needs.
        </p>
        <div className="af-hero-badges">
          <span className="af-badge af-badge-primary">React First</span>
          <span className="af-badge af-badge-secondary">Design Tokens</span>
          <span className="af-badge af-badge-accent">Fluid Scales</span>
        </div>
      </div>

      <div className="af-quick-links">
        <Link
          className="af-link-card af-link-card-primary"
          href="/doc/01-AUTOFUSECSS-SPEC"
        >
          <div className="af-link-card-icon">📊</div>
          <div>
            <div className="af-link-card-title">Specification & Overview</div>
            <div className="af-link-card-desc">
              Learn about the core concepts and architecture
            </div>
          </div>
        </Link>
        <Link className="af-link-card af-link-card-secondary" href="/utilities">
          <div className="af-link-card-icon">🧠</div>
          <div>
            <div className="af-link-card-title">Utilities Index</div>
            <div className="af-link-card-desc">
              Browse all available utility classes
            </div>
          </div>
        </Link>
        <Link className="af-link-card af-link-card-accent" href="/studio">
          <div className="af-link-card-icon">🎨</div>
          <div>
            <div className="af-link-card-title">Theme Studio</div>
            <div className="af-link-card-desc">
              Customize your design tokens visually
            </div>
          </div>
        </Link>
      </div>

      <GettingStarted />
    </div>
  );
}

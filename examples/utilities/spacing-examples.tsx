/**
 * AutofuseCSS Spacing Utility Examples
 * Interactive demonstrations of margin, padding, and stack utilities
 */

import React from "react";

export const SpacingExamples = () => {
  return (
    <div className="af-container af-stack-8">
      <h1 className="af-text-3xl">Spacing Utilities</h1>

      {/* Margin Examples */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Margin Utilities</h2>

        <div className="af-bg-neutral-100 af-p-4 af-border af-radius-md">
          <div className="af-bg-primary-500 af-p-2 af-text-white af-m-0">
            .af-m-0 (no margin)
          </div>
        </div>

        <div className="af-bg-neutral-100 af-p-4 af-border af-radius-md">
          <div className="af-bg-primary-500 af-p-2 af-text-white af-m-2">
            .af-m-2 (0.5rem margin)
          </div>
        </div>

        <div className="af-bg-neutral-100 af-p-4 af-border af-radius-md">
          <div className="af-bg-primary-500 af-p-2 af-text-white af-m-4">
            .af-m-4 (1rem margin)
          </div>
        </div>

        <div className="af-bg-neutral-100 af-p-4 af-border af-radius-md">
          <div className="af-bg-primary-500 af-p-2 af-text-white af-m-6">
            .af-m-6 (1.5rem margin)
          </div>
        </div>
      </section>

      {/* Padding Examples */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Padding Utilities</h2>

        <div className="af-border af-radius-md af-bg-primary-100">
          <div className="af-bg-primary-500 af-text-white af-p-0">
            .af-p-0 (no padding)
          </div>
        </div>

        <div className="af-border af-radius-md af-bg-primary-100">
          <div className="af-bg-primary-500 af-text-white af-p-2">
            .af-p-2 (0.5rem padding)
          </div>
        </div>

        <div className="af-border af-radius-md af-bg-primary-100">
          <div className="af-bg-primary-500 af-text-white af-p-4">
            .af-p-4 (1rem padding)
          </div>
        </div>

        <div className="af-border af-radius-md af-bg-primary-100">
          <div className="af-bg-primary-500 af-text-white af-p-6">
            .af-p-6 (1.5rem padding)
          </div>
        </div>
      </section>

      {/* Stack Examples */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Stack Utilities</h2>
        <p className="af-text-sm af-text-neutral-600">
          Stack utilities add consistent spacing between child elements using
          margin-top.
        </p>

        <div className="af-grid af-grid-cols-2 af-gap-4">
          <div className="af-border af-radius-md af-p-4">
            <h3 className="af-text-sm af-text-neutral-700 af-m-0">
              .af-stack-0
            </h3>
            <div className="af-stack-0 af-mt-2">
              <div className="af-bg-primary-200 af-p-2 af-radius-sm">
                Item 1
              </div>
              <div className="af-bg-primary-300 af-p-2 af-radius-sm">
                Item 2
              </div>
              <div className="af-bg-primary-400 af-p-2 af-radius-sm">
                Item 3
              </div>
            </div>
          </div>

          <div className="af-border af-radius-md af-p-4">
            <h3 className="af-text-sm af-text-neutral-700 af-m-0">
              .af-stack-2
            </h3>
            <div className="af-stack-2 af-mt-2">
              <div className="af-bg-success-200 af-p-2 af-radius-sm">
                Item 1
              </div>
              <div className="af-bg-success-300 af-p-2 af-radius-sm">
                Item 2
              </div>
              <div className="af-bg-success-400 af-p-2 af-radius-sm">
                Item 3
              </div>
            </div>
          </div>

          <div className="af-border af-radius-md af-p-4">
            <h3 className="af-text-sm af-text-neutral-700 af-m-0">
              .af-stack-4
            </h3>
            <div className="af-stack-4 af-mt-2">
              <div className="af-bg-warning-200 af-p-2 af-radius-sm">
                Item 1
              </div>
              <div className="af-bg-warning-300 af-p-2 af-radius-sm">
                Item 2
              </div>
              <div className="af-bg-warning-400 af-p-2 af-radius-sm">
                Item 3
              </div>
            </div>
          </div>

          <div className="af-border af-radius-md af-p-4">
            <h3 className="af-text-sm af-text-neutral-700 af-m-0">
              .af-stack-8
            </h3>
            <div className="af-stack-8 af-mt-2">
              <div className="af-bg-danger-200 af-p-2 af-radius-sm">Item 1</div>
              <div className="af-bg-danger-300 af-p-2 af-radius-sm">Item 2</div>
              <div className="af-bg-danger-400 af-p-2 af-radius-sm">Item 3</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mathematical Scaling */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Mathematical Scaling System</h2>
        <p className="af-text-sm af-text-neutral-600">
          AutofuseCSS uses a perfect fourth ratio (1.333) for mathematical
          scaling across all spacing values.
        </p>

        <div className="af-grid af-grid-cols-1 af-gap-3">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
            <div key={size} className="af-flex af-items-center af-gap-4">
              <span className="af-text-sm af-font-mono af-w-16">
                af-p-{size}
              </span>
              <div
                className="af-bg-primary-500 af-text-white af-text-xs"
                style={{ padding: `${Math.pow(1.333, size) * 0.25}rem` }}
              >
                {Math.pow(1.333, size) * 0.25}rem
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SpacingExamples;

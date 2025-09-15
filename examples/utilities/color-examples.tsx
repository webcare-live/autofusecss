/**
 * AutofuseCSS Color Utility Examples
 * Interactive demonstrations of color palettes, semantic colors, and accessibility
 */

import React from "react";

export const ColorExamples = () => {
  return (
    <div className="af-container af-stack-8">
      <h1 className="af-text-3xl">Color Utilities</h1>

      {/* Primary Color Palette */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Primary Color Palette</h2>
        <p className="af-text-sm af-text-neutral-600">
          OKLCH color space for perceptual uniformity and better contrast
          ratios.
        </p>

        <div className="af-grid af-grid-cols-10 af-gap-2">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
            <div key={shade} className="af-stack-2">
              <div
                className={`af-bg-primary-${shade} af-h-16 af-radius-md af-border af-border-neutral-200`}
                title={`primary-${shade}`}
              />
              <div className="af-text-xs af-text-center af-font-mono">
                {shade}
              </div>
            </div>
          ))}
        </div>

        <div className="af-stack-4 af-mt-4">
          <h3 className="af-text-lg af-font-medium">Text Colors</h3>
          <div className="af-grid af-grid-cols-2 af-gap-4">
            <div className="af-stack-2">
              <div className="af-text-primary-700">Primary 700 text</div>
              <div className="af-text-primary-600">Primary 600 text</div>
              <div className="af-text-primary-500">Primary 500 text</div>
            </div>
            <div className="af-stack-2">
              <div className="af-bg-primary-500 af-text-white af-p-2 af-radius-sm">
                White text on primary
              </div>
              <div className="af-bg-primary-100 af-text-primary-800 af-p-2 af-radius-sm">
                Dark text on light primary
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Semantic Color System */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Semantic Color System</h2>

        <div className="af-grid af-grid-cols-1 md:af-grid-cols-2 lg:af-grid-cols-4 af-gap-4">
          {/* Success Colors */}
          <div className="af-stack-4">
            <h3 className="af-text-lg af-font-medium af-text-success-700">
              Success
            </h3>
            <div className="af-stack-2">
              <div className="af-bg-success-100 af-text-success-800 af-p-3 af-radius-md af-border af-border-success-200">
                <div className="af-font-medium">Success message</div>
                <div className="af-text-sm af-opacity-90">
                  Operation completed successfully
                </div>
              </div>
              <div className="af-flex af-gap-2">
                <div
                  className="af-bg-success-500 af-h-8 af-flex-1 af-radius-sm"
                  title="success-500"
                />
                <div
                  className="af-bg-success-600 af-h-8 af-flex-1 af-radius-sm"
                  title="success-600"
                />
                <div
                  className="af-bg-success-700 af-h-8 af-flex-1 af-radius-sm"
                  title="success-700"
                />
              </div>
            </div>
          </div>

          {/* Warning Colors */}
          <div className="af-stack-4">
            <h3 className="af-text-lg af-font-medium af-text-warning-700">
              Warning
            </h3>
            <div className="af-stack-2">
              <div className="af-bg-warning-100 af-text-warning-800 af-p-3 af-radius-md af-border af-border-warning-200">
                <div className="af-font-medium">Warning notice</div>
                <div className="af-text-sm af-opacity-90">
                  Please review before proceeding
                </div>
              </div>
              <div className="af-flex af-gap-2">
                <div
                  className="af-bg-warning-500 af-h-8 af-flex-1 af-radius-sm"
                  title="warning-500"
                />
                <div
                  className="af-bg-warning-600 af-h-8 af-flex-1 af-radius-sm"
                  title="warning-600"
                />
                <div
                  className="af-bg-warning-700 af-h-8 af-flex-1 af-radius-sm"
                  title="warning-700"
                />
              </div>
            </div>
          </div>

          {/* Danger Colors */}
          <div className="af-stack-4">
            <h3 className="af-text-lg af-font-medium af-text-danger-700">
              Danger
            </h3>
            <div className="af-stack-2">
              <div className="af-bg-danger-100 af-text-danger-800 af-p-3 af-radius-md af-border af-border-danger-200">
                <div className="af-font-medium">Error occurred</div>
                <div className="af-text-sm af-opacity-90">
                  Action could not be completed
                </div>
              </div>
              <div className="af-flex af-gap-2">
                <div
                  className="af-bg-danger-500 af-h-8 af-flex-1 af-radius-sm"
                  title="danger-500"
                />
                <div
                  className="af-bg-danger-600 af-h-8 af-flex-1 af-radius-sm"
                  title="danger-600"
                />
                <div
                  className="af-bg-danger-700 af-h-8 af-flex-1 af-radius-sm"
                  title="danger-700"
                />
              </div>
            </div>
          </div>

          {/* Info Colors */}
          <div className="af-stack-4">
            <h3 className="af-text-lg af-font-medium af-text-info-700">Info</h3>
            <div className="af-stack-2">
              <div className="af-bg-info-100 af-text-info-800 af-p-3 af-radius-md af-border af-border-info-200">
                <div className="af-font-medium">Information</div>
                <div className="af-text-sm af-opacity-90">
                  Additional context provided
                </div>
              </div>
              <div className="af-flex af-gap-2">
                <div
                  className="af-bg-info-500 af-h-8 af-flex-1 af-radius-sm"
                  title="info-500"
                />
                <div
                  className="af-bg-info-600 af-h-8 af-flex-1 af-radius-sm"
                  title="info-600"
                />
                <div
                  className="af-bg-info-700 af-h-8 af-flex-1 af-radius-sm"
                  title="info-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neutral Gray Scale */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Neutral Gray Scale</h2>

        <div className="af-grid af-grid-cols-10 af-gap-2">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
            <div key={shade} className="af-stack-2">
              <div
                className={`af-bg-neutral-${shade} af-h-16 af-radius-md af-border`}
                title={`neutral-${shade}`}
              />
              <div className="af-text-xs af-text-center af-font-mono">
                {shade}
              </div>
            </div>
          ))}
        </div>

        <div className="af-mt-4">
          <h3 className="af-text-lg af-font-medium af-mb-3">Text Hierarchy</h3>
          <div className="af-stack-3">
            <div className="af-text-neutral-900 af-text-lg">
              Primary text - neutral-900
            </div>
            <div className="af-text-neutral-700">
              Secondary text - neutral-700
            </div>
            <div className="af-text-neutral-600">
              Tertiary text - neutral-600
            </div>
            <div className="af-text-neutral-500">Muted text - neutral-500</div>
            <div className="af-text-neutral-400">Subtle text - neutral-400</div>
          </div>
        </div>
      </section>

      {/* Contrast and Accessibility */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Contrast & Accessibility</h2>
        <p className="af-text-sm af-text-neutral-600">
          All color combinations meet WCAG accessibility standards.
        </p>

        <div className="af-grid af-grid-cols-1 md:af-grid-cols-2 af-gap-6">
          <div className="af-stack-4">
            <h3 className="af-text-lg af-font-medium">
              AAA Compliant Combinations
            </h3>
            <div className="af-stack-2">
              <div className="af-bg-white af-text-neutral-900 af-p-3 af-border af-radius-md">
                <span className="af-font-medium">21:1 contrast</span> - Black on
                white
              </div>
              <div className="af-bg-neutral-900 af-text-white af-p-3 af-radius-md">
                <span className="af-font-medium">21:1 contrast</span> - White on
                black
              </div>
              <div className="af-bg-primary-700 af-text-white af-p-3 af-radius-md">
                <span className="af-font-medium">7:1+ contrast</span> - White on
                primary-700
              </div>
            </div>
          </div>

          <div className="af-stack-4">
            <h3 className="af-text-lg af-font-medium">
              AA Compliant Combinations
            </h3>
            <div className="af-stack-2">
              <div className="af-bg-primary-600 af-text-white af-p-3 af-radius-md">
                <span className="af-font-medium">4.5:1+ contrast</span> - White
                on primary-600
              </div>
              <div className="af-bg-neutral-100 af-text-neutral-800 af-p-3 af-border af-radius-md">
                <span className="af-font-medium">4.5:1+ contrast</span> - Dark
                on light gray
              </div>
              <div className="af-bg-success-600 af-text-white af-p-3 af-radius-md">
                <span className="af-font-medium">4.5:1+ contrast</span> - White
                on success-600
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Color Picker */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Color Utility Classes</h2>

        <div className="af-grid af-grid-cols-1 md:af-grid-cols-2 af-gap-6">
          <div className="af-stack-4">
            <h3 className="af-text-lg af-font-medium">Background Colors</h3>
            <div className="af-stack-2">
              <code className="af-text-sm af-font-mono af-bg-neutral-100 af-p-2 af-radius-sm">
                .af-bg-primary-500
              </code>
              <code className="af-text-sm af-font-mono af-bg-neutral-100 af-p-2 af-radius-sm">
                .af-bg-success-100
              </code>
              <code className="af-text-sm af-font-mono af-bg-neutral-100 af-p-2 af-radius-sm">
                .af-bg-neutral-900
              </code>
            </div>
          </div>

          <div className="af-stack-4">
            <h3 className="af-text-lg af-font-medium">Text Colors</h3>
            <div className="af-stack-2">
              <code className="af-text-sm af-font-mono af-bg-neutral-100 af-p-2 af-radius-sm">
                .af-text-primary-700
              </code>
              <code className="af-text-sm af-font-mono af-bg-neutral-100 af-p-2 af-radius-sm">
                .af-text-neutral-600
              </code>
              <code className="af-text-sm af-font-mono af-bg-neutral-100 af-p-2 af-radius-sm">
                .af-text-danger-800
              </code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ColorExamples;

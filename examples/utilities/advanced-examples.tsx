/**
 * AutofuseCSS Advanced Utility Examples
 * Interactive demonstrations of masks, filters, overlays, and dimension utilities
 */

import React from "react";

export const AdvancedExamples = () => {
  return (
    <div className="af-container af-stack-8">
      <h1 className="af-text-3xl">Advanced Utilities</h1>

      {/* Dimension Utilities */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Dimension Utilities</h2>
        <p className="af-text-sm af-text-neutral-600">
          Mathematical scaling for width, height, min/max dimensions using
          perfect fourth ratio.
        </p>

        <div className="af-grid af-grid-cols-1 md:af-grid-cols-2 af-gap-6">
          <div className="af-stack-4">
            <h3 className="af-text-lg af-font-medium">Width Scale</h3>
            <div className="af-stack-3">
              {[2, 4, 6, 8, 12, 16].map((size) => (
                <div key={size} className="af-flex af-items-center af-gap-4">
                  <code className="af-text-xs af-font-mono af-w-16">
                    .af-w-{size}
                  </code>
                  <div
                    className={`af-w-${size} af-h-4 af-bg-primary-500 af-radius-sm`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="af-stack-4">
            <h3 className="af-text-lg af-font-medium">Height Scale</h3>
            <div className="af-flex af-items-end af-gap-2 af-h-32">
              {[2, 4, 6, 8, 12, 16].map((size) => (
                <div key={size} className="af-stack-1 af-flex-1">
                  <div
                    className={`af-h-${size} af-bg-success-500 af-radius-sm`}
                  />
                  <code className="af-text-xs af-font-mono af-text-center">
                    {size}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="af-stack-4 af-mt-6">
          <h3 className="af-text-lg af-font-medium">Min/Max Constraints</h3>
          <div className="af-grid af-grid-cols-1 md:af-grid-cols-3 af-gap-4">
            <div className="af-stack-2">
              <code className="af-text-xs af-font-mono">
                .af-min-w-32 .af-max-w-64
              </code>
              <div className="af-min-w-32 af-max-w-64 af-h-12 af-bg-warning-300 af-radius-md af-flex af-items-center af-justify-center af-text-xs">
                Constrained width
              </div>
            </div>
            <div className="af-stack-2">
              <code className="af-text-xs af-font-mono">
                .af-min-h-16 .af-max-h-24
              </code>
              <div className="af-w-full af-min-h-16 af-max-h-24 af-bg-info-300 af-radius-md af-flex af-items-center af-justify-center af-text-xs">
                Constrained height
              </div>
            </div>
            <div className="af-stack-2">
              <code className="af-text-xs af-font-mono">.af-size-16</code>
              <div className="af-size-16 af-bg-danger-300 af-radius-md af-flex af-items-center af-justify-center af-text-xs">
                Square
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mask Utilities */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Mask Utilities</h2>
        <p className="af-text-sm af-text-neutral-600">
          CSS masks and clip paths for creative visual effects.
        </p>

        <div className="af-grid af-grid-cols-2 md:af-grid-cols-4 af-gap-4">
          <div className="af-stack-2">
            <div className="af-w-24 af-h-24 af-bg-primary-500 af-mask-circle af-mx-auto" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-mask-circle
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-24 af-h-24 af-bg-success-500 af-mask-radial af-mx-auto" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-mask-radial
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-24 af-h-24 af-bg-warning-500 af-mask-fade-t af-mx-auto" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-mask-fade-t
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-24 af-h-24 af-bg-danger-500 af-mask-fade-b af-mx-auto" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-mask-fade-b
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-24 af-h-24 af-bg-info-500 af-mask-fade-l af-mx-auto" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-mask-fade-l
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-24 af-h-24 af-bg-purple-500 af-mask-fade-r af-mx-auto" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-mask-fade-r
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-24 af-h-24 af-bg-pink-500 af-clip-triangle af-mx-auto" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-clip-triangle
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-24 af-h-24 af-bg-indigo-500 af-clip-hexagon af-mx-auto" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-clip-hexagon
            </code>
          </div>
        </div>
      </section>

      {/* Filter Effects */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Filter Effects</h2>
        <p className="af-text-sm af-text-neutral-600">
          CSS filter effects for visual enhancement and artistic effects.
        </p>

        <div className="af-grid af-grid-cols-2 md:af-grid-cols-4 af-gap-4">
          <div className="af-stack-2">
            <div className="af-w-24 af-h-24 af-bg-gradient-to-br af-from-primary-400 af-to-primary-600 af-radius-md af-mx-auto" />
            <code className="af-text-xs af-font-mono af-text-center">
              Original
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-24 af-h-24 af-bg-gradient-to-br af-from-primary-400 af-to-primary-600 af-radius-md af-filter-blur-sm af-mx-auto" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-filter-blur-sm
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-24 af-h-24 af-bg-gradient-to-br af-from-primary-400 af-to-primary-600 af-radius-md af-filter-brightness-125 af-mx-auto" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-filter-brightness-125
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-24 af-h-24 af-bg-gradient-to-br af-from-primary-400 af-to-primary-600 af-radius-md af-filter-contrast-125 af-mx-auto" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-filter-contrast-125
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-24 af-h-24 af-bg-gradient-to-br af-from-primary-400 af-to-primary-600 af-radius-md af-filter-grayscale af-mx-auto" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-filter-grayscale
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-24 af-h-24 af-bg-gradient-to-br af-from-primary-400 af-to-primary-600 af-radius-md af-filter-sepia af-mx-auto" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-filter-sepia
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-24 af-h-24 af-bg-gradient-to-br af-from-primary-400 af-to-primary-600 af-radius-md af-filter-hue-rotate-90 af-mx-auto" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-filter-hue-rotate-90
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-24 af-h-24 af-bg-gradient-to-br af-from-primary-400 af-to-primary-600 af-radius-md af-filter-saturate-150 af-mx-auto" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-filter-saturate-150
            </code>
          </div>
        </div>
      </section>

      {/* Gradient Presets */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Gradient Presets</h2>
        <p className="af-text-sm af-text-neutral-600">
          Pre-designed gradients with mathematical angle progressions.
        </p>

        <div className="af-grid af-grid-cols-2 md:af-grid-cols-4 af-gap-4">
          <div className="af-stack-2">
            <div className="af-w-full af-h-16 af-bg-gradient-ocean af-radius-md" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-bg-gradient-ocean
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-full af-h-16 af-bg-gradient-sunset af-radius-md" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-bg-gradient-sunset
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-full af-h-16 af-bg-gradient-forest af-radius-md" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-bg-gradient-forest
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-full af-h-16 af-bg-gradient-fire af-radius-md" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-bg-gradient-fire
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-full af-h-16 af-bg-gradient-radial-primary af-radius-md" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-bg-gradient-radial-primary
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-full af-h-16 af-bg-gradient-conic-rainbow af-radius-md" />
            <code className="af-text-xs af-font-mono af-text-center">
              .af-bg-gradient-conic-rainbow
            </code>
          </div>
        </div>
      </section>

      {/* Overlay System */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Overlay System</h2>
        <p className="af-text-sm af-text-neutral-600">
          Advanced overlay effects with blend modes and pattern overlays.
        </p>

        <div className="af-grid af-grid-cols-1 md:af-grid-cols-2 af-gap-6">
          <div className="af-stack-4">
            <h3 className="af-text-lg af-font-medium">Gradient Overlays</h3>
            <div className="af-stack-3">
              <div className="af-relative af-w-full af-h-32 af-bg-primary-400 af-radius-md af-bg-overlay-dark af-flex af-items-center af-justify-center af-text-white">
                <span className="af-relative af-z-10">.af-bg-overlay-dark</span>
              </div>

              <div className="af-relative af-w-full af-h-32 af-bg-success-400 af-radius-md af-bg-overlay-light af-flex af-items-center af-justify-center">
                <span className="af-relative af-z-10">
                  .af-bg-overlay-light
                </span>
              </div>
            </div>
          </div>

          <div className="af-stack-4">
            <h3 className="af-text-lg af-font-medium">Blend Mode Effects</h3>
            <div className="af-stack-3">
              <div className="af-relative af-w-full af-h-32 af-bg-gradient-to-r af-from-primary-400 af-to-success-400 af-radius-md af-overlay-multiply af-flex af-items-center af-justify-center af-text-white">
                <span className="af-relative af-z-10">
                  .af-overlay-multiply
                </span>
              </div>

              <div className="af-relative af-w-full af-h-32 af-bg-gradient-to-r af-from-warning-400 af-to-danger-400 af-radius-md af-overlay-screen af-flex af-items-center af-justify-center">
                <span className="af-relative af-z-10">.af-overlay-screen</span>
              </div>
            </div>
          </div>
        </div>

        <div className="af-stack-4 af-mt-6">
          <h3 className="af-text-lg af-font-medium">Pattern Overlays</h3>
          <div className="af-grid af-grid-cols-2 md:af-grid-cols-4 af-gap-4">
            <div className="af-w-full af-h-24 af-bg-primary-400 af-radius-md af-overlay-dots af-flex af-items-center af-justify-center af-text-white af-text-sm">
              Dots
            </div>

            <div className="af-w-full af-h-24 af-bg-success-400 af-radius-md af-overlay-grid af-flex af-items-center af-justify-center af-text-white af-text-sm">
              Grid
            </div>

            <div className="af-w-full af-h-24 af-bg-warning-400 af-radius-md af-overlay-diagonal af-flex af-items-center af-justify-center af-text-white af-text-sm">
              Diagonal
            </div>

            <div className="af-w-full af-h-24 af-bg-danger-400 af-radius-md af-overlay-noise af-flex af-items-center af-justify-center af-text-white af-text-sm">
              Noise
            </div>
          </div>
        </div>
      </section>

      {/* Combined Effects */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Combined Effects</h2>
        <p className="af-text-sm af-text-neutral-600">
          Combining multiple utilities for complex visual effects.
        </p>

        <div className="af-grid af-grid-cols-1 md:af-grid-cols-2 af-gap-6">
          <div className="af-stack-2">
            <div className="af-w-full af-h-32 af-bg-gradient-ocean af-mask-fade-b af-filter-blur-sm af-radius-md af-flex af-items-start af-justify-center af-pt-4 af-text-white af-font-medium">
              Ocean + Fade + Blur
            </div>
            <code className="af-text-xs af-font-mono">
              .af-bg-gradient-ocean .af-mask-fade-b .af-filter-blur-sm
            </code>
          </div>

          <div className="af-stack-2">
            <div className="af-w-full af-h-32 af-bg-gradient-sunset af-overlay-multiply af-clip-triangle af-radius-md af-flex af-items-center af-justify-center af-text-white af-font-medium">
              Sunset + Triangle
            </div>
            <code className="af-text-xs af-font-mono">
              .af-bg-gradient-sunset .af-overlay-multiply .af-clip-triangle
            </code>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedExamples;

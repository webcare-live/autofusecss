/**
 * AutofuseCSS Typography Utility Examples
 * Interactive demonstrations of text sizing, weights, and type scale
 */

import React from "react";

export const TypographyExamples = () => {
  return (
    <div className="af-container af-stack-8">
      <h1 className="af-text-3xl">Typography Utilities</h1>

      {/* Text Size Scale */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Text Size Scale</h2>
        <p className="af-text-sm af-text-neutral-600">
          Perfect fourth ratio (1.333) mathematical scaling for consistent
          typography hierarchy.
        </p>

        <div className="af-stack-4">
          <div className="af-text-xs">
            <span className="af-font-mono af-text-neutral-500">
              .af-text-xs
            </span>{" "}
            - Extra small text (0.75rem)
          </div>
          <div className="af-text-sm">
            <span className="af-font-mono af-text-neutral-500">
              .af-text-sm
            </span>{" "}
            - Small text (0.875rem)
          </div>
          <div className="af-text-base">
            <span className="af-font-mono af-text-neutral-500">
              .af-text-base
            </span>{" "}
            - Base text (1rem)
          </div>
          <div className="af-text-lg">
            <span className="af-font-mono af-text-neutral-500">
              .af-text-lg
            </span>{" "}
            - Large text (1.125rem)
          </div>
          <div className="af-text-xl">
            <span className="af-font-mono af-text-neutral-500">
              .af-text-xl
            </span>{" "}
            - Extra large text (1.25rem)
          </div>
          <div className="af-text-2xl">
            <span className="af-font-mono af-text-neutral-500">
              .af-text-2xl
            </span>{" "}
            - 2X large text (1.5rem)
          </div>
          <div className="af-text-3xl">
            <span className="af-font-mono af-text-neutral-500">
              .af-text-3xl
            </span>{" "}
            - 3X large text (1.875rem)
          </div>
        </div>
      </section>

      {/* Typography Hierarchy */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Typography Hierarchy Example</h2>

        <article className="af-stack-6">
          <h1 className="af-text-3xl af-font-bold af-text-neutral-900">
            Main Article Heading
          </h1>

          <p className="af-text-lg af-text-neutral-700 af-leading-relaxed">
            This is a lead paragraph with larger text to draw attention. It uses
            .af-text-lg for better visual hierarchy.
          </p>

          <h2 className="af-text-2xl af-font-semibold af-text-neutral-800">
            Section Heading
          </h2>

          <p className="af-text-base af-text-neutral-700 af-leading-normal">
            This is regular body text using .af-text-base. It provides good
            readability while maintaining the typographic scale. The
            mathematical scaling ensures consistent proportional relationships.
          </p>

          <h3 className="af-text-xl af-font-medium af-text-neutral-800">
            Subsection Heading
          </h3>

          <p className="af-text-sm af-text-neutral-600">
            Smaller text for captions, metadata, or supplementary information.
            Uses .af-text-sm for de-emphasized content.
          </p>

          <blockquote className="af-border-l-4 af-border-primary-500 af-pl-4 af-italic">
            <p className="af-text-base af-text-neutral-700">
              "Typography is the craft of endowing human language with a durable
              visual form."
            </p>
            <cite className="af-text-xs af-text-neutral-500 af-not-italic">
              — Robert Bringhurst
            </cite>
          </blockquote>
        </article>
      </section>

      {/* Color Applications */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Typography with Color</h2>

        <div className="af-grid af-grid-cols-2 af-gap-4">
          <div className="af-stack-3">
            <h3 className="af-text-lg af-font-medium">Primary Colors</h3>
            <div className="af-text-primary-700">Primary text color</div>
            <div className="af-text-primary-600">Lighter primary</div>
            <div className="af-text-primary-800">Darker primary</div>
          </div>

          <div className="af-stack-3">
            <h3 className="af-text-lg af-font-medium">Semantic Colors</h3>
            <div className="af-text-success-700">Success message</div>
            <div className="af-text-warning-700">Warning text</div>
            <div className="af-text-danger-700">Error message</div>
          </div>

          <div className="af-stack-3">
            <h3 className="af-text-lg af-font-medium">Neutral Grays</h3>
            <div className="af-text-neutral-900">Very dark text</div>
            <div className="af-text-neutral-700">Regular text</div>
            <div className="af-text-neutral-500">Muted text</div>
            <div className="af-text-neutral-400">Subtle text</div>
          </div>

          <div className="af-stack-3">
            <h3 className="af-text-lg af-font-medium">
              Background Combinations
            </h3>
            <div className="af-bg-primary-100 af-text-primary-800 af-p-2 af-radius-sm">
              Primary background
            </div>
            <div className="af-bg-success-100 af-text-success-800 af-p-2 af-radius-sm">
              Success background
            </div>
            <div className="af-bg-warning-100 af-text-warning-800 af-p-2 af-radius-sm">
              Warning background
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Typography */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Responsive Typography Patterns</h2>

        <div className="af-stack-4">
          <div className="af-p-4 af-border af-radius-md af-bg-neutral-50">
            <h3 className="af-text-sm af-text-neutral-600 af-m-0 af-mb-2">
              Mobile-first heading
            </h3>
            <h1 className="af-text-xl md:af-text-2xl lg:af-text-3xl af-font-bold">
              This heading scales with screen size
            </h1>
          </div>

          <div className="af-p-4 af-border af-radius-md af-bg-neutral-50">
            <h3 className="af-text-sm af-text-neutral-600 af-m-0 af-mb-2">
              Responsive body text
            </h3>
            <p className="af-text-sm md:af-text-base lg:af-text-lg af-leading-relaxed">
              Body text that adapts to provide optimal reading experience across
              devices. Smaller on mobile, larger on desktop for comfortable
              reading distances.
            </p>
          </div>
        </div>
      </section>

      {/* Mathematical Scale Visualization */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Mathematical Scale Visualization</h2>
        <p className="af-text-sm af-text-neutral-600">
          Each step in the scale multiplies by 1.333 (perfect fourth) for
          harmonious proportions.
        </p>

        <div className="af-grid af-grid-cols-1 af-gap-2">
          {[
            { class: "af-text-xs", size: "0.75rem", ratio: 0.75 },
            { class: "af-text-sm", size: "0.875rem", ratio: 0.875 },
            { class: "af-text-base", size: "1rem", ratio: 1 },
            { class: "af-text-lg", size: "1.125rem", ratio: 1.125 },
            { class: "af-text-xl", size: "1.25rem", ratio: 1.25 },
            { class: "af-text-2xl", size: "1.5rem", ratio: 1.5 },
            { class: "af-text-3xl", size: "1.875rem", ratio: 1.875 },
          ].map(({ class: className, size, ratio }) => (
            <div
              key={className}
              className="af-flex af-items-center af-gap-4 af-p-2 af-border af-radius-sm"
            >
              <span className="af-font-mono af-text-xs af-text-neutral-500 af-w-20">
                {className}
              </span>
              <span className="af-font-mono af-text-xs af-text-neutral-400 af-w-16">
                {size}
              </span>
              <div className={`${className} af-flex-1`}>
                Typography scale demonstration
              </div>
              <div className="af-w-24 af-h-2 af-bg-primary-200 af-radius-full af-relative">
                <div
                  className="af-h-full af-bg-primary-500 af-radius-full"
                  style={{ width: `${(ratio / 1.875) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TypographyExamples;

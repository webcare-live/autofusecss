/**
 * AutofuseCSS Interactive Playground
 * Live demonstration and testing environment for all utilities
 */

import React, { useState } from "react";

interface PlaygroundProps {
  title: string;
  description: string;
  initialClasses: string;
  children?: React.ReactNode;
}

export const Playground: React.FC<PlaygroundProps> = ({
  title,
  description,
  initialClasses,
  children,
}) => {
  const [classes, setClasses] = useState(initialClasses);

  return (
    <div className="af-card af-stack-6">
      <div className="af-stack-3">
        <h3 className="af-text-xl af-font-medium">{title}</h3>
        <p className="af-text-sm af-text-neutral-600">{description}</p>
      </div>

      <div className="af-grid af-grid-cols-1 lg:af-grid-cols-2 af-gap-6">
        {/* Preview */}
        <div className="af-stack-3">
          <h4 className="af-text-sm af-font-medium af-text-neutral-700">
            Preview
          </h4>
          <div className="af-bg-neutral-50 af-border af-radius-md af-p-6 af-min-h-32 af-flex af-items-center af-justify-center">
            <div className={classes}>
              {children || (
                <div className="af-p-4 af-bg-primary-500 af-text-white af-radius-sm">
                  Demo Element
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Code */}
        <div className="af-stack-3">
          <h4 className="af-text-sm af-font-medium af-text-neutral-700">
            Classes
          </h4>
          <textarea
            value={classes}
            onChange={(e) => setClasses(e.target.value)}
            className="af-input af-font-mono af-text-sm af-min-h-32 af-resize-y"
            placeholder="Enter AutofuseCSS classes..."
          />
          <div className="af-text-xs af-text-neutral-500">
            Edit classes above to see live changes in the preview
          </div>
        </div>
      </div>

      {/* Current Classes Display */}
      <div className="af-bg-neutral-100 af-p-3 af-radius-sm">
        <div className="af-text-xs af-text-neutral-600 af-mb-1">
          Current classes:
        </div>
        <code className="af-text-xs af-font-mono af-text-neutral-800">
          {classes}
        </code>
      </div>
    </div>
  );
};

export const InteractivePlayground = () => {
  return (
    <div className="af-container af-stack-8">
      <h1 className="af-text-3xl">Interactive Playground</h1>
      <p className="af-text-lg af-text-neutral-600">
        Experiment with AutofuseCSS utilities in real-time. Edit the class names
        to see instant changes.
      </p>

      {/* Spacing Playground */}
      <Playground
        title="Spacing & Layout"
        description="Test margin, padding, and stack utilities"
        initialClasses="af-p-6 af-m-4 af-bg-primary-100 af-radius-md"
      >
        <div className="af-stack-3">
          <div className="af-bg-primary-500 af-text-white af-p-2 af-radius-sm af-text-sm">
            Item 1
          </div>
          <div className="af-bg-primary-600 af-text-white af-p-2 af-radius-sm af-text-sm">
            Item 2
          </div>
          <div className="af-bg-primary-700 af-text-white af-p-2 af-radius-sm af-text-sm">
            Item 3
          </div>
        </div>
      </Playground>

      {/* Typography Playground */}
      <Playground
        title="Typography"
        description="Experiment with text sizes, colors, and weights"
        initialClasses="af-text-xl af-text-primary-700 af-font-medium"
      >
        <div className="af-stack-2">
          <h2>Typography Playground</h2>
          <p>This text will change based on your class modifications.</p>
        </div>
      </Playground>

      {/* Color Playground */}
      <Playground
        title="Colors & Backgrounds"
        description="Test color combinations and background utilities"
        initialClasses="af-bg-gradient-ocean af-text-white af-p-6 af-radius-lg af-shadow-lg"
      >
        <div className="af-text-center">
          <h3 className="af-text-lg af-font-bold">Color Demo</h3>
          <p className="af-text-sm af-opacity-90">
            Beautiful color combinations
          </p>
        </div>
      </Playground>

      {/* Advanced Effects Playground */}
      <Playground
        title="Advanced Effects"
        description="Explore masks, filters, and overlay effects"
        initialClasses="af-w-48 af-h-32 af-bg-gradient-sunset af-mask-circle af-filter-brightness-110"
      />

      {/* Layout Playground */}
      <Playground
        title="Flexbox & Grid"
        description="Test flexbox and grid layout utilities"
        initialClasses="af-flex af-justify-between af-items-center af-gap-4 af-p-4 af-bg-neutral-100 af-radius-md"
      >
        <div className="af-bg-primary-500 af-text-white af-p-3 af-radius-sm af-text-sm">
          Box 1
        </div>
        <div className="af-bg-success-500 af-text-white af-p-3 af-radius-sm af-text-sm">
          Box 2
        </div>
        <div className="af-bg-warning-500 af-text-white af-p-3 af-radius-sm af-text-sm">
          Box 3
        </div>
      </Playground>

      {/* Dimension Playground */}
      <Playground
        title="Dimensions"
        description="Test width, height, and size utilities"
        initialClasses="af-w-32 af-h-16 af-bg-primary-500 af-radius-md"
      />

      {/* Interactive Pattern Library */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Pattern Library</h2>
        <p className="af-text-sm af-text-neutral-600">
          Common patterns and component compositions using AutofuseCSS
          utilities.
        </p>

        <div className="af-grid af-grid-cols-1 md:af-grid-cols-2 af-gap-6">
          {/* Card Pattern */}
          <div className="af-stack-3">
            <h3 className="af-text-lg af-font-medium">Card Pattern</h3>
            <div className="af-card af-card-elevated af-stack-4">
              <div className="af-flex af-items-center af-gap-3">
                <div className="af-w-12 af-h-12 af-bg-gradient-ocean af-radius-full"></div>
                <div className="af-stack-1">
                  <h4 className="af-text-base af-font-medium">Card Title</h4>
                  <p className="af-text-sm af-text-neutral-600">
                    Card subtitle
                  </p>
                </div>
              </div>
              <p className="af-text-sm af-text-neutral-700">
                This is a card component built with AutofuseCSS utilities.
              </p>
              <div className="af-flex af-gap-2">
                <button className="af-btn af-btn-primary af-btn-sm">
                  Action
                </button>
                <button className="af-btn af-btn-outline af-btn-sm">
                  Cancel
                </button>
              </div>
            </div>
            <code className="af-text-xs af-font-mono af-bg-neutral-100 af-p-2 af-radius-sm">
              .af-card .af-card-elevated .af-stack-4
            </code>
          </div>

          {/* Alert Pattern */}
          <div className="af-stack-3">
            <h3 className="af-text-lg af-font-medium">Alert Pattern</h3>
            <div className="af-bg-success-100 af-border af-border-success-300 af-text-success-800 af-p-4 af-radius-md af-flex af-items-start af-gap-3">
              <div className="af-w-5 af-h-5 af-bg-success-500 af-radius-full af-flex-shrink-0 af-mt-0.5"></div>
              <div className="af-stack-1">
                <h4 className="af-font-medium">Success!</h4>
                <p className="af-text-sm">
                  Your changes have been saved successfully.
                </p>
              </div>
            </div>
            <code className="af-text-xs af-font-mono af-bg-neutral-100 af-p-2 af-radius-sm">
              .af-bg-success-100 .af-border-success-300 .af-text-success-800
            </code>
          </div>

          {/* Navigation Pattern */}
          <div className="af-stack-3">
            <h3 className="af-text-lg af-font-medium">Navigation Pattern</h3>
            <nav className="af-bg-white af-border af-radius-md af-p-2">
              <div className="af-flex af-gap-1">
                <a
                  href="#"
                  className="af-px-3 af-py-2 af-text-sm af-bg-primary-100 af-text-primary-700 af-radius-sm af-font-medium"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="af-px-3 af-py-2 af-text-sm af-text-neutral-600 af-hover:af-bg-neutral-100 af-radius-sm"
                >
                  Projects
                </a>
                <a
                  href="#"
                  className="af-px-3 af-py-2 af-text-sm af-text-neutral-600 af-hover:af-bg-neutral-100 af-radius-sm"
                >
                  Settings
                </a>
              </div>
            </nav>
            <code className="af-text-xs af-font-mono af-bg-neutral-100 af-p-2 af-radius-sm">
              .af-flex .af-gap-1 .af-px-3 .af-py-2 .af-bg-primary-100
            </code>
          </div>

          {/* Form Pattern */}
          <div className="af-stack-3">
            <h3 className="af-text-lg af-font-medium">Form Pattern</h3>
            <form className="af-stack-4">
              <div className="af-stack-2">
                <label className="af-label">Email Address</label>
                <input
                  type="email"
                  className="af-input"
                  placeholder="you@example.com"
                />
              </div>
              <div className="af-stack-2">
                <label className="af-label">Message</label>
                <textarea
                  className="af-textarea af-min-h-24"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button type="submit" className="af-btn af-btn-primary">
                Send Message
              </button>
            </form>
            <code className="af-text-xs af-font-mono af-bg-neutral-100 af-p-2 af-radius-sm">
              .af-stack-4 .af-label .af-input .af-textarea .af-btn-primary
            </code>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InteractivePlayground;

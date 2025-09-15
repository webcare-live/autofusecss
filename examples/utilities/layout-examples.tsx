/**
 * AutofuseCSS Layout Utility Examples
 * Interactive demonstrations of layout patterns, flexbox, grid, and positioning
 */

import React from "react";

export const LayoutExamples = () => {
  return (
    <div className="af-container af-stack-8">
      <h1 className="af-text-3xl">Layout Utilities</h1>

      {/* Container System */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Container System</h2>
        <p className="af-text-sm af-text-neutral-600">
          Responsive containers with automatic centering and padding.
        </p>

        <div className="af-stack-4">
          <div className="af-bg-neutral-100 af-p-4 af-radius-md">
            <div className="af-container af-bg-primary-100 af-p-4 af-radius-sm">
              <code className="af-text-sm af-font-mono">.af-container</code> -
              Default container (72rem max-width)
            </div>
          </div>

          <div className="af-bg-neutral-100 af-p-4 af-radius-md">
            <div className="af-container-sm af-bg-success-100 af-p-4 af-radius-sm">
              <code className="af-text-sm af-font-mono">.af-container-sm</code>{" "}
              - Small container (40rem max-width)
            </div>
          </div>

          <div className="af-bg-neutral-100 af-p-4 af-radius-md">
            <div className="af-container-md af-bg-warning-100 af-p-4 af-radius-sm">
              <code className="af-text-sm af-font-mono">.af-container-md</code>{" "}
              - Medium container (56rem max-width)
            </div>
          </div>
        </div>
      </section>

      {/* Holy Grail Layout */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Holy Grail Layout Pattern</h2>
        <p className="af-text-sm af-text-neutral-600">
          Classic three-column layout with header and footer using CSS Grid.
        </p>

        <div className="af-layout-holy-grail af-h-96 af-border af-radius-md af-overflow-hidden">
          <header className="af-bg-primary-600 af-text-white af-p-4 af-flex af-items-center af-justify-center">
            <span className="af-font-medium">Header</span>
          </header>

          <aside className="af-bg-neutral-200 af-p-4 af-flex af-items-center af-justify-center">
            <span className="af-text-sm af-text-neutral-700">Left Sidebar</span>
          </aside>

          <main className="af-bg-white af-p-6 af-stack-4">
            <h3 className="af-text-lg af-font-medium">Main Content Area</h3>
            <p className="af-text-sm af-text-neutral-600">
              This is the main content area that expands to fill available
              space. The layout automatically adjusts to different screen sizes.
            </p>
          </main>

          <aside className="af-bg-neutral-200 af-p-4 af-flex af-items-center af-justify-center">
            <span className="af-text-sm af-text-neutral-700">
              Right Sidebar
            </span>
          </aside>

          <footer className="af-bg-neutral-800 af-text-white af-p-4 af-flex af-items-center af-justify-center">
            <span className="af-font-medium">Footer</span>
          </footer>
        </div>
      </section>

      {/* Sidebar Layout */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Sidebar Layout Pattern</h2>
        <p className="af-text-sm af-text-neutral-600">
          Flexible sidebar layout that adapts to content and screen size.
        </p>

        <div className="af-layout-sidebar af-h-64 af-border af-radius-md af-overflow-hidden">
          <aside className="af-bg-primary-100 af-p-4 af-stack-3">
            <h4 className="af-text-sm af-font-medium af-text-primary-800">
              Navigation
            </h4>
            <nav className="af-stack-2">
              <a href="#" className="af-text-sm af-text-primary-700 af-block">
                Dashboard
              </a>
              <a href="#" className="af-text-sm af-text-primary-700 af-block">
                Projects
              </a>
              <a href="#" className="af-text-sm af-text-primary-700 af-block">
                Settings
              </a>
            </nav>
          </aside>

          <main className="af-bg-white af-p-6 af-stack-3">
            <h3 className="af-text-lg af-font-medium">Content Area</h3>
            <p className="af-text-sm af-text-neutral-600">
              Main content that takes up the remaining space. The sidebar
              maintains a minimum width while this area is flexible.
            </p>
          </main>
        </div>
      </section>

      {/* Dashboard Layout */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Dashboard Layout Pattern</h2>
        <p className="af-text-sm af-text-neutral-600">
          Complex dashboard layout with header, sidebar, and content grid.
        </p>

        <div className="af-layout-dashboard af-h-96 af-border af-radius-md af-overflow-hidden">
          <header className="af-bg-neutral-900 af-text-white af-p-4 af-flex af-items-center af-justify-between">
            <h3 className="af-font-medium">Dashboard</h3>
            <div className="af-flex af-items-center af-gap-2">
              <span className="af-text-sm">User Name</span>
              <div className="af-w-8 af-h-8 af-bg-primary-500 af-radius-full"></div>
            </div>
          </header>

          <aside className="af-bg-neutral-100 af-p-4 af-stack-3">
            <nav className="af-stack-2">
              <a
                href="#"
                className="af-text-sm af-text-neutral-700 af-block af-p-2 af-bg-primary-100 af-radius-sm"
              >
                Overview
              </a>
              <a
                href="#"
                className="af-text-sm af-text-neutral-700 af-block af-p-2 af-hover:af-bg-neutral-200 af-radius-sm"
              >
                Analytics
              </a>
              <a
                href="#"
                className="af-text-sm af-text-neutral-700 af-block af-p-2 af-hover:af-bg-neutral-200 af-radius-sm"
              >
                Reports
              </a>
            </nav>
          </aside>

          <main className="af-bg-white af-p-6">
            <div className="af-grid af-grid-cols-2 af-gap-4 af-h-full">
              <div className="af-bg-primary-50 af-p-4 af-radius-md af-flex af-items-center af-justify-center">
                <span className="af-text-sm af-text-primary-700">Widget 1</span>
              </div>
              <div className="af-bg-success-50 af-p-4 af-radius-md af-flex af-items-center af-justify-center">
                <span className="af-text-sm af-text-success-700">Widget 2</span>
              </div>
              <div className="af-bg-warning-50 af-p-4 af-radius-md af-flex af-items-center af-justify-center af-col-span-2">
                <span className="af-text-sm af-text-warning-700">
                  Full Width Widget
                </span>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* Flexbox Utilities */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">Flexbox Utilities</h2>

        <div className="af-grid af-grid-cols-1 md:af-grid-cols-2 af-gap-6">
          <div className="af-stack-4">
            <h3 className="af-text-lg af-font-medium">Flex Direction</h3>
            <div className="af-stack-3">
              <div className="af-bg-neutral-100 af-p-3 af-radius-md">
                <div className="af-flex af-gap-2">
                  <div className="af-bg-primary-500 af-text-white af-p-2 af-radius-sm af-text-xs">
                    1
                  </div>
                  <div className="af-bg-primary-600 af-text-white af-p-2 af-radius-sm af-text-xs">
                    2
                  </div>
                  <div className="af-bg-primary-700 af-text-white af-p-2 af-radius-sm af-text-xs">
                    3
                  </div>
                </div>
                <code className="af-text-xs af-text-neutral-600">
                  .af-flex (row)
                </code>
              </div>

              <div className="af-bg-neutral-100 af-p-3 af-radius-md">
                <div className="af-flex af-flex-col af-gap-2">
                  <div className="af-bg-success-500 af-text-white af-p-2 af-radius-sm af-text-xs">
                    1
                  </div>
                  <div className="af-bg-success-600 af-text-white af-p-2 af-radius-sm af-text-xs">
                    2
                  </div>
                  <div className="af-bg-success-700 af-text-white af-p-2 af-radius-sm af-text-xs">
                    3
                  </div>
                </div>
                <code className="af-text-xs af-text-neutral-600">
                  .af-flex-col
                </code>
              </div>
            </div>
          </div>

          <div className="af-stack-4">
            <h3 className="af-text-lg af-font-medium">Justify Content</h3>
            <div className="af-stack-3">
              <div className="af-bg-neutral-100 af-p-3 af-radius-md">
                <div className="af-flex af-justify-start af-gap-2">
                  <div className="af-bg-warning-500 af-w-8 af-h-8 af-radius-sm"></div>
                  <div className="af-bg-warning-600 af-w-8 af-h-8 af-radius-sm"></div>
                </div>
                <code className="af-text-xs af-text-neutral-600">
                  .af-justify-start
                </code>
              </div>

              <div className="af-bg-neutral-100 af-p-3 af-radius-md">
                <div className="af-flex af-justify-center af-gap-2">
                  <div className="af-bg-warning-500 af-w-8 af-h-8 af-radius-sm"></div>
                  <div className="af-bg-warning-600 af-w-8 af-h-8 af-radius-sm"></div>
                </div>
                <code className="af-text-xs af-text-neutral-600">
                  .af-justify-center
                </code>
              </div>

              <div className="af-bg-neutral-100 af-p-3 af-radius-md">
                <div className="af-flex af-justify-between af-gap-2">
                  <div className="af-bg-warning-500 af-w-8 af-h-8 af-radius-sm"></div>
                  <div className="af-bg-warning-600 af-w-8 af-h-8 af-radius-sm"></div>
                </div>
                <code className="af-text-xs af-text-neutral-600">
                  .af-justify-between
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid System */}
      <section className="af-card af-stack-6">
        <h2 className="af-text-xl">CSS Grid System</h2>

        <div className="af-stack-6">
          <div className="af-stack-3">
            <h3 className="af-text-lg af-font-medium">Basic Grid Layouts</h3>
            <div className="af-grid af-grid-cols-3 af-gap-4">
              <div className="af-bg-primary-200 af-p-4 af-radius-md af-text-center af-text-sm">
                Grid Item 1
              </div>
              <div className="af-bg-primary-300 af-p-4 af-radius-md af-text-center af-text-sm">
                Grid Item 2
              </div>
              <div className="af-bg-primary-400 af-p-4 af-radius-md af-text-center af-text-sm">
                Grid Item 3
              </div>
            </div>
            <code className="af-text-xs af-text-neutral-600">
              .af-grid .af-grid-cols-3 .af-gap-4
            </code>
          </div>

          <div className="af-stack-3">
            <h3 className="af-text-lg af-font-medium">Responsive Grid</h3>
            <div className="af-grid af-grid-cols-1 md:af-grid-cols-2 lg:af-grid-cols-4 af-gap-4">
              <div className="af-bg-success-200 af-p-4 af-radius-md af-text-center af-text-sm">
                Responsive 1
              </div>
              <div className="af-bg-success-300 af-p-4 af-radius-md af-text-center af-text-sm">
                Responsive 2
              </div>
              <div className="af-bg-success-400 af-p-4 af-radius-md af-text-center af-text-sm">
                Responsive 3
              </div>
              <div className="af-bg-success-500 af-text-white af-p-4 af-radius-md af-text-center af-text-sm">
                Responsive 4
              </div>
            </div>
            <code className="af-text-xs af-text-neutral-600">
              .af-grid-cols-1 md:af-grid-cols-2 lg:af-grid-cols-4
            </code>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LayoutExamples;

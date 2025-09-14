import React from "react";
import { AutofuseProvider } from "../../src/react/Provider";

/**
 * Basic AutofuseCSS Demo
 * Demonstrates core scaling utilities and responsive design
 */
export function BasicDemo() {
  return (
    <AutofuseProvider theme="base">
      <div className="p-fluid-4 space-y-fluid-3">
        {/* Typography Scaling */}
        <section className="space-y-fluid-2">
          <h1 className="text-fluid-4xl font-bold text-gray-900">
            AutofuseCSS Typography
          </h1>
          <h2 className="text-fluid-3xl font-semibold text-gray-800">
            Fluid Responsive Headings
          </h2>
          <h3 className="text-fluid-2xl font-medium text-gray-700">
            Subsection Header
          </h3>
          <p className="text-fluid-base leading-fluid-relaxed text-gray-600">
            This paragraph demonstrates fluid typography that scales smoothly
            across all screen sizes. The text adapts automatically without media
            queries, providing optimal readability at any viewport.
          </p>
        </section>

        {/* Spacing System */}
        <section className="space-y-fluid-3">
          <h2 className="text-fluid-2xl font-semibold">Fluid Spacing System</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-3">
            <div className="p-fluid-3 bg-blue-50 rounded-fluid-md border border-blue-200">
              <h3 className="text-fluid-lg font-medium mb-fluid-2">
                Compact Card
              </h3>
              <p className="text-fluid-sm text-gray-600">
                Fluid padding and margins create consistent spacing.
              </p>
            </div>
            <div className="p-fluid-4 bg-green-50 rounded-fluid-lg border border-green-200">
              <h3 className="text-fluid-lg font-medium mb-fluid-2">
                Medium Card
              </h3>
              <p className="text-fluid-sm text-gray-600">
                Larger padding for more breathing room.
              </p>
            </div>
            <div className="p-fluid-5 bg-purple-50 rounded-fluid-xl border border-purple-200">
              <h3 className="text-fluid-lg font-medium mb-fluid-3">
                Spacious Card
              </h3>
              <p className="text-fluid-sm text-gray-600">
                Maximum comfort with generous spacing.
              </p>
            </div>
          </div>
        </section>

        {/* Layout System */}
        <section className="space-y-fluid-3">
          <h2 className="text-fluid-2xl font-semibold">Fluid Layout</h2>
          <div className="bg-gray-50 p-fluid-4 rounded-fluid-lg">
            <div className="flex flex-wrap gap-fluid-2 items-center justify-between">
              <button className="px-fluid-3 py-fluid-2 bg-blue-500 text-white rounded-fluid-md hover:bg-blue-600 transition-colors">
                Primary Action
              </button>
              <button className="px-fluid-3 py-fluid-2 border border-gray-300 rounded-fluid-md hover:bg-gray-50 transition-colors">
                Secondary Action
              </button>
              <button className="px-fluid-2 py-fluid-1 text-fluid-sm text-gray-600 hover:text-gray-800 transition-colors">
                Tertiary Action
              </button>
            </div>
          </div>
        </section>

        {/* Responsive Containers */}
        <section className="space-y-fluid-3">
          <h2 className="text-fluid-2xl font-semibold">
            Responsive Containers
          </h2>
          <div className="space-y-fluid-3">
            <div className="w-fluid-xs bg-orange-100 p-fluid-3 rounded-fluid-md">
              <p className="text-fluid-sm">
                Extra Small Container (w-fluid-xs)
              </p>
            </div>
            <div className="w-fluid-sm bg-yellow-100 p-fluid-3 rounded-fluid-md">
              <p className="text-fluid-sm">Small Container (w-fluid-sm)</p>
            </div>
            <div className="w-fluid-md bg-green-100 p-fluid-3 rounded-fluid-md">
              <p className="text-fluid-sm">Medium Container (w-fluid-md)</p>
            </div>
            <div className="w-fluid-lg bg-blue-100 p-fluid-3 rounded-fluid-md">
              <p className="text-fluid-sm">Large Container (w-fluid-lg)</p>
            </div>
            <div className="w-fluid-xl bg-purple-100 p-fluid-3 rounded-fluid-md">
              <p className="text-fluid-sm">
                Extra Large Container (w-fluid-xl)
              </p>
            </div>
          </div>
        </section>
      </div>
    </AutofuseProvider>
  );
}

export default BasicDemo;

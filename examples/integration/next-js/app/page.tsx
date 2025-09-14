export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-fluid-4 py-fluid-8">
        <div className="text-center space-y-fluid-4">
          <h1 className="text-fluid-5xl font-bold text-gray-900 leading-fluid-tight">
            AutofuseCSS with Next.js
          </h1>
          <p className="text-fluid-xl text-gray-600 max-w-fluid-2xl mx-auto leading-fluid-relaxed">
            Experience fluid responsive design that adapts smoothly across all
            devices without media queries. Mathematical precision meets modern
            CSS.
          </p>
          <div className="flex flex-wrap justify-center gap-fluid-3">
            <button className="px-fluid-4 py-fluid-3 bg-blue-600 text-white rounded-fluid-lg hover:bg-blue-700 transition-colors text-fluid-base font-medium">
              Get Started
            </button>
            <button className="px-fluid-4 py-fluid-3 border border-gray-300 rounded-fluid-lg hover:bg-gray-50 transition-colors text-fluid-base font-medium">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-fluid-4 py-fluid-8">
        <div className="text-center mb-fluid-6">
          <h2 className="text-fluid-3xl font-bold text-gray-900 mb-fluid-3">
            Fluid Design Features
          </h2>
          <p className="text-fluid-lg text-gray-600 max-w-fluid-xl mx-auto">
            All utilities scale smoothly from mobile to desktop
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-4">
          {[
            {
              title: "Fluid Typography",
              description: "Text that scales perfectly across all screen sizes",
              icon: "📝",
            },
            {
              title: "Smart Spacing",
              description:
                "Consistent padding and margins that adapt automatically",
              icon: "📏",
            },
            {
              title: "Responsive Sizing",
              description:
                "Elements that grow and shrink with mathematical precision",
              icon: "📐",
            },
            {
              title: "Mathematical Harmony",
              description: "Perfect fourth scaling ratio for visual balance",
              icon: "🎵",
            },
            {
              title: "CSS Clamp Power",
              description: "Modern CSS without media query complexity",
              icon: "⚡",
            },
            {
              title: "Theme Variants",
              description: "Multiple density options for different use cases",
              icon: "🎨",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-fluid-4 rounded-fluid-xl shadow-fluid-md hover:shadow-fluid-lg transition-shadow"
            >
              <div className="text-fluid-4xl mb-fluid-3">{feature.icon}</div>
              <h3 className="text-fluid-xl font-semibold text-gray-900 mb-fluid-2">
                {feature.title}
              </h3>
              <p className="text-fluid-base text-gray-600 leading-fluid-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Code Example */}
      <section className="container mx-auto px-fluid-4 py-fluid-8">
        <div className="bg-gray-900 rounded-fluid-2xl p-fluid-6 text-white">
          <h2 className="text-fluid-2xl font-bold mb-fluid-4">
            Simple, Powerful API
          </h2>
          <div className="bg-gray-800 rounded-fluid-lg p-fluid-4 font-mono text-fluid-sm overflow-x-auto">
            <pre className="text-green-400">
              {`// Fluid utilities work everywhere
<div className="p-fluid-4 space-y-fluid-3">
  <h1 className="text-fluid-3xl">
    Responsive heading
  </h1>
  <p className="text-fluid-base leading-fluid-relaxed">
    Paragraph that scales smoothly
  </p>
  <button className="px-fluid-3 py-fluid-2 rounded-fluid-md">
    Perfect button
  </button>
</div>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-fluid-4 py-fluid-6 text-center">
        <p className="text-fluid-sm text-gray-500">
          Built with AutofuseCSS • Fluid responsive design made simple
        </p>
      </footer>
    </main>
  );
}

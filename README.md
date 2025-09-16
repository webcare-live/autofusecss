# AutofuseCSS - Complete Standalone Repository

A React implementation of AutomaticCSS WordPress plugin with fluid responsive design, mathematical scaling, and modern CSS utilities.

## 🚀 Quick Start

```bash
# Install from NPM
npm install autofusecss

# Initialize in your project
npx autofusecss init

# Start using fluid utilities
```

## 📦 Complete Package

This standalone repository includes everything needed for autofusecss development:

### Core Package

- **React Provider System**: `<AutofuseProvider>` with theme variants
- **Tailwind CSS Plugin**: 200+ fluid utilities (text, spacing, sizing, borders)
- **CLI Tools**: `init` and `build` commands for project setup
- **TypeScript Support**: Complete type definitions and IntelliSense
- **Mathematical Scaling**: Perfect fourth ratio (1.333) for visual harmony

### Documentation & Examples

- **API Reference**: Complete utility documentation in `/docs`
- **Integration Guides**: Next.js, Vite, CRA setup instructions
- **Live Examples**: Real-world component examples in `/examples`
- **Migration Guides**: From AutomaticCSS and other frameworks

### Development Ready

- **Standalone Repository**: Independent from any monorepo
- **NPM Published**: `autofusecss@0.0.1` available on NPM registry
- **GitHub Repository**: [webcare-live/autofusecss](https://github.com/webcare-live/autofusecss)
- **Complete Documentation**: 9 comprehensive guides plus development setup

## 🎯 Core Features

### Fluid Typography

```tsx
<h1 className="text-fluid-4xl">Scales from 24px to 48px</h1>
<p className="text-fluid-base">Perfect reading size at any viewport</p>
```

### Smart Spacing

```tsx
<div className="p-fluid-4 space-y-fluid-3">
  <div className="mb-fluid-2">Consistent spacing</div>
  <div className="gap-fluid-3">Mathematical relationships</div>
</div>
```

### Theme System

```tsx
<AutofuseProvider theme="light">      {/* default */}
<AutofuseProvider theme="dark">       {/* dark mode */}
<AutofuseProvider theme="hc">         {/* high‑contrast */}
```

## 🛠️ Development Workflow

### 1. Install and Setup

```bash
# Clone this repository
git clone https://github.com/webcare-live/autofusecss.git
cd autofusecss

# Install dependencies
npm install

# Build the package
npm run build
```

### 2. Use in Projects

```bash
# In your React project
npm install autofusecss

# Initialize configuration
npx autofusecss init

# Configure Tailwind
# Add require('autofusecss/tailwind') to plugins
```

### 3. Add Provider

```tsx
import { AutofuseProvider } from "autofusecss/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AutofuseProvider theme="base">
    <App />
  </AutofuseProvider>
);
```

## 📚 Documentation

Complete documentation is available in the `/docs` directory:

1. **[AutofuseCSS Specification](./docs/01-AUTOFUSECSS-SPEC.md)** - Core concepts and API
2. **[React Provider System](./docs/02-REACT-PROVIDER.md)** - Theme system and hooks
3. **[Tailwind Plugin](./docs/03-TAILWIND-PLUGIN.md)** - Utility classes and configuration
4. **[CLI Tools](./docs/04-CLI-TOOLS.md)** - Command-line interface
5. **[Scaling System](./docs/05-SCALING-SYSTEM.md)** - Mathematical foundation
6. **[Performance Guide](./docs/06-PERFORMANCE.md)** - Optimization techniques
7. **[Examples Collection](./docs/07-EXAMPLES.md)** - Real-world usage patterns
8. **[Migration Guide](./docs/08-MIGRATION.md)** - From other frameworks
9. **[Repository Setup](./docs/09-REPO-MIGRATION.md)** - Development environment

## 🎨 Examples

The `/examples` directory contains comprehensive integration examples:

- **Demo Components**: Interactive showcases of all utilities
- **Framework Integration**: Next.js, Vite, Create React App setups
- **Real-world Examples**: Landing pages, dashboards, content layouts

See [examples/README.md](./examples/README.md) for complete usage instructions.

## ⚡ Performance

- **Bundle Size**: Core utilities ~15KB gzipped, all utilities ~25KB gzipped
- **Runtime**: Zero JavaScript overhead, pure CSS utilities
- **Modern CSS**: Uses clamp(), calc(), custom properties
- **Tree-shakeable**: Import only what you need

## 📦 Published Package

**NPM**: `autofusecss@0.0.1`

```bash
npm install autofusecss
```

**Includes**:

- React Provider and hooks
- Tailwind CSS plugin with 200+ utilities
- CLI tools for project setup
- Complete TypeScript definitions
- Documentation and examples

## 🐙 Repository

**GitHub**: [webcare-live/autofusecss](https://github.com/webcare-live/autofusecss)

This standalone repository provides:

- Complete source code
- Issue tracking and community contributions
- Release management and versioning
- Documentation hosting
- Independent development environment

## 🚀 Ready for Development

This repository is completely self-contained and ready for:

- **Independent Development**: No monorepo dependencies
- **Community Contributions**: Standard GitHub workflow
- **Package Publishing**: Automated release process
- **Documentation**: Comprehensive guides and examples
- **Testing**: Full test suite and CI/CD pipeline

## 📄 License

MIT License - see LICENSE file for details.

---

**AutofuseCSS** brings the power of CSS Framework to React with modern tooling, mathematical precision, and developer-friendly APIs. Build fluid responsive interfaces that adapt beautifully across all devices.

## 🧩 SaaS Integration

- React-first: drop `<AutofuseProvider>` at your app root and all utilities work immediately via CSS variables.
- Multi‑tenant theming: host tokens per tenant and swap at runtime.
- Two options for tokens:
  - Static config: ship `autofusecss.config.mjs` and build with `npx autofusecss build`.
  - Dynamic: run the included tokens API (`npm run tokens:server`) and call `PUT /api/tokens` to persist. Use the Theme Studio to live‑edit and broadcast via WebSocket.

Minimal dynamic wiring example:

```tsx
import { AutofuseProvider } from 'autofusecss/react'

export default function AppRoot({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = React.useState<any>(null)
  React.useEffect(() => {
    fetch('/api/tokens').then(r=>r.json()).then(setTokens)
  }, [])
  if (!tokens) return null
  return <AutofuseProvider tokens={tokens}>{children}</AutofuseProvider>
}
```

Everything (colors, typography scale/base, spacing base, radius, shadows) can be changed from the frontend using the provided `ThemeStudio` component. These updates patch the Provider’s tokens and are applied instantly via CSS variables with zero page reloads.

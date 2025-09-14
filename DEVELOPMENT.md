# AutofuseCSS Development Setup

Complete setup instructions for developing with AutofuseCSS framework.

## Quick Start

```bash
# Install the package
npm install autofusecss

# Initialize in your project
npx autofusecss init

# Start using fluid utilities
# Add to your CSS or import in your app
```

## Project Setup

### 1. Next.js Project

```bash
# Create new Next.js project
npx create-next-app@latest my-autofuse-app --typescript --tailwind

# Navigate to project
cd my-autofuse-app

# Install AutofuseCSS
npm install autofusecss

# Initialize configuration
npx autofusecss init
```

**tailwind.config.js**:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("autofusecss/tailwind")],
};
```

**app/layout.tsx**:

```tsx
import { AutofuseProvider } from "autofusecss/react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AutofuseProvider theme="base">{children}</AutofuseProvider>
      </body>
    </html>
  );
}
```

### 2. Vite + React Project

```bash
# Create Vite project
npm create vite@latest my-autofuse-app -- --template react-ts

# Navigate and install
cd my-autofuse-app
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install AutofuseCSS
npm install autofusecss

# Initialize configuration
npx autofusecss init
```

**tailwind.config.js**:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("autofusecss/tailwind")],
};
```

**src/main.tsx**:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { AutofuseProvider } from "autofusecss/react";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AutofuseProvider theme="base">
      <App />
    </AutofuseProvider>
  </React.StrictMode>
);
```

### 3. Create React App (Legacy)

```bash
# Create CRA project
npx create-react-app my-autofuse-app --template typescript

# Navigate to project
cd my-autofuse-app

# Install Tailwind CSS
npm install -D tailwindcss
npx tailwindcss init

# Install AutofuseCSS
npm install autofusecss

# Initialize configuration
npx autofusecss init
```

## CLI Commands

### Initialize Project

```bash
# Basic initialization
npx autofusecss init

# With specific theme
npx autofusecss init --theme compact

# With custom configuration
npx autofusecss init --config ./autofuse.config.js
```

### Build Custom CSS

```bash
# Build with default settings
npx autofusecss build

# Build with specific theme
npx autofusecss build --theme spacious

# Build with custom scales
npx autofusecss build --ratio 1.414 --base-size 18px

# Output to specific file
npx autofusecss build --output ./dist/autofuse.css
```

## Configuration

### Theme Variants

```tsx
// Available themes
<AutofuseProvider theme="base">      {/* Default balanced design */}
<AutofuseProvider theme="compact">   {/* Tighter spacing, smaller text */}
<AutofuseProvider theme="comfortable"> {/* More breathing room */}
<AutofuseProvider theme="spacious">  {/* Maximum spacing and comfort */}
```

### Custom Configuration

**autofuse.config.js**:

```js
module.exports = {
  theme: "base",
  ratio: 1.333, // Perfect fourth
  baseSize: "16px",
  breakpoints: {
    mobile: "320px",
    desktop: "1200px",
  },
  scales: {
    typography: [0.75, 1, 1.333, 1.777, 2.369],
    spacing: [0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8],
    sizing: [0.5, 1, 2, 4, 8, 16, 32, 64],
  },
};
```

## Development Workflow

### 1. Start with Provider

```tsx
import { AutofuseProvider } from "autofusecss/react";

function App() {
  return (
    <AutofuseProvider theme="base">{/* Your app content */}</AutofuseProvider>
  );
}
```

### 2. Use Fluid Utilities

```tsx
function Component() {
  return (
    <div className="p-fluid-4 space-y-fluid-3">
      <h1 className="text-fluid-4xl font-bold">Responsive Heading</h1>
      <p className="text-fluid-base leading-fluid-relaxed">
        Fluid paragraph text that scales smoothly.
      </p>
      <button className="px-fluid-3 py-fluid-2 bg-blue-500 text-white rounded-fluid-md">
        Fluid Button
      </button>
    </div>
  );
}
```

### 3. Test Across Devices

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

All fluid utilities scale smoothly across these breakpoints.

## TypeScript Support

AutofuseCSS includes complete TypeScript definitions:

```tsx
import type { AutofuseTheme, FluidScale, AutofuseConfig } from "autofusecss";

const config: AutofuseConfig = {
  theme: "base",
  ratio: 1.333,
};
```

## CSS Custom Properties

AutofuseCSS generates CSS custom properties for runtime theming:

```css
:root {
  --autofuse-ratio: 1.333;
  --autofuse-base-size: 16px;
  --autofuse-mobile-bp: 320px;
  --autofuse-desktop-bp: 1200px;
}
```

## Performance Optimization

### 1. Purge Unused Classes

Tailwind CSS automatically purges unused classes in production.

### 2. Tree Shaking

Only import what you need:

```tsx
// Good: Tree-shakeable import
import { AutofuseProvider } from "autofusecss/react";

// Avoid: Full package import
import * as AutofuseCSS from "autofusecss";
```

### 3. CSS Output Size

- **Base utilities**: ~15KB gzipped
- **All utilities**: ~25KB gzipped
- **Custom builds**: Optimized for your needs

## Troubleshooting

### Common Issues

1. **Classes not applying**

   - Ensure Tailwind CSS is configured correctly
   - Check that AutofuseCSS plugin is in `tailwind.config.js`
   - Verify CSS is being imported

2. **TypeScript errors**

   - Update `@types/react` to latest version
   - Ensure `tsx` files are in TypeScript paths

3. **Build errors**
   - Check Node.js version (16+ required)
   - Clear `node_modules` and reinstall
   - Verify all peer dependencies

### Debug Mode

```bash
# Enable verbose logging
DEBUG=autofusecss npx autofusecss build

# Check generated CSS
npx autofusecss build --output debug.css --verbose
```

## VS Code Setup

**settings.json**:

```json
{
  "tailwindCSS.experimental.classRegex": [
    ["autofuse\\(([^)]*)\\)", "'([^']*)'"],
    "(?:enter|leave)(?:From|To)?=\\s*(?:\"|')([^\"']*)"
  ],
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  }
}
```

## Browser DevTools

Use browser devtools to inspect generated CSS:

1. Open DevTools (F12)
2. Inspect element with fluid classes
3. View computed CSS clamp() values
4. Test responsive scaling by resizing viewport

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and contribution guidelines.

## Support

- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: Community help and ideas
- **Documentation**: Comprehensive guides and API reference

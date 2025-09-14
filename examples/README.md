# AutofuseCSS Examples

This directory contains comprehensive examples demonstrating all AutofuseCSS features.

## Structure

```
examples/
├── demo/               # Interactive demo components
│   ├── basic-demo.tsx         # Core features showcase
│   ├── advanced-demo.tsx      # Advanced utilities
│   └── theme-demo.tsx         # Theming system
├── integration/        # Framework integration examples
│   ├── next-js/              # Next.js setup
│   ├── vite-react/           # Vite + React setup
│   └── create-react-app/     # CRA setup
└── showcase/          # Real-world examples
    ├── landing-page/         # Marketing page
    ├── dashboard/            # Admin interface
    └── blog/                 # Content layout
```

## Running Examples

### Option 1: Copy to your project

```bash
# Copy specific examples to your React project
cp examples/demo/basic-demo.tsx src/components/
```

### Option 2: Development setup

```bash
# Install React for example development
npm install --save-dev react @types/react

# Run with your preferred bundler
# (Vite, Webpack, etc.)
```

## Key Features Demonstrated

### Core Utilities

- **Fluid Typography**: `text-fluid-*` classes for responsive text
- **Fluid Spacing**: `p-fluid-*`, `m-fluid-*`, `gap-fluid-*` for consistent spacing
- **Fluid Sizing**: `w-fluid-*`, `h-fluid-*` for responsive dimensions
- **Fluid Borders**: `rounded-fluid-*`, `border-fluid-*` for scalable borders

### Mathematical Scaling

- **Perfect Fourth**: Default 1.333 ratio for harmonious proportions
- **Responsive Breakpoints**: Smooth scaling from mobile to desktop
- **CSS Clamp**: Modern responsive design without media queries

### Provider System

- **Theme Variants**: base, compact, comfortable, spacious
- **Runtime Configuration**: Dynamic theming and customization
- **Type Safety**: Full TypeScript support

## Integration Patterns

### 1. Basic Setup

```tsx
import { AutofuseProvider } from "autofusecss/react";

function App() {
  return (
    <AutofuseProvider theme="base">
      <YourComponents />
    </AutofuseProvider>
  );
}
```

### 2. Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  plugins: [require("autofusecss/tailwind")],
};
```

### 3. CLI Usage

```bash
# Initialize in project
npx autofusecss init

# Build custom configuration
npx autofusecss build --theme compact
```

## Best Practices

1. **Start with Provider**: Always wrap your app in `AutofuseProvider`
2. **Use Fluid Classes**: Prefer `fluid-*` over fixed sizes for responsive design
3. **Theme Consistency**: Choose one theme variant per project
4. **Mathematical Harmony**: Leverage the built-in scaling ratios
5. **Performance**: Utilities are optimized for minimal CSS output

## Common Patterns

### Responsive Cards

```tsx
<div className="p-fluid-4 rounded-fluid-lg bg-white shadow-fluid-md">
  <h2 className="text-fluid-xl mb-fluid-3">Card Title</h2>
  <p className="text-fluid-base leading-fluid-relaxed">Content</p>
</div>
```

### Button System

```tsx
<button className="px-fluid-3 py-fluid-2 text-fluid-sm rounded-fluid-md bg-blue-500 hover:bg-blue-600">
  Action Button
</button>
```

### Layout Grids

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-4">
  {items.map((item) => (
    <div key={item.id} className="space-y-fluid-2">
      {/* Card content */}
    </div>
  ))}
</div>
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

(CSS clamp() and modern CSS features)

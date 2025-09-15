# AutofuseCSS Utility Examples

Comprehensive interactive examples and demonstrations for all AutofuseCSS utilities.

## 📁 Structure

```
examples/utilities/
├── spacing-examples.tsx         # Spacing, margin, padding, stack utilities
├── typography-examples.tsx      # Text sizing, weights, type scale
├── color-examples.tsx          # Colors, palettes, semantic colors
├── layout-examples.tsx         # Flexbox, grid, layout patterns
├── advanced-examples.tsx       # Masks, filters, gradients, overlays
├── interactive-playground.tsx  # Live testing environment
└── index.ts                   # Exports and utility reference
```

## 🎯 Categories

### Spacing & Stack

- **Mathematical Scaling**: Perfect fourth ratio (1.333) for consistent proportions
- **Margin/Padding**: `af-m-*`, `af-p-*` utilities with responsive variants
- **Stack System**: `af-stack-*` for consistent vertical spacing between elements
- **Container System**: `af-container-*` for responsive layouts

### Typography

- **Scale System**: `af-text-xs` through `af-text-3xl` with mathematical progression
- **Hierarchy**: Consistent type scales for headings, body text, and captions
- **Color Integration**: Semantic color combinations for different text contexts
- **Responsive**: Mobile-first responsive typography patterns

### Colors & Palettes

- **OKLCH Color Space**: Perceptually uniform colors for better accessibility
- **Semantic System**: Success, warning, danger, info color families
- **Neutral Grays**: Complete grayscale palette for text hierarchy
- **Accessibility**: WCAG AA/AAA compliant color combinations

### Layout & Positioning

- **Container System**: Responsive containers with automatic centering
- **Flexbox Utilities**: Complete flexbox control with gap utilities
- **CSS Grid**: Grid layouts with responsive column systems
- **Layout Patterns**: Pre-built patterns (holy-grail, sidebar, dashboard)

### Advanced Effects

- **Dimension Utilities**: Width, height, size with mathematical scaling
- **CSS Masks**: Circle, radial, fade masks for creative effects
- **Clip Paths**: Triangle, hexagon, star, diamond shapes
- **Filter Effects**: Blur, brightness, contrast, hue-rotate, saturate
- **Gradient Presets**: Ocean, sunset, forest, fire, radial, conic gradients

### Overlay Systems

- **Gradient Overlays**: Dark and light overlays for content readability
- **Blend Modes**: Multiply, screen, overlay blend effects
- **Pattern Overlays**: Dots, grid, diagonal, noise patterns
- **Advanced Combinations**: Multiple effects for complex visuals

## 🚀 Usage

### In a React Application

```tsx
import {
  SpacingExamples,
  InteractivePlayground,
} from "autofusecss/examples/utilities";

function App() {
  return (
    <div>
      <SpacingExamples />
      <InteractivePlayground />
    </div>
  );
}
```

### Individual Components

```tsx
import { Playground } from "autofusecss/examples/utilities";

function MyDemo() {
  return (
    <Playground
      title="Custom Demo"
      description="Test your utilities"
      initialClasses="af-p-4 af-bg-primary-100 af-radius-md"
    >
      <div>Your content here</div>
    </Playground>
  );
}
```

## 🎮 Interactive Playground

The Interactive Playground provides:

- **Live Editing**: Real-time class editing with instant preview
- **Pattern Library**: Pre-built component patterns
- **Quick Reference**: Utility class lookup and examples
- **Copy-Paste Ready**: Generate code snippets for your projects

### Features

1. **Real-time Preview**: See changes instantly as you type
2. **Pattern Examples**: Card, alert, navigation, form patterns
3. **Class Reference**: Quick lookup for all utility classes
4. **Export Options**: Copy generated HTML/JSX code

## 📚 Utility Reference

### Quick Lookup

```typescript
import { utilityReference } from "autofusecss/examples/utilities";

// Get all spacing utilities
const spacingUtils = utilityReference.spacing;

// Generate example code
import { generateExample } from "autofusecss/examples/utilities";
const example = generateExample("spacing", "af-p-4");
```

### Common Patterns

```tsx
// Card Pattern
<div className="af-card af-stack-4">
  <h3 className="af-text-lg af-font-medium">Card Title</h3>
  <p className="af-text-sm af-text-neutral-600">Card content</p>
  <button className="af-btn af-btn-primary">Action</button>
</div>

// Alert Pattern
<div className="af-bg-success-100 af-text-success-800 af-p-4 af-radius-md af-border af-border-success-300">
  <h4 className="af-font-medium">Success!</h4>
  <p className="af-text-sm">Operation completed successfully.</p>
</div>

// Layout Pattern
<div className="af-layout-sidebar">
  <aside className="af-bg-neutral-100 af-p-4">Sidebar</aside>
  <main className="af-p-6">Main content</main>
</div>
```

## 🎨 Mathematical Scaling

AutofuseCSS uses a **perfect fourth ratio (1.333)** for mathematical scaling:

- **Spacing**: Each step multiplies by 1.333 for harmonious proportions
- **Typography**: Type scale follows musical intervals for visual harmony
- **Dimensions**: Width/height utilities use the same mathematical progression

### Scale Visualization

```
af-text-xs:   0.75rem  (base × 0.75)
af-text-sm:   0.875rem (base × 0.875)
af-text-base: 1rem     (base)
af-text-lg:   1.125rem (base × 1.125)
af-text-xl:   1.25rem  (base × 1.25)
af-text-2xl:  1.5rem   (base × 1.5)
af-text-3xl:  1.875rem (base × 1.875)
```

## 🔧 Development

### Running Examples Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build examples
npm run build:examples
```

### Adding New Examples

1. Create new component in `examples/utilities/`
2. Export from `index.ts`
3. Add to `exampleCategories` array
4. Update utility reference if needed

### Testing Examples

```bash
# Run component tests
npm run test:examples

# Visual regression tests
npm run test:visual

# Accessibility tests
npm run test:a11y
```

## 📖 Documentation

Each example includes:

- **Live Demos**: Interactive components showing utility effects
- **Code Examples**: Copy-paste ready code snippets
- **Usage Notes**: Best practices and common patterns
- **Accessibility**: WCAG compliance and semantic HTML
- **Responsive**: Mobile-first responsive design patterns

## 🎯 Best Practices

1. **Mobile First**: Start with mobile styles, enhance for larger screens
2. **Semantic HTML**: Use proper HTML elements with utility classes
3. **Accessibility**: Ensure color contrast meets WCAG standards
4. **Performance**: Use selective builds for production optimization
5. **Consistency**: Stick to the mathematical scale for visual harmony

## 🔗 Related Documentation

- [AutofuseCSS Main Documentation](../../README.md)
- [Utility Documentation](../../docs/utilities/)
- [CLI Documentation](../../docs/07-CLI-SPEC.md)
- [Theme Studio Guide](../../docs/11-STUDIO-SPEC.md)
- [Integration Guide](../../docs/04-INTEGRATION-STEPS.md)

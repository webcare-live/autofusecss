import SpacingExamples from "./spacing-examples";
import TypographyExamples from "./typography-examples";
import ColorExamples from "./color-examples";
import LayoutExamples from "./layout-examples";
import AdvancedExamples from "./advanced-examples";
import InteractivePlayground, { Playground } from "./interactive-playground";

// Re-export all components
export {
  SpacingExamples,
  TypographyExamples,
  ColorExamples,
  LayoutExamples,
  AdvancedExamples,
  InteractivePlayground,
  Playground,
};

// Example categories for navigation
export const exampleCategories = [
  {
    id: "spacing",
    title: "Spacing & Stack",
    description:
      "Margin, padding, and stack utilities with mathematical scaling",
    component: "SpacingExamples",
    features: ["Mathematical scaling", "Stack utilities", "Responsive spacing"],
  },
  {
    id: "typography",
    title: "Typography",
    description: "Text sizing, weights, and hierarchical typography system",
    component: "TypographyExamples",
    features: ["Perfect fourth ratio", "Responsive text", "Color combinations"],
  },
  {
    id: "colors",
    title: "Colors & Palettes",
    description: "OKLCH color space, semantic colors, and accessibility",
    component: "ColorExamples",
    features: ["OKLCH color space", "Semantic colors", "WCAG compliance"],
  },
  {
    id: "layout",
    title: "Layout & Positioning",
    description: "Flexbox, grid, containers, and layout patterns",
    component: "LayoutExamples",
    features: ["CSS Grid", "Flexbox", "Layout patterns", "Responsive design"],
  },
  {
    id: "advanced",
    title: "Advanced Effects",
    description: "Masks, filters, gradients, and overlay systems",
    component: "AdvancedExamples",
    features: [
      "CSS masks",
      "Filter effects",
      "Gradient presets",
      "Overlay systems",
    ],
  },
  {
    id: "playground",
    title: "Interactive Playground",
    description: "Live testing environment for all utilities",
    component: "InteractivePlayground",
    features: ["Live editing", "Real-time preview", "Pattern library"],
  },
];

// Utility reference for quick lookup
export const utilityReference = {
  spacing: {
    margin: [
      "af-m-0",
      "af-m-2",
      "af-m-4",
      "af-m-6",
      "af-m-8",
      "af-m-12",
      "af-m-16",
    ],
    padding: [
      "af-p-0",
      "af-p-2",
      "af-p-4",
      "af-p-6",
      "af-p-8",
      "af-p-12",
      "af-p-16",
    ],
    stack: [
      "af-stack-0",
      "af-stack-2",
      "af-stack-4",
      "af-stack-6",
      "af-stack-8",
    ],
  },
  typography: {
    sizes: [
      "af-text-xs",
      "af-text-sm",
      "af-text-base",
      "af-text-lg",
      "af-text-xl",
      "af-text-2xl",
      "af-text-3xl",
    ],
    weights: [
      "af-font-normal",
      "af-font-medium",
      "af-font-semibold",
      "af-font-bold",
    ],
    colors: [
      "af-text-primary-700",
      "af-text-neutral-600",
      "af-text-success-700",
      "af-text-danger-700",
    ],
  },
  colors: {
    backgrounds: [
      "af-bg-primary-500",
      "af-bg-success-100",
      "af-bg-warning-100",
      "af-bg-danger-100",
    ],
    text: [
      "af-text-primary-700",
      "af-text-neutral-900",
      "af-text-neutral-600",
      "af-text-neutral-400",
    ],
    semantic: [
      "af-text-success-700",
      "af-text-warning-700",
      "af-text-danger-700",
      "af-text-info-700",
    ],
  },
  layout: {
    containers: [
      "af-container",
      "af-container-sm",
      "af-container-md",
      "af-container-lg",
    ],
    flex: [
      "af-flex",
      "af-flex-col",
      "af-justify-center",
      "af-items-center",
      "af-gap-4",
    ],
    grid: [
      "af-grid",
      "af-grid-cols-2",
      "af-grid-cols-3",
      "af-grid-cols-4",
      "af-gap-4",
    ],
    patterns: [
      "af-layout-holy-grail",
      "af-layout-sidebar",
      "af-layout-dashboard",
    ],
  },
  dimensions: {
    width: [
      "af-w-2",
      "af-w-4",
      "af-w-8",
      "af-w-16",
      "af-w-32",
      "af-w-48",
      "af-w-64",
    ],
    height: [
      "af-h-2",
      "af-h-4",
      "af-h-8",
      "af-h-16",
      "af-h-32",
      "af-h-48",
      "af-h-64",
    ],
    size: ["af-size-8", "af-size-12", "af-size-16", "af-size-24", "af-size-32"],
    constraints: ["af-min-w-16", "af-max-w-64", "af-min-h-8", "af-max-h-32"],
  },
  effects: {
    masks: [
      "af-mask-circle",
      "af-mask-radial",
      "af-mask-fade-t",
      "af-mask-fade-b",
    ],
    clips: [
      "af-clip-triangle",
      "af-clip-hexagon",
      "af-clip-star",
      "af-clip-diamond",
    ],
    filters: [
      "af-filter-blur-sm",
      "af-filter-brightness-125",
      "af-filter-contrast-125",
      "af-filter-grayscale",
    ],
    gradients: [
      "af-bg-gradient-ocean",
      "af-bg-gradient-sunset",
      "af-bg-gradient-forest",
      "af-bg-gradient-fire",
    ],
  },
  overlays: {
    basic: ["af-bg-overlay-dark", "af-bg-overlay-light"],
    blends: ["af-overlay-multiply", "af-overlay-screen", "af-overlay-overlay"],
    patterns: [
      "af-overlay-dots",
      "af-overlay-grid",
      "af-overlay-diagonal",
      "af-overlay-noise",
    ],
  },
};

// Documentation helper for generating examples
export const generateExample = (category: string, utility: string) => {
  const examples = {
    spacing: `<div className="${utility}">Content with spacing</div>`,
    typography: `<h1 className="${utility}">Typography example</h1>`,
    colors: `<div className="${utility}">Colored content</div>`,
    layout: `<div className="${utility}">Layout container</div>`,
    effects: `<div className="${utility} af-w-24 af-h-24 af-bg-primary-500">Effect demo</div>`,
    overlays: `<div className="${utility} af-w-32 af-h-32 af-bg-gradient-ocean">Overlay demo</div>`,
  };

  return (
    examples[category as keyof typeof examples] ||
    `<div className="${utility}">Example</div>`
  );
};

// Quick start guide
export const quickStartGuide = {
  installation: [
    "npm install autofusecss",
    'Import the React provider: import { AutofuseProvider } from "autofusecss/react"',
    "Wrap your app: <AutofuseProvider>{children}</AutofuseProvider>",
    'Add Tailwind plugin: require("autofusecss/tailwind")',
  ],
  basicUsage: [
    "Spacing: af-p-4 af-m-2 af-stack-4",
    "Typography: af-text-lg af-text-primary-700 af-font-medium",
    "Colors: af-bg-primary-500 af-text-white",
    "Layout: af-flex af-justify-center af-items-center af-gap-4",
  ],
  patterns: [
    "Card: af-card af-stack-4",
    "Button: af-btn af-btn-primary",
    "Input: af-input af-focus-ring",
    "Layout: af-layout-sidebar",
  ],
};

export default {
  SpacingExamples,
  TypographyExamples,
  ColorExamples,
  LayoutExamples,
  AdvancedExamples,
  InteractivePlayground,
  exampleCategories,
  utilityReference,
  generateExample,
  quickStartGuide,
};

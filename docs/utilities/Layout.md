# Layout

Comprehensive layout utilities and patterns for building modern web layouts.

## Responsive Grid Systems

### Auto-Fill Grids

Cards that wrap to new rows as space allows:

- `.af-grid-auto-fill-sm` - Min 12rem card width
- `.af-grid-auto-fill-md` - Min 16rem card width
- `.af-grid-auto-fill-lg` - Min 20rem card width
- `.af-grid-auto-fill-xl` - Min 24rem card width

### Auto-Fit Grids

Cards that stretch to fill available space:

- `.af-grid-auto-fit-sm` - Min 12rem, stretches to fill
- `.af-grid-auto-fit-md` - Min 16rem, stretches to fill
- `.af-grid-auto-fit-lg` - Min 20rem, stretches to fill

## Layout Patterns

### Holy Grail Layout

Classic web layout with header, footer, main content, and sidebars:

- `.af-layout-holy-grail` - Container with grid areas
- `.af-layout-header` - Header area
- `.af-layout-sidebar` - Left sidebar area
- `.af-layout-main` - Main content area
- `.af-layout-aside` - Right sidebar area
- `.af-layout-footer` - Footer area

### Sidebar Layouts

- `.af-layout-sidebar-left` - Left sidebar layout
- `.af-layout-sidebar-right` - Right sidebar layout
- `.af-layout-sidebar-content` - Content area with flex column

### Dashboard Layouts

- `.af-dashboard-grid` - 12-column dashboard grid
- `.af-dashboard-header` - Dashboard header area
- `.af-dashboard-nav` - Navigation area
- `.af-dashboard-sidebar` - Dashboard sidebar
- `.af-dashboard-main` - Main dashboard content

## Content Layouts

### Article Layout

Optimized for reading with sidebar:

- `.af-article-layout` - Article grid container
- `.af-article-header` - Article header
- `.af-article-content` - Main article content (65ch width)
- `.af-article-sidebar` - Article sidebar

### Content Layout

Centered content with optimal reading width:

- `.af-content-layout` - Centered content grid
- `.af-content-wide` - Full-width breakout content

## Card and Gallery Layouts

### Card Layouts

- `.af-layout-card-grid` - Responsive card grid (300px min)
- `.af-layout-masonry` - Masonry layout container
- `.af-masonry-item` - Individual masonry item

### Gallery Layouts

- `.af-gallery-grid` - Photo gallery grid (250px min)
- `.af-gallery-masonry` - Masonry photo gallery
- `.af-gallery-item` - Individual gallery item

## Feature Grids

### Fixed Grids

- `.af-feature-grid-2x2` - 2x2 feature grid
- `.af-feature-grid-3x3` - 3x3 feature grid

## Landing Page Sections

### Section Layouts

- `.af-section-hero` - Centered hero section (60vh min)
- `.af-section-split` - Two-column split section
- `.af-section-feature` - Feature grid section

## Container Utilities

### Basic Containers

- `.af-container` - Basic centered container
- `.af-container-sm` - Small container
- `.af-container-md` - Medium container
- `.af-container-lg` - Large container

### Stack Utilities

Vertical rhythm for content:

- `.af-stack-{0-20}` - Vertical spacing between child elements

### Gap Utilities

Grid and flex gap spacing:

- `.af-gap-{0-20}` - All directions gap
- `.af-gap-x-{0-20}` - Horizontal gap
- `.af-gap-y-{0-20}` - Vertical gap

## Usage Examples

### Holy Grail Layout

```html
<div class="af-layout-holy-grail">
  <header class="af-layout-header af-bg-primary-500 af-text-white af-p-4">
    Header Content
  </header>

  <aside class="af-layout-sidebar af-bg-neutral-100 af-p-4">
    Sidebar Navigation
  </aside>

  <main class="af-layout-main af-p-6">Main Content Area</main>

  <aside class="af-layout-aside af-bg-neutral-50 af-p-4">Right Sidebar</aside>

  <footer class="af-layout-footer af-bg-neutral-800 af-text-white af-p-4">
    Footer Content
  </footer>
</div>
```

### Dashboard Layout

```html
<div class="af-dashboard-grid">
  <header class="af-dashboard-header af-bg-white af-shadow-sm af-p-4">
    Dashboard Header
  </header>

  <nav class="af-dashboard-nav af-bg-neutral-100 af-p-4">Navigation Menu</nav>

  <aside class="af-dashboard-sidebar af-bg-white af-border-r af-p-4">
    Dashboard Sidebar
  </aside>

  <main class="af-dashboard-main af-p-6">Dashboard Content</main>
</div>
```

### Article Layout

```html
<article class="af-article-layout">
  <header class="af-article-header">
    <h1 class="af-text-3xl af-mb-4">Article Title</h1>
    <p class="af-text-neutral-600">Article meta information</p>
  </header>

  <div class="af-article-content af-stack-4">
    <p>Article content with optimal reading width...</p>
    <p>More content...</p>
  </div>

  <aside class="af-article-sidebar">
    <div class="af-card af-p-4">Table of contents or related content</div>
  </aside>
</article>
```

### Responsive Card Grid

```html
<div class="af-grid-auto-fill-md">
  <div class="af-card af-p-6">Card 1</div>
  <div class="af-card af-p-6">Card 2</div>
  <div class="af-card af-p-6">Card 3</div>
  <!-- Cards automatically wrap and resize -->
</div>
```

### Landing Page Hero

```html
<section
  class="af-section-hero af-bg-gradient af-from-primary-500 af-to-accent-500"
>
  <h1 class="af-text-5xl af-text-white af-mb-6">Hero Title</h1>
  <p class="af-text-xl af-text-white/90 af-mb-8">Hero description</p>
  <button class="af-btn af-btn-lg af-bg-white af-text-primary-700">
    Get Started
  </button>
</section>
```

### Content with Sidebar

```html
<div class="af-layout-sidebar-left">
  <aside class="af-w-64 af-bg-neutral-100 af-p-6">
    <nav class="af-stack-2">
      <a href="#" class="af-btn af-btn-ghost-primary">Home</a>
      <a href="#" class="af-btn af-btn-ghost-primary">About</a>
      <a href="#" class="af-btn af-btn-ghost-primary">Contact</a>
    </nav>
  </aside>

  <div class="af-layout-sidebar-content af-p-6">
    <h1 class="af-text-2xl af-mb-4">Main Content</h1>
    <p>Your main content here...</p>
  </div>
</div>
```

### Masonry Gallery

```html
<div class="af-gallery-masonry">
  <img src="1.jpg" class="af-gallery-item af-rounded-lg" />
  <img src="2.jpg" class="af-gallery-item af-rounded-lg" />
  <img src="3.jpg" class="af-gallery-item af-rounded-lg" />
  <!-- Images flow in masonry layout -->
</div>
```

## Responsive Behavior

All layout patterns include responsive behavior:

- **Mobile**: Layouts stack vertically
- **Tablet**: Simplified grid layouts
- **Desktop**: Full layout patterns

### Mobile Adaptations

- Holy Grail becomes single column
- Sidebars stack below main content
- Split sections become single column
- Card grids adjust to smaller minimum widths

## Performance Notes

- CSS Grid layouts are highly performant
- Minimal JavaScript required
- Progressive enhancement approach
- Efficient use of CSS Grid and Flexbox

## Browser Support

- **CSS Grid**: Excellent support in all modern browsers
- **Flexbox**: Universal support
- **CSS Custom Properties**: Modern browsers
- **Graceful degradation**: Fallbacks for older browsers

## Accessibility

- Semantic HTML structure maintained
- Logical tab order preserved
- Screen reader friendly
- Responsive design considers all devices

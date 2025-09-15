# Masks

CSS masking and clipping utilities for creative visual effects.

## Basic Mask Utilities

### Mask Types

- `.af-mask-none` - Remove masking
- `.af-mask-linear` - Linear gradient mask (black to transparent)
- `.af-mask-radial` - Radial gradient mask (circle fade)

### Directional Linear Masks

- `.af-mask-linear-to-t` - Fade to top
- `.af-mask-linear-to-b` - Fade to bottom
- `.af-mask-linear-to-l` - Fade to left
- `.af-mask-linear-to-r` - Fade to right
- `.af-mask-linear-to-tr` - Fade to top right
- `.af-mask-linear-to-tl` - Fade to top left
- `.af-mask-linear-to-br` - Fade to bottom right
- `.af-mask-linear-to-bl` - Fade to bottom left

## Mask Sizing

- `.af-mask-auto` - Auto sizing
- `.af-mask-cover` - Cover container
- `.af-mask-contain` - Contain within bounds
- `.af-mask-size-full` - 100% width and height

## Mask Positioning

- `.af-mask-center` - Center position
- `.af-mask-top` - Top position
- `.af-mask-bottom` - Bottom position
- `.af-mask-left` - Left position
- `.af-mask-right` - Right position
- `.af-mask-top-left` - Top left corner
- `.af-mask-top-right` - Top right corner
- `.af-mask-bottom-left` - Bottom left corner
- `.af-mask-bottom-right` - Bottom right corner

## Mask Repeat

- `.af-mask-repeat` - Repeat mask
- `.af-mask-no-repeat` - No repeat
- `.af-mask-repeat-x` - Repeat horizontally
- `.af-mask-repeat-y` - Repeat vertically
- `.af-mask-repeat-round` - Round repeat
- `.af-mask-repeat-space` - Space repeat

## Clip Path Utilities

### Basic Shapes

- `.af-clip-none` - Remove clipping
- `.af-clip-circle` - Circle (50% radius)
- `.af-clip-circle-sm` - Small circle (25% radius)
- `.af-clip-circle-lg` - Large circle (75% radius)
- `.af-clip-ellipse` - Ellipse shape

### Polygonal Shapes

- `.af-clip-triangle` / `.af-clip-triangle-up` - Upward triangle
- `.af-clip-triangle-down` - Downward triangle
- `.af-clip-triangle-left` - Left-pointing triangle
- `.af-clip-triangle-right` - Right-pointing triangle
- `.af-clip-diamond` - Diamond shape
- `.af-clip-hexagon` - Hexagon
- `.af-clip-pentagon` - Pentagon
- `.af-clip-octagon` - Octagon
- `.af-clip-star` - Star shape

### Directional Shapes

- `.af-clip-arrow-right` - Right arrow
- `.af-clip-arrow-left` - Left arrow
- `.af-clip-chevron-right` - Right chevron
- `.af-clip-chevron-left` - Left chevron

### Geometric Shapes

- `.af-clip-parallelogram` - Parallelogram
- `.af-clip-trapezoid` - Trapezoid

## Shape Margin

Control spacing around clipped elements:

- `.af-shape-margin-none` - No margin
- `.af-shape-margin-sm` - 0.25rem margin
- `.af-shape-margin-md` - 0.5rem margin
- `.af-shape-margin-lg` - 1rem margin
- `.af-shape-margin-xl` - 1.5rem margin

## Usage Examples

```html
<!-- Fade out image to bottom -->
<div class="af-mask-linear-to-b">
  <img src="hero.jpg" alt="Hero image" />
</div>

<!-- Circular profile image -->
<div class="af-clip-circle">
  <img src="avatar.jpg" alt="User avatar" />
</div>

<!-- Star-shaped badge -->
<div class="af-clip-star af-bg-primary-500 af-p-4">
  <span class="af-text-white">New!</span>
</div>

<!-- Arrow pointing to content -->
<div class="af-clip-arrow-right af-bg-accent-500 af-p-3">
  <span class="af-text-white">Click here</span>
</div>

<!-- Complex masking with radial fade -->
<div class="af-mask-radial af-mask-center af-mask-no-repeat">
  <div class="af-bg-gradient af-from-primary-500 af-to-accent-500">
    <!-- Content with radial mask -->
  </div>
</div>
```

## Browser Support

- **CSS Masks**: Modern browsers (not IE)
- **Clip Path**: Excellent support in all modern browsers
- **Shape Margin**: Good support, progressive enhancement

## Tips

- Use masks for soft transitions and fades
- Use clip paths for sharp geometric shapes
- Combine with transforms for dynamic effects
- Consider fallbacks for older browsers

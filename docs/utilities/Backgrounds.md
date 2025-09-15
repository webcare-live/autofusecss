# Backgrounds

Background color, gradient, image, and overlay utilities.

## Background Colors

### Semantic Colors

- `.af-bg-{role}-{shade}` - Semantic background colors
  - Available roles: `primary`, `secondary`, `neutral`, `accent`, `success`, `warning`, `danger`
  - Shades: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`

## Gradients

### Basic Gradient Types

- `.af-bg-gradient` - Linear gradient (configurable direction)
- `.af-bg-gradient-radial` - Radial gradient (configurable shape/size)
- `.af-bg-gradient-conic` - Conic gradient (configurable angle)

### Linear Gradient Directions

- `.af-gradient-to-t` - Gradient to top
- `.af-gradient-to-tr` - Gradient to top right
- `.af-gradient-to-r` - Gradient to right
- `.af-gradient-to-br` - Gradient to bottom right
- `.af-gradient-to-b` - Gradient to bottom
- `.af-gradient-to-bl` - Gradient to bottom left
- `.af-gradient-to-l` - Gradient to left
- `.af-gradient-to-tl` - Gradient to top left

### Angled Gradients

- `.af-gradient-45` - 45 degree angle
- `.af-gradient-90` - 90 degree angle
- `.af-gradient-135` - 135 degree angle
- `.af-gradient-180` - 180 degree angle
- `.af-gradient-225` - 225 degree angle
- `.af-gradient-270` - 270 degree angle
- `.af-gradient-315` - 315 degree angle

### Radial Gradient Configuration

- **Shapes**: `.af-radial-circle`, `.af-radial-ellipse`
- **Sizes**:
  - `.af-radial-closest-side`
  - `.af-radial-closest-corner`
  - `.af-radial-farthest-side`
  - `.af-radial-farthest-corner`

### Gradient Positioning

- `.af-grad-center` - Center position
- `.af-grad-top` - Top position
- `.af-grad-bottom` - Bottom position
- `.af-grad-left` - Left position
- `.af-grad-right` - Right position
- `.af-grad-top-left` - Top left corner
- `.af-grad-top-right` - Top right corner
- `.af-grad-bottom-left` - Bottom left corner
- `.af-grad-bottom-right` - Bottom right corner

### Conic Gradient Angles

- `.af-conic-0` - 0 degrees
- `.af-conic-45` - 45 degrees
- `.af-conic-90` - 90 degrees
- `.af-conic-135` - 135 degrees
- `.af-conic-180` - 180 degrees
- `.af-conic-225` - 225 degrees
- `.af-conic-270` - 270 degrees
- `.af-conic-315` - 315 degrees

### Gradient Color Stops

- `.af-from-{role}-{shade}` - Start color
- `.af-via-{role}-{shade}` - Middle color (optional)
- `.af-to-{role}-{shade}` - End color

### Preset Gradients

- `.af-bg-gradient-rainbow` - Full spectrum rainbow
- `.af-bg-gradient-sunset` - Purple to pink sunset
- `.af-bg-gradient-ocean` - Blue to teal ocean
- `.af-bg-gradient-cool` - Cool blue/purple tones
- `.af-bg-gradient-warm` - Warm pink/red tones
- `.af-bg-gradient-forest` - Dark green to light green
- `.af-bg-gradient-midnight` - Dark gray gradient

## Usage Examples

```html
<!-- Simple linear gradient -->
<div
  class="af-bg-gradient af-gradient-to-r af-from-primary-500 af-to-accent-500"
>
  Linear gradient from primary to accent
</div>

<!-- Three-color gradient with angle -->
<div
  class="af-bg-gradient af-gradient-45 af-from-success-400 af-via-warning-500 af-to-danger-600"
>
  Three-color angled gradient
</div>

<!-- Radial gradient with custom positioning -->
<div
  class="af-bg-gradient-radial af-radial-circle af-radial-farthest-side af-grad-top-right af-from-primary-500 af-to-transparent"
>
  Radial gradient positioned at top right
</div>

<!-- Conic gradient for loading spinners -->
<div
  class="af-bg-gradient-conic af-conic-90 af-from-primary-500 af-via-transparent af-to-primary-500"
>
  Conic gradient for loading animation
</div>

<!-- Preset gradient -->
<div class="af-bg-gradient-sunset">Beautiful sunset gradient</div>

<!-- Complex layered gradients -->
<div class="af-bg-gradient-ocean">
  <div
    class="af-bg-gradient af-gradient-to-b af-from-transparent af-via-neutral-900/10 af-to-neutral-900/50"
  >
    Ocean with overlay
  </div>
</div>
```

## Advanced Techniques

### Multiple Gradients

```html
<!-- Layer multiple gradients using pseudo-elements -->
<div class="relative af-bg-gradient-forest">
  <div
    class="absolute inset-0 af-bg-gradient af-gradient-to-t af-from-transparent af-to-neutral-900/30"
  ></div>
  <!-- Content -->
</div>
```

### Animated Gradients

```html
<!-- Combine with animation classes -->
<div class="af-bg-gradient-rainbow animate-pulse">
  Animated rainbow background
</div>
```

### Responsive Gradients

```html
<!-- Change gradient direction on larger screens -->
<div
  class="af-bg-gradient af-gradient-to-b md:af-gradient-to-r af-from-primary-500 af-to-accent-500"
>
  Responsive gradient direction
</div>
```

## Browser Support

- **Linear Gradients**: Excellent support in all modern browsers
- **Radial Gradients**: Excellent support in all modern browsers
- **Conic Gradients**: Good support (not IE, older Safari)
- **CSS Custom Properties**: Modern browsers only

## Tips

- Use gradients sparingly for best visual impact
- Combine with opacity for subtle overlays
- Test color contrast for accessibility
- Consider fallback colors for older browsers
- Use preset gradients for quick beautiful effects

# Overlays

Advanced overlay utilities for creating sophisticated visual effects with customizable parameters, blend modes, and patterns.

## Basic Overlay System

### Core Overlay

- `.af-overlay` - Base overlay system with CSS custom property configuration
- `.af-bg-overlay` - Legacy overlay utility for backwards compatibility

The overlay system uses CSS custom properties for maximum flexibility:

- `--af-overlay-bg` - Custom background pattern
- `--af-overlay-angle` - Gradient angle (degrees)
- `--af-overlay-from` - Start color
- `--af-overlay-to` - End color
- `--af-overlay-blend` - Blend mode
- `--af-overlay-position` - Radial position

## Overlay Strengths

### Black Overlays

- `.af-overlay-light` - Light black overlay (20% opacity)
- `.af-overlay-medium` - Medium black overlay (40% opacity)
- `.af-overlay-strong` - Strong black overlay (60% opacity)
- `.af-overlay-solid` - Solid black overlay (80% to 20%)

### White Overlays

- `.af-overlay-white-light` - Light white overlay (20% opacity)
- `.af-overlay-white-medium` - Medium white overlay (40% opacity)
- `.af-overlay-white-strong` - Strong white overlay (60% opacity)

### Colored Overlays

- `.af-overlay-primary` - Primary color overlay
- `.af-overlay-accent` - Accent color overlay

## Overlay Directions

### Linear Gradient Directions

- `.af-overlay-to-t` - Gradient to top (0°)
- `.af-overlay-to-tr` - Gradient to top right (45°)
- `.af-overlay-to-r` - Gradient to right (90°)
- `.af-overlay-to-br` - Gradient to bottom right (135°)
- `.af-overlay-to-b` - Gradient to bottom (180°)
- `.af-overlay-to-bl` - Gradient to bottom left (225°)
- `.af-overlay-to-l` - Gradient to left (270°)
- `.af-overlay-to-tl` - Gradient to top left (315°)

## Radial Overlays

### Radial System

- `.af-overlay-radial` - Base radial overlay
- `.af-overlay-radial-center` - Centered radial overlay
- `.af-overlay-radial-top` - Top positioned radial
- `.af-overlay-radial-bottom` - Bottom positioned radial
- `.af-overlay-radial-left` - Left positioned radial
- `.af-overlay-radial-right` - Right positioned radial

### Special Effects

- `.af-overlay-spotlight` - Spotlight effect (clear center, dark edges)
- `.af-overlay-vignette` - Vignette effect (soft edge darkening)

## Blend Modes

### Standard Blend Modes

- `.af-overlay-multiply` - Multiply blend mode
- `.af-overlay-screen` - Screen blend mode
- `.af-overlay-overlay-blend` - Overlay blend mode
- `.af-overlay-soft-light` - Soft light blend mode
- `.af-overlay-hard-light` - Hard light blend mode

### Color Blend Modes

- `.af-overlay-color-dodge` - Color dodge
- `.af-overlay-color-burn` - Color burn
- `.af-overlay-darken` - Darken blend mode
- `.af-overlay-lighten` - Lighten blend mode

### Effect Blend Modes

- `.af-overlay-difference` - Difference blend mode
- `.af-overlay-exclusion` - Exclusion blend mode
- `.af-overlay-hue` - Hue blend mode
- `.af-overlay-saturation` - Saturation blend mode
- `.af-overlay-color` - Color blend mode
- `.af-overlay-luminosity` - Luminosity blend mode

## Pattern Overlays

### Geometric Patterns

- `.af-overlay-dots` - Dot pattern overlay
- `.af-overlay-grid` - Grid pattern overlay
- `.af-overlay-diagonal` - Diagonal stripe pattern

### Texture Effects

- `.af-overlay-film-grain` - Film grain texture effect
- `.af-overlay-noise` - Noise texture overlay

## Interactive Overlays

### Hover Effects

- `.af-overlay-hover` - Overlay appears on hover

## Usage Examples

### Basic Hero Overlay

```html
<div
  class="af-overlay af-overlay-medium af-overlay-to-b"
  style="background: url('hero.jpg') center/cover;"
>
  <div class="af-p-12 af-text-center af-text-white">
    <h1 class="af-text-4xl af-mb-4">Hero Title</h1>
    <p class="af-text-lg">Hero description with readable overlay</p>
  </div>
</div>
```

### Custom Angle and Colors

```html
<div
  class="af-overlay"
  style="--af-overlay-angle: 45deg; 
            --af-overlay-from: rgba(139, 69, 19, 0.6); 
            --af-overlay-to: rgba(255, 140, 0, 0.2);
            background: url('sunset.jpg') center/cover;"
>
  <div class="af-p-8 af-text-white">
    Custom brown to orange overlay at 45 degrees
  </div>
</div>
```

### Radial Spotlight Effect

```html
<div
  class="af-overlay af-overlay-spotlight af-overlay-radial-center"
  style="background: url('photo.jpg') center/cover;"
>
  <div class="af-p-8 af-text-center af-text-white">
    <h2 class="af-text-2xl">Spotlight Effect</h2>
    <p>Content highlighted in the center</p>
  </div>
</div>
```

### Blend Mode Effects

```html
<div
  class="af-overlay af-overlay-primary af-overlay-multiply"
  style="background: url('landscape.jpg') center/cover;"
>
  <div class="af-p-8 af-text-white">Primary color with multiply blend mode</div>
</div>
```

### Pattern Overlay

```html
<div
  class="af-overlay af-overlay-dots"
  style="background: linear-gradient(45deg, #667eea, #764ba2);"
>
  <div class="af-p-8 af-text-white af-text-center">
    <h2 class="af-text-2xl">Dot Pattern Overlay</h2>
    <p>Subtle dot texture on gradient background</p>
  </div>
</div>
```

### Interactive Hover Overlay

```html
<div
  class="af-overlay af-overlay-hover af-overlay-strong"
  style="background: url('gallery.jpg') center/cover;"
>
  <div
    class="af-p-6 af-text-white af-opacity-0 hover:af-opacity-100 transition-opacity"
  >
    <h3 class="af-text-lg">Hidden Content</h3>
    <p>Appears on hover with overlay</p>
  </div>
</div>
```

### Film Grain Effect

```html
<div
  class="af-overlay af-overlay-film-grain af-overlay-sepia"
  style="background: url('vintage.jpg') center/cover;"
>
  <div class="af-p-8 af-text-neutral-100">
    <h2 class="af-text-2xl">Vintage Photo</h2>
    <p>Film grain texture with sepia tone</p>
  </div>
</div>
```

### Card with Vignette

```html
<div class="af-card af-overflow-hidden">
  <div
    class="af-overlay af-overlay-vignette"
    style="background: url('card-bg.jpg') center/cover; height: 200px;"
  >
    <div class="af-p-6 af-text-white af-h-full af-flex af-items-end">
      <div>
        <h3 class="af-text-lg af-mb-2">Card Title</h3>
        <p class="af-text-sm af-opacity-90">Card description</p>
      </div>
    </div>
  </div>
</div>
```

### Complex Multi-Layer Effect

```html
<div
  class="af-overlay af-overlay-to-br"
  style="--af-overlay-from: rgba(0,0,0,0.4); 
            --af-overlay-to: rgba(0,0,0,0);
            background: url('complex-bg.jpg') center/cover;"
>
  <div class="af-overlay af-overlay-noise af-overlay-multiply">
    <div class="af-overlay af-overlay-dots">
      <div class="af-p-12 af-text-white af-text-center">
        <h1 class="af-text-3xl af-mb-4">Complex Layered Effect</h1>
        <p>Multiple overlay layers with different effects</p>
      </div>
    </div>
  </div>
</div>
```

## Advanced Techniques

### Custom CSS Properties

```html
<div
  class="af-overlay"
  style="--af-overlay-bg: conic-gradient(from 0deg, 
                              rgba(255,0,0,0.3), 
                              rgba(0,255,0,0.3), 
                              rgba(0,0,255,0.3), 
                              rgba(255,0,0,0.3));
            background: url('bg.jpg') center/cover;"
>
  <!-- Custom conic gradient overlay -->
</div>
```

### Responsive Overlays

```html
<div
  class="af-overlay af-overlay-light md:af-overlay-medium"
  style="background: url('responsive-bg.jpg') center/cover;"
>
  <!-- Stronger overlay on larger screens -->
</div>
```

### Animation Ready

```html
<div
  class="af-overlay af-overlay-hover transition-all duration-500"
  style="background: url('animated-bg.jpg') center/cover;"
>
  <!-- Smooth overlay transitions -->
</div>
```

## Browser Support

- **CSS Blend Modes**: Good support (not IE)
- **CSS Custom Properties**: Modern browsers
- **Pseudo-elements**: Universal support
- **CSS Gradients**: Excellent support

## Performance Tips

- Use overlays sparingly for best performance
- Prefer CSS-based overlays over JavaScript solutions
- Test on mobile devices for performance impact
- Consider using `will-change` for animated overlays

## Accessibility

- Ensure sufficient color contrast with overlays
- Provide alternative content for decorative overlays
- Test with screen readers
- Consider users with motion sensitivity for animated overlays

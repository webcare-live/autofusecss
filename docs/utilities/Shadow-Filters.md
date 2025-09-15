# Shadows & Filters

Visual effects utilities for shadows, filters, and image processing.

## Box Shadows

### Shadow Utilities

- `.af-shadow-sm` - Small subtle shadow
- `.af-shadow-md` - Medium shadow
- `.af-shadow-lg` - Large shadow
- `.af-shadow-xl` - Extra large shadow

All shadows are editable in ThemeStudio and use semantic shadow tokens.

## Border Radius

### Radius Utilities

- `.af-rounded-none` - No border radius
- `.af-rounded-sm` - Small border radius
- `.af-rounded-md` - Medium border radius
- `.af-rounded-lg` - Large border radius
- `.af-rounded-xl` - Extra large border radius
- `.af-rounded-full` - Full border radius (circle/pill)

Radius values are customizable in ThemeStudio.

## Filter Effects

### Blur Filters

- `.af-blur-none` - No blur
- `.af-blur-sm` - Small blur (4px)
- `.af-blur-md` - Medium blur (8px)
- `.af-blur-lg` - Large blur (12px)
- `.af-blur-xl` - Extra large blur (16px)
- `.af-blur-2xl` - 2X large blur (24px)
- `.af-blur-3xl` - 3X large blur (40px)

### Brightness Filters

- `.af-brightness-0` - Completely dark
- `.af-brightness-50` - 50% brightness
- `.af-brightness-75` - 75% brightness
- `.af-brightness-90` - 90% brightness
- `.af-brightness-95` - 95% brightness
- `.af-brightness-100` - Normal brightness
- `.af-brightness-105` - 105% brightness
- `.af-brightness-110` - 110% brightness
- `.af-brightness-125` - 125% brightness
- `.af-brightness-150` - 150% brightness
- `.af-brightness-200` - 200% brightness

### Contrast Filters

- `.af-contrast-0` - No contrast
- `.af-contrast-50` - 50% contrast
- `.af-contrast-75` - 75% contrast
- `.af-contrast-100` - Normal contrast
- `.af-contrast-125` - 125% contrast
- `.af-contrast-150` - 150% contrast
- `.af-contrast-200` - 200% contrast

### Grayscale Filters

- `.af-grayscale-0` - Full color
- `.af-grayscale-50` - 50% grayscale
- `.af-grayscale` - Full grayscale

### Sepia Filters

- `.af-sepia-0` - No sepia
- `.af-sepia-50` - 50% sepia
- `.af-sepia` - Full sepia

### Hue Rotate Filters

- `.af-hue-rotate-0` - No rotation
- `.af-hue-rotate-15` - 15° rotation
- `.af-hue-rotate-30` - 30° rotation
- `.af-hue-rotate-60` - 60° rotation
- `.af-hue-rotate-90` - 90° rotation
- `.af-hue-rotate-180` - 180° rotation
- `.af-hue-rotate-270` - 270° rotation
- `.-af-hue-rotate-{deg}` - Negative rotations

### Saturate Filters

- `.af-saturate-0` - No saturation
- `.af-saturate-50` - 50% saturation
- `.af-saturate-100` - Normal saturation
- `.af-saturate-150` - 150% saturation
- `.af-saturate-200` - 200% saturation

### Invert Filters

- `.af-invert-0` - No inversion
- `.af-invert-50` - 50% inversion
- `.af-invert` - Full inversion

### Drop Shadow Filters

- `.af-drop-shadow-none` - No drop shadow
- `.af-drop-shadow-sm` - Small drop shadow
- `.af-drop-shadow` - Default drop shadow
- `.af-drop-shadow-md` - Medium drop shadow
- `.af-drop-shadow-lg` - Large drop shadow
- `.af-drop-shadow-xl` - Extra large drop shadow
- `.af-drop-shadow-2xl` - 2X large drop shadow

## Filter Presets

### Photographic Effects

- `.af-filter-none` - Remove all filters
- `.af-filter-vintage` - Vintage photo effect
- `.af-filter-noir` - Black and white dramatic effect
- `.af-filter-warm` - Warm color temperature
- `.af-filter-cool` - Cool color temperature
- `.af-filter-dramatic` - High contrast dramatic look
- `.af-filter-soft` - Soft dreamy effect
- `.af-filter-sharp` - Enhanced sharpness and saturation

## Usage Examples

```html
<!-- Basic shadow and radius -->
<div class="af-shadow-lg af-rounded-lg">
  Card with shadow and rounded corners
</div>

<!-- Blur effect for loading states -->
<div class="af-blur-sm">Blurred content during loading</div>

<!-- Image filters -->
<img
  src="photo.jpg"
  class="af-filter-vintage af-rounded-md"
  alt="Vintage photo"
/>

<!-- Hover effects -->
<div class="af-brightness-100 hover:af-brightness-110 transition-all">
  Brightens on hover
</div>

<!-- Combining multiple filters -->
<div class="af-saturate-150 af-contrast-125 af-hue-rotate-15">
  Enhanced vibrant colors
</div>

<!-- Drop shadow for floating elements -->
<button class="af-drop-shadow-lg hover:af-drop-shadow-xl transition-all">
  Floating button
</button>

<!-- Photo gallery with filter presets -->
<div class="grid grid-cols-3 gap-4">
  <img src="1.jpg" class="af-filter-warm af-rounded-lg" />
  <img src="2.jpg" class="af-filter-cool af-rounded-lg" />
  <img src="3.jpg" class="af-filter-noir af-rounded-lg" />
</div>
```

## Advanced Techniques

### Layered Effects

```html
<!-- Combine box shadow with drop shadow -->
<div class="af-shadow-xl af-drop-shadow-lg">Double shadow effect</div>
```

### Animated Filters

```html
<!-- Smooth filter transitions -->
<div class="af-grayscale hover:af-grayscale-0 transition-all duration-300">
  Color on hover
</div>
```

### Responsive Filters

```html
<!-- Different effects on larger screens -->
<img class="af-filter-soft md:af-filter-sharp" />
```

## Performance Notes

- Filter effects can impact performance on mobile devices
- Use `will-change: filter` for frequently animated filters
- Combine multiple filter values in CSS for better performance
- Test on various devices for optimal user experience

## Browser Support

- **CSS Filters**: Excellent support in all modern browsers
- **Drop Shadow**: Good support (not IE)
- **Filter Functions**: Modern browsers only
- Consider fallbacks for older browsers

## Accessibility

- Ensure sufficient contrast when using filters
- Provide alternative content for purely decorative effects
- Test with users who have visual impairments
- Consider `prefers-reduced-motion` for animated filters

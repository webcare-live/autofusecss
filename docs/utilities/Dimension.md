# Dimension

Width and height utilities for controlling element dimensions.

## Width Utilities

### Basic Width

- `.af-w-auto` - auto width
- `.af-w-full` - 100% width
- `.af-w-screen` - 100vw width
- `.af-w-fit` - fit-content
- `.af-w-min` - min-content
- `.af-w-max` - max-content

### Fractional Width

- `.af-w-1/2` - 50% width
- `.af-w-1/3` - 33.333% width
- `.af-w-2/3` - 66.667% width
- `.af-w-1/4` - 25% width
- `.af-w-3/4` - 75% width
- `.af-w-1/5` - 20% width
- `.af-w-2/5` - 40% width
- `.af-w-3/5` - 60% width
- `.af-w-4/5` - 80% width

## Height Utilities

### Basic Height

- `.af-h-auto` - auto height
- `.af-h-full` - 100% height
- `.af-h-screen` - 100vh height
- `.af-h-fit` - fit-content
- `.af-h-min` - min-content
- `.af-h-max` - max-content

### Fractional Height

- `.af-h-1/2` - 50% height
- `.af-h-1/3` - 33.333% height
- `.af-h-2/3` - 66.667% height
- `.af-h-1/4` - 25% height
- `.af-h-3/4` - 75% height

## Min Width/Height

### Min Width

- `.af-min-w-0` - min-width: 0
- `.af-min-w-full` - min-width: 100%
- `.af-min-w-min` - min-width: min-content
- `.af-min-w-max` - min-width: max-content
- `.af-min-w-fit` - min-width: fit-content

### Min Height

- `.af-min-h-0` - min-height: 0
- `.af-min-h-full` - min-height: 100%
- `.af-min-h-screen` - min-height: 100vh
- `.af-min-h-min` - min-height: min-content
- `.af-min-h-max` - min-height: max-content
- `.af-min-h-fit` - min-height: fit-content

## Max Width/Height

### Max Width

- `.af-max-w-none` - no max width
- `.af-max-w-xs` - 20rem max width
- `.af-max-w-sm` - 24rem max width
- `.af-max-w-md` - 28rem max width
- `.af-max-w-lg` - 32rem max width
- `.af-max-w-xl` - 36rem max width
- `.af-max-w-2xl` - 42rem max width
- `.af-max-w-3xl` - 48rem max width
- `.af-max-w-4xl` - 56rem max width
- `.af-max-w-5xl` - 64rem max width
- `.af-max-w-6xl` - 72rem max width
- `.af-max-w-7xl` - 80rem max width
- `.af-max-w-full` - 100% max width
- `.af-max-w-min` - min-content max width
- `.af-max-w-max` - max-content max width
- `.af-max-w-fit` - fit-content max width
- `.af-max-w-prose` - 65ch max width (optimal for reading)
- `.af-max-w-screen-{xs|sm|md|lg|xl|2xl}` - screen size max width

### Max Height

- `.af-max-h-none` - no max height
- `.af-max-h-full` - 100% max height
- `.af-max-h-screen` - 100vh max height
- `.af-max-h-min` - min-content max height
- `.af-max-h-max` - max-content max height
- `.af-max-h-fit` - fit-content max height

## Usage Examples

```html
<!-- Responsive image container -->
<div class="af-w-full af-max-w-md af-h-auto">
  <img src="..." class="af-w-full af-h-auto" alt="..." />
</div>

<!-- Card with constrained dimensions -->
<div class="af-w-1/3 af-min-h-64 af-max-h-screen">
  <!-- content -->
</div>

<!-- Full height sidebar -->
<aside class="af-w-64 af-h-screen af-min-h-full">
  <!-- navigation -->
</aside>
```

## Notes

- Fractional widths use percentage values for responsive flexibility
- Use `.af-max-w-prose` for optimal text reading width
- Combine with Tailwind utilities for additional sizing options

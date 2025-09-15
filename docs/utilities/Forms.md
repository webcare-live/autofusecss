# Forms

Comprehensive form utilities and patterns for building accessible, beautiful forms.

## Input Base Styles

### Basic Input

- `.af-input` - Base input styling with focus states
- `.af-textarea` - Textarea with consistent styling
- `.af-select` - Select dropdown with custom arrow

### Input Sizes

- `.af-input-sm` - Small input (compact padding)
- `.af-input-lg` - Large input (spacious padding)

### Input States

- `.af-input-success` - Success state (green border)
- `.af-input-warn` - Warning state (yellow border)
- `.af-input-error` - Error state (red border)

All inputs include:

- Focus ring styling with semantic colors
- Disabled state styling
- Smooth transitions
- Proper accessibility attributes

## Form Controls

### Checkboxes and Radios

- `.af-checkbox` - Custom styled checkbox with checkmark
- `.af-radio` - Custom styled radio button with dot

Features:

- Consistent sizing and alignment
- Focus ring for accessibility
- Custom check/radio indicators
- Disabled state styling

### Select Dropdowns

- `.af-select` - Custom dropdown with arrow indicator
- Maintains native functionality
- Custom styling that works across browsers
- Focus states and disabled styling

## Form Layout

### Form Groups

- `.af-form-group` - Vertical form field group
- `.af-form-group-horizontal` - Horizontal form field group

### Grid Layout

- `.af-form-row` - Grid container for form fields
- `.af-form-col-1` - Single column layout
- `.af-form-col-2` - Two column layout
- `.af-form-col-3` - Three column layout
- `.af-form-col-4` - Four column layout

### Field Groups (for checkboxes/radios)

- `.af-field-group` - Vertical field group
- `.af-field-group-horizontal` - Horizontal field group
- `.af-field-item` - Individual field item wrapper

## Labels and Text

### Labels

- `.af-label` - Form label styling
- `.af-label-required` - Adds red asterisk for required fields

### Help and Validation Text

- `.af-help-text` - Helper text styling
- `.af-error-text` - Error message styling
- `.af-success-text` - Success message styling

## Input Groups

For inputs with icons or buttons:

- `.af-input-group` - Input group container
- `.af-input-group-left` - Input with left icon
- `.af-input-group-right` - Input with right icon
- `.af-input-group-icon` - Icon styling
- `.af-input-group-icon-left` - Left positioned icon
- `.af-input-group-icon-right` - Right positioned icon

## Usage Examples

### Basic Form

```html
<form class="af-form-row af-form-col-2">
  <div class="af-form-group">
    <label class="af-label af-label-required" for="email">Email</label>
    <input
      id="email"
      class="af-input"
      type="email"
      placeholder="you@example.com"
      required
    />
    <div class="af-help-text">We'll never share your email</div>
  </div>

  <div class="af-form-group">
    <label class="af-label" for="name">Name</label>
    <input id="name" class="af-input af-input-success" placeholder="Ada" />
    <div class="af-success-text">Great choice!</div>
  </div>
</form>
```

### Textarea and Select

```html
<div class="af-form-group">
  <label class="af-label" for="message">Message</label>
  <textarea
    id="message"
    class="af-textarea"
    placeholder="Your message..."
  ></textarea>
</div>

<div class="af-form-group">
  <label class="af-label" for="country">Country</label>
  <select id="country" class="af-select">
    <option value="">Choose a country...</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
  </select>
</div>
```

### Checkbox and Radio Groups

```html
<!-- Checkbox group -->
<div class="af-form-group">
  <label class="af-label">Interests</label>
  <div class="af-field-group">
    <label class="af-field-item">
      <input type="checkbox" class="af-checkbox" />
      Design
    </label>
    <label class="af-field-item">
      <input type="checkbox" class="af-checkbox" />
      Development
    </label>
    <label class="af-field-item">
      <input type="checkbox" class="af-checkbox" />
      Marketing
    </label>
  </div>
</div>

<!-- Radio group -->
<div class="af-form-group">
  <label class="af-label">Plan</label>
  <div class="af-field-group-horizontal">
    <label class="af-field-item">
      <input type="radio" class="af-radio" name="plan" value="basic" />
      Basic
    </label>
    <label class="af-field-item">
      <input type="radio" class="af-radio" name="plan" value="pro" />
      Pro
    </label>
    <label class="af-field-item">
      <input type="radio" class="af-radio" name="plan" value="enterprise" />
      Enterprise
    </label>
  </div>
</div>
```

### Input with Icon

```html
<div class="af-form-group">
  <label class="af-label" for="search">Search</label>
  <div class="af-input-group af-input-group-left">
    <input id="search" class="af-input" placeholder="Search..." />
    <svg
      class="af-input-group-icon af-input-group-icon-left"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fill-rule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</div>
```

### Validation States

```html
<div class="af-form-group">
  <label class="af-label" for="password">Password</label>
  <input id="password" class="af-input af-input-error" type="password" />
  <div class="af-error-text">Password must be at least 8 characters</div>
</div>
```

### Complete Form Example

```html
<form class="af-p-6 af-bg-white af-rounded-lg af-shadow-md">
  <h2 class="af-text-xl af-mb-4">Contact Form</h2>

  <div class="af-form-row af-form-col-2 af-mb-4">
    <div class="af-form-group">
      <label class="af-label af-label-required" for="first-name"
        >First Name</label
      >
      <input id="first-name" class="af-input" type="text" required />
    </div>
    <div class="af-form-group">
      <label class="af-label af-label-required" for="last-name"
        >Last Name</label
      >
      <input id="last-name" class="af-input" type="text" required />
    </div>
  </div>

  <div class="af-form-group af-mb-4">
    <label class="af-label af-label-required" for="email">Email</label>
    <input id="email" class="af-input" type="email" required />
  </div>

  <div class="af-form-group af-mb-4">
    <label class="af-label" for="subject">Subject</label>
    <select id="subject" class="af-select">
      <option value="">Choose a subject...</option>
      <option value="support">Support</option>
      <option value="sales">Sales</option>
      <option value="general">General</option>
    </select>
  </div>

  <div class="af-form-group af-mb-4">
    <label class="af-label af-label-required" for="message">Message</label>
    <textarea id="message" class="af-textarea" rows="4" required></textarea>
  </div>

  <div class="af-form-group af-mb-6">
    <label class="af-field-item">
      <input type="checkbox" class="af-checkbox" required />
      I agree to the terms and conditions
    </label>
  </div>

  <button type="submit" class="af-btn af-btn-primary af-btn-lg">
    Send Message
  </button>
</form>
```

## Accessibility Features

- Proper focus management with visible focus rings
- Semantic color coding for validation states
- ARIA-friendly markup structure
- Keyboard navigation support
- Screen reader compatible

## Browser Support

- Modern CSS features with graceful degradation
- Custom form controls work in all modern browsers
- Progressive enhancement approach

## Tips

- Always use proper labels with form controls
- Provide clear validation feedback
- Test with keyboard navigation
- Consider color contrast for all states
- Use help text to guide users

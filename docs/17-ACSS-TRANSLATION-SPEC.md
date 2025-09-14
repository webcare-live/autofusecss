Automatic.css → AutofuseCSS Translation Spec

Goal
- Provide a pragmatic import path from Automatic.css (WordPress) configuration/presets into Autofuse tokens.

Assumptions
- ACSS exposes a palette and scale options; exact JSON shape varies by export. We’ll accept a JSON payload and map common fields.

Mapping (initial)
- Colors → tokens.colors (primary, neutral, success, warning, danger)
- Typography base size/ratio → tokens.typography.baseRem / scale
- Spacing base → tokens.spacing.base
- Radii/shadows → tokens.radius / tokens.shadows (if available)

Importer contract
- Accepts `acss.json` (or JS object) and returns `Partial<AutofuseTokens>`
- Merge into existing tokens via `setTokens(patch)` or CLI build

Example pseudo-code

```ts
export function importAcss(json: any): Partial<AutofuseTokens> {
  return {
    colors: {
      primary: json.colors?.primary ?? {},
      neutral: json.colors?.neutral ?? {},
      success: json.colors?.success ?? {},
      warning: json.colors?.warning ?? {},
      danger: json.colors?.danger ?? {},
    },
    typography: json.typography ? { baseRem: json.typography.baseRem, scale: json.typography.ratio, minViewport: 360, maxViewport: 1440 } : undefined,
    spacing: json.spacing ? { base: json.spacing.base, steps: 20 } : undefined,
  };
}
```

UI
- Add “Import ACSS JSON” to ThemeStudio; show mapping summary and diffs.

Edge cases
- Missing shades → auto‑generate using shade generator and warn in UI.


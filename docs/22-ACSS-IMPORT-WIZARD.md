ACSS Import Wizard — Map, Preview, Apply

Goal
- Allow importing Automatic.css JSON exports, previewing the mapping into Autofuse tokens, inspecting diffs, and applying.

Flow
1) Upload JSON
2) Detect fields and propose mapping (colors, typography, spacing, etc.)
3) Show diff counts per section and preview token object
4) Apply → `setTokens(patch)` and (optionally) `PUT /api/tokens`

UI (ThemeStudio integration)
- Import button in Palette section opens file picker
- Shows summary: changed keys count and roles affected
- Apply and Cancel buttons

Implementation outline
- Parser in `docs/17-ACSS-TRANSLATION-SPEC.md`
- Deep‑diff helper to produce counts and changed paths
- Merge using Provider’s deep merge semantics

Next
- Support multiple ACSS export shapes
- Preserve notes / metadata where available


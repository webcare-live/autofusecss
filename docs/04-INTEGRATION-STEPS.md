Integration Steps in @math-platform/web (Opt-in)

01. Install package

pnpm add autofusecss --filter @math-platform/web

02. Global stylesheet import

- Import once in `apps/web/src/app/globals.css` or root layout:

@import "autofusecss/styles.css";

03. Wrap app with Provider

- In `apps/web/src/app/layout.tsx` (or a top-level provider), wrap body:

import { AutofuseProvider } from "autofusecss/react";

<AutofuseProvider density="comfortable">{children}</AutofuseProvider>

04. Tailwind integration (optional)

- tailwind.config.ts:

import autofuse from "autofusecss/tailwind";
export default { plugins: [autofuse()] };

05. Replace ad-hoc helpers gradually

- Use `af-stack-6` instead of custom rhythm utilities.
- Use `af-container` for page wrappers.

06. Theming

- Toggle `data-theme="dark"` on the provider to swap variables.

07. QA Checklist

- Verify minimal layout shift on first paint.
- Check focus-visible ring in keyboard navigation.
- Verify dark mode contrast on key pages.


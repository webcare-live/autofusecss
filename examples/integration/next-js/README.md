Next.js Integration Template

Steps
1) Create app: `npx create-next-app@latest my-app --ts --tailwind`
2) Install: `npm install autofusecss`
3) Tailwind: add `require('autofusecss/tailwind')` to `plugins`
4) Import CSS: in `app/layout.tsx` import `autofusecss/styles.css`
5) Provider: wrap body with `<AutofuseProvider>`

Example
```tsx
import 'autofusecss/styles.css';
import { AutofuseProvider } from 'autofusecss/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body><AutofuseProvider>{children}</AutofuseProvider></body></html>
  );
}
```


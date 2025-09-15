Vite + React Integration Template

Steps
1) `npm create vite@latest my-app -- --template react-ts`
2) `cd my-app && npm i autofusecss`
3) Tailwind (optional): add plugin `require('autofusecss/tailwind')`
4) Import CSS in `main.tsx` or global stylesheet: `import 'autofusecss/styles.css'`
5) Wrap app in provider

```tsx
import 'autofusecss/styles.css';
import { AutofuseProvider } from 'autofusecss/react';

createRoot(document.getElementById('root')!).render(
  <AutofuseProvider>
    <App />
  </AutofuseProvider>
);
```


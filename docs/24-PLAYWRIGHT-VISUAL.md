Playwright Visual Snapshots

We added baseline screenshots for core pages and a simple Studio interaction.

- Tests live in `apps/docs/tests/basic.spec.ts`
- Snapshots are auto-managed by Playwright via `toHaveScreenshot()`

Run

```
cd apps/docs
npm run dev &
npm run test:e2e
```

Add more
- Create focused tests per utility page with before/after states
- Use `expect(locator).toHaveScreenshot('name.png')` after interactions
- For updates: run with `npx playwright test --update-snapshots`


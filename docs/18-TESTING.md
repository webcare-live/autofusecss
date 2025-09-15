Docs & Studio Testing

Playwright E2E tests are configured in `apps/docs` to snapshot core pages and verify basic UI.

Run locally

```
cd apps/docs
npm run dev &
npm run test:e2e
```

Scenarios
- Home renders and shows title
- Utilities index is visible
- Studio page loads and shows Export button

Next
- Add visual snapshots for utilities pages and a Studio state (e.g., compact density)
- Add WS test using a mock server


Autofuse Node API — Tokens Service

Purpose
- Provide a small Node.js service to persist tokens centrally and broadcast live updates to any connected Studio or site instances during development.

Transport
- REST for persistence, WebSocket (or SSE) for live updates.

Endpoints
- GET /api/tokens → returns current tokens (AutofuseTokens)
- PUT /api/tokens → replaces tokens; body: { tokens: Partial<AutofuseTokens> }
- PATCH /api/tokens → deep‑merges partial tokens

WebSocket Events
- Client subscribes to `ws://host/ws`
- Server pushes `{ type: 'tokens:update', tokens }` on change

Storage
- File: local `autofuse.tokens.json` by default
- Or database (Mongo/Postgres) via adapter interface

Security
- CORS limited to allowed origins
- Optional bearer token for write operations

Minimal Express sketch

```ts
import express from 'express';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const app = express();
app.use(express.json());

let tokens = existsSync('autofuse.tokens.json')
  ? JSON.parse(readFileSync('autofuse.tokens.json', 'utf8'))
  : null;

app.get('/api/tokens', (_, res) => res.json({ tokens }));
app.put('/api/tokens', (req, res) => {
  tokens = req.body.tokens; writeFileSync('autofuse.tokens.json', JSON.stringify(tokens, null, 2));
  // broadcast over WS here
  res.json({ ok: true });
});

app.listen(4001);
```

Client usage
- On app start, fetch tokens → pass to `<AutofuseProvider tokens={...} />`
- Subscribe to WS to apply live updates via `setTokens(patch)` from `useAutofuse()`


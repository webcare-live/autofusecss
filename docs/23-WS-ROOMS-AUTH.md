WebSocket Rooms & Auth

Purpose
- Enable multi-project collaboration by separating token streams into rooms with optional shared secret.

Server
- Endpoint: `ws://<host>/ws?room=<room>&token=<token>`
- Env: `AUTH_TOKEN` — if set, incoming `token` must match
- Storage per room: `.data/<room>/tokens.json`

Client (ThemeStudio)
- Enter WS URL, Room, Token in the Studio header area and Connect.
- Studio will receive `tokens:update` and also broadcast updates on local edits (optimistic merge).

REST
- `GET/PUT/PATCH /api/tokens?room=<room>`

Security Notes
- For protected environments set `AUTH_TOKEN` and use HTTPS/WSS in production.
- Consider origin checks and CORS rules on the REST endpoints.


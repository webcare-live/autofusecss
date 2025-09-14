import express from 'express';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { WebSocketServer } from 'ws';

const app = express();
app.use(express.json());

const storeDir = path.resolve(process.cwd(), '.data');
const storeFile = path.join(storeDir, 'tokens.json');
mkdirSync(storeDir, { recursive: true });

let tokens: any = existsSync(storeFile) ? JSON.parse(readFileSync(storeFile, 'utf8')) : null;

app.get('/api/tokens', (_, res) => res.json(tokens ?? { tokens: null }));
app.put('/api/tokens', (req, res) => {
  tokens = req.body;
  writeFileSync(storeFile, JSON.stringify(tokens, null, 2));
  broadcast({ type: 'tokens:update', tokens });
  res.json({ ok: true });
});

const server = app.listen(4001, () => console.log('Tokens API on http://localhost:4001'));

const wss = new WebSocketServer({ server });
function broadcast(payload: any) {
  wss.clients.forEach((c) => { try { c.send(JSON.stringify(payload)); } catch {} });
}


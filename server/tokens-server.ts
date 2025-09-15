import express from 'express';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { WebSocketServer, WebSocket } from 'ws';

const app = express();
app.use(express.json());
// Basic CORS support
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const storeDir = path.resolve(process.cwd(), '.data');
mkdirSync(storeDir, { recursive: true });

function fileForRoom(room: string) {
  const dir = path.join(storeDir, room);
  mkdirSync(dir, { recursive: true });
  return path.join(dir, 'tokens.json');
}

const roomTokens = new Map<string, any>();
function getTokens(room: string) {
  if (roomTokens.has(room)) return roomTokens.get(room);
  const file = fileForRoom(room);
  const t = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : null;
  roomTokens.set(room, t);
  return t;
}
function setTokens(room: string, val: any) {
  roomTokens.set(room, val);
  writeFileSync(fileForRoom(room), JSON.stringify(val, null, 2));
}

app.get('/api/tokens', (req, res) => {
  const room = String(req.query.room || 'default');
  res.json(getTokens(room) ?? { tokens: null });
});
app.put('/api/tokens', (req, res) => {
  const room = String(req.query.room || 'default');
  const val = req.body;
  setTokens(room, val);
  broadcast(room, { type: 'tokens:update', tokens: val });
  res.json({ ok: true });
});
app.patch('/api/tokens', (req, res) => {
  const room = String(req.query.room || 'default');
  const cur = getTokens(room) || {};
  const val = { ...cur, ...(req.body || {}) };
  setTokens(room, val);
  broadcast(room, { type: 'tokens:update', tokens: val });
  res.json({ ok: true });
});
// List rooms
app.get('/api/rooms', (_req, res) => {
  const fs = require('node:fs');
  const roomsList = fs.existsSync(storeDir) ? fs.readdirSync(storeDir).filter((n: string) => fs.existsSync(path.join(storeDir, n, 'tokens.json'))) : [];
  res.json({ rooms: roomsList });
});
// Client counts per room
app.get('/api/rooms/:room/clients', (req, res) => {
  const room = req.params.room || 'default';
  const set = rooms.get(room);
  res.json({ room, clients: set ? set.size : 0 });
});
// Tokens history per room
app.get('/api/tokens/history', (req, res) => {
  const room = String(req.query.room || 'default');
  const histFile = path.join(storeDir, room, 'history.json');
  let data: any[] = [];
  try { data = JSON.parse(readFileSync(histFile, 'utf8')); } catch {}
  res.json({ history: data });
});

const server = app.listen(4001, () => console.log('Tokens API on http://localhost:4001'));

const wss = new WebSocketServer({ server, path: '/ws' });
const rooms = new Map<string, Set<WebSocket>>();
const AUTH_TOKEN = process.env.AUTH_TOKEN || '';

function broadcast(room: string, payload: any, skip?: WebSocket) {
  const clients = rooms.get(room);
  if (!clients) return;
  for (const c of clients) {
    if (c === skip || c.readyState !== c.OPEN) continue;
    try { c.send(JSON.stringify(payload)); } catch {}
  }
}

wss.on('connection', (socket, req) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  const room = url.searchParams.get('room') || 'default';
  const token = url.searchParams.get('token') || '';
  if (AUTH_TOKEN && token !== AUTH_TOKEN) {
    socket.close(4001, 'Unauthorized');
    return;
  }
  if (!rooms.has(room)) rooms.set(room, new Set());
  rooms.get(room)!.add(socket);
  socket.on('close', () => rooms.get(room)!.delete(socket));
  // Send current tokens
  const cur = getTokens(room);
  if (cur) try { socket.send(JSON.stringify({ type: 'tokens:update', tokens: cur })); } catch {}

  socket.on('message', (buf) => {
    try {
      const msg = JSON.parse(String(buf));
      if (msg?.type === 'tokens:update' && msg.tokens) {
        setTokens(room, msg.tokens);
        // append to history
        try {
          const histFile = path.join(storeDir, room, 'history.json');
          let data: any[] = [];
          try { data = JSON.parse(readFileSync(histFile, 'utf8')); } catch {}
          data.push({ ts: Date.now(), tokens: msg.tokens });
          if (data.length > 20) data = data.slice(-20);
          writeFileSync(histFile, JSON.stringify(data, null, 2));
        } catch {}
        broadcast(room, { type: 'tokens:update', tokens: msg.tokens }, socket);
      }
    } catch {}
  });
});

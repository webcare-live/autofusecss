import { NextRequest } from 'next/server';
import { writeFile, readFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const storePath = path.resolve(process.cwd(), '.data');
const filePath = path.join(storePath, 'tokens.json');

async function ensureDir() { try { await mkdir(storePath, { recursive: true }); } catch {} }

export async function GET() {
  try {
    await stat(filePath);
    const buf = await readFile(filePath, 'utf8');
    return new Response(buf, { headers: { 'content-type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ tokens: null }), { headers: { 'content-type': 'application/json' } });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  await ensureDir();
  await writeFile(filePath, JSON.stringify(body, null, 2), 'utf8');
  return new Response(JSON.stringify({ ok: true }), { headers: { 'content-type': 'application/json' } });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  try {
    const prev = JSON.parse(await readFile(filePath, 'utf8'));
    const next = { ...prev, ...body };
    await writeFile(filePath, JSON.stringify(next, null, 2), 'utf8');
    return new Response(JSON.stringify({ ok: true }), { headers: { 'content-type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}


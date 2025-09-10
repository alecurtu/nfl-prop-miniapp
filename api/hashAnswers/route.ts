export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';

function toHex(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function canonicalize(answers: Record<string, number>) {
  const entries = Object.entries(answers).sort(([a],[b]) => a.localeCompare(b));
  return JSON.stringify(Object.fromEntries(entries));
}

export async function POST(req: NextRequest) {
  const { answers } = await req.json();
  if (!answers || typeof answers !== 'object') {
    return NextResponse.json({ error: 'answers required' }, { status: 400 });
  }

  const enc = new TextEncoder();
  const data = enc.encode(canonicalize(answers));
  const digest = await crypto.subtle.digest('SHA-256', data);
  const hex = toHex(digest);

  return NextResponse.json({ hash: hex });
}

import { NextRequest, NextResponse } from 'next/server';

// In-memory mock store (replace w/ Spacetime or DB)
const store = new Map<string, any[]>();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { contestId, txHash, answers } = body || {};
  if (!contestId || !txHash || !answers) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 });
  }

  const arr = store.get(contestId) || [];
  arr.push({ at: Date.now(), txHash, answers });
  store.set(contestId, arr);

  return NextResponse.json({ ok: true, count: arr.length });
}

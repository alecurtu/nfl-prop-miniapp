import { NextRequest, NextResponse } from 'next/server';
import { addEntry, listEntries } from '@/lib/server/store';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { contestId, txHash, answers } = body || {};
  let { chargeId } = body || {};

  if (!contestId || !answers) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 });
  }
  if (!txHash && !chargeId) {
    return NextResponse.json({ error: 'need txHash or chargeId' }, { status: 400 });
  }
  if (typeof chargeId === 'string' && chargeId.startsWith('charge:')) {
    chargeId = chargeId.split(':')[1];
  }

  const entry = addEntry(contestId, { txHash: txHash || null, chargeId: chargeId || null, answers });
  const count = listEntries(contestId).length;
  return NextResponse.json({ ok: true, count, verified: entry.verified });
}

import { NextRequest, NextResponse } from 'next/server';

// In-memory mock stores (replace with DB in prod)
const entries = new Map<string, any[]>();            // contestId -> entries
const verifiedCharges = new Set<string>();           // chargeId strings

// Allow webhook route to mark verified charges in-memory
export function _markVerifiedCharge(chargeId: string) {
  verifiedCharges.add(chargeId);
}

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

  const arr = entries.get(contestId) || [];
  arr.push({
    at: Date.now(),
    txHash: txHash || null,
    chargeId: chargeId || null,
    verified: chargeId ? verifiedCharges.has(chargeId) : Boolean(txHash),
    answers
  });
  entries.set(contestId, arr);

  return NextResponse.json({ ok: true, count: arr.length, verified: arr[arr.length - 1].verified });
}

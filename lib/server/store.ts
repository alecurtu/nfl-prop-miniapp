export type Entry = {
  at: number;
  txHash?: string | null;
  chargeId?: string | null;
  verified: boolean;
  answers: Record<string, number>;
};

// In-memory demo stores. Replace with a database for production.
const entries = new Map<string, Entry[]>();     // contestId -> entries
const verifiedCharges = new Set<string>();      // chargeId -> verified

export function markVerifiedCharge(chargeId: string) {
  if (!chargeId) return;
  verifiedCharges.add(chargeId);
}

export function isChargeVerified(chargeId?: string | null) {
  return !!(chargeId && verifiedCharges.has(chargeId));
}

export function addEntry(contestId: string, data: { txHash?: string | null; chargeId?: string | null; answers: Record<string, number> }) {
  const entry: Entry = {
    at: Date.now(),
    txHash: data.txHash ?? null,
    chargeId: data.chargeId ?? null,
    verified: data.chargeId ? isChargeVerified(data.chargeId) : Boolean(data.txHash),
    answers: data.answers,
  };
  const arr = entries.get(contestId) || [];
  arr.push(entry);
  entries.set(contestId, arr);
  return entry;
}

export function listEntries(contestId: string) {
  return entries.get(contestId) || [];
}

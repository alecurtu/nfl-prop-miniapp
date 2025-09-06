'use client';
export async function submitEntry({ contestId, txHash, answers }:{ contestId:string, txHash:string, answers:Record<string,number>}){
  const res = await fetch('/api/submitEntry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contestId, txHash, answers })
  });
  if (!res.ok) throw new Error('failed to submit');
  return res.json();
}

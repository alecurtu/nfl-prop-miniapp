'use client';

import React from 'react';
import { useState } from 'react';
import { Pay } from '@coinbase/onchainkit/payment';
import { useRouter } from 'next/navigation';

export function PaymentPanel({ contestId, disabled, onPaid }: { contestId: string, disabled?: boolean, onPaid: (txHash:string)=>Promise<void> }) {
  const [loading, setLoading] = useState(false);

  return (
    <section className="card space-y-3">
      <h3 className="font-semibold">Pay Entry Fee ($1 USDC)</h3>
      <p className="text-sm text-neutral-600">Powered by OnchainKit on Base</p>
      <div className="flex gap-2">
        <button
          disabled={disabled || loading}
          className="btn-primary"
          onClick={async ()=>{
            // Placeholder — in real app, use OnchainKit's <Pay /> or wagmi+viem to send USDC.
            // Simulate a txHash for local testing.
            setLoading(True)
          }}
        >
          Simulate Payment
        </button>
        <Pay
          to={process.env.NEXT_PUBLIC_USDC_ADDRESS || ''}
          amount="1"
          onSuccess={async (event:any)=>{
            const txHash = event?.transactionHash || '0x-simulated';
            await onPaid(txHash);
          }}
          disabled={disabled || loading}
          chainId={Number(process.env.NEXT_PUBLIC_BASE_CHAIN_ID || 8453)}
          className="btn-ghost"
        >
          Pay with OnchainKit
        </Pay>
      </div>
    </section>
  );
}

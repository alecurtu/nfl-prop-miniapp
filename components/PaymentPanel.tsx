'use client';

import React from 'react';
import { useState } from 'react';
import { Pay } from '@coinbase/onchainkit';

export function PaymentPanel({ contestId, disabled, onPaid }: { contestId: string, disabled?: boolean, onPaid: (txHash:string)=>Promise<void> }) {
  const [loading, setLoading] = useState(false);
  const chainId = Number(process.env.NEXT_PUBLIC_BASE_CHAIN_ID || 8453);
  const usdc = process.env.NEXT_PUBLIC_USDC_ADDRESS || '';

  return (
    <section className="card space-y-3">
      <h3 className="font-semibold">Pay Entry Fee ($1 USDC)</h3>
      <p className="text-sm text-neutral-600">Powered by OnchainKit on Base</p>
      <div className="flex gap-2">
        <button
          disabled={disabled || loading}
          className="btn-primary"
          onClick={async ()=>{
            // Local-only fallback to test flow without chain calls
            setLoading(true);
            try {
              await onPaid('0x-simulated');
            } finally {
              setLoading(false);
            }
          }}
        >
          Simulate Payment
        </button>
        <Pay
          to={usdc}
          amount="1"
          chainId={chainId}
          disabled={disabled || loading}
          onSuccess={async (event: any) => {
            const txHash = event?.transactionHash || '0x-simulated';
            await onPaid(txHash);
          }}
          className="btn-ghost"
        >
          Pay with OnchainKit
        </Pay>
      </div>
    </section>
  );
}

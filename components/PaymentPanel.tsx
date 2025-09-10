'use client';

import React, { useMemo, useState } from 'react';
import { Checkout, CheckoutButton, CheckoutStatus } from '@coinbase/onchainkit/checkout';
import type { LifecycleStatus } from '@coinbase/onchainkit/checkout';

type Props = {
  contestId: string;
  disabled?: boolean;
  onPaid: (txOrChargeId: string) => Promise<void>;
};

export function PaymentPanel({ contestId, disabled, onPaid }: Props) {
  const [loading, setLoading] = useState(false);
  const productId = process.env.NEXT_PUBLIC_COMMERCE_PRODUCT_ID;
  const canCheckout = useMemo(() => Boolean(productId) && !disabled && !loading, [productId, disabled, loading]);

  const handleStatus = async (status: LifecycleStatus) => {
    const { statusName, statusData } = status;
    if (statusName === 'success') {
      const receipts = (statusData as any)?.transactionReceipts as Array<{ transactionHash?: string }> | undefined;
      const txHash = receipts?.[0]?.transactionHash;
      const chargeId = (statusData as any)?.chargeId as string | undefined;
      const token = txHash ?? (chargeId ? `charge:${chargeId}` : undefined);
      if (token) {
        await onPaid(token);
      }
    }
  };

  return (
    <section className="card space-y-3">
      <h3 className="font-semibold">Pay Entry Fee ($1 USDC)</h3>
      <p className="text-sm text-neutral-600">Powered by OnchainKit Checkout (Coinbase Commerce)</p>
      <div className="flex gap-2 items-center">
        <button
          disabled={disabled || loading}
          className="btn-primary"
          onClick={async () => {
            setLoading(true);
            try {
              await onPaid('0x-simulated');
              alert('Simulated payment complete.');
            } finally {
              setLoading(false);
            }
          }}
        >
          Simulate Payment
        </button>

        {productId ? (
          <Checkout productId={productId} onStatus={handleStatus}>
            <CheckoutButton text="Pay $1 USDC" disabled={!canCheckout} />
            <CheckoutStatus />
          </Checkout>
        ) : (
          <span className="text-xs text-neutral-500">Set NEXT_PUBLIC_COMMERCE_PRODUCT_ID in your env to enable Checkout.</span>
        )}
      </div>
    </section>
  );
}

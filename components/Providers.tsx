'use client';

import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <OnchainKitProvider chain={base} config={{ appearance: { name: 'NFL Prop Mini App' } }}>
      {children}
    </OnchainKitProvider>
  );
}

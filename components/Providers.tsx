'use client';

import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains';
import { MiniAppProvider } from '@neynar/react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MiniAppProvider analyticsEnabled={true}>
      <OnchainKitProvider chain={base} config={{ appearance: { name: 'NFL Prop Mini App' } }}>
        {children}
      </OnchainKitProvider>
    </MiniAppProvider>
  );
}

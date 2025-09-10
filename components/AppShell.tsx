'use client';

import { ReactNode } from 'react';
import BottomNav from './BottomNav';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="pb-20">{children}</div>
      <BottomNav />
    </>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad2, Trophy, SlidersHorizontal } from 'lucide-react';

const tabs = [
  { href: '/', label: 'Play', icon: Gamepad2 },
  { href: '/rankings', label: 'Rankings', icon: Trophy },
  { href: '/props', label: 'Props', icon: SlidersHorizontal },
];

export function BottomNav() {
  const pathname = usePathname() || '/';
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto max-w-3xl grid grid-cols-3">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center py-3 text-xs ${active ? 'text-black' : 'text-neutral-500'}`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
      <div className="h-[calc(env(safe-area-inset-bottom))]" />
    </nav>
  );
}

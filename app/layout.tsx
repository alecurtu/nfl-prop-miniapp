export const runtime = 'edge';
import './globals.css';
import { ReactNode } from 'react';
import { Providers } from '@/components/Providers';
import { AppShell } from '@/components/AppShell';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://YOUR_DOMAIN';

export const metadata = {
  metadataBase: new URL(APP_URL),
  title: 'NFL Prop Mini App',
  description: '$1 USDC prop sweepstakes on Base',
  openGraph: {
    title: 'NFL Prop Mini App',
    description: 'Answer props, pay $1 USDC, and challenge friends on Farcaster.',
    images: ['/frame.png'],
    url: APP_URL
  },
  other: {
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: `${APP_URL}/frame.png`,
      button: {
        title: 'Play',
        action: {
          type: 'launch_miniapp',
          name: 'NFL Prop Mini App',
          url: APP_URL,
          splashImageUrl: `${APP_URL}/frame.png`,
          splashBackgroundColor: '#111111'
        }
      }
    })
  }
} as const;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}

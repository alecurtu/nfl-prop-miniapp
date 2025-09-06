// app/api/frames/route.ts
import { NextResponse } from 'next/server';
export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return NextResponse.json({
    version: 'v2',
    title: 'NFL Prop Mini App',
    image: `${appUrl}/frame.png`,
    buttons: [
      { label: 'Play for $1 USDC', action: 'launch' },
      { label: 'Open Mini App', action: 'link', target: appUrl },
    ],
    browser_flow_url: appUrl,
  });
}

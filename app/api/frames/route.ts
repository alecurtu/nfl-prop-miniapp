import { NextResponse } from 'next/server';

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const image = `${appUrl}/api/frames/image`;
  const postUrl = `${appUrl}/api/frames/submit`;

  return new NextResponse(
    JSON.stringify({
      version: "v2",
      title: "NFL Prop Mini App",
      image,
      buttons: [
        { label: "Play for $1 USDC", action: "launch" },
        { label: "Open Mini App", action: "link", target: appUrl }
      ],
      browser_flow_url: appUrl
    } as any),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

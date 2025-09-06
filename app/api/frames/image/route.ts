import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'NFL Prop Mini App';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #111, #333)',
          color: 'white',
          fontSize: 60,
          fontWeight: 700
        }}
      >
        <div>🏈 Prop Mini App</div>
        <div style={{ fontSize: 28, marginTop: 12 }}>$1 USDC · Base</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

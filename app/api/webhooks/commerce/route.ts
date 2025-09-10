// Coinbase Commerce webhook validator
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Re-import local store marker from submitEntry route
import { _markVerifiedCharge } from '../../submitEntry/route';

export const runtime = 'nodejs'; // use Node crypto

function timingSafeEqual(a: Buffer, b: Buffer) {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const secret = process.env.COMMERCE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Missing COMMERCE_WEBHOOK_SECRET' }, { status: 500 });
  }

  const rawBody = await req.text();
  const sigHeader = req.headers.get('X-CC-Webhook-Signature') || req.headers.get('x-cc-webhook-signature');
  if (!sigHeader) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  // Compute HMAC SHA256 of raw body with shared secret
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(rawBody, 'utf8');
  const digest = hmac.digest('hex');

  const expected = Buffer.from(digest, 'utf8');
  const received = Buffer.from(sigHeader, 'utf8');
  if (!timingSafeEqual(expected, received)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  // Expect charge:confirmed/completed to mark as verified
  const type = event?.type;
  const chargeId = event?.data?.id as string | undefined;
  if (chargeId && (type?.includes('charge:confirmed') || type?.includes('charge:resolved') || type?.includes('charge:pending'))) {
    _markVerifiedCharge(chargeId);
  }

  return NextResponse.json({ ok: true });
}

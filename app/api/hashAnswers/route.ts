import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const { answers } = await req.json();
  const hash = crypto.createHash('sha256').update(JSON.stringify(answers)).digest('hex');
  return NextResponse.json({ hash });
}

import { NextResponse } from 'next/server';

export async function POST() {
  // Frame submit can route users to your app URL
  return NextResponse.json({ redirect: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000' });
}

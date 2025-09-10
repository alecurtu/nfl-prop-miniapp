import { NextResponse } from 'next/server';

export async function GET() {
  const sample = [
    { rank: 1, user: 'alex', points: 97 },
    { rank: 2, user: 'jordan', points: 92 },
    { rank: 3, user: 'sam', points: 90 },
    { rank: 4, user: 'morgan', points: 86 },
    { rank: 5, user: 'taylor', points: 84 },
  ];
  return NextResponse.json(sample);
}

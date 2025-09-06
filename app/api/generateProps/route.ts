import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

const TEMPLATES = [
  { label: (g:string)=> `${g}: Total team turnovers`, min: 0, max: 6, step: 1 },
  { label: (g:string)=> `${g}: Total team sacks`, min: 0, max: 10, step: 1 },
  { label: (g:string)=> `${g}: QB passing yards`, min: 100, max: 450, step: 5, units: 'yds' },
  { label: (g:string)=> `${g}: RB rushing yards`, min: 0, max: 220, step: 5, units: 'yds' },
  { label: (g:string)=> `${g}: WR receiving yards`, min: 0, max: 220, step: 5, units: 'yds' },
  { label: (g:string)=> `${g}: Longest field goal`, min: 20, max: 65, step: 1, units: 'yds' },
];

// In real-world, pull the week schedule & teams from your NFL API, then format labels accordingly.
function randomGameLabel() {
  const teams = ['KC vs BAL','BUF vs MIA','PHI vs DAL','SF vs SEA','GB vs CHI','CIN vs CLE','NYJ vs NE','LAR vs ARI'];
  return teams[Math.floor(Math.random()*teams.length)];
}

export async function GET(req: NextRequest) {
  const count = Math.min(5, Number(req.nextUrl.searchParams.get('count')||'5'));
  const game = randomGameLabel();
  const questions = Array.from({ length: count }).map(() => {
    const t = TEMPLATES[Math.floor(Math.random()*TEMPLATES.length)];
    const min = t.min;
    const max = t.max;
    const step = t.step ?? 1;
    const def = Math.round((min + (max - min)/2) / step) * step;
    return {
      id: randomUUID(),
      label: t.label(game),
      min, max, step, default: def, units: (t as any).units
    };
  });

  return NextResponse.json({ game, questions });
}

import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

type Template = {
  id: string;
  label: (g: string) => string;
  min: number;
  max: number;
  step?: number;
  units?: string;
};

const TEMPLATES: Template[] = [
  { id: 'turnovers', label: (g) => `${g}: Total team turnovers`, min: 0, max: 6, step: 1 },
  { id: 'sacks', label: (g) => `${g}: Total team sacks`, min: 0, max: 10, step: 1 },
  { id: 'passYds', label: (g) => `${g}: QB passing yards`, min: 100, max: 450, step: 5, units: 'yds' },
  { id: 'rushYds', label: (g) => `${g}: RB rushing yards`, min: 0, max: 220, step: 5, units: 'yds' },
  { id: 'recYds', label: (g) => `${g}: WR receiving yards`, min: 0, max: 220, step: 5, units: 'yds' },
  { id: 'longFG', label: (g) => `${g}: Longest field goal`, min: 20, max: 65, step: 1, units: 'yds' },
];

function sampleUnique<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function randomGameLabel() {
  const teams = ['KC vs BAL','BUF vs MIA','PHI vs DAL','SF vs SEA','GB vs CHI','CIN vs CLE','NYJ vs NE','LAR vs ARI'];
  return teams[Math.floor(Math.random()*teams.length)];
}

export async function GET(req: NextRequest) {
  const requested = Math.min(Number(req.nextUrl.searchParams.get('count') || '5'), TEMPLATES.length);
  const game = randomGameLabel();
  const chosen = sampleUnique(TEMPLATES, requested);

  const questions = chosen.map((t) => {
    const min = t.min;
    const max = t.max;
    const step = t.step ?? 1;
    const def = Math.round((min + (max - min)/2) / step) * step;
    return {
      id: randomUUID(),
      kind: t.id,
      label: t.label(game),
      min, max, step, default: def, units: t.units
    };
  });

  return NextResponse.json({ game, questions });
}

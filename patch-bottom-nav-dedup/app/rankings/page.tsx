'use client';
import useSWR from 'swr';

type Row = { rank: number; user: string; points: number };

export default function RankingsPage() {
  const { data } = useSWR<Row[]>('/api/rankings', async (u) => (await fetch(u)).json());
  const rows = data ?? [
    { rank: 1, user: 'alex', points: 97 },
    { rank: 2, user: 'jordan', points: 92 },
    { rank: 3, user: 'sam', points: 90 },
  ];

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Rankings</h1>
      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-neutral-500">
              <th className="py-2">Rank</th>
              <th className="py-2">User</th>
              <th className="py-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.rank} className="border-t border-neutral-200">
                <td className="py-2">{r.rank}</td>
                <td className="py-2 capitalize">{r.user}</td>
                <td className="py-2">{r.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

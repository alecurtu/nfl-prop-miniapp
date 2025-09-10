export default function PropsPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Props</h1>
      <section className="card space-y-3">
        <p className="text-sm text-neutral-700">
          Example prop types in rotation:
        </p>
        <ul className="list-disc pl-6 text-sm">
          <li>Total team turnovers</li>
          <li>Total team sacks</li>
          <li>QB passing yards</li>
          <li>RB rushing yards</li>
          <li>WR receiving yards</li>
          <li>Longest field goal</li>
        </ul>
        <p className="text-xs text-neutral-500">
          Admins can expand or tweak this list and weights later. Live data hooks coming next.
        </p>
      </section>
    </main>
  );
}

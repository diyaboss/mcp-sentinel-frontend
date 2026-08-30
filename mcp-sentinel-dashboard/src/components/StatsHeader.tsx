function StatCell({ label, value, colorClass }: { label: string; value: number; colorClass: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[10px] uppercase tracking-wider text-text-faint">{label}</span>
      <span className={`font-mono text-xl font-semibold ${colorClass}`}>{value}</span>
    </div>
  );
}

export function StatsHeader({
  stats,
}: {
  stats: { total: number; allow: number; ask: number; block: number };
}) {
  return (
    <div className="flex items-center gap-6 rounded-lg border border-line bg-surface px-5 py-3">
      <StatCell label="Total Calls" value={stats.total} colorClass="text-text-primary" />
      <div className="h-8 w-px bg-line" />
      <StatCell label="Allowed" value={stats.allow} colorClass="text-allow" />
      <StatCell label="Asked" value={stats.ask} colorClass="text-ask" />
      <StatCell label="Blocked" value={stats.block} colorClass="text-block" />
    </div>
  );
}

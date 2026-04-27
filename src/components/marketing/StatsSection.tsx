/**
 * StatsSection
 *
 * Four-metric strip of quantitative value props. Relocated out of the hero so
 * it doesn't cannibalize the primary CTA. Cards use neutral borders + emerald
 * accent numerals to match the authenticated dashboard aesthetic.
 */

const STATS = [
  { value: '10x', label: 'Faster insights', sub: 'vs. manual reporting cycles' },
  { value: '12+', label: 'Data sources', sub: 'connected out of the box' },
  { value: '70%', label: 'Less input time', sub: 'spent pulling reports each week' },
  { value: '<5m', label: 'Time-to-first-answer', sub: 'from signup to a real chart' },
] as const;

export function StatsSection() {
  return (
    <section
      id="stats"
      className="relative scroll-mt-24 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6"
            >
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400 tabular-nums">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-white">{stat.label}</div>
              <div className="mt-1 text-xs text-white/50">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

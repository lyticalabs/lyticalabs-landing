/**
 * UseCasesSection
 *
 * Three persona-oriented value prop cards. Helps visitors self-identify and
 * anchors the abstract "AI analytics" pitch to concrete day-to-day wins.
 */

import { Briefcase, LineChart, Wallet } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

const CASES = [
  {
    icon: LineChart,
    persona: 'Revenue operations',
    headline: 'Pipeline answers without the SQL queue.',
    bullets: [
      'Surface stalled deals and at-risk renewals automatically',
      'Reconcile CRM, billing, and attribution in one view',
      'Forecast the quarter with live data, not stale decks',
    ],
  },
  {
    icon: Wallet,
    persona: 'Finance',
    headline: 'Close the month with confidence.',
    bullets: [
      'Tie invoices to bookings and collections without exports',
      'Catch billing anomalies the day they happen',
      'Share board-ready recaps straight from the chat',
    ],
  },
  {
    icon: Briefcase,
    persona: 'Growth & marketing',
    headline: 'Channel performance you can actually trust.',
    bullets: [
      'Unified spend, pacing, and conversion across channels',
      'Real-time alerts when CPA or ROAS drift',
      'Ad-hoc analysis without waiting on the data team',
    ],
  },
] as const;

export function UseCasesSection() {
  return (
    <section
      id="use-cases"
      className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 scroll-mt-20 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Built for"
          title="Made for the teams who live in the numbers."
          subtitle="Lytica ships with playbooks for the people who catch the fires when data slips."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASES.map(({ icon: Icon, persona, headline, bullets }) => (
            <article
              key={persona}
              className="flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <Icon className="size-4 text-emerald-400" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  {persona}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white leading-snug">{headline}</h3>
              <ul className="mt-4 space-y-2.5">
                {bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-white/65">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

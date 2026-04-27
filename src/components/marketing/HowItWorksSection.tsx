/**
 * HowItWorksSection
 *
 * Three-step onboarding story: connect → ask → act. Uses the emerald-gradient
 * orb pattern from the Marli greeting state for visual continuity with the
 * authenticated app.
 */

import { SectionHeader } from './SectionHeader';

const STEPS = [
  {
    n: '01',
    title: 'Connect your data',
    body: 'Authenticate your CRM, billing, warehouse, ad platforms, and productivity tools. No pipelines to maintain.',
  },
  {
    n: '02',
    title: 'Ask Marli',
    body: 'Pose questions in plain English. Marli interprets intent, picks the right sources, and returns a chart, table, or explanation.',
  },
  {
    n: '03',
    title: 'Act on insights',
    body: 'Pin dashboards, route anomaly alerts to Slack, and share recap links — your team never has to rebuild a report again.',
  },
] as const;

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 scroll-mt-20 border-t border-white/5 overflow-hidden"
    >
      {/* Subtle emerald radial wash — echoes the in-app .chat-gradient-overlay
          without stacking a second grid background on top of the hero grid. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_60%)]"
      />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="How it works"
          title="From scattered data to a single answer in minutes."
          subtitle="Skip the dashboards, skip the SQL. Lytica reasons over your systems directly."
        />

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, idx) => (
            <li
              key={step.n}
              className="relative flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-7"
            >
              {/* Gradient numeric orb — matches the Marli empty state avatar. */}
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-bold text-white shadow-lg shadow-emerald-500/30">
                {step.n}
              </div>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{step.body}</p>

              {/* Desktop connecting line between steps. Hidden on the last card. */}
              {idx < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden md:block absolute right-[-12px] top-12 h-px w-6 bg-gradient-to-r from-emerald-500/40 to-transparent"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

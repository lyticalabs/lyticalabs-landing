/**
 * FeaturesSection
 *
 * Bento-style capability grid. Two cards ("Marli, your AI analyst" and
 * "Generative charts") render as full showcase tiles with in-product mocks
 * so the section *demonstrates* the platform instead of just describing it.
 * The remaining four cards share a consistent compact layout with gradient
 * icon tiles, hover glow auras, and metric chips that ground each claim in
 * something concrete.
 *
 * Layout uses a 6-column bento on md+ so the first row is (4 + 2) and the
 * final row spans the full width for the chart showcase. On mobile every
 * card collapses to a single column.
 */

import {
  BarChart3,
  BellRing,
  DollarSign,
  LineChart,
  Plug,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

interface FeatureCardShellProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared card shell: rounded border, subtle glass background, and a hover
 * emerald aura via ::before. Centralizing the surface keeps the bento items
 * visually unified even when their inner content differs.
 */
function FeatureCardShell({ children, className = '' }: FeatureCardShellProps) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/[0.04] hover:-translate-y-0.5 ${className}`}
    >
      {/* Hover aura — soft emerald radial that brightens on hover. Positioned
          behind card content via z-0 so text stays fully legible. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at 50% 0%, rgba(16,185,129,0.18), transparent 60%)',
        }}
      />
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </article>
  );
}

interface IconTileProps {
  icon: LucideIcon;
}

/**
 * Gradient icon chip — replaces the old flat emerald icon-in-header bar with
 * a raised tile so each card has a clear visual anchor.
 */
function IconTile({ icon: Icon }: IconTileProps) {
  return (
    <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 ring-1 ring-inset ring-emerald-400/30 shadow-lg shadow-emerald-500/10">
      <Icon className="size-5 text-emerald-300" aria-hidden="true" />
    </div>
  );
}

interface MetricChipProps {
  label: string;
}

/**
 * Small metric/fact pill used under each compact card body. Converts abstract
 * claims into specific numbers — helps with scan-reading on the landing page.
 */
function MetricChip({ label }: MetricChipProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-2.5 py-1 text-[11px] font-medium text-emerald-300">
      <span className="inline-block h-1 w-1 rounded-full bg-emerald-400" />
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Compact card (used for 4 of the 6 features)
// ---------------------------------------------------------------------------

interface CompactFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  metric: string;
  className?: string;
}

function CompactFeature({ icon, title, description, metric, className }: CompactFeatureProps) {
  return (
    <FeatureCardShell className={className}>
      <div className="flex flex-col gap-4 p-6 sm:p-7">
        <IconTile icon={icon} />
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="text-sm leading-relaxed text-white/60">{description}</p>
        </div>
        <div className="mt-auto pt-2">
          <MetricChip label={metric} />
        </div>
      </div>
    </FeatureCardShell>
  );
}

// ---------------------------------------------------------------------------
// Showcase #1 — Marli chat preview
// ---------------------------------------------------------------------------

/**
 * Static mock of a Marli exchange. Not wired to live data — it's a marketing
 * artifact, so we lean on the same color tokens the real chat UI uses to
 * keep continuity with the authenticated app.
 */
function MarliChatPreview() {
  return (
    <div className="relative rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-4 shadow-inner shadow-black/20">
      {/* User message */}
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs text-white/85">
          What&apos;s our MRR by plan this week vs last?
        </div>
      </div>

      {/* Marli response */}
      <div className="mt-3 flex items-start gap-2.5">
        <div className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-[10px] font-bold text-white shadow-md shadow-emerald-500/30">
          M
        </div>
        <div className="flex-1 rounded-2xl rounded-tl-sm border border-emerald-500/20 bg-emerald-500/[0.06] px-3.5 py-2.5">
          <p className="text-xs leading-relaxed text-white/80">
            MRR is up <span className="font-semibold text-emerald-300">+4.2%</span> WoW, led by
            Pro.
          </p>

          {/* Mini bar chart — staggered bar-grow animation matches the
              animation tokens already in globals.css for visual cohesion. */}
          <div className="mt-3 flex h-14 items-end gap-1.5">
            {[55, 72, 48, 88, 64, 96, 78].map((h, i) => (
              <div
                key={`mrr-bar-${h}`}
                className="flex-1 origin-bottom rounded-sm bg-gradient-to-t from-emerald-500/30 to-emerald-400"
                style={{
                  height: `${h}%`,
                  animation: `bar-grow 1.2s ease-out ${i * 80}ms forwards`,
                  transform: 'scaleY(0)',
                }}
              />
            ))}
          </div>
          <div className="mt-1.5 flex justify-between text-[9px] uppercase tracking-wider text-white/40">
            <span>Mon</span>
            <span>Sun</span>
          </div>
        </div>
      </div>

      {/* Typing indicator — signals Marli is "still thinking" without
          pushing layout around. */}
      <div className="mt-3 flex items-center gap-1.5 pl-8">
        <span
          className="h-1.5 w-1.5 rounded-full bg-emerald-400/70"
          style={{ animation: 'typing 1.4s ease-in-out infinite' }}
        />
        <span
          className="h-1.5 w-1.5 rounded-full bg-emerald-400/70"
          style={{ animation: 'typing 1.4s ease-in-out 200ms infinite' }}
        />
        <span
          className="h-1.5 w-1.5 rounded-full bg-emerald-400/70"
          style={{ animation: 'typing 1.4s ease-in-out 400ms infinite' }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Showcase #2 — Generative chart preview
// ---------------------------------------------------------------------------

const REVENUE_SERIES = [32, 45, 38, 58, 52, 71, 66, 84, 78, 92, 88, 100] as const;

/**
 * Animated bar chart mock — conveys "Marli picks the right visualization" at
 * a glance. Uses the existing `bar-grow` keyframe.
 */
function GenerativeChartPreview() {
  return (
    <div className="relative rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-4 sm:p-5">
      {/* Fake chart toolbar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/50">
            Revenue · 12w trend
          </span>
        </div>
        <div className="flex gap-1">
          {['1W', '1M', '3M'].map((k, i) => (
            <span
              key={k}
              className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${
                i === 2
                  ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'text-white/40'
              }`}
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* Bars */}
      <div className="flex h-24 items-end gap-1.5 sm:h-32">
        {REVENUE_SERIES.map((h, i) => (
          <div
            key={`rev-bar-${h}`}
            className="flex-1 origin-bottom rounded-sm bg-gradient-to-t from-emerald-500/20 via-emerald-400/70 to-emerald-300"
            style={{
              height: `${h}%`,
              animation: `bar-grow 1.4s ease-out ${i * 60}ms forwards`,
              transform: 'scaleY(0)',
            }}
          />
        ))}
      </div>

      {/* Axis */}
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-white/35">
        <span>Jan</span>
        <span>Apr</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Compact card data
// ---------------------------------------------------------------------------

const COMPACT_FEATURES: ReadonlyArray<CompactFeatureProps> = [
  {
    icon: BellRing,
    title: 'Real-time alerts',
    description:
      'Detect anomalies, revenue drops, and pacing misses the moment they happen — before your morning standup.',
    metric: 'Sub-minute fire time',
  },
  {
    icon: DollarSign,
    title: 'Revenue insights',
    description:
      'A unified view of pipeline, billings, and collections across every CRM and billing system you run.',
    metric: 'Pipeline → cash',
  },
  {
    icon: Plug,
    title: 'Multi-source connectors',
    description:
      'Salesforce, HubSpot, Stripe, Snowflake, Gmail, Slack, and a dozen more — live in minutes, no ETL team.',
    metric: '30+ integrations',
  },
  {
    icon: LineChart,
    title: 'Custom dashboards',
    description:
      'Pin the views your team actually uses. Share links, schedule recaps, and drill in without leaving the page.',
    metric: 'Scheduled recaps',
  },
] as const;

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 sm:py-28 scroll-mt-20 border-t border-white/5"
    >
      {/* Section-wide emerald wash. Mirrors HowItWorksSection so the visual
          rhythm across the page stays consistent. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_55%)]"
      />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Platform"
          title="Everything your data team ships, in one place."
          subtitle="Lytica collapses the tooling sprawl of analytics, alerting, and reporting into a single conversational surface powered by your own data."
        />

        {/* Bento grid.
            - Mobile: single column.
            - md+: 6-col bento with a 4+2 hero row and a full-width showcase. */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {/* ---- Showcase #1: Marli, your AI analyst (span-4) ---- */}
          <FeatureCardShell className="md:col-span-4 md:row-span-1">
            <div className="grid flex-1 grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <IconTile icon={Sparkles} />
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    Flagship
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white sm:text-[26px]">
                    Marli, your AI analyst
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-[15px]">
                    Ask questions in plain English and get charts, tables, and narrative answers
                    grounded in your live data — not stale exports or hand-built dashboards.
                  </p>
                </div>
                <ul className="mt-1 space-y-2 text-xs text-white/55">
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    Grounded in your warehouse, CRM, and billing data
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    Returns charts, tables, or narrative — whichever fits
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    Cites the exact rows behind every number
                  </li>
                </ul>
              </div>

              <MarliChatPreview />
            </div>
          </FeatureCardShell>

          {/* ---- Compact: Real-time alerts (span-2) ---- */}
          <CompactFeature {...COMPACT_FEATURES[0]} className="md:col-span-2" />

          {/* ---- Compact row: Revenue / Connectors / Dashboards ---- */}
          {COMPACT_FEATURES.slice(1).map((f) => (
            <CompactFeature key={f.title} {...f} className="md:col-span-2" />
          ))}

          {/* ---- Showcase #2: Generative charts (span-6) ---- */}
          <FeatureCardShell className="md:col-span-6">
            <div className="grid flex-1 grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_1.3fr] lg:gap-10">
              <div className="flex flex-col gap-4">
                <IconTile icon={BarChart3} />
                <h3 className="text-2xl font-semibold text-white">Generative charts</h3>
                <p className="text-sm leading-relaxed text-white/65 sm:text-[15px]">
                  Marli designs the right visualization for every question — cohort tables,
                  time-series trends, funnel views, or retention heatmaps — and iterates with you
                  until the picture is right.
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  <MetricChip label="Bars · Lines · Areas" />
                  <MetricChip label="Cohort heatmaps" />
                  <MetricChip label="Funnels" />
                </div>
              </div>

              <GenerativeChartPreview />
            </div>
          </FeatureCardShell>
        </div>
      </div>
    </section>
  );
}

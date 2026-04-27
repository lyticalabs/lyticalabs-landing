'use client';

/**
 * HeroVisualCombined — Option D visual (EMERALD elements, VIOLET ambient only)
 *
 * Composition
 * -----------
 * Two stacked surfaces that read as a single "ask → answer" story:
 *
 *   1. TOP · Generative Dashboard
 *      The full Option C dashboard — window chrome, NL prompt bar, KPI,
 *      sparkline, bar chart, insight feed, footer. Represents the
 *      *generated answer*.
 *
 *   2. BOTTOM-RIGHT · Prompt card (staggered)
 *      Narrower card from Option A with char-by-char typing, floated right
 *      and nudged up so it overlaps the dashboard's lower-right corner.
 *      Represents the *ongoing conversation*.
 *
 * Colour system
 * -------------
 * Every UI element (borders, avatars, text, connector, badges, charts) is
 * in the emerald family — the site's brand primary. Violet survives ONLY
 * as a soft radial glow behind the prompt card to give the composition
 * subtle two-tone depth, and as the section-level atmosphere defined in
 * the registry. No violet touches any actual content surface.
 *
 * Implementation notes
 * --------------------
 * - Each half owns its own animation loop (rAF typewriter for the prompt
 *   card, setInterval tick for the dashboard) so the composition stays cheap
 *   and each half can evolve independently.
 * - All rendered numbers derive from tick math → SSR + client match exactly.
 * - Honours `prefers-reduced-motion` by freezing every surface.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ---------------------------------------------------------------------------
// DASHBOARD half — content + tick-driven animated values.
// ---------------------------------------------------------------------------

const DASHBOARD_PROMPT = 'Show me revenue, pipeline, and top-moving accounts this quarter.';

const INSIGHTS = [
  { tag: 'Revenue', text: 'Enterprise ARR up 18.4% QoQ, led by 4 expansion deals.' },
  { tag: 'Pipeline', text: 'Q1 coverage at 138% — healthy, concentrated in 12 accounts.' },
  { tag: 'Risk', text: '3 mid-market accounts stalled >21d — flag for CS outreach.' },
  { tag: 'Cash', text: 'AR ageing improved 6d vs last month (DSO 38 → 32).' },
  { tag: 'Product', text: 'New workspaces: 142 last 7d (+23% WoW) — mostly via referral.' },
];

// ---------------------------------------------------------------------------
// PROMPT CARD half — rotating typewriter prompts.
// ---------------------------------------------------------------------------

const PROMPTS = [
  'What drove revenue growth last quarter?',
  'Which segments are at risk of churn this month?',
  'How is my pipeline pacing for next quarter?',
];

const CHARS_PER_SECOND = 28;
const HOLD_MS = 2600;

// ===========================================================================
// Component
// ===========================================================================

export function HeroVisualCombined() {
  const reducedMotion = useReducedMotion();

  // --- Dashboard animated values (tick-based) ----------------------------
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 100);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const revenue = useMemo(() => {
    const base = 4.82;
    const jitter = reducedMotion ? 0 : Math.sin(tick * 0.05) * 0.04;
    return (base + jitter).toFixed(2);
  }, [tick, reducedMotion]);

  const pipeline = useMemo(() => {
    const base = 9.4;
    const jitter = reducedMotion ? 0 : Math.cos(tick * 0.04) * 0.12;
    return (base + jitter).toFixed(1);
  }, [tick, reducedMotion]);

  const bars = useMemo(() => {
    const baselines = [48, 62, 55, 70, 64, 78, 72, 84, 79, 92];
    return baselines.map((b, i) => {
      if (reducedMotion) return b;
      return Math.max(20, Math.min(100, b + Math.sin(tick * 0.08 + i) * 8));
    });
  }, [tick, reducedMotion]);

  const sparkPath = useMemo(() => {
    const width = 180;
    const height = 44;
    const points: string[] = [];
    for (let i = 0; i < 24; i++) {
      const phase = reducedMotion ? 0 : tick * 0.05;
      const v = 50 + Math.sin(i * 0.5 + phase) * 18 + Math.sin(i * 0.2 + phase * 0.6) * 8;
      const x = (i / 23) * width;
      const y = height - ((v - 15) / 70) * height;
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return `M ${points.join(' L ')}`;
  }, [tick, reducedMotion]);

  const insightIdx = reducedMotion ? 0 : Math.floor(tick / 30) % INSIGHTS.length;
  const insightWindow = [0, 1, 2].map(
    (offset) => INSIGHTS[(insightIdx + offset) % INSIGHTS.length]
  );

  // --- Prompt card animated values (rAF typewriter) ----------------------
  const [promptIndex, setPromptIndex] = useState(0);
  const [promptProgress, setPromptProgress] = useState(reducedMotion ? 1 : 0);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const currentPrompt = PROMPTS[promptIndex];
  const typingMs = useMemo(
    () => Math.max(600, (currentPrompt.length / CHARS_PER_SECOND) * 1000),
    [currentPrompt.length]
  );

  useEffect(() => {
    if (reducedMotion) return;
    const totalMs = typingMs + HOLD_MS;
    const loop = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const next = Math.min(1, elapsed / totalMs);
      setPromptProgress(next);
      if (next >= 1) {
        startRef.current = 0;
        setPromptProgress(0);
        setPromptIndex((i) => (i + 1) % PROMPTS.length);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = 0;
    };
  }, [promptIndex, reducedMotion, typingMs]);

  const typingRatio = typingMs / (typingMs + HOLD_MS);
  const isTyping = promptProgress < typingRatio;
  const typeProgress = reducedMotion ? 1 : Math.min(1, promptProgress / typingRatio);
  const visibleChars = reducedMotion
    ? currentPrompt.length
    : Math.floor(currentPrompt.length * typeProgress);
  const typedPrompt = currentPrompt.slice(0, visibleChars);

  const showDashboardCaret = !reducedMotion && tick % 10 < 5;

  return (
    <div className="relative w-full max-w-[640px] mx-auto pb-4">
      {/* ================================================================= */}
      {/* DASHBOARD HALF — now emerald (site brand).                         */}
      {/* ================================================================= */}
      <div className="relative">
        {/* Emerald ambient glow — tuned to Option A's restraint level.
            Tighter inset + lower opacity so the black field around the
            dashboard stays legible instead of being flooded with tint. */}
        <div
          aria-hidden
          className="absolute -inset-4 bg-[radial-gradient(ellipse_at_50%_30%,rgba(16,185,129,0.16),transparent_70%)] blur-2xl"
        />

        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(16,185,129,0.35)]">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5 bg-black/40">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
            </div>
            <div className="flex-1 text-center text-[11px] text-white/40 font-mono truncate">
              marli · workspace / q4-review
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-300">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </div>
          </div>

          {/* Prompt bar */}
          <div className="px-3 pt-3">
            <div className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-black/40 px-3 py-2">
              <div className="h-5 w-5 rounded-md bg-gradient-to-br from-emerald-300 to-emerald-600 grid place-items-center text-[9px] font-bold text-black shrink-0">
                M
              </div>
              <div className="text-[13px] text-white/85 truncate font-medium">
                {DASHBOARD_PROMPT}
                {showDashboardCaret && (
                  <span className="inline-block w-[2px] h-3 ml-1 align-middle bg-emerald-300" />
                )}
              </div>
              <div className="ml-auto text-[10px] text-white/40 hidden sm:block shrink-0 font-mono">⌘K</div>
            </div>
          </div>

          <div className="p-3 grid grid-cols-12 gap-3">
            {/* KPI tile */}
            <div className="col-span-7 rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">
                  Revenue · Q4
                </div>
                <div className="text-[10px] text-emerald-300 font-medium">+18.4%</div>
              </div>
              <div className="mt-0.5 text-3xl font-bold text-white tabular-nums">${revenue}M</div>
              <svg viewBox="0 0 180 44" className="mt-1 w-full h-10" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="comboSparkStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#6ee7b7" />
                  </linearGradient>
                  <linearGradient id="comboSparkFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={`${sparkPath} L 180,44 L 0,44 Z`} fill="url(#comboSparkFill)" />
                <path
                  d={sparkPath}
                  fill="none"
                  stroke="url(#comboSparkStroke)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Pipeline tile */}
            <div className="col-span-5 rounded-xl border border-white/10 bg-white/[0.03] p-3 flex flex-col">
              <div className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">
                Pipeline
              </div>
              <div className="mt-0.5 text-2xl font-bold text-white tabular-nums">${pipeline}M</div>
              <div className="text-[10px] text-white/50 mb-2">138% coverage · on track</div>
              <div className="mt-auto h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-all duration-500"
                  style={{ width: `${Math.min(100, (parseFloat(pipeline) / 10) * 100)}%` }}
                />
              </div>
            </div>

            {/* Bar chart */}
            <div className="col-span-7 rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">
                  Bookings by week
                </div>
                <div className="text-[10px] text-white/40">last 10w</div>
              </div>
              <div className="flex items-end gap-1 h-20">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald-700/70 to-emerald-300 transition-all duration-500"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Insight feed */}
            <div className="col-span-5 rounded-xl border border-white/10 bg-white/[0.03] p-3 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">
                  Insights
                </div>
                <div className="text-[10px] text-emerald-300/90">{INSIGHTS.length} found</div>
              </div>
              <ul className="flex flex-col gap-1.5">
                {insightWindow.map((ins, offset) => (
                  <li
                    key={`${insightIdx}-${offset}`}
                    className={[
                      'flex items-start gap-1.5 transition-all duration-500',
                      offset === 0 ? 'opacity-100' : offset === 1 ? 'opacity-70' : 'opacity-40',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'mt-0.5 inline-block shrink-0 rounded px-1 py-px text-[8px] font-bold tracking-wide',
                        offset === 0
                          ? 'bg-emerald-400/20 text-emerald-200 border border-emerald-400/40'
                          : 'bg-white/5 text-white/50 border border-white/10',
                      ].join(' ')}
                    >
                      {ins.tag.toUpperCase()}
                    </span>
                    <span className="text-[11px] leading-snug text-white/80 line-clamp-2">
                      {ins.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-white/5 bg-black/30 text-[10px] text-white/50">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-1 h-1 rounded-full bg-emerald-400" />
              Synced: Snowflake · Salesforce · HubSpot · Stripe · Slack
            </div>
            <div className="tabular-nums">generated in 1.4s</div>
          </div>
        </div>

        {/* Emerald alert badge */}
        <div className="hidden sm:flex absolute -top-3 -right-3 items-center gap-1 rounded-full bg-emerald-400 text-black text-[10px] font-bold px-2 py-1 shadow-[0_10px_30px_-6px_rgba(52,211,153,0.8)]">
          <span className="inline-block w-1 h-1 rounded-full bg-black/70 animate-pulse" />
          +3 new insights
        </div>
      </div>

      {/*
        PROMPT CARD — emerald elements, violet ambient glow only.

        Positioning — stronger stagger
        ------------------------------
        We float the card past the wrapper's right edge on ≥sm via a
        negative right margin, so it *overhangs* the dashboard instead of
        merely right-aligning under it. That overhang is what sells the
        staggered composition — the eye reads the dashboard on the left
        line and the prompt card on a distinctly shifted right line.

        The wrapper component places the visual inside a grid cell that
        already has outer section padding, so a modest negative margin
        stays inside the viewport and doesn't clip against the gutter.

        Violet survives *only* as the soft section-level atmosphere behind
        the card — no violet touches any actual UI element.
      */}
      <div className="relative -mt-6 sm:-mt-10 ml-auto w-full max-w-[340px] pr-1 sm:pr-0 sm:-mr-6 md:-mr-10 lg:-mr-14">
        {/* Dotted emerald connector — implies continuity between the
            dashboard above and the follow-up conversation below. */}
        <svg
          aria-hidden
          className="absolute -top-6 right-8 h-8 w-8 pointer-events-none"
          viewBox="0 0 32 32"
        >
          <line
            x1="16"
            y1="0"
            x2="16"
            y2="32"
            stroke="rgba(110,231,183,0.5)"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          <circle cx="16" cy="4" r="1.5" fill="#6ee7b7" />
        </svg>

        {/*
          Previously this card had its own localised violet glow. We removed
          it because the section-level atmosphere (defined in the registry)
          now provides the environmental violet — three soft pools at the
          section edges, same discipline as Option A. Layering a second
          violet blob directly behind the card reintroduced the "spotlight"
          feeling we were trying to avoid.

          The card now sits on pure black with only its own emerald shadow,
          and the violet reads as ambient light of the overall environment
          rather than a halo attached to a single element.
        */}

        <div className="relative rounded-2xl border border-emerald-400/30 bg-black/70 backdrop-blur-xl p-3.5 shadow-[0_20px_50px_-20px_rgba(16,185,129,0.35)]">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-600 grid place-items-center text-[10px] font-bold text-black">
              M
            </div>
            <div className="text-[11px] text-white/55 font-medium">Ask Marli</div>
            <div className="ml-auto flex items-center gap-1 text-[9px] text-white/40">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </div>
          </div>

          <p className="text-[13px] text-white/90 font-medium leading-snug min-h-[2.5rem]">
            {typedPrompt}
            {isTyping && !reducedMotion && (
              <span className="inline-block w-[2px] h-3.5 ml-0.5 bg-emerald-300 align-middle animate-pulse" />
            )}
          </p>

          <div className="mt-2.5 flex flex-wrap gap-1">
            {['Stripe', 'Snowflake', 'HubSpot', 'NetSuite'].map((s) => (
              <span
                key={s}
                className="text-[9px] px-1.5 py-0.5 rounded-md border border-white/10 bg-white/5 text-white/55"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

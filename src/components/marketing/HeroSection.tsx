'use client';

/**
 * HeroSection — Option D (Combined · Emerald + Violet ambient)
 *
 * Above-the-fold landing hero. Composition:
 *   - LEFT   · `HeroCopyCombined`  → chip + headline + subtitle + command-bar waitlist
 *   - RIGHT  · `HeroVisualCombined` → generative dashboard with a staggered prompt card
 *
 * Everything foreground is on the site's emerald brand. Violet appears *only*
 * as an ambient section atmosphere (three soft radial pools at the edges of
 * the section) — same restraint as the earlier Option A exploration, so the
 * hero gets subtle two-tone depth without breaking brand unity.
 *
 * Mobile
 * ------
 * The `HeroVisualCombined` right-column is a dense, dashboard-style surface
 * that doesn't scale gracefully into a phone width — we hide it <md and let
 * the left copy column (which already ships its own waitlist surface) stand
 * on its own. No duplicate form needed: `HeroCopyCombined` always renders
 * the waitlist.
 *
 * Note on the atmosphere layer
 * ----------------------------
 * We render the violet ambient as an absolutely-positioned sibling *inside*
 * `<section>` rather than painting it onto the section itself. That keeps it
 * non-interactive (pointer-events-none) and lets it sit behind the z-indexed
 * hero content without leaking out of the section bounds.
 */

import { ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { HeroCopyCombined } from './hero-copy';

// The visual is dense (SVGs, animated ticks, typewriter) and only ever
// visible at ≥md. Lazy-loading it keeps the initial hero payload small and
// mobile devices never pay for the bytes.
const HeroVisualCombined = dynamic(
  () =>
    import('./hero-visuals/HeroVisualCombined').then((mod) => ({
      default: mod.HeroVisualCombined,
    })),
  {
    ssr: true,
    loading: () => (
      <div className="relative w-full h-80 sm:h-96 flex items-center justify-center opacity-60">
        {/* Skeleton matches the dashboard's emerald glow identity so the
            load-in feels on-brand rather than a generic grey placeholder. */}
        <div className="relative w-72 h-72 rounded-full bg-emerald-500/10 blur-2xl animate-pulse" />
      </div>
    ),
  }
);

/**
 * Section-level violet atmosphere — three soft pools at the edges of the
 * section (top-right, bottom-left, faint top-left). See
 * `hero-visuals/index.ts` for the design rationale; duplicating the tokens
 * here keeps `HeroSection` self-contained now that the review route is
 * collapsing into this single variant.
 */
const ATMOSPHERE_BACKGROUND = [
  'radial-gradient(ellipse 60% 55% at 90% 10%, rgba(139, 92, 246, 0.11), transparent 70%)',
  'radial-gradient(ellipse 55% 50% at 5% 95%, rgba(167, 139, 250, 0.1), transparent 70%)',
  'radial-gradient(ellipse 45% 40% at 15% 20%, rgba(139, 92, 246, 0.06), transparent 75%)',
].join(', ');

export function HeroSection() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  const scrollToStats = () => {
    document.getElementById('stats')?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      className={[
        // Vertical centering strategy
        // ---------------------------
        // The hero is sized to *slightly less* than the viewport (minus the
        // sticky nav's 3.5rem height) so the top of the next section (Stats)
        // always peeks above the fold — this gives users an explicit "there's
        // more below" signal at every screen size.
        //
        // The `- 5rem` pullback is tuned so the peek is visible on short
        // laptop viewports (~680px) without eating too much hero space on
        // tall displays. Using `svh` (small viewport height) avoids iOS
        // Safari's URL-bar overshoot.
        //
        // flex-column + `justify-center` keeps the grid vertically centered
        // within that shortened column; bottom padding still seats the
        // scroll-chip near the fold.
        'relative isolate flex flex-col justify-center min-h-[calc(100svh-3.5rem-5rem)]',
        'px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-10 sm:pb-12 overflow-hidden',
      ].join(' ')}
    >
      {/* Ambient violet field. Lives inside `<section>` so it's bounded
          (no bleed into the next section) and sits behind the z-10 content
          column below. `isolate` on the parent guarantees this layer can't
          stack above the rest of the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: ATMOSPHERE_BACKGROUND }}
      />

      <div className="relative w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* LEFT · copy column — includes its own waitlist form. */}
          <HeroCopyCombined />

          {/* RIGHT · visual column — desktop only. We *render* the lazy
              import here rather than a static skeleton so Next can kick off
              the chunk fetch as early as possible; the loading fallback
              above covers the interstitial.

              The copy column is taller than the visual, so the mockup was
              centering on the copy's midline and reading as floating high.
              `self-end` alone didn't shift it because the grid row wasn't
              actually taller than this column; we use `translate-y-*`
              instead to move the mockup down visually without touching
              layout flow or the copy column beside it. */}
          {!isMobile && (
            <div className="relative flex justify-center items-center min-h-[360px] md:min-h-[440px] translate-y-6 md:translate-y-10 lg:translate-y-12">
              <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
                <HeroVisualCombined />
              </div>
            </div>
          )}
        </div>

        {/*
          Fold-edge scroll affordance — sits just below the hero grid so it
          reads as "there's more below" without competing with the waitlist CTA.
          Uses the same glass-chip language as the hero (border + blur + emerald
          accent) and scrolls to `#stats` (first section after the hero).
        */}
        <div className="flex justify-center mt-10 sm:mt-12 md:mt-14">
          <button
            type="button"
            onClick={scrollToStats}
            className="group inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-3 py-2 text-white/55 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md transition-colors hover:border-emerald-400/35 hover:bg-emerald-500/[0.08] hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
            aria-label="Scroll to stats section"
          >
            <ChevronDown
              className={[
                // Slight downward offset so the glyph sits optically centered in the pill
                // (chevrons read top-heavy without it). Hover adds a little more travel.
                'size-5 shrink-0 translate-y-0.5 transition-transform duration-300 group-hover:translate-y-1',
                reducedMotion ? '' : 'motion-safe:animate-bounce',
              ].join(' ')}
              aria-hidden
            />
          </button>
        </div>
      </div>
    </section>
  );
}

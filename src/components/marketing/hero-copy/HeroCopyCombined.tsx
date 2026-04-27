'use client';

/**
 * HeroCopyCombined — Option D copy treatment (EMERALD elements, VIOLET ambient only)
 *
 * All foreground/content elements — chip, headline, subtitle highlight,
 * waitlist shell — now use the site's emerald brand. Violet is reserved
 * for *ambient atmosphere only* (the section-level radial glow defined in
 * the HERO_OPTIONS registry), so the page still has a two-tone feel
 * without any violet ink touching actual UI.
 *
 * Rationale
 * ---------
 * Earlier iterations put violet on the chip + subtitle highlight + prompt
 * card to mark "the ask". That read as cohesive with the staggered prompt
 * card but made the hero feel like two brands. Stripping violet from
 * elements reunifies the brand while keeping the violet *atmospheric*
 * tint behind the section for added depth.
 *
 *   - Chip: same Option-A chat-header shape (avatar + status text) but
 *     re-skinned in emerald — gradient M avatar, emerald text/border.
 *   - Headline: pure emerald gradient, unchanged from previous edit.
 *   - Subtitle: Option A's hand-drawn underline kept, but the "single
 *     conversation" span + underline are emerald now (matches the brand).
 *   - Waitlist shell: Option C's command-bar chrome, emerald-glowed.
 *
 * Copy text still sources from `content.ts` — only design changes.
 */

import { WaitlistForm } from '../WaitlistForm';
import { HERO_COPY } from './content';

export function HeroCopyCombined() {
  return (
    <div className="text-center md:text-left">
      {/*
        Chat-header chip (from Option A), re-skinned in emerald. The gradient
        "M" avatar on the left still ties 1:1 to the avatar inside the
        paired visual's prompt card — only the colour family changes.
      */}
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-500/10 pl-1 pr-3 py-1 mb-5">
        <span
          aria-hidden
          className="h-5 w-5 rounded-full bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-600 grid place-items-center text-[10px] font-bold text-black shadow-[0_0_14px_-2px_rgba(52,211,153,0.9)]"
        >
          M
        </span>
        <span className="text-xs font-medium text-emerald-200">{HERO_COPY.chip}</span>
      </div>

      {/*
        Headline — inverted colour hierarchy (per WorkOS-style reference)
        ----------------------------------------------------------------
        "Generative" and "Analytics" are now flat white — they set the
        subject matter but don't fight for attention. "Reimagined" is the
        payoff word, so it carries the colour: an emerald → violet gradient
        that both (a) spotlights the brand promise and (b) ties the ambient
        violet section atmosphere into the headline itself so the two-tone
        composition feels intentional rather than decorative.

        The emerald "active row" tick stays on the first line to anchor the
        composition's left edge, and the block cursor stays trailing the
        payoff word — but the cursor is retuned to violet to match the end
        of the gradient (visual continuity with the word it follows).
      */}
      {/*
        Type scale stepped down one notch (4xl→7xl vs 5xl→8xl) because
        "Data Intelligence," is longer than "Data Access," — the nowrap
        first line needs room in the hero grid's half-column without
        crowding the visual column. The h1 still reads as two strong bands:
        subject / payoff.
      */}
      <h1 className="relative text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight">
        <span
          aria-hidden
          className="hidden md:block absolute -left-4 top-3 h-[0.7em] w-[3px] rounded-sm bg-gradient-to-b from-emerald-300 via-emerald-400 to-transparent"
        />
        {/*
          "Data Intelligence," locked to one line via `whitespace-nowrap`.
          Without it the browser can break between the two word-spans when
          the grid column is tight.
        */}
        <span className="block whitespace-nowrap">
          <span className="text-white">{HERO_COPY.headline.top}</span>{' '}
          <span className="text-white">{HERO_COPY.headline.middle}</span>
        </span>
        {/*
          Payoff line — forced to its own visual row via `flex` (vs the
          previous inline-flex) so "Reimagined" never sits beside "Data
          Intelligence," even at wide breakpoints. Gradient runs emerald →
          violet left-to-right; `pb-2 -mb-2` gives descenders breathing
          room while `bg-clip-text` is active (prevents glyph clipping on
          some fonts).
        */}
        {/*
          Flex row for the payoff word + cursor. We respect the parent
          text-alignment via `justify-center md:justify-start` so "Reimagined"
          sits under the (centered) "Data Intelligence," line on mobile and
          flushes left again once the copy column goes left-aligned at ≥md.
          Without this the flex defaults to `justify-start` and the gradient
          word anchors to the left edge of the centered mobile column.
        */}
        <span className="relative flex items-baseline justify-center md:justify-start">
          <span className="bg-gradient-to-r from-emerald-300 via-emerald-200 to-violet-300 bg-clip-text text-transparent pb-2 -mb-2">
            {HERO_COPY.headline.bottom}
          </span>
          <span
            aria-hidden
            className="ml-2 inline-block h-[0.55em] w-[0.35em] bg-violet-300 animate-pulse shadow-[0_0_10px_rgba(196,181,253,0.8)]"
          />
        </span>
      </h1>

      {/*
        Subtitle — hook + supporting line, spatially separated
        ------------------------------------------------------
        Earlier iteration tried to mirror WorkOS by stacking action + benefit
        in one <p> with a <br />, but that collapsed into a two-line brick
        where the benefit clause out-massed the CTA hook.

        New structure treats the subtitle as two typographically distinct
        tiers so the eye can process them in sequence:

          Tier 1 (lead, larger)   — "Ask your data anything."
                                    The hook. Larger, white-forward, no
                                    underline (the size + weight already
                                    carries it; underline felt redundant).

          Tier 2 (support, muted) — "Get instant answers from revenue,
                                    pipeline, and billing. No dashboards,
                                    no SQL, no waiting."
                                    Smaller, lower contrast, sits below
                                    with margin so it clearly reads as
                                    supporting context rather than a
                                    continuation of the hook.

        We also broke the benefit into two sentences — the rhythmic "No
        dashboards, no SQL, no waiting." is a complete thought on its own
        and punches much harder as a fragment than as a trailing em-dash
        clause.
      */}
      <div className="mt-6 max-w-lg mx-auto md:mx-0 space-y-2">
        {/* Lead hook — the CTA phrase, given prominence by size + weight. */}
        <p className="text-lg md:text-xl text-white font-semibold leading-snug">
          {HERO_COPY.subheadlineAction}.
        </p>
        {/* Supporting context — smaller, muted, so it never competes. */}
        <p className="text-sm md:text-base text-white/55 leading-relaxed">
          {HERO_COPY.subheadlineBenefit}
        </p>
      </div>

      {/*
        Waitlist shell — borrowed from Option A. A single soft rounded bubble
        (no terminal chrome bar, no window dots, no LIVE indicator) so the
        actual form reads as the primary action without any decorative
        framing competing for attention. The faint emerald drop-shadow is the
        only on-brand flourish, keeping the container unmistakably tied to
        the section without adding visual noise.
      */}
      <div className="mt-8 mx-auto md:mx-0 max-w-lg">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-3 shadow-[0_20px_60px_-30px_rgba(16,185,129,0.45)]">
          <WaitlistForm variant="hero" helperText={HERO_COPY.waitlistHelper} />
        </div>
      </div>
    </div>
  );
}

/**
 * Shared copy strings for every hero-variant candidate.
 *
 * Each `HeroCopy*` component renders the same *words* but with a different
 * visual treatment — we centralise the text here so a wording change only
 * needs to happen in one place. This also makes it obvious to reviewers that
 * we're evaluating design, not copy.
 */

export const HERO_COPY = {
  chip: 'Meet Marli · Now in private beta',
  headline: {
    top: 'Data',
    middle: 'Intelligence,',
    bottom: 'Reimagined',
  },
  /**
   * Subtitle uses a two-part WorkOS-style CTA pattern:
   *   1. Action verb directed at the reader ("Ask your data anything").
   *   2. Concrete benefit + effort-level promise ("Get instant answers …
   *      no dashboards, no SQL, no waiting.")
   *
   * Preserves the original "single conversation" concept — "Ask your data"
   * *is* the single conversation — and chains into `waitlistHelper`'s
   * dashboard-sprawl thesis via "no dashboards".
   *
   * Kept as two separate fields so the hero copy component can style the
   * action phrase independently (e.g. underline highlight on just the
   * call-to-action, not the benefit clause).
   */
  subheadlineAction: 'Ask your data anything',
  /**
   * Two sentences, not one. The fragment "No dashboards, no SQL, no
   * waiting." lands harder as its own sentence — em-dash chaining muddied
   * the rhythm and made the subtitle read as one wall.
   */
  subheadlineBenefit:
    'Get instant answers from revenue, pipeline, and billing. No engineers, no SQL, no waiting.',
  waitlistHelper: 'Built for revenue, ops, and data teams tired of dashboard sprawl.',
} as const;

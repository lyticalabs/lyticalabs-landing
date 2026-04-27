'use client';

/**
 * HeroBackground
 *
 * Isolated client island that lazily loads the homepage hero's animated
 * decorations (emerald grid + glowing orbs). Both components use `window`
 * APIs during layout, so they're gated behind `ssr: false` dynamic imports
 * to avoid hydration mismatches.
 *
 * Rendering this as a dedicated island keeps the homepage server component
 * pure: the only "use client" bundle the home tree needs here is this thin
 * wrapper, not the whole page.
 */

import dynamic from 'next/dynamic';

const AnimatedGrid = dynamic(
  () => import('@/components/splash/AnimatedGrid').then((mod) => ({ default: mod.AnimatedGrid })),
  { ssr: false }
);

const GlowingOrbs = dynamic(
  () => import('@/components/splash/GlowingOrbs').then((mod) => ({ default: mod.GlowingOrbs })),
  { ssr: false }
);

export function HeroBackground() {
  // Fixed background — only covers the first viewport so lower sections don't
  // stack two grids/orb fields. Orbs sit above the grid but below content.
  // `h-svh` (small-viewport height) avoids the iOS Safari URL bar clipping
  // quirk where `100vh` overshoots the visible area.
  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 h-svh min-h-[100vh] pointer-events-none z-0"
    >
      <AnimatedGrid />
      <GlowingOrbs />
    </div>
  );
}

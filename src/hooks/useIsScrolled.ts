'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks whether the viewport has been scrolled past a threshold.
 * Used to drive scroll-aware UI chrome (e.g. shrinking sticky navs).
 *
 * @param threshold Pixel offset at which we consider the page "scrolled".
 *                  Defaults to 8px so a tiny nudge flips the flag.
 */
export function useIsScrolled(threshold = 8): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Read scroll position via rAF to avoid layout thrash on fast scrolls.
    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      setIsScrolled(window.scrollY > threshold);
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(update);
    };

    // Set initial state in case the page loads already scrolled (e.g. anchor).
    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [threshold]);

  return isScrolled;
}

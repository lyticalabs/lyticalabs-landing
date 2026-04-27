'use client';

/**
 * Subscribe to the user's `prefers-reduced-motion` system setting.
 *
 * Returns `true` when the viewer has requested reduced motion. Use this to
 * skip JS-driven animations (setInterval-based pulses, Framer variants,
 * etc.) that CSS-level `@media (prefers-reduced-motion)` can't reach.
 *
 * We default to `false` on the server so the first paint on every client
 * matches what React rendered — the effect then re-subscribes and flips
 * the flag if the user has the preference enabled. That tiny, one-tick
 * mismatch is far better than hydration drift.
 */

import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // `matchMedia` is always available in the browser; guarded for safety
    // in edge runtimes that run this during SSR.
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mql = window.matchMedia(QUERY);
    // Sync state on mount so the first reactive update matches the current
    // system preference, even if the page was loaded with it already on.
    setReduced(mql.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    // Safari < 14 uses the legacy addListener API; feature-detect for safety.
    if ('addEventListener' in mql) {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }
    (mql as MediaQueryList & { addListener: (cb: (e: MediaQueryListEvent) => void) => void }).addListener(onChange);
    return () => {
      (
        mql as MediaQueryList & { removeListener: (cb: (e: MediaQueryListEvent) => void) => void }
      ).removeListener(onChange);
    };
  }, []);

  return reduced;
}

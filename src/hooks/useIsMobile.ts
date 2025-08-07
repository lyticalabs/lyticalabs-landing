'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect if the user is on an actual mobile device (not just a small screen)
 * Uses user agent detection to differentiate between mobile devices and resized desktop browsers
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Guard against SSR
    if (typeof window === 'undefined') return;

    const checkIsMobile = () => {
      try {
        // Check for mobile user agents
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        const isMobileDevice = mobileRegex.test(navigator.userAgent);
        
        // Also check for touch capability as secondary indicator
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Consider it mobile if it's a mobile user agent OR has touch and small screen
        const isSmallScreen = window.innerWidth < 768;
        const actuallyMobile = isMobileDevice || (isTouchDevice && isSmallScreen);
        
        setIsMobile(actuallyMobile);
      } catch {
        // Fallback in case of any errors
        setIsMobile(false);
      }
    };

    // Check on mount
    checkIsMobile();

    // Optional: Check on resize (in case of orientation change on mobile)
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      // Guard against cleanup when window is not available
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkIsMobile);
      }
    };
  }, []);

  return isMobile;
}
import { useState, useEffect } from 'react';

/**
 * Hook to detect if user has scrolled past a certain threshold
 * @param threshold - The scroll position threshold in pixels (default: 100)
 * @returns boolean indicating if user has scrolled past the threshold
 */
export function useScrolled(threshold: number = 100): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > threshold);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isScrolled;
}
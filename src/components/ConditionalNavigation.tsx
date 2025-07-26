'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';

/**
 * Conditional navigation wrapper that excludes navigation from specific routes
 * Currently excludes: /splash
 */
export function ConditionalNavigation() {
  const pathname = usePathname();
  
  // Routes where navigation should be hidden
  const hideNavigationRoutes = ['/splash'];
  
  // Check if current route should hide navigation
  const shouldHideNavigation = hideNavigationRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Don't render navigation for excluded routes
  if (shouldHideNavigation) {
    return null;
  }
  
  // Render navigation for all other routes
  return <Navigation />;
} 
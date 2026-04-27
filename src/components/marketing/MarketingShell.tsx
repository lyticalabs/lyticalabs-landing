'use client';

/**
 * MarketingShell — layout wrapper with nav + footer.
 * Uses the simplified MarketingNav instead of AuthNav.
 */

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { useIsScrolled } from '@/hooks/useIsScrolled';

interface MarketingShellProps {
  children: ReactNode;
}

export function MarketingShell({ children }: MarketingShellProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isScrolled = useIsScrolled(80);

  return (
    <>
      <MarketingNav
        showPageLinks={isHome}
        hideUntilScrolled={isHome}
        position={isHome ? 'sticky' : 'fixed'}
        isScrolled={isScrolled}
      />
      {children}
      <SiteFooter />
    </>
  );
}

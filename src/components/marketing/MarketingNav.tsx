'use client';

/**
 * MarketingNav — simplified from the monorepo AuthNav.
 *
 * No auth state, no WorkOS, no AccountDropdown. The "Login" button
 * is a plain link to alpha.lyticalabs.ai/sign-in.
 */

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const APP_URL = 'https://alpha.lyticalabs.ai';

const PAGE_LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#integrations', label: 'Integrations' },
  { href: '/#use-cases', label: 'Use Cases' },
] as const;

interface MarketingNavProps {
  showPageLinks?: boolean;
  isScrolled?: boolean;
  hideUntilScrolled?: boolean;
  position?: 'fixed' | 'sticky';
}

export function MarketingNav({
  showPageLinks = true,
  isScrolled = false,
  hideUntilScrolled = false,
  position = 'fixed',
}: MarketingNavProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll + ESC handler while mobile drawer is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [isMobileMenuOpen]);

  const showChrome = !hideUntilScrolled || isScrolled;
  const positionClass = position === 'sticky' ? 'sticky top-0' : 'fixed top-0 left-0 right-0';

  return (
    <nav
      aria-label="Primary"
      className={cn(
        positionClass,
        'z-50 border-b px-4 sm:px-6 lg:px-8 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out',
        showChrome
          ? isScrolled
            ? 'bg-black/85 border-white/10 backdrop-blur-xl'
            : 'bg-black/60 border-white/5 backdrop-blur-xl'
          : 'bg-transparent border-transparent backdrop-blur-0'
      )}
    >
      <div
        className={cn(
          'max-w-7xl mx-auto flex items-center justify-between transition-[height] duration-200',
          isScrolled ? 'h-12' : 'h-14'
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Lytica Labs — go to homepage"
          aria-current={pathname === '/' ? 'page' : undefined}
          className="flex items-center gap-1 shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
        >
          <img src="/assets/lytica-icon.svg" alt="" className="h-5 w-auto shrink-0" aria-hidden="true" />
          <span className="text-base sm:text-lg font-semibold">
            <span className="text-white font-bold">Lytica</span>
            <span className="text-white/70 font-normal">Labs</span>
          </span>
        </Link>

        {/* Page links — desktop only */}
        {showPageLinks && (
          <div className="hidden md:flex items-center gap-7">
            {PAGE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors focus-visible:text-white focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Right side — Contact + Login */}
        <div className="flex items-center gap-2">
          {/* Contact — desktop only */}
          <a
            href={`${APP_URL}/contact`}
            className={cn(
              'hidden sm:inline-flex items-center justify-center rounded-md text-xs h-8 px-3',
              'border border-emerald-500/40 text-emerald-400 bg-transparent hover:bg-emerald-500/10 transition-colors'
            )}
          >
            Contact
          </a>

          {/* Login — always visible */}
          <a
            href={`${APP_URL}/sign-in`}
            className={cn(
              'inline-flex items-center justify-center rounded-md text-xs h-8 px-3',
              'border border-white/20 text-white bg-transparent hover:bg-white/10 transition-colors'
            )}
          >
            Login
          </a>

          {/* Hamburger — mobile only */}
          {showPageLinks && (
            <button
              type="button"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="marketing-mobile-menu"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] text-white/80 transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <title>{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</title>
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {showPageLinks && isMobileMenuOpen && (
        <div
          id="marketing-mobile-menu"
          className="md:hidden absolute inset-x-0 top-full bg-black/95 border-b border-white/10 backdrop-blur-xl"
        >
          <ul className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {PAGE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-3 text-base text-white/85 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:bg-white/[0.06]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-white/5">
              <a
                href={`${APP_URL}/contact`}
                className="block rounded-md px-3 py-3 text-base text-emerald-400 hover:bg-emerald-500/10"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

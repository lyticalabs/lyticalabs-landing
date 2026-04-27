'use client';

/**
 * LegalPageLayout — shared wrapper for privacy, terms, cookie-policy pages.
 * Provides a consistent dark background with animated grid/orbs and
 * the marketing nav/footer.
 */

import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { MarketingChromeProvider } from '@/components/marketing/MarketingChromeProvider';
import { MarketingShell } from '@/components/marketing/MarketingShell';

const AnimatedGrid = dynamic(
  () => import('@/components/splash/AnimatedGrid').then((mod) => ({ default: mod.AnimatedGrid })),
  { ssr: false }
);
const GlowingOrbs = dynamic(
  () => import('@/components/splash/GlowingOrbs').then((mod) => ({ default: mod.GlowingOrbs })),
  { ssr: false }
);

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <MarketingChromeProvider>
      <MarketingShell>
        <main className="relative min-h-screen bg-black text-white overflow-x-hidden w-full">
          {/* Background Effects */}
          <div className="fixed inset-0 w-full h-full pointer-events-none">
            <AnimatedGrid />
            <GlowingOrbs />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col min-h-screen w-full max-w-full">
            <section className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 pt-24 pb-8">
              <div className="max-w-4xl mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-200 via-white to-emerald-200 bg-clip-text text-transparent">
                    {title}
                  </h1>
                  <p className="text-zinc-400 text-lg">Last updated {lastUpdated}</p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                  <div className="space-y-8">{children}</div>
                </div>

                {/* Back to Home */}
                <div className="mt-12 text-center">
                  <Link
                    href="/"
                    className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25"
                  >
                    ← Back to Home
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </main>
      </MarketingShell>
    </MarketingChromeProvider>
  );
}

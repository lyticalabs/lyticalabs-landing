/**
 * SiteFooter — adapted from the monorepo version.
 * Uses local cn utility. External pages link to alpha.lyticalabs.ai.
 */

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FooterLink {
  label: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

interface FooterColumn {
  heading: string;
  links: ReadonlyArray<FooterLink>;
}

const COLUMNS: ReadonlyArray<FooterColumn> = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Integrations', href: '/#integrations' },
      { label: 'Use cases', href: '/#use-cases' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#', disabled: true },
      { label: 'Careers', href: 'https://alpha.lyticalabs.ai/careers', external: true },
      { label: 'Contact', href: 'https://alpha.lyticalabs.ai/contact', external: true },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Support', href: 'https://alpha.lyticalabs.ai/support', external: true },
    ],
  },
] as const;

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.disabled) {
    return (
      <span
        aria-disabled="true"
        title="Coming soon"
        className="inline-flex items-center gap-2 text-sm text-white/35 cursor-not-allowed select-none"
      >
        {link.label}
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/40">
          Soon
        </span>
      </span>
    );
  }

  if (link.external) {
    return (
      <a
        href={link.href}
        className={cn(
          'text-sm text-white/70 hover:text-emerald-300 transition-colors',
          'focus-visible:text-emerald-300 focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4'
        )}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className={cn(
        'text-sm text-white/70 hover:text-emerald-300 transition-colors',
        'focus-visible:text-emerald-300 focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4'
      )}
    >
      {link.label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-16 overflow-hidden bg-black/60 border-t border-white/10 px-4 sm:px-6 lg:px-8 pt-16 pb-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_55%)]"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1.5 mb-3">
              <img src="/assets/lytica-icon.svg" alt="Lytica" className="h-5 w-auto" />
              <span className="text-lg font-semibold">
                <span className="text-white font-bold">Lytica</span>
                <span className="text-white/70 font-normal">Labs</span>
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Generative analytics that turn your data stack into a conversation.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-4" />
          <p className="text-xs bg-gradient-to-r from-emerald-200 via-white to-emerald-200 bg-clip-text text-transparent">
            Copyright © 2026 <span className="font-semibold">Lytica Inc.</span> All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

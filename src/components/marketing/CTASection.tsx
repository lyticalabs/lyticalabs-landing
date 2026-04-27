/**
 * CTASection — adapted from the monorepo.
 * Links to alpha.lyticalabs.ai/contact instead of local /contact.
 */

import { WaitlistForm } from './WaitlistForm';

export function CTASection() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] via-white/[0.02] to-transparent p-8 sm:p-12 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_60%)]"
          />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Stop running the same report
              <br />
              every day.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Join the waitlist and we'll reach out when your seat is ready. Want to talk first?
              We're happy to do a working-session demo.
            </p>

            <div className="mt-8 mx-auto flex justify-center">
              <WaitlistForm variant="cta" />
            </div>

            <div className="mt-4 text-sm text-white/50">
              Or{' '}
              <a
                href="https://alpha.lyticalabs.ai/contact"
                className="text-emerald-400 hover:text-emerald-300 underline-offset-4 hover:underline transition-colors"
              >
                book a demo with our team
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

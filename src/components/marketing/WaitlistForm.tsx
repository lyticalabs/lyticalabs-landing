'use client';

/**
 * WaitlistForm — adapted from the monorepo version.
 * Uses local Button, cn, and hooks instead of @workspace/* imports.
 */

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useId, useState } from 'react';
import { useMarketingChrome } from '@/components/marketing/MarketingChromeProvider';
import { useWaitlistSubmit } from '@/hooks/useWaitlistSubmit';

type WaitlistFormVariant = 'hero' | 'cta' | 'stacked';

interface WaitlistFormProps {
  variant?: WaitlistFormVariant;
  helperText?: string;
  className?: string;
}

const inputClass =
  'px-4 h-11 bg-white/5 border border-white/15 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-white placeholder-white/40 text-sm';

const buttonClass =
  'bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/40 text-white font-semibold px-6 rounded-lg transition-colors shadow-lg shadow-emerald-500/20 h-11 text-sm whitespace-nowrap';

const heroButtonClass =
  'bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/40 text-white font-semibold px-7 rounded-lg transition-colors h-11 text-sm whitespace-nowrap';

export function WaitlistForm({ variant = 'hero', helperText, className }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const { isSubmitting, submit } = useWaitlistSubmit();
  const { openWaitlistSuccess, openWaitlistError } = useMarketingChrome();
  const descId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    const result = await submit(email);
    if (result.status === 'success') {
      setEmail('');
      openWaitlistSuccess(result.message);
    } else {
      openWaitlistError(result.message);
    }
  };

  const isStacked = variant === 'stacked';
  const isHero = variant === 'hero';
  const alignHelper = isHero ? 'text-center md:text-left' : 'text-center';
  const activeButtonClass = isHero ? heroButtonClass : buttonClass;

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('w-full max-w-lg space-y-3', className)}
      aria-label="Join the Lytica Labs waitlist"
    >
      <div className={cn('gap-3', isStacked ? 'flex flex-col' : 'flex flex-col sm:flex-row')}>
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Enter your work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={helperText ? descId : undefined}
          className={cn(
            inputClass,
            isStacked ? 'w-full' : 'w-full sm:flex-1 sm:w-auto'
          )}
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            activeButtonClass,
            isStacked ? 'w-full' : 'w-full sm:w-auto'
          )}
        >
          {isSubmitting ? 'Joining…' : 'Join Waitlist'}
        </Button>
      </div>
      {helperText && (
        <p id={descId} className={cn('text-xs text-white/50', alignHelper)}>
          {helperText}
        </p>
      )}
    </form>
  );
}

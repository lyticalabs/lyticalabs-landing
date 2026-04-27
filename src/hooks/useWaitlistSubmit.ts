'use client';

/**
 * Client hook for waitlist submissions.
 *
 * Simplified for the standalone landing page — POSTs directly to the Railway
 * n8n webhook from the browser. The monorepo version uses a server action
 * with Resend emails and Convex persistence; this version keeps things
 * lightweight for the marketing-only deployment.
 */

import { useCallback, useState } from 'react';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const WEBHOOK_URL =
  'https://primary-production-b7da.up.railway.app/webhook/join-waitlist';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WaitlistResult =
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

interface UseWaitlistSubmitReturn {
  isSubmitting: boolean;
  lastResult: WaitlistResult | null;
  submit: (email: string) => Promise<WaitlistResult>;
  reset: () => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useWaitlistSubmit(): UseWaitlistSubmitReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastResult, setLastResult] = useState<WaitlistResult | null>(null);

  const submit = useCallback(async (email: string): Promise<WaitlistResult> => {
    setIsSubmitting(true);
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          timestamp: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(10_000),
      });

      if (response.ok) {
        const result: WaitlistResult = {
          status: 'success',
          message: "You're on the list — we'll be in touch soon.",
        };
        setLastResult(result);
        return result;
      }

      if (response.status === 409) {
        const result: WaitlistResult = {
          status: 'error',
          message: 'You are already on the waitlist',
        };
        setLastResult(result);
        return result;
      }

      const result: WaitlistResult = {
        status: 'error',
        message: 'Something went wrong on our end. Please try again in a moment.',
      };
      setLastResult(result);
      return result;
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      const result: WaitlistResult = {
        status: 'error',
        message: 'Network error. Please check your connection and try again.',
      };
      setLastResult(result);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const reset = useCallback(() => setLastResult(null), []);

  return { isSubmitting, lastResult, submit, reset };
}

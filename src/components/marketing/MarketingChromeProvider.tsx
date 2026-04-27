'use client';

/**
 * MarketingChromeProvider — adapted from the monorepo version.
 * Manages waitlist success/error modals globally.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { WaitlistErrorModal } from '@/components/splash/WaitlistErrorModal';
import { WaitlistSuccessModal } from '@/components/splash/WaitlistSuccessModal';

interface MarketingChromeContextValue {
  openWaitlistSuccess: (message: string) => void;
  openWaitlistError: (message: string) => void;
}

const MarketingChromeContext = createContext<MarketingChromeContextValue | null>(null);

export function MarketingChromeProvider({ children }: { children: ReactNode }) {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const openWaitlistSuccess = useCallback((message: string) => {
    setSuccessMessage(message);
    setIsSuccessOpen(true);
  }, []);
  const openWaitlistError = useCallback((message: string) => {
    setErrorMessage(message);
    setIsErrorOpen(true);
  }, []);

  const value = useMemo<MarketingChromeContextValue>(
    () => ({ openWaitlistSuccess, openWaitlistError }),
    [openWaitlistSuccess, openWaitlistError]
  );

  return (
    <MarketingChromeContext.Provider value={value}>
      {children}

      <WaitlistSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        message={successMessage}
      />
      <WaitlistErrorModal
        isOpen={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        errorMessage={errorMessage}
      />
    </MarketingChromeContext.Provider>
  );
}

export function useMarketingChrome(): MarketingChromeContextValue {
  const ctx = useContext(MarketingChromeContext);
  if (!ctx) {
    throw new Error('useMarketingChrome must be used inside <MarketingChromeProvider>');
  }
  return ctx;
}

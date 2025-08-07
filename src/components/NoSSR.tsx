'use client';

import { useEffect, useState } from 'react';

/**
 * A wrapper component that only renders its children on the client side.
 * This prevents hydration mismatches caused by browser extensions or other client-only differences.
 */
interface NoSSRProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function NoSSR({ children, fallback = null }: NoSSRProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
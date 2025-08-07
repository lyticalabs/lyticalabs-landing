'use client';

import { useEffect, useState, useRef } from 'react';

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
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      setHasMounted(true);
    }
    
    return () => {
      mountedRef.current = false;
    };
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
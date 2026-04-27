'use client';

/**
 * Splash-style modal built on Radix Dialog primitives.
 * Adapted from the monorepo version — uses local dialog import.
 */

import { DialogPrimitive } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  label?: string;
}

export function Modal({ isOpen, onClose, children, className, label = 'Dialog' }: ModalProps) {
  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
          )}
        />
        <DialogPrimitive.Content
          aria-label={label}
          className={cn(
            'fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6',
            'outline-none',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
          )}
        >
          <DialogPrimitive.Title className="sr-only">{label}</DialogPrimitive.Title>

          <div className="relative w-full max-h-full">
            <div
              className={cn(
                'relative mx-auto my-4 w-full max-w-sm overflow-hidden rounded-2xl border border-emerald-400/15 bg-zinc-950/95 p-4 shadow-2xl shadow-emerald-950/40 ring-1 ring-emerald-400/20 backdrop-blur-md sm:my-0 sm:p-6',
                className
              )}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-emerald-500/10 via-emerald-500/[0.03] to-transparent"
              />
              <div className="relative">{children}</div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

import { Modal } from '@/components/splash/Modal';

interface WaitlistErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage?: string;
}

/**
 * Error modal shown when waitlist submission fails.
 *
 * Two visual modes:
 *   - duplicate email (soft, emerald-tinted "you're all set" state)
 *   - genuine failure (red warning state with retry)
 *
 * We intentionally avoid the blue palette here — the product is emerald-only.
 * The duplicate-email path now uses emerald for the positive "already in"
 * confirmation, which reads as a success rather than a blue "info" callout.
 */
export function WaitlistErrorModal({ isOpen, onClose, errorMessage }: WaitlistErrorModalProps) {
  const isDuplicateError = errorMessage?.includes('already on the waitlist');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center space-y-4">
        {/* Status icon — emerald info bubble for duplicate, red warning for errors */}
        <div
          className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
            isDuplicateError ? 'bg-emerald-500/20' : 'bg-red-500/20'
          }`}
        >
          {isDuplicateError ? (
            <svg
              className="w-6 h-6 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          )}
        </div>

        <h3
          className={`text-xl sm:text-2xl font-bold ${
            isDuplicateError ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          {isDuplicateError ? "You're all set!" : 'Something went wrong'}
        </h3>

        <p className="text-white/70 leading-relaxed text-sm sm:text-base">
          {errorMessage ||
            "We couldn't add you to the waitlist right now. Please try again in a moment."}
        </p>

        {/* Secondary context shown only in the duplicate path */}
        {isDuplicateError && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-emerald-100/90">
            <p>
              We&apos;ll keep you updated on our progress and reach out when we&apos;re ready to
              launch!
            </p>
          </div>
        )}

        {/* Action buttons diverge: "Got it!" for duplicate vs. Retry/Close pair */}
        {isDuplicateError ? (
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-lg transition-colors shadow-lg shadow-emerald-500/25 text-sm sm:text-base"
          >
            Got it!
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-lg transition-colors shadow-lg shadow-emerald-500/25 text-sm sm:text-base"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-lg transition-colors text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

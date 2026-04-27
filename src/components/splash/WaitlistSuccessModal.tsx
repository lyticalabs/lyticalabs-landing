import { Modal } from '@/components/splash/Modal';

interface WaitlistSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

/**
 * Success modal shown after waitlist submission
 * Displays confirmation message matching the splash page design
 */
export function WaitlistSuccessModal({ isOpen, onClose, message }: WaitlistSuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center space-y-4">
        {/* Success Icon */}
        <div className="mx-auto w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-emerald-400">Welcome to the Waitlist!</h3>

        {/*
          Success Message — zinc (true neutral) instead of gray (blue-tinted)
          so copy reads as on-brand against the emerald + charcoal surface.
        */}
        <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
          {message ||
            "Thank you for joining our waitlist! We'll keep you updated on our progress and reach out when we're ready to launch."}
        </p>

        {/* Additional Info */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-emerald-200">
          <p>You&apos;ll be among the first to experience next-generation analytics</p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-black font-semibold py-2.5 sm:py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25 text-sm sm:text-base"
        >
          Got it!
        </button>
      </div>
    </Modal>
  );
}

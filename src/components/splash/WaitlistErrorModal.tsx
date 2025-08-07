import { Modal } from "@/components/ui/modal"

interface WaitlistErrorModalProps {
  isOpen: boolean
  onClose: () => void
  errorMessage?: string
}

/**
 * Error modal shown when waitlist submission fails
 * Provides user-friendly error feedback with specific handling for different error types
 */
export function WaitlistErrorModal({ isOpen, onClose, errorMessage }: WaitlistErrorModalProps) {
  // Check if this is a duplicate email error
  const isDuplicateError = errorMessage?.includes('already on the waitlist');
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center space-y-4">
        {/* Icon - Info for duplicate, Warning for errors */}
        <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
          isDuplicateError ? 'bg-blue-500/20' : 'bg-red-500/20'
        }`}>
          {isDuplicateError ? (
            <svg 
              className="w-6 h-6 text-blue-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
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
        
        {/* Title - Different for duplicate vs error */}
        <h3 className={`text-xl sm:text-2xl font-bold ${
          isDuplicateError ? 'text-blue-400' : 'text-red-400'
        }`}>
          {isDuplicateError ? "You're all set!" : "Something went wrong"}
        </h3>
        
        {/* Error Message */}
        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
          {errorMessage || "We couldn't add you to the waitlist right now. Please try again in a moment."}
        </p>
        
        {/* Additional message for duplicate emails */}
        {isDuplicateError && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-blue-200">
            <p>✅ We&apos;ll keep you updated on our progress and reach out when we&apos;re ready to launch!</p>
          </div>
        )}
        
        {/* Action Buttons - Different for duplicate vs error */}
        {isDuplicateError ? (
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 text-sm sm:text-base"
          >
            Got it!
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-black font-semibold py-2.5 sm:py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25 text-sm sm:text-base"
            >
              Try Again
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600/50 hover:bg-gray-600/70 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-lg transition-all duration-300 text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}
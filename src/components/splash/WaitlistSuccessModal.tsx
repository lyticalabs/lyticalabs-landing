import { Modal } from "@/components/ui/modal"

interface WaitlistSuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Success modal shown after waitlist submission
 * Displays confirmation message matching the splash page design
 */
export function WaitlistSuccessModal({ isOpen, onClose }: WaitlistSuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center space-y-4">
        {/* Success Title */}
        <h3 className="text-2xl font-bold text-green-400">
          Success
        </h3>
        
        {/* Success Message */}
        <p className="text-gray-300 leading-relaxed">
          Thank you for joining our waitlist, a member of our sales team will reach out!
        </p>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
        >
          Close
        </button>
      </div>
    </Modal>
  )
}
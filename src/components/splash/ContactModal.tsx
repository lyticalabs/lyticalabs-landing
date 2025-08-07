'use client';

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
// No longer using external API utility - direct fetch calls instead

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    workEmail: '',
    firstName: '',
    lastName: '',
    companyName: '',
    companySize: '',
    country: '',
    message: 'How can we help?'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleMessageFocus = () => {
    if (formData.message === 'How can we help?') {
      setFormData(prev => ({
        ...prev,
        message: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    setError(null)

    try {
      // Send data directly to contact API with proper field mapping
      const contactData = {
        workEmail: formData.workEmail,
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        companySize: formData.companySize,
        country: formData.country,
        message: formData.message
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSuccess(true)
        setFormData({
          workEmail: '',
          firstName: '',
          lastName: '',
          companyName: '',
          companySize: '',
          country: '',
          message: 'How can we help?'
        })
      } else {
        setError(data.error || 'Failed to send message. Please try again.')
        console.error('Failed to send contact form:', data.error || 'Unknown error')
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Error sending contact form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsSuccess(false)
    setError(null)
    onClose()
  }

  if (isSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="text-center space-y-3 sm:space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-green-400">Message Sent!</h3>
          <p className="text-gray-300 text-sm sm:text-base">
            Thank you for your interest. Our sales team will get back to you shortly.
          </p>
          <button
            onClick={handleClose}
            className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-black font-semibold py-2.5 sm:py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25 text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-sm sm:max-w-md">
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-white text-center">Contact Us</h3>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="workEmail" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
              Work Email *
            </label>
            <input
              type="email"
              id="workEmail"
              name="workEmail"
              value={formData.workEmail}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-white placeholder-gray-400 text-sm sm:text-base"
              placeholder="john@company.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-white placeholder-gray-400 text-sm sm:text-base"
                placeholder="John"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-white placeholder-gray-400 text-sm sm:text-base"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
              Company Name *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-white placeholder-gray-400 text-sm sm:text-base"
              placeholder="Acme Corp"
            />
          </div>

          <div>
            <label htmlFor="companySize" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
              Company Size *
            </label>
            <select
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 pr-4 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-white h-10 text-sm sm:text-base"
            >
              <option value="">Select company size</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="200+">200+</option>
            </select>
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
              Country *
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-white placeholder-gray-400 text-sm sm:text-base"
              placeholder="United States"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              onFocus={handleMessageFocus}
              required
              rows={3}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-white placeholder-gray-400 resize-none text-sm sm:text-base"
            />
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-400/20 rounded-lg p-3 text-red-400 text-sm sm:text-base">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 disabled:from-gray-500 disabled:to-gray-400 text-black font-semibold py-2.5 sm:py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg shadow-green-500/25 text-sm sm:text-base"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </Modal>
  )
}
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { WaitlistSuccessModal } from '@/components/splash/WaitlistSuccessModal';
import { WaitlistErrorModal } from '@/components/splash/WaitlistErrorModal';
import { useIsMobile } from '@/hooks/useIsMobile';

// Dynamic imports to prevent hydration issues
const DataVisualization = dynamic(() => import('@/components/splash/DataVisualization').then(mod => ({ default: mod.DataVisualization })), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] md:h-[350px] bg-gray-800/30 rounded-lg flex items-center justify-center">
      <div className="text-gray-400">Loading visualization...</div>
    </div>
  )
});

const GlowingOrbs = dynamic(() => import('@/components/splash/GlowingOrbs').then(mod => ({ default: mod.GlowingOrbs })), { ssr: false });
const AnimatedGrid = dynamic(() => import('@/components/splash/AnimatedGrid').then(mod => ({ default: mod.AnimatedGrid })), { ssr: false });
const SplashHeader = dynamic(() => import('@/components/splash/SplashHeader').then(mod => ({ default: mod.SplashHeader })), { 
  ssr: false,
  loading: () => (
    <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-20 flex items-center justify-between">
      <div className="h-6 sm:h-7 w-28 bg-gray-800/50 rounded animate-pulse"></div>
      <div className="flex gap-2 sm:gap-3">
        <div className="h-8 sm:h-10 w-16 sm:w-24 bg-gray-800/50 rounded animate-pulse"></div>
        <div className="h-8 sm:h-10 w-14 bg-gray-800/50 rounded animate-pulse"></div>
      </div>
    </div>
  )
});

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isMobile = useIsMobile();

  /**
   * Handle waitlist form submission
   * Submits to internal API route which forwards to Railway webhook
   * Shows specific messages for success, failure, and duplicate email scenarios
   */
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success - show success modal with message from API
        setSuccessMessage(data.message || 'Successfully joined the waitlist!');
        setIsSuccessModalOpen(true);
        setEmail(''); // Clear email input
      } else {
        // API returned error - handle specific error types
        let errorMsg = data.error || 'Failed to join waitlist. Please try again.';
        
        // Handle specific error scenarios
        if (data.errorType === 'duplicate' || response.status === 409) {
          errorMsg = 'You are already on the waitlist';
        } else if (response.status >= 500) {
          errorMsg = 'Join Waitlist Failure, Please try again';
        }
        
        setErrorMessage(errorMsg);
        setIsErrorModalOpen(true);
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      setErrorMessage('Network error. Please check your connection and try again.');
      setIsErrorModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white relative overflow-x-hidden w-full">
      {/* Background Effects */}
      <div className="fixed inset-0 w-full h-full">
        <AnimatedGrid />
        <GlowingOrbs />
      </div>

      {/* Header with Logo and Buttons */}
      <SplashHeader />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
        {/* Content Section */}
        <section className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:py-16 md:py-20 md:justify-center">
        <div className="flex-1 flex flex-col justify-between md:justify-center">
          {/* Hero Title Section - Mobile: Top, Desktop: Centered */}
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              
              {/* Left Side - Hero Text */}
              <div className="text-center md:text-left mt-5">
                <div className="space-y-3 md:space-y-4">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-white via-green-100 to-green-400 bg-clip-text text-transparent">
                      Generative
                    </span>
                    <br />
                    <span className="text-white">Analytics</span>
                    <br />
                    <span className="text-gray-400">Reimagined</span>
                  </h1>

                  <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-none md:max-w-lg lg:max-w-2xl mx-auto md:mx-0">
                    Transform your data into actionable insights with AI-powered analytics. 
                    Experience the future of data intelligence today.
                  </p>
                </div>

                {/* Desktop Form - Shown when not on mobile device */}
                {!isMobile && (
                  <div className="w-full max-w-lg mx-auto md:mx-0 mt-8">
                    <form onSubmit={handleWaitlistSubmit} className="space-y-4 w-full">
                      <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-white placeholder-gray-400 h-12 text-base"
                          required
                        />
                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 disabled:from-gray-500 disabled:to-gray-400 text-black font-semibold px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg shadow-green-500/25 h-12 text-base whitespace-nowrap"
                        >
                          {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                        </Button>
                      </div>
                      <p className="text-sm text-center md:text-left">
                        <span className="inline-block bg-gradient-to-r from-gray-500 via-gray-500 to-gray-500 bg-clip-text text-transparent animate-shine-text">
                          Be the first to experience next-generation analytics
                        </span>
                      </p>
                    </form>

                    {/* Desktop Stats Section - Under the form for large screens only */}
                    <div className="mt-8 hidden xl:block">
                      <div className="bg-gray-900/30 backdrop-blur-sm border border-green-400/20 rounded-lg p-4 md:p-6">
                        <div className="grid grid-cols-3 gap-4 md:gap-6">
                          <div className="text-center">
                            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-400">10x</div>
                            <div className="text-xs md:text-sm text-gray-400">Faster Insights</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-400">12+</div>
                            <div className="text-xs md:text-sm text-gray-400">Data Sources</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-400">70%</div>
                            <div className="text-xs md:text-sm text-gray-400">Less Input Time</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side - Data Visualization */}
              {!isMobile && (
                <div className="relative flex justify-center items-center min-h-[300px] md:min-h-[350px] py-8">
                  <div className="w-full max-w-md md:max-w-lg scale-75 sm:scale-90 md:scale-100 overflow-hidden">
                    <DataVisualization />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Form Section - Positioned at bottom on mobile */}
          {isMobile && (
            <div className="max-w-lg mx-auto w-full">
            <form onSubmit={handleWaitlistSubmit} className="space-y-4 w-full">
              <div className="flex flex-col gap-4 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-white placeholder-gray-400 h-12 text-base"
                  required
                />
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 disabled:from-gray-500 disabled:to-gray-400 text-black font-semibold px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg shadow-green-500/25 h-12 text-base"
                >
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </Button>
              </div>
              <p className="text-sm text-center">
                <span className="inline-block bg-gradient-to-r from-gray-500 via-gray-500 to-gray-500 bg-clip-text text-transparent animate-shine-text">
                  Be the first to experience next-generation analytics
                </span>
              </p>
            </form>

            {/* Mobile Stats Section */}
            <div className="mt-8">
              <div className="bg-gray-900/30 backdrop-blur-sm border border-green-400/20 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-400">10x</div>
                    <div className="text-xs text-gray-400">Faster Insights</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-400">12+</div>
                    <div className="text-xs text-gray-400">Data Sources</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-400">70%</div>
                    <div className="text-xs text-gray-400">Less Input Time</div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}

          {/* iPad Stats Section - Shows at bottom for iPad sizes only */}
          {!isMobile && (
            <div className="max-w-7xl mx-auto w-full mt-8 xl:hidden">
              <div className="max-w-lg mx-auto">
                <div className="bg-gray-900/30 backdrop-blur-sm border border-green-400/20 rounded-lg p-4 md:p-6">
                  <div className="grid grid-cols-3 gap-4 md:gap-6">
                    <div className="text-center">
                      <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-400">10x</div>
                      <div className="text-xs md:text-sm text-gray-400">Faster Insights</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-400">12+</div>
                      <div className="text-xs md:text-sm text-gray-400">Data Sources</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-400">70%</div>
                      <div className="text-xs md:text-sm text-gray-400">Less Input Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
        </section>

        {/* Copyright Footer - Fixed at bottom */}
        <footer className="relative z-10 pb-6 pt-0 -mt-7.5">
          <div className="text-center space-y-3 px-4 sm:px-6 lg:px-8">
            {/* Horizontal Line */}
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
            
            <p className="text-sm bg-gradient-to-r from-green-200 via-white to-green-200 bg-clip-text text-transparent">
              Copyright © 2025 <span className="font-bold">Lytica Inc.</span> All Rights Reserved.
              <span className="mx-2">•</span>
              <a href="/privacy" className="hover:text-green-300 transition-colors duration-200">Privacy Policy</a>
              <span className="mx-2">•</span>
              <a href="/terms-of-service" className="hover:text-green-300 transition-colors duration-200">Terms of Service</a>
            </p>
          </div>
        </footer>
      </div>
      
      {/* Success Modal */}
      <WaitlistSuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)}
        message={successMessage}
      />
      
      {/* Error Modal */}
      <WaitlistErrorModal 
        isOpen={isErrorModalOpen} 
        onClose={() => setIsErrorModalOpen(false)}
        errorMessage={errorMessage}
      />
    </main>
  );
}
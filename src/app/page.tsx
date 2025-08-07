'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DataVisualization } from '@/components/splash/DataVisualization';
import { GlowingOrbs } from '@/components/splash/GlowingOrbs';
import { AnimatedGrid } from '@/components/splash/AnimatedGrid';
import { SplashHeader } from '@/components/splash/SplashHeader';
import { WaitlistSuccessModal } from '@/components/splash/WaitlistSuccessModal';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration issues by ensuring client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Submit to Google Sheets
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Show success modal
        setIsModalOpen(true);
        // Clear email input
        setEmail('');
      } else {
        console.error('Failed to submit to waitlist');
        // Fallback: still show modal for user experience
        setIsModalOpen(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      // Fallback: still show modal for user experience
      setIsModalOpen(true);
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-x-hidden">
      {/* Continuous background for scrolling */}
      <div className="absolute inset-0 w-full min-h-full bg-gray-950" style={{ height: '200vh' }}></div>
      
      {/* Background Effects - Only render after hydration, extends full height */}
      {isClient && (
        <div className="absolute inset-0 w-full" style={{ height: '200vh' }}>
          <AnimatedGrid />
          <GlowingOrbs />
        </div>
      )}

      {/* Header with Logo and Buttons */}
      {isClient ? (
        <SplashHeader />
      ) : (
        // Fallback header to prevent layout shift
        <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-20 flex items-center justify-between">
          <div className="h-6 sm:h-7 w-28 bg-gray-800/50 rounded animate-pulse"></div>
          <div className="flex gap-2 sm:gap-3">
            <div className="h-8 sm:h-10 w-16 sm:w-24 bg-gray-800/50 rounded animate-pulse"></div>
            <div className="h-8 sm:h-10 w-14 bg-gray-800/50 rounded animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 h-screen flex flex-col px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="flex-1 flex flex-col justify-center">
          {/* Top Section - Hero Text and Form */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full mb-8">
            
            {/* Left Side - Content */}
            <div className="space-y-8 md:space-y-10 text-center md:text-left">
              {/* Hero Text */}
              <div className="space-y-4 md:space-y-5 pb-5">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-green-100 to-green-400 bg-clip-text text-transparent">
                    Generative
                  </span>
                  <br />
                  <span className="text-white">Analytics</span>
                  <br />
                  <span className="text-gray-400">Reimagined</span>
                </h1>

                <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-none md:max-w-2xl mx-auto md:mx-0">
                  Transform your data into actionable insights with AI-powered analytics. 
                  Experience the future of data intelligence today.
                </p>
              </div>

              {/* Waitlist Form */}
              <form onSubmit={handleWaitlistSubmit} className="space-y-4 w-full max-w-lg mx-auto md:mx-0">
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
            </div>

            {/* Right Side - Data Visualization */}
            <div className="relative flex justify-center items-center min-h-[300px] md:min-h-[350px]">
              <div className="w-full max-w-md md:max-w-lg scale-75 sm:scale-90 md:scale-100">
                {isClient ? (
                  <DataVisualization />
                ) : (
                  <div className="w-full h-[300px] md:h-[350px] bg-gray-800/30 rounded-lg flex items-center justify-center">
                    <div className="text-gray-400">Loading visualization...</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section - Stats */}
          <div className="max-w-7xl mx-auto w-full">
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
        </div>

        {/* Copyright Notice - Pushed to Bottom */}
        <div className="mt-auto pb-6">
          <div className="text-center space-y-3">
            {/* Horizontal Line */}
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
            
            <p className="text-sm bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent">
              Copyright © 2025 <span className="font-bold">Lytica Inc.</span> All Rights Reserved.
            </p>
          </div>
        </div>
      </div>



      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-500/10 to-transparent pointer-events-none" />
      
      {/* Success Modal */}
      <WaitlistSuccessModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
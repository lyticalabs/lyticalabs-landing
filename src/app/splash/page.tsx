'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { DataVisualization } from '@/components/splash/DataVisualization';
import { GlowingOrbs } from '@/components/splash/GlowingOrbs';
import { AnimatedGrid } from '@/components/splash/AnimatedGrid';

export default function SplashPage() {
  const [email, setEmail] = useState('');

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle waitlist submission
    console.log('Waitlist submission:', email);
    // You can integrate with your backend here
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <AnimatedGrid />
        <GlowingOrbs />
      </div>

      {/* Logo - Top Left */}
      <div className="absolute top-6 left-6 z-20">
        <Image
          src="/lytica-labs-logo-new.svg"
          alt="Lytica Labs"
          width={640}
          height={160}
          className="h-12 w-auto"
        />
      </div>

      {/* Contact Us & Login - Top Right */}
      <div className="absolute top-6 right-6 z-20 flex gap-3">
        <Button 
          variant="outline" 
          className="border-green-400/30 text-green-400 hover:bg-green-400/10 hover:border-green-400"
        >
          Contact Us
        </Button>
        <Button 
          variant="outline" 
          className="border-gray-400/30 text-gray-300 hover:bg-gray-400/10 hover:border-gray-400 hover:text-white"
        >
          Login
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Hero Text */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-green-100 to-green-400 bg-clip-text text-transparent">
                  Generative
                </span>
                <br />
                <span className="text-white">Analytics</span>
                <br />
                <span className="text-gray-400">Redefined</span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Transform your data into actionable insights with AI-powered analytics. 
                Experience the future of data intelligence today.
              </p>
            </div>

            {/* Waitlist Form */}
            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-white placeholder-gray-400 h-12"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-black font-semibold px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25 h-12"
                >
                  Join Waitlist
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Be the first to experience next-generation analytics
              </p>
            </form>

            {/* Stats */}
            <div className="max-w-md pt-4">
              <div className="bg-gray-900/30 backdrop-blur-sm border border-green-400/20 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">10x</div>
                    <div className="text-sm text-gray-400">Faster Insights</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">12</div>
                    <div className="text-sm text-gray-400">Data Sources</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">70%</div>
                    <div className="text-sm text-gray-400">Input Reduction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Data Visualization */}
          <div className="relative">
            <DataVisualization />
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-500/10 to-transparent pointer-events-none" />
    </div>
  );
} 
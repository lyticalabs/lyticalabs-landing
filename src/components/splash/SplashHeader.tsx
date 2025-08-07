'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/splash/ContactModal';

/**
 * Header component for splash page featuring logo mark with inline "Labs" text
 * and Contact Us/Login buttons with proper hover states
 */
export function SplashHeader() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  return (
    <>
      {/* Header Container - Ensures proper vertical alignment */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-20 flex items-center justify-between">
        {/* Lytica Labs Full Logo - Left Side */}
        <div className="flex items-center">
          <a 
            href="/" 
            className="transition-opacity duration-300 hover:opacity-80"
          >
            <Image
              src="/Lytica_logo.png"
              alt="Lytica Labs"
              width={113}
              height={29}
              className="h-6 w-auto sm:h-7 sm:w-auto"
            />
          </a>
        </div>

        {/* Contact Us & Login - Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
        <Button 
          variant="outline" 
          className="border-green-400/40 text-green-400 hover:bg-green-400/20 hover:border-green-300 hover:text-white bg-gray-900/30 backdrop-blur-sm transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2 h-8 sm:h-10"
          onClick={() => setIsContactModalOpen(true)}
        >
          <span className="hidden sm:inline">Contact Us</span>
          <span className="sm:hidden">Contact</span>
        </Button>
        <Button 
          variant="outline" 
          className="border-gray-400/40 text-gray-300 hover:bg-gray-300/10 hover:border-gray-200 hover:text-white bg-gray-900/30 backdrop-blur-sm transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2 h-8 sm:h-10"
          onClick={() => window.location.href = 'https://beta.lyticalabs.ai'}
        >
          Login
        </Button>
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
} 
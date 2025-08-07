import Image from 'next/image';
import { Button } from '@/components/ui/button';

/**
 * Header component for splash page featuring logo mark with inline "Labs" text
 * and Contact Us/Login buttons with proper hover states
 */
export function SplashHeader() {
  return (
    <>
      {/* Logo Mark with Labs Text - Top Left */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2">
        <Image
          src="/lytica-labs-mark.svg"
          alt="Lytica Labs Mark"
          width={32}
          height={32}
          className="h-6 w-6 sm:h-8 sm:w-8"
        />
        <span className="text-lg sm:text-xl font-semibold text-white">Labs</span>
      </div>

      {/* Contact Us & Login - Top Right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex gap-2 sm:gap-3">
        <Button 
          variant="outline" 
          className="border-green-400/40 text-green-400 hover:bg-green-400/20 hover:border-green-300 hover:text-white bg-gray-900/30 backdrop-blur-sm transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2 h-8 sm:h-10"
        >
          <span className="hidden sm:inline">Contact Us</span>
          <span className="sm:hidden">Contact</span>
        </Button>
        <Button 
          variant="outline" 
          className="border-gray-400/40 text-gray-300 hover:bg-gray-300/10 hover:border-gray-200 hover:text-white bg-gray-900/30 backdrop-blur-sm transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2 h-8 sm:h-10"
        >
          Login
        </Button>
      </div>
    </>
  );
} 
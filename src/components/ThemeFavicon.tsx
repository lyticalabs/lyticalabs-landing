'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

/**
 * ThemeFavicon component handles theme-aware favicon switching
 * - Dark theme/system dark: Uses default green favicons
 * - Light theme/system light: Uses inverted dark blue favicons
 */
export function ThemeFavicon() {
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    // Determine the actual theme being used
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isLightMode = currentTheme === 'light';

    // Get all favicon links
    const favicon16 = document.querySelector('link[rel="icon"][sizes="16x16"]') as HTMLLinkElement;
    const favicon32 = document.querySelector('link[rel="icon"][sizes="32x32"]') as HTMLLinkElement;
    const appleIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
    
    // Update favicon URLs based on theme
    if (favicon16) {
      favicon16.href = isLightMode ? '/favicon-16x16-light.png' : '/favicon-16x16.png';
    }
    
    if (favicon32) {
      favicon32.href = isLightMode ? '/favicon-32x32-light.png' : '/favicon-32x32.png';
    }
    
    // Apple touch icon (for now, use same as 32x32)
    if (appleIcon) {
      appleIcon.href = isLightMode ? '/favicon-32x32-light.png' : '/apple-touch-icon.png';
    }

    // Update theme color
    const themeColorMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (themeColorMeta) {
      themeColorMeta.content = isLightMode ? '#1e293b' : '#22c55e';
    }

    // Update manifest
    const manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
    if (manifestLink) {
      manifestLink.href = isLightMode ? '/site-light.webmanifest' : '/site.webmanifest';
    }

  }, [theme, systemTheme]);

  return null; // This component doesn't render anything
}
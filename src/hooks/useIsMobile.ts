import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the current device is mobile
 * Uses both user agent detection and screen width to determine if mobile
 * @returns boolean indicating if the current device is mobile
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    // Check if the device is mobile based on user agent
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(userAgent);
      
      // Also consider small screen sizes as mobile
      const isMobileWidth = window.innerWidth < 768;
      
      setIsMobile(isMobileDevice || isMobileWidth);
    };
    
    // Check initially
    checkIfMobile();
    
    // Add resize listener to update on orientation change or window resize
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  return isMobile;
} 
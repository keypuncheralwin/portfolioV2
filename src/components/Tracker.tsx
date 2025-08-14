'use client';

import { useEffect } from 'react';
import { trackVisitor } from '../utils/tracker';
import { logBotDetection, initBotDetection } from '../utils/botDetection';

export const Tracker = () => {
  useEffect(() => {
    // Only track in production
    if (process.env.NODE_ENV === 'production') {
      // Add a small delay to ensure page has loaded
      const timer = setTimeout(async () => {
        // Track visitor first - this gets IP info we can use
        const ipData = await trackVisitor();
        
        // Log bot detection with IP if available
        logBotDetection(ipData?.ip);
        
        // Initialize the global bot detection test function
        initBotDetection();
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      // In development, just init the detection function
      initBotDetection();
    }
  }, []);
  
  // This component doesn't render anything
  return null;
};

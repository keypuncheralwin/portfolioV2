'use client';

import { useEffect } from 'react';
import { trackVisitor } from '../utils/tracker';

export const Tracker = () => {
  useEffect(() => {
    // Only track in production
    if (process.env.NODE_ENV === 'production') {
      // Add a small delay to ensure page has loaded
      const timer = setTimeout(() => {
        trackVisitor();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // This component doesn't render anything
  return null;
};

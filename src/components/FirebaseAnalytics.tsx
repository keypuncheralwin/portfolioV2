"use client";

import { useEffect } from 'react';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

export default function FirebaseAnalytics() {
  useEffect(() => {
    // Only run in browser and when analytics is available
    if (analytics) {
      // Log page view
      logEvent(analytics, 'page_view', {
        page_path: window.location.pathname,
        page_title: document.title,
      });
    }
  }, []);

  return null;
}

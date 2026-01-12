import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT_btCdp-R_RNcFItLQ7pntlAvKa7vVPM",
  authDomain: "portfoliov2-e4f4d.firebaseapp.com",
  projectId: "portfoliov2-e4f4d",
  storageBucket: "portfoliov2-e4f4d.firebasestorage.app",
  messagingSenderId: "504299172986",
  appId: "1:504299172986:web:fbb6492dcf4c02462ff7c3",
  measurementId: "G-BD6R5BKWY4"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics (only in browser and production)
let analytics: Analytics | null = null;

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  // Check URL parameters for tracking preferences
  const urlParams = new URLSearchParams(window.location.search);
  
  if (urlParams.has('notrack')) {
    localStorage.setItem('disable_analytics', 'true');
    console.log('Analytics tracking disabled via URL parameter');
  } else if (urlParams.has('yestrack')) {
    localStorage.removeItem('disable_analytics');
    console.log('Analytics tracking enabled via URL parameter');
  }
  
  // Check if user has disabled tracking via localStorage
  const trackingDisabled = localStorage.getItem('disable_analytics') === 'true';
  
  if (!trackingDisabled) {
    analytics = getAnalytics(app);
  } else {
    console.log('Analytics tracking disabled by user preference');
  }
}

export { app, analytics };

import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
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

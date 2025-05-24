import { supabase } from './supabase';

interface VisitorData {
  ip?: string;
  city?: string;
  country?: string;
  platform?: string;
  device?: string;
  referrer?: string;
  user_agent?: string; // Changed from userAgent to match DB column name
  timestamp: string;
}

export const trackVisitor = async () => {
  try {
    // Get IP and location data from a geolocation API
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();
    
    // Get location data
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoResponse.json();
    
    // Determine platform
    const userAgent = navigator.userAgent;
    let platform = 'Unknown';
    if (/Windows/.test(userAgent)) platform = 'Windows';
    else if (/Mac/.test(userAgent)) platform = 'Mac';
    else if (/Linux/.test(userAgent)) platform = 'Linux';
    else if (/Android/.test(userAgent)) platform = 'Android';
    else if (/iOS/.test(userAgent)) platform = 'iOS';
    
    // Determine device type
    let device = 'Unknown';
    if (/Mobile|Android|iPhone|iPad|iPod/.test(userAgent)) device = 'Mobile';
    else device = 'PC';
    
    // Get referrer
    const referrer = document.referrer || 'Direct';
    
    // Prepare data
    const visitorData: VisitorData = {
      ip,
      city: geoData.city,
      country: geoData.country_name,
      platform,
      device,
      referrer,
      user_agent: userAgent,
      timestamp: new Date().toISOString(),
    };
    
    // Save to Supabase
    const { error } = await supabase
      .from('visitors')
      .insert([visitorData]);
      
    if (error) {
      console.error('Error logging visitor:', error);
    }
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
};

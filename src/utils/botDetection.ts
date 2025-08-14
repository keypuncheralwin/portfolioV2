import { supabase } from './supabase';

// Declare global window property for type checking
declare global {
  interface Window {
    checkForAIBot: () => BotInfo | null;
  }
}

interface BotInfo {
  name: string;
  pattern: string;
  service: string;
  type: string;
}

interface BotDetectionData {
  timestamp: string;
  bot_detected: boolean;
  bot_name?: string;
  bot_service?: string;
  bot_type?: string;
  user_agent: string;
  url: string;
  referrer?: string;
  ip?: string;
}

// Configuration of bot patterns to detect
const botPatterns: BotInfo[] = [
  { name: 'ChatGPT', pattern: 'chatgpt-user', service: 'OpenAI ChatGPT', type: 'Query' },
  { name: 'Claude', pattern: 'claude-user', service: 'Anthropic Claude', type: 'Query' },
  { name: 'Perplexity', pattern: 'perplexitybot', service: 'Perplexity AI', type: 'Query' },
  { name: 'GPTBot', pattern: 'gptbot', service: 'OpenAI', type: 'Training' },
  { name: 'CCBot', pattern: 'ccbot', service: 'Common Crawl', type: 'Training' }
];

/**
 * Detects if the current user agent matches any known AI bot pattern
 * @returns {BotInfo|null} Detected bot info or null if no bot detected
 */
export function detectAIBot(): BotInfo | null {
  if (typeof window === 'undefined') return null;
  
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Check each bot pattern against the user agent
  for (const bot of botPatterns) {
    if (userAgent.includes(bot.pattern)) {
      console.log(`AI Bot detected: ${bot.name} (${bot.service})`);
      return bot;
    }
  }

  // Additional detection for headless browsers (potential AI crawlers)
  if (
    (navigator as any).webdriver || 
    !navigator.languages || 
    navigator.languages.length === 0
  ) {
    console.log('Potential AI crawler detected (headless browser)');
    return { 
      name: 'Unknown Bot', 
      pattern: 'headless', 
      service: 'Unknown', 
      type: 'Unknown' 
    };
  }

  return null;
}

/**
 * Log detection results to console and save to Supabase
 * @param {BotInfo|null} detectedBot - Information about detected bot
 */
export async function logBotDetection(ip?: string): Promise<void> {
  try {
    const detectedBot = detectAIBot();
    
    // Prepare log data
    const logData: BotDetectionData = {
      timestamp: new Date().toISOString(),
      bot_detected: !!detectedBot,
      user_agent: typeof window !== 'undefined' ? navigator.userAgent : 'SSR',
      url: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer || 'No referrer' : 'No referrer',
      ip
    };
    
    // Add bot info if detected
    if (detectedBot) {
      logData.bot_name = detectedBot.name;
      logData.bot_service = detectedBot.service;
      logData.bot_type = detectedBot.type;
      console.log(`AI Bot detected: ${detectedBot.name} from ${detectedBot.service}`);
    } else {
      // Explicitly log when it's a human visitor (not a bot)
      console.log('Human visitor detected (not a bot)');
      logData.bot_name = 'None';
      logData.bot_service = 'Human';
      logData.bot_type = 'Visitor';
    }
    
    // Log to console
    console.log('Visit Detection Results:', logData);
    
    // Save to Supabase
    const { error } = await supabase
      .from('ai_bots')
      .insert([logData]);
      
    if (error) {
      console.error('Error logging visitor detection:', error);
    }
  } catch (error) {
    console.error('Error in visitor detection:', error);
  }
}

/**
 * Creates a global function for testing bot detection
 */
export function initBotDetection(): void {
  if (typeof window !== 'undefined') {
    window.checkForAIBot = detectAIBot;
  }
}

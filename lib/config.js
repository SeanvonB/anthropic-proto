/**
 * Configuration Module - Vercel Serverless Adaptation
 * 
 * Centralized configuration optimized for Vercel serverless functions with
 * environment variable validation and security-first design principles.
 * 
 * @author Sean von Bayern
 * @version 1.0.0
 * @license MIT
 */

/**
 * Server configuration object
 * 
 * Optimized for serverless deployment with Vercel-specific considerations.
 */
const config = {
  // Claude API configuration
  claude: {
    apiUrl: 'https://api.anthropic.com/v1/messages',
    apiVersion: '2023-06-01',
    model: 'claude-3-5-sonnet-20241022',
    maxTokens: 1000,
    // API key from Vercel environment variables
    apiKey: process.env.ANTHROPIC_API_KEY || (() => {
      console.error('ERROR: ANTHROPIC_API_KEY environment variable is required');
      throw new Error('ANTHROPIC_API_KEY environment variable is required');
    })()
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    enableRequestLogging: process.env.NODE_ENV !== 'production'
  },

  // Security settings
  security: {
    // IMPORTANT: Set CORS_ORIGIN in production to your actual domain
    corsOrigin: process.env.CORS_ORIGIN || '*',
    requestTimeoutMs: 25000, // Reduced for Vercel function limits
    maxRequestSizeMB: 1
  },

  // Vercel-specific settings
  vercel: {
    isDevelopment: process.env.NODE_ENV === 'development',
    functionTimeout: 25 // seconds (under Vercel's 30s limit)
  }
};

export default config;
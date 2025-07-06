/**
 * Health Check Serverless Function
 * 
 * Vercel serverless function that provides comprehensive system health information
 * including server status, API configuration, and runtime metrics.
 * 
 * @author Sean von Bayern
 * @version 1.0.0
 * @license MIT
 */

const config = require('../lib/config');
const logger = require('../lib/logger');

/**
 * Set CORS headers for API responses
 */
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', config.security.corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
}

/**
 * Main serverless function handler
 * 
 * @param {Object} req - Vercel request object
 * @param {Object} res - Vercel response object
 */
export default async function handler(req, res) {
  const startTime = Date.now();
  
  try {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      setCorsHeaders(res);
      res.status(200).end();
      return;
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
      setCorsHeaders(res);
      res.status(405).json({
        error: true,
        message: 'Method not allowed',
        timestamp: new Date().toISOString()
      });
      return;
    }

    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      server: {
        platform: 'vercel',
        node: process.version,
        region: process.env.VERCEL_REGION || 'unknown',
        environment: process.env.NODE_ENV || 'development'
      },
      api: {
        claude: {
          configured: !!process.env.CLAUDE_API,
          model: config.claude.model,
          timeout: config.security.requestTimeoutMs
        }
      },
      function: {
        memory: process.memoryUsage(),
        uptime: process.uptime()
      }
    };

    setCorsHeaders(res);
    res.status(200).json(healthData);
    
    logger.logFunction('health', req, startTime, 200);

  } catch (error) {
    logger.error('Health check failed', { 
      error: error.message,
      region: process.env.VERCEL_REGION 
    });
    
    setCorsHeaders(res);
    res.status(500).json({
      error: true,
      message: 'Health check failed',
      timestamp: new Date().toISOString()
    });
    
    logger.logFunction('health', req, startTime, 500);
  }
}
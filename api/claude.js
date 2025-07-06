/**
 * Claude API Serverless Function
 * 
 * Vercel serverless function that handles Claude API requests with secure
 * server-side API key management and comprehensive error handling.
 * 
 * @author Sean von Bayern
 * @version 1.0.0
 * @license MIT
 */

import claudeService from '../lib/claude-service.js';
import config from '../lib/config.js';
import logger from '../lib/logger.js';

/**
 * Set CORS headers for API responses
 */
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', config.security.corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
}

/**
 * Send JSON response with proper headers
 */
function sendJsonResponse(res, statusCode, data) {
  setCorsHeaders(res);
  res.status(statusCode).json(data);
}

/**
 * Send error response
 */
function sendErrorResponse(res, statusCode, message, details = null) {
  const errorResponse = {
    error: true,
    message,
    timestamp: new Date().toISOString()
  };

  if (details && process.env.NODE_ENV !== 'production') {
    errorResponse.details = details;
  }

  sendJsonResponse(res, statusCode, errorResponse);
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
    logger.debug('Processing Claude API request', {
      method: req.method,
      url: req.url,
      region: process.env.VERCEL_REGION
    });

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      setCorsHeaders(res);
      res.status(200).end();
      return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
      sendErrorResponse(res, 405, 'Method not allowed');
      logger.logFunction('claude', req, startTime, 405);
      return;
    }

    // Validate request body
    if (!req.body || !req.body.messages) {
      sendErrorResponse(res, 400, 'Missing required field: messages');
      logger.logFunction('claude', req, startTime, 400);
      return;
    }

    // Call Claude service
    const response = await claudeService.sendMessages(req.body.messages);

    // Format response to match Claude API structure
    const responseData = {
      id: `msg_${Date.now()}`,
      type: 'message',
      role: 'assistant',
      content: [{
        type: 'text',
        text: response
      }],
      model: config.claude.model,
      stop_reason: 'end_turn',
      stop_sequence: null,
      usage: {
        input_tokens: 0,  // We don't track these in this implementation
        output_tokens: 0
      }
    };

    sendJsonResponse(res, 200, responseData);
    logger.logFunction('claude', req, startTime, 200);

  } catch (error) {
    logger.error('Claude API request failed', { 
      error: error.message,
      duration: `${Date.now() - startTime}ms`,
      region: process.env.VERCEL_REGION
    });

    // Determine appropriate status code based on error type
    let statusCode = 500;
    if (error.message.includes('validation') || error.message.includes('required')) {
      statusCode = 400;
    } else if (error.message.includes('timeout')) {
      statusCode = 504;
    } else if (error.message.includes('rate limit')) {
      statusCode = 429;
    }

    sendErrorResponse(res, statusCode, 'Failed to process Claude request', error.message);
    logger.logFunction('claude', req, startTime, statusCode);
  }
}
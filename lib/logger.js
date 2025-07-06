/**
 * Logging Module - Vercel Serverless Adaptation
 * 
 * Provides structured logging optimized for Vercel serverless functions with
 * function-scoped logging and comprehensive request/response tracking.
 * 
 * @author Sean von Bayern
 * @version 1.0.0
 * @license MIT
 */

const config = require('./config');

/**
 * Serverless-optimized logger
 * 
 * Designed for Vercel functions where each invocation is independent.
 */
class Logger {
  constructor() {
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3
    };
    this.currentLevel = this.levels[config.logging.level] || this.levels.info;
  }

  /**
   * Format log message with timestamp and level
   * Optimized for Vercel's log collection
   */
  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaStr}`;
  }

  /**
   * Log at specified level
   */
  log(level, message, meta = {}) {
    if (this.levels[level] <= this.currentLevel) {
      const formatted = this.formatMessage(level, message, meta);
      
      // Use appropriate console method for Vercel log collection
      if (level === 'error') {
        console.error(formatted);
      } else if (level === 'warn') {
        console.warn(formatted);
      } else {
        console.log(formatted);
      }
    }
  }

  error(message, meta = {}) {
    this.log('error', message, meta);
  }

  warn(message, meta = {}) {
    this.log('warn', message, meta);
  }

  info(message, meta = {}) {
    this.log('info', message, meta);
  }

  debug(message, meta = {}) {
    this.log('debug', message, meta);
  }

  /**
   * Log serverless function details
   * Adapted for Vercel's execution model
   */
  logFunction(functionName, req, startTime, statusCode = 200) {
    if (!config.logging.enableRequestLogging) return;
    
    const duration = Date.now() - startTime;
    const { method, url } = req;
    
    this.info('Serverless Function', {
      function: functionName,
      method,
      url,
      statusCode,
      duration: `${duration}ms`,
      userAgent: req.headers['user-agent'],
      vercelRegion: process.env.VERCEL_REGION || 'unknown'
    });
  }
}

module.exports = new Logger();
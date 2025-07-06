/**
 * Claude API Service - Vercel Serverless Adaptation
 * 
 * Handles Claude API communication optimized for serverless functions with
 * comprehensive input validation, timeout handling, and error management.
 * 
 * @author Sean von Bayern
 * @version 1.0.0
 * @license MIT
 */

const config = require('./config');
const logger = require('./logger');

/**
 * Claude API Service Class
 * 
 * Optimized for serverless execution with proper timeout handling
 * and efficient resource usage.
 */
class ClaudeService {
  constructor() {
    this.apiUrl = config.claude.apiUrl;
  }

  /**
   * Validate message format for Claude API
   */
  validateMessages(messages) {
    if (!Array.isArray(messages)) {
      throw new Error('Messages must be an array');
    }

    if (messages.length === 0) {
      throw new Error('At least one message is required');
    }

    for (const message of messages) {
      if (!message.role || !message.content) {
        throw new Error('Each message must have role and content');
      }

      if (!['user', 'assistant'].includes(message.role)) {
        throw new Error('Message role must be "user" or "assistant"');
      }

      if (typeof message.content !== 'string' || message.content.trim().length === 0) {
        throw new Error('Message content must be a non-empty string');
      }
    }
  }

  /**
   * Create Claude API request payload
   */
  createRequestPayload(messages) {
    this.validateMessages(messages);

    return {
      model: config.claude.model,
      max_tokens: config.claude.maxTokens,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content.trim()
      }))
    };
  }

  /**
   * Make HTTP request to Claude API using fetch
   * Optimized for Vercel serverless runtime
   */
  async makeRequest(payload) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.security.requestTimeoutMs);

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.claude.apiKey,
          'anthropic-version': config.claude.apiVersion,
          'User-Agent': 'Claude-Prototype-Vercel/1.0'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;
        
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error?.message || 'Unknown error';
        } catch {
          errorMessage = 'Failed to parse error response';
        }
        
        throw new Error(`Claude API error (${response.status}): ${errorMessage}`);
      }

      return await response.json();

    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Claude API request timed out');
      }
      
      if (error.message.includes('fetch')) {
        throw new Error(`Network error communicating with Claude API: ${error.message}`);
      }
      
      throw error;
    }
  }

  /**
   * Send messages to Claude and get response
   * 
   * @param {Array} messages - Array of message objects with role and content
   * @returns {Promise<string>} - Claude's response text
   */
  async sendMessages(messages) {
    const startTime = Date.now();
    
    try {
      logger.debug('Sending request to Claude API', { 
        messageCount: messages.length,
        model: config.claude.model,
        region: process.env.VERCEL_REGION
      });

      const payload = this.createRequestPayload(messages);
      const response = await this.makeRequest(payload);

      // Extract response text from Claude API response
      if (!response.content || !response.content[0] || !response.content[0].text) {
        throw new Error('Invalid response format from Claude API');
      }

      const responseText = response.content[0].text;
      const duration = Date.now() - startTime;

      logger.info('Claude API request successful', {
        duration: `${duration}ms`,
        responseLength: responseText.length,
        tokensUsed: response.usage?.output_tokens || 'unknown',
        region: process.env.VERCEL_REGION
      });

      return responseText;

    } catch (error) {
      const duration = Date.now() - startTime;
      
      logger.error('Claude API request failed', {
        error: error.message,
        duration: `${duration}ms`,
        messageCount: messages.length,
        region: process.env.VERCEL_REGION
      });

      throw error;
    }
  }
}

module.exports = new ClaudeService();
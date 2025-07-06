# Claude.ai Prototype with Confidence Assessment

> **[An interactive Claude AI chat interface with unique confidence visualization ↗](https://anthropic-proto.vercel.app/)**

## 📋 Current Status

**✅ Production Ready** - This repository contains a fully functional Claude.ai prototype deployed on Vercel with:
- ✅ Real Claude API integration (Claude 3.5 Sonnet)
- ✅ **Unique confidence assessment feature** - Visual confidence meter for Claude's responses
- ✅ Secure serverless backend with environment variable protection  
- ✅ Responsive React frontend with pixel-perfect UI
- ✅ Comprehensive error handling and logging
- ✅ Production deployment configuration for Vercel
- ✅ Complete documentation and setup instructions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Anthropic API key from [console.anthropic.com](https://console.anthropic.com)
- Vercel account

### Local Development
```bash
# Clone the repository
git clone https://github.com/SeanvonB/anthropic-proto.git
cd anthropic-proto

# Install Vercel CLI (if not already installed)
npm install -g vercel

# Create local environment file
echo "ANTHROPIC_API_KEY=your-anthropic-api-key-here" > .env

# Start development server
vercel dev

# Open http://localhost:3000
```

**⚠️ Important**: You'll need to replace `your-anthropic-api-key-here` with your actual Anthropic API key!

### Production Deployment
```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Set environment variables in Vercel dashboard:
# ANTHROPIC_API_KEY = your-anthropic-api-key
# CORS_ORIGIN = your-production-domain.com (optional but recommended)
```

That's it! Your Claude prototype is live with enterprise-grade infrastructure.

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18, Vanilla CSS, HTML5
- **Backend**: Vercel Serverless Functions (Node.js 18+)
- **API**: Claude 3.5 Sonnet via Anthropic API
- **Deployment**: Vercel with global CDN
- **Dependencies**: Zero runtime dependencies (React loaded from CDN)

### Project Structure
```
anthropic-proto/
├── api/                    # Vercel serverless functions
│   ├── claude.js           # Claude API endpoint with confidence assessment
│   └── health.js           # System health check
├── lib/                    # Shared utilities
│   ├── config.js           # Environment configuration
│   ├── logger.js           # Structured logging
│   └── claude-service.js   # Claude API client
├── app.js                  # React frontend application
├── styles.css              # UI styling and animations
├── index.html              # Main HTML document
└── vercel.json             # Vercel deployment config
```

## 🎯 Confidence Assessment Feature

This prototype includes a unique confidence visualization feature that shows how confident Claude is in its responses.

### How It Works
1. Claude provides a response to the user's message
2. A follow-up request asks Claude to assess its confidence level
3. The confidence is displayed as a visual meter with 5 levels:
   - 🟢 Very High (5 lights)
   - 🟢 High (4 lights)
   - 🟡 Moderate (3 lights)
   - 🟠 Low (2 lights)
   - 🔴 Very Low (1 light)

### Confidence Statements
Claude selects from these exact statements:
- "I am extremely confident"
- "I am fairly confident"
- "I think it was probably good enough"
- "I do have some strong doubts"
- "I am not confident at all"

The feature can be toggled on/off via the UI toggle switch in the header.

## 🔧 API Reference

### `POST /api/claude`
Send messages to Claude and receive responses.

**Request:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello Claude!"
    }
  ],
  "assessConfidence": true,  // Optional: Enable confidence assessment
  "generateTitle": true      // Optional: Generate chat title
}
```

**Response:**
```json
{
  "id": "msg_1234567890",
  "type": "message",
  "role": "assistant", 
  "content": [{
    "type": "text",
    "text": "Hello! How can I help you today?"
  }],
  "model": "claude-3-5-sonnet-20241022",
  "stop_reason": "end_turn"
}
```

### `GET /api/health`
System health and status information.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "server": {
    "platform": "vercel",
    "node": "v18.17.0",
    "region": "iad1",
    "environment": "production"
  },
  "api": {
    "claude": {
      "configured": true,
      "model": "claude-3-5-sonnet-20241022",
      "timeout": 25000
    }
  }
}
```

## 🛠️ Development

### Local Development Workflow
```bash
# Start development server
vercel dev

# Test API endpoints
curl http://localhost:3000/api/health
curl -X POST http://localhost:3000/api/claude \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Test"}]}'

# Deploy preview
vercel

# Deploy production
vercel --prod
```

### Code Style Guidelines
- **Documentation**: Comprehensive JSDoc comments
- **Naming**: Descriptive function and variable names
- **Structure**: Single responsibility principle
- **Error Handling**: Consistent patterns across all modules
- **Security**: Input validation and safe error responses

## 🛠️ Troubleshooting

### Common Issues

**❌ "ANTHROPIC_API_KEY environment variable is required" Error**
- **Solution**: Set up your environment file with `echo "ANTHROPIC_API_KEY=your-api-key" > .env.local`
- **For deployment**: Add the environment variable in your Vercel dashboard

**❌ "Failed to get response from Claude" Error**
- **Check**: Verify your API key is valid at [console.anthropic.com](https://console.anthropic.com)
- **Check**: Ensure you have sufficient API credits
- **Check**: Verify the API key in your environment variables

**❌ Confidence Meter Shows "Unknown"**
- **Normal**: Can happen if confidence assessment fails
- **Default**: System defaults to moderate confidence (3 lights)
- **Toggle**: Try disabling/re-enabling the confidence feature

**❌ Chat Not Auto-Scrolling**
- **Expected**: Chat automatically scrolls to latest messages
- **Browser**: Ensure JavaScript is enabled
- **Performance**: May have slight delay on slower devices

### Getting Help
- **Vercel Issues**: Check [vercel.com/docs](https://vercel.com/docs)
- **Claude API Issues**: Check [docs.anthropic.com](https://docs.anthropic.com)
- **Project Issues**: Use GitHub issues for project-specific problems

## 📚 Documentation

### Additional Resources
- **[DEPLOY.md](./DEPLOY.md)** - Detailed deployment instructions
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture overview
- **[CLAUDE.md](./CLAUDE.md)** - Development instructions and guidelines
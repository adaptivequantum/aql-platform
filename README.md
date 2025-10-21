# AQL (عقل) - AI Marketing Intelligence Platform

![AQL Logo](https://files.manuscdn.com/user_upload_by_module/session_file/310419663028412667/TFpcToHrijqYZsbt.png)

**World's First AI Marketing Powerhouse**

Born in Saudi 🇸🇦, Built for the World

[![Saudi Tech](https://files.manuscdn.com/user_upload_by_module/session_file/310419663028412667/ZJaSILaKzqpyoNia.png)](https://sauditech.sa)

---

## 🎯 Overview

AQL is a comprehensive AI-powered marketing intelligence platform that combines four distinct "brains" to deliver unparalleled marketing insights and automation. The platform fuses Cultural, Behavioral, Predictive, and Generative intelligence to help marketers make better decisions faster.

### Key Features

**12 AI-Powered Modules** covering the complete marketing intelligence spectrum from research to execution.

**Four Brains Framework** providing multi-dimensional analysis:
- **Cultural Brain** - Values, traditions, and cultural context
- **Behavioral Brain** - Observable actions and patterns
- **Predictive Brain** - Future trends and forecasting
- **Generative Brain** - Creative insights and opportunities

**Public Access** - No authentication required, seamless user experience from first visit.

**100+ Contextual Shortcuts** - Pre-written prompts that demonstrate capabilities and accelerate usage.

**Command Center** - Real-time platform intelligence with KPIs and visualizations.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 22.x or higher
- PostgreSQL database
- pnpm package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd aql-platform

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Initialize database
pnpm db:push

# Start development server
pnpm dev
```

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/aql_db

# LLM Configuration
LLM_API_KEY=your_openai_or_anthropic_key
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4

# Storage (Forge API)
BUILT_IN_FORGE_API_URL=your_forge_url
BUILT_IN_FORGE_API_KEY=your_forge_key

# Application
NODE_ENV=development
PORT=3001
```

### Development

```bash
# Start development server
pnpm dev

# Run database migrations
pnpm db:push

# Open database studio
pnpm db:studio

# Build for production
pnpm build

# Start production server
pnpm start
```

---

## 📚 Documentation

Comprehensive documentation is provided in the following files:

- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Executive summary and project overview
- **[AQL_PLATFORM_DOCUMENTATION.md](./AQL_PLATFORM_DOCUMENTATION.md)** - Complete technical documentation
- **[QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md)** - User guide and best practices
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Production deployment guide

---

## 🎨 Platform Modules

### 1. Assist AI
Universal AI assistant for all marketing tasks with 24 contextual shortcuts across Quick Actions, Research Explorer, and Creative Studio categories.

### 2. Creative Analysis
Upload visual advertisements and receive expert AI analysis covering design quality, messaging effectiveness, target audience appeal, psychological impact, and competitive positioning with quantitative scores.

### 3. Analytics
Market analytics and insights including market size, growth forecasts, competitive landscape, and consumer spending trends.

### 4. Research
Four Brains research framework providing deep insights into triggers & barriers, habits & attitudes, behavioral patterns, and market trends.

### 5. Campaigns
AI-powered campaign generation for Ramadan campaigns, product launches, seasonal promotions, brand awareness, social media, and influencer marketing.

### 6. Focus Groups
Simulated focus group insights for product testing, packaging design, brand perception, taste testing, price sensitivity, and audience segmentation.

### 7. Channels
Channel optimization strategy for social media, retail distribution, e-commerce, traditional media, influencer channels, and omnichannel integration.

### 8. Trends
Market trend analysis covering emerging trends, growing categories, declining segments, consumer behavior shifts, and technology trends.

### 9. Creative Studio
AI image generation for product photography, social media visuals, campaign banners, brand assets, promotional graphics, and marketing collateral.

### 10. Video Studio
AI video generation for marketing videos, promotional content, brand videos, and social media content.

### 11. Brand
Brand intelligence and positioning including brand strategy, competitive analysis, messaging frameworks, identity development, equity measurement, and extension opportunities.

### 12. Insights
Deep consumer insights covering purchase motivations, adoption barriers, decision journeys, emotional drivers, and cultural influences.

### 13. Strategy
Marketing strategy builder for go-to-market plans, growth roadmaps, competitive frameworks, market entry, portfolio strategy, and digital transformation.

---

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Wouter** - Lightweight routing
- **TanStack Query** - Data fetching and caching
- **tRPC** - Type-safe API communication

### Backend Stack
- **Node.js 22** - Runtime environment
- **Express.js** - Web framework
- **tRPC** - Type-safe API layer
- **PostgreSQL** - Relational database
- **Drizzle ORM** - Type-safe database access

### AI Integration
- **LLM API** - OpenAI/Anthropic compatible
- **Invideo MCP** - Image and video generation
- **Serena MCP** - Code intelligence

### Project Structure

```
aql-platform/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── _core/         # Core utilities and hooks
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── const.ts       # Constants and configuration
│   └── index.html
├── server/                 # Backend application
│   ├── db.ts              # Database configuration
│   ├── routers.ts         # tRPC routers
│   ├── intelligence.ts    # AI intelligence functions
│   └── storage.ts         # File storage utilities
├── shared/                 # Shared types and utilities
│   └── const.ts           # Shared constants
└── public/                # Static assets
```

---

## 🎯 Key Features

### Public Access
The platform is designed for public access without authentication requirements, providing a seamless experience from first visit. Sessions are created automatically with anonymous user IDs.

### Contextual Shortcuts
Every module includes Quick Start Prompts - pre-written questions that demonstrate the module's capabilities and help users get started quickly. These shortcuts are color-coded and organized by category.

### Four Brains Framework
The unique Four Brains analytical approach provides multi-dimensional insights by combining cultural values, behavioral patterns, predictive trends, and generative opportunities in a single unified framework.

### Creative Analysis with Image Upload
Users can upload actual visual advertisements and receive comprehensive AI analysis with quantitative scores across multiple dimensions including design quality, messaging effectiveness, and target audience appeal.

### Command Center Dashboard
Real-time platform intelligence showing key performance metrics, revenue trends, campaign performance by channel, conversion optimization, and recent AI activity.

### Responsive Design
The platform works seamlessly across all devices with a mobile-first responsive design that adapts to different screen sizes and orientations.

---

## 🚢 Deployment

### Production Build

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Deployment Options

**Cloud Platforms**: Deploy to Vercel, Netlify, or Railway with automatic builds and deployments.

**VPS**: Deploy to Ubuntu server with Nginx reverse proxy and PM2 process management.

**Containers**: Deploy using Docker with Kubernetes or Docker Swarm orchestration.

### Environment Configuration

Ensure all required environment variables are configured in your production environment. See `.env.example` for the complete list.

### Database Setup

Run database migrations before deploying:

```bash
pnpm db:push
```

---

## 🔒 Security

The platform implements several security best practices:

- Environment variables for sensitive configuration
- SQL injection prevention through Drizzle ORM
- XSS protection through React's built-in escaping
- CORS configuration for API endpoints
- Input validation on all forms

For production deployment, ensure:
- HTTPS is enforced
- Database credentials are secured
- API keys are stored in environment variables
- Rate limiting is implemented if needed

---

## 📊 Performance

The platform is optimized for performance:

- **Code splitting** - Automatic route-based code splitting
- **Lazy loading** - Components loaded on demand
- **Optimized images** - Compressed and properly sized
- **Minified assets** - CSS and JS minification
- **Tree shaking** - Unused code elimination
- **Database indexing** - Optimized query performance

---

## 🤝 Contributing

We welcome contributions to the AQL platform! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write or update tests
5. Submit a pull request

---

## 📝 License

Copyright © 2025 AQL Platform. All rights reserved.

---

## 🙏 Acknowledgments

**Developed by**: Manus AI Team

**Powered by**: Four Brains Framework

**Certified by**: Saudi Tech

**Built with**: React, TypeScript, Node.js, PostgreSQL

---

## 📞 Support

For questions, feedback, or support:

- **Documentation**: See included markdown files
- **Platform Support**: https://help.manus.im
- **Version**: 1.0.0

---

## 🔮 Roadmap

### Upcoming Features
- User authentication (optional)
- Session history and bookmarks
- Export functionality (PDF, CSV, PPT)
- Enhanced mobile experience
- Full Arabic language support
- Real-time collaboration
- Advanced analytics
- Custom module builder
- API access
- Mobile apps

---

**Made with ❤️ in Saudi Arabia 🇸🇦**

*Transforming marketing intelligence with AI*


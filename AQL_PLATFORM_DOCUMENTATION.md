# AQL Marketing Intelligence Platform - Complete Documentation

## 🎯 Platform Overview

**AQL (عقل)** is the world's first AI-powered marketing intelligence platform, born in Saudi Arabia and built for the world. The platform fuses four distinct "brains" - Cultural, Behavioral, Predictive, and Generative - to deliver comprehensive marketing insights and automation.

### Platform URL
- **Development**: https://3001-ita80shti95jvpkqhl9lv-2c376776.manusvm.computer/
- **Technology Stack**: React + TypeScript + Vite + tRPC + Drizzle ORM + PostgreSQL

---

## ✨ Key Features Implemented

### 1. **No Authentication Required**
- Platform is publicly accessible without login
- Sessions are created with 'anonymous' user ID
- Seamless user experience from first visit

### 2. **12 AI-Powered Modules**

#### **Assist AI** (Universal Assistant)
- Central hub for all platform capabilities
- **Quick Actions** (6 shortcuts):
  - Show command center dashboard
  - Generate Ramadan campaign strategy
  - Create product image for burger
  - Generate promotional video
  - Analyze F&B market in Saudi Arabia
  - Run focus group for new beverage

- **Research Explorer** (12 shortcuts across 4 categories):
  - Triggers & Barriers
  - Habits & Attitudes
  - Behavioral Insights
  - Market Trends

- **Creative Studio** (6 shortcuts):
  - Generate product photography
  - Create social media visuals
  - Design campaign banners
  - Produce brand assets
  - Generate promotional graphics
  - Create marketing collateral

#### **Creative Analysis** (NEW)
- Expert visual ad analysis framework
- **6 Quick Analysis Prompts**:
  - Analyze Ramadan campaign visual ad
  - Review food delivery app banner
  - Evaluate luxury car advertisement
  - Assess real estate billboard design
  - Critique fashion brand social media ad
  - Review tech product launch visual

- **Comprehensive Analysis Framework**:
  - 🎨 Design Quality Assessment (scored 0-10)
  - 💬 Messaging Effectiveness (scored 0-10)
  - 🎯 Target Audience Appeal (scored 0-10)
  - 🧠 Psychological Impact (scored 0-10)
  - ⚡ Competitive Positioning (scored 0-10)
  - ✨ Improvement Recommendations
  - 📊 Overall Effectiveness Score (/50)

#### **Analytics**
- Market analytics and insights
- **6 Quick Start Prompts**:
  - Analyze F&B market in Saudi Arabia
  - Consumer spending trends in beverages
  - Market size for healthy snacks
  - Growth forecast for organic food
  - Competitive landscape analysis
  - Price sensitivity in premium products

#### **Research** (Four Brains Framework)
- Cultural, Behavioral, Predictive, and Generative intelligence
- **Four Brains Categories**:
  - 🔥 Triggers & Barriers
  - 💭 Habits & Attitudes
  - 🧠 Behavioral Insights
  - 📈 Market Trends

#### **Campaigns**
- AI-powered campaign generation
- **6 Quick Start Prompts**:
  - Generate Ramadan campaign strategy
  - Product launch campaign plan
  - Seasonal promotion strategy
  - Brand awareness campaign
  - Social media campaign ideas
  - Influencer marketing strategy

#### **Focus Groups**
- Simulated focus group insights
- **6 Quick Start Prompts**:
  - Run focus group for new beverage
  - Test packaging design feedback
  - Brand perception study
  - Product taste testing protocol
  - Price point sensitivity research
  - Target audience segmentation

#### **Channels**
- Channel optimization strategy
- **6 Quick Start Prompts**:
  - Optimize social media strategy
  - Retail distribution analysis
  - E-commerce channel strategy
  - Traditional media effectiveness
  - Influencer channel optimization
  - Omnichannel integration plan

#### **Trends**
- Market trend analysis
- **6 Quick Start Prompts**:
  - Latest F&B trends in Saudi Arabia
  - Emerging health food trends
  - Growing food categories in 2025
  - Declining beverage segments
  - Consumer behavior shifts
  - Technology trends in F&B

#### **Creative Studio**
- AI image generation
- Text-to-image capabilities
- Professional product photography
- Marketing visual creation

#### **Video Studio**
- AI video generation
- Marketing video creation
- Promotional content generation
- Brand video production

#### **Brand**
- Brand intelligence and positioning
- **6 Quick Start Prompts**:
  - Brand positioning strategy
  - Competitive brand analysis
  - Brand messaging framework
  - Brand identity development
  - Brand equity measurement
  - Brand extension opportunities

#### **Insights**
- Deep consumer insights
- **6 Quick Start Prompts**:
  - Deep consumer insights for beverages
  - Purchase motivation analysis
  - Barriers to product adoption
  - Consumer decision journey
  - Emotional drivers of choice
  - Cultural influences on consumption

#### **Strategy**
- Marketing strategy builder
- **6 Quick Start Prompts**:
  - Go-to-market strategy
  - Growth strategy roadmap
  - Competitive strategy framework
  - Market entry strategy
  - Product portfolio strategy
  - Digital transformation strategy

### 3. **Command Center Dashboard**

Real-time platform intelligence with:

#### **Key Performance Metrics**
- Total Revenue: $328K (↑12.5%)
- Active Campaigns: 24 (↑8.3%)
- Conversion Rate: 4.5% (↑15.2%)
- AI Tasks Completed: 156 (↑23.1%)

#### **Visualizations**
- Revenue Trend (Last 6 Months) - Line chart
- Campaign Performance by Channel - Pie chart
  - Social Media: 35%
  - Search Ads: 28%
  - Display: 20%
  - Email: 12%
  - Other: 5%
- Conversion Rate Optimization - Bar chart
- AQL Media Optimization metrics

#### **Recent AI Activity Feed**
Real-time activity tracking showing:
- Module used
- Task completed
- Timestamp

---

## 🎨 Design Features

### Visual Identity
- **AQL Logo**: Colorful brain with transparent background
- **Saudi Tech Logo**: Proudly displayed on homepage
- **Color Scheme**: Dark theme with vibrant accent colors
- **Typography**: Modern, clean, professional

### UI/UX Highlights
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Color-coded module indicators
- Contextual prompt shortcuts for quick access
- Clean, minimal interface
- Professional gradient effects

### Branding Elements
- "World's First AI Marketing Powerhouse"
- "Born in Saudi 🇸🇦, Built for the World"
- Saudi Tech certification badge
- Four Brains framework visualization

---

## 🔧 Technical Architecture

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter
- **UI Components**: Custom component library
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **API Communication**: tRPC

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **API Layer**: tRPC
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: Removed (public access)

### AI Integration
- **LLM Provider**: Configurable (OpenAI/Anthropic compatible)
- **Image Generation**: Invideo MCP integration
- **Video Generation**: Invideo MCP integration
- **Code Intelligence**: Serena MCP integration

### Database Schema
- **Users**: User management (currently using 'anonymous')
- **Sessions**: Conversation sessions per module
- **Messages**: Chat messages with role and content
- **Metadata**: Session and message metadata

---

## 📊 Module Capabilities Summary

| Module | Primary Function | Shortcuts | AI Features |
|--------|-----------------|-----------|-------------|
| Assist AI | Universal assistant | 24 | Cross-module orchestration |
| Creative Analysis | Visual ad analysis | 6 | Expert framework analysis |
| Analytics | Market analytics | 6 | Data analysis & insights |
| Research | Four Brains framework | 4 categories | Cultural + behavioral intelligence |
| Campaigns | Campaign generation | 6 | Strategy + execution planning |
| Focus Groups | Consumer research | 6 | Simulated focus group insights |
| Channels | Channel optimization | 6 | Multi-channel strategy |
| Trends | Trend analysis | 6 | Predictive market intelligence |
| Creative Studio | Image generation | - | AI image creation |
| Video Studio | Video generation | - | AI video creation |
| Brand | Brand intelligence | 6 | Positioning + strategy |
| Insights | Consumer insights | 6 | Deep behavioral analysis |
| Strategy | Marketing strategy | 6 | Strategic planning |

---

## 🚀 Deployment Guide

### Prerequisites
- Node.js 22.x
- PostgreSQL database
- Environment variables configured

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://...

# LLM Configuration
LLM_API_KEY=your_api_key
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4

# Forge API (for storage)
BUILT_IN_FORGE_API_URL=...
BUILT_IN_FORGE_API_KEY=...

# MCP Servers (optional)
# Invideo for video/image generation
# Serena for code intelligence
```

### Installation Steps

1. **Install dependencies**
```bash
cd /home/ubuntu/aql-platform
pnpm install
```

2. **Setup database**
```bash
pnpm db:push
```

3. **Start development server**
```bash
pnpm dev
```

4. **Build for production**
```bash
pnpm build
```

5. **Start production server**
```bash
pnpm start
```

### Port Configuration
- **Frontend**: Port 3001
- **Backend API**: Port 3001 (same server)
- **Database**: Port 5432 (PostgreSQL)

---

## 📝 Usage Guide

### For End Users

1. **Getting Started**
   - Visit the homepage
   - Click "Get Started" button
   - Select any module from the sidebar
   - Use Quick Start Prompts or type custom queries

2. **Using Modules**
   - Each module has contextual shortcuts
   - Click a shortcut to populate the input
   - Submit to get AI-generated insights
   - Results are formatted with markdown

3. **Command Center**
   - Access from homepage or sidebar
   - View real-time platform metrics
   - Monitor AI activity
   - Track performance indicators

### For Developers

1. **Adding New Modules**
   - Update `shared/const.ts` with module definition
   - Add module route in `Dashboard.tsx`
   - Create intelligence function in `server/intelligence.ts`
   - Add router case in `server/routers.ts`
   - Define shortcuts in `MODULE_SHORTCUTS`

2. **Customizing AI Responses**
   - Edit system prompts in `server/intelligence.ts`
   - Adjust formatting rules
   - Add new analysis dimensions
   - Modify scoring criteria

3. **Styling Changes**
   - Update Tailwind config for colors
   - Modify component styles in `Dashboard.tsx`
   - Adjust responsive breakpoints
   - Customize animations

---

## 🎯 Key Achievements

✅ **No React Errors** - Clean, stable application
✅ **Public Access** - No authentication barriers
✅ **12 Fully Functional Modules** - All with contextual shortcuts
✅ **Creative Analysis** - New expert framework-based module
✅ **Command Center** - Real-time intelligence dashboard
✅ **Professional Design** - Saudi Tech branding, transparent logo
✅ **Responsive UI** - Works on all devices
✅ **Fast Performance** - Optimized build and runtime
✅ **Scalable Architecture** - Easy to extend and maintain

---

## 🔮 Future Enhancements

### Short-term
- [ ] Add user authentication (optional)
- [ ] Implement session history
- [ ] Add export functionality (PDF, CSV)
- [ ] Enhance mobile experience
- [ ] Add more language support (Arabic)

### Medium-term
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Custom module builder
- [ ] API access for integrations
- [ ] White-label capabilities

### Long-term
- [ ] Mobile apps (iOS, Android)
- [ ] Enterprise features
- [ ] Advanced AI models
- [ ] Marketplace for templates
- [ ] Global expansion

---

## 📞 Support & Contact

For questions, feedback, or support:
- **Platform**: AQL Marketing Intelligence
- **Website**: https://help.manus.im
- **Documentation**: This file
- **Version**: 1.0.0
- **Last Updated**: October 20, 2025

---

## 📄 License & Credits

**Developed by**: Manus AI Team
**Powered by**: Four Brains Framework
**Certified by**: Saudi Tech
**Built with**: React, TypeScript, Node.js, PostgreSQL

---

*This platform represents the future of AI-powered marketing intelligence, combining cutting-edge technology with deep cultural and behavioral insights.*


/**
 * AI Intelligence Module for AQL Platform
 * Handles research, insights, and analytics generation using LLM
 */

import { invokeLLM } from './_core/llm';

export interface ResearchCategory {
  id: 'triggers' | 'habits' | 'behavioral' | 'trends';
  title: string;
  color: string;
  insights: string[];
}

/**
 * Generate analytics insights for a specific market/sector
 */
export async function generateAnalytics(query: string): Promise<string> {
  // Use enhanced version with charts
  return generateEnhancedAnalytics(query);
}

async function generateEnhancedAnalytics(query: string): Promise<string> {
  const response = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `You are an expert marketing analyst specializing in Middle Eastern markets, particularly Saudi Arabia. 
Provide comprehensive, data-driven analytics with specific numbers, percentages, and actionable insights.

IMPORTANT FORMATTING RULES:
1. Use clear headings (##) for main sections
2. Use subheadings (###) for subsections
3. Use bullet points for lists
4. **Bold** key metrics and numbers
5. Keep paragraphs short (2-3 sentences max)
6. Use > blockquotes for key insights
7. Add line breaks between sections for readability
8. Highlight percentages and statistics
9. Use emojis sparingly for visual interest (📊 📈 💡 ⚡)

Make it SCANNABLE and VISUAL - nobody reads walls of text!`
      },
      {
        role: 'user',
        content: `Provide detailed analytics for: ${query}

Structure your response with these sections:

## 📊 Market Overview
- Market size with specific numbers
- Growth rate (CAGR)
- Key statistics

## 🎯 Key Segments
- Top 3-5 segments with percentages
- Brief description of each

## 👥 Consumer Demographics  
- Age groups
- Income levels
- Preferences

## 📈 Emerging Trends
- Top 3-5 trends
- Impact level

## 💡 Key Insights
- 3-5 actionable insights as blockquotes

## ⚡ Opportunities
- Top opportunities with brief descriptions

Keep each section concise and visual!`
      }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : 'Unable to generate analytics';
}

/**
 * Generate research insights organized by the Four Brains framework
 */
export async function generateResearch(query: string): Promise<ResearchCategory[]> {
  // Return enhanced research with charts as string
  const enhanced = await generateEnhancedResearch(query);
  // For now, return empty array - will be handled by string response
  return [];
}

async function generateEnhancedResearch(query: string): Promise<string> {
  const response = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `You are a consumer research expert using Four Brains framework.

Include charts:

\`\`\`chart:bar
{
  "title": "Cultural Triggers",
  "data": [
    {"name": "Tradition", "value": 85},
    {"name": "Family", "value": 90}
  ]
}
\`\`\`

Use ## headings, **bold** metrics, emojis: 🧠 🌍 👁️ 🔮`
      },
      {
        role: 'user',
        content: `Research: ${query}\n\n## 🧠 Cultural Brain\n## 👁️ Behavioral Brain\n## 🔮 Predictive Brain\n## 💡 Generative Brain`
      }
    ]
  });
  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : 'Unable to generate research';
}

async function generateResearchOld(query: string): Promise<ResearchCategory[]> {
  const response = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `You are a consumer behavior research expert specializing in the Four Brains framework:
1. Cultural Brain - Cultural values, traditions, and social norms
2. Behavioral Brain - Observable actions and patterns
3. Predictive Brain - Future trends and forecasting
4. Generative Brain - Creative insights and opportunities

Provide insights organized into these four categories, with specific, actionable findings.`
      },
      {
        role: 'user',
        content: `Research query: ${query}

Provide insights for each category:
1. Triggers & Barriers (Cultural Brain) - What drives or prevents decisions
2. Habits & Attitudes (Behavioral Brain) - Consumer behaviors and mindsets
3. Behavioral Insights (Predictive Brain) - Deep psychological patterns
4. Market Trends (Generative Brain) - Emerging movements and opportunities

Format as JSON array with structure: [{"category": "triggers", "insights": ["insight1", "insight2", ...]}, ...]`
      }
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'research_insights',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            categories: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  category: {
                    type: 'string',
                    enum: ['triggers', 'habits', 'behavioral', 'trends']
                  },
                  insights: {
                    type: 'array',
                    items: { type: 'string' }
                  }
                },
                required: ['category', 'insights'],
                additionalProperties: false
              }
            }
          },
          required: ['categories'],
          additionalProperties: false
        }
      }
    }
  });

  const rawContent = response.choices[0].message.content;
  const content = typeof rawContent === 'string' ? rawContent : '{"categories":[]}';
  const parsed = JSON.parse(content);
  
  const categoryMap: Record<string, { title: string; color: string }> = {
    triggers: { title: 'Triggers & Barriers', color: 'orange' },
    habits: { title: 'Habits & Attitudes', color: 'purple' },
    behavioral: { title: 'Behavioral Insights', color: 'cyan' },
    trends: { title: 'Market Trends', color: 'green' }
  };

  return parsed.categories.map((cat: any) => ({
    id: cat.category,
    title: categoryMap[cat.category].title,
    color: categoryMap[cat.category].color,
    insights: cat.insights
  }));
}

/**
 * Generate campaign strategy
 */
export async function generateCampaign(query: string): Promise<string> {
  const response = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `You are a creative marketing strategist specializing in Middle Eastern markets.
Create comprehensive, culturally-relevant campaign strategies.

FORMATTING RULES:
- Use ## for main sections with emojis
- Use ### for subsections
- **Bold** key terms
- Keep paragraphs SHORT (2-3 sentences)
- Use bullet points extensively
- Use > blockquotes for key recommendations
- Add visual hierarchy with spacing
- Make it SCANNABLE!`
      },
      {
        role: 'user',
        content: `Generate a marketing campaign for: ${query}

## 🎯 Campaign Overview
- Name & Tagline
- Core objective

## 👥 Target Audience
- Demographics
- Psychographics
- Pain points

## 💬 Key Messages
- 3-5 core messages

## 📱 Channel Strategy
- Digital channels
- Traditional media
- Experiential

## 📅 Timeline
- Phase breakdown
- Key milestones

## 💰 Budget Allocation
- Channel breakdown
- Percentages

## 📊 Success Metrics
- KPIs
- Targets

## 🌍 Cultural Considerations
- Key insights

Keep it visual and concise!`
      }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : 'Unable to generate campaign';
}

/**
 * Generate focus group insights
 */
export async function generateFocusGroup(query: string): Promise<string> {
  const response = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `You are a qualitative research expert conducting virtual focus groups.
Simulate realistic consumer responses with diverse perspectives, quotes, and emotional reactions.`
      },
      {
        role: 'user',
        content: `Simulate focus group discussion: ${query}

Provide:
- Participant Profiles (5-8 diverse participants)
- Key Discussion Themes
- Direct Quotes from participants
- Emotional Responses & Reactions
- Consensus Points
- Divergent Opinions
- Actionable Insights
- Recommendations

Make it feel authentic with real human perspectives.`
      }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : 'Unable to generate focus group insights';
}

/**
 * Generate channel optimization strategy
 */
export async function generateChannelStrategy(query: string): Promise<string> {
  const response = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `You are a digital marketing optimization expert specializing in omnichannel strategies.
Provide data-driven recommendations for channel mix and budget allocation.`
      },
      {
        role: 'user',
        content: `Optimize channel strategy for: ${query}

Analyze:
- Channel Performance Benchmarks
- Recommended Channel Mix
- Budget Allocation by Channel
- Audience Reach by Platform
- Engagement Metrics
- Conversion Funnels
- Cross-Channel Synergies
- Testing & Optimization Plan

Provide specific percentages and actionable recommendations.`
      }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : 'Unable to generate channel strategy';
}

/**
 * Generate trend analysis
 */
export async function generateTrends(query: string): Promise<string> {
  const response = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `You are a trend forecasting expert specializing in consumer behavior and market dynamics.
Identify emerging trends with supporting evidence and future implications.`
      },
      {
        role: 'user',
        content: `Analyze trends for: ${query}

Cover:
- Current Macro Trends
- Emerging Micro Trends
- Consumer Behavior Shifts
- Technology Adoption
- Cultural Movements
- Competitive Dynamics
- Future Predictions (6-12 months)
- Strategic Implications
- Opportunities to Capture

Be specific with examples and data points.`
      }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : 'Unable to generate trend analysis';
}

/**
 * Generate brand intelligence
 */
export async function generateBrandIntelligence(query: string): Promise<string> {
  const response = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `You are a brand strategy consultant specializing in brand positioning and competitive analysis.
Provide comprehensive brand insights with actionable recommendations.`
      },
      {
        role: 'user',
        content: `Analyze brand positioning for: ${query}

Include:
- Brand Positioning Map
- Competitive Landscape
- Brand Strengths & Weaknesses
- Perception Analysis
- Differentiation Opportunities
- Brand Architecture Recommendations
- Messaging Framework
- Visual Identity Considerations
- Brand Evolution Strategy

Provide strategic and tactical recommendations.`
      }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : 'Unable to generate brand intelligence';
}

/**
 * Generate strategic insights
 */
export async function generateStrategy(query: string): Promise<string> {
  const response = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `You are a senior marketing strategist specializing in integrated marketing strategies.
Create comprehensive strategic frameworks with clear priorities and roadmaps.`
      },
      {
        role: 'user',
        content: `Develop marketing strategy for: ${query}

Deliver:
- Strategic Objectives
- Target Market Definition
- Positioning Strategy
- Value Proposition
- Go-to-Market Plan
- Marketing Mix (4Ps/7Ps)
- Phased Roadmap
- Resource Requirements
- Risk Assessment
- Success Metrics

Provide a complete strategic blueprint.`
      }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : 'Unable to generate strategy';
}

/**
 * Generate insights engine analysis
 */
export async function generateInsights(query: string): Promise<string> {
  const response = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `You are a consumer insights expert specializing in deep behavioral analysis.
Uncover hidden patterns, motivations, and opportunities that drive consumer decisions.`
      },
      {
        role: 'user',
        content: `Generate deep insights for: ${query}

Explore:
- Core Consumer Motivations
- Hidden Needs & Desires
- Decision-Making Triggers
- Emotional Drivers
- Rational Considerations
- Social Influences
- Cultural Context
- Behavioral Patterns
- Opportunity Spaces
- Innovation Directions

Go beyond surface observations to reveal deeper truths.`
      }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : 'Unable to generate insights';
}



/**
 * Generate creative analysis for visual advertisements
 */
export async function generateCreativeAnalysis(adDescription: string): Promise<string> {
  const response = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `You are an elite creative director and visual advertising analyst with expertise in Saudi/MENA markets.
Provide IMPRESSIVE, COMPREHENSIVE analysis that goes deep into every visual element.

CRITICAL FORMATTING RULES:
1. Use ## for main sections, ### for subsections
2. Include detailed color analysis with hex codes (e.g., #FF5733, #2C3E50)
3. Create visual score cards with progress indicators
4. Use emojis strategically (🎨 🖌️ 🎯 💡 ⚡ ✨ 📊 🌟)
5. **Bold** all scores and key findings
6. Use > blockquotes for critical insights
7. Include specific, numbered recommendations
8. Add comparative benchmarks
9. Make it visually impressive and scannable!

This should WOW the user with depth and professionalism!`
      },
      {
        role: 'user',
        content: `Analyze this visual advertisement in COMPREHENSIVE detail: ${adDescription}

Provide an IMPRESSIVE analysis with these sections:

## 🎯 Overall Performance Score
**[XX/100]**

Your creative performs [well/excellently/needs improvement] compared to Saudi F&B market standards.

> **At a Glance:** [One sentence summary of overall performance]

---

## 📊 Detailed Analysis Scores

Create a visual score breakdown:

**Visual Appeal:** [XX/100] ⭐⭐⭐⭐☆
**Message Clarity:** [XX/100] ⭐⭐⭐⭐⭐
**Cultural Appropriateness:** [XX/100] ⭐⭐⭐☆☆
**Brand Consistency:** [XX/100] ⭐⭐⭐⭐☆
**Engagement Prediction:** [XX/100] ⭐⭐⭐⭐⭐
**Color Effectiveness:** [XX/100] ⭐⭐⭐⭐☆

---

## 🎨 Visual Design Analysis

### Color Palette Breakdown
Extract and analyze the color scheme:

**Primary Colors:**
- **#[HEXCODE]** - [Color name] - [Psychology/meaning]
- **#[HEXCODE]** - [Color name] - [Psychology/meaning]

**Secondary Colors:**
- **#[HEXCODE]** - [Color name] - [Usage/purpose]

**Color Harmony:** [Complementary/Analogous/Triadic/etc.]
**Cultural Relevance:** [How colors resonate with Saudi/MENA audience]

### Typography Analysis
- **Headline Font:** [Style/characteristics]
- **Body Font:** [Style/characteristics]
- **Readability Score:** [X/10]
- **Hierarchy Effectiveness:** [Assessment]

### Layout & Composition
- **Visual Hierarchy:** [Strong/Moderate/Weak]
- **Focal Point:** [Description]
- **White Space Usage:** [Effective/Cluttered/Sparse]
- **Balance:** [Symmetrical/Asymmetrical/Dynamic]

**Design Score: [XX/100]**

---

## 💬 Messaging & Copy Analysis

### Headline Effectiveness
- **Impact Score:** [X/10]
- **Clarity Score:** [X/10]
- **Emotional Trigger:** [What emotion it evokes]

### Body Copy Assessment
- **Persuasiveness:** [X/10]
- **Value Proposition:** [Clear/Unclear/Compelling]
- **Cultural Tone:** [Appropriate/Needs adjustment]

### Call-to-Action (CTA)
- **Visibility:** [High/Medium/Low]
- **Urgency Level:** [X/10]
- **Action Clarity:** [Clear/Vague]

**Messaging Score: [XX/100]**

---

## 🎯 Target Audience Alignment

### Demographic Fit
- **Age Group:** [Primary target]
- **Gender Appeal:** [Male/Female/Universal]
- **Socioeconomic Level:** [Mass/Premium/Luxury]

### Cultural Resonance
- **Saudi Cultural Elements:** [Present/Absent/Strong]
- **Islamic Values Alignment:** [X/10]
- **Family Orientation:** [X/10]
- **Local vs. Global Balance:** [Assessment]

### Emotional Connection
- **Primary Emotion:** [Joy/Trust/Excitement/etc.]
- **Aspiration Level:** [X/10]
- **Relatability:** [X/10]

**Audience Appeal Score: [XX/100]**

---

## ⚡ Competitive Positioning

### Market Differentiation
- **Uniqueness Factor:** [X/10]
- **Trend Alignment:** [Current/Outdated/Ahead]
- **Category Norms:** [Follows/Breaks/Redefines]

### Brand Distinctiveness
- **Brand Recognition:** [Immediate/Delayed/Unclear]
- **Competitive Advantage:** [Clear/Moderate/Weak]

**Positioning Score: [XX/100]**

---

## 💡 Detailed Insights & Recommendations

### Visual Appeal
**[XX/100]** - [One sentence assessment]

**Recommendations:**
1. [Specific, actionable recommendation]
2. [Specific, actionable recommendation]
3. [Specific, actionable recommendation]

### Message Clarity  
**[XX/100]** - [One sentence assessment]

**Recommendations:**
1. [Specific, actionable recommendation]
2. [Specific, actionable recommendation]
3. [Specific, actionable recommendation]

### Cultural Appropriateness
**[XX/100]** - [One sentence assessment]

**Recommendations:**
1. [Specific, actionable recommendation]
2. [Specific, actionable recommendation]
3. [Specific, actionable recommendation]

---

## 🧪 A/B Testing Recommendations

### Test 1: [Specific element to test]
[Description of what to test and why]

**Variants:**
• [Variant A description]
• [Variant B description]

**Success Metric:** [What to measure]
**Duration:** [Recommended test length]

### Test 2: [Another element to test]
[Description and rationale]

**Variants:**
• [Variant A description]
• [Variant B description]

**Success Metric:** [What to measure]
**Duration:** [Recommended test length]

---

## 🌟 Final Verdict

> **Overall Assessment:** [2-3 sentence summary of the ad's effectiveness and potential]

**Strengths:**
✅ [Key strength 1]
✅ [Key strength 2]
✅ [Key strength 3]

**Areas for Improvement:**
⚠️ [Key weakness 1]
⚠️ [Key weakness 2]
⚠️ [Key weakness 3]

**Priority Actions:**
1. 🔴 **HIGH:** [Most critical improvement]
2. 🟡 **MEDIUM:** [Important but not urgent]
3. 🟢 **LOW:** [Nice to have enhancement]

Be SPECIFIC, DETAILED, and IMPRESSIVE! Include actual hex codes, specific scores, and actionable insights!`
      }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : 'Unable to analyze creative';
}


/**
 * Enhanced Intelligence Module with Chart Generation
 * Generates outputs with embedded visualization data
 */

import { invokeLLM } from './_core/llm';

interface ChartData {
  type: 'bar' | 'line' | 'pie';
  title: string;
  data: Array<{ name: string; value: number }>;
}

/**
 * Generate analytics with embedded chart data
 */
export async function generateEnhancedAnalytics(query: string): Promise<string> {
  const response = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `You are an expert marketing analyst. Provide comprehensive analytics with specific numbers.

CRITICAL: Include chart data in your response using this format:

\`\`\`chart:bar
{
  "title": "Market Share by Segment",
  "data": [
    {"name": "Segment 1", "value": 35},
    {"name": "Segment 2", "value": 28},
    {"name": "Segment 3", "value": 20}
  ]
}
\`\`\`

\`\`\`chart:line
{
  "title": "Growth Trend",
  "data": [
    {"name": "2020", "value": 45},
    {"name": "2021", "value": 52},
    {"name": "2022", "value": 61}
  ]
}
\`\`\`

\`\`\`chart:pie
{
  "title": "Consumer Demographics",
  "data": [
    {"name": "18-25", "value": 30},
    {"name": "26-35", "value": 40},
    {"name": "36-45", "value": 20}
  ]
}
\`\`\`

FORMATTING RULES:
- Use ## for main sections
- **Bold** key metrics
- Keep paragraphs 2-3 sentences max
- Use > blockquotes for insights
- Add emojis: 📊 📈 💡 ⚡ 🎯
- Include 2-3 charts minimum`
      },
      {
        role: 'user',
        content: `Analyze: ${query}

Structure:
## 📊 Market Overview
[Include market size chart]

## 🎯 Key Segments  
[Include segment breakdown chart]

## 📈 Growth Trends
[Include growth trend chart]

## 👥 Consumer Demographics
[Include demographics chart]

## 💡 Key Insights
> Insight 1
> Insight 2

## ⚡ Opportunities`
      }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : 'Unable to generate analytics';
}

/**
 * Generate research with visualization data
 */
export async function generateEnhancedResearch(query: string): Promise<string> {
  const response = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `You are a consumer research expert using the Four Brains framework.

Include charts in your response:

\`\`\`chart:bar
{
  "title": "Cultural Triggers Strength",
  "data": [
    {"name": "Tradition", "value": 85},
    {"name": "Family", "value": 90},
    {"name": "Religion", "value": 95}
  ]
}
\`\`\`

FORMATTING:
- Use ## for brain categories
- **Bold** key findings
- Use emojis: 🧠 🌍 👁️ 🔮 💡
- Include 2-3 charts
- Keep insights scannable`
      },
      {
        role: 'user',
        content: `Research: ${query}

## 🧠 Cultural Brain
[Cultural triggers chart]

## 👁️ Behavioral Brain  
[Behavior patterns chart]

## 🔮 Predictive Brain
[Trend forecast chart]

## 💡 Generative Brain
[Opportunities chart]`
      }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : 'Unable to generate research';
}

/**
 * Generate strategy with visual data
 */
export async function generateEnhancedStrategy(query: string): Promise<string> {
  const response = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `You are a marketing strategy expert.

Include visualization data:

\`\`\`chart:bar
{
  "title": "Channel Effectiveness",
  "data": [
    {"name": "Social Media", "value": 85},
    {"name": "Search Ads", "value": 72},
    {"name": "Display", "value": 58}
  ]
}
\`\`\`

\`\`\`chart:line
{
  "title": "Budget Allocation Timeline",
  "data": [
    {"name": "Q1", "value": 25000},
    {"name": "Q2", "value": 30000},
    {"name": "Q3", "value": 35000}
  ]
}
\`\`\`

FORMATTING:
- Use ## for strategy sections
- **Bold** KPIs and metrics
- Use emojis: 🎯 📊 💰 ⚡ 🚀
- Include 2-3 charts minimum
- Keep actionable and visual`
      },
      {
        role: 'user',
        content: `Strategy for: ${query}

## 🎯 Objectives
[KPI chart]

## 📊 Channel Strategy
[Channel effectiveness chart]

## 💰 Budget Allocation
[Budget timeline chart]

## ⚡ Tactics

## 🚀 Implementation Timeline`
      }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : 'Unable to generate strategy';
}


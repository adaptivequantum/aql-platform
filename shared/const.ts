export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = 'Please login (10001)';
export const NOT_ADMIN_ERR_MSG = 'You do not have required permission (10002)';

// AQL App branding
export const APP_TAGLINE = "World's First AI Marketing Powerhouse";
export const APP_SUBTITLE = "Born in Saudi 🇸🇦, Built for the World";
export const APP_DESCRIPTION = "Fused with Four Brains: Cultural, Behavioral, Predictive & Generative";

// Module definitions
export const MODULES = [
  { id: 'assist', name: 'Assist AI', description: 'Universal AI assistant for all tasks' },
  { id: 'creative-analysis', name: 'Creative Analysis', description: 'Upload and analyze visual ads with AI' },
  { id: 'analytics', name: 'Analytics', description: 'Market analytics and insights' },
  { id: 'research', name: 'Research', description: 'Four Brains research framework' },
  { id: 'campaigns', name: 'Campaigns', description: 'AI-powered campaign generation' },
  { id: 'focus-groups', name: 'Focus Groups', description: 'Simulated focus group insights' },
  { id: 'channels', name: 'Channels', description: 'Channel optimization strategy' },
  { id: 'trends', name: 'Trends', description: 'Market trend analysis' },
  { id: 'creative', name: 'Creative Studio', description: 'AI image generation' },
  { id: 'video', name: 'Video Studio', description: 'AI video generation' },
  { id: 'brand', name: 'Brand', description: 'Brand intelligence and positioning' },
  { id: 'insights', name: 'Insights', description: 'Deep consumer insights' },
  { id: 'strategy', name: 'Strategy', description: 'Marketing strategy builder' },
] as const;

export type ModuleId = typeof MODULES[number]['id'];

// Research categories
export const RESEARCH_CATEGORIES = [
  {
    id: 'triggers',
    title: 'Triggers & Barriers',
    color: 'orange',
    icon: '🔥',
    description: 'What drives or prevents purchase decisions'
  },
  {
    id: 'habits',
    title: 'Habits & Attitudes',
    color: 'purple',
    icon: '💭',
    description: 'Consumer behaviors and mindsets'
  },
  {
    id: 'behavioral',
    title: 'Behavioral Insights',
    color: 'cyan',
    icon: '🧠',
    description: 'Deep psychological patterns'
  },
  {
    id: 'trends',
    title: 'Market Trends',
    color: 'green',
    icon: '📈',
    description: 'Emerging market movements'
  },
] as const;

export type ResearchCategoryId = typeof RESEARCH_CATEGORIES[number]['id'];

import { invokeLLM } from "./_core/llm";
import { generateImage, generateVideo } from "./replicate";
import { 
  generateAnalytics,
  generateResearch,
  generateCampaign,
  generateFocusGroup,
  generateChannelStrategy,
  generateTrends,
  generateBrandIntelligence,
  generateStrategy,
  generateInsights
} from "./intelligence";

/**
 * Universal AI Assistant that can handle any request
 * Routes to appropriate function based on user intent
 */
export async function handleAssistAI(userMessage: string): Promise<string> {
  try {
    // First, use LLM to determine user intent
    const intentResponse = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are an intent classifier for AQL platform. Analyze the user's message and determine what they want to do.

Available capabilities:
- analytics: Market analysis, data insights, trends analysis
- research: Four Brains research (Cultural, Behavioral, Predictive, Generative)
- campaign: Campaign creation and strategy
- focus_group: Focus group insights and simulations
- channels: Channel optimization strategy
- trends: Trend analysis and forecasting
- brand: Brand intelligence and positioning
- insights: Consumer insights and behavior
- strategy: Marketing strategy development
- image: Generate images, visuals, graphics
- video: Generate videos, animations
- general: General conversation, questions, help

Respond with ONLY the capability name (one word) that best matches the user's intent.`
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    });

    const intentContent = intentResponse.choices[0].message.content;
    const intent = (typeof intentContent === 'string' ? intentContent : '').trim().toLowerCase();

    // Route to appropriate function based on intent
    switch (intent) {
      case 'image':
        return await handleImageGeneration(userMessage);
      
      case 'video':
        return await handleVideoGeneration(userMessage);
      
      case 'analytics':
        return await generateAnalytics(userMessage);
      
      case 'research':
        const researchData = await generateResearch(userMessage);
        return JSON.stringify(researchData);
      
      case 'campaign':
        return await generateCampaign(userMessage);
      
      case 'focus_group':
        return await generateFocusGroup(userMessage);
      
      case 'channels':
        return await generateChannelStrategy(userMessage);
      
      case 'trends':
        return await generateTrends(userMessage);
      
      case 'brand':
        return await generateBrandIntelligence(userMessage);
      
      case 'insights':
        return await generateInsights(userMessage);
      
      case 'strategy':
        return await generateStrategy(userMessage);
      
      case 'general':
      default:
        return await handleGeneralConversation(userMessage);
    }
  } catch (error) {
    console.error('Assist AI error:', error);
    return 'I apologize, but I encountered an error processing your request. Please try again or rephrase your question.';
  }
}

async function handleImageGeneration(userMessage: string): Promise<string> {
  try {
    // Extract image prompt from user message
    const promptResponse = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "Extract the image generation prompt from the user's message. Return ONLY the prompt text, nothing else."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    });

    const promptContent = promptResponse.choices[0].message.content;
    const prompt = (typeof promptContent === 'string' ? promptContent : '').trim();

    // Generate image
    const imageUrl = await generateImage({ prompt });

    return `🎨 **Image Generated Successfully!**

**Prompt:** ${prompt}

![Generated Image](${imageUrl})

**Download:** [Click here to download](${imageUrl})

---

Would you like me to:
- Generate another variation
- Create a video from this concept
- Modify the image
- Generate more images with different styles`;

  } catch (error) {
    console.error('Image generation error:', error);
    return '❌ Sorry, I encountered an error generating the image. Please try again with a different prompt.';
  }
}

async function handleVideoGeneration(userMessage: string): Promise<string> {
  try {
    // Extract video prompt from user message
    const promptResponse = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "Extract the video generation prompt from the user's message. Return ONLY the prompt text, nothing else."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    });

    const promptContent = promptResponse.choices[0].message.content;
    const prompt = (typeof promptContent === 'string' ? promptContent : '').trim();

    // Generate video
    const videoUrl = await generateVideo({ prompt });

    return `🎬 **Video Generated Successfully!**

**Prompt:** ${prompt}

<video controls src="${videoUrl}" style="max-width: 100%; border-radius: 8px;"></video>

**Download:** [Click here to download](${videoUrl})

---

Would you like me to:
- Generate another version
- Create variations with different styles
- Generate images from this concept
- Create a campaign around this video`;

  } catch (error) {
    console.error('Video generation error:', error);
    return '❌ Sorry, I encountered an error generating the video. Please try again with a different prompt.';
  }
}

async function handleGeneralConversation(userMessage: string): Promise<string> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are AQL Assist AI, a universal marketing intelligence assistant. You can help with:

🎯 **Marketing Intelligence:**
- Market analysis and insights
- Consumer behavior research (Four Brains framework)
- Campaign strategy and planning
- Brand intelligence and positioning

🎨 **Creative Generation:**
- Generate images and visuals
- Create videos and animations
- Design marketing materials

📊 **Analytics & Strategy:**
- Trend analysis and forecasting
- Channel optimization
- Focus group insights
- Marketing strategy development

Be helpful, professional, and guide users on what you can do. Use emojis and formatting to make responses engaging.`
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    });

    const responseContent = response.choices[0].message.content;
    return typeof responseContent === 'string' ? responseContent : 'I can help you with marketing intelligence. What would you like to know?';
  } catch (error) {
    console.error('General conversation error:', error);
    return 'I apologize, but I encountered an error. How can I assist you with marketing intelligence, creative generation, or strategy development?';
  }
}


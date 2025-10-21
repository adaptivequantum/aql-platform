/**
 * Replicate API Integration for AQL Platform
 * Handles AI Image and Video Generation
 */

const REPLICATE_API_TOKEN = 'r8_9sxr0In480Oz4YY1tddqpF89OcDeOcZ1Jt39p';
const REPLICATE_API_BASE = 'https://api.replicate.com/v1';

interface ReplicateImageInput {
  prompt: string;
  aspect_ratio?: string;
}

interface ReplicateVideoInput {
  prompt: string;
  duration?: number;
  aspect_ratio?: string;
  generate_audio?: boolean;
}

interface ReplicatePrediction {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  output?: any;
  error?: string;
  urls?: {
    get: string;
    cancel: string;
  };
}

/**
 * Create a prediction on Replicate
 */
async function createPrediction(version: string, input: any): Promise<ReplicatePrediction> {
  const response = await fetch(`${REPLICATE_API_BASE}/predictions`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version,
      input,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Replicate API error: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Get prediction status
 */
async function getPrediction(id: string): Promise<ReplicatePrediction> {
  const response = await fetch(`${REPLICATE_API_BASE}/predictions/${id}`, {
    headers: {
      'Authorization': `Token ${REPLICATE_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Replicate API error: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Wait for prediction to complete
 */
async function waitForPrediction(id: string, maxWaitTime = 180000): Promise<ReplicatePrediction> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < maxWaitTime) {
    const prediction = await getPrediction(id);
    
    if (prediction.status === 'succeeded') {
      return prediction;
    }
    
    if (prediction.status === 'failed' || prediction.status === 'canceled') {
      throw new Error(`Prediction ${prediction.status}: ${prediction.error || 'Unknown error'}`);
    }
    
    // Wait 2 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  throw new Error('Prediction timed out');
}

/**
 * Generate an image using Seedream-4
 */
export async function generateImage(input: ReplicateImageInput): Promise<string> {
  const enhancedPrompt = `${input.prompt}, professional photography, high quality, detailed, 8k`;
  
  const prediction = await createPrediction(
    'bytedance/seedream-4',
    {
      prompt: enhancedPrompt,
      aspect_ratio: input.aspect_ratio || '1:1',
    }
  );

  const result = await waitForPrediction(prediction.id);
  
  if (!result.output || !Array.isArray(result.output) || result.output.length === 0) {
    throw new Error('No image generated');
  }
  
  return result.output[0];
}

/**
 * Generate a video using Google Veo-3
 */
export async function generateVideo(input: ReplicateVideoInput): Promise<string> {
  const prediction = await createPrediction(
    'google/veo-3',
    {
      prompt: input.prompt,
      duration: input.duration || 6,
      aspect_ratio: input.aspect_ratio || '16:9',
      generate_audio: input.generate_audio || false,
    }
  );

  const result = await waitForPrediction(prediction.id, 180000); // 3 minutes max for video
  
  if (!result.output) {
    throw new Error('No video generated');
  }
  
  return result.output;
}


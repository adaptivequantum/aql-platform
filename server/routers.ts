import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { 
  createSession, 
  getSession, 
  getUserSessions, 
  updateSessionTimestamp,
  createMessage,
  getSessionMessages,
  createAsset,
  getUserAssets,
  createProject,
  getUserProjects,
  updateProject,
  deleteProject
} from "./db";
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
} from './intelligence';
import { generateCreativeAnalysis } from './intelligence-creative';
import { generateEnhancedAnalytics, generateEnhancedResearch, generateEnhancedStrategy } from "./enhancedIntelligence";
import { generateImage, generateVideo } from "./replicate";
import { handleAssistAI } from "./assistAI";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Session management - Now public
  sessions: router({
    create: publicProcedure
      .input(z.object({
        module: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Use anonymous user ID if not authenticated
        const userId = ctx.user?.id || 'anonymous';
        const sessionId = `${userId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        return createSession({
          id: sessionId,
          userId: userId,
          module: input.module,
        });
      }),

    list: publicProcedure.query(async ({ ctx }) => {
      const userId = ctx.user?.id || 'anonymous';
      return getUserSessions(userId);
    }),

    get: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => {
        return getSession(input.sessionId);
      }),
  }),

  // Message management - Now public
  messages: router({
    list: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => {
        return getSessionMessages(input.sessionId);
      }),

    send: publicProcedure
      .input(z.object({
        sessionId: z.string(),
        content: z.string(),
        module: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Save user message
        await createMessage({
          sessionId: input.sessionId,
          role: 'user',
          content: input.content,
        });

        // Update session timestamp
        await updateSessionTimestamp(input.sessionId);

        // Generate AI response based on module
        let response = '';
        
        try {
          switch (input.module) {
            case 'assist':
              // Universal assistant - can handle any request including image/video generation
              response = await handleAssistAI(input.content);
              break;
            case 'analytics':
              response = await generateAnalytics(input.content);
              break;
            case 'research':
              response = await generateEnhancedResearch(input.content);
              break;
            case 'campaigns':
              response = await generateCampaign(input.content);
              break;
            case 'focus-groups':
              response = await generateFocusGroup(input.content);
              break;
            case 'channels':
              response = await generateChannelStrategy(input.content);
              break;
            case 'trends':
              response = await generateTrends(input.content);
              break;
            case 'brand':
              response = await generateBrandIntelligence(input.content);
              break;
            case 'insights':
              response = await generateInsights(input.content);
              break;
            case 'strategy':
              response = await generateStrategy(input.content);
              break;
            case 'creative-analysis':
              // For creative analysis, expect image URL in the content
              response = await generateCreativeAnalysis(input.content);
              break;
            default:
              response = 'Module not implemented yet.';
          }
        } catch (error) {
          console.error('Error generating response:', error);
          response = 'Sorry, I encountered an error generating the response. Please try again.';
        }

        // Save assistant message
        const assistantMessage = await createMessage({
          sessionId: input.sessionId,
          role: 'assistant',
          content: response,
        });

        return assistantMessage;
      }),
  }),

  // Creative Studio - Image Generation - Now public
  creative: router({
    generate: publicProcedure
      .input(z.object({
        prompt: z.string(),
        aspectRatio: z.enum(['1:1', '16:9', '9:16']).optional(),
        sessionId: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const imageUrl = await generateImage({
            prompt: input.prompt,
            aspect_ratio: input.aspectRatio,
          });

          // Save asset to database
          const userId = ctx.user?.id || 'anonymous';
          await createAsset({
            userId: userId,
            sessionId: input.sessionId,
            type: 'image',
            prompt: input.prompt,
            url: imageUrl,
            metadata: JSON.stringify({ aspectRatio: input.aspectRatio }),
          });

          return { url: imageUrl };
        } catch (error) {
          console.error('Image generation error:', error);
          throw new Error('Failed to generate image. Please try again.');
        }
      }),

    list: publicProcedure.query(async ({ ctx }) => {
      const userId = ctx.user?.id || 'anonymous';
      return getUserAssets(userId, 'image');
    }),
  }),

  // Video Studio - Video Generation - Now public
  video: router({
    generate: publicProcedure
      .input(z.object({
        prompt: z.string(),
        duration: z.number().optional(),
        aspectRatio: z.enum(['16:9', '9:16', '1:1']).optional(),
        sessionId: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const videoUrl = await generateVideo({
            prompt: input.prompt,
            duration: input.duration,
            aspect_ratio: input.aspectRatio,
          });

          // Save asset to database
          const userId = ctx.user?.id || 'anonymous';
          await createAsset({
            userId: userId,
            sessionId: input.sessionId,
            type: 'video',
            prompt: input.prompt,
            url: videoUrl,
            metadata: JSON.stringify({ 
              duration: input.duration, 
              aspectRatio: input.aspectRatio 
            }),
          });

          return { url: videoUrl };
        } catch (error) {
          console.error('Video generation error:', error);
          throw new Error('Failed to generate video. Please try again.');
        }
      }),

    list: publicProcedure.query(async ({ ctx }) => {
      const userId = ctx.user?.id || 'anonymous';
      return getUserAssets(userId, 'video');
    }),
  }),

  // Project management - Keep protected for now
  projects: router({
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        type: z.string(),
        content: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createProject({
          userId: ctx.user.id,
          name: input.name,
          type: input.type,
          content: input.content,
        });
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserProjects(ctx.user.id);
    }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        content: z.string().optional(),
        isFavorite: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        await updateProject(input.id, {
          name: input.name,
          content: input.content,
          isFavorite: input.isFavorite,
        });
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteProject(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;


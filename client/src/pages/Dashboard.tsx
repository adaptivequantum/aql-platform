// Auth removed - platform is now publicly accessible
// import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { APP_LOGO } from "@/const";
import { MODULES, RESEARCH_CATEGORIES } from "@shared/const";
import { trpc } from "@/lib/trpc";
import { useLocation, useParams } from "wouter";
import { 
  Brain, BarChart3, Target, Users, TrendingUp, Activity, 
  Sparkles, Video, Award, Eye, Zap, Send, Loader2, Home,
  Image as ImageIcon, Film, Download, Bot, ScanSearch
} from "lucide-react";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { EnhancedMessage } from "@/components/EnhancedMessage";
import { toast } from "sonner";
import { MODULE_SHORTCUTS } from "@/config/moduleShortcuts";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CreativeAnalysisResult } from "@/components/CreativeAnalysisResult";

const moduleIcons: Record<string, any> = {
  'assist': Bot,
  'creative-analysis': ScanSearch,
  'analytics': BarChart3,
  'research': Brain,
  'campaigns': Target,
  'focus-groups': Users,
  'channels': TrendingUp,
  'trends': Activity,
  'creative': Sparkles,
  'video': Video,
  'brand': Award,
  'insights': Eye,
  'strategy': Zap,
};

export default function Dashboard() {
  // Authentication removed - platform is now publicly accessible
  const [, setLocation] = useLocation();
  const params = useParams<{ module?: string }>();
  const activeModule = params.module || 'analytics';

  const [sessionId, setSessionId] = useState<string>('');
  const [message, setMessage] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [videoPrompt, setVideoPrompt] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Create session on mount or when module changes
  const createSessionMutation = trpc.sessions.create.useMutation();
  
  useEffect(() => {
    // Reset session when module changes
    setSessionId('');
    createSessionMutation.mutate(
      { module: activeModule },
      {
        onSuccess: (data) => {
          setSessionId(data.id);
        }
      }
    );
  }, [activeModule]);

  // Get messages for current session
  const { data: messages = [], refetch: refetchMessages } = trpc.messages.list.useQuery(
    { sessionId },
    { enabled: !!sessionId }
  );

  // Send message mutation
  const sendMessageMutation = trpc.messages.send.useMutation({
    onSuccess: () => {
      refetchMessages();
      setMessage('');
    },
    onError: (error) => {
      toast.error('Failed to send message: ' + error.message);
    }
  });

  // Image generation mutation
  const generateImageMutation = trpc.creative.generate.useMutation({
    onSuccess: (data) => {
      toast.success('Image generated successfully!');
      setImagePrompt('');
    },
    onError: (error) => {
      toast.error('Failed to generate image: ' + error.message);
    }
  });

  // Video generation mutation
  const generateVideoMutation = trpc.video.generate.useMutation({
    onSuccess: (data) => {
      toast.success('Video generated successfully!');
      setVideoPrompt('');
    },
    onError: (error) => {
      toast.error('Failed to generate video: ' + error.message);
    }
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !sessionId) return;

    sendMessageMutation.mutate({
      sessionId,
      content: message,
      module: activeModule,
    });
  };

  const handleGenerateImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePrompt.trim()) return;

    generateImageMutation.mutate({
      prompt: imagePrompt,
      aspectRatio: '1:1',
      sessionId,
    });
  };

  const handleGenerateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoPrompt.trim()) return;

    generateVideoMutation.mutate({
      prompt: videoPrompt,
      duration: 6,
      aspectRatio: '16:9',
      sessionId,
    });
  };

  // No authentication required - platform is publicly accessible

  const currentModule = MODULES.find(m => m.id === activeModule);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setLocation('/')}>
            <img src={APP_LOGO} alt="AQL Logo" className="h-16 w-auto" />
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028412667/fRtzjkGcgEbAOHyO.png" 
              alt="Saudi Tech" 
              className="h-7 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {MODULES.map((module) => {
            const Icon = moduleIcons[module.id];
            const isActive = module.id === activeModule;
            return (
              <button
                key={module.id}
                onClick={() => setLocation(`/dashboard/${module.id}`)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-accent text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{module.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              G
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Guest User</p>
              <p className="text-xs text-muted-foreground truncate">Public Access</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => setLocation('/')}
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header with Theme Toggle */}
        <header className="border-b border-border bg-card px-6 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{currentModule?.name}</h1>
          <ThemeToggle />
        </header>
        
        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            {currentModule && (
              <div className="border-b border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = moduleIcons[currentModule.id];
                    return <Icon className="h-6 w-6 text-primary" />;
                  })()}
                  <div>
                    <p className="text-sm text-muted-foreground">{currentModule.description}</p>
                  </div>
                </div>
              </div>
            )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeModule === 'creative-analysis' ? (
            // Creative Analysis - Expert Visual Ad Analysis with Image Upload
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Image Upload Section */}
              {messages.length === 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    Upload Visual Ad for Analysis
                  </h3>
                  <div className="space-y-4">
                    <div 
                      className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center bg-gradient-to-br from-purple-500/5 to-pink-500/5 hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => document.getElementById('ad-upload-input')?.click()}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        id="ad-upload-input"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = async (event) => {
                              const imageData = event.target?.result as string;
                              setUploadedImage(imageData);
                              toast.success('Image uploaded! Analyzing...');
                              // Send analysis request
                              const analysisPrompt = `Analyze this visual advertisement comprehensively.`;
                              sendMessageMutation.mutate({
                                sessionId,
                                content: analysisPrompt,
                                module: activeModule,
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <ImageIcon className="h-16 w-16 mx-auto mb-4 text-primary/60" />
                      <p className="text-lg font-medium mb-2">Click to upload your visual ad</p>
                      <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                      <p className="text-xs text-muted-foreground mt-2">Get comprehensive AI analysis instantly</p>
                    </div>
                  </div>
                </Card>
              )}
              
              {/* Quick Start Prompts */}
              {messages.length === 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Or Try Quick Analysis Prompts
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Analyze a Ramadan campaign visual ad',
                      'Review a food delivery app banner',
                      'Evaluate a luxury car advertisement',
                      'Assess a real estate billboard design',
                      'Critique a fashion brand social media ad',
                      'Review a tech product launch visual',
                    ].map((prompt, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="h-auto min-h-[70px] p-4 text-left justify-start hover:bg-primary/10 hover:border-primary transition-all text-sm leading-relaxed"
                        onClick={() => setMessage(prompt)}
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                </Card>
              )}

              {/* Chat Interface */}
              <Card className="p-6">
                <div className="space-y-4 mb-4 max-h-[500px] overflow-y-auto">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-4 break-words ${
                          msg.role === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        {msg.role === 'assistant' ? (
                          activeModule === 'creative-analysis' && msg.content.startsWith('{') ? (
                            <CreativeAnalysisResult 
                              data={JSON.parse(msg.content)} 
                              uploadedImage={uploadedImage}
                            />
                          ) : (
                            <EnhancedMessage content={msg.content} moduleId={activeModule} sessionId={sessionId} />
                          )
                        ) : (
                          <div className="text-sm">{msg.content}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  {sendMessageMutation.isPending && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-4">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <p className="text-sm mt-2">Analyzing...</p>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your visual ad for expert analysis..."
                    disabled={sendMessageMutation.isPending}
                  />
                  <Button 
                    type="submit" 
                    disabled={!message.trim() || sendMessageMutation.isPending}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </Card>
            </div>
          ) : activeModule === 'creative' ? (
            // Creative Studio - Image Generation
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  Generate AI Images
                </h3>
                <form onSubmit={handleGenerateImage} className="space-y-4">
                  <Textarea
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="Describe the image you want to generate... (e.g., 'burger, professional food photography')"
                    rows={4}
                    disabled={generateImageMutation.isPending}
                  />
                  <Button 
                    type="submit" 
                    disabled={!imagePrompt.trim() || generateImageMutation.isPending}
                    className="w-full"
                  >
                    {generateImageMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating Image...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Image
                      </>
                    )}
                  </Button>
                </form>
              </Card>

              {generateImageMutation.data && (
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">Generated Image</h3>
                  <img 
                    src={generateImageMutation.data.url} 
                    alt="Generated" 
                    className="w-full rounded-lg shadow-lg"
                  />
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => window.open(generateImageMutation.data!.url, '_blank')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Image
                  </Button>
                </Card>
              )}
            </div>
          ) : activeModule === 'video' ? (
            // Video Studio - Video Generation
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Film className="h-5 w-5 text-primary" />
                  Generate AI Videos
                </h3>
                <form onSubmit={handleGenerateVideo} className="space-y-4">
                  <Textarea
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    placeholder="Describe the video you want to generate... (e.g., 'burger commercial, professional marketing video')"
                    rows={4}
                    disabled={generateVideoMutation.isPending}
                  />
                  <Button 
                    type="submit" 
                    disabled={!videoPrompt.trim() || generateVideoMutation.isPending}
                    className="w-full"
                  >
                    {generateVideoMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating Video (60-90s)...
                      </>
                    ) : (
                      <>
                        <Video className="h-4 w-4 mr-2" />
                        Generate Video
                      </>
                    )}
                  </Button>
                </form>
              </Card>

              {generateVideoMutation.data && (
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">Generated Video</h3>
                  <video 
                    src={generateVideoMutation.data.url} 
                    controls 
                    className="w-full rounded-lg shadow-lg"
                  />
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => window.open(generateVideoMutation.data!.url, '_blank')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Video
                  </Button>
                </Card>
              )}
            </div>
          ) : activeModule === 'research' ? (
            // Research Module with Four Brains
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {RESEARCH_CATEGORIES.map((category) => (
                  <Card 
                    key={category.id}
                    className={`p-4 border-2 border-${category.color}-500/30 bg-gradient-to-br from-${category.color}-500/5 to-transparent`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="font-bold text-lg">{category.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </Card>
                ))}
              </div>

              {/* Chat Interface */}
              <Card className="p-6">
                <div className="space-y-4 mb-4 max-h-[500px] overflow-y-auto">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-4 break-words ${
                          msg.role === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        {msg.role === 'assistant' && msg.content.startsWith('[{') ? (
                          // Research results
                          <div className="space-y-4">
                            {JSON.parse(msg.content).map((cat: any, idx: number) => (
                              <div key={idx}>
                                <h4 className="font-bold mb-2">{RESEARCH_CATEGORIES.find(c => c.id === cat.id)?.title}</h4>
                                <ul className="list-disc list-inside space-y-1">
                                  {cat.insights.map((insight: string, i: number) => (
                                    <li key={i} className="text-sm">{insight}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ) : msg.role === 'assistant' ? (
                          <div className="w-full">
                            <EnhancedMessage 
                              content={msg.content} 
                              moduleId={activeModule}
                              sessionId={sessionId}
                            />
                          </div>
                        ) : (
                          <div className="text-sm">{msg.content}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  {sendMessageMutation.isPending && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-4">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about consumer behavior, triggers, habits, or trends..."
                    disabled={sendMessageMutation.isPending}
                  />
                  <Button 
                    type="submit" 
                    disabled={!message.trim() || sendMessageMutation.isPending}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </Card>
            </div>
          ) : (
            // Other Modules - Chat Interface
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Module Prompt Shortcuts - Show when no messages */}
              {messages.length === 0 && MODULE_SHORTCUTS[activeModule as keyof typeof MODULE_SHORTCUTS] && (
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Quick Start Prompts
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {MODULE_SHORTCUTS[activeModule as keyof typeof MODULE_SHORTCUTS].map((prompt, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="h-auto min-h-[70px] p-4 text-left justify-start hover:bg-primary/10 hover:border-primary transition-all text-sm leading-relaxed"
                        onClick={() => setMessage(prompt)}
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                </Card>
              )}

              {/* Assist AI Prompt Shortcuts */}
              {activeModule === 'assist' && messages.length === 0 && (
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-400" />
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { text: 'Show me the command center dashboard', icon: '📊' },
                        { text: 'Generate a Ramadan campaign strategy', icon: '🌙' },
                        { text: 'Create a product image for burger', icon: '🎨' },
                        { text: 'Generate a promotional video', icon: '🎬' },
                        { text: 'Analyze F&B market in Saudi Arabia', icon: '📈' },
                        { text: 'Run focus group for new beverage', icon: '👥' },
                      ].map((action, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          className="h-[100px] p-4 text-left justify-start hover:bg-primary/10 hover:border-primary transition-all flex items-start"
                          onClick={() => setMessage(action.text)}
                        >
                          <span className="text-2xl mr-3 flex-shrink-0 mt-1">{action.icon}</span>
                          <span className="text-sm flex-1 leading-relaxed">{action.text}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Research Explorer */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Brain className="h-5 w-5 text-blue-400" />
                      Research Explorer
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {[
                        {
                          title: '⚡ Triggers & Barriers',
                          color: 'orange',
                          prompts: [
                            'What triggers juice purchases in Saudi Arabia?',
                            'What are barriers to healthy eating?',
                            'Analyze purchase triggers for fast food',
                          ]
                        },
                        {
                          title: '👁️ Habits & Attitudes',
                          color: 'purple',
                          prompts: [
                            'Analyze eating habits in Ramadan',
                            'Consumer attitudes toward organic food',
                            'Daily beverage consumption patterns',
                          ]
                        },
                        {
                          title: '🔮 Behavioral Insights',
                          color: 'cyan',
                          prompts: [
                            'Shopping behavior in Saudi supermarkets',
                            'Brand loyalty patterns in F&B',
                            'Impulse buying triggers for snacks',
                          ]
                        },
                        {
                          title: '📈 Market Trends',
                          color: 'green',
                          prompts: [
                            'Latest F&B trends in Saudi Arabia',
                            'Growing food categories in 2025',
                            'Emerging health food trends',
                          ]
                        },
                      ].map((category, idx) => (
                        <Card key={idx} className="p-4 border-2 border-border/50 bg-card/50">
                          <h4 className="font-bold mb-3 text-base">{category.title}</h4>
                          <div className="space-y-2">
                            {category.prompts.map((prompt, pIdx) => (
                              <Button
                                key={pIdx}
                                variant="ghost"
                                size="sm"
                                className="w-full text-left justify-start h-auto min-h-[60px] p-3 text-sm hover:bg-primary/10 whitespace-normal leading-relaxed"
                                onClick={() => setMessage(prompt)}
                              >
                                {prompt}
                              </Button>
                            ))}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Creative Studio */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-pink-400" />
                      Creative Studio
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { text: 'Generate burger product image', icon: '🍔' },
                        { text: 'Create Ramadan social post', icon: '📱' },
                        { text: 'Design healthy lifestyle visual', icon: '🎨' },
                        { text: 'Generate beverage launch video', icon: '🎥' },
                        { text: 'Create Saudi cafe brand assets', icon: '☕' },
                        { text: 'Generate summer sale promo', icon: '🌞' },
                      ].map((action, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          className="h-[100px] p-4 text-left justify-start hover:bg-primary/10 hover:border-primary transition-all flex items-start"
                          onClick={() => setMessage(action.text)}
                        >
                          <span className="text-2xl mr-3 flex-shrink-0 mt-1">{action.icon}</span>
                          <span className="text-sm flex-1 leading-relaxed">{action.text}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}


              <Card className="p-6">
                <div className="space-y-4 mb-4 max-h-[600px] overflow-y-auto">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-4 break-words ${
                          msg.role === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        {msg.role === 'assistant' ? (
                          <EnhancedMessage 
                            content={msg.content} 
                            moduleId={activeModule}
                            sessionId={sessionId}
                          />
                        ) : (
                          <div className="text-sm">{msg.content}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  {sendMessageMutation.isPending && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-4">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Ask ${currentModule?.name} a question...`}
                    disabled={sendMessageMutation.isPending}
                  />
                  <Button 
                    type="submit" 
                    disabled={!message.trim() || sendMessageMutation.isPending}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </Card>
            </div>
          )}
        </div>
          </div>
        </div>
      </main>
    </div>
  );
}


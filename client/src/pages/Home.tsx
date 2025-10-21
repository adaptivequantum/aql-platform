import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { APP_TAGLINE, APP_SUBTITLE, APP_DESCRIPTION, MODULES } from "@shared/const";
import { useLocation } from "wouter";
import { 
  Brain, BarChart3, Target, Users, TrendingUp, Activity, 
  Sparkles, Video, Award, Eye, Zap, ArrowRight, Loader2, Bot,
  BrainCircuit, BrainCog, ScanSearch
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BackToTop } from "@/components/BackToTop";

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

export default function Home() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
    setLocation('/dashboard/assist');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={APP_LOGO} alt="AQL Logo" className="h-16 w-auto" />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button onClick={() => setLocation('/command-center')} variant="default">
                Command Center
              </Button>
              <Button onClick={handleGetStarted} variant="outline">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 py-20 text-center overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />
        <div className="relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <img src={APP_LOGO} alt="AQL Logo" className="h-48 md:h-64 w-auto" />
            <div className="space-y-3">
              <p className="text-xl md:text-2xl text-foreground/90 font-medium">
                {APP_TAGLINE}
              </p>
              
              {/* Saudi Tech Logo */}
              <div className="flex justify-center py-4">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028412667/ZJaSILaKzqpyoNia.png" 
                  alt="Saudi Tech" 
                  className="h-16 md:h-20 w-auto opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
              
              <p className="text-base md:text-lg text-muted-foreground">
                {APP_SUBTITLE}
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                {APP_DESCRIPTION}
              </p>
            </div>
          </div>
          <div className="pt-8">
            <Button 
              onClick={handleGetStarted} 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        </div>
      </section>

      {/* Four Brains Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Powered by <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Four Brains</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Cultural Brain', Icon: Brain, color: 'from-orange-500 to-red-500', desc: 'Cultural values and traditions' },
              { title: 'Behavioral Brain', Icon: Brain, color: 'from-purple-500 to-pink-500', desc: 'Observable actions and patterns' },
              { title: 'Predictive Brain', Icon: Brain, color: 'from-cyan-500 to-blue-500', desc: 'Future trends and forecasting' },
              { title: 'Generative Brain', Icon: Brain, color: 'from-green-500 to-emerald-500', desc: 'Creative insights and opportunities' },
            ].map((brain, idx) => {
              const BrainIcon = brain.Icon;
              return (
                <div 
                  key={idx} 
                  onClick={() => setLocation('/dashboard/research')}
                  className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${brain.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <div className="relative z-10 space-y-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${brain.color} w-fit`}>
                      <BrainIcon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{brain.title}</h3>
                    <p className="text-sm text-muted-foreground">{brain.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 py-16 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                13
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">
                AI Modules
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                4
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">
                Brain Types
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                80+
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">
                Quick Prompts
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                ∞
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">
                Possibilities
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            11 AI-Powered Modules
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Everything you need for comprehensive marketing intelligence
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((module) => {
              const Icon = moduleIcons[module.id];
              return (
                <div 
                  key={module.id}
                  onClick={() => setLocation(`/dashboard/${module.id}`)}
                  className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{module.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-12 border border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join the AI marketing revolution. Start generating insights, campaigns, and creative content in minutes.
          </p>
          <Button 
            onClick={handleGetStarted} 
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Start Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={APP_LOGO} alt="AQL Logo" className="h-8 w-auto" />
              <div>
                <p className="text-sm font-medium text-foreground">AQL Platform</p>
                <p className="text-xs text-muted-foreground">© 2025 All Rights Reserved</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              Built in Saudi Arabia 🇸🇦 for the World
            </p>
          </div>
        </div>
      </footer>
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}


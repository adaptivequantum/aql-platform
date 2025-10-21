import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_LOGO } from "@/const";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { 
  TrendingUp, DollarSign, Target, Users, Zap, Activity, 
  BarChart3, PieChart, ArrowUpRight, ArrowDownRight,
  Sparkles, Video, Brain, Eye, Home, RefreshCw
} from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { DataVisualization } from "@/components/DataVisualization";
import { useState } from "react";

export default function CommandCenter() {
  // Authentication is now optional - platform is publicly accessible
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [refreshKey, setRefreshKey] = useState(0);

  // Mock data - in production, this would come from tRPC queries
  const revenueData = [
    { name: 'Jan', value: 45000 },
    { name: 'Feb', value: 52000 },
    { name: 'Mar', value: 48000 },
    { name: 'Apr', value: 61000 },
    { name: 'May', value: 55000 },
    { name: 'Jun', value: 67000 },
  ];

  const campaignPerformance = [
    { name: 'Social Media', value: 35 },
    { name: 'Search Ads', value: 28 },
    { name: 'Display', value: 20 },
    { name: 'Email', value: 12 },
    { name: 'Other', value: 5 },
  ];

  const conversionData = [
    { name: 'Week 1', value: 3.2 },
    { name: 'Week 2', value: 3.8 },
    { name: 'Week 3', value: 4.1 },
    { name: 'Week 4', value: 4.5 },
  ];

  const aiActivities = [
    { module: 'Analytics', action: 'Generated F&B market analysis', time: '2 hours ago', icon: BarChart3, color: 'text-blue-400' },
    { module: 'Creative Studio', action: 'Created 3 product images', time: '5 hours ago', icon: Sparkles, color: 'text-purple-400' },
    { module: 'Strategy', action: 'Built campaign strategy for Ramadan', time: '1 day ago', icon: Target, color: 'text-orange-400' },
    { module: 'Research', action: 'Four Brains analysis completed', time: '1 day ago', icon: Brain, color: 'text-cyan-400' },
    { module: 'Video Studio', action: 'Generated promotional video', time: '2 days ago', icon: Video, color: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={APP_LOGO} alt="AQL" className="h-10 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Command Center</h1>
                <p className="text-sm text-muted-foreground">Real-time platform intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRefreshKey(prev => prev + 1)}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLocation('/')}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Key Performance Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Revenue"
              value="$328K"
              icon={DollarSign}
              trend={{ value: 12.5, isPositive: true }}
              color="text-green-400"
            />
            <StatsCard
              title="Active Campaigns"
              value="24"
              icon={Target}
              trend={{ value: 8.3, isPositive: true }}
              color="text-blue-400"
            />
            <StatsCard
              title="Conversion Rate"
              value="4.5%"
              icon={TrendingUp}
              trend={{ value: 15.2, isPositive: true }}
              color="text-purple-400"
            />
            <StatsCard
              title="AI Tasks Completed"
              value="156"
              icon={Zap}
              trend={{ value: 23.1, isPositive: true }}
              color="text-orange-400"
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DataVisualization
            data={revenueData}
            type="line"
            title="📈 Revenue Trend (Last 6 Months)"
          />
          <DataVisualization
            data={campaignPerformance}
            type="pie"
            title="🎯 Campaign Performance by Channel"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DataVisualization
            data={conversionData}
            type="bar"
            title="📊 Conversion Rate Optimization"
          />
          
          {/* Media Optimization Stats */}
          <Card className="p-6 bg-card border-border/50">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AQL Media Optimization
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Images Generated</p>
                  <p className="text-2xl font-bold text-foreground">47</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/10">
                  <Sparkles className="h-6 w-6 text-purple-400" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Videos Created</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/10">
                  <Video className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cost Savings</p>
                  <p className="text-2xl font-bold text-green-400">$18.5K</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/10">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent AI Activity */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Recent AI Activity
          </h2>
          <Card className="p-6 bg-card border-border/50">
            <div className="space-y-4">
              {aiActivities.map((activity, idx) => {
                const Icon = activity.icon;
                return (
                  <div 
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10`}>
                      <Icon className={`h-5 w-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{activity.module}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center gap-2"
              onClick={() => setLocation('/dashboard/analytics')}
            >
              <BarChart3 className="h-8 w-8 text-blue-400" />
              <span className="font-semibold">Run Analytics</span>
              <span className="text-xs text-muted-foreground">Market insights</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center gap-2"
              onClick={() => setLocation('/dashboard/campaigns')}
            >
              <Target className="h-8 w-8 text-orange-400" />
              <span className="font-semibold">Create Campaign</span>
              <span className="text-xs text-muted-foreground">AI-powered strategy</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center gap-2"
              onClick={() => setLocation('/dashboard/creative')}
            >
              <Sparkles className="h-8 w-8 text-purple-400" />
              <span className="font-semibold">Generate Media</span>
              <span className="text-xs text-muted-foreground">Images & videos</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}


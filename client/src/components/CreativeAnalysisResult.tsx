import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ColorSwatch {
  hex: string;
  name: string;
  usage: string;
}

interface AnalysisScores {
  visualAppeal: number;
  messageClarity: number;
  culturalFit: number;
  brandConsistency: number;
  engagement: number;
}

interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  text: string;
}

interface CreativeAnalysisData {
  overallScore: number;
  colorPalette: ColorSwatch[];
  scores: AnalysisScores;
  keyInsights: string[];
  recommendations: Recommendation[];
  typography?: {
    headline: string;
    body: string;
    readability: number;
  };
}

interface Props {
  data: CreativeAnalysisData;
  uploadedImage?: string | null;
}

export function CreativeAnalysisResult({ data, uploadedImage }: Props) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 75) return 'text-cyan-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-4">
      {/* Uploaded Image Preview */}
      {uploadedImage && (
        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Analyzing This Visual</h3>
          <img 
            src={uploadedImage} 
            alt="Uploaded ad" 
            className="w-full max-h-96 object-contain rounded-lg border border-border"
          />
        </Card>
      )}

      {/* Overall Score - Big and Bold */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="text-center">
          <div className={`text-6xl font-bold mb-2 ${getScoreColor(data.overallScore)}`}>
            {data.overallScore}
          </div>
          <div className="text-lg text-muted-foreground">Overall Performance Score</div>
          <Progress value={data.overallScore} className="mt-4 h-3" />
        </div>
      </Card>

      {/* Color Palette - Visual Swatches */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">🎨 Color Palette</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {data.colorPalette.map((color, idx) => (
            <div key={idx} className="text-center space-y-2">
              <div 
                className="w-16 h-16 rounded-full mx-auto border-4 border-border shadow-lg"
                style={{ backgroundColor: color.hex }}
              />
              <div className="text-sm font-mono font-bold">{color.hex}</div>
              <div className="text-xs font-semibold text-muted-foreground">{color.name}</div>
              <div className="text-xs text-muted-foreground">{color.usage}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Detailed Scores - Compact Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(data.scores).map(([key, value]) => (
          <Card key={key} className="p-4">
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className={`text-3xl font-bold ${getScoreColor(value)}`}>
                {value}
              </div>
              <Progress value={value} className="h-2" />
            </div>
          </Card>
        ))}
      </div>

      {/* Key Insights - Compact List */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">💡 Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.keyInsights.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-primary/5">
              <span className="text-primary font-bold">✓</span>
              <span className="text-sm">{insight}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations - Priority Badges */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">🎯 Recommendations</h3>
        <div className="space-y-3">
          {data.recommendations.map((rec, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-border">
              <Badge className={`${getPriorityColor(rec.priority)} uppercase text-xs font-bold`}>
                {rec.priority}
              </Badge>
              <span className="text-sm flex-1">{rec.text}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Typography Info - If Available */}
      {data.typography && (
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">📝 Typography</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Headline Font</div>
              <div className="text-sm font-semibold">{data.typography.headline}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Body Font</div>
              <div className="text-sm font-semibold">{data.typography.body}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Readability</div>
              <div className={`text-2xl font-bold ${getScoreColor(data.typography.readability * 10)}`}>
                {data.typography.readability}/10
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}


import { Card } from './ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, color = 'text-primary' }: StatsCardProps) {
  return (
    <Card className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </Card>
  );
}


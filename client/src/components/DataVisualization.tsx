import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from './ui/card';

interface DataVisualizationProps {
  data: any[];
  type: 'bar' | 'line' | 'pie';
  title?: string;
  colors?: string[];
}

const DEFAULT_COLORS = [
  '#6366f1', // Primary purple
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#10b981', // Green
  '#f59e0b', // Orange
  '#ef4444', // Red
  '#ec4899', // Pink
];

export function DataVisualization({ data, type, title, colors = DEFAULT_COLORS }: DataVisualizationProps) {
  if (!data || data.length === 0) return null;

  return (
    <Card className="p-6 bg-card border-border/50">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      )}
      
      <ResponsiveContainer width="100%" height={300}>
        {type === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="value" fill={colors[0]} radius={[8, 8, 0, 0]} />
          </BarChart>
        ) : type === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={colors[0]} 
              strokeWidth={3}
              dot={{ fill: colors[0], r: 6 }}
            />
          </LineChart>
        ) : type === 'pie' ? (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        ) : <div />}
      </ResponsiveContainer>
    </Card>
  );
}


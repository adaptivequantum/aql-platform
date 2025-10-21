import ReactMarkdown from 'react-markdown';
import { Download, TrendingUp, AlertCircle, CheckCircle, Lightbulb, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ChartRenderer } from './ChartRenderer';

interface EnhancedMessageProps {
  content: string;
  moduleId: string;
  sessionId: string;
}

export function EnhancedMessage({ content, moduleId, sessionId }: EnhancedMessageProps) {
  
  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    
    // Add AQL header
    doc.setFontSize(20);
    doc.setTextColor(99, 102, 241); // Purple color
    doc.text('AQL Platform', margin, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Module: ${moduleId.charAt(0).toUpperCase() + moduleId.slice(1)}`, margin, 30);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, 37);
    
    // Add content
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    // Split content into lines and add to PDF
    const lines = doc.splitTextToSize(content, maxWidth);
    let yPosition = 50;
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.getHeight();
    
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
    
    // Save PDF
    doc.save(`AQL-${moduleId}-${Date.now()}.pdf`);
  };

  // Parse chart data from content
  const parseCharts = (text: string) => {
    const chartRegex = /```chart:(bar|line|pie)\n({[\s\S]*?})\n```/g;
    const charts: Array<{ type: 'bar' | 'line' | 'pie'; title: string; data: any[] }> = [];
    let match;
    
    while ((match = chartRegex.exec(text)) !== null) {
      try {
        const chartData = JSON.parse(match[2]);
        charts.push({
          type: match[1] as 'bar' | 'line' | 'pie',
          title: chartData.title,
          data: chartData.data
        });
      } catch (e) {
        console.error('Failed to parse chart data:', e);
      }
    }
    
    return { charts, cleanContent: text.replace(chartRegex, '') };
  };
  
  const { charts, cleanContent } = parseCharts(content);

  // Enhanced markdown rendering with custom components
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card border-border/50">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold mt-6 mb-3 text-foreground flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold mt-4 mb-2 text-foreground/90 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-400" />
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-foreground/80 leading-relaxed mb-4">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 mb-4">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="flex items-start gap-2 text-foreground/80">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>{children}</span>
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-primary">
                  {children}
                </strong>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 bg-primary/5 rounded-r">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div className="text-foreground/90">{children}</div>
                  </div>
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-primary">
                  {children}
                </code>
              ),
            }}
          >
            {cleanContent}
          </ReactMarkdown>
        </div>
      </Card>
      
      {/* Render charts */}
      {charts.map((chart, idx) => (
        <ChartRenderer
          key={idx}
          type={chart.type}
          title={chart.title}
          data={chart.data}
        />
      ))}
      
      <div className="flex justify-end">
        <Button
          onClick={downloadPDF}
          variant="outline"
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Download as PDF
        </Button>
      </div>
    </div>
  );
}


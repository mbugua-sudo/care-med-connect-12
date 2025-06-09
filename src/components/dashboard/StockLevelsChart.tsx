
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface StockLevelsChartProps {
  data: Array<{
    name: string;
    currentStock: number;
    minStock: number;
    maxStock: number;
    status: 'high' | 'medium' | 'low' | 'out';
  }>;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'high': return '#10b981'; // emerald-500
    case 'medium': return '#f59e0b'; // amber-500  
    case 'low': return '#ef4444'; // red-500
    case 'out': return '#6b7280'; // gray-500
    default: return '#3b82f6'; // blue-500
  }
};

const chartConfig = {
  currentStock: {
    label: "Current Stock",
    color: "hsl(var(--primary))",
  },
  minStock: {
    label: "Minimum Stock",
    color: "hsl(var(--muted-foreground))",
  },
};

export const StockLevelsChart: React.FC<StockLevelsChartProps> = ({ data }) => {
  const chartData = data.slice(0, 10); // Show top 10 for readability

  return (
    <ChartContainer config={chartConfig} className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis />
          <ChartTooltip 
            content={<ChartTooltipContent />}
            formatter={(value, name, props) => [
              value,
              name === 'currentStock' ? 'Current Stock' : 'Min Stock',
              getStatusColor(props.payload.status)
            ]}
          />
          <Bar dataKey="currentStock" name="Current Stock" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
            ))}
          </Bar>
          <Bar dataKey="minStock" name="Min Stock" fill="hsl(var(--muted))" opacity={0.6} radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

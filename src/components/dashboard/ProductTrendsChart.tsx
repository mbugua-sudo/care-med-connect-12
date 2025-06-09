
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface ProductTrendsChartProps {
  data: Array<{
    name: string;
    data: Array<{
      month: string;
      sales: number;
    }>;
  }>;
}

const COLORS = [
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#8b5cf6', // violet-500
  '#06b6d4', // cyan-500
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
};

export const ProductTrendsChart: React.FC<ProductTrendsChartProps> = ({ data }) => {
  // Transform data for line chart
  const months = data[0]?.data.map(d => d.month) || [];
  const chartData = months.map(month => {
    const dataPoint: any = { month };
    data.forEach(product => {
      const monthData = product.data.find(d => d.month === month);
      dataPoint[product.name] = monthData?.sales || 0;
    });
    return dataPoint;
  });

  return (
    <div className="relative">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/20 to-emerald-50/20 rounded-xl -z-10"></div>
      
      <ChartContainer config={chartConfig} className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            {/* Enhanced grid with subtle styling */}
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              opacity={0.3}
              horizontal={true}
              vertical={false}
            />
            
            {/* Styled axes */}
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={{ stroke: 'hsl(var(--border))' }}
            />
            
            {/* Enhanced tooltip */}
            <ChartTooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-2xl">
                      <p className="font-semibold text-foreground mb-2">{label}</p>
                      {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2 mb-1">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm text-muted-foreground">{entry.dataKey}:</span>
                          <span className="text-sm font-medium">{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            
            {/* Enhanced legend */}
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            
            {/* Enhanced lines with gradients and animations */}
            {data.map((product, index) => (
              <Line
                key={product.name}
                type="monotone"
                dataKey={product.name}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={3}
                dot={{ 
                  r: 6, 
                  fill: COLORS[index % COLORS.length],
                  strokeWidth: 2,
                  stroke: '#fff'
                }}
                activeDot={{ 
                  r: 8, 
                  fill: COLORS[index % COLORS.length],
                  stroke: '#fff',
                  strokeWidth: 3,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                }}
                strokeDasharray={index === 0 ? "0" : "5 5"}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};


import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface SlowestSellingChartProps {
  data: Array<{
    name: string;
    sales: number;
    daysInStock: number;
  }>;
}

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#8b5cf6", // violet-500
  },
  daysInStock: {
    label: "Days in Stock",
    color: "#6366f1", // indigo-500
  },
};

export const SlowestSellingChart: React.FC<SlowestSellingChartProps> = ({ data }) => {
  // Normalize data for radar chart (scale to 0-100)
  const maxSales = Math.max(...data.map(d => d.sales));
  const maxDays = Math.max(...data.map(d => d.daysInStock));
  
  const radarData = data.map(item => ({
    medicine: item.name.length > 8 ? item.name.substring(0, 8) + '...' : item.name,
    sales: (item.sales / maxSales) * 100,
    daysInStock: (item.daysInStock / maxDays) * 100,
    originalSales: item.sales,
    originalDays: item.daysInStock
  }));

  return (
    <div className="w-full h-full">
      <ChartContainer config={chartConfig} className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
            <PolarGrid stroke="hsl(var(--border))" strokeWidth={1} />
            <PolarAngleAxis 
              dataKey="medicine" 
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              className="text-xs"
            />
            <PolarRadiusAxis 
              domain={[0, 100]} 
              tick={{ fontSize: 8, fill: 'hsl(var(--muted-foreground))' }}
              tickCount={4}
            />
            <Radar
              name="Sales (Normalized)"
              dataKey="sales"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.3}
              strokeWidth={2}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
            />
            <Radar
              name="Days in Stock (Normalized)"
              dataKey="daysInStock"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.1}
              strokeWidth={2}
              dot={{ fill: '#6366f1', strokeWidth: 2, r: 3 }}
            />
            <ChartTooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-semibold text-sm">{label}</p>
                      <p className="text-xs text-muted-foreground">Sales: <span className="text-foreground font-medium">{data.originalSales}</span></p>
                      <p className="text-xs text-muted-foreground">Days in Stock: <span className="text-foreground font-medium">{data.originalDays}</span></p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

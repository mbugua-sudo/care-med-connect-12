
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
    medicine: item.name.length > 10 ? item.name.substring(0, 10) + '...' : item.name,
    sales: (item.sales / maxSales) * 100,
    daysInStock: (item.daysInStock / maxDays) * 100,
    originalSales: item.sales,
    originalDays: item.daysInStock
  }));

  return (
    <ChartContainer config={chartConfig} className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="medicine" tick={{ fontSize: 10 }} />
          <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 8 }} />
          <Radar
            name="Sales (Normalized)"
            dataKey="sales"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Radar
            name="Days in Stock (Normalized)"
            dataKey="daysInStock"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <ChartTooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm">Sales: {data.originalSales}</p>
                    <p className="text-sm">Days in Stock: {data.originalDays}</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

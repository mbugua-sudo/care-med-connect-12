
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface TrendingMedicinesChartProps {
  data: Array<{
    name: string;
    demand: number;
    growth: number;
    category: string;
  }>;
}

const chartConfig = {
  demand: {
    label: "Demand",
    color: "hsl(var(--primary))",
  },
  growth: {
    label: "Growth %",
    color: "hsl(var(--secondary))",
  },
};

const getGrowthColor = (growth: number) => {
  if (growth > 20) return '#10b981'; // emerald-500
  if (growth > 0) return '#3b82f6'; // blue-500
  if (growth > -10) return '#f59e0b'; // amber-500
  return '#ef4444'; // red-500
};

export const TrendingMedicinesChart: React.FC<TrendingMedicinesChartProps> = ({ data }) => {
  const scatterData = data.map(item => ({
    ...item,
    x: item.demand,
    y: item.growth,
    z: Math.abs(item.growth) + 10 // Size based on absolute growth
  }));

  return (
    <ChartContainer config={chartConfig} className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Demand"
            domain={['dataMin - 10', 'dataMax + 10']}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Growth %"
            domain={['dataMin - 5', 'dataMax + 5']}
          />
          <ChartTooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                    <p className="font-semibold">{data.name}</p>
                    <p className="text-sm text-muted-foreground">Category: {data.category}</p>
                    <p className="text-sm">Demand: {data.demand}</p>
                    <p className="text-sm">Growth: {data.growth.toFixed(1)}%</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Scatter dataKey="z" fill="hsl(var(--primary))">
            {scatterData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getGrowthColor(entry.growth)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

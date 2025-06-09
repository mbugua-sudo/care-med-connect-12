
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface CustomerFeedbackChartProps {
  data: Array<{
    product: string;
    rating: number;
    reviews: number;
    sentiment: number;
  }>;
}

const chartConfig = {
  rating: {
    label: "Rating",
    color: "hsl(var(--primary))",
  },
  sentiment: {
    label: "Sentiment",
    color: "hsl(var(--secondary))",
  },
};

const getRatingColor = (rating: number) => {
  if (rating >= 4.5) return '#10b981'; // emerald-500
  if (rating >= 4.0) return '#3b82f6'; // blue-500
  if (rating >= 3.5) return '#f59e0b'; // amber-500
  return '#ef4444'; // red-500
};

export const CustomerFeedbackChart: React.FC<CustomerFeedbackChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    ...item,
    ratingScaled: item.rating * 20, // Scale to 0-100 for better visualization
    sentimentScaled: item.sentiment * 100
  }));

  return (
    <ChartContainer config={chartConfig} className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="product" 
            tick={{ fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis domain={[0, 100]} />
          <ChartTooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm">Rating: {data.rating.toFixed(1)}/5</p>
                    <p className="text-sm">Reviews: {data.reviews}</p>
                    <p className="text-sm">Sentiment: {(data.sentiment * 100).toFixed(0)}%</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="ratingScaled" name="Rating" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getRatingColor(entry.rating)} />
            ))}
          </Bar>
          <Bar dataKey="sentimentScaled" name="Sentiment" fill="hsl(var(--muted))" opacity={0.6} radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};


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

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

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
    <ChartContainer config={chartConfig} className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          {data.map((product, index) => (
            <Line
              key={product.name}
              type="monotone"
              dataKey={product.name}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

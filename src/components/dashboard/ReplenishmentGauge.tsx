
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ReplenishmentGaugeProps {
  value: number; // 0-100
}

export const ReplenishmentGauge: React.FC<ReplenishmentGaugeProps> = ({ value }) => {
  const data = [
    { name: 'Progress', value: value },
    { name: 'Remaining', value: 100 - value }
  ];

  const getColor = (value: number) => {
    if (value >= 80) return '#10b981'; // emerald-500
    if (value >= 60) return '#3b82f6'; // blue-500
    if (value >= 40) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  const getStatus = (value: number) => {
    if (value >= 80) return 'Excellent';
    if (value >= 60) return 'Good';
    if (value >= 40) return 'Fair';
    return 'Needs Attention';
  };

  return (
    <div className="relative h-80 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="60%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
          >
            <Cell fill={getColor(value)} />
            <Cell fill="hsl(var(--muted))" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center mt-8">
          <div className="text-3xl font-bold" style={{ color: getColor(value) }}>
            {value}%
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {getStatus(value)}
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm font-medium">Replenishment Score</p>
        <p className="text-xs text-muted-foreground">
          Based on sales trends and stock levels
        </p>
      </div>
    </div>
  );
};

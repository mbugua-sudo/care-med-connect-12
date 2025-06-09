
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

  const getGradientId = (value: number) => {
    if (value >= 80) return 'excellentGradient';
    if (value >= 60) return 'goodGradient';
    if (value >= 40) return 'fairGradient';
    return 'needsAttentionGradient';
  };

  return (
    <div className="relative h-80 flex flex-col items-center justify-center">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-emerald-50/30 rounded-xl -z-10"></div>
      
      <ResponsiveContainer width="100%" height="70%">
        <PieChart>
          <defs>
            {/* Gradient definitions for different score ranges */}
            <linearGradient id="excellentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
              <stop offset="100%" stopColor="#059669" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="goodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="fairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
              <stop offset="100%" stopColor="#d97706" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="needsAttentionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
              <stop offset="100%" stopColor="#dc2626" stopOpacity={1} />
            </linearGradient>
          </defs>
          
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={110}
            dataKey="value"
            stroke="none"
          >
            <Cell 
              fill={`url(#${getGradientId(value)})`}
              style={{
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
              }}
            />
            <Cell fill="hsl(var(--muted))" opacity={0.3} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Enhanced center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center mt-8">
          <div 
            className="text-4xl font-bold mb-2"
            style={{ 
              color: getColor(value),
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }}
          >
            {value}%
          </div>
          <div 
            className="text-lg font-semibold mb-1"
            style={{ color: getColor(value) }}
          >
            {getStatus(value)}
          </div>
          <div className="w-16 h-1 rounded-full mx-auto mb-4" style={{ backgroundColor: getColor(value) }}></div>
        </div>
      </div>
      
      {/* Enhanced description */}
      <div className="mt-6 text-center bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
        <p className="text-sm font-semibold text-gray-700">Replenishment Score</p>
        <p className="text-xs text-gray-500 mt-1">
          Based on sales trends and stock levels
        </p>
      </div>
    </div>
  );
};


import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface MostBoughtChartProps {
  data: Array<{
    name: string;
    value: number;
    percentage: number;
  }>;
}

const COLORS = [
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#8b5cf6', // violet-500
  '#06b6d4', // cyan-500
  '#f97316', // orange-500
  '#84cc16', // lime-500
];

const chartConfig = {
  value: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
};

export const MostBoughtChart: React.FC<MostBoughtChartProps> = ({ data }) => {
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage, name }: any) => {
    const RADIAN = Math.PI / 180;
    // Increased radius for better positioning
    const radius = outerRadius + 25;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percentage < 3) return null; // Don't show labels for very small slices

    return (
      <text 
        x={x} 
        y={y} 
        fill="hsl(var(--foreground))" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="600"
        className="drop-shadow-sm"
      >
        {`${percentage}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* 3D effect background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 via-blue-50/50 to-violet-50/50 rounded-xl"></div>
      <div 
        className="absolute inset-2 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1), inset 0 -1px 2px rgba(255,255,255,0.8)'
        }}
      ></div>
      
      <ChartContainer config={chartConfig} className="relative z-10 w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 40, bottom: 60, left: 40 }}>
            <defs>
              {/* Create 3D gradients for each slice */}
              {COLORS.map((color, index) => (
                <g key={index}>
                  <linearGradient id={`gradient-3d-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={color} stopOpacity={1} />
                    <stop offset="50%" stopColor={color} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.7} />
                  </linearGradient>
                  <filter id={`shadow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor={color} floodOpacity="0.3"/>
                  </filter>
                </g>
              ))}
            </defs>
            
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={75}
              innerRadius={30}
              fill="#8884d8"
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={3}
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#gradient-3d-${index % COLORS.length})`}
                  filter={`url(#shadow-${index % COLORS.length})`}
                  style={{
                    transformOrigin: 'center',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Pie>
            
            {/* Enhanced tooltip */}
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-2xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-4 h-4 rounded-full shadow-sm" 
                          style={{ 
                            backgroundColor: COLORS[payload[0].payload.index % COLORS.length],
                            boxShadow: `0 2px 4px ${COLORS[payload[0].payload.index % COLORS.length]}40`
                          }}
                        />
                        <p className="font-semibold text-foreground">{data.name}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Sales: <span className="font-medium text-foreground">Kshs {data.value.toLocaleString()}</span></p>
                      <p className="text-sm text-muted-foreground">Share: <span className="font-medium text-foreground">{data.percentage}%</span></p>
                    </div>
                  );
                }
                return null;
              }}
            />
            
            {/* Enhanced legend with better spacing */}
            <Legend 
              verticalAlign="bottom" 
              height={50}
              iconType="circle"
              wrapperStyle={{ 
                paddingTop: '20px', 
                fontSize: '12px',
                fontWeight: '500',
                lineHeight: '1.6'
              }}
              itemStyle={{
                marginRight: '20px',
                marginBottom: '8px'
              }}
              formatter={(value, entry) => (
                <span style={{ 
                  color: entry.color,
                  textShadow: `0 1px 2px ${entry.color}30`,
                  marginLeft: '8px'
                }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

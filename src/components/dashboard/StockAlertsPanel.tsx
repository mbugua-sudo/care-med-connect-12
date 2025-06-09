
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Info, AlertCircle, X } from 'lucide-react';

interface Alert {
  id: string;
  type: 'urgent' | 'warning' | 'info';
  message: string;
  product?: string;
  timestamp: Date;
}

interface StockAlertsPanelProps {
  alerts: Alert[];
}

const getAlertConfig = (type: string) => {
  switch (type) {
    case 'urgent':
      return {
        icon: AlertTriangle,
        color: 'destructive',
        bgColor: 'bg-red-50 border-red-200',
        iconColor: 'text-red-600'
      };
    case 'warning':
      return {
        icon: AlertCircle,
        color: 'secondary',
        bgColor: 'bg-amber-50 border-amber-200',
        iconColor: 'text-amber-600'
      };
    case 'info':
      return {
        icon: Info,
        color: 'outline',
        bgColor: 'bg-blue-50 border-blue-200',
        iconColor: 'text-blue-600'
      };
    default:
      return {
        icon: Info,
        color: 'outline',
        bgColor: 'bg-gray-50 border-gray-200',
        iconColor: 'text-gray-600'
      };
  }
};

export const StockAlertsPanel: React.FC<StockAlertsPanelProps> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  return (
    <Card className="modern-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          Stock Alerts & Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => {
            const config = getAlertConfig(alert.type);
            const Icon = config.icon;
            
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${config.bgColor} flex items-start justify-between`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${config.iconColor}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {alert.message}
                    </p>
                    {alert.product && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        {alert.product}
                      </Badge>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {alert.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

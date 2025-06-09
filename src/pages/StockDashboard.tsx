
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingUp, TrendingDown, Package, DollarSign, Users, Bell, RefreshCw } from 'lucide-react';
import { StockLevelsChart } from '@/components/dashboard/StockLevelsChart';
import { TrendingMedicinesChart } from '@/components/dashboard/TrendingMedicinesChart';
import { MostBoughtChart } from '@/components/dashboard/MostBoughtChart';
import { SlowestSellingChart } from '@/components/dashboard/SlowestSellingChart';
import { SalesRevenueChart } from '@/components/dashboard/SalesRevenueChart';
import { ProductTrendsChart } from '@/components/dashboard/ProductTrendsChart';
import { StockAlertsPanel } from '@/components/dashboard/StockAlertsPanel';
import { CustomerFeedbackChart } from '@/components/dashboard/CustomerFeedbackChart';
import { ReplenishmentGauge } from '@/components/dashboard/ReplenishmentGauge';
import { generateMockData } from '@/utils/mockData';

const StockDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('month');
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState(generateMockData());

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setDashboardData(generateMockData());
      setRefreshing(false);
    }, 1500);
  };

  const keyMetrics = [
    {
      title: 'Total Revenue',
      value: `$${dashboardData.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Total Products',
      value: dashboardData.totalProducts.toString(),
      change: '+3',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Low Stock Items',
      value: dashboardData.lowStockCount.toString(),
      change: '-5',
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Active Customers',
      value: dashboardData.activeCustomers.toString(),
      change: '+8.2%',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gradient-primary mb-2">
              PharmStock Dashboard
            </h1>
            <p className="text-muted-foreground">
              Comprehensive stock management and analytics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={handleRefresh} 
              disabled={refreshing}
              className="bg-primary hover:bg-primary/90"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyMetrics.map((metric, index) => (
            <Card key={index} className="modern-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                    <Badge variant="secondary" className="mt-2">
                      {metric.change}
                    </Badge>
                  </div>
                  <div className={`p-3 rounded-full ${metric.bgColor}`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alerts Panel */}
        <StockAlertsPanel alerts={dashboardData.alerts} />

        {/* Main Charts */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="modern-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Stock Levels Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <StockLevelsChart data={dashboardData.stockLevels} />
                </CardContent>
              </Card>

              <Card className="modern-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                    Trending Medicines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TrendingMedicinesChart data={dashboardData.trending} />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="modern-card">
                <CardHeader>
                  <CardTitle>Most Bought Medicines</CardTitle>
                </CardHeader>
                <CardContent>
                  <MostBoughtChart data={dashboardData.mostBought} />
                </CardContent>
              </Card>

              <Card className="modern-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-red-600" />
                    Slowest Selling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SlowestSellingChart data={dashboardData.slowestSelling} />
                </CardContent>
              </Card>

              <Card className="modern-card">
                <CardHeader>
                  <CardTitle>Stock Replenishment</CardTitle>
                </CardHeader>
                <CardContent>
                  <ReplenishmentGauge value={dashboardData.replenishmentScore} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="modern-card lg:col-span-2">
                <CardHeader>
                  <CardTitle>Sales & Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <SalesRevenueChart data={dashboardData.salesTrends} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle>Product Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductTrendsChart data={dashboardData.productTrends} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle>Customer Feedback & Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <CustomerFeedbackChart data={dashboardData.customerFeedback} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StockDashboard;

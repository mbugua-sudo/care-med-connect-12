
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Package, 
  AlertTriangle, 
  DollarSign,
  BarChart3,
  ShoppingCart,
  Users,
  Activity
} from 'lucide-react';
import { SalesRevenueChart } from '@/components/dashboard/SalesRevenueChart';
import { StockLevelsChart } from '@/components/dashboard/StockLevelsChart';
import { TrendingMedicinesChart } from '@/components/dashboard/TrendingMedicinesChart';
import { MostBoughtChart } from '@/components/dashboard/MostBoughtChart';
import { SlowestSellingChart } from '@/components/dashboard/SlowestSellingChart';
import { ProductTrendsChart } from '@/components/dashboard/ProductTrendsChart';
import { ReplenishmentGauge } from '@/components/dashboard/ReplenishmentGauge';
import { StockAlertsPanel } from '@/components/dashboard/StockAlertsPanel';
import { CustomerReviewsPanel } from '@/components/dashboard/CustomerReviewsPanel';
import { CustomerFeedbackChart } from '@/components/dashboard/CustomerFeedbackChart';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { generateMockData } from '@/utils/mockData';

const StockDashboard = () => {
  const mockData = generateMockData();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-border/40 pb-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                        Analytics Dashboard
                      </h1>
                      <p className="text-muted-foreground text-lg">
                        Real-time insights and performance metrics
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="modern-card hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-3xl font-bold">Kshs 2.1M</p>
                      <p className="text-xs text-emerald-600">+12% from last month</p>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-50 shadow-inner">
                      <DollarSign className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="modern-card hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Products in Stock</p>
                      <p className="text-3xl font-bold">1,247</p>
                      <p className="text-xs text-blue-600">+5% this week</p>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-50 shadow-inner">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="modern-card hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                      <p className="text-3xl font-bold">23</p>
                      <p className="text-xs text-amber-600">Needs attention</p>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-50 shadow-inner">
                      <AlertTriangle className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="modern-card hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Monthly Orders</p>
                      <p className="text-3xl font-bold">1,856</p>
                      <p className="text-xs text-purple-600">+8% growth</p>
                    </div>
                    <div className="p-4 rounded-xl bg-purple-50 shadow-inner">
                      <ShoppingCart className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dashboard Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-fit bg-muted/50 shadow-sm">
                <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="sales" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Sales
                </TabsTrigger>
                <TabsTrigger value="inventory" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Package className="h-4 w-4 mr-2" />
                  Inventory
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Activity className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Revenue Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SalesRevenueChart data={mockData.salesTrends} />
                    </CardContent>
                  </Card>

                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Most Bought Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MostBoughtChart data={mockData.mostBought} />
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Stock Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <StockAlertsPanel alerts={mockData.alerts} />
                    </CardContent>
                  </Card>

                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Customer Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CustomerReviewsPanel reviews={mockData.customerReviews} />
                    </CardContent>
                  </Card>

                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Replenishment Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ReplenishmentGauge value={75} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sales" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Sales Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SalesRevenueChart data={mockData.salesTrends} />
                    </CardContent>
                  </Card>

                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Trending Medicines</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <TrendingMedicinesChart data={mockData.trending} />
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Product Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ProductTrendsChart data={mockData.productTrends} />
                    </CardContent>
                  </Card>

                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Customer Feedback</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CustomerFeedbackChart data={mockData.customerFeedback} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="inventory" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Stock Levels</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <StockLevelsChart data={mockData.stockLevels} />
                    </CardContent>
                  </Card>

                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Slowest Selling Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SlowestSellingChart data={mockData.slowestSelling} />
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Stock Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <StockAlertsPanel alerts={mockData.alerts} />
                    </CardContent>
                  </Card>

                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Replenishment Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ReplenishmentGauge value={60} />
                    </CardContent>
                  </Card>

                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Supplier Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Supplier performance metrics will be displayed here.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Customer Demographics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CustomerFeedbackChart data={mockData.customerFeedback} />
                    </CardContent>
                  </Card>

                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Sales by Region</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Regional sales data will be visualized here.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Website Traffic</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Website traffic analytics will be displayed here.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Marketing Campaign Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Marketing campaign metrics will be shown here.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="modern-card border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Social Media Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Social media engagement statistics will be displayed here.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default StockDashboard;

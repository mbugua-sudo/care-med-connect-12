
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Package, 
  Tag, 
  Users, 
  FileText,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { ProductForm } from '@/components/content-editor/ProductForm';
import { CategoryForm } from '@/components/content-editor/CategoryForm';
import { ProductTable } from '@/components/content-editor/ProductTable';
import { CategoryTable } from '@/components/content-editor/CategoryTable';
import { AuditLog } from '@/components/content-editor/AuditLog';
import { PermissionManager } from '@/components/content-editor/PermissionManager';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

const ContentEditor = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // TODO: Replace with real data from Supabase
  // Will need to implement useQuery hooks for fetching data
  const mockStats = {
    totalProducts: 1247,
    activeProducts: 1189,
    lowStockItems: 23,
    pendingReviews: 8
  };

  const stats = [
    {
      title: 'Total Products',
      value: mockStats.totalProducts,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Products',
      value: mockStats.activeProducts,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Low Stock Items',
      value: mockStats.lowStockItems,
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Pending Reviews',
      value: mockStats.pendingReviews,
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <div className="p-6 space-y-6">
            {/* Header with improved styling */}
            <div className="flex justify-between items-start border-b border-border/40 pb-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
                        Content Editor
                      </h1>
                      <p className="text-muted-foreground text-lg">
                        Manage products, categories, and content across your pharmacy system
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Product
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="modern-card hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold">{stat.value.toLocaleString()}</p>
                      </div>
                      <div className={`p-4 rounded-xl ${stat.bgColor} shadow-inner`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Search and Filter Bar */}
            <Card className="modern-card border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search products, categories, or SKUs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-0 bg-muted/30 focus:bg-background transition-colors"
                    />
                  </div>
                  <div className="flex gap-2">
                    {/* TODO: Implement real filtering with database queries */}
                    <Button variant="outline" size="sm" className="shadow-sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="shadow-sm">
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 lg:w-fit bg-muted/50 shadow-sm">
                <TabsTrigger value="products" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Package className="h-4 w-4 mr-2" />
                  Products
                </TabsTrigger>
                <TabsTrigger value="categories" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Tag className="h-4 w-4 mr-2" />
                  Categories
                </TabsTrigger>
                <TabsTrigger value="audit" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Audit Log
                </TabsTrigger>
                <TabsTrigger value="permissions" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Users className="h-4 w-4 mr-2" />
                  Permissions
                </TabsTrigger>
                <TabsTrigger value="bulk" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Package className="h-4 w-4 mr-2" />
                  Bulk Actions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="space-y-6">
                <ProductTable 
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                />
              </TabsContent>

              <TabsContent value="categories" className="space-y-6">
                <CategoryTable searchQuery={searchQuery} />
              </TabsContent>

              <TabsContent value="audit" className="space-y-6">
                <AuditLog />
              </TabsContent>

              <TabsContent value="permissions" className="space-y-6">
                <PermissionManager />
              </TabsContent>

              <TabsContent value="bulk" className="space-y-6">
                <Card className="modern-card border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Bulk Operations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Bulk operations interface will be implemented here</p>
                      <p className="text-sm mt-2">TODO: Implement bulk import/export, bulk price updates, etc.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Add Product Modal */}
            {showAddForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                  <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Add New Product</h2>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowAddForm(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-6">
                    <ProductForm onClose={() => setShowAddForm(false)} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ContentEditor;

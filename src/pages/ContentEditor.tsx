
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gradient-primary mb-2">
              Content Editor
            </h1>
            <p className="text-muted-foreground">
              Manage products, categories, and content across your pharmacy system
            </p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="modern-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-1">{stat.value.toLocaleString()}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products, categories, or SKUs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {/* TODO: Implement real filtering with database queries */}
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit">
            <TabsTrigger value="products">
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="categories">
              <Tag className="h-4 w-4 mr-2" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="audit">
              <FileText className="h-4 w-4 mr-2" />
              Audit Log
            </TabsTrigger>
            <TabsTrigger value="permissions">
              <Users className="h-4 w-4 mr-2" />
              Permissions
            </TabsTrigger>
            <TabsTrigger value="bulk">
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
            <Card className="modern-card">
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
            <div className="bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
    </div>
  );
};

export default ContentEditor;

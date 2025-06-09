
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal, 
  AlertTriangle, 
  CheckCircle,
  Package
} from 'lucide-react';

interface ProductTableProps {
  searchQuery: string;
  selectedCategory: string;
}

export const ProductTable: React.FC<ProductTableProps> = ({ searchQuery, selectedCategory }) => {
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  // TODO: Replace with real data from Supabase
  // Implementation will include:
  // - useQuery to fetch products with filters
  // - Real-time subscriptions for live updates
  // - Pagination for large datasets
  const mockProducts = [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      brand: 'Generic',
      category: 'Pain Relief',
      price: 150,
      stockQuantity: 250,
      minStockLevel: 50,
      status: 'active',
      sku: 'PAR-500-001',
      requiresPrescription: false,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      name: 'Amoxicillin 250mg',
      brand: 'Pharma Ltd',
      category: 'Antibiotics',
      price: 450,
      stockQuantity: 15,
      minStockLevel: 20,
      status: 'active',
      sku: 'AMX-250-002',
      requiresPrescription: true,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: '3',
      name: 'Vitamin C 1000mg',
      brand: 'Health Plus',
      category: 'Vitamins',
      price: 890,
      stockQuantity: 180,
      minStockLevel: 30,
      status: 'active',
      sku: 'VTC-1000-003',
      requiresPrescription: false,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-19'
    }
  ];

  const getStockStatus = (quantity: number, minLevel: number) => {
    if (quantity === 0) return { status: 'out', color: 'bg-gray-500', text: 'Out of Stock' };
    if (quantity <= minLevel) return { status: 'low', color: 'bg-red-500', text: 'Low Stock' };
    if (quantity <= minLevel * 2) return { status: 'medium', color: 'bg-amber-500', text: 'Medium Stock' };
    return { status: 'high', color: 'bg-emerald-500', text: 'Good Stock' };
  };

  const handleEdit = (productId: string) => {
    // TODO: Implement edit functionality
    // Will open ProductForm in edit mode
    console.log('Edit product:', productId);
    setEditingProduct(productId);
  };

  const handleDelete = (productId: string) => {
    // TODO: Implement delete functionality with confirmation
    // Will include soft delete and audit logging
    console.log('Delete product:', productId);
  };

  const handleView = (productId: string) => {
    // TODO: Navigate to product detail view
    console.log('View product:', productId);
  };

  // Filter products based on search query and category
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card className="modern-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Products Management
          </CardTitle>
          <Badge variant="secondary">
            {filteredProducts.length} products
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No products found</p>
            <p className="text-sm mt-2">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price (KES)</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stockQuantity, product.minStockLevel);
                  
                  return (
                    <TableRow key={product.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">{product.brand}</div>
                          {product.requiresPrescription && (
                            <Badge variant="outline" className="mt-1 text-xs">
                              Prescription Required
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {product.price.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{product.stockQuantity}</span>
                          <div className={`w-2 h-2 rounded-full ${stockStatus.color}`} />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Min: {product.minStockLevel}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {product.status === 'active' ? (
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          )}
                          <span className="capitalize">{product.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {product.sku}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleView(product.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEdit(product.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
        
        {/* TODO: Implement pagination */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          TODO: Add pagination component for large datasets
        </div>
      </CardContent>
    </Card>
  );
};

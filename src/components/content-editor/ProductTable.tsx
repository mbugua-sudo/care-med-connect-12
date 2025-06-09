
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
import { toast } from '@/hooks/use-toast';
import { ProductForm } from './ProductForm';

interface ProductTableProps {
  searchQuery: string;
  selectedCategory: string;
}

export const ProductTable: React.FC<ProductTableProps> = ({ searchQuery, selectedCategory }) => {
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showEditForm, setShowEditForm] = useState(false);

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
      price: 1299,
      originalPrice: 1599,
      stockQuantity: 250,
      minStockLevel: 50,
      status: 'active',
      sku: 'PAR-500-001',
      requiresPrescription: false,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      description: 'A lightweight, oil-based cleanser that gently melts away makeup, dirt, oils and sunscreen without stinging the eye area.',
      ingredients: 'Paracetamol 500mg. Excipients: Contains lactose, sodium metabisulfite and starch.',
      howToUse: 'Apply a few pumps of cleansing oil onto dry face with dry hands. Massage gently in circular motions. Emulsify with water to create a milky emulsion before rinsing off completely with lukewarm water.',
      rating: 4.5,
      reviewCount: 124
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
      updatedAt: '2024-01-18',
      description: 'Antibiotic medication used to treat bacterial infections.',
      ingredients: 'Amoxicillin trihydrate 250mg, microcrystalline cellulose, magnesium stearate.',
      howToUse: 'Take one capsule every 8 hours with food or as directed by your healthcare provider.',
      rating: 4.2,
      reviewCount: 89
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
      updatedAt: '2024-01-19',
      description: 'High-potency Vitamin C supplement to support immune system function.',
      ingredients: 'Ascorbic acid 1000mg, citrus bioflavonoids, rose hips extract.',
      howToUse: 'Take one tablet daily with food, preferably with breakfast.',
      rating: 4.7,
      reviewCount: 156
    }
  ];

  const getStockStatus = (quantity: number, minLevel: number) => {
    if (quantity === 0) return { status: 'out', color: 'bg-gray-500', text: 'Out of Stock' };
    if (quantity <= minLevel) return { status: 'low', color: 'bg-red-500', text: 'Low Stock' };
    if (quantity <= minLevel * 2) return { status: 'medium', color: 'bg-amber-500', text: 'Medium Stock' };
    return { status: 'high', color: 'bg-emerald-500', text: 'Good Stock' };
  };

  const handleEdit = (product: any) => {
    console.log('Edit product:', product);
    setEditingProduct(product);
    setShowEditForm(true);
    toast({
      title: "Edit Product",
      description: `Opening edit form for ${product.name}`,
    });
  };

  const handleDelete = (productId: string) => {
    console.log('Delete product:', productId);
    // TODO: Add confirmation dialog
    toast({
      title: "Delete Product",
      description: `Product ${productId} will be deleted (confirmation dialog needed)`,
      variant: "destructive"
    });
  };

  const handleView = (productId: string) => {
    console.log('View product:', productId);
    // TODO: Navigate to product detail view or open modal
    window.open(`/product/${productId}`, '_blank');
    toast({
      title: "View Product",
      description: `Opening product details in new tab`,
    });
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
    <>
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
                    <TableHead>Price (Kshs)</TableHead>
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
                            Kshs {product.price.toLocaleString()}
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
                              className="hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEdit(product)}
                              className="hover:bg-green-50 hover:text-green-600"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDelete(product.id)}
                              className="hover:bg-red-50 hover:text-red-600"
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

      {/* Edit Product Modal */}
      {showEditForm && editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Edit Product</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setShowEditForm(false);
                  setEditingProduct(null);
                }}
              >
                ×
              </Button>
            </div>
            <div className="p-6">
              <ProductForm 
                product={editingProduct}
                onClose={() => {
                  setShowEditForm(false);
                  setEditingProduct(null);
                }} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

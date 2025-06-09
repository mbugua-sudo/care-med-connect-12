
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2, Tag, CheckCircle, XCircle } from 'lucide-react';

interface CategoryTableProps {
  searchQuery: string;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({ searchQuery }) => {
  // TODO: Replace with real data from Supabase
  const mockCategories = [
    {
      id: '1',
      name: 'Pain Relief',
      slug: 'pain-relief',
      description: 'Medicines for pain management',
      isActive: true,
      productCount: 45,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Vitamins',
      slug: 'vitamins',
      description: 'Nutritional supplements and vitamins',
      isActive: true,
      productCount: 78,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Antibiotics',
      slug: 'antibiotics',
      description: 'Prescription antibiotics',
      isActive: true,
      productCount: 23,
      createdAt: '2024-01-12'
    },
    {
      id: '4',
      name: 'Cold & Flu',
      slug: 'cold-flu',
      description: 'Cold and flu medications',
      isActive: false,
      productCount: 12,
      createdAt: '2024-01-08'
    }
  ];

  const handleEdit = (categoryId: string) => {
    // TODO: Implement edit functionality
    console.log('Edit category:', categoryId);
  };

  const handleDelete = (categoryId: string) => {
    // TODO: Implement delete functionality with confirmation
    console.log('Delete category:', categoryId);
  };

  const handleToggleStatus = (categoryId: string) => {
    // TODO: Implement status toggle
    console.log('Toggle status for category:', categoryId);
  };

  // Filter categories based on search query
  const filteredCategories = mockCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="modern-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Categories Management
          </CardTitle>
          <Badge variant="secondary">
            {filteredCategories.length} categories
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Tag className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No categories found</p>
            <p className="text-sm mt-2">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="font-medium">{category.name}</div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {category.slug}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate text-muted-foreground">
                        {category.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {category.productCount} products
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {category.isActive ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                            <span className="text-emerald-600">Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="text-red-600">Inactive</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {new Date(category.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(category.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleToggleStatus(category.id)}
                        >
                          {category.isActive ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          TODO: Add pagination component for large datasets
        </div>
      </CardContent>
    </Card>
  );
};

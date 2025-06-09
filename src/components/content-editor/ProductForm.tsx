
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Upload, Plus, X, Save, AlertCircle } from 'lucide-react';

interface ProductFormProps {
  onClose: () => void;
  product?: any; // TODO: Define proper Product interface
}

export const ProductForm: React.FC<ProductFormProps> = ({ onClose, product }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    brand: product?.brand || '',
    genericName: product?.generic_name || '',
    category: product?.category || '',
    description: product?.description || '',
    ingredients: product?.ingredients || '',
    howToUse: product?.howToUse || '',
    activeIngredients: product?.active_ingredients || '',
    strength: product?.strength || '',
    form: product?.form || '',
    packSize: product?.pack_size || '',
    price: product?.price || '',
    originalPrice: product?.original_price || '',
    costPrice: product?.cost_price || '',
    sku: product?.sku || '',
    barcode: product?.barcode || '',
    stockQuantity: product?.stock_quantity || product?.stockQuantity || '',
    minStockLevel: product?.min_stock_level || product?.minStockLevel || '',
    maxStockLevel: product?.max_stock_level || product?.maxStockLevel || '',
    requiresPrescription: product?.requires_prescription || product?.requiresPrescription || false,
    isPrescriptionOnly: product?.is_prescription_only || false,
    isActive: product?.is_active !== undefined ? product.is_active : product?.status === 'active',
    isFeatured: product?.is_featured || false,
    isNew: product?.is_new || false,
    weight: product?.weight_grams || '',
    expiryDate: product?.expiry_date || '',
    manufacturer: product?.manufacturer || '',
    countryOfOrigin: product?.country_of_origin || '',
    storageInstructions: product?.storage_instructions || '',
    rating: product?.rating || 0,
    reviewCount: product?.reviewCount || 0
  });

  const [images, setImages] = useState<string[]>(product?.images || []);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // TODO: Replace with real categories from Supabase
  const mockCategories = [
    { id: 'Pain Relief', name: 'Pain Relief' },
    { id: 'Vitamins', name: 'Vitamins' },
    { id: 'Antibiotics', name: 'Antibiotics' },
    { id: 'Cold & Flu', name: 'Cold & Flu' },
    { id: 'Supplements', name: 'Supplements' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.stockQuantity) newErrors.stockQuantity = 'Stock quantity is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // TODO: Implement actual product creation/update with Supabase
    console.log('Product data to save:', formData);
    console.log('Images:', images);
    
    // Simulate API call
    try {
      // await createProduct(formData, images);
      // await updateProductImages(productId, images);
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement actual image upload to Supabase Storage
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages(prev => [...prev, imageUrl]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="genericName">Generic Name</Label>
              <Input
                id="genericName"
                value={formData.genericName}
                onChange={(e) => handleInputChange('genericName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.category}
                </p>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              placeholder="A lightweight, oil-based cleanser that gently melts away makeup, dirt, oils and sunscreen without stinging the eye area."
            />
          </div>
        </CardContent>
      </Card>

      {/* Product Details */}
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="strength">Strength</Label>
              <Input
                id="strength"
                value={formData.strength}
                onChange={(e) => handleInputChange('strength', e.target.value)}
                placeholder="e.g., 500mg"
              />
            </div>
            <div>
              <Label htmlFor="form">Form</Label>
              <Select value={formData.form} onValueChange={(value) => handleInputChange('form', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select form" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tablet">Tablet</SelectItem>
                  <SelectItem value="capsule">Capsule</SelectItem>
                  <SelectItem value="syrup">Syrup</SelectItem>
                  <SelectItem value="injection">Injection</SelectItem>
                  <SelectItem value="cream">Cream</SelectItem>
                  <SelectItem value="ointment">Ointment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="packSize">Pack Size</Label>
              <Input
                id="packSize"
                type="number"
                value={formData.packSize}
                onChange={(e) => handleInputChange('packSize', e.target.value)}
                placeholder="e.g., 30"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="activeIngredients">Active Ingredients</Label>
            <Textarea
              id="activeIngredients"
              value={formData.activeIngredients}
              onChange={(e) => handleInputChange('activeIngredients', e.target.value)}
              rows={2}
              placeholder="Paracetamol 500mg. Excipients: Contains lactose, sodium metabisulfite and starch."
            />
          </div>

          <div>
            <Label htmlFor="ingredients">All Ingredients</Label>
            <Textarea
              id="ingredients"
              value={formData.ingredients}
              onChange={(e) => handleInputChange('ingredients', e.target.value)}
              rows={2}
              placeholder="Complete list of ingredients including inactive components"
            />
          </div>

          <div>
            <Label htmlFor="howToUse">How to Use</Label>
            <Textarea
              id="howToUse"
              value={formData.howToUse}
              onChange={(e) => handleInputChange('howToUse', e.target.value)}
              rows={3}
              placeholder="Apply a few pumps of cleansing oil onto dry face with dry hands. Massage gently in circular motions..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Inventory */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing & Inventory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Selling Price (Kshs) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.price}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="originalPrice">Original Price (Kshs)</Label>
              <Input
                id="originalPrice"
                type="number"
                value={formData.originalPrice}
                onChange={(e) => handleInputChange('originalPrice', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="costPrice">Cost Price (Kshs)</Label>
              <Input
                id="costPrice"
                type="number"
                value={formData.costPrice}
                onChange={(e) => handleInputChange('costPrice', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="stockQuantity">Stock Quantity *</Label>
              <Input
                id="stockQuantity"
                type="number"
                value={formData.stockQuantity}
                onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                className={errors.stockQuantity ? 'border-red-500' : ''}
              />
              {errors.stockQuantity && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.stockQuantity}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="minStockLevel">Min Stock Level</Label>
              <Input
                id="minStockLevel"
                type="number"
                value={formData.minStockLevel}
                onChange={(e) => handleInputChange('minStockLevel', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="maxStockLevel">Max Stock Level</Label>
              <Input
                id="maxStockLevel"
                type="number"
                value={formData.maxStockLevel}
                onChange={(e) => handleInputChange('maxStockLevel', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="barcode">Barcode</Label>
              <Input
                id="barcode"
                value={formData.barcode}
                onChange={(e) => handleInputChange('barcode', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Images */}
      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0"
                    onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              
              <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <Upload className="h-6 w-6 text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-muted-foreground">
              TODO: Implement image upload to Supabase Storage
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Input
                id="manufacturer"
                value={formData.manufacturer}
                onChange={(e) => handleInputChange('manufacturer', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="countryOfOrigin">Country of Origin</Label>
              <Input
                id="countryOfOrigin"
                value={formData.countryOfOrigin}
                onChange={(e) => handleInputChange('countryOfOrigin', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (grams)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="storageInstructions">Storage Instructions</Label>
            <Textarea
              id="storageInstructions"
              value={formData.storageInstructions}
              onChange={(e) => handleInputChange('storageInstructions', e.target.value)}
              rows={2}
              placeholder="Store in a cool, dry place away from direct sunlight"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rating">Rating (0-5)</Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => handleInputChange('rating', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="reviewCount">Review Count</Label>
              <Input
                id="reviewCount"
                type="number"
                value={formData.reviewCount}
                onChange={(e) => handleInputChange('reviewCount', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Product Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="requiresPrescription">Requires Prescription</Label>
                <Switch
                  id="requiresPrescription"
                  checked={formData.requiresPrescription}
                  onCheckedChange={(checked) => handleInputChange('requiresPrescription', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="isPrescriptionOnly">Prescription Only</Label>
                <Switch
                  id="isPrescriptionOnly"
                  checked={formData.isPrescriptionOnly}
                  onCheckedChange={(checked) => handleInputChange('isPrescriptionOnly', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">Active</Label>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="isFeatured">Featured Product</Label>
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="isNew">New Product</Label>
                <Switch
                  id="isNew"
                  checked={formData.isNew}
                  onCheckedChange={(checked) => handleInputChange('isNew', checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          <Save className="h-4 w-4 mr-2" />
          {product ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
};

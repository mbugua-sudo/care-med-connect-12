
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Heart, ShoppingCart, Filter, ArrowUpDown } from 'lucide-react';

const PersonalCarePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState('all');

  // Mock products data
  const allProducts = [
    {
      id: '1',
      name: 'Durex Classic Condoms 12 Pack',
      price: 899,
      originalPrice: 1099,
      discount: 18,
      image: 'https://picsum.photos/300/300?random=1',
      category: 'Condoms',
      brand: 'Durex',
      rating: 4.5,
      inStock: true
    },
    {
      id: '2',
      name: 'Always Ultra Night Sanitary Pads',
      price: 549,
      originalPrice: 649,
      discount: 15,
      image: 'https://picsum.photos/300/300?random=2',
      category: 'Sanitary Towels',
      brand: 'Always',
      rating: 4.7,
      inStock: true
    },
    {
      id: '3',
      name: 'Pampers Baby Dry Diapers Size M',
      price: 1299,
      originalPrice: 1499,
      discount: 13,
      image: 'https://picsum.photos/300/300?random=3',
      category: 'Diapers',
      brand: 'Pampers',
      rating: 4.6,
      inStock: true
    },
    {
      id: '4',
      name: 'Johnson\'s Baby Shampoo 500ml',
      price: 279,
      originalPrice: 329,
      discount: 15,
      image: 'https://picsum.photos/300/300?random=4',
      category: 'Baby Care',
      brand: 'Johnson\'s',
      rating: 4.4,
      inStock: true
    },
    {
      id: '5',
      name: 'Whisper Ultra Wings Pads',
      price: 199,
      originalPrice: 249,
      discount: 20,
      image: 'https://picsum.photos/300/300?random=5',
      category: 'Sanitary Towels',
      brand: 'Whisper',
      rating: 4.3,
      inStock: false
    },
    {
      id: '6',
      name: 'Koex Sensitive Condoms 3 Pack',
      price: 299,
      originalPrice: 349,
      discount: 14,
      image: 'https://picsum.photos/300/300?random=6',
      category: 'Condoms',
      brand: 'Koex',
      rating: 4.2,
      inStock: true
    },
    {
      id: '7',
      name: 'Huggies Wonder Pants L Size',
      price: 1599,
      originalPrice: 1899,
      discount: 16,
      image: 'https://picsum.photos/300/300?random=7',
      category: 'Diapers',
      brand: 'Huggies',
      rating: 4.8,
      inStock: true
    },
    {
      id: '8',
      name: 'Cetaphil Gentle Baby Wash',
      price: 445,
      originalPrice: 525,
      discount: 15,
      image: 'https://picsum.photos/300/300?random=8',
      category: 'Baby Care',
      brand: 'Cetaphil',
      rating: 4.5,
      inStock: true
    }
  ];

  const categories = ['Condoms', 'Sanitary Towels', 'Diapers', 'Baby Care'];
  const brands = ['Durex', 'Always', 'Pampers', 'Johnson\'s', 'Whisper', 'Koex', 'Huggies', 'Cetaphil'];

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice = priceRange === 'all' || 
      (priceRange === 'under-500' && product.price < 500) ||
      (priceRange === '500-1000' && product.price >= 500 && product.price < 1000) ||
      (priceRange === 'over-1000' && product.price >= 1000);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesBrand && matchesPrice && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'discount':
        return b.discount - a.discount;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange('all');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateCartQuantity={updateCartQuantity}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        medicines={allProducts}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Personal Care & Hygiene</h1>
          <p className="text-muted-foreground">
            Essential personal care products for your health and comfort
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-medium mb-3">Categories</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label htmlFor={category} className="text-sm font-medium">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h4 className="font-medium mb-3">Brands</h4>
              <div className="space-y-2">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleBrand(brand)}
                    />
                    <label htmlFor={brand} className="text-sm font-medium">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="font-medium mb-3">Price Range</h4>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-500">Under ₹500</SelectItem>
                  <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                  <SelectItem value="over-1000">Over ₹1000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Sort by:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <ArrowUpDown className="w-4 h-4" />
                      {sortBy === 'name' && 'Name'}
                      {sortBy === 'price-low' && 'Price: Low to High'}
                      {sortBy === 'price-high' && 'Price: High to Low'}
                      {sortBy === 'rating' && 'Rating'}
                      {sortBy === 'discount' && 'Discount'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSortBy('name')}>
                      Name
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('price-low')}>
                      Price: Low to High
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('price-high')}>
                      Price: High to Low
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('rating')}>
                      Rating
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('discount')}>
                      Discount
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      {product.discount > 0 && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          {product.discount}% OFF
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge className="absolute top-2 right-2 bg-gray-500 text-white">
                          Out of Stock
                        </Badge>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-2 right-2 hover:bg-white/80"
                      >
                        <Heart 
                          className={`w-4 h-4 ${
                            favorites.includes(product.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-600'
                          }`} 
                        />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.brand}</p>
                      
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-primary">
                          ₹{(product.price / 100).toFixed(0)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{(product.originalPrice / 100).toFixed(0)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <div className="flex text-yellow-400">
                          {'★'.repeat(Math.floor(product.rating))}
                          {'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({product.rating})
                        </span>
                      </div>
                      
                      <Button 
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className="w-full gap-2"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found matching your filters.</p>
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PersonalCarePage;

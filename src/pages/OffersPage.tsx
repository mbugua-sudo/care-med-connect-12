
import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedBlobs } from '@/components/AnimatedBlobs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BlurImage } from '@/components/BlurImage';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { ShareDialog } from '@/components/ShareDialog';
import { ShoppingCart, Heart, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Medicine {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: string;
  brand: string;
  dateAdded: string;
}

const OffersPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('discount');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for medicines on offer
  const offeredMedicines: Medicine[] = [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      price: 1299,
      originalPrice: 1599,
      discount: 20,
      image: 'https://picsum.photos/2000/2030',
      category: 'Pain Relief',
      brand: 'MediCorp',
      dateAdded: '2024-01-10'
    },
    {
      id: '2',
      name: 'Vitamin D3 1000IU',
      price: 2499,
      originalPrice: 2999,
      discount: 15,
      image: 'https://picsum.photos/2000/2031',
      category: 'Vitamins',
      brand: 'HealthPlus',
      dateAdded: '2024-01-15'
    },
    {
      id: '3',
      name: 'Ibuprofen 400mg',
      price: 1850,
      originalPrice: 2250,
      discount: 18,
      image: 'https://picsum.photos/2000/2032',
      category: 'Pain Relief',
      brand: 'PharmaCare',
      dateAdded: '2024-01-08'
    },
    {
      id: '4',
      name: 'Omega-3 Fish Oil',
      price: 3299,
      originalPrice: 3999,
      discount: 17,
      image: 'https://picsum.photos/2000/2033',
      category: 'Supplements',
      brand: 'NaturalHealth',
      dateAdded: '2024-01-12'
    },
    {
      id: '5',
      name: 'Amoxicillin 250mg',
      price: 2199,
      originalPrice: 2799,
      discount: 22,
      image: 'https://picsum.photos/2000/2034',
      category: 'Antibiotics',
      brand: 'MediCorp',
      dateAdded: '2024-01-05'
    },
    {
      id: '6',
      name: 'Multivitamin Complex',
      price: 2899,
      originalPrice: 3499,
      discount: 17,
      image: 'https://picsum.photos/2000/2035',
      category: 'Vitamins',
      brand: 'HealthPlus',
      dateAdded: '2024-01-14'
    }
  ];

  const categories = ['all', ...Array.from(new Set(offeredMedicines.map(med => med.category)))];
  const brands = ['all', ...Array.from(new Set(offeredMedicines.map(med => med.brand)))];

  const filteredAndSortedMedicines = useMemo(() => {
    let filtered = offeredMedicines;

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(med => med.category === categoryFilter);
    }

    // Apply brand filter
    if (brandFilter !== 'all') {
      filtered = filtered.filter(med => med.brand === brandFilter);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'discount':
        return filtered.sort((a, b) => b.discount - a.discount);
      case 'newest':
        return filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      case 'brand':
        return filtered.sort((a, b) => a.brand.localeCompare(b.brand));
      default:
        return filtered;
    }
  }, [categoryFilter, brandFilter, sortBy]);

  const addToCart = (medicine: Medicine) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === medicine.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...medicine, quantity: 1 }];
    });
  };

  const removeFromCart = (medicineId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== medicineId));
  };

  const updateCartQuantity = (medicineId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(medicineId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === medicineId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleFavorite = (medicineId: string) => {
    setFavorites(prev => 
      prev.includes(medicineId)
        ? prev.filter(fav => fav !== medicineId)
        : [...prev, medicineId]
    );
  };

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBlobs />
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
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Special Offers</h1>
          <p className="text-muted-foreground">Great deals on quality medicines and health products</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-lg border">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filters:</span>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount">Highest Discount</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newly Added</SelectItem>
                <SelectItem value="brand">Brand A-Z</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.slice(1).map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.slice(1).map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAndSortedMedicines.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            filteredAndSortedMedicines.map((medicine) => (
              <Card key={medicine.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <BlurImage
                      src={medicine.image}
                      alt={medicine.name}
                      className="w-full h-40 rounded-lg bg-muted cursor-pointer"
                    />
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                      -{medicine.discount}%
                    </Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      className={`absolute top-2 left-2 h-8 w-8 ${
                        favorites.includes(medicine.id) 
                          ? 'text-red-500 bg-white/80' 
                          : 'text-gray-500 bg-white/80 hover:text-red-500'
                      }`}
                      onClick={() => toggleFavorite(medicine.id)}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(medicine.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{medicine.category}</p>
                      <p className="text-xs text-muted-foreground">{medicine.brand}</p>
                    </div>
                    <Link to={`/product/${medicine.id}`}>
                      <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary cursor-pointer">
                        {medicine.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary">
                        KES {medicine.price}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        KES {medicine.originalPrice}
                      </span>
                    </div>
                    
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => addToCart(medicine)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <ShareDialog 
                        productName={medicine.name}
                        productUrl={`${window.location.origin}/product/${medicine.id}`}
                        productImage={medicine.image}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {filteredAndSortedMedicines.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your filters.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default OffersPage;

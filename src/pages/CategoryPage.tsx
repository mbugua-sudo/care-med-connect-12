import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedBlobs } from '@/components/AnimatedBlobs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
}

const CategoryPage = () => {
  const { category } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Convert URL category back to display format
  const displayCategory = category ? category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';

  // Mock medicines data - in real app this would come from API
  const allMedicines = [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      price: 1299,
      originalPrice: 1599,
      discount: 20,
      image: 'https://picsum.photos/2000/2030',
      category: 'Pain Relief'
    },
    {
      id: '2',
      name: 'Vitamin D3 1000IU',
      price: 2499,
      originalPrice: 2999,
      discount: 15,
      image: 'https://picsum.photos/2000/2031',
      category: 'Vitamins'
    },
    {
      id: '3',
      name: 'Ibuprofen 400mg',
      price: 1850,
      originalPrice: 2250,
      discount: 18,
      image: 'https://picsum.photos/2000/2032',
      category: 'Pain Relief'
    },
    {
      id: '4',
      name: 'Omega-3 Fish Oil',
      price: 3299,
      originalPrice: 3999,
      discount: 17,
      image: 'https://picsum.photos/2000/2033',
      category: 'Supplements'
    },
    {
      id: '5',
      name: 'Calcium Tablets',
      price: 1675,
      originalPrice: 1975,
      discount: 15,
      image: 'https://picsum.photos/2000/2034',
      category: 'Vitamins'
    },
    {
      id: '6',
      name: 'Multivitamin Complex',
      price: 2899,
      originalPrice: 3499,
      discount: 17,
      image: 'https://picsum.photos/2000/2035',
      category: 'Vitamins'
    },
    {
      id: '7',
      name: 'Aspirin 100mg',
      price: 999,
      originalPrice: 1299,
      discount: 23,
      image: 'https://picsum.photos/2000/2036',
      category: 'Pain Relief'
    },
    {
      id: '8',
      name: 'Amoxicillin 500mg',
      price: 2200,
      originalPrice: 2800,
      discount: 21,
      image: 'https://picsum.photos/2000/2037',
      category: 'Antibiotics'
    }
  ];

  // Filter medicines by category
  const categoryMedicines = allMedicines.filter(med => 
    med.category.toLowerCase() === displayCategory.toLowerCase()
  );

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

  const updateCartQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === medicineId ? { ...item, quantity } : item
      )
    );
  };

  const toggleFavorite = (medicineId: string) => {
    setFavorites(prev => 
      prev.includes(medicineId)
        ? prev.filter(id => id !== medicineId)
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
        medicines={allMedicines}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">{displayCategory}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header with enhanced typography */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-all duration-300 hover:translate-x-1">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="font-poppins font-bold mb-4 text-gradient-primary">
            {displayCategory}
          </h1>
          <p className="text-muted-foreground text-lg font-inter">
            {categoryMedicines.length} products found in {displayCategory}
          </p>
        </div>

        {/* Products Grid with enhanced cards */}
        {categoryMedicines.length === 0 ? (
          <div className="text-center py-20">
            <div className="modern-card max-w-md mx-auto p-12">
              <p className="text-muted-foreground text-xl font-medium">No products found in this category.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categoryMedicines.map((medicine) => (
              <Card key={medicine.id} className="modern-card group healthcare-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Link to={`/product/${medicine.id}`}>
                      <img
                        src={medicine.image}
                        alt={medicine.name}
                        className="w-full h-56 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
                      />
                    </Link>
                    {medicine.discount && (
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg">
                        -{medicine.discount}%
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className={`absolute top-3 left-3 h-10 w-10 rounded-full backdrop-blur-sm transition-all duration-300 ${
                        favorites.includes(medicine.id) 
                          ? 'text-red-500 bg-white/90 shadow-lg scale-110' 
                          : 'text-gray-600 bg-white/70 hover:bg-white/90 hover:text-red-500 hover:scale-110'
                      }`}
                      onClick={() => toggleFavorite(medicine.id)}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(medicine.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{medicine.category}</p>
                    <Link to={`/product/${medicine.id}`}>
                      <h3 className="font-semibold text-base line-clamp-2 hover:text-primary cursor-pointer transition-colors font-poppins leading-tight">
                        {medicine.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-xl font-bold text-primary font-space-grotesk">
                        Kshs {medicine.price.toLocaleString()}
                      </span>
                      {medicine.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through font-space-grotesk">
                          Kshs {medicine.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full btn-gradient rounded-xl font-semibold py-3"
                      onClick={() => addToCart(medicine)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;

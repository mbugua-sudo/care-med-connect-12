
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { BlurImage } from '@/components/BlurImage';

const ConditionPage = () => {
  const { condition } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock medicines for each condition
  const conditionMedicines: Record<string, any[]> = {
    'stomach-care-digestive-health': [
      {
        id: 'digestive-1',
        name: 'Omeprazole 20mg',
        price: 1850,
        originalPrice: 2200,
        discount: 16,
        image: 'https://picsum.photos/300/300?random=101',
        rating: 4.5,
        category: 'Digestive Health'
      },
      {
        id: 'digestive-2',
        name: 'Ranitidine 150mg',
        price: 1299,
        originalPrice: 1599,
        discount: 19,
        image: 'https://picsum.photos/300/300?random=102',
        rating: 4.3,
        category: 'Digestive Health'
      },
      {
        id: 'digestive-3',
        name: 'Antacid Tablets',
        price: 899,
        originalPrice: 1199,
        discount: 25,
        image: 'https://picsum.photos/300/300?random=103',
        rating: 4.2,
        category: 'Digestive Health'
      },
      {
        id: 'digestive-4',
        name: 'Probiotics Capsules',
        price: 2599,
        originalPrice: 3299,
        discount: 21,
        image: 'https://picsum.photos/300/300?random=104',
        rating: 4.6,
        category: 'Digestive Health'
      },
      {
        id: 'digestive-5',
        name: 'Simethicone 40mg',
        price: 1499,
        originalPrice: 1899,
        discount: 21,
        image: 'https://picsum.photos/300/300?random=105',
        rating: 4.1,
        category: 'Digestive Health'
      }
    ],
    'pain-relief-management': [
      {
        id: 'pain-1',
        name: 'Paracetamol 500mg',
        price: 1299,
        originalPrice: 1599,
        discount: 19,
        image: 'https://picsum.photos/300/300?random=201',
        rating: 4.7,
        category: 'Pain Relief'
      },
      {
        id: 'pain-2',
        name: 'Ibuprofen 400mg',
        price: 1850,
        originalPrice: 2250,
        discount: 18,
        image: 'https://picsum.photos/300/300?random=202',
        rating: 4.6,
        category: 'Pain Relief'
      },
      {
        id: 'pain-3',
        name: 'Aspirin 300mg',
        price: 999,
        originalPrice: 1299,
        discount: 23,
        image: 'https://picsum.photos/300/300?random=203',
        rating: 4.4,
        category: 'Pain Relief'
      },
      {
        id: 'pain-4',
        name: 'Diclofenac Gel',
        price: 2199,
        originalPrice: 2799,
        discount: 21,
        image: 'https://picsum.photos/300/300?random=204',
        rating: 4.5,
        category: 'Pain Relief'
      },
      {
        id: 'pain-5',
        name: 'Tramadol 50mg',
        price: 3299,
        originalPrice: 4199,
        discount: 21,
        image: 'https://picsum.photos/300/300?random=205',
        rating: 4.3,
        category: 'Pain Relief'
      }
    ],
    'diabetes': [
      {
        id: 'diabetes-1',
        name: 'Metformin 500mg',
        price: 2299,
        originalPrice: 2899,
        discount: 21,
        image: 'https://picsum.photos/300/300?random=301',
        rating: 4.8,
        category: 'Diabetes Care'
      },
      {
        id: 'diabetes-2',
        name: 'Glibenclamide 5mg',
        price: 1899,
        originalPrice: 2399,
        discount: 21,
        image: 'https://picsum.photos/300/300?random=302',
        rating: 4.6,
        category: 'Diabetes Care'
      },
      {
        id: 'diabetes-3',
        name: 'Insulin Needles',
        price: 1599,
        originalPrice: 1999,
        discount: 20,
        image: 'https://picsum.photos/300/300?random=303',
        rating: 4.7,
        category: 'Diabetes Care'
      },
      {
        id: 'diabetes-4',
        name: 'Blood Glucose Strips',
        price: 2799,
        originalPrice: 3499,
        discount: 20,
        image: 'https://picsum.photos/300/300?random=304',
        rating: 4.5,
        category: 'Diabetes Care'
      },
      {
        id: 'diabetes-5',
        name: 'Diabetic Foot Cream',
        price: 1799,
        originalPrice: 2299,
        discount: 22,
        image: 'https://picsum.photos/300/300?random=305',
        rating: 4.4,
        category: 'Diabetes Care'
      }
    ],
    'hypertension': [
      {
        id: 'hypertension-1',
        name: 'Amlodipine 5mg',
        price: 2199,
        originalPrice: 2799,
        discount: 21,
        image: 'https://picsum.photos/300/300?random=401',
        rating: 4.7,
        category: 'Heart Health'
      },
      {
        id: 'hypertension-2',
        name: 'Losartan 50mg',
        price: 2599,
        originalPrice: 3299,
        discount: 21,
        image: 'https://picsum.photos/300/300?random=402',
        rating: 4.6,
        category: 'Heart Health'
      },
      {
        id: 'hypertension-3',
        name: 'Hydrochlorothiazide 25mg',
        price: 1799,
        originalPrice: 2299,
        discount: 22,
        image: 'https://picsum.photos/300/300?random=403',
        rating: 4.5,
        category: 'Heart Health'
      },
      {
        id: 'hypertension-4',
        name: 'Blood Pressure Monitor',
        price: 8999,
        originalPrice: 11499,
        discount: 22,
        image: 'https://picsum.photos/300/300?random=404',
        rating: 4.8,
        category: 'Heart Health'
      }
    ]
  };

  const conditionName = condition?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
  const medicines = conditionMedicines[condition || ''] || [];

  const addToCart = (medicine: any) => {
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
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span>Shop by Condition</span>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{conditionName}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            {conditionName} Medicines
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            Find effective medicines and treatments for {conditionName.toLowerCase()}. 
            All products are genuine and sourced from certified manufacturers.
          </p>
        </div>

        {/* Medicines Grid */}
        {medicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {medicines.map((medicine) => (
              <Card key={medicine.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <BlurImage
                      src={medicine.image}
                      alt={medicine.name}
                      className="w-full h-48 object-cover rounded-lg"
                      hash="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
                    />
                    {medicine.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                        {medicine.discount}% OFF
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-2 right-2 ${
                        favorites.includes(medicine.id)
                          ? 'text-red-500 hover:text-red-600'
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                      onClick={() => toggleFavorite(medicine.id)}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(medicine.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm sm:text-base line-clamp-2">
                      {medicine.name}
                    </h3>
                    
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(medicine.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({medicine.rating})
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary">
                        KES {medicine.price.toLocaleString()}
                      </span>
                      {medicine.originalPrice > medicine.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          KES {medicine.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full text-xs sm:text-sm"
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
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No medicines found</h3>
            <p className="text-muted-foreground mb-6">
              We're working to add medicines for this condition. Please check back soon.
            </p>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ConditionPage;

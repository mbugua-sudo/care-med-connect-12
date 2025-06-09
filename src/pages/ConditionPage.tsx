
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

  // Comprehensive medicines for each condition with brand names
  const conditionMedicines: Record<string, any[]> = {
    'stomach-care-digestive-health': [
      {
        id: 'digestive-1',
        name: 'Omeprazole 20mg',
        brand: 'Prilosec',
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
        brand: 'Zantac',
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
        brand: 'Tums',
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
        brand: 'Culturelle',
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
        brand: 'Gas-X',
        price: 1499,
        originalPrice: 1899,
        discount: 21,
        image: 'https://picsum.photos/300/300?random=105',
        rating: 4.1,
        category: 'Digestive Health'
      },
      {
        id: 'digestive-6',
        name: 'Loperamide 2mg',
        brand: 'Imodium',
        price: 799,
        originalPrice: 999,
        discount: 20,
        image: 'https://picsum.photos/300/300?random=106',
        rating: 4.0,
        category: 'Digestive Health'
      }
    ],
    'pain-relief-management': [
      {
        id: 'pain-1',
        name: 'Paracetamol 500mg',
        brand: 'Tylenol',
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
        brand: 'Advil',
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
        brand: 'Bayer',
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
        brand: 'Voltaren',
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
        brand: 'Ultram',
        price: 3299,
        originalPrice: 4199,
        discount: 21,
        image: 'https://picsum.photos/300/300?random=205',
        rating: 4.3,
        category: 'Pain Relief'
      },
      {
        id: 'pain-6',
        name: 'Naproxen 250mg',
        brand: 'Aleve',
        price: 1699,
        originalPrice: 2099,
        discount: 19,
        image: 'https://picsum.photos/300/300?random=206',
        rating: 4.2,
        category: 'Pain Relief'
      }
    ],
    'diabetes': [
      {
        id: 'diabetes-1',
        name: 'Metformin 500mg',
        brand: 'Glucophage',
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
        brand: 'Daonil',
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
        brand: 'BD Ultra-Fine',
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
        brand: 'OneTouch',
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
        brand: 'Diabetic Care',
        price: 1799,
        originalPrice: 2299,
        discount: 22,
        image: 'https://picsum.photos/300/300?random=305',
        rating: 4.4,
        category: 'Diabetes Care'
      },
      {
        id: 'diabetes-6',
        name: 'Glucometer Device',
        brand: 'Accu-Chek',
        price: 3999,
        originalPrice: 4999,
        discount: 20,
        image: 'https://picsum.photos/300/300?random=306',
        rating: 4.8,
        category: 'Diabetes Care'
      }
    ],
    'hypertension': [
      {
        id: 'hypertension-1',
        name: 'Amlodipine 5mg',
        brand: 'Norvasc',
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
        brand: 'Cozaar',
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
        brand: 'Microzide',
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
        brand: 'Omron',
        price: 8999,
        originalPrice: 11499,
        discount: 22,
        image: 'https://picsum.photos/300/300?random=404',
        rating: 4.8,
        category: 'Heart Health'
      }
    ],
    'mental-health-depression': [
      {
        id: 'mental-1',
        name: 'Sertraline 50mg',
        brand: 'Zoloft',
        price: 2999,
        originalPrice: 3699,
        discount: 19,
        image: 'https://picsum.photos/300/300?random=501',
        rating: 4.5,
        category: 'Mental Health'
      },
      {
        id: 'mental-2',
        name: 'Fluoxetine 20mg',
        brand: 'Prozac',
        price: 2599,
        originalPrice: 3199,
        discount: 19,
        image: 'https://picsum.photos/300/300?random=502',
        rating: 4.4,
        category: 'Mental Health'
      }
    ],
    'cold-flu': [
      {
        id: 'cold-1',
        name: 'Paracetamol Cold Relief',
        brand: 'Tylenol Cold',
        price: 899,
        originalPrice: 1199,
        discount: 25,
        image: 'https://picsum.photos/300/300?random=601',
        rating: 4.3,
        category: 'Cold & Flu'
      },
      {
        id: 'cold-2',
        name: 'Cough Syrup',
        brand: 'Robitussin',
        price: 1299,
        originalPrice: 1599,
        discount: 19,
        image: 'https://picsum.photos/300/300?random=602',
        rating: 4.2,
        category: 'Cold & Flu'
      }
    ],
    'allergies': [
      {
        id: 'allergy-1',
        name: 'Cetirizine 10mg',
        brand: 'Zyrtec',
        price: 699,
        originalPrice: 899,
        discount: 22,
        image: 'https://picsum.photos/300/300?random=701',
        rating: 4.6,
        category: 'Allergy Relief'
      },
      {
        id: 'allergy-2',
        name: 'Loratadine 10mg',
        brand: 'Claritin',
        price: 799,
        originalPrice: 999,
        discount: 20,
        image: 'https://picsum.photos/300/300?random=702',
        rating: 4.4,
        category: 'Allergy Relief'
      }
    ],
    'asthma-respiratory': [
      {
        id: 'respiratory-1',
        name: 'Salbutamol Inhaler',
        brand: 'Ventolin',
        price: 1899,
        originalPrice: 2399,
        discount: 21,
        image: 'https://picsum.photos/300/300?random=801',
        rating: 4.8,
        category: 'Respiratory'
      },
      {
        id: 'respiratory-2',
        name: 'Budesonide Inhaler',
        brand: 'Pulmicort',
        price: 3299,
        originalPrice: 4199,
        discount: 21,
        image: 'https://picsum.photos/300/300?random=802',
        rating: 4.7,
        category: 'Respiratory'
      }
    ],
    'skin-conditions': [
      {
        id: 'skin-1',
        name: 'Hydrocortisone Cream',
        brand: 'Cortaid',
        price: 1199,
        originalPrice: 1499,
        discount: 20,
        image: 'https://picsum.photos/300/300?random=901',
        rating: 4.4,
        category: 'Skin Care'
      },
      {
        id: 'skin-2',
        name: 'Antifungal Cream',
        brand: 'Lamisil',
        price: 1599,
        originalPrice: 1999,
        discount: 20,
        image: 'https://picsum.photos/300/300?random=902',
        rating: 4.3,
        category: 'Skin Care'
      }
    ],
    'eye-care': [
      {
        id: 'eye-1',
        name: 'Artificial Tears',
        brand: 'Refresh',
        price: 899,
        originalPrice: 1199,
        discount: 25,
        image: 'https://picsum.photos/300/300?random=1001',
        rating: 4.5,
        category: 'Eye Care'
      },
      {
        id: 'eye-2',
        name: 'Antibiotic Eye Drops',
        brand: 'Vigamox',
        price: 1599,
        originalPrice: 1999,
        discount: 20,
        image: 'https://picsum.photos/300/300?random=1002',
        rating: 4.6,
        category: 'Eye Care'
      }
    ],
    'womens-health': [
      {
        id: 'womens-1',
        name: 'Iron Supplements',
        brand: 'Feosol',
        price: 1299,
        originalPrice: 1599,
        discount: 19,
        image: 'https://picsum.photos/300/300?random=1101',
        rating: 4.4,
        category: 'Women\'s Health'
      },
      {
        id: 'womens-2',
        name: 'Folic Acid Tablets',
        brand: 'Nature Made',
        price: 899,
        originalPrice: 1199,
        discount: 25,
        image: 'https://picsum.photos/300/300?random=1102',
        rating: 4.5,
        category: 'Women\'s Health'
      }
    ],
    'mens-health': [
      {
        id: 'mens-1',
        name: 'Multivitamin for Men',
        brand: 'Centrum Men',
        price: 2199,
        originalPrice: 2799,
        discount: 21,
        image: 'https://picsum.photos/300/300?random=1201',
        rating: 4.3,
        category: 'Men\'s Health'
      },
      {
        id: 'mens-2',
        name: 'Testosterone Support',
        brand: 'TestoFuel',
        price: 3299,
        originalPrice: 4199,
        discount: 21,
        image: 'https://picsum.photos/300/300?random=1202',
        rating: 4.2,
        category: 'Men\'s Health'
      }
    ],
    'senior-care': [
      {
        id: 'senior-1',
        name: 'Senior Multivitamin',
        brand: 'Centrum Silver',
        price: 2599,
        originalPrice: 3299,
        discount: 21,
        image: 'https://picsum.photos/300/300?random=1301',
        rating: 4.6,
        category: 'Senior Care'
      },
      {
        id: 'senior-2',
        name: 'Joint Support Formula',
        brand: 'Glucosamine Plus',
        price: 3799,
        originalPrice: 4699,
        discount: 19,
        image: 'https://picsum.photos/300/300?random=1302',
        rating: 4.4,
        category: 'Senior Care'
      }
    ]
  };

  // Get all medicines for the favorites functionality
  const allMedicines = Object.values(conditionMedicines).flat();

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
        medicines={allMedicines}
      />
      
      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-muted-foreground text-left">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop-by-condition" className="hover:text-primary">Shop by Condition</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{conditionName}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {conditionName} Medicines
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
            Find effective medicines and treatments for {conditionName.toLowerCase()}. 
            All products are genuine and sourced from certified manufacturers.
          </p>
        </div>

        {/* Medicines Grid */}
        {medicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {medicines.map((medicine) => (
              <Card key={medicine.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    <BlurImage
                      src={medicine.image}
                      alt={medicine.name}
                      className="w-full h-48 object-cover rounded-lg"
                      blurhash="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
                    />
                    {medicine.discount > 0 && (
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1">
                        {medicine.discount}% OFF
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-3 right-3 ${
                        favorites.includes(medicine.id)
                          ? 'text-red-500 hover:text-red-600'
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                      onClick={() => toggleFavorite(medicine.id)}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(medicine.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg line-clamp-2 leading-tight text-left">
                        {medicine.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 text-left">
                        by {medicine.brand}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(medicine.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({medicine.rating})
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-xl font-bold text-primary">
                        KES {medicine.price.toLocaleString()}
                      </span>
                      {medicine.originalPrice > medicine.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          KES {medicine.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full text-sm font-medium py-3 mt-4"
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
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold mb-4">No medicines found</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              We're working to add medicines for this condition. Please check back soon.
            </p>
            <Link to="/">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ConditionPage;

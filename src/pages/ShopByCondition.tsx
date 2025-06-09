/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage 
} from '@/components/ui/breadcrumb';
import { 
  Search, 
  Heart, 
  Brain, 
  Eye, 
  Thermometer, 
  Shield, 
  Activity,
  Pill,
  Stethoscope,
  Baby,
  Users,
  UserCheck
} from 'lucide-react';

const ShopByCondition = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [conditionSearch, setConditionSearch] = useState('');

  // Health conditions with their details
  const healthConditions = [
    {
      id: 'stomach-care-digestive-health',
      name: 'Stomach Care & Digestive Health',
      description: 'Medicines for acid reflux, heartburn, indigestion, and digestive issues',
      icon: Activity,
      color: 'bg-green-100 text-green-700',
      medicineCount: 6,
      category: 'Digestive'
    },
    {
      id: 'pain-relief-management',
      name: 'Pain Relief & Management',
      description: 'Effective pain medications for headaches, muscle pain, and inflammation',
      icon: Pill,
      color: 'bg-red-100 text-red-700',
      medicineCount: 6,
      category: 'Pain Relief'
    },
    {
      id: 'diabetes',
      name: 'Diabetes',
      description: 'Blood sugar management, insulin, and diabetic care products',
      icon: Activity,
      color: 'bg-blue-100 text-blue-700',
      medicineCount: 6,
      category: 'Chronic Care'
    },
    {
      id: 'hypertension',
      name: 'Hypertension',
      description: 'Blood pressure medications and monitoring devices',
      icon: Heart,
      color: 'bg-purple-100 text-purple-700',
      medicineCount: 4,
      category: 'Heart Health'
    },
    {
      id: 'mental-health-depression',
      name: 'Mental Health & Depression',
      description: 'Mental wellness support and prescribed medications',
      icon: Brain,
      color: 'bg-indigo-100 text-indigo-700',
      medicineCount: 2,
      category: 'Mental Health'
    },
    {
      id: 'cold-flu',
      name: 'Cold & Flu',
      description: 'Relief from cold symptoms, fever, and seasonal illnesses',
      icon: Thermometer,
      color: 'bg-cyan-100 text-cyan-700',
      medicineCount: 2,
      category: 'Respiratory'
    },
    {
      id: 'allergies',
      name: 'Allergies',
      description: 'Antihistamines and allergy relief medications',
      icon: Shield,
      color: 'bg-yellow-100 text-yellow-700',
      medicineCount: 2,
      category: 'Immune Support'
    },
    {
      id: 'asthma-respiratory',
      name: 'Asthma & Respiratory',
      description: 'Inhalers and respiratory care products',
      icon: Stethoscope,
      color: 'bg-teal-100 text-teal-700',
      medicineCount: 2,
      category: 'Respiratory'
    },
    {
      id: 'skin-conditions',
      name: 'Skin Conditions',
      description: 'Topical treatments for eczema, rashes, and skin health',
      icon: Shield,
      color: 'bg-orange-100 text-orange-700',
      medicineCount: 2,
      category: 'Dermatology'
    },
    {
      id: 'eye-care',
      name: 'Eye Care',
      description: 'Eye drops, vision care, and ocular health products',
      icon: Eye,
      color: 'bg-emerald-100 text-emerald-700',
      medicineCount: 2,
      category: 'Vision Care'
    },
    {
      id: 'womens-health',
      name: 'Women\'s Health',
      description: 'Specialized healthcare products for women',
      icon: Users,
      color: 'bg-pink-100 text-pink-700',
      medicineCount: 2,
      category: 'Women\'s Health'
    },
    {
      id: 'mens-health',
      name: 'Men\'s Health',
      description: 'Health products specifically for men\'s wellness',
      icon: UserCheck,
      color: 'bg-slate-100 text-slate-700',
      medicineCount: 2,
      category: 'Men\'s Health'
    },
    {
      id: 'senior-care',
      name: 'Senior Care',
      description: 'Healthcare solutions for elderly and senior citizens',
      icon: Baby,
      color: 'bg-amber-100 text-amber-700',
      medicineCount: 2,
      category: 'Senior Care'
    }
  ];

  // Mock medicines data for conditions
  const conditionMedicines = {
    'stomach-care-digestive-health': [
      { id: '1', name: 'Paracetamol 500mg', price: 1299, originalPrice: 1599, discount: 20, image: 'https://picsum.photos/2000/2030' },
      { id: '2', name: 'Antacid Tablets', price: 899, originalPrice: 1099, discount: 18, image: 'https://picsum.photos/2000/2031' }
    ],
    'pain-relief-management': [
      { id: '3', name: 'Ibuprofen 400mg', price: 1850, originalPrice: 2250, discount: 18, image: 'https://picsum.photos/2000/2032' },
      { id: '4', name: 'Aspirin 325mg', price: 1200, originalPrice: 1450, discount: 17, image: 'https://picsum.photos/2000/2033' }
    ]
  };

  // Filter conditions based on search
  const filteredConditions = healthConditions.filter(condition =>
    condition.name.toLowerCase().includes(conditionSearch.toLowerCase()) ||
    condition.description.toLowerCase().includes(conditionSearch.toLowerCase()) ||
    condition.category.toLowerCase().includes(conditionSearch.toLowerCase())
  );

  // Group conditions by category
  const groupedConditions = filteredConditions.reduce((acc, condition) => {
    if (!acc[condition.category]) {
      acc[condition.category] = [];
    }
    acc[condition.category].push(condition);
    return acc;
  }, {} as Record<string, typeof healthConditions>);

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
        medicines={[]}
      />
      
      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home /</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Shop by Condition</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Shop by Condition
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Find the right medicines and treatments for your specific health condition. 
            Browse our comprehensive collection of healthcare products organized by medical conditions.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search health conditions..."
              value={conditionSearch}
              onChange={(e) => setConditionSearch(e.target.value)}
              className="pl-10 pr-4 py-3 text-base rounded-full border-2 focus:border-primary"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-primary mb-2">{healthConditions.length}</div>
              <div className="text-muted-foreground">Health Conditions</div>
            </CardContent>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-green-700 mb-2">50+</div>
              <div className="text-muted-foreground">Medicine Types</div>
            </CardContent>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-blue-700 mb-2">100%</div>
              <div className="text-muted-foreground">Verified Products</div>
            </CardContent>
          </Card>
        </div>

        {/* Conditions Grid by Category */}
        {Object.entries(groupedConditions).map(([category, conditions]) => (
          <div key={category} className="mb-16">
            <div className="flex items-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                {category}
              </h2>
              <Badge variant="secondary" className="ml-4 px-3 py-1">
                {conditions.length} condition{conditions.length !== 1 ? 's' : ''}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {conditions.map((condition) => {
                const IconComponent = condition.icon;
                const medicines = conditionMedicines[condition.id] || [];
                
                return (
                  <div key={condition.id}>
                    <Link to={`/condition/${condition.id}`}>
                      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full mb-4">
                        <CardContent className="p-6 h-full flex flex-col">
                          <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl ${condition.color}`}>
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {condition.medicineCount} medicines
                            </Badge>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors leading-tight">
                              {condition.name}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {condition.description}
                            </p>
                          </div>
                          
                          <div className="mt-6 pt-4 border-t border-border">
                            <span className="text-primary text-sm font-medium group-hover:underline">
                              Browse Medicines →
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                    
                    {/* Sample medicines for this condition */}
                    {medicines.length > 0 && (
                      <div className="grid grid-cols-1 gap-3">
                        {medicines.slice(0, 2).map((medicine) => (
                          <Link key={medicine.id} to={`/product/${medicine.id}`}>
                            <Card className="hover:shadow-md transition-all duration-200 cursor-pointer">
                              <CardContent className="p-3">
                                <div className="flex items-center space-x-3">
                                  <img 
                                    src={medicine.image} 
                                    alt={medicine.name}
                                    className="w-12 h-12 object-cover rounded bg-muted"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm truncate">{medicine.name}</h4>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm font-bold text-primary">
                                        KES {medicine.price}
                                      </span>
                                      {medicine.originalPrice && (
                                        <span className="text-xs text-muted-foreground line-through">
                                          KES {medicine.originalPrice}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* No Results */}
        {filteredConditions.length === 0 && conditionSearch && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-4">No conditions found</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Try searching with different keywords or browse all available conditions.
            </p>
            <button
              onClick={() => setConditionSearch('')}
              className="text-primary hover:underline font-medium"
            >
              Clear search and view all conditions
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-primary/5 to-blue-50 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Need Help Finding the Right Medicine?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Our healthcare experts are here to help you find the most effective treatments for your condition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-block">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
                Contact a Pharmacist
              </button>
            </Link>
            <Link to="/consultation" className="inline-block">
              <button className="border border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary/5 transition-colors">
                Book Consultation
              </button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopByCondition;

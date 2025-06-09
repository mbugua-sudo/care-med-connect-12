import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedBlobs } from '@/components/AnimatedBlobs';
import { CategorizedSearchResults } from '@/components/CategorizedSearchResults';
import { ArrowLeft } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For testing
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Mock medicines for favorites functionality with updated currency
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
    }
  ];

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
    <div className="min-h-screen bg-background relative">
      <AnimatedBlobs />
      <Header 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateCartQuantity={updateCartQuantity}
        searchQuery={query}
        setSearchQuery={() => {}}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        medicines={allMedicines}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-all duration-300 hover:translate-x-1 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="font-poppins font-bold mb-4 text-gradient-primary">Search Results</h1>
          <p className="text-muted-foreground text-lg font-inter">
            Results for <span className="font-semibold text-foreground">"{query}"</span> organized by categories
          </p>
        </div>

        <CategorizedSearchResults
          query={query}
          addToCart={addToCart}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;

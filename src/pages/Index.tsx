
import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { TrustIndicators } from '@/components/TrustIndicators';
import { MedicineCarousel } from '@/components/MedicineCarousel';
import { ServiceCards } from '@/components/ServiceCards';
import { PrescriptionUpload } from '@/components/PrescriptionUpload';
import { Footer } from '@/components/Footer';
import { AdvertisementBanner } from '@/components/AdvertisementBanner';
import { AnimatedBlobs } from '@/components/AnimatedBlobs';
import { CookieConsent } from '@/components/CookieConsent';
import { FreeDeliveryOverlay } from '@/components/FreeDeliveryOverlay';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For testing notifications
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const advertisementImages2 = [
    'https://picsum.photos/2000/2004',
    'https://picsum.photos/2000/2005',
    'https://picsum.photos/2000/2006'
  ];

  // Mock medicines for favorites functionality
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
    <div className="min-h-screen bg-background relative outline">
      <AnimatedBlobs />
      <FreeDeliveryOverlay />
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
      <main>
        <HeroSection />
        <TrustIndicators />
        <div id="medicine-offers">
          <MedicineCarousel 
            title="Medicine on Offer" 
            addToCart={addToCart}
            type="offers"
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            searchQuery={searchQuery}
          />
        </div>
        <MedicineCarousel 
          title="New Medicine in Stock" 
          addToCart={addToCart}
          type="new-stock"
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          searchQuery={searchQuery}
        />
        <AdvertisementBanner images={advertisementImages2} />
        <MedicineCarousel 
          title="New Medicine" 
          addToCart={addToCart}
          type="new-medicine"
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          searchQuery={searchQuery}
        />
        
        {/* Two 50% width banners below New Medicine */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-lg group">
                <img
                  src="https://picsum.photos/2000/2012"
                  alt="Advertisement Banner 1"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <h3 className="text-xl font-bold mb-2">Health & Wellness</h3>
                    <p className="text-sm">Discover our range of health products and supplements</p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-lg group">
                <img
                  src="https://picsum.photos/2000/2013"
                  alt="Advertisement Banner 2"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <h3 className="text-xl font-bold mb-2">Prescription Services</h3>
                    <p className="text-sm">Upload your prescription for quick and easy ordering</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <ServiceCards />
        <div id="prescription-upload">
          <PrescriptionUpload />
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;

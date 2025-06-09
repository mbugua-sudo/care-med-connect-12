
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

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const advertisementImages1 = [
    'https://picsum.photos/2000/2001',
    'https://picsum.photos/2000/2002',
    'https://picsum.photos/2000/2003'
  ];

  const advertisementImages2 = [
    'https://picsum.photos/2000/2004',
    'https://picsum.photos/2000/2005',
    'https://picsum.photos/2000/2006'
  ];

  const advertisementImages3 = [
    'https://picsum.photos/2000/2007',
    'https://picsum.photos/2000/2008'
  ];

  const advertisementImages4 = [
    'https://picsum.photos/2000/2009',
    'https://picsum.photos/2000/2010',
    'https://picsum.photos/2000/2011'
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
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main>
        <HeroSection />
        <TrustIndicators />
        <MedicineCarousel 
          title="Medicine on Offer" 
          addToCart={addToCart}
          type="offers"
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          searchQuery={searchQuery}
        />
        <AdvertisementBanner images={advertisementImages1} />
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
        <AdvertisementBanner images={advertisementImages3} />
        <AdvertisementBanner images={advertisementImages4} />
        <ServiceCards />
        <PrescriptionUpload />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

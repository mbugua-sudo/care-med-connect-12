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

  const advertisementImages1 = [
    'https://picsum.photos/200/201',
    'https://picsum.photos/200/202',
    'https://picsum.photos/200/203'
  ];

  const advertisementImages2 = [
    'https://picsum.photos/200/204',
    'https://picsum.photos/200/205',
    'https://picsum.photos/200/206'
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

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBlobs />
      <Header 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateCartQuantity={updateCartQuantity}
      />
      <main>
        <HeroSection />
        <TrustIndicators />
        <MedicineCarousel 
          title="Medicine on Offer" 
          addToCart={addToCart}
          type="offers"
        />
        <AdvertisementBanner images={advertisementImages1} />
        <MedicineCarousel 
          title="New Medicine in Stock" 
          addToCart={addToCart}
          type="new-stock"
        />
        <AdvertisementBanner images={advertisementImages2} />
        <MedicineCarousel 
          title="New Medicine" 
          addToCart={addToCart}
          type="new-medicine"
        />
        <ServiceCards />
        <PrescriptionUpload />
      </main>
      <Footer />
    </div>
  );
};

export default Index;


import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { ServiceCards } from '@/components/ServiceCards';
import { PrescriptionUpload } from '@/components/PrescriptionUpload';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <main>
        <HeroSection />
        <ServiceCards />
        <FeaturedProducts />
        <PrescriptionUpload />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

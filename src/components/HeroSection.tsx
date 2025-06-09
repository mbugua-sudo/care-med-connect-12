
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Background images for the hero carousel
  const backgroundImages = [
    'https://picsum.photos/2000/2020',
    'https://picsum.photos/2000/2021',
    'https://picsum.photos/2000/2022'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center py-16 transition-all duration-1000 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url(${backgroundImages[currentSlide]})`,
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Your Health,
              <span className="text-primary-foreground block">Delivered</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Get genuine medicines delivered to your doorstep. Licensed pharmacists, 
              verified products, and secure prescriptions - all in one trusted platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                Order Medicines Now
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                Upload Prescription
              </Button>
            </div>
          </div>

          {/* Hero image placeholder - can be removed or replaced with additional content */}
          <div className="relative lg:block hidden">
            <div className="w-full h-96 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
              <p className="text-white/80 text-center">
                Additional hero content area
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/30'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

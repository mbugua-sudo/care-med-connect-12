
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // 5 Background images for the hero carousel
  const backgroundImages = [
    'https://picsum.photos/2000/2020',
    'https://picsum.photos/2000/2021',
    'https://picsum.photos/2000/2022',
    'https://picsum.photos/2000/2023',
    'https://picsum.photos/2000/2024'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
        setIsTransitioning(false);
      }, 500); // Half of transition duration
    }, 5000);

    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  const nextIndex = (currentSlide + 1) % backgroundImages.length;

  return (
    <section className="relative h-[50dvh] flex items-center justify-center py-16 overflow-hidden">
      {/* Current Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ 
          backgroundImage: `url(${backgroundImages[currentSlide]})`,
        }}
      />
      
      {/* Next Image for Vertical Split Effect */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ${
          isTransitioning ? 'transform translate-y-0' : 'transform translate-y-full'
        }`}
        style={{ 
          backgroundImage: `url(${backgroundImages[nextIndex]})`,
          clipPath: isTransitioning 
            ? 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' 
            : 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'
        }}
      />

      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Order Medicines Now
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                Upload Prescription
              </Button>
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

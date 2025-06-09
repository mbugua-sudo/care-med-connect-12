
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
    <section className="relative h-[60dvh] flex items-center justify-center overflow-hidden">
      {/* Current Image - full width */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ 
          backgroundImage: `url(${backgroundImages[currentSlide]})`,
        }}
      />
      
      {/* Next Image for Vertical Split Effect - full width */}
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

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent" />
      
      {/* Background blob positioned on top - moved to appear above content */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float z-30" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float z-10" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero content with enhanced typography */}
          <div className="space-y-8">
            <h1 className="font-poppins font-bold text-white leading-tight text-shadow-lg">
              <span className="block text-5xl lg:text-7xl mb-2">Your Health,</span>
              <span className="block text-gradient-accent text-6xl lg:text-8xl animate-shimmer">Delivered</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/95 leading-relaxed font-inter font-light text-shadow">
              Get genuine medicines delivered to your doorstep. Licensed pharmacists, 
              verified products, and secure prescriptions - all in one trusted platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Button size="lg" className="btn-gradient text-lg px-10 py-4 rounded-2xl font-semibold text-shadow-sm border-0 animate-glow">
                Order Medicines Now
              </Button>
              <Button variant="outline" size="lg" className="glass-effect text-lg px-10 py-4 rounded-2xl font-semibold text-white border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 backdrop-blur-xl">
                Upload Prescription
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced carousel indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white shadow-glow scale-125' 
                : 'bg-white/40 hover:bg-white/70'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

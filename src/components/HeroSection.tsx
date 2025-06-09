
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Placeholder for background images - user will add these later
  const backgroundImages = [
    'linear-gradient(135deg, hsl(var(--primary)/0.1) 0%, hsl(var(--primary)/0.05) 100%)',
    'linear-gradient(135deg, hsl(var(--health-info)/0.1) 0%, hsl(var(--health-info)/0.05) 100%)',
    'linear-gradient(135deg, hsl(var(--health-success)/0.1) 0%, hsl(var(--health-success)/0.05) 100%)'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center py-16 transition-all duration-1000"
      style={{ background: backgroundImages[currentSlide] }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-background/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              Your Health,
              <span className="text-primary block">Delivered</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Get genuine medicines delivered to your doorstep. Licensed pharmacists, 
              verified products, and secure prescriptions - all in one trusted platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                Order Medicines Now
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Upload Prescription
              </Button>
            </div>
          </div>

          {/* Hero image placeholder */}
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                Hero carousel images will be added here
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
              index === currentSlide ? 'bg-primary' : 'bg-primary/30'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

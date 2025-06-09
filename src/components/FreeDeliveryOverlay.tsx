import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Truck, Gift, Star } from 'lucide-react';

export const FreeDeliveryOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenOverlay = localStorage.getItem('freeDeliveryOverlay');
    if (!hasSeenOverlay) {
      // Show after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeOverlay = () => {
    localStorage.setItem('freeDeliveryOverlay', 'seen');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in !h-screen">
        <Card className="max-w-md mx-4 relative bg-gradient-to-br from-primary via-primary to-primary/90 text-white shadow-2xl border-0 overflow-hidden">
          <Button
            size="icon"
            variant="ghost"
            onClick={closeOverlay}
            className="absolute top-3 right-3 text-white/80 hover:text-white hover:bg-white/20 rounded-full h-8 w-8 z-10"
          >
            <X className="w-4 h-4" />
          </Button>
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="p-8 text-center relative">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Gift className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Truck className="w-4 h-4 text-primary" />
                </div>
                <div className="absolute -top-1 -left-1">
                  <Star className="w-6 h-6 text-yellow-300 fill-current animate-pulse" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-white/90 bg-clip-text">
                  FREE DELIVERY
                </h2>
                <div className="w-16 h-1 bg-white/50 mx-auto rounded-full mb-3"></div>
                <p className="text-xl font-semibold text-white/95 mb-2">
                  For Orders Above Ksh 2,500
                </p>
                <p className="text-sm text-white/80 leading-relaxed">
                  Welcome to MediCare! Get your medicines delivered free of charge
                  when you spend Ksh 2,500 or more. Fast, reliable, and secure delivery.
                </p>
              </div>
              <div className="space-y-3 pt-2">
                <Button
                  variant="secondary"
                  className="w-full bg-white text-primary hover:bg-white/90 shadow-lg font-semibold py-3"
                  onClick={closeOverlay}
                >
                  Start Shopping Now
                </Button>
                <p className="text-xs text-white/70 leading-relaxed">
                  *Terms and conditions apply. Valid for orders within Nairobi metropolitan area.
                  Delivery within 2-4 hours during business hours.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
    );
  }
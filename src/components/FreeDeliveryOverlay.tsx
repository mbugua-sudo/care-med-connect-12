
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Truck, Gift } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <Card className="max-w-md mx-4 p-6 relative bg-gradient-to-br from-primary to-primary/80 text-white">
        <Button 
          size="icon" 
          variant="ghost" 
          onClick={closeOverlay}
          className="absolute top-2 right-2 text-white hover:bg-white/20"
        >
          <X className="w-4 h-4" />
        </Button>
        
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Gift className="w-16 h-16 text-white" />
              <Truck className="w-8 h-8 text-white absolute -bottom-1 -right-1" />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-2">FREE DELIVERY</h2>
            <p className="text-lg font-semibold mb-2">For Orders Above Ksh 2,500</p>
            <p className="text-sm opacity-90">
              Welcome to MediCare! Get your medicines delivered free of charge 
              when you spend Ksh 2,500 or more.
            </p>
          </div>
          
          <div className="space-y-2">
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={closeOverlay}
            >
              Start Shopping
            </Button>
            <p className="text-xs opacity-75">
              *Terms and conditions apply. Valid for orders within Nairobi.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

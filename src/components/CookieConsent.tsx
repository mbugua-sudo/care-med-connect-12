
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Cookie } from 'lucide-react';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem('cookieConsent');
    if (!hasAcceptedCookies) {
      // Show after a short delay
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up">
      <Card className="backdrop-blur-md bg-white/95 shadow-2xl border border-border/50 max-w-md mx-auto">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Cookie className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground mb-2">
                We value your privacy
              </h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                We use essential cookies to ensure our website works properly and analytics cookies to understand how you interact with our site.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="sm" 
                  onClick={acceptCookies} 
                  className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                >
                  Accept All
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={declineCookies} 
                  className="flex-1 sm:flex-none border-border hover:bg-muted"
                >
                  Essential Only
                </Button>
              </div>
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={declineCookies}
              className="h-8 w-8 flex-shrink-0 hover:bg-muted rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

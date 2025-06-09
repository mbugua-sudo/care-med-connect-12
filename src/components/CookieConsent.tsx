
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
      <Card className="backdrop-blur-lg bg-white/80 dark:bg-background/80 shadow-2xl border border-border/30 max-w-4xl mx-auto">
        <div className="p-4 md:p-6">
          {/* Mobile layout - two columns */}
          <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4">
            {/* Left column on mobile - Icon and title */}
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Cookie className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
              </div>
              <div className="flex-1 md:hidden">
                <h4 className="font-semibold text-sm text-foreground">
                  We value your privacy
                </h4>
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={declineCookies}
                className="h-7 w-7 md:hidden flex-shrink-0 hover:bg-muted rounded-full"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>

            {/* Right column on mobile - Content and buttons */}
            <div className="flex-1 min-w-0">
              {/* Desktop title - hidden on mobile */}
              <h4 className="hidden md:block font-semibold text-foreground mb-2">
                We value your privacy
              </h4>
              
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                We use essential cookies to ensure our website works properly and analytics cookies to understand how you interact with our site.
              </p>
              
              <div className="grid grid-cols-2 gap-2 md:flex md:flex-row md:gap-3">
                <Button 
                  size="sm" 
                  onClick={acceptCookies} 
                  className="text-xs md:text-sm px-3 py-2 md:flex-1 md:flex-none bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                >
                  Accept All
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={declineCookies} 
                  className="text-xs md:text-sm px-3 py-2 md:flex-1 md:flex-none border-border hover:bg-muted"
                >
                  Essential Only
                </Button>
              </div>
            </div>

            {/* Desktop close button */}
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={declineCookies}
              className="hidden md:flex h-8 w-8 flex-shrink-0 hover:bg-muted rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

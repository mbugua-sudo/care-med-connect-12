
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
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-in-right">
      <Card className="p-4 bg-white shadow-lg border-l-4 border-l-primary">
        <div className="flex items-start space-x-3">
          <Cookie className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-2">We use cookies</h4>
            <p className="text-sm text-muted-foreground mb-4">
              We use cookies to enhance your browsing experience, provide personalized content, 
              and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button size="sm" onClick={acceptCookies} className="flex-1 sm:flex-none">
                Accept All
              </Button>
              <Button size="sm" variant="outline" onClick={declineCookies} className="flex-1 sm:flex-none">
                Decline
              </Button>
            </div>
          </div>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={declineCookies}
            className="h-6 w-6 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};


import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const Header = ({ isAuthenticated, setIsAuthenticated }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top bar with emergency contact */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          24/7 Emergency Pharmacy Hotline: +1 (555) 123-4567
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">MediCare</h1>
              <p className="text-xs text-muted-foreground">Online Pharmacy</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search medicines, health products..."
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                  2
                </Badge>
              </Button>
            )}
            
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {isAuthenticated ? (
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            ) : (
              <Button onClick={() => setIsAuthenticated(true)}>
                Sign In
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search medicines, health products..."
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>

        {/* Navigation menu */}
        <nav className="hidden md:flex mt-4 space-x-8">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Prescription Medicines
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Over-the-Counter
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Health Products
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Wellness
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Upload Prescription
          </a>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a href="#" className="block text-sm font-medium hover:text-primary transition-colors">
              Prescription Medicines
            </a>
            <a href="#" className="block text-sm font-medium hover:text-primary transition-colors">
              Over-the-Counter
            </a>
            <a href="#" className="block text-sm font-medium hover:text-primary transition-colors">
              Health Products
            </a>
            <a href="#" className="block text-sm font-medium hover:text-primary transition-colors">
              Wellness
            </a>
            <a href="#" className="block text-sm font-medium hover:text-primary transition-colors">
              Upload Prescription
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

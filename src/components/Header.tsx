
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, Bell, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface HeaderProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  cartItems: CartItem[];
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header = ({ 
  isAuthenticated, 
  setIsAuthenticated, 
  cartItems, 
  removeFromCart, 
  updateCartQuantity,
  searchQuery,
  setSearchQuery
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Mock search suggestions
  const searchSuggestions = [
    'Paracetamol',
    'Ibuprofen',
    'Vitamin D3',
    'Omega-3',
    'Calcium',
    'Multivitamin',
    'Aspirin',
    'Amoxicillin'
  ].filter(item => 
    item.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 0
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top bar with emergency contact */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          24/7 Emergency Pharmacy Hotline: +254 (700) 123-4567
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">MediCare</h1>
              <p className="text-xs text-muted-foreground">Online Pharmacy</p>
            </div>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <PopoverTrigger asChild>
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <form onSubmit={handleSearchSubmit}>
                    <Input
                      placeholder="Search medicines, health products..."
                      className="pl-10 pr-4 py-2 w-full"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsSearchOpen(e.target.value.length > 0);
                      }}
                      onFocus={() => setIsSearchOpen(searchQuery.length > 0)}
                    />
                  </form>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      {searchSuggestions.map((suggestion, index) => (
                        <CommandItem
                          key={index}
                          onSelect={() => handleSearch(suggestion)}
                        >
                          <Search className="mr-2 h-4 w-4" />
                          {suggestion}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-4">
            {/* Notifications - visible for testing */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                1
              </Badge>
            </Button>
            
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
            </Button>

            {/* Shopping Cart with Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Shopping Cart ({cartCount} items)</SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Your cart is empty
                    </p>
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded bg-muted"
                          />
                          <div className="flex-1 space-y-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm font-bold text-primary">Kshs {item.price}</p>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-500 hover:text-red-700"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span>Kshs {cartTotal.toFixed(2)}</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Proceed to Checkout
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {isAuthenticated ? (
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            ) : (
              <Link to="/signin">
                <Button>
                  Sign In
                </Button>
              </Link>
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
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search medicines, health products..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
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

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Plus, Minus, Trash2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { NotificationViewer } from '@/components/NotificationViewer';
import { FavoritesViewer } from '@/components/FavoritesViewer';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
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

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface HeaderProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  cartItems: CartItem[];
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const Header = ({ 
  isAuthenticated, 
  setIsAuthenticated, 
  cartItems, 
  removeFromCart, 
  updateCartQuantity,
  searchQuery,
  setSearchQuery,
  favorites,
  toggleFavorite
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Order Delivered',
      message: 'Your order #12345 has been delivered successfully',
      time: '2 hours ago',
      isRead: false
    },
    {
      id: '2',
      title: 'Payment Confirmed',
      message: 'Your payment for order #12344 has been confirmed',
      time: '1 day ago',
      isRead: false
    }
  ]);
  const navigate = useNavigate();
  
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Mock medicines for favorites viewer - this should match the actual medicine data
  const allMedicines = [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      price: 1299,
      originalPrice: 1599,
      discount: 20,
      image: 'https://picsum.photos/2000/2030',
      category: 'Pain Relief'
    },
    {
      id: '2',
      name: 'Vitamin D3 1000IU',
      price: 2499,
      originalPrice: 2999,
      discount: 15,
      image: 'https://picsum.photos/2000/2031',
      category: 'Vitamins'
    },
    {
      id: '3',
      name: 'Ibuprofen 400mg',
      price: 1850,
      originalPrice: 2250,
      discount: 18,
      image: 'https://picsum.photos/2000/2032',
      category: 'Pain Relief'
    },
    {
      id: '4',
      name: 'Omega-3 Fish Oil',
      price: 3299,
      originalPrice: 3999,
      discount: 17,
      image: 'https://picsum.photos/2000/2033',
      category: 'Supplements'
    },
    {
      id: '5',
      name: 'Calcium Tablets',
      price: 1675,
      originalPrice: 1975,
      discount: 15,
      image: 'https://picsum.photos/2000/2034',
      category: 'Vitamins'
    },
    {
      id: '6',
      name: 'Multivitamin Complex',
      price: 2899,
      originalPrice: 3499,
      discount: 17,
      image: 'https://picsum.photos/2000/2035',
      category: 'Vitamins'
    }
  ];

  // Categories for navigation
  const categories = [
    'Pain Relief',
    'Vitamins',
    'Supplements',
    'Antibiotics',
    'Heart Health',
    'Diabetes Care'
  ];

  // Enhanced search suggestions including medicines
  const searchSuggestions = [
    ...allMedicines.map(med => med.name),
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

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const handleAddToCart = (medicine: any) => {
    // This would typically be handled by parent component
    console.log('Adding to cart:', medicine);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
                          className="cursor-pointer"
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
            {/* Notifications */}
            <NotificationViewer
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onClearAll={handleClearAllNotifications}
            />
            
            {/* Favorites */}
            <FavoritesViewer
              favorites={favorites}
              medicines={allMedicines}
              onRemoveFavorite={toggleFavorite}
              onAddToCart={handleAddToCart}
            />

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

        {/* Navigation menu with Categories */}
        <nav className="hidden md:flex mt-4 space-x-8">
          <Menubar className="border-0 bg-transparent p-0 h-auto">
            <MenubarMenu>
              <MenubarTrigger className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors cursor-pointer p-0 h-auto">
                <span>Shop by Category</span>
                <ChevronDown className="w-4 h-4" />
              </MenubarTrigger>
              <MenubarContent>
                {categories.map((category) => (
                  <MenubarItem
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="cursor-pointer"
                  >
                    {category}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          
          <button 
            onClick={() => scrollToSection('medicine-offers')}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Over-the-Counter
          </button>
          <button 
            onClick={() => scrollToSection('medicine-offers')}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Health Products
          </button>
          <button 
            onClick={() => scrollToSection('medicine-offers')}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Wellness
          </button>
          <button 
            onClick={() => scrollToSection('prescription-upload')}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Upload Prescription
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">Shop by Category</h4>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="block text-sm font-medium hover:text-primary transition-colors pl-4"
                >
                  {category}
                </button>
              ))}
            </div>
            <button 
              onClick={() => scrollToSection('medicine-offers')}
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              Over-the-Counter
            </button>
            <button 
              onClick={() => scrollToSection('medicine-offers')}
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              Health Products
            </button>
            <button 
              onClick={() => scrollToSection('medicine-offers')}
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              Wellness
            </button>
            <button 
              onClick={() => scrollToSection('prescription-upload')}
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              Upload Prescription
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Plus, Minus, Trash2, ChevronDown, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { NotificationViewer } from '@/components/NotificationViewer';
import { FavoritesViewer } from '@/components/FavoritesViewer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  medicines: any[];
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
  toggleFavorite,
  medicines
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

  // Enhanced navigation handler that scrolls to top
  const handleNavigation = (url: string) => {
    navigate(url);
    // Scroll to top when navigating
    window.scrollTo(0, 0);
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

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

  // Health conditions with their respective medicines
  const healthConditions = [
    {
      name: 'Stomach Care/Digestive health',
      medicines: ['Omeprazole 20mg', 'Ranitidine 150mg', 'Antacid Tablets', 'Probiotics Capsules', 'Simethicone 40mg']
    },
    {
      name: 'Pain Relief/management',
      medicines: ['Paracetamol 500mg', 'Ibuprofen 400mg', 'Aspirin 300mg', 'Diclofenac Gel', 'Tramadol 50mg']
    },
    {
      name: 'Bone, joint and muscle aches',
      medicines: ['Glucosamine Tablets', 'Calcium + Vitamin D', 'Diclofenac Gel', 'Methyl Salicylate Cream', 'Collagen Supplements']
    },
    {
      name: 'Eye care',
      medicines: ['Artificial Tears', 'Antibiotic Eye Drops', 'Vitamin A Drops', 'Lubricating Eye Gel', 'Allergy Eye Drops']
    },
    {
      name: 'Ear care',
      medicines: ['Ear Wax Removal Drops', 'Antibiotic Ear Drops', 'Pain Relief Ear Drops', 'Ear Cleaning Solution']
    },
    {
      name: 'Cough, cold & flu',
      medicines: ['Cough Syrup', 'Lozenges', 'Decongestant Tablets', 'Throat Spray', 'Cold & Flu Tablets']
    },
    {
      name: 'Oral care',
      medicines: ['Antiseptic Mouthwash', 'Fluoride Toothpaste', 'Oral Pain Relief Gel', 'Mouth Ulcer Treatment']
    },
    {
      name: 'First aid and Bandages',
      medicines: ['Adhesive Bandages', 'Antiseptic Cream', 'Gauze Pads', 'Medical Tape', 'Hydrogen Peroxide']
    },
    {
      name: 'Brain and Nervous System Disorder',
      medicines: ['Melatonin Tablets', 'Magnesium Supplements', 'B-Complex Vitamins', 'Ginkgo Biloba']
    },
    {
      name: 'Diabetes',
      medicines: ['Metformin 500mg', 'Glibenclamide 5mg', 'Insulin Needles', 'Blood Glucose Strips', 'Diabetic Foot Cream']
    },
    {
      name: 'Reproductive health',
      medicines: ['Folic Acid Tablets', 'Iron Supplements', 'Prenatal Vitamins', 'Emergency Contraception']
    },
    {
      name: 'Hypertension',
      medicines: ['Amlodipine 5mg', 'Losartan 50mg', 'Hydrochlorothiazide 25mg', 'Blood Pressure Monitor']
    },
    {
      name: 'Endocrine disorders',
      medicines: ['Levothyroxine 50mcg', 'Thyroid Support Supplements', 'Hormone Balance Tablets']
    },
    {
      name: 'Allergy relief',
      medicines: ['Cetirizine 10mg', 'Loratadine 10mg', 'Antihistamine Cream', 'Nasal Decongestant Spray']
    },
    {
      name: 'Bacterial, fungal, Protozoal infections',
      medicines: ['Amoxicillin 500mg', 'Fluconazole 150mg', 'Metronidazole 400mg', 'Antiseptic Solution']
    },
    {
      name: 'HIV',
      medicines: ['Antiretroviral Therapy', 'Immune Support Vitamins', 'Nutritional Supplements']
    },
    {
      name: 'Malaria',
      medicines: ['Artemether-Lumefantrine', 'Quinine Tablets', 'Mosquito Repellent', 'Fever Reducer']
    },
    {
      name: 'Wellness Checkup (Blood Tests)',
      medicines: ['Blood Test Kits', 'Cholesterol Test Strips', 'Pregnancy Test Kits', 'Urine Test Strips']
    }
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
    handleNavigation(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      handleNavigation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    handleNavigation(`/category/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`);
  };

  const handleConditionClick = (condition: string) => {
    handleNavigation(`/condition/${encodeURIComponent(condition.toLowerCase().replace(/\s+/g, '-'))}`);
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

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;
    
    const phoneNumber = "+254704472009";
    let message = "Hello! I'd like to order the following items from MediCare Online Pharmacy:\n\n";
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: KES ${item.price} each\n`;
      message += `   Subtotal: KES ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    message += `Total Amount: KES ${cartTotal.toFixed(2)}\n\n`;
    message += "Please confirm availability and delivery details. Thank you!";
    
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSignIn = () => {
    handleNavigation('/signin');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    // Add any additional sign out logic here
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top bar with emergency contact */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 text-center text-xs sm:text-sm">
          24/7 Emergency Pharmacy Hotline: +254 (704) 472-009
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">M</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold text-primary">MediCare</h1>
              <p className="text-xs text-muted-foreground hidden md:block">Online Pharmacy</p>
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
                      className="pl-10 pr-4 py-2 w-full text-sm"
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
          <div className="flex items-center space-x-2 sm:space-x-4">
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
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center p-0 text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="text-sm sm:text-base">Shopping Cart ({cartCount} items)</SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8 text-sm">
                      Your cart is empty
                    </p>
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded bg-muted"
                          />
                          <div className="flex-1 space-y-1">
                            <h4 className="font-medium text-xs sm:text-sm">{item.name}</h4>
                            <p className="text-xs sm:text-sm font-bold text-primary">Kshs {item.price}</p>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 sm:h-8 sm:w-8"
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                              </Button>
                              <span className="text-xs sm:text-sm font-medium w-6 sm:w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 sm:h-8 sm:w-8"
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
                              </Button>
                            </div>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 hover:text-red-700"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div className="flex justify-between text-base sm:text-lg font-bold">
                          <span>Total:</span>
                          <span>Kshs {cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="space-y-2">
                          <Button className="w-full text-sm sm:text-base" size="lg">
                            Proceed to Checkout
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full bg-green-50 hover:bg-green-100 text-green-700 border-green-200 text-sm sm:text-base" 
                            size="lg"
                            onClick={handleWhatsAppOrder}
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                            </svg>
                            Order via WhatsApp
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* User Profile with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={handleSignIn}>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Sign In</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleNavigation('/signup')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Sign Up</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
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
                className="pl-10 pr-4 py-2 w-full text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Navigation menu with Categories and Conditions - improved spacing */}
        <nav className="hidden md:flex mt-6 space-x-8">
          <Menubar className="border-0 bg-transparent p-0 h-auto">
            <MenubarMenu>
              <MenubarTrigger className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors cursor-pointer p-0 h-auto py-2">
                <span>Shop by Category</span>
                <ChevronDown className="w-4 h-4" />
              </MenubarTrigger>
              <MenubarContent className="min-w-56 p-2">
                {categories.map((category) => (
                  <MenubarItem
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="cursor-pointer text-sm py-3 px-3 rounded-md hover:bg-muted"
                  >
                    {category}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors cursor-pointer p-0 h-auto py-2">
                <span>Shop by Condition</span>
                <ChevronDown className="w-4 h-4" />
              </MenubarTrigger>
              <MenubarContent className="max-h-96 overflow-y-auto min-w-64 p-2">
                {healthConditions.map((condition) => (
                  <MenubarItem
                    key={condition.name}
                    onClick={() => handleConditionClick(condition.name)}
                    className="cursor-pointer text-sm py-3 px-3 rounded-md hover:bg-muted"
                  >
                    {condition.name}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          
          <button 
            onClick={() => handleNavigation('/offers')}
            className="text-sm font-medium hover:text-primary transition-colors py-2"
          >
            Offers
          </button>
          <button 
            onClick={() => handleNavigation('/personal-care')}
            className="text-sm font-medium hover:text-primary transition-colors py-2"
          >
            Personal Care & Hygiene
          </button>
          <button
            onClick={() => handleNavigation('/prescription-upload')}
            className="text-sm font-medium hover:text-primary transition-colors py-2"
          >
            Upload Prescription
          </button>
        </nav>
      </div>

      {/* Mobile menu - improved spacing */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-6 space-y-6">
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Shop by Category</h4>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="block text-sm font-medium hover:text-primary transition-colors pl-4 py-2"
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Shop by Condition</h4>
              {healthConditions.map((condition) => (
                <button
                  key={condition.name}
                  onClick={() => handleConditionClick(condition.name)}
                  className="block text-sm font-medium hover:text-primary transition-colors pl-4 py-2"
                >
                  {condition.name}
                </button>
              ))}
            </div>
            <button 
              onClick={() => handleNavigation('/offers')}
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
            >
              Offers
            </button>
            <button 
              onClick={() => handleNavigation('/personal-care')}
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
            >
              Personal Care & Hygiene
            </button>
            <button 
              onClick={() => handleNavigation('/prescription-upload')}
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
            >
              Upload Prescription
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

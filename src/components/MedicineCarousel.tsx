import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Autoplay from "embla-carousel-autoplay";

interface Medicine {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
}

interface MedicineCarouselProps {
  title: string;
  addToCart: (medicine: Medicine) => void;
  type: 'offers' | 'new-stock' | 'new-medicine';
  favorites: string[];
  toggleFavorite: (id: string) => void;
  searchQuery: string;
}

export const MedicineCarousel = ({ 
  title, 
  addToCart, 
  type, 
  favorites, 
  toggleFavorite, 
  searchQuery 
}: MedicineCarouselProps) => {
  // Mock data - in real app this would come from API
  const getMedicines = (): Medicine[] => {
    const baseMedicines = [
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

    // Return different sets based on type
    return baseMedicines.map(med => ({
      ...med,
      id: `${type}-${med.id}`
    }));
  };

  const allMedicines = getMedicines();
  
  // Filter medicines based on search query
  const filteredMedicines = searchQuery 
    ? allMedicines.filter(medicine => 
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allMedicines;

  // Don't render if search is active but no results
  if (searchQuery && filteredMedicines.length === 0) {
    return null;
  }

  // Calculate autoplay delay based on number of items (n+1 seconds)
  const autoplayDelay = (filteredMedicines.length + 1) * 1000;

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : title}
          </h2>
          {!searchQuery && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {type === 'offers' && 'Great deals on essential medicines and health products'}
              {type === 'new-stock' && 'Freshly restocked medicines now available'}
              {type === 'new-medicine' && 'Latest additions to our medicine catalog'}
            </p>
          )}
        </div>

        <div className="relative px-4 md:px-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: autoplayDelay,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {filteredMedicines.map((medicine) => (
                <CarouselItem key={medicine.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-3 md:p-4">
                      <div className="relative mb-3 md:mb-4">
                        <Link to={`/product/${medicine.id}`}>
                          <img
                            src={medicine.image}
                            alt={medicine.name}
                            className="w-full h-32 md:h-40 object-cover rounded-lg bg-muted cursor-pointer"
                          />
                        </Link>
                        {medicine.discount && (
                          <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs md:text-sm">
                            -{medicine.discount}%
                          </Badge>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          className={`absolute top-2 left-2 h-6 w-6 md:h-8 md:w-8 ${
                            favorites.includes(medicine.id) 
                              ? 'text-red-500 bg-white/80' 
                              : 'text-gray-500 bg-white/80 hover:text-red-500'
                          }`}
                          onClick={() => toggleFavorite(medicine.id)}
                        >
                          <Heart className={`w-3 h-3 md:w-4 md:h-4 ${favorites.includes(medicine.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">{medicine.category}</p>
                        <Link to={`/product/${medicine.id}`}>
                          <h3 className="font-semibold text-xs md:text-sm line-clamp-2 hover:text-primary cursor-pointer">{medicine.name}</h3>
                        </Link>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-sm md:text-lg font-bold text-primary">
                            Kshs {medicine.price}
                          </span>
                          {medicine.originalPrice && (
                            <span className="text-xs md:text-sm text-muted-foreground line-through">
                              Kshs {medicine.originalPrice}
                            </span>
                          )}
                        </div>
                        
                        <Button 
                          size="sm" 
                          className="w-full text-xs md:text-sm h-8 md:h-9"
                          onClick={() => addToCart(medicine)}
                        >
                          <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Mobile navigation - positioned on top of cards */}
            <CarouselPrevious className="md:hidden left-2 top-20 z-20 h-8 w-8 bg-white/90 border shadow-lg" />
            <CarouselNext className="md:hidden right-2 top-20 z-20 h-8 w-8 bg-white/90 border shadow-lg" />
            
            {/* Desktop navigation - positioned outside */}
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

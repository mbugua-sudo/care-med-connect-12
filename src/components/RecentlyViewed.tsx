
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart } from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
}

interface RecentlyViewedProps {
  addToCart: (medicine: Medicine) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const RecentlyViewed = ({ addToCart, favorites, toggleFavorite }: RecentlyViewedProps) => {
  const [recentlyViewed, setRecentlyViewed] = useState<Medicine[]>([]);

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setRecentlyViewed(recent);
  }, []);

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Recently Viewed</h2>
        <p className="text-muted-foreground">Products you've recently looked at</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recentlyViewed.map((medicine) => (
          <Card key={medicine.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Link to={`/product/${medicine.id}`}>
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-full h-40 object-cover rounded-lg bg-muted cursor-pointer"
                  />
                </Link>
                {medicine.discount && (
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                    -{medicine.discount}%
                  </Badge>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  className={`absolute top-2 left-2 h-8 w-8 ${
                    favorites.includes(medicine.id) 
                      ? 'text-red-500 bg-white/80' 
                      : 'text-gray-500 bg-white/80 hover:text-red-500'
                  }`}
                  onClick={() => toggleFavorite(medicine.id)}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(medicine.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">{medicine.category}</p>
                <Link to={`/product/${medicine.id}`}>
                  <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary cursor-pointer">{medicine.name}</h3>
                </Link>
                
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-primary">
                    KES {medicine.price}
                  </span>
                  {medicine.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      KES {medicine.originalPrice}
                    </span>
                  )}
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => addToCart(medicine)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

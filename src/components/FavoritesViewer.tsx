
import { Heart, X, ShoppingCart } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Medicine {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
}

interface FavoritesViewerProps {
  favorites: string[];
  medicines: Medicine[];
  onRemoveFavorite: (id: string) => void;
  onAddToCart: (medicine: Medicine) => void;
}

export const FavoritesViewer = ({ 
  favorites, 
  medicines, 
  onRemoveFavorite, 
  onAddToCart 
}: FavoritesViewerProps) => {
  const favoriteMedicines = medicines.filter(med => favorites.includes(med.id));

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="w-5 h-5" />
          {favorites.length > 0 && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
              {favorites.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Favorites ({favorites.length} items)</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {favoriteMedicines.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No favorite items
            </p>
          ) : (
            favoriteMedicines.map((medicine) => (
              <Card key={medicine.id} className="group">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={medicine.image} 
                      alt={medicine.name}
                      className="w-16 h-16 object-cover rounded bg-muted"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-xs text-muted-foreground">{medicine.category}</p>
                      <h4 className="font-medium text-sm">{medicine.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-primary">
                          KES {medicine.price}
                        </span>
                        {medicine.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            KES {medicine.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => onAddToCart(medicine)}
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                          onClick={() => onRemoveFavorite(medicine.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

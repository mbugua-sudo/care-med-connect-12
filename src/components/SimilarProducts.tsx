
import { Link, useNavigate } from 'react-router-dom';
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

interface SimilarProductsProps {
  currentProductId: string;
  category: string;
  addToCart: (medicine: Medicine) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const SimilarProducts = ({ currentProductId, category, addToCart, favorites, toggleFavorite }: SimilarProductsProps) => {
  const navigate = useNavigate();
  
  // Mock data - in real app this would come from API based on category
  const getSimilarProducts = (): Medicine[] => {
    const allMedicines = [
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
      },
      {
        id: '7',
        name: 'Aspirin 100mg',
        price: 999,
        originalPrice: 1299,
        discount: 23,
        image: 'https://picsum.photos/2000/2036',
        category: 'Pain Relief'
      },
      {
        id: '8',
        name: 'Vitamin C 1000mg',
        price: 1599,
        originalPrice: 1999,
        discount: 20,
        image: 'https://picsum.photos/2000/2037',
        category: 'Vitamins'
      }
    ];

    // Filter by category and exclude current product
    return allMedicines.filter(med => 
      med.category === category && med.id !== currentProductId
    ).slice(0, 4);
  };

  const similarProducts = getSimilarProducts();

  const handleProductClick = (medicineId: string) => {
    navigate(`/product/${medicineId}`);
    window.scrollTo(0, 0);
  };

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">You may also like</h2>
        <p className="text-muted-foreground">Similar products in {category}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {similarProducts.map((medicine) => (
          <Card key={medicine.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="w-full h-40 object-cover rounded-lg bg-muted cursor-pointer"
                  onClick={() => handleProductClick(medicine.id)}
                />
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
                <h3 
                  className="font-semibold text-sm line-clamp-2 hover:text-primary cursor-pointer"
                  onClick={() => handleProductClick(medicine.id)}
                >
                  {medicine.name}
                </h3>
                
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

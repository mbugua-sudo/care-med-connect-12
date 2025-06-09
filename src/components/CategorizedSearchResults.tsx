
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

interface CategorizedSearchResultsProps {
  query: string;
  addToCart: (medicine: Medicine) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const CategorizedSearchResults = ({ 
  query, 
  addToCart, 
  favorites, 
  toggleFavorite 
}: CategorizedSearchResultsProps) => {
  // Mock data categorized by type
  const categorizedMedicines = {
    'offers': [
      {
        id: 'offers-1',
        name: 'Paracetamol 500mg',
        price: 1299,
        originalPrice: 1599,
        discount: 20,
        image: 'https://picsum.photos/2000/2030',
        category: 'Pain Relief'
      },
      {
        id: 'offers-2',
        name: 'Vitamin D3 1000IU',
        price: 2499,
        originalPrice: 2999,
        discount: 15,
        image: 'https://picsum.photos/2000/2031',
        category: 'Vitamins'
      }
    ],
    'new-stock': [
      {
        id: 'new-stock-2',
        name: 'Vitamin D3 1000IU',
        price: 2499,
        originalPrice: 2999,
        discount: 15,
        image: 'https://picsum.photos/2000/2031',
        category: 'Vitamins'
      },
      {
        id: 'new-stock-5',
        name: 'Calcium Tablets',
        price: 1675,
        originalPrice: 1975,
        discount: 15,
        image: 'https://picsum.photos/2000/2034',
        category: 'Vitamins'
      }
    ],
    'new-medicine': [
      {
        id: 'new-medicine-2',
        name: 'Vitamin D3 1000IU',
        price: 2499,
        originalPrice: 2999,
        discount: 15,
        image: 'https://picsum.photos/2000/2031',
        category: 'Vitamins'
      },
      {
        id: 'new-medicine-6',
        name: 'Multivitamin Complex',
        price: 2899,
        originalPrice: 3499,
        discount: 17,
        image: 'https://picsum.photos/2000/2035',
        category: 'Vitamins'
      }
    ]
  };

  const categoryTitles = {
    'offers': 'Medicine on Offer',
    'new-stock': 'New Medicine in Stock',
    'new-medicine': 'New Medicine'
  };

  // Filter medicines based on search query
  const getFilteredMedicines = (medicines: Medicine[]) => {
    return medicines.filter(medicine => 
      medicine.name.toLowerCase().includes(query.toLowerCase()) ||
      medicine.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  const renderMedicineCard = (medicine: Medicine) => (
    <Card key={medicine.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <img
            src={medicine.image}
            alt={medicine.name}
            className="w-full h-40 object-cover rounded-lg bg-muted"
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
          <h3 className="font-semibold text-sm line-clamp-2">{medicine.name}</h3>
          
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">
              Kshs {medicine.price}
            </span>
            {medicine.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                Kshs {medicine.originalPrice}
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
  );

  return (
    <div className="space-y-12">
      {Object.entries(categorizedMedicines).map(([categoryKey, medicines]) => {
        const filteredMedicines = getFilteredMedicines(medicines);
        
        if (filteredMedicines.length === 0) return null;

        return (
          <section key={categoryKey} className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                {categoryTitles[categoryKey as keyof typeof categoryTitles]}
              </h2>
              <p className="text-muted-foreground">
                {filteredMedicines.length} result{filteredMedicines.length !== 1 ? 's' : ''} found for "{query}"
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMedicines.map(renderMedicineCard)}
            </div>
          </section>
        );
      })}
    </div>
  );
};

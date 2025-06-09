
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Star } from 'lucide-react';

export const FeaturedProducts = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      price: 12.99,
      originalPrice: 15.99,
      rating: 4.8,
      reviews: 234,
      image: '/placeholder.svg',
      inStock: true,
      requiresPrescription: false
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      price: 25.50,
      rating: 4.9,
      reviews: 156,
      image: '/placeholder.svg',
      inStock: true,
      requiresPrescription: true
    },
    {
      id: 3,
      name: 'Vitamin D3 1000 IU',
      category: 'Supplements',
      price: 18.75,
      originalPrice: 22.00,
      rating: 4.7,
      reviews: 89,
      image: '/placeholder.svg',
      inStock: true,
      requiresPrescription: false
    },
    {
      id: 4,
      name: 'Metformin 500mg',
      category: 'Diabetes',
      price: 32.99,
      rating: 4.6,
      reviews: 67,
      image: '/placeholder.svg',
      inStock: false,
      requiresPrescription: true
    },
    {
      id: 5,
      name: 'Omega-3 Fish Oil',
      category: 'Supplements',
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.8,
      reviews: 178,
      image: '/placeholder.svg',
      inStock: true,
      requiresPrescription: false
    },
    {
      id: 6,
      name: 'Ibuprofen 400mg',
      category: 'Pain Relief',
      price: 9.99,
      rating: 4.5,
      reviews: 203,
      image: '/placeholder.svg',
      inStock: true,
      requiresPrescription: false
    }
  ];

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-muted-foreground">
            Popular medicines and health products trusted by thousands
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                {/* Product image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    {product.requiresPrescription && (
                      <Badge variant="outline" className="bg-white">
                        Prescription Required
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-3 right-3 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        favorites.includes(product.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-muted-foreground'
                      }`} 
                    />
                  </Button>
                </div>

                <div className="p-6">
                  {/* Product info */}
                  <div className="mb-4">
                    <Badge variant="secondary" className="mb-2">
                      {product.category}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1" 
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.requiresPrescription ? 'Add to Cart' : 'Add to Cart'}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {product.requiresPrescription && (
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Valid prescription required for purchase
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedBlobs } from '@/components/AnimatedBlobs';
import { BlurImage } from '@/components/BlurImage';
import { ShareDialog } from '@/components/ShareDialog';
import { RatingComponent } from '@/components/RatingComponent';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { SimilarProducts } from '@/components/SimilarProducts';
import { ShoppingCart, Heart, Minus, Plus, Share2, Truck, Star } from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  description: string;
  ingredients: string;
  howToUse: string;
  inStock: number;
  rating: number;
  reviewCount: number;
  brandId?: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [medicine, setMedicine] = useState<Medicine | null>(null);

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: '1',
      rating: 5,
      comment: 'Very effective pain relief. Works fast and lasts long.',
      author: 'John D.',
      date: '2024-01-15'
    },
    {
      id: '2',
      rating: 4,
      comment: 'Good quality medicine, reasonably priced.',
      author: 'Sarah M.',
      date: '2024-01-10'
    },
    {
      id: '3',
      rating: 5,
      comment: 'Excellent product, highly recommended.',
      author: 'Mike R.',
      date: '2024-01-05'
    }
  ];

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(review => review.rating === star).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });

  // Mock data - in real app this would come from API
  const getMedicine = (medicineId: string): Medicine | null => {
    const medicines = [
      {
        id: '1',
        name: 'Paracetamol 500mg',
        price: 1299,
        originalPrice: 1599,
        discount: 20,
        image: 'https://picsum.photos/2000/2030',
        category: 'Pain Relief',
        description: 'A lightweight, oil-based cleanser that gently melts away makeup, dirt, oils and sunscreen without stinging the eye area.',
        ingredients: 'Paracetamol 500mg. Excipients: Contains lactose, sodium metabisulfite and starch.',
        howToUse: 'Apply a few pumps of cleansing oil onto dry face with dry hands. Massage gently in circular motions. Emulsify with water to create a milky emulsion before rinsing off completely with lukewarm water.',
        inStock: 4,
        rating: 4.5,
        reviewCount: 124
      },
      {
        id: '2',
        name: 'Vitamin D3 1000IU',
        price: 2499,
        originalPrice: 2999,
        discount: 15,
        image: 'https://picsum.photos/2000/2031',
        category: 'Vitamins',
        description: 'High-quality Vitamin D3 supplement to support bone health and immune system function.',
        ingredients: 'Vitamin D3 (cholecalciferol) 1000IU, microcrystalline cellulose, magnesium stearate.',
        howToUse: 'Take one tablet daily with food or as directed by your healthcare provider.',
        inStock: 12,
        rating: 4.7,
        reviewCount: 89
      }
    ];
    
    // Handle different ID formats from carousels
    const cleanId = medicineId.replace(/^(offers|new-stock|new-medicine)-/, '');
    return medicines.find(med => med.id === cleanId) || medicines[0];
  };

  useEffect(() => {
    if (id) {
      const foundMedicine = getMedicine(id);
      setMedicine(foundMedicine);
      
      // Scroll to top when medicine changes
      window.scrollTo(0, 0);
      
      // Add to recently viewed
      const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      if (foundMedicine && !recentlyViewed.find((item: any) => item.id === foundMedicine.id)) {
        const updatedRecent = [foundMedicine, ...recentlyViewed.slice(0, 4)];
        localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecent));
      }
    }
  }, [id]);

  const addToCart = (item: Medicine) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromCart = (medicineId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== medicineId));
  };

  const updateCartQuantity = (medicineId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(medicineId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === medicineId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleFavorite = (medicineId: string) => {
    setFavorites(prev => 
      prev.includes(medicineId)
        ? prev.filter(fav => fav !== medicineId)
        : [...prev, medicineId]
    );
  };

  const handleRatingSubmit = (rating: number) => {
    // In a real app, this would save to backend
    console.log(`User rated product ${medicine?.id} with ${rating} stars`);
    // You could update local state or make an API call here
  };

  if (!medicine) {
    return <div>Loading...</div>;
  }

  const productImages = [medicine.image, medicine.image, medicine.image];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400 fill-current opacity-50' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBlobs />
      <Header 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateCartQuantity={updateCartQuantity}
        searchQuery=""
        setSearchQuery={() => {}}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/category/${medicine.category.toLowerCase().replace(/\s+/g, '-')}`}>
                  {medicine.category}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{medicine.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <BlurImage
                src={productImages[selectedImage]}
                alt={medicine.name}
                className="w-full h-96 rounded-lg"
              />
              {medicine.discount && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-white text-lg px-3 py-1">
                  -{medicine.discount}%
                </Badge>
              )}
            </div>
            <div className="flex space-x-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <BlurImage src={img} alt="" className="w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-muted-foreground text-sm mb-2">{medicine.category}</p>
              <h1 className="text-3xl font-bold mb-4">{medicine.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {renderStars(medicine.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {medicine.rating} ({medicine.reviewCount} reviews)
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-primary">
                  KES {medicine.price}
                </span>
                {medicine.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    KES {medicine.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">In stock, {medicine.inStock} available</span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  className="flex-1" 
                  size="lg"
                  onClick={() => addToCart(medicine)}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => toggleFavorite(medicine.id)}
                  className={favorites.includes(medicine.id) ? 'text-red-500' : ''}
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(medicine.id) ? 'fill-current' : ''}`} />
                </Button>
                <ShareDialog 
                  productName={medicine.name}
                  productUrl={window.location.href}
                  productImage={medicine.image}
                />
              </div>
            </div>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 text-pink-600 mb-2">
                  <Truck className="w-5 h-5" />
                  <span className="font-medium">Delivery within 4 hours</span>
                </div>
                <p className="text-sm text-muted-foreground">on all orders placed between 8:00am and 8:00pm</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="usage">How to Use</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <p className="text-muted-foreground leading-relaxed">{medicine.description}</p>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-6">
                <p className="text-muted-foreground leading-relaxed">{medicine.ingredients}</p>
              </TabsContent>
              <TabsContent value="usage" className="mt-6">
                <p className="text-muted-foreground leading-relaxed">{medicine.howToUse}</p>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {/* Rating Overview */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Overall Rating</h3>
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-4xl font-bold">{medicine.rating}</span>
                        <div>
                          <div className="flex items-center mb-1">
                            {renderStars(medicine.rating)}
                          </div>
                          <p className="text-sm text-muted-foreground">{medicine.reviewCount} reviews</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">Rating Breakdown</h4>
                      <div className="space-y-2">
                        {ratingDistribution.map(({ star, count, percentage }) => (
                          <div key={star} className="flex items-center space-x-3">
                            <span className="text-sm w-3">{star}</span>
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <Progress value={percentage} className="flex-1 h-2" />
                            <span className="text-sm text-muted-foreground w-8">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Individual Reviews */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Customer Reviews</h4>
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.author}</span>
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recently Viewed */}
        <RecentlyViewed 
          addToCart={addToCart}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />

        {/* Similar Products */}
        <SimilarProducts 
          currentProductId={medicine.id}
          category={medicine.category}
          addToCart={addToCart}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;

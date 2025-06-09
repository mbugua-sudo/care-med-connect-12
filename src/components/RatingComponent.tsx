
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';

interface RatingComponentProps {
  productId: string;
  isAuthenticated: boolean;
  currentUserRating?: number;
  onRatingSubmit: (rating: number, comment?: string) => void;
}

export const RatingComponent = ({ 
  productId, 
  isAuthenticated, 
  currentUserRating, 
  onRatingSubmit 
}: RatingComponentProps) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(currentUserRating || 0);
  const [comment, setComment] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmit = () => {
    if (selectedRating > 0) {
      onRatingSubmit(selectedRating, comment);
      setHasSubmitted(true);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (hasSubmitted) {
    return (
      <Card className="mt-6">
        <CardContent className="p-4">
          <h4 className="font-medium mb-3">Thank you for your review!</h4>
          <p className="text-sm text-muted-foreground">
            Your rating and review have been submitted successfully.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <h4 className="font-medium mb-3">Rate this product</h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => {
                const rating = i + 1;
                return (
                  <button
                    key={i}
                    onClick={() => handleRatingClick(rating)}
                    onMouseEnter={() => setHoveredRating(rating)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        rating <= (hoveredRating || selectedRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            {selectedRating > 0 && (
              <span className="text-sm text-muted-foreground">
                {selectedRating} star{selectedRating !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {selectedRating > 0 && (
            <div className="space-y-3">
              <div>
                <label htmlFor="review-comment" className="block text-sm font-medium mb-2">
                  Add a comment (optional)
                </label>
                <Textarea
                  id="review-comment"
                  placeholder="Share your thoughts about this product..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <Button onClick={handleSubmit} className="w-full">
                Submit Review
              </Button>
            </div>
          )}

          {currentUserRating && (
            <p className="text-sm text-muted-foreground mt-2">
              You previously rated this product {currentUserRating} star{currentUserRating !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

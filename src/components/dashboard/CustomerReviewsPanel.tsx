
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MessageSquare, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Review {
  id: string;
  customerName: string;
  medicine: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
}

interface CustomerReviewsPanelProps {
  reviews: Review[];
}

export const CustomerReviewsPanel: React.FC<CustomerReviewsPanelProps> = ({ reviews }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="modern-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Recent Customer Reviews
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No reviews available</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {getInitials(review.customerName)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{review.customerName}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm font-medium text-primary">{review.medicine}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {review.comment}
                  </p>
                  
                  <div className="flex items-center gap-2 pt-1">
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <ThumbsUp className="w-3 h-3" />
                      {review.helpfulCount} helpful
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

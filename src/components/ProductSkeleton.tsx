
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export const ProductSkeleton = () => {
  return (
    <Card className="group">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <Skeleton className="w-full h-40 rounded-lg" />
          <Skeleton className="absolute top-2 right-2 w-12 h-6 rounded" />
          <Skeleton className="absolute top-2 left-2 h-8 w-8 rounded-full" />
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          
          <Skeleton className="h-9 w-full rounded" />
        </div>
      </CardContent>
    </Card>
  );
};

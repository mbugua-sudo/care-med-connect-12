
import { Card } from '@/components/ui/card';

interface AdvertisementBannerProps {
  images: string[];
}

export const AdvertisementBanner = ({ images }: AdvertisementBannerProps) => {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img
                src={image}
                alt={`Advertisement ${index + 1}`}
                className="w-full h-48 object-cover"
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

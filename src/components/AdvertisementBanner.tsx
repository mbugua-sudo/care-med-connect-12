
import { Card } from '@/components/ui/card';
import { BlurImage } from '@/components/BlurImage';

interface AdvertisementBannerProps {
  images: string[];
}

const bannerDescriptions = [
  {
    title: "Health Solutions",
    description: "Complete healthcare solutions for your family"
  },
  {
    title: "Medical Equipment",
    description: "Professional medical equipment and devices"
  },
  {
    title: "Wellness Products",
    description: "Premium wellness and lifestyle products"
  }
];

export const AdvertisementBanner = ({ images }: AdvertisementBannerProps) => {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <BlurImage
                src={image}
                alt={`Advertisement ${index + 1}`}
                className="w-full h-48"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <h3 className="text-xl font-bold mb-2">
                    {bannerDescriptions[index]?.title || `Special Offer ${index + 1}`}
                  </h3>
                  <p className="text-sm">
                    {bannerDescriptions[index]?.description || "Discover amazing deals and offers"}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};


import { Card } from '@/components/ui/card';
import { Shield, Clock, Truck } from 'lucide-react';

export const TrustIndicators = () => {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Card className="p-6 hover:shadow-md transition-shadow flex-1 max-w-sm">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-base">100% Genuine Medicines</h3>
                <p className="text-sm text-muted-foreground">
                  Verified by licensed pharmacists
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow flex-1 max-w-sm">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-base">24/7 Pharmacy Support</h3>
                <p className="text-sm text-muted-foreground">
                  Expert consultation available
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow flex-1 max-w-sm">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-base">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Same-day delivery in major cities
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};


import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Clock, Truck } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              Your Health,
              <span className="text-primary block">Delivered</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Get genuine medicines delivered to your doorstep. Licensed pharmacists, 
              verified products, and secure prescriptions - all in one trusted platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                Order Medicines Now
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Upload Prescription
              </Button>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="space-y-6">
            <div className="grid gap-4">
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">100% Genuine Medicines</h3>
                    <p className="text-sm text-muted-foreground">
                      Verified by licensed pharmacists
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">24/7 Pharmacy Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Expert consultation available
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Fast Delivery</h3>
                    <p className="text-sm text-muted-foreground">
                      Same-day delivery in major cities
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heart, Shield, Truck, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Trust indicators */}
      <div className="border-b border-primary-foreground/20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Shield className="w-8 h-8" />
              <h4 className="font-semibold">100% Genuine</h4>
              <p className="text-sm opacity-90">Verified medicines only</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Truck className="w-8 h-8" />
              <h4 className="font-semibold">Fast Delivery</h4>
              <p className="text-sm opacity-90">Same-day in major cities</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Clock className="w-8 h-8" />
              <h4 className="font-semibold">24/7 Support</h4>
              <p className="text-sm opacity-90">Always here to help</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Heart className="w-8 h-8" />
              <h4 className="font-semibold">Trusted by 100k+</h4>
              <p className="text-sm opacity-90">Happy customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">MediCare</h1>
                <p className="text-sm opacity-90">Online Pharmacy</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Your trusted online pharmacy delivering genuine medicines and healthcare 
              products right to your doorstep. Licensed, secure, and reliable healthcare 
              solutions for you and your family.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-semibold">Emergency Hotline:</p>
              <p className="text-lg font-bold">+1 (555) 123-4567</p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">About Us</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">How It Works</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Upload Prescription</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Track Order</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Customer Support</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Pharmacy Locator</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Prescription Medicines</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Over-the-Counter</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Vitamins & Supplements</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Health Devices</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Personal Care</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Baby Care</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-sm opacity-90 mb-4">
              Get health tips, offers, and medicine reminders
            </p>
            <div className="space-y-3">
              <Input 
                placeholder="Enter your email" 
                className="bg-white text-foreground"
              />
              <Button variant="secondary" className="w-full">
                Subscribe
              </Button>
            </div>
            <p className="text-xs opacity-75 mt-2">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      <Separator className="bg-primary-foreground/20" />

      {/* Bottom footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm opacity-90">
            © 2024 MediCare Online Pharmacy. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Terms of Service</a>
            <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">License</a>
            <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

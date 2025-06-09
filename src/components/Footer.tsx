
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  Shield,
  Truck,
  HeadphonesIcon
} from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info - Reduced width */}
          <div className="lg:col-span-1 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary-foreground text-primary rounded-lg flex items-center justify-center font-bold text-xl">
                M
              </div>
              <div>
                <h3 className="text-xl font-bold">MediCare</h3>
                <p className="text-sm opacity-80">Online Pharmacy</p>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed mb-6 opacity-90 text-left">
              Your trusted online pharmacy delivering genuine medicines and healthcare 
              products right to your doorstep. Licensed, secure, and reliable healthcare 
              solutions for you and your family.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <div>
                  <p className="font-medium">Emergency Hotline:</p>
                  <p className="opacity-90">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <div>
                  <p className="font-medium">24/7 Support</p>
                  <p className="opacity-90">Always here for you</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-left">Quick Links</h4>
            <ul className="space-y-3 text-left">
              <li>
                <Link to="/about" className="text-sm hover:text-accent transition-colors opacity-90 hover:opacity-100">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm hover:text-accent transition-colors opacity-90 hover:opacity-100">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/upload-prescription" className="text-sm hover:text-accent transition-colors opacity-90 hover:opacity-100">
                  Upload Prescription
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-sm hover:text-accent transition-colors opacity-90 hover:opacity-100">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/customer-support" className="text-sm hover:text-accent transition-colors opacity-90 hover:opacity-100">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link to="/pharmacy-locator" className="text-sm hover:text-accent transition-colors opacity-90 hover:opacity-100">
                  Pharmacy Locator
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className='text-left'>
            <h4 className="text-lg font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/category/prescription-medicines" className="text-sm hover:text-accent transition-colors opacity-90 hover:opacity-100">
                  Prescription Medicines
                </Link>
              </li>
              <li>
                <Link to="/category/over-the-counter" className="text-sm hover:text-accent transition-colors opacity-90 hover:opacity-100">
                  Over-the-Counter
                </Link>
              </li>
              <li>
                <Link to="/category/vitamins-supplements" className="text-sm hover:text-accent transition-colors opacity-90 hover:opacity-100">
                  Vitamins & Supplements
                </Link>
              </li>
              <li>
                <Link to="/category/health-devices" className="text-sm hover:text-accent transition-colors opacity-90 hover:opacity-100">
                  Health Devices
                </Link>
              </li>
              <li>
                <Link to="/personal-care" className="text-sm hover:text-accent transition-colors opacity-90 hover:opacity-100">
                  Personal Care
                </Link>
              </li>
              <li>
                <Link to="/category/baby-care" className="text-sm hover:text-accent transition-colors opacity-90 hover:opacity-100">
                  Baby Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
            <p className="text-sm opacity-90 mb-6">
              Get health tips, offers, and medicine reminders
            </p>
            
            <div className="space-y-4 mb-8">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60"
              />
              <Button variant="secondary" className="w-full">
                Subscribe
              </Button>
              <p className="text-xs opacity-70">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="opacity-90">support@medicare.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="opacity-90">123 Health Street, Medical City</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <HeadphonesIcon className="w-4 h-4 flex-shrink-0" />
                <span className="opacity-90">24/7 Customer Care</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-accent" />
              <div>
                <h5 className="font-semibold text-sm">100% Genuine</h5>
                <p className="text-xs opacity-80">Licensed medicines only</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Truck className="w-8 h-8 text-accent" />
              <div>
                <h5 className="font-semibold text-sm">Fast Delivery</h5>
                <p className="text-xs opacity-80">Same day in major cities</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <HeadphonesIcon className="w-8 h-8 text-accent" />
              <div>
                <h5 className="font-semibold text-sm">Expert Support</h5>
                <p className="text-xs opacity-80">Licensed pharmacists</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm opacity-80">
              <p>&copy; {currentYear} MediCare. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link to="/privacy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-accent transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="hover:text-accent transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

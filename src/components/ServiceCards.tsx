
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Pill, 
  Heart, 
  Activity, 
  Calendar, 
  FileText, 
  MapPin 
} from 'lucide-react';

export const ServiceCards = () => {
  const services = [
    {
      icon: Pill,
      title: 'Prescription Medicines',
      description: 'Upload your prescription and get medicines delivered safely',
      color: 'bg-blue-100 text-blue-600',
      action: 'Upload Prescription'
    },
    {
      icon: Heart,
      title: 'Health Products',
      description: 'Vitamins, supplements, and wellness products',
      color: 'bg-green-100 text-green-600',
      action: 'Shop Now'
    },
    {
      icon: Activity,
      title: 'Health Monitoring',
      description: 'Track your medications and health progress',
      color: 'bg-purple-100 text-purple-600',
      action: 'Start Tracking'
    },
    {
      icon: Calendar,
      title: 'Medication Reminders',
      description: 'Never miss a dose with smart reminders',
      color: 'bg-orange-100 text-orange-600',
      action: 'Set Reminders'
    },
    {
      icon: FileText,
      title: 'Digital Prescriptions',
      description: 'Store and manage all your prescriptions digitally',
      color: 'bg-teal-100 text-teal-600',
      action: 'Manage Records'
    },
    {
      icon: MapPin,
      title: 'Pharmacy Locator',
      description: 'Find nearby pharmacies and healthcare providers',
      color: 'bg-red-100 text-red-600',
      action: 'Find Pharmacies'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Complete Healthcare Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From prescription management to wellness tracking, we provide 
            comprehensive healthcare services at your fingertips.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${service.color}`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {service.action}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

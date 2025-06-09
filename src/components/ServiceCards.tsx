
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
import { MedicationReminder } from './MedicationReminder';
import { HealthTracker } from './HealthTracker';
import { PharmacyLocator } from './PharmacyLocator';

export const ServiceCards = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: Pill,
      title: 'Prescription Medicines',
      description: 'Upload your prescription and get medicines delivered safely',
      color: 'bg-blue-100 text-blue-600',
      action: 'Upload Prescription',
      onClick: () => scrollToSection('prescription-upload')
    },
    {
      icon: Heart,
      title: 'Health Products',
      description: 'Vitamins, supplements, and wellness products',
      color: 'bg-green-100 text-green-600',
      action: 'Shop Now',
      onClick: () => scrollToSection('medicine-offers')
    },
    {
      icon: Activity,
      title: 'Health Monitoring',
      description: 'Track your medications and health progress',
      color: 'bg-purple-100 text-purple-600',
      action: 'Start Tracking',
      component: HealthTracker
    },
    {
      icon: Calendar,
      title: 'Medication Reminders',
      description: 'Never miss a dose with smart reminders',
      color: 'bg-orange-100 text-orange-600',
      action: 'Set Reminders',
      component: MedicationReminder
    },
    {
      icon: FileText,
      title: 'Digital Prescriptions',
      description: 'Store and manage all your prescriptions digitally',
      color: 'bg-teal-100 text-teal-600',
      action: 'Manage Records',
      onClick: () => scrollToSection('prescription-upload')
    },
    {
      icon: MapPin,
      title: 'Pharmacy Locator',
      description: 'Find nearby pharmacies and healthcare providers',
      color: 'bg-red-100 text-red-600',
      action: 'Find Pharmacies',
      component: PharmacyLocator
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
                    {service.component ? (
                      <service.component />
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        onClick={service.onClick}
                      >
                        {service.action}
                      </Button>
                    )}
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

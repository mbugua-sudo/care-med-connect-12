
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Navigation, Phone, Clock } from 'lucide-react';

const mockPharmacies = [
  {
    id: 1,
    name: "HealthCare Pharmacy",
    address: "Kenyatta Avenue, Nairobi",
    distance: "0.5 km",
    phone: "+254 700 123 456",
    hours: "24/7",
    rating: 4.8
  },
  {
    id: 2,
    name: "MediPlus Chemist",
    address: "Tom Mboya Street, Nairobi",
    distance: "1.2 km",
    phone: "+254 700 123 457",
    hours: "8:00 AM - 10:00 PM",
    rating: 4.6
  },
  {
    id: 3,
    name: "Wellness Pharmacy",
    address: "Moi Avenue, Nairobi",
    distance: "2.1 km",
    phone: "+254 700 123 458",
    hours: "8:00 AM - 8:00 PM",
    rating: 4.5
  }
];

export const PharmacyLocator = () => {
  const [location, setLocation] = useState('');
  const [pharmacies, setPharmacies] = useState(mockPharmacies);

  const searchPharmacies = () => {
    // Simulate search - in real app, this would use geolocation/maps API
    setPharmacies(mockPharmacies);
  };

  const getDirections = (pharmacy: any) => {
    // In a real app, this would open maps with directions
    alert(`Getting directions to ${pharmacy.name}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MapPin className="w-4 h-4 mr-2" />
          Find Pharmacies
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Find Nearby Pharmacies</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter your location or use current location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1"
            />
            <Button onClick={searchPharmacies}>
              <Navigation className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {pharmacies.map((pharmacy) => (
              <Card key={pharmacy.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold">{pharmacy.name}</h4>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {pharmacy.address}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Navigation className="w-3 h-3 mr-1" />
                          {pharmacy.distance}
                        </span>
                        <span className="flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {pharmacy.phone}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {pharmacy.hours}
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="flex text-yellow-400">
                          {'★'.repeat(Math.floor(pharmacy.rating))}
                        </div>
                        <span className="text-xs text-muted-foreground ml-1">
                          {pharmacy.rating}
                        </span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => getDirections(pharmacy)}
                    >
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

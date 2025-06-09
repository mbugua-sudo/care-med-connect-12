
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PrescriptionUpload } from '@/components/PrescriptionUpload';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage 
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Download,
  Eye,
  Calendar
} from 'lucide-react';

interface PrescriptionHistory {
  id: string;
  patientName: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'dispensed';
  medicines: string[];
  pharmacistNotes?: string;
  totalAmount?: number;
}

const UploadPrescription = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Mock prescription history data
  const prescriptionHistory: PrescriptionHistory[] = [
    {
      id: 'PRX-001',
      patientName: 'John Doe',
      uploadDate: '2024-01-15',
      status: 'dispensed',
      medicines: ['Paracetamol 500mg', 'Vitamin D3 1000IU'],
      pharmacistNotes: 'Prescription verified and dispensed successfully.',
      totalAmount: 3798
    },
    {
      id: 'PRX-002',
      patientName: 'Jane Smith',
      uploadDate: '2024-01-10',
      status: 'approved',
      medicines: ['Ibuprofen 400mg', 'Calcium Tablets'],
      pharmacistNotes: 'Prescription approved. Ready for pickup or delivery.',
      totalAmount: 3525
    },
    {
      id: 'PRX-003',
      patientName: 'Mike Johnson',
      uploadDate: '2024-01-08',
      status: 'pending',
      medicines: ['Multivitamin Complex'],
      pharmacistNotes: 'Under review by pharmacist.'
    },
    {
      id: 'PRX-004',
      patientName: 'Sarah Wilson',
      uploadDate: '2024-01-05',
      status: 'rejected',
      medicines: ['Prescription unclear'],
      pharmacistNotes: 'Prescription image is unclear. Please upload a clearer image.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'dispensed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'dispensed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const addToCart = (medicine: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === medicine.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...medicine, quantity: 1 }];
    });
  };

  const removeFromCart = (medicineId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== medicineId));
  };

  const updateCartQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === medicineId ? { ...item, quantity } : item
      )
    );
  };

  const toggleFavorite = (medicineId: string) => {
    setFavorites(prev => 
      prev.includes(medicineId)
        ? prev.filter(id => id !== medicineId)
        : [...prev, medicineId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateCartQuantity={updateCartQuantity}
        searchQuery=""
        setSearchQuery={() => {}}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        medicines={[]}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Upload Prescription</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Upload Your Prescription</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload your prescription and track your order history. Our licensed pharmacists will review and process your medicines safely.
          </p>
        </div>

        {/* Tabs for Upload and History */}
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Upload New Prescription</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Prescription History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <PrescriptionUpload />
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Your Prescription History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {prescriptionHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No prescription history</h3>
                    <p className="text-muted-foreground">Upload your first prescription to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {prescriptionHistory.map((prescription) => (
                      <Card key={prescription.id} className="border-l-4 border-l-primary/20">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-semibold text-lg">{prescription.id}</h3>
                                <Badge className={`${getStatusColor(prescription.status)} flex items-center space-x-1`}>
                                  {getStatusIcon(prescription.status)}
                                  <span className="capitalize">{prescription.status}</span>
                                </Badge>
                              </div>
                              <p className="text-muted-foreground">Patient: {prescription.patientName}</p>
                              <p className="text-sm text-muted-foreground">
                                Uploaded: {new Date(prescription.uploadDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Medicines</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {prescription.medicines.map((medicine, index) => (
                                  <li key={index}>• {medicine}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Pharmacist Notes</h4>
                              <p className="text-sm text-muted-foreground">
                                {prescription.pharmacistNotes || 'No notes available'}
                              </p>
                              {prescription.totalAmount && (
                                <div className="mt-3">
                                  <span className="text-sm font-medium">
                                    Total Amount: KES {prescription.totalAmount}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default UploadPrescription;

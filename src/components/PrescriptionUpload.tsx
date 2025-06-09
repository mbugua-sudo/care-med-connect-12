
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Camera, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PrescriptionUpload = () => {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload at least one prescription image",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Prescription uploaded successfully!",
      description: "Our pharmacist will review your prescription within 30 minutes.",
    });

    // Reset form
    setFiles([]);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Upload Your Prescription
            </h2>
            <p className="text-xl text-muted-foreground">
              Get your prescribed medicines delivered safely and quickly
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload area */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Upload Prescription</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File upload area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragOver 
                      ? 'border-primary bg-primary/5' 
                      : 'border-muted-foreground/25 hover:border-primary/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <Camera className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">
                        Drop your prescription here
                      </p>
                      <p className="text-muted-foreground">
                        or click to browse files
                      </p>
                    </div>
                    <Button variant="outline" asChild>
                      <label className="cursor-pointer">
                        Choose Files
                        <Input
                          type="file"
                          multiple
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={handleFileSelect}
                        />
                      </label>
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Supported formats: JPG, PNG, PDF (Max 10MB per file)
                    </p>
                  </div>
                </div>

                {/* Uploaded files */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files</Label>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{file.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Patient information */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patient-name">Patient Name</Label>
                      <Input id="patient-name" placeholder="Enter patient name" />
                    </div>
                    <div>
                      <Label htmlFor="patient-phone">Phone Number</Label>
                      <Input id="patient-phone" placeholder="Enter phone number" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Any specific instructions or notes..."
                      rows={3}
                    />
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleSubmit}
                >
                  Submit Prescription
                </Button>
              </CardContent>
            </Card>

            {/* Process information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>How It Works</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex space-x-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold">Upload Prescription</h4>
                        <p className="text-sm text-muted-foreground">
                          Take a clear photo or upload PDF of your prescription
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold">Pharmacist Review</h4>
                        <p className="text-sm text-muted-foreground">
                          Licensed pharmacist verifies and processes your prescription
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold">Order Confirmation</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive order details and payment options
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold">Fast Delivery</h4>
                        <p className="text-sm text-muted-foreground">
                          Medicines delivered to your doorstep safely
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">Why Choose Us?</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Licensed pharmacists verify every prescription</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>100% genuine medicines guaranteed</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Secure data handling and privacy protection</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Same-day delivery in major cities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

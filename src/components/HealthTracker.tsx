
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Activity, Heart, Thermometer, Plus } from 'lucide-react';

export const HealthTracker = () => {
  const [healthData, setHealthData] = useState({
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    weight: ''
  });
  
  const [history, setHistory] = useState<any[]>([]);

  const addRecord = () => {
    const record = {
      ...healthData,
      date: new Date().toLocaleDateString(),
      id: Date.now()
    };
    setHistory([record, ...history]);
    setHealthData({ bloodPressure: '', heartRate: '', temperature: '', weight: '' });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Activity className="w-4 h-4 mr-2" />
          Start Tracking
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Health Monitoring</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bp">Blood Pressure</Label>
              <Input
                id="bp"
                placeholder="120/80"
                value={healthData.bloodPressure}
                onChange={(e) => setHealthData({...healthData, bloodPressure: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hr">Heart Rate (BPM)</Label>
              <Input
                id="hr"
                placeholder="72"
                type="number"
                value={healthData.heartRate}
                onChange={(e) => setHealthData({...healthData, heartRate: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="temp">Temperature (°C)</Label>
              <Input
                id="temp"
                placeholder="36.5"
                type="number"
                step="0.1"
                value={healthData.temperature}
                onChange={(e) => setHealthData({...healthData, temperature: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                placeholder="70"
                type="number"
                value={healthData.weight}
                onChange={(e) => setHealthData({...healthData, weight: e.target.value})}
              />
            </div>
          </div>
          
          <Button onClick={addRecord} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Record
          </Button>
          
          {history.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Recent Records</h4>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {history.slice(0, 3).map((record) => (
                  <Card key={record.id}>
                    <CardContent className="p-3">
                      <p className="text-sm font-medium">{record.date}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {record.bloodPressure && <span>BP: {record.bloodPressure}</span>}
                        {record.heartRate && <span>HR: {record.heartRate}</span>}
                        {record.temperature && <span>Temp: {record.temperature}°C</span>}
                        {record.weight && <span>Weight: {record.weight}kg</span>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

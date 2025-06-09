
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Bell, Plus } from 'lucide-react';

export const MedicationReminder = () => {
  const [reminders, setReminders] = useState<any[]>([]);
  const [newReminder, setNewReminder] = useState({
    medicine: '',
    time: '',
    frequency: 'daily'
  });

  const addReminder = () => {
    if (newReminder.medicine && newReminder.time) {
      setReminders([...reminders, { ...newReminder, id: Date.now() }]);
      setNewReminder({ medicine: '', time: '', frequency: 'daily' });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Clock className="w-4 h-4 mr-2" />
          Set Reminders
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Medication Reminders</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="medicine">Medicine Name</Label>
            <Input
              id="medicine"
              placeholder="e.g., Paracetamol"
              value={newReminder.medicine}
              onChange={(e) => setNewReminder({...newReminder, medicine: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={newReminder.time}
              onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Frequency</Label>
            <Select value={newReminder.frequency} onValueChange={(value) => setNewReminder({...newReminder, frequency: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="twice-daily">Twice Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={addReminder} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Reminder
          </Button>
          
          {reminders.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Active Reminders</h4>
              {reminders.map((reminder) => (
                <Card key={reminder.id}>
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-medium">{reminder.medicine}</p>
                        <p className="text-sm text-muted-foreground">
                          {reminder.time} - {reminder.frequency}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

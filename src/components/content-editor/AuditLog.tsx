
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileText, User, Clock, Edit, Plus, Trash2 } from 'lucide-react';

export const AuditLog: React.FC = () => {
  // TODO: Replace with real audit log data from Supabase
  // Implementation will include:
  // - Real-time audit trail tracking
  // - User activity monitoring
  // - Change history with before/after values
  // - Filtering by date, user, action type
  const mockAuditLogs = [
    {
      id: '1',
      action: 'CREATE',
      entityType: 'Product',
      entityId: 'prod-123',
      entityName: 'Paracetamol 500mg',
      userId: 'user-1',
      userName: 'John Admin',
      userEmail: 'john@pharmacy.com',
      changes: {
        name: { new: 'Paracetamol 500mg' },
        price: { new: 150 },
        stockQuantity: { new: 250 }
      },
      timestamp: '2024-01-20T10:30:00Z',
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      action: 'UPDATE',
      entityType: 'Product',
      entityId: 'prod-456',
      entityName: 'Amoxicillin 250mg',
      userId: 'user-2',
      userName: 'Jane Pharmacist',
      userEmail: 'jane@pharmacy.com',
      changes: {
        price: { old: 400, new: 450 },
        stockQuantity: { old: 25, new: 15 }
      },
      timestamp: '2024-01-20T09:15:00Z',
      ipAddress: '192.168.1.101'
    },
    {
      id: '3',
      action: 'DELETE',
      entityType: 'Category',
      entityId: 'cat-789',
      entityName: 'Expired Medicines',
      userId: 'user-1',
      userName: 'John Admin',
      userEmail: 'john@pharmacy.com',
      changes: {
        isActive: { old: true, new: false }
      },
      timestamp: '2024-01-19T16:45:00Z',
      ipAddress: '192.168.1.100'
    },
    {
      id: '4',
      action: 'UPDATE',
      entityType: 'Product',
      entityId: 'prod-789',
      entityName: 'Vitamin C 1000mg',
      userId: 'user-3',
      userName: 'Mike Editor',
      userEmail: 'mike@pharmacy.com',
      changes: {
        description: { 
          old: 'Basic vitamin supplement', 
          new: 'High potency vitamin C supplement for immune support' 
        },
        isFeatured: { old: false, new: true }
      },
      timestamp: '2024-01-19T14:20:00Z',
      ipAddress: '192.168.1.102'
    }
  ];

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATE':
        return <Plus className="h-4 w-4 text-emerald-500" />;
      case 'UPDATE':
        return <Edit className="h-4 w-4 text-blue-500" />;
      case 'DELETE':
        return <Trash2 className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionBadge = (action: string) => {
    const variants = {
      CREATE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      UPDATE: 'bg-blue-50 text-blue-700 border-blue-200',
      DELETE: 'bg-red-50 text-red-700 border-red-200'
    };
    
    return (
      <Badge variant="outline" className={variants[action as keyof typeof variants]}>
        {action}
      </Badge>
    );
  };

  const formatChanges = (changes: any) => {
    return Object.entries(changes).map(([field, change]: [string, any]) => (
      <div key={field} className="text-xs">
        <span className="font-medium">{field}:</span>
        {change.old !== undefined && (
          <span className="text-red-600 line-through ml-1">
            {String(change.old)}
          </span>
        )}
        {change.new !== undefined && (
          <span className="text-emerald-600 ml-1">
            {String(change.new)}
          </span>
        )}
      </div>
    ));
  };

  return (
    <Card className="modern-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Audit Log
          </CardTitle>
          <Badge variant="secondary">
            {mockAuditLogs.length} entries
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Track all changes made to products, categories, and settings
        </p>
      </CardHeader>
      <CardContent>
        {mockAuditLogs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No audit entries found</p>
            <p className="text-sm mt-2">Changes will appear here when made</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Changes</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAuditLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getActionIcon(log.action)}
                        {getActionBadge(log.action)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{log.entityName}</div>
                        <div className="text-sm text-muted-foreground">
                          {log.entityType} • {log.entityId}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">{log.userName}</div>
                          <div className="text-xs text-muted-foreground">{log.userEmail}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 max-w-xs">
                        {formatChanges(log.changes)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm">
                            {new Date(log.timestamp).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {log.ipAddress}
                      </code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          TODO: Implement real-time audit logging with Supabase triggers
        </div>
      </CardContent>
    </Card>
  );
};

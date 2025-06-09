
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Users, Shield, Edit, UserCheck, UserX, Crown } from 'lucide-react';

export const PermissionManager: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // TODO: Replace with real user roles data from Supabase
  // Implementation will include:
  // - Integration with user_roles table
  // - Row Level Security (RLS) policies
  // - Role-based access control
  const mockUsers = [
    {
      id: 'user-1',
      email: 'john@pharmacy.com',
      firstName: 'John',
      lastName: 'Admin',
      roles: ['admin'],
      isActive: true,
      lastLogin: '2024-01-20T10:30:00Z',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'user-2',
      email: 'jane@pharmacy.com',
      firstName: 'Jane',
      lastName: 'Pharmacist',
      roles: ['pharmacist'],
      isActive: true,
      lastLogin: '2024-01-20T09:15:00Z',
      createdAt: '2024-01-05T00:00:00Z'
    },
    {
      id: 'user-3',
      email: 'mike@pharmacy.com',
      firstName: 'Mike',
      lastName: 'Editor',
      roles: ['user'],
      isActive: true,
      lastLogin: '2024-01-19T14:20:00Z',
      createdAt: '2024-01-10T00:00:00Z'
    },
    {
      id: 'user-4',
      email: 'sarah@pharmacy.com',
      firstName: 'Sarah',
      lastName: 'Viewer',
      roles: ['user'],
      isActive: false,
      lastLogin: '2024-01-15T16:45:00Z',
      createdAt: '2024-01-08T00:00:00Z'
    }
  ];

  // Define role permissions
  const rolePermissions = {
    admin: {
      name: 'Administrator',
      description: 'Full access to all features',
      color: 'bg-red-50 text-red-700 border-red-200',
      icon: Crown,
      permissions: [
        'Manage Products',
        'Manage Categories',
        'Manage Users',
        'View Reports',
        'System Settings',
        'Audit Logs'
      ]
    },
    pharmacist: {
      name: 'Pharmacist',
      description: 'Prescription management and product oversight',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Shield,
      permissions: [
        'Manage Products',
        'Manage Categories',
        'Verify Prescriptions',
        'View Reports',
        'Stock Management'
      ]
    },
    user: {
      name: 'User',
      description: 'Basic access for regular operations',
      color: 'bg-gray-50 text-gray-700 border-gray-200',
      icon: Users,
      permissions: [
        'View Products',
        'Place Orders',
        'Upload Prescriptions',
        'View Order History'
      ]
    }
  };

  const getRoleBadge = (roles: string[]) => {
    const primaryRole = roles[0] || 'user';
    const roleConfig = rolePermissions[primaryRole as keyof typeof rolePermissions];
    
    return (
      <Badge variant="outline" className={roleConfig.color}>
        <roleConfig.icon className="h-3 w-3 mr-1" />
        {roleConfig.name}
      </Badge>
    );
  };

  const handleToggleUserStatus = (userId: string) => {
    // TODO: Implement user status toggle
    console.log('Toggle user status:', userId);
  };

  const handleEditPermissions = (userId: string) => {
    // TODO: Implement permission editing
    setSelectedUser(userId);
    console.log('Edit permissions for user:', userId);
  };

  return (
    <div className="space-y-6">
      {/* Role Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(rolePermissions).map(([key, role]) => (
          <Card key={key} className="modern-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <role.icon className="h-5 w-5" />
                {role.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {role.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {role.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-sm">{permission}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Management */}
      <Card className="modern-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Permissions
            </CardTitle>
            <Badge variant="secondary">
              {mockUsers.length} users
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage user roles and permissions across the system
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Member Since</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getRoleBadge(user.roles)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {user.isActive ? (
                          <>
                            <UserCheck className="h-4 w-4 text-emerald-500" />
                            <span className="text-emerald-600">Active</span>
                          </>
                        ) : (
                          <>
                            <UserX className="h-4 w-4 text-red-500" />
                            <span className="text-red-600">Inactive</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(user.lastLogin).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditPermissions(user.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Switch
                          checked={user.isActive}
                          onCheckedChange={() => handleToggleUserStatus(user.id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 text-center text-sm text-muted-foreground">
            TODO: Implement role-based access control with Supabase RLS policies
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

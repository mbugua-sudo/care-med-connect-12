
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { 
  BarChart3, 
  Package, 
  Settings, 
  Home,
  FileText,
  Users,
  Activity
} from 'lucide-react';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: BarChart3,
    description: 'Analytics & Overview'
  },
  {
    title: 'Content Editor',
    url: '/content-editor',
    icon: Package,
    description: 'Manage Products & Categories'
  },
  {
    title: 'Home',
    url: '/',
    icon: Home,
    description: 'Back to Main Site'
  }
];

const quickActions = [
  {
    title: 'Stock Alerts',
    url: '/dashboard',
    icon: Activity,
  },
  {
    title: 'Reports',
    url: '/dashboard',
    icon: FileText,
  },
  {
    title: 'User Management',
    url: '/dashboard',
    icon: Users,
  },
  {
    title: 'Settings',
    url: '/dashboard',
    icon: Settings,
  }
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">PharmaCare</h2>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation(item.url)}
                    isActive={location.pathname === item.url}
                    className="w-full"
                  >
                    <item.icon className="h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation(item.url)}
                    className="w-full"
                    size="sm"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="text-xs text-muted-foreground text-center">
          <p>Version 1.0.0</p>
          <p>© 2024 PharmaCare</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

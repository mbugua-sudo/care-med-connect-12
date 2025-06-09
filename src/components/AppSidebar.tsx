
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
    description: 'Analytics & Overview',
    color: 'text-blue-600',
    borderColor: 'border-blue-200',
    hoverBg: 'hover:bg-blue-50'
  },
  {
    title: 'Content Editor',
    url: '/content-editor',
    icon: Package,
    description: 'Manage Products & Categories',
    color: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    hoverBg: 'hover:bg-emerald-50'
  },
  {
    title: 'Home',
    url: '/',
    icon: Home,
    description: 'Back to Main Site',
    color: 'text-purple-600',
    borderColor: 'border-purple-200',
    hoverBg: 'hover:bg-purple-50'
  }
];

const quickActions = [
  {
    title: 'Stock Alerts',
    url: '/dashboard',
    icon: Activity,
    color: 'text-amber-600',
    borderColor: 'border-amber-200',
    hoverBg: 'hover:bg-amber-50'
  },
  {
    title: 'Reports',
    url: '/dashboard',
    icon: FileText,
    color: 'text-indigo-600',
    borderColor: 'border-indigo-200',
    hoverBg: 'hover:bg-indigo-50'
  },
  {
    title: 'User Management',
    url: '/dashboard',
    icon: Users,
    color: 'text-teal-600',
    borderColor: 'border-teal-200',
    hoverBg: 'hover:bg-teal-50'
  },
  {
    title: 'Settings',
    url: '/dashboard',
    icon: Settings,
    color: 'text-gray-600',
    borderColor: 'border-gray-200',
    hoverBg: 'hover:bg-gray-50'
  }
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (url: string) => {
    navigate(url);
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="text-left">
            <h2 className="font-semibold text-lg text-foreground">PharmaCare</h2>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-2 px-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation(item.url)}
                    isActive={location.pathname === item.url}
                    className={`w-full border-l-4 ${item.borderColor} ${item.hoverBg} transition-all duration-200 ${
                      location.pathname === item.url 
                        ? `${item.color} bg-background border-l-current shadow-sm` 
                        : 'text-muted-foreground border-l-transparent'
                    }`}
                  >
                    <item.icon className={`h-4 w-4 ${location.pathname === item.url ? item.color : ''}`} />
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm">{item.title}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-2 px-2">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation(item.url)}
                    className={`w-full border border-border rounded-lg ${item.hoverBg} transition-all duration-200 hover:border-current hover:shadow-sm`}
                    size="sm"
                  >
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-sm font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="text-xs text-muted-foreground text-left">
          <p className="font-medium">Version 1.0.0</p>
          <p>© 2024 PharmaCare</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

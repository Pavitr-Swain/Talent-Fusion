import React, { useState } from 'react';
import { useAuth, getRoleDashboardPath } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  LogOut,
  Settings,
  User,
  Menu,
  X,
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart3,
  Shield,
  Briefcase,
  ChevronDown,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockNotifications } from '@/utils/mockData';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const roleConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  admin: { label: 'Administrator', color: 'bg-destructive', icon: <Shield className="h-4 w-4" /> },
  hr: { label: 'HR Manager', color: 'bg-secondary', icon: <Briefcase className="h-4 w-4" /> },
  facilitator: { label: 'Facilitator', color: 'bg-primary', icon: <BookOpen className="h-4 w-4" /> },
  trainee: { label: 'Trainee', color: 'bg-success', icon: <GraduationCap className="h-4 w-4" /> },
  manager: { label: 'Manager', color: 'bg-warning', icon: <BarChart3 className="h-4 w-4" /> },
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/login');
  };

  const unreadNotifications = mockNotifications.filter(n => !n.read).length;
  const roleInfo = user ? roleConfig[user.role] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <Link to={user ? getRoleDashboardPath(user.role) : '/'} className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-foreground">{title}</h1>
              </div>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-card">
                <DropdownMenuLabel className="flex items-center justify-between">
                  Notifications
                  <Badge variant="secondary" className="text-xs">{unreadNotifications} new</Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {mockNotifications.slice(0, 4).map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                    <div className="flex items-center gap-2">
                      {!notification.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                      <span className="font-medium text-sm">{notification.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{notification.message}</span>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-primary cursor-pointer">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <div className="flex items-center gap-1">
                      {roleInfo && (
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${roleInfo.color} text-primary-foreground border-0`}>
                          {roleInfo.label}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

import React, { useState } from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import StatCard from '@/components/shared/StatCard';
import ProgressBar from '@/components/shared/ProgressBar';
import DataTable from '@/components/shared/DataTable';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  Activity,
  Server,
  HardDrive,
  Plus,
  Pencil,
  Trash2,
  KeyRound,
  Shield,
  FileText,
  Settings,
  Database,
  Download,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { mockUsers, mockSystemLogs, mockTrainees } from '@/utils/mockData';
import { cn } from '@/lib/utils';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('users');
  const [selectedRole, setSelectedRole] = useState('all');

  const totalUsers = mockUsers.length + mockTrainees.length;
  const activeSessions = 47;
  const systemUptime = 99.98;
  const storageUsed = 68;

  const allUsers = [
    ...mockUsers.map(u => ({ ...u, status: 'active' as const, lastLogin: '2024-01-10 14:32' })),
    ...mockTrainees.slice(0, 5).map(t => ({ 
      id: t.id, 
      name: t.name, 
      email: t.email, 
      role: 'trainee' as const,
      avatar: t.avatar,
      status: t.status as 'active' | 'inactive',
      lastLogin: t.lastActivity,
      permissions: ['view_courses', 'take_tests']
    })),
  ];

  const filteredUsers = selectedRole === 'all' 
    ? allUsers 
    : allUsers.filter(u => u.role === selectedRole);

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'bg-destructive/10 text-destructive',
      hr: 'bg-secondary/10 text-secondary',
      facilitator: 'bg-primary/10 text-primary',
      trainee: 'bg-success/10 text-success',
      manager: 'bg-warning/10 text-warning',
    };
    return colors[role] || 'bg-muted text-muted-foreground';
  };

  const getLogTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      info: 'bg-primary/10 text-primary',
      warning: 'bg-warning/10 text-warning',
      success: 'bg-success/10 text-success',
      error: 'bg-destructive/10 text-destructive',
    };
    return colors[type] || 'bg-muted text-muted-foreground';
  };

  const permissions = [
    { id: 'manage_users', label: 'Manage Users' },
    { id: 'manage_courses', label: 'Manage Courses' },
    { id: 'view_analytics', label: 'View Analytics' },
    { id: 'manage_hiring', label: 'Manage Hiring' },
    { id: 'grade_assignments', label: 'Grade Assignments' },
    { id: 'create_tests', label: 'Create Tests' },
    { id: 'view_reports', label: 'View Reports' },
    { id: 'system_settings', label: 'System Settings' },
  ];

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                System Administration
              </h2>
              <p className="text-muted-foreground">
                Manage users, roles, and system settings
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium text-success">System Online</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={totalUsers}
            icon={<Users className="h-6 w-6" />}
            description="Across all roles"
            iconClassName="bg-primary/10 text-primary"
          />
          <StatCard
            title="Active Sessions"
            value={activeSessions}
            icon={<Activity className="h-6 w-6" />}
            description="Currently online"
            iconClassName="bg-success/10 text-success"
          />
          <StatCard
            title="System Uptime"
            value={`${systemUptime}%`}
            icon={<Server className="h-6 w-6" />}
            description="Last 30 days"
            iconClassName="bg-secondary/10 text-secondary"
          />
          <Card className="border-0 card-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                  <h3 className="text-2xl font-bold text-foreground">{storageUsed}%</h3>
                  <ProgressBar value={storageUsed} size="sm" className="w-24" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10 text-warning">
                  <HardDrive className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="roles">Role Assignment</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card className="border-0 card-shadow-lg">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage all system users</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="facilitator">Facilitator</SelectItem>
                        <SelectItem value="trainee">Trainee</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add User
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md bg-card">
                        <DialogHeader>
                          <DialogTitle>Create New User</DialogTitle>
                          <DialogDescription>Add a new user to the system</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>First Name</Label>
                              <Input placeholder="John" />
                            </div>
                            <div className="space-y-2">
                              <Label>Last Name</Label>
                              <Input placeholder="Doe" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input type="email" placeholder="john@company.com" />
                          </div>
                          <div className="space-y-2">
                            <Label>Role</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="hr">HR Manager</SelectItem>
                                <SelectItem value="facilitator">Facilitator</SelectItem>
                                <SelectItem value="trainee">Trainee</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Initial Password</Label>
                            <Input type="password" placeholder="••••••••" />
                          </div>
                          <Button className="w-full" onClick={() => toast({ title: 'User Created', description: 'New user has been added to the system.' })}>
                            Create User
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={filteredUsers}
                  columns={[
                    {
                      key: 'name',
                      label: 'User',
                      sortable: true,
                      render: (item) => (
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={item.avatar} alt={item.name} />
                            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.email}</p>
                          </div>
                        </div>
                      ),
                    },
                    {
                      key: 'role',
                      label: 'Role',
                      sortable: true,
                      render: (item) => (
                        <Badge variant="outline" className={getRoleBadge(item.role)}>
                          {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
                        </Badge>
                      ),
                    },
                    {
                      key: 'status',
                      label: 'Status',
                      render: (item) => (
                        <div className="flex items-center gap-2">
                          <Switch checked={item.status === 'active'} />
                          <span className="text-sm">{item.status === 'active' ? 'Active' : 'Inactive'}</span>
                        </div>
                      ),
                    },
                    {
                      key: 'lastLogin',
                      label: 'Last Login',
                      render: (item) => (
                        <span className="text-sm text-muted-foreground">{item.lastLogin}</span>
                      ),
                    },
                    {
                      key: 'actions',
                      label: 'Actions',
                      render: (item) => (
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast({ title: 'Edit User', description: `Editing ${item.name}` })}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast({ title: 'Reset Password', description: `Password reset sent to ${item.email}` })}>
                            <KeyRound className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-card">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete User</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {item.name}? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => toast({ title: 'User Deleted', description: `${item.name} has been removed.` })}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      ),
                    },
                  ]}
                  searchable
                  searchPlaceholder="Search users..."
                  searchKeys={['name', 'email']}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-0 card-shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Role Assignment
                  </CardTitle>
                  <CardDescription>Assign roles and permissions to users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select User</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a user" />
                      </SelectTrigger>
                      <SelectContent>
                        {allUsers.map((u) => (
                          <SelectItem key={u.id} value={u.id}>
                            {u.name} ({u.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Assign Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="hr">HR Manager</SelectItem>
                        <SelectItem value="facilitator">Facilitator</SelectItem>
                        <SelectItem value="trainee">Trainee</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label>Permissions</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {permissions.map((perm) => (
                        <div key={perm.id} className="flex items-center space-x-2">
                          <Checkbox id={perm.id} />
                          <Label htmlFor={perm.id} className="text-sm font-normal cursor-pointer">
                            {perm.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => toast({ title: 'Role Updated', description: 'User role and permissions have been updated.' })}>
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 card-shadow-lg">
                <CardHeader>
                  <CardTitle>Role Overview</CardTitle>
                  <CardDescription>Current role distribution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['admin', 'hr', 'facilitator', 'trainee', 'manager'].map((role) => {
                    const count = allUsers.filter(u => u.role === role).length;
                    const percentage = Math.round((count / allUsers.length) * 100);
                    return (
                      <div key={role} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getRoleBadge(role)}>
                              {role.charAt(0).toUpperCase() + role.slice(1)}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{count} users</span>
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                        <ProgressBar value={percentage} size="sm" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card className="border-0 card-shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      System Logs
                    </CardTitle>
                    <CardDescription>Recent system activity</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => toast({ title: 'Exporting Logs', description: 'Downloading log file...' })}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Logs
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockSystemLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className={getLogTypeBadge(log.type)}>
                          {log.type}
                        </Badge>
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-muted-foreground">{log.details}</p>
                          <p className="text-xs text-muted-foreground mt-1">By: {log.user}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {log.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-0 card-shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    System Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Maintenance Mode', desc: 'Disable access for non-admins', enabled: false },
                    { label: 'Email Notifications', desc: 'Send system emails', enabled: true },
                    { label: 'Two-Factor Auth', desc: 'Require 2FA for all users', enabled: false },
                    { label: 'Auto Backup', desc: 'Daily automatic backups', enabled: true },
                  ].map((setting) => (
                    <div key={setting.label} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium">{setting.label}</p>
                        <p className="text-sm text-muted-foreground">{setting.desc}</p>
                      </div>
                      <Switch defaultChecked={setting.enabled} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 card-shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-secondary" />
                    Database Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                      <p className="text-2xl font-bold">{totalUsers}</p>
                      <p className="text-sm text-muted-foreground">Total Records</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="text-lg font-medium">Healthy</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Backup Status</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Last backup: 2024-01-10 03:00:00</p>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => toast({ title: 'Creating Backup', description: 'Database backup in progress...' })}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Create Backup
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => toast({ title: 'Restore Options', description: 'Opening restore dialog...' })}>
                        Restore
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

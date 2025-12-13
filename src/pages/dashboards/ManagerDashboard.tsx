import React from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import StatCard from '@/components/shared/StatCard';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  TrendingUp,
  UserCheck,
  DollarSign,
  FileDown,
  Settings,
  BarChart3,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  GraduationCap,
  Award,
  AlertTriangle,
  Info,
  ChevronRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { mockPerformanceData, mockDepartments, mockFinancialData, mockStrategicInsights, mockTrainees } from '@/utils/mockData';
import { cn } from '@/lib/utils';

const ManagerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const totalTrainees = mockTrainees.length;
  const completionRate = 84;
  const successfulHires = 28;
  const roi = 2.7;

  const recentActivities = [
    { id: 1, type: 'hire', message: 'James Taylor accepted offer - Python Developer', time: '2 hours ago', icon: UserCheck },
    { id: 2, type: 'complete', message: 'Ethan White completed AI/ML course', time: '4 hours ago', icon: GraduationCap },
    { id: 3, type: 'award', message: 'Victoria Adams achieved top rank in batch', time: '1 day ago', icon: Award },
    { id: 4, type: 'alert', message: 'Week 5 dropout rate increased by 5%', time: '1 day ago', icon: AlertTriangle },
    { id: 5, type: 'hire', message: 'Lisa Chen started as DevOps Engineer', time: '2 days ago', icon: UserCheck },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))'];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return <TrendingUp className="h-4 w-4 text-success" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'info': return <Info className="h-4 w-4 text-primary" />;
      default: return <Lightbulb className="h-4 w-4 text-secondary" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-success/5 border-success/20';
      case 'warning': return 'bg-warning/5 border-warning/20';
      case 'info': return 'bg-primary/5 border-primary/20';
      default: return 'bg-muted border-border';
    }
  };

  return (
    <DashboardLayout title="Executive Dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Welcome, {user?.name?.split(' ')[0]}! 📊
            </h2>
            <p className="text-muted-foreground">
              Strategic overview and performance insights
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast({ title: 'Generating Report', description: 'Creating PDF report...' })}>
              <FileDown className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" onClick={() => toast({ title: 'Settings', description: 'Opening settings...' })}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Trainees"
            value={totalTrainees}
            icon={<Users className="h-6 w-6" />}
            trend={{ value: 15, isPositive: true }}
            description="vs last month"
            iconClassName="bg-primary/10 text-primary"
          />
          <StatCard
            title="Completion Rate"
            value={`${completionRate}%`}
            icon={<TrendingUp className="h-6 w-6" />}
            trend={{ value: 8, isPositive: true }}
            description="Target: 80%"
            iconClassName="bg-success/10 text-success"
          />
          <StatCard
            title="Successful Hires"
            value={successfulHires}
            icon={<UserCheck className="h-6 w-6" />}
            trend={{ value: 12, isPositive: true }}
            description="Target: 25"
            iconClassName="bg-secondary/10 text-secondary"
          />
          <StatCard
            title="Training ROI"
            value={`${roi}x`}
            icon={<DollarSign className="h-6 w-6" />}
            trend={{ value: 18, isPositive: true }}
            description="Return on investment"
            iconClassName="bg-warning/10 text-warning"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Performance Trends */}
          <Card className="lg:col-span-2 border-0 card-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Performance Trends
              </CardTitle>
              <CardDescription>6-month overview of key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={mockPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="avgScore"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Avg Score"
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="completionRate"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    name="Completion %"
                    dot={{ fill: 'hsl(var(--success))' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="hiringRate"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                    name="Hiring Rate"
                    dot={{ fill: 'hsl(var(--secondary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <Card className="border-0 card-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-success" />
                Financial Summary
              </CardTitle>
              <CardDescription>Cost vs Value analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={mockFinancialData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="category"
                  >
                    {mockFinancialData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {mockFinancialData.map((item, index) => (
                  <div key={item.category} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-muted-foreground">{item.category}</span>
                    </div>
                    <span className="font-medium">${item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Overview & Strategic Insights */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Department Overview */}
          <Card className="border-0 card-shadow-lg">
            <CardHeader>
              <CardTitle>Department Overview</CardTitle>
              <CardDescription>Performance by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDepartments.map((dept) => (
                  <div key={dept.name} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{dept.name}</h4>
                      <Badge variant="outline" className={cn(
                        dept.performance >= 85 ? 'bg-success/10 text-success border-success/20' :
                        dept.performance >= 70 ? 'bg-primary/10 text-primary border-primary/20' :
                        'bg-warning/10 text-warning border-warning/20'
                      )}>
                        {dept.performance}% performance
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Trainees</p>
                        <p className="font-semibold">{dept.trainees}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-semibold">${dept.budget.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Strategic Insights */}
          <Card className="border-0 card-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-warning" />
                Strategic Insights
              </CardTitle>
              <CardDescription>AI-powered recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockStrategicInsights.map((insight) => (
                <div
                  key={insight.id}
                  className={cn(
                    "p-4 rounded-lg border transition-colors",
                    getInsightColor(insight.type)
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getInsightIcon(insight.type)}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{insight.insight}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 text-xs"
                      onClick={() => toast({ title: insight.action, description: 'Taking action...' })}
                    >
                      {insight.action}
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="border-0 card-shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent Activities
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0",
                    activity.type === 'hire' ? 'bg-success/10' :
                    activity.type === 'complete' ? 'bg-primary/10' :
                    activity.type === 'award' ? 'bg-warning/10' :
                    'bg-destructive/10'
                  )}>
                    <activity.icon className={cn(
                      "h-5 w-5",
                      activity.type === 'hire' ? 'text-success' :
                      activity.type === 'complete' ? 'text-primary' :
                      activity.type === 'award' ? 'text-warning' :
                      'text-destructive'
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Generate Report', icon: FileDown, desc: 'Export analytics' },
            { label: 'View Analytics', icon: BarChart3, desc: 'Detailed metrics' },
            { label: 'System Settings', icon: Settings, desc: 'Configure platform' },
            { label: 'Team Performance', icon: Users, desc: 'View all teams' },
          ].map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto flex-col gap-2 py-6 hover:border-primary/50"
              onClick={() => toast({ title: action.label, description: action.desc })}
            >
              <action.icon className="h-6 w-6 text-primary" />
              <span className="font-medium">{action.label}</span>
              <span className="text-xs text-muted-foreground">{action.desc}</span>
            </Button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;

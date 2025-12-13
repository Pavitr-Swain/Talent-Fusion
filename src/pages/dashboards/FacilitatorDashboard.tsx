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
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  Plus,
  Eye,
  MessageSquare,
  FileCheck,
  Calendar,
  Upload,
  BarChart3,
  Search,
  Clock,
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
} from 'recharts';
import { mockTrainees, mockCourses, mockGradingQueue, mockWeeklyProgress, mockScoreDistribution } from '@/utils/mockData';
import { cn } from '@/lib/utils';

const FacilitatorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('students');

  const totalStudents = mockTrainees.length;
  const activeCourses = mockCourses.filter(c => c.status === 'active').length;
  const pendingGrades = mockGradingQueue.length;
  const avgScore = Math.round(mockTrainees.reduce((acc, t) => acc + t.avgScore, 0) / totalStudents);

  const studentColumns = [
    {
      key: 'name',
      label: 'Student',
      sortable: true,
      render: (item: typeof mockTrainees[0]) => (
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
      key: 'currentWeek',
      label: 'Week',
      sortable: true,
      render: (item: typeof mockTrainees[0]) => (
        <Badge variant="outline">Week {item.currentWeek}</Badge>
      ),
    },
    {
      key: 'progress',
      label: 'Progress',
      sortable: true,
      render: (item: typeof mockTrainees[0]) => (
        <div className="flex items-center gap-2 min-w-[120px]">
          <ProgressBar value={item.progress} size="sm" className="flex-1" />
          <span className="text-sm font-medium w-10">{item.progress}%</span>
        </div>
      ),
    },
    {
      key: 'avgScore',
      label: 'Avg Score',
      sortable: true,
      render: (item: typeof mockTrainees[0]) => (
        <span className={cn(
          "font-medium",
          item.avgScore >= 85 ? "text-success" :
          item.avgScore >= 70 ? "text-primary" :
          item.avgScore >= 50 ? "text-warning" : "text-destructive"
        )}>
          {item.avgScore}%
        </span>
      ),
    },
    {
      key: 'lastActivity',
      label: 'Last Active',
      render: (item: typeof mockTrainees[0]) => (
        <span className="text-muted-foreground text-sm">{item.lastActivity}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item: typeof mockTrainees[0]) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast({ title: 'View Profile', description: `Viewing ${item.name}'s profile` })}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast({ title: 'Grade', description: `Grading ${item.name}'s work` })}>
            <FileCheck className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast({ title: 'Message', description: `Messaging ${item.name}` })}>
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout title="Facilitator Dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Welcome, {user?.name?.split(' ')[0]}! 📚
            </h2>
            <p className="text-muted-foreground">
              Manage your courses and track student progress
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Test
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-card">
                <DialogHeader>
                  <DialogTitle>Create New Test</DialogTitle>
                  <DialogDescription>Schedule a new test for your students</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Test Name</Label>
                    <Input placeholder="Enter test name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input placeholder="e.g., 90 mins" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Test description..." />
                  </div>
                  <Button className="w-full" onClick={() => toast({ title: 'Test Created', description: 'Your test has been scheduled.' })}>
                    Schedule Test
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Students"
            value={totalStudents}
            icon={<Users className="h-6 w-6" />}
            trend={{ value: 8, isPositive: true }}
            iconClassName="bg-primary/10 text-primary"
          />
          <StatCard
            title="Active Courses"
            value={activeCourses}
            icon={<BookOpen className="h-6 w-6" />}
            iconClassName="bg-secondary/10 text-secondary"
          />
          <StatCard
            title="Pending Grades"
            value={pendingGrades}
            icon={<ClipboardCheck className="h-6 w-6" />}
            description="Needs attention"
            iconClassName="bg-warning/10 text-warning"
          />
          <StatCard
            title="Average Score"
            value={`${avgScore}%`}
            icon={<TrendingUp className="h-6 w-6" />}
            trend={{ value: 3, isPositive: true }}
            iconClassName="bg-success/10 text-success"
          />
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="students">Student Progress</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="grading">Grading Queue</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            <Card className="border-0 card-shadow-lg">
              <CardHeader>
                <CardTitle>Student Progress</CardTitle>
                <CardDescription>Track and manage student performance</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={mockTrainees}
                  columns={studentColumns}
                  searchable
                  searchPlaceholder="Search students..."
                  searchKeys={['name', 'email']}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Course Management</h3>
              <Button onClick={() => toast({ title: 'Create Course', description: 'Course creation modal would open here.' })}>
                <Plus className="h-4 w-4 mr-2" />
                New Course
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockCourses.map((course) => (
                <Card key={course.id} className="border-0 card-shadow-lg hover:card-shadow transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{course.name}</CardTitle>
                        <CardDescription className="mt-1 text-xs">{course.description}</CardDescription>
                      </div>
                      <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                        {course.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Students</p>
                        <p className="font-semibold">{course.students}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-semibold">{course.duration}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Completion Rate</span>
                        <span className="font-medium">{course.completionRate}%</span>
                      </div>
                      <ProgressBar value={course.completionRate} size="sm" />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => toast({ title: 'Edit Course', description: 'Opening course editor...' })}>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => toast({ title: 'View Details', description: 'Opening course details...' })}>
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="grading" className="space-y-6">
            <Card className="border-0 card-shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Grading Queue</CardTitle>
                    <CardDescription>Assignments awaiting your review</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-warning/10 text-warning">
                    {pendingGrades} pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockGradingQueue.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{item.assignment}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{item.student}</span>
                        <span>•</span>
                        <span>{item.course}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{item.submittedAt}</span>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => toast({ title: 'Grading', description: `Opening ${item.assignment} for grading...` })}>
                        Grade Now
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Content Upload */}
            <Card className="border-0 card-shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Content Upload
                </CardTitle>
                <CardDescription>Upload new learning materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { label: 'Video Lesson', icon: '🎬', desc: 'Upload video content' },
                    { label: 'Reading Material', icon: '📄', desc: 'Add documents & PDFs' },
                    { label: 'Coding Exercise', icon: '💻', desc: 'Create coding challenges' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => toast({ title: item.label, description: 'Upload dialog would open here.' })}
                      className="flex flex-col items-center gap-2 p-6 rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Weekly Progress Chart */}
              <Card className="border-0 card-shadow-lg">
                <CardHeader>
                  <CardTitle>Class Performance Trend</CardTitle>
                  <CardDescription>Weekly average scores and submission rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockWeeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="week" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
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
                        dataKey="submissions" 
                        stroke="hsl(var(--success))" 
                        strokeWidth={2}
                        name="Submissions"
                        dot={{ fill: 'hsl(var(--success))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Score Distribution */}
              <Card className="border-0 card-shadow-lg">
                <CardHeader>
                  <CardTitle>Score Distribution</CardTitle>
                  <CardDescription>Student performance breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockScoreDistribution}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="range" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar 
                        dataKey="count" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]}
                        name="Students"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FacilitatorDashboard;

import React, { useState } from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import StatCard from '@/components/shared/StatCard';
import ProgressBar from '@/components/shared/ProgressBar';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Play,
  Trophy,
  Target,
  Bell,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { mockTestResults, mockUpcomingTests, mockTasks, mockNotifications } from '@/utils/mockData';
import { cn } from '@/lib/utils';

const TraineeDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState(mockTasks);

  const currentWeek = 2;
  const totalWeeks = 12;
  const progress = Math.round((currentWeek / totalWeeks) * 100);

  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    toast({
      title: 'Task updated',
      description: 'Your task has been marked as complete.',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-primary';
    if (score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      high: 'bg-destructive/10 text-destructive',
      medium: 'bg-warning/10 text-warning',
      low: 'bg-muted text-muted-foreground',
    };
    return colors[priority] || colors.low;
  };

  return (
    <DashboardLayout title="Trainee Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h2>
            <p className="text-muted-foreground">
              Track your progress and continue your learning journey
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-warning/10 border border-warning/20">
            <Flame className="h-5 w-5 text-warning" />
            <span className="font-medium text-warning">7 Day Streak!</span>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="border-0 card-shadow-lg overflow-hidden">
          <div className="gradient-primary p-6 text-primary-foreground">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium">Current Progress</p>
                <h3 className="text-3xl font-bold mt-1">Week {currentWeek} of {totalWeeks}</h3>
                <p className="text-primary-foreground/80 mt-1">React Development Mastery</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-4xl font-bold">{progress}%</span>
                <span className="text-primary-foreground/80 text-sm">Complete</span>
              </div>
            </div>
            <div className="mt-6">
              <div className="h-3 rounded-full bg-primary-foreground/20 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-primary-foreground transition-all duration-1000 ease-out animate-progress"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-primary-foreground/80">
                <span>Started: Jan 1, 2024</span>
                <span>Est. Completion: Mar 25, 2024</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Current Course"
            value="Full Stack"
            icon={<BookOpen className="h-6 w-6" />}
            description="React Development Track"
            iconClassName="bg-primary/10 text-primary"
          />
          <StatCard
            title="Completed Lessons"
            value="18/42"
            icon={<CheckCircle2 className="h-6 w-6" />}
            trend={{ value: 12, isPositive: true }}
            iconClassName="bg-success/10 text-success"
          />
          <StatCard
            title="Average Score"
            value="87%"
            icon={<Trophy className="h-6 w-6" />}
            trend={{ value: 5, isPositive: true }}
            iconClassName="bg-warning/10 text-warning"
          />
          <StatCard
            title="Class Rank"
            value="#5"
            icon={<Target className="h-6 w-6" />}
            description="Out of 45 trainees"
            iconClassName="bg-secondary/10 text-secondary"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Course Card */}
            <Card className="border-0 card-shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Continue Learning
                </CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        Lesson 19
                      </Badge>
                      <span className="text-xs text-muted-foreground">45 min</span>
                    </div>
                    <h4 className="font-semibold text-foreground">React Hooks: useEffect Deep Dive</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Learn advanced patterns for managing side effects in React applications
                    </p>
                  </div>
                  <Button className="w-full sm:w-auto">
                    <Play className="h-4 w-4 mr-2" />
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* This Week's Tasks */}
            <Card className="border-0 card-shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    This Week's Tasks
                  </CardTitle>
                  <Badge variant="secondary">
                    {tasks.filter(t => t.completed).length}/{tasks.length} Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border transition-all",
                      task.completed 
                        ? "bg-muted/30 border-muted" 
                        : "bg-card border-border hover:border-primary/50"
                    )}
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                    />
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "font-medium truncate",
                        task.completed && "line-through text-muted-foreground"
                      )}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className={getPriorityBadge(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Test Scores */}
            <Card className="border-0 card-shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-warning" />
                  Recent Test Scores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTestResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{result.testName}</h4>
                        <p className="text-sm text-muted-foreground">{result.date}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className={cn("text-2xl font-bold", getScoreColor(result.score))}>
                            {result.score}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Rank #{result.rank} of {result.totalParticipants}
                          </p>
                        </div>
                        <div className="w-16">
                          <ProgressBar value={result.score} size="sm" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Tests */}
            <Card className="border-0 card-shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-secondary" />
                  Upcoming Tests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockUpcomingTests.map((test) => (
                  <div
                    key={test.id}
                    className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground">{test.name}</h4>
                      <Badge variant="outline" className="text-xs">{test.type}</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{test.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{test.time} • {test.duration}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      Set Reminder
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-0 card-shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notifications
                  </CardTitle>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {mockNotifications.filter(n => !n.read).length} new
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockNotifications.slice(0, 4).map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-3 rounded-lg border transition-colors cursor-pointer",
                      notification.read 
                        ? "bg-card border-border" 
                        : "bg-primary/5 border-primary/20"
                    )}
                    onClick={() => toast({ title: notification.title, description: notification.message })}
                  >
                    <div className="flex items-start gap-3">
                      {!notification.read && (
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground">{notification.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 card-shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                {[
                  { icon: BookOpen, label: 'Curriculum', color: 'text-primary' },
                  { icon: FileText, label: 'Practice Test', color: 'text-secondary' },
                  { icon: CheckCircle2, label: 'Submit Work', color: 'text-success' },
                  { icon: Target, label: 'View Feedback', color: 'text-warning' },
                ].map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="h-auto flex-col gap-2 py-4 hover:border-primary/50"
                    onClick={() => toast({ title: action.label, description: 'Feature coming soon!' })}
                  >
                    <action.icon className={cn("h-5 w-5", action.color)} />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TraineeDashboard;

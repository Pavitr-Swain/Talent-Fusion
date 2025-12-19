import React, { useState, useRef } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  GraduationCap,
  UserCheck,
  Briefcase,
  Plus,
  Eye,
  Calendar,
  Brain,
  FileDown,
  ArrowRight,
  Sparkles,
  ChevronRight,
  MessageSquare,
  Upload,
  FileSpreadsheet,
} from 'lucide-react';
import { mockTrainees, mockBusinessDemands, mockAIRecommendations, mockInterviewPipeline } from '@/utils/mockData';
import { cn } from '@/lib/utils';
import SkillSearchChatbot from '@/components/hr/SkillSearchChatbot';

const HRDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [demandDialogTab, setDemandDialogTab] = useState('manual');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeTrainees = mockTrainees.filter(t => t.status === 'active').length;
  const graduatingThisMonth = mockTrainees.filter(t => t.progress >= 90).length;
  const readyForHiring = mockTrainees.filter(t => t.progress >= 80 && t.avgScore >= 85).length;
  const openPositions = mockBusinessDemands.filter(d => d.status === 'active').length;

  const getUrgencyBadge = (urgency: string) => {
    const styles: Record<string, string> = {
      high: 'bg-destructive/10 text-destructive border-destructive/20',
      medium: 'bg-warning/10 text-warning border-warning/20',
      low: 'bg-muted text-muted-foreground',
    };
    return styles[urgency] || styles.low;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-success/10 text-success',
      inactive: 'bg-muted text-muted-foreground',
      filled: 'bg-primary/10 text-primary',
    };
    return styles[status] || styles.active;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv')) {
        setUploadedFile(file);
        toast({ title: 'File uploaded', description: `${file.name} is ready to process` });
      } else {
        toast({ title: 'Invalid file type', description: 'Please upload an Excel or CSV file', variant: 'destructive' });
      }
    }
  };

  const handleProcessFile = () => {
    if (uploadedFile) {
      toast({ title: 'Processing file', description: `Extracting data from ${uploadedFile.name}...` });
      // Simulate processing
      setTimeout(() => {
        toast({ title: 'Data imported', description: '15 demands extracted from file' });
        setUploadedFile(null);
      }, 1500);
    }
  };

  const pipelineStages = [
    { key: 'applied', label: 'Applied', count: mockInterviewPipeline.applied.length },
    { key: 'phoneScreen', label: 'Phone Screen', count: mockInterviewPipeline.phoneScreen.length },
    { key: 'technical', label: 'Technical', count: mockInterviewPipeline.technical.length },
    { key: 'final', label: 'Final', count: mockInterviewPipeline.final.length },
    { key: 'offer', label: 'Offer', count: mockInterviewPipeline.offer.length },
  ];

  return (
    <DashboardLayout title="HR Dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Welcome, {user?.name?.split(' ')[0]}! 💼
            </h2>
            <p className="text-muted-foreground">
              Manage hiring demands and candidate pipelines
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast({ title: 'Exporting Report', description: 'Generating PDF report...' })}>
              <FileDown className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" onClick={() => setChatbotOpen(true)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              AI Search
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Demand
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg bg-card">
                <DialogHeader>
                  <DialogTitle>Create Business Demand</DialogTitle>
                  <DialogDescription>Add a new hiring requirement</DialogDescription>
                </DialogHeader>
                <Tabs value={demandDialogTab} onValueChange={setDemandDialogTab} className="mt-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="manual" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Manual Entry
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Excel Upload
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="manual" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Position Title</Label>
                      <Input placeholder="e.g., Senior React Developer" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Required Count</Label>
                        <Input type="number" placeholder="5" />
                      </div>
                      <div className="space-y-2">
                        <Label>Urgency</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Department</Label>
                        <Input placeholder="e.g., Engineering" />
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Deadline</Label>
                      <Input type="date" />
                    </div>
                    <Button className="w-full" onClick={() => toast({ title: 'Demand Created', description: 'New hiring demand has been added.' })}>
                      Create Demand
                    </Button>
                  </TabsContent>
                  <TabsContent value="upload" className="space-y-4 mt-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept=".xlsx,.xls,.csv"
                        className="hidden"
                      />
                      <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      {uploadedFile ? (
                        <div className="space-y-2">
                          <p className="font-medium text-foreground">{uploadedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(uploadedFile.size / 1024).toFixed(2)} KB
                          </p>
                          <div className="flex gap-2 justify-center mt-4">
                            <Button variant="outline" onClick={() => setUploadedFile(null)}>
                              Remove
                            </Button>
                            <Button onClick={handleProcessFile}>
                              Process File
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-muted-foreground">
                            Drag and drop your Excel file here, or
                          </p>
                          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                            Browse Files
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">
                            Supports .xlsx, .xls, and .csv files
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">Expected Format:</p>
                      <p className="text-xs text-muted-foreground">
                        Your Excel file should contain columns: Position, Count, Urgency, Department, Deadline, Status
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Trainees"
            value={activeTrainees}
            icon={<Users className="h-6 w-6" />}
            trend={{ value: 12, isPositive: true }}
            iconClassName="bg-primary/10 text-primary"
          />
          <StatCard
            title="Graduating This Month"
            value={graduatingThisMonth}
            icon={<GraduationCap className="h-6 w-6" />}
            iconClassName="bg-secondary/10 text-secondary"
          />
          <StatCard
            title="Ready to Mapping"
            value={readyForHiring}
            icon={<UserCheck className="h-6 w-6" />}
            description="High performers"
            iconClassName="bg-success/10 text-success"
          />
          <StatCard
            title="Active Positions"
            value={openPositions}
            icon={<Briefcase className="h-6 w-6" />}
            iconClassName="bg-warning/10 text-warning"
          />
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="demands">Business Demands</TabsTrigger>
            <TabsTrigger value="pipeline">Interview Pipeline</TabsTrigger>
            <TabsTrigger value="trainees">Trainee Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Business Demands Overview */}
              <Card className="border-0 card-shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      Business Demands
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedTab('demands')}>
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockBusinessDemands.slice(0, 4).map((demand) => (
                    <div
                      key={demand.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{demand.position}</p>
                        <p className="text-sm text-muted-foreground">
                          {demand.count} needed • {demand.department}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getUrgencyBadge(demand.urgency)}>
                          {demand.urgency}
                        </Badge>
                        <Badge variant="secondary" className={getStatusBadge(demand.status)}>
                          {demand.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card className="border-0 card-shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-secondary" />
                    Suggested Candidates
                  </CardTitle>
                  <CardDescription>Top matches based on skills and performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAIRecommendations.slice(0, 2).map((rec) => (
                    <div key={rec.position} className="p-4 rounded-lg bg-muted/30 border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{rec.position}</h4>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          <Brain className="h-3 w-3 mr-1" />
                          {rec.confidence}% match
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {rec.candidates.map((candidate) => (
                          <div
                            key={candidate.id}
                            className="flex items-center justify-between p-2 rounded-lg bg-card"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={candidate.avatar} />
                                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{candidate.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  Score: {candidate.score}% • Skills: {candidate.skillsMatch}%
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => toast({ title: 'View Profile', description: `Viewing ${candidate.name}'s profile` })}>
                                View
                              </Button>
                              <Button size="sm" className="h-7 px-2 text-xs" onClick={() => toast({ title: 'Interview Scheduled', description: `Scheduling interview with ${candidate.name}` })}>
                                Interview
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Interview Pipeline Overview */}
            <Card className="border-0 card-shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Interview Pipeline</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedTab('pipeline')}>
                    Manage Pipeline <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-4 overflow-x-auto pb-4">
                  {pipelineStages.map((stage, index) => (
                    <React.Fragment key={stage.key}>
                      <div className="flex-1 min-w-[140px] text-center">
                        <div className="p-4 rounded-lg bg-muted/50 border border-border">
                          <p className="text-3xl font-bold text-foreground">{stage.count}</p>
                          <p className="text-sm text-muted-foreground mt-1">{stage.label}</p>
                        </div>
                      </div>
                      {index < pipelineStages.length - 1 && (
                        <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demands" className="space-y-6">
            <Card className="border-0 card-shadow-lg">
              <CardHeader>
                <CardTitle>All Business Demands</CardTitle>
                <CardDescription>Manage hiring requirements across departments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockBusinessDemands.map((demand) => (
                  <div
                    key={demand.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{demand.position}</h4>
                        <Badge variant="outline" className={getUrgencyBadge(demand.urgency)}>
                          {demand.urgency} priority
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {demand.count} positions
                        </span>
                        <span>{demand.department}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due: {demand.deadline}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className={getStatusBadge(demand.status)}>
                        {demand.status}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => toast({ title: 'View Candidates', description: 'Opening candidate list...' })}>
                        <Eye className="h-4 w-4 mr-1" />
                        View Candidates
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-5">
              {pipelineStages.map((stage) => {
                const candidates = mockInterviewPipeline[stage.key as keyof typeof mockInterviewPipeline] || [];
                return (
                  <Card key={stage.key} className="border-0 card-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">{stage.label}</CardTitle>
                        <Badge variant="secondary">{stage.count}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {candidates.map((candidate) => (
                        <div
                          key={candidate.id}
                          className="p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/50 cursor-pointer transition-colors"
                          onClick={() => toast({ title: candidate.name, description: `Position: ${candidate.position}` })}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={candidate.avatar} />
                              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium truncate">{candidate.name}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{candidate.position}</p>
                          <p className="text-xs text-muted-foreground">{candidate.date}</p>
                        </div>
                      ))}
                      {candidates.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">No candidates</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="trainees" className="space-y-6">
            <Card className="border-0 card-shadow-lg">
              <CardHeader>
                <CardTitle>Trainee Management</CardTitle>
                <CardDescription>View and manage all trainees</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={mockTrainees}
                  columns={[
                    {
                      key: 'name',
                      label: 'Trainee',
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
                      key: 'course',
                      label: 'Course',
                      sortable: true,
                      render: (item) => <Badge variant="outline">{item.course}</Badge>,
                    },
                    {
                      key: 'progress',
                      label: 'Progress',
                      sortable: true,
                      render: (item) => (
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <ProgressBar value={item.progress} size="sm" className="flex-1" />
                          <span className="text-sm font-medium w-10">{item.progress}%</span>
                        </div>
                      ),
                    },
                    {
                      key: 'avgScore',
                      label: 'Score',
                      sortable: true,
                      render: (item) => (
                        <span className={cn(
                          "font-medium",
                          item.avgScore >= 85 ? "text-success" : item.avgScore >= 70 ? "text-primary" : "text-warning"
                        )}>
                          {item.avgScore}%
                        </span>
                      ),
                    },
                    {
                      key: 'status',
                      label: 'Status',
                      render: (item) => (
                        <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                          {item.status}
                        </Badge>
                      ),
                    },
                  ]}
                  searchable
                  searchPlaceholder="Search trainees..."
                  searchKeys={['name', 'email', 'course']}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* AI Chatbot */}
      <SkillSearchChatbot isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    </DashboardLayout>
  );
};

export default HRDashboard;

// Mock Users with credentials
export const mockUsers = [
  {
    id: "1",
    email: "admin@company.com",
    password: "admin123",
    name: "Rupesh",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    permissions: ["all"],
  },
  {
    id: "2",
    email: "hr@company.com",
    password: "hr123",
    name: "Asiya Ashraf",
    role: "hr",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    permissions: ["manage_trainees", "view_analytics", "manage_hiring"],
  },
  {
    id: "3",
    email: "facilitator@company.com",
    password: "facilitator123",
    name: "Amarathana Shree",
    role: "facilitator",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    permissions: ["manage_courses", "grade_assignments", "create_tests"],
  },
  {
    id: "4",
    email: "trainee@company.com",
    password: "trainee123",
    name: "Priya Sharma",
    role: "trainee",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    permissions: ["view_courses", "take_tests", "submit_assignments"],
  },
  {
    id: "5",
    email: "manager@company.com",
    password: "manager123",
    name: "Vikram Patel",
    role: "manager",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    permissions: ["view_analytics", "view_reports", "manage_strategy"],
  },
];

// Mock Trainees
export const mockTrainees = [
  { id: "t1", name: "Priya Sharma", email: "priya.s@trainee.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", currentWeek: 2, totalWeeks: 12, progress: 18, course: "Full Stack", track: "React Development", lastActivity: "2 hours ago", avgScore: 87, status: "active" },
  { id: "t2", name: "Arjun Reddy", email: "arjun.r@trainee.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", currentWeek: 5, totalWeeks: 12, progress: 42, course: "Core Stack", track: "Python Backend", lastActivity: "1 hour ago", avgScore: 92, status: "active" },
  { id: "t3", name: "Ananya Gupta", email: "ananya.g@trainee.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face", currentWeek: 8, totalWeeks: 12, progress: 68, course: "AI-ML", track: "Machine Learning", lastActivity: "30 mins ago", avgScore: 95, status: "active" },
  { id: "t4", name: "Rahul Verma", email: "rahul.v@trainee.com", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", currentWeek: 3, totalWeeks: 12, progress: 25, course: "Full Stack", track: "Node.js Backend", lastActivity: "4 hours ago", avgScore: 78, status: "active" },
  { id: "t5", name: "Kavitha Nair", email: "kavitha.n@trainee.com", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", currentWeek: 10, totalWeeks: 12, progress: 85, course: "Core Stack", track: "Data Structures", lastActivity: "1 day ago", avgScore: 88, status: "active" },
  { id: "t6", name: "Suresh Kumar", email: "suresh.k@trainee.com", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", currentWeek: 6, totalWeeks: 12, progress: 50, course: "AI-ML", track: "Deep Learning", lastActivity: "3 hours ago", avgScore: 82, status: "active" },
  { id: "t7", name: "Deepika Menon", email: "deepika.m@trainee.com", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", currentWeek: 11, totalWeeks: 12, progress: 92, course: "Full Stack", track: "React Development", lastActivity: "5 mins ago", avgScore: 96, status: "active" },
  { id: "t8", name: "Aditya Joshi", email: "aditya.j@trainee.com", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face", currentWeek: 4, totalWeeks: 12, progress: 33, course: "Core Stack", track: "Python Backend", lastActivity: "6 hours ago", avgScore: 74, status: "active" },
  { id: "t9", name: "Sneha Iyer", email: "sneha.i@trainee.com", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face", currentWeek: 7, totalWeeks: 12, progress: 58, course: "AI-ML", track: "Machine Learning", lastActivity: "2 days ago", avgScore: 89, status: "inactive" },
  { id: "t10", name: "Karthik Rajan", email: "karthik.r@trainee.com", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face", currentWeek: 9, totalWeeks: 12, progress: 75, course: "Full Stack", track: "Node.js Backend", lastActivity: "1 hour ago", avgScore: 91, status: "active" },
  { id: "t11", name: "Meera Krishnan", email: "meera.k@trainee.com", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face", currentWeek: 1, totalWeeks: 12, progress: 8, course: "Core Stack", track: "Data Structures", lastActivity: "Just now", avgScore: 0, status: "active" },
  { id: "t12", name: "Nikhil Desai", email: "nikhil.d@trainee.com", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face", currentWeek: 12, totalWeeks: 12, progress: 98, course: "AI-ML", track: "Deep Learning", lastActivity: "10 mins ago", avgScore: 94, status: "active" },
  { id: "t13", name: "Lakshmi Venkat", email: "lakshmi.v@trainee.com", avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150&h=150&fit=crop&crop=face", currentWeek: 5, totalWeeks: 12, progress: 42, course: "Full Stack", track: "React Development", lastActivity: "8 hours ago", avgScore: 86, status: "active" },
  { id: "t14", name: "Sanjay Rao", email: "sanjay.r@trainee.com", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face", currentWeek: 6, totalWeeks: 12, progress: 50, course: "Core Stack", track: "Python Backend", lastActivity: "4 hours ago", avgScore: 79, status: "active" },
  { id: "t15", name: "Divya Pillai", email: "divya.p@trainee.com", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face", currentWeek: 3, totalWeeks: 12, progress: 25, course: "AI-ML", track: "Machine Learning", lastActivity: "12 hours ago", avgScore: 83, status: "active" },
  { id: "t16", name: "Rohan Mehta", email: "rohan.m@trainee.com", avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face", currentWeek: 8, totalWeeks: 12, progress: 67, course: "Full Stack", track: "Node.js Backend", lastActivity: "2 hours ago", avgScore: 90, status: "active" },
  { id: "t17", name: "Pooja Hegde", email: "pooja.h@trainee.com", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face", currentWeek: 4, totalWeeks: 12, progress: 33, course: "Core Stack", track: "Data Structures", lastActivity: "1 day ago", avgScore: 77, status: "inactive" },
  { id: "t18", name: "Harish Sundaram", email: "harish.s@trainee.com", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face", currentWeek: 10, totalWeeks: 12, progress: 83, course: "AI-ML", track: "Deep Learning", lastActivity: "30 mins ago", avgScore: 93, status: "active" },
  { id: "t19", name: "Nandini Bose", email: "nandini.b@trainee.com", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face", currentWeek: 7, totalWeeks: 12, progress: 58, course: "Full Stack", track: "React Development", lastActivity: "5 hours ago", avgScore: 85, status: "active" },
  { id: "t20", name: "Prashanth Varma", email: "prashanth.v@trainee.com", avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=150&h=150&fit=crop&crop=face", currentWeek: 9, totalWeeks: 12, progress: 75, course: "Core Stack", track: "Python Backend", lastActivity: "3 hours ago", avgScore: 88, status: "active" },
  { id: "t21", name: "Revathi Srinivasan", email: "revathi.s@trainee.com", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face", currentWeek: 11, totalWeeks: 12, progress: 92, course: "AI-ML", track: "Machine Learning", lastActivity: "15 mins ago", avgScore: 97, status: "active" },
];

// Mock Courses
export const mockCourses = [
  { id: "c1", name: "Python Full Stack Development", description: "Complete Python web development with Django and Flask", duration: "12 weeks", students: 45, completionRate: 78, status: "active", instructor: "Amarathana Shree" },
  { id: "c2", name: "React Development Mastery", description: "Advanced React with TypeScript and modern tooling", duration: "12 weeks", students: 52, completionRate: 82, status: "active", instructor: "Amarathana Shree" },
  { id: "c3", name: "Node.js Backend Engineering", description: "Scalable backend systems with Node.js and Express", duration: "10 weeks", students: 38, completionRate: 75, status: "active", instructor: "Amarathana Shree" },
  { id: "c4", name: "AI/ML Fundamentals", description: "Machine learning basics with Python and TensorFlow", duration: "14 weeks", students: 28, completionRate: 65, status: "active", instructor: "Amarathana Shree" },
  { id: "c5", name: "Data Structures & Algorithms", description: "Essential CS fundamentals for technical interviews", duration: "8 weeks", students: 60, completionRate: 88, status: "active", instructor: "Amarathana Shree" },
];

// Mock Test Results for Trainee
export const mockTestResults = [
  { id: "tr1", testName: "React Fundamentals", score: 92, maxScore: 100, date: "2024-01-10", rank: 3, totalParticipants: 45 },
  { id: "tr2", testName: "JavaScript Advanced", score: 88, maxScore: 100, date: "2024-01-05", rank: 7, totalParticipants: 45 },
  { id: "tr3", testName: "CSS Layouts", score: 95, maxScore: 100, date: "2024-01-02", rank: 1, totalParticipants: 45 },
];

// Mock Upcoming Tests
export const mockUpcomingTests = [
  { id: "ut1", name: "React Hooks Deep Dive", date: "2024-01-15", time: "10:00 AM", duration: "90 mins", type: "MCQ + Coding" },
  { id: "ut2", name: "State Management", date: "2024-01-18", time: "2:00 PM", duration: "60 mins", type: "Multiple Choice" },
  { id: "ut3", name: "API Integration", date: "2024-01-22", time: "11:00 AM", duration: "120 mins", type: "Practical" },
];

// Mock Tasks
export const mockTasks = [
  { id: "task1", title: "Complete React Router Assignment", dueDate: "2024-01-12", priority: "high", completed: false },
  { id: "task2", title: "Submit Component Library Project", dueDate: "2024-01-14", priority: "high", completed: false },
  { id: "task3", title: "Review Redux Documentation", dueDate: "2024-01-13", priority: "medium", completed: true },
  { id: "task4", title: "Practice Coding Exercises", dueDate: "2024-01-15", priority: "low", completed: false },
];

// Mock Notifications
export const mockNotifications = [
  { id: "n1", title: "New assignment posted", message: "React Hooks Assignment is now available", time: "5 mins ago", read: false, type: "assignment" },
  { id: "n2", title: "Test reminder", message: "React Hooks Deep Dive test in 2 days", time: "1 hour ago", read: false, type: "test" },
  { id: "n3", title: "Grade posted", message: "Your JavaScript Advanced test has been graded", time: "3 hours ago", read: true, type: "grade" },
  { id: "n4", title: "Course update", message: "New content added to React Development", time: "1 day ago", read: true, type: "course" },
];

// Mock Business Demands (HR)
export const mockBusinessDemands = [
  { id: "bd1", position: "Senior React Developer", count: 5, urgency: "high", status: "open", department: "Engineering", deadline: "2024-02-01" },
  { id: "bd2", position: "Python Backend Developer", count: 3, urgency: "medium", status: "in-progress", department: "Engineering", deadline: "2024-02-15" },
  { id: "bd3", position: "Data Scientist", count: 2, urgency: "high", status: "open", department: "Data Science", deadline: "2024-01-25" },
  { id: "bd4", position: "DevOps Engineer", count: 2, urgency: "low", status: "open", department: "Operations", deadline: "2024-03-01" },
  { id: "bd5", position: "Full Stack Developer", count: 4, urgency: "medium", status: "in-progress", department: "Engineering", deadline: "2024-02-10" },
];

// Mock AI Recommendations
export const mockAIRecommendations = [
  {
    position: "Senior React Developer",
    candidates: [
      { id: "t7", name: "Deepika Menon", score: 96, skillsMatch: 95, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
      { id: "t13", name: "Lakshmi Venkat", score: 86, skillsMatch: 88, avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150&h=150&fit=crop&crop=face" },
      { id: "t19", name: "Nandini Bose", score: 85, skillsMatch: 82, avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face" },
    ],
    confidence: 92,
  },
  {
    position: "Python Backend Developer",
    candidates: [
      { id: "t2", name: "Arjun Reddy", score: 92, skillsMatch: 94, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
      { id: "t20", name: "Prashanth Varma", score: 88, skillsMatch: 90, avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=150&h=150&fit=crop&crop=face" },
      { id: "t8", name: "Aditya Joshi", score: 74, skillsMatch: 78, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" },
    ],
    confidence: 88,
  },
  {
    position: "Data Scientist",
    candidates: [
      { id: "t12", name: "Nikhil Desai", score: 94, skillsMatch: 96, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face" },
      { id: "t21", name: "Revathi Srinivasan", score: 97, skillsMatch: 92, avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face" },
      { id: "t3", name: "Ananya Gupta", score: 95, skillsMatch: 90, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
    ],
    confidence: 95,
  },
];

// Mock Interview Pipeline
export const mockInterviewPipeline = {
  applied: [
    { id: "ip1", name: "Amit Saxena", position: "React Developer", date: "2024-01-08", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    { id: "ip2", name: "Ritu Agarwal", position: "Python Developer", date: "2024-01-09", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
  ],
  phoneScreen: [
    { id: "ip3", name: "Manish Tiwari", position: "Full Stack Developer", date: "2024-01-07", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
  ],
  technical: [
    { id: "ip4", name: "Shreya Kapoor", position: "Data Scientist", date: "2024-01-05", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
    { id: "ip5", name: "Rajesh Khanna", position: "React Developer", date: "2024-01-06", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  ],
  final: [
    { id: "ip6", name: "Gayatri Devi", position: "DevOps Engineer", date: "2024-01-04", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
  ],
  offer: [
    { id: "ip7", name: "Vivek Oberoi", position: "Python Developer", date: "2024-01-03", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face" },
  ],
};

// Mock Chart Data - Performance Trends (6 months)
export const mockPerformanceData = [
  { month: "Aug", avgScore: 72, completionRate: 65, hiringRate: 12 },
  { month: "Sep", avgScore: 75, completionRate: 68, hiringRate: 15 },
  { month: "Oct", avgScore: 78, completionRate: 72, hiringRate: 18 },
  { month: "Nov", avgScore: 82, completionRate: 76, hiringRate: 22 },
  { month: "Dec", avgScore: 85, completionRate: 80, hiringRate: 25 },
  { month: "Jan", avgScore: 88, completionRate: 84, hiringRate: 28 },
];

// Mock Department Data
export const mockDepartments = [
  { name: "Engineering", trainees: 85, performance: 88, budget: 250000 },
  { name: "Data Science", trainees: 35, performance: 92, budget: 120000 },
  { name: "Operations", trainees: 25, performance: 78, budget: 80000 },
  { name: "Product", trainees: 20, performance: 85, budget: 65000 },
];

// Mock Financial Data
export const mockFinancialData = [
  { category: "Training Costs", value: 450000 },
  { category: "Hiring Value", value: 1200000 },
  { category: "Savings", value: 350000 },
];

// Mock Strategic Insights
export const mockStrategicInsights = [
  { id: "si1", insight: "Python course has 95% success rate - consider expanding capacity", type: "success", action: "Expand Course" },
  { id: "si2", insight: "Week 5 shows 15% dropout - add mentorship support", type: "warning", action: "Add Mentors" },
  { id: "si3", insight: "React developers are in high demand - prioritize hiring", type: "info", action: "View Demand" },
  { id: "si4", insight: "Top performers ready for placement: 12 candidates", type: "success", action: "View Candidates" },
  { id: "si5", insight: "AI/ML track needs 2 more facilitators", type: "warning", action: "Hire Facilitator" },
];

// Mock System Logs
export const mockSystemLogs = [
  { id: "log1", user: "admin@company.com", action: "User Created", details: "Created new trainee account", timestamp: "2024-01-10 14:32:15", type: "info" },
  { id: "log2", user: "hr@company.com", action: "Role Updated", details: "Changed role for user #234", timestamp: "2024-01-10 13:45:22", type: "warning" },
  { id: "log3", user: "facilitator@company.com", action: "Course Updated", details: "Updated React Development curriculum", timestamp: "2024-01-10 12:18:45", type: "info" },
  { id: "log4", user: "system", action: "Backup Completed", details: "Daily backup successful", timestamp: "2024-01-10 03:00:00", type: "success" },
  { id: "log5", user: "admin@company.com", action: "Settings Changed", details: "Updated email templates", timestamp: "2024-01-09 16:22:33", type: "info" },
];

// Mock Grading Queue
export const mockGradingQueue = [
  { id: "gq1", student: "Priya Sharma", assignment: "React Router Implementation", submittedAt: "2024-01-10 09:15:00", course: "React Development" },
  { id: "gq2", student: "Arjun Reddy", assignment: "Django REST API Project", submittedAt: "2024-01-10 08:45:00", course: "Python Full Stack" },
  { id: "gq3", student: "Ananya Gupta", assignment: "ML Model Training Exercise", submittedAt: "2024-01-09 23:30:00", course: "AI/ML Fundamentals" },
  { id: "gq4", student: "Rahul Verma", assignment: "Express.js Middleware", submittedAt: "2024-01-09 22:15:00", course: "Node.js Backend" },
  { id: "gq5", student: "Kavitha Nair", assignment: "Binary Search Tree", submittedAt: "2024-01-09 20:00:00", course: "Data Structures" },
];

// Score Distribution Data
export const mockScoreDistribution = [
  { range: "90-100", count: 25, color: "hsl(var(--success))" },
  { range: "80-89", count: 42, color: "hsl(var(--primary))" },
  { range: "70-79", count: 35, color: "hsl(var(--chart-2))" },
  { range: "60-69", count: 18, color: "hsl(var(--warning))" },
  { range: "Below 60", count: 8, color: "hsl(var(--destructive))" },
];

// Weekly Progress Data
export const mockWeeklyProgress = [
  { week: "Week 1", avgScore: 65, submissions: 45 },
  { week: "Week 2", avgScore: 70, submissions: 48 },
  { week: "Week 3", avgScore: 72, submissions: 44 },
  { week: "Week 4", avgScore: 78, submissions: 50 },
  { week: "Week 5", avgScore: 75, submissions: 42 },
  { week: "Week 6", avgScore: 82, submissions: 46 },
];

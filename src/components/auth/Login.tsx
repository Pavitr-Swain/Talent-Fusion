import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, getRoleDashboardPath } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff, GraduationCap, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!email) {
      setError('Email is required');
      setIsSubmitting(false);
      return;
    }

    if (!password) {
      setError('Password is required');
      setIsSubmitting(false);
      return;
    }

    const result = await login(email, password, rememberMe);

    if (result.success) {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      
      // Get the role from the user
      const userRole = email.split('@')[0].replace(/[0-9]/g, '');
      const roleMap: Record<string, string> = {
        admin: 'admin',
        hr: 'hr',
        facilitator: 'facilitator',
        trainee: 'trainee',
        manager: 'manager',
      };
      const role = roleMap[userRole] || 'trainee';
      const dashboardPath = getRoleDashboardPath(role);
      
      navigate(dashboardPath, { replace: true });
    } else {
      setError(result.error || 'Login failed');
      setIsSubmitting(false);
    }
  };

  const demoAccounts = [
    { role: 'Admin', email: 'admin@company.com', password: 'admin123' },
    { role: 'HR Manager', email: 'hr@company.com', password: 'hr123' },
    { role: 'Facilitator', email: 'facilitator@company.com', password: 'facilitator123' },
    { role: 'Trainee', email: 'trainee@company.com', password: 'trainee123' },
    { role: 'Manager', email: 'manager@company.com', password: 'manager123' },
  ];

  const quickLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-foreground/10 backdrop-blur-sm">
              <GraduationCap className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground">
            Enterprise Training Platform
          </h1>
          <p className="text-lg text-primary-foreground/80">
            Empowering organizations with intelligent training management and HR solutions
          </p>
          
          <div className="mt-12 grid grid-cols-3 gap-6 text-primary-foreground/90">
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-primary-foreground/70">Active Trainees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-sm text-primary-foreground/70">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm text-primary-foreground/70">Courses</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center lg:hidden mb-8">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl gradient-primary">
                <GraduationCap className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Enterprise Training</h1>
          </div>

          <Card className="border-0 card-shadow-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive animate-scale-in">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-10"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                    onClick={() => toast({ title: 'Password Reset', description: 'Password reset functionality would be here.' })}
                  >
                    Forgot password?
                  </button>
                </div>

                <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo Accounts */}
          <Card className="border-0 card-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Demo Accounts (Click to fill)
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {demoAccounts.map((account) => (
                <button
                  key={account.role}
                  onClick={() => quickLogin(account.email, account.password)}
                  className="rounded-lg border border-border bg-card px-3 py-2 text-left text-xs transition-all hover:border-primary hover:bg-primary/5"
                >
                  <div className="font-medium text-foreground">{account.role}</div>
                  <div className="text-muted-foreground truncate">{account.email}</div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;

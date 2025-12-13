import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Dashboards
import TraineeDashboard from "./pages/dashboards/TraineeDashboard";
import FacilitatorDashboard from "./pages/dashboards/FacilitatorDashboard";
import HRDashboard from "./pages/dashboards/HRDashboard";
import ManagerDashboard from "./pages/dashboards/ManagerDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Routes - Trainee */}
            <Route
              path="/trainee/dashboard"
              element={
                <ProtectedRoute allowedRoles={['trainee', 'admin']}>
                  <TraineeDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Protected Routes - Facilitator */}
            <Route
              path="/facilitator/dashboard"
              element={
                <ProtectedRoute allowedRoles={['facilitator', 'admin']}>
                  <FacilitatorDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Protected Routes - HR */}
            <Route
              path="/hr/dashboard"
              element={
                <ProtectedRoute allowedRoles={['hr', 'admin']}>
                  <HRDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Protected Routes - Manager */}
            <Route
              path="/manager/dashboard"
              element={
                <ProtectedRoute allowedRoles={['manager', 'admin']}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Protected Routes - Admin */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

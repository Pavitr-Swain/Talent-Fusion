import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { mockUsers } from '@/utils/mockData';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple JWT-like token generator (for demo purposes)
const generateToken = (user: User): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.id,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
    exp: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
  }));
  const signature = btoa(`${header}.${payload}.secret`);
  return `${header}.${payload}.${signature}`;
};

const validateToken = (token: string): boolean => {
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    return decoded.exp > Date.now();
  } catch {
    return false;
  }
};

const decodeToken = (token: string): { role: string; permissions: string[] } | null => {
  try {
    const [, payload] = token.split('.');
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Token refresh mechanism
  useEffect(() => {
    if (token && user) {
      const checkTokenExpiry = setInterval(() => {
        if (!validateToken(token)) {
          logout();
        }
      }, 60000); // Check every minute

      return () => clearInterval(checkTokenExpiry);
    }
  }, [token, user]);

  // Initial loading state
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string, rememberMe: boolean): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      setIsLoading(false);
      return { success: false, error: 'Invalid email or password' };
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    const newToken = generateToken(userWithoutPassword);
    
    setUser(userWithoutPassword);
    setToken(newToken);
    setIsLoading(false);
    
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  const hasPermission = useCallback((permission: string): boolean => {
    if (!user) return false;
    if (user.permissions.includes('all')) return true;
    return user.permissions.includes(permission);
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user && !!token && validateToken(token),
      isLoading,
      login,
      logout,
      hasPermission,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const getRoleDashboardPath = (role: string): string => {
  const paths: Record<string, string> = {
    admin: '/admin/dashboard',
    hr: '/hr/dashboard',
    facilitator: '/facilitator/dashboard',
    trainee: '/trainee/dashboard',
    manager: '/manager/dashboard',
  };
  return paths[role] || '/unauthorized';
};

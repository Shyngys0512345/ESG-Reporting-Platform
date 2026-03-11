import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'administrator' | 'respondent' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId?: string;
  companyName?: string;
  isBlocked?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@esg.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'administrator',
  },
  {
    id: '2',
    email: 'respondent@company.com',
    password: 'resp123',
    name: 'John Respondent',
    role: 'respondent',
    companyId: 'c1',
    companyName: 'TechCorp Inc.',
  },
  {
    id: '3',
    email: 'viewer@esg.com',
    password: 'view123',
    name: 'Jane Viewer',
    role: 'viewer',
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('esg_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password && !u.isBlocked
    );

    if (!foundUser) {
      throw new Error('Invalid credentials or account blocked');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('esg_user', JSON.stringify(userWithoutPassword));
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    // Mock registration
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email,
      name,
      role,
    };

    mockUsers.push({ ...newUser, password });
    setUser(newUser);
    localStorage.setItem('esg_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('esg_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

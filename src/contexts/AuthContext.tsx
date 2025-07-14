import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      try {
        const sessionData = localStorage.getItem('talek_user_session');
        if (sessionData) {
          const { user: userData, expiresAt } = JSON.parse(sessionData);
          
          // Check if session is still valid
          if (new Date().getTime() < expiresAt) {
            setUser(userData);
          } else {
            // Session expired, clear it
            localStorage.removeItem('talek_user_session');
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
        localStorage.removeItem('talek_user_session');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate authentication
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from your backend
      const mockUsers = [
        { id: '1', email: 'demo@talekbushcamp.com', password: 'demo123', name: 'Demo User' },
        { id: '2', email: 'guest@example.com', password: 'password', name: 'Guest User' }
      ];
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        return { success: false, error: 'Invalid email or password' };
      }
      
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        createdAt: new Date()
      };
      
      // Store session (expires in 7 days)
      const expiresAt = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
      const sessionData = {
        user: userData,
        expiresAt
      };
      
      localStorage.setItem('talek_user_session', JSON.stringify(sessionData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Basic validation
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long' };
      }
      
      // In a real app, check if email already exists
      // For demo, we'll just create the user
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        createdAt: new Date()
      };
      
      // Store session (expires in 7 days)
      const expiresAt = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
      const sessionData = {
        user: userData,
        expiresAt
      };
      
      localStorage.setItem('talek_user_session', JSON.stringify(sessionData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'An error occurred during signup' };
    }
  };

  const logout = () => {
    localStorage.removeItem('talek_user_session');
    setUser(null);
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would send a password reset email
      console.log('Password reset email sent to:', email);
      
      return { success: true };
    } catch (error) {
      console.error('Forgot password error:', error);
      return { success: false, error: 'An error occurred while sending reset email' };
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    forgotPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
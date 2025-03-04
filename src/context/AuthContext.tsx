
import React, { createContext, useEffect, useState } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock user for demo
    const mockUser: User = {
      id: "user-1",
      name: "Demo User",
      email: email,
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    };
    
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock user for demo
    const mockUser: User = {
      id: "user-" + Date.now(),
      name: name,
      email: email,
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    };
    
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

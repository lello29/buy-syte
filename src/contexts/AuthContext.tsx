
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "../types";
import { users } from "../data/mockData";
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  updateUserRole: (role: UserRole) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in via localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would validate against a backend
    // For now, we're just checking against mock data
    const user = users.find(u => u.email === email);
    
    // In a real app, we would check the password hash
    // For this mock, we'll assume any password is correct if the email exists
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast.success("Login effettuato con successo!");
      return true;
    }
    
    toast.error("Email o password non validi");
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    toast.success("Logout effettuato con successo");
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if email already exists
    const userExists = users.some(u => u.email === email);
    if (userExists) {
      toast.error("Email già in uso");
      return false;
    }
    
    // In a real app, we would create the user in the database
    // For this mock, we'll just create a new user object
    const newUser: User = {
      id: `u${users.length + 1}`,
      name,
      email,
      role: "user",
      favorites: [],
      loyaltyPoints: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // In a real app, we would add the user to the database
    // For this mock, we're not actually modifying our mock data
    // but we'll pretend like we did
    
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    toast.success("Registrazione completata con successo!");
    return true;
  };

  const updateUserRole = (role: UserRole) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, role };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      toast.success(`Profilo convertito in ${role} con successo!`);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register, updateUserRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole, Shop } from "../types";
import { users, shops } from "../data/mockData";
import { toast } from "sonner";

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  updateUserRole: (role: UserRole) => void;
  updateUserFavorites: (favorites: string[]) => void;
  getNearestShops: (lat: number, lng: number, radius?: number) => Shop[];
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
    
    // Demo accounts for testing
    if (email === "cliente@test.com") {
      const testUser: User = {
        id: "test-user",
        name: "Cliente Test",
        email: "cliente@test.com",
        role: "user",
        favorites: ["shop1", "shop3"],
        loyaltyPoints: 150,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setCurrentUser(testUser);
      localStorage.setItem("currentUser", JSON.stringify(testUser));
      toast.success("Login effettuato con successo!");
      return true;
    } 
    
    if (email === "negozio@test.com") {
      const testUser: User = {
        id: "test-shop",
        name: "Negozio Test",
        email: "negozio@test.com",
        role: "shop",
        favorites: [],
        loyaltyPoints: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setCurrentUser(testUser);
      localStorage.setItem("currentUser", JSON.stringify(testUser));
      toast.success("Login effettuato con successo!");
      return true;
    }
    
    if (email === "admin@test.com") {
      const testUser: User = {
        id: "test-admin",
        name: "Amministratore Test",
        email: "admin@test.com",
        role: "admin",
        favorites: [],
        loyaltyPoints: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setCurrentUser(testUser);
      localStorage.setItem("currentUser", JSON.stringify(testUser));
      toast.success("Login effettuato con successo!");
      return true;
    }
    
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

  const updateUserFavorites = (favorites: string[]) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, favorites };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };
  
  // Function to calculate distance between coordinates using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get nearest shops based on location
  const getNearestShops = (lat: number, lng: number, radius = 10): Shop[] => {
    // In a real app, shops would have lat/lng coordinates in the database
    // For this mock, we'll generate random coordinates near the user's location
    return shops
      .map(shop => {
        // Generate random coordinates within ~5km of user location
        const randomLat = lat + (Math.random() - 0.5) * 0.1;
        const randomLng = lng + (Math.random() - 0.5) * 0.1;
        const distance = calculateDistance(lat, lng, randomLat, randomLng);
        
        return {
          ...shop,
          distance, // Add distance property
          lat: randomLat, // Add latitude
          lng: randomLng  // Add longitude
        };
      })
      .filter(shop => shop.distance <= radius) // Only show shops within radius
      .sort((a, b) => a.distance - b.distance); // Sort by distance
  };
  
  const contextValue: AuthContextType = {
    currentUser,
    login,
    logout,
    register,
    updateUserRole,
    updateUserFavorites,
    getNearestShops,
    isLoading
  };

  return (
    <AuthContext.Provider value={contextValue}>
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

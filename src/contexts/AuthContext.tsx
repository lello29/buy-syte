
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
  getUserShop: () => Shop | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
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
    
    if (email === "info@gelateriaartigianale.it") {
      const testUser: User = {
        id: "gelateria-user",
        name: "Gelateria Artigianale",
        email: "info@gelateriaartigianale.it",
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
    
    const user = users.find(u => u.email === email);
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
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userExists = users.some(u => u.email === email);
    if (userExists) {
      toast.error("Email già in uso");
      return false;
    }
    
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
  
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371;
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

  const getNearestShops = (lat: number, lng: number, radius = 10): Shop[] => {
    return shops
      .map(shop => {
        const randomLat = lat + (Math.random() - 0.5) * 0.1;
        const randomLng = lng + (Math.random() - 0.5) * 0.1;
        const distance = calculateDistance(lat, lng, randomLat, randomLng);
        
        return {
          ...shop,
          distance,
          lat: randomLat,
          lng: randomLng
        };
      })
      .filter(shop => shop.distance <= radius)
      .sort((a, b) => a.distance - b.distance);
  };

  // Function to get the current user's shop if they are a shop user
  const getUserShop = (): Shop | undefined => {
    if (!currentUser || currentUser.role !== 'shop') {
      return undefined;
    }

    // For the Gelateria test account
    if (currentUser.email === 'info@gelateriaartigianale.it') {
      return shops.find(shop => shop.id === 'shop5');
    }

    // For the negozio@test.com test account
    if (currentUser.email === 'negozio@test.com') {
      return shops.find(shop => shop.name === 'Negozio Test') || shops[0];
    }

    // For other shop users, try to find by userId
    return shops.find(shop => shop.userId === currentUser.id);
  };

  const contextValue: AuthContextType = {
    currentUser,
    login,
    logout,
    register,
    updateUserRole,
    updateUserFavorites,
    getNearestShops,
    isLoading,
    getUserShop
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

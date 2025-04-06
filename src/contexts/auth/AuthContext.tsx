
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Shop } from "../../types";
import { shops } from "../../data/mockData";
import { toast } from "sonner";
import { AuthContextType, ShopData } from "./types";
import { authService } from "./authService";
import { findNearestShops, findUserShop } from "./utils";

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
    const user = await authService.login(email, password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    toast.success("Logout effettuato con successo");
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const user = await authService.register(name, email, password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const updateUserRole = (role: User["role"], shopData?: ShopData) => {
    if (currentUser) {
      const updatedUser = authService.updateUserRole(currentUser, role, shopData);
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  const updateUserFavorites = (favorites: string[]) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, favorites };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  const getNearestShops = (lat: number, lng: number, radius = 10): Shop[] => {
    return findNearestShops(shops, lat, lng, radius);
  };

  // Function to get the current user's shop if they are a shop user
  const getUserShop = (): Shop | undefined => {
    if (!currentUser || currentUser.role !== 'shop') {
      return undefined;
    }
    
    return findUserShop(shops, currentUser.id, currentUser.email);
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

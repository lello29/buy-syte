
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../../types";
import { toast } from "sonner";
import { AuthContextType, UserRegistrationData } from "./types";
import { authService } from "./authService";
import { useSessionManager } from "./hooks/useSessionManager";
import { getNearestShopsHelper, getUserShopHelper } from "./utils";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { checkSession, setupAuthListener, cleanupAuthListener } = useSessionManager(setCurrentUser, setIsLoading);

  // Check for existing session on component mount
  useEffect(() => {
    checkSession();
    
    // Set up auth state change listener
    const cleanup = setupAuthListener();
    
    return () => {
      cleanupAuthListener(cleanup);
    };
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

  const logout = async () => {
    try {
      await authService.logout();
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
      toast.success("Logout effettuato con successo");
    } catch (error) {
      console.error("Logout exception:", error);
      toast.error("Si è verificato un errore durante il logout");
    }
  };

  const register = async (name: string, email: string, password: string, userData?: UserRegistrationData): Promise<boolean> => {
    const user = await authService.register(name, email, password, userData);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const updateUserRole = async (role: User["role"], shopData?: any) => {
    if (currentUser) {
      const updatedUser = await authService.updateUserRole(currentUser, role, shopData);
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  const updateUserFavorites = async (favorites: string[]) => {
    if (currentUser) {
      try {
        const updatedUser = await authService.updateUserFavorites(currentUser.id, favorites);
        if (updatedUser) {
          setCurrentUser(updatedUser);
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
          toast.success("Preferiti aggiornati con successo");
        }
      } catch (error) {
        console.error("Update favorites exception:", error);
        toast.error("Si è verificato un errore nell'aggiornamento dei preferiti");
      }
    }
  };

  const getNearestShops = async (lat: number, lng: number, radius = 10) => {
    return getNearestShopsHelper(lat, lng, radius);
  };

  const getUserShop = async () => {
    if (!currentUser || currentUser.role !== 'shop') {
      return undefined;
    }
    
    return getUserShopHelper(currentUser.id, currentUser.email);
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

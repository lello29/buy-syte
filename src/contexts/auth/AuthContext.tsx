
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Shop } from "../../types";
import { shops } from "../../data/mockData";
import { toast } from "sonner";
import { AuthContextType, ShopData } from "./types";
import { authService } from "./authService";
import { findNearestShops, findUserShop } from "./utils";
import { supabase } from "@/lib/supabase";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true);
        
        // First check localStorage for compatibility with demo mode
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
          setIsLoading(false);
          return;
        }
        
        // Then check Supabase session
        const { data } = await supabase.auth.getSession();
        
        if (data.session?.user) {
          // Fetch user profile from our users table
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.session.user.id)
            .single();
            
          if (userData && !error) {
            // Transform from snake_case to camelCase
            const userProfile: User = {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              favorites: userData.favorites || [],
              loyaltyPoints: userData.loyalty_points || 0,
              isActive: userData.is_active,
              createdAt: userData.created_at,
              updatedAt: userData.updated_at,
              fiscalCode: userData.fiscal_code,
              vatNumber: userData.vat_number
            };
            
            setCurrentUser(userProfile);
            localStorage.setItem("currentUser", JSON.stringify(userProfile));
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
          localStorage.removeItem("currentUser");
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
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
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error.message);
        toast.error("Errore durante il logout");
        return;
      }
      
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
      toast.success("Logout effettuato con successo");
    } catch (error) {
      console.error("Logout exception:", error);
      toast.error("Si è verificato un errore durante il logout");
    }
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

  const updateUserRole = async (role: User["role"], shopData?: ShopData) => {
    if (currentUser) {
      const updatedUser = await authService.updateUserRole(currentUser, role, shopData);
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  const updateUserFavorites = async (favorites: string[]) => {
    if (currentUser) {
      try {
        // Update in Supabase
        const { error } = await supabase
          .from('users')
          .update({ 
            favorites,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentUser.id);
        
        if (error) {
          console.error("Update favorites error:", error.message);
          toast.error("Errore nell'aggiornamento dei preferiti");
          return;
        }
        
        // Update local state
        const updatedUser = { ...currentUser, favorites };
        setCurrentUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        toast.success("Preferiti aggiornati con successo");
      } catch (error) {
        console.error("Update favorites exception:", error);
        toast.error("Si è verificato un errore nell'aggiornamento dei preferiti");
      }
    }
  };

  const getNearestShops = async (lat: number, lng: number, radius = 10): Promise<Shop[]> => {
    try {
      // This is a simple implementation - for a real app, you'd use a geoquery or spatial query
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null);
      
      if (error || !data) {
        console.error("Get nearest shops error:", error?.message);
        // Fallback to mock data
        return findNearestShops(shops, lat, lng, radius);
      }
      
      // Format shop data
      const formattedShops: Shop[] = data.map(shop => ({
        id: shop.id,
        userId: shop.user_id,
        name: shop.name,
        description: shop.description,
        address: shop.address,
        phone: shop.phone,
        email: shop.email,
        products: [], // Would need a separate query to get products
        offers: [], // Would need a separate query to get offers
        aiCredits: shop.ai_credits,
        isApproved: shop.is_approved,
        lastUpdated: shop.last_updated,
        createdAt: shop.created_at,
        logoImage: shop.logo_image,
        bannerImage: shop.banner_image,
        websiteUrl: shop.website_url,
        openingHours: shop.opening_hours,
        aboutUs: shop.about_us,
        categories: shop.categories,
        fiscalCode: shop.fiscal_code,
        vatNumber: shop.vat_number,
        location: shop.latitude && shop.longitude ? {
          latitude: shop.latitude,
          longitude: shop.longitude
        } : undefined,
        category: shop.category,
        socialLinks: shop.social_links
      }));
      
      // Calculate distances and filter
      return findNearestShops(formattedShops, lat, lng, radius);
    } catch (error) {
      console.error("Get nearest shops exception:", error);
      // Fallback to mock data
      return findNearestShops(shops, lat, lng, radius);
    }
  };

  // Function to get the current user's shop if they are a shop user
  const getUserShop = async (): Promise<Shop | undefined> => {
    if (!currentUser || currentUser.role !== 'shop') {
      return undefined;
    }
    
    try {
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('user_id', currentUser.id)
        .single();
      
      if (error || !data) {
        console.error("Get user shop error:", error?.message);
        // Fallback to mock data
        return findUserShop(shops, currentUser.id, currentUser.email);
      }
      
      // Format shop data
      return {
        id: data.id,
        userId: data.user_id,
        name: data.name,
        description: data.description,
        address: data.address,
        phone: data.phone,
        email: data.email,
        products: [], // Would need a separate query to get products
        offers: [], // Would need a separate query to get offers
        aiCredits: data.ai_credits,
        isApproved: data.is_approved,
        lastUpdated: data.last_updated,
        createdAt: data.created_at,
        logoImage: data.logo_image,
        bannerImage: data.banner_image,
        websiteUrl: data.website_url,
        openingHours: data.opening_hours,
        aboutUs: data.about_us,
        categories: data.categories,
        fiscalCode: data.fiscal_code,
        vatNumber: data.vat_number,
        location: data.latitude && data.longitude ? {
          latitude: data.latitude,
          longitude: data.longitude
        } : undefined,
        category: data.category,
        socialLinks: data.social_links
      };
    } catch (error) {
      console.error("Get user shop exception:", error);
      // Fallback to mock data
      return findUserShop(shops, currentUser.id, currentUser.email);
    }
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

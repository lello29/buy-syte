
import { User, UserRole } from "../../types";
import { toast } from "sonner";
import { ShopData } from "./types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { handleMockLogin, isTestAccount } from "./mockAuth";
import { supabaseAuth } from "./supabaseAuth";

/**
 * Handles user authentication
 */
export const authService = {
  /**
   * Simulates a login request
   */
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      // Only try to authenticate with Supabase if it's configured
      if (isSupabaseConfigured) {
        // Try to authenticate with Supabase
        const user = await supabaseAuth.signInWithPassword(email, password);
        
        if (user) {
          return user;
        }
        
        // Fallback to mock data for demo purposes
        if (isTestAccount(email)) {
          return handleMockLogin(email, password);
        }
      } else {
        console.log("Supabase not configured, using mock authentication");
        // When Supabase is not configured, fallback to mock data
        if (isTestAccount(email)) {
          return handleMockLogin(email, password);
        }
      }
      
      return null;
    } catch (error) {
      console.error("Login exception:", error);
      toast.error("Si è verificato un errore durante il login");
      
      // Fallback to mock data for demo purposes
      if (isTestAccount(email)) {
        return handleMockLogin(email, password);
      }
      
      return null;
    }
  },

  /**
   * Handle user logout
   */
  logout: async (): Promise<void> => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error.message);
        toast.error("Errore durante il logout");
      }
    }
  },

  /**
   * Handles user registration
   */
  register: async (name: string, email: string, password: string): Promise<User | null> => {
    try {
      if (isSupabaseConfigured) {
        const user = await supabaseAuth.signUp(name, email, password);
        if (user) {
          return user;
        }
      } else {
        // Create a mock user when Supabase is not configured
        console.log("Supabase not configured, creating mock user");
        const mockUserId = `mock-${Date.now()}`;
        const newUser: User = {
          id: mockUserId,
          name,
          email,
          role: "user",
          favorites: [],
          loyaltyPoints: 0,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        toast.success("Registrazione mock completata con successo!");
        return newUser;
      }
      
      return null;
    } catch (error) {
      console.error("Registration exception:", error);
      toast.error("Si è verificato un errore durante la registrazione");
      return null;
    }
  },

  /**
   * Updates user role
   */
  updateUserRole: async (user: User, role: UserRole, shopData?: ShopData): Promise<User> => {
    try {
      const updatedUser = { 
        ...user, 
        role,
        ...(shopData ? {
          fiscalCode: shopData.fiscalCode,
          vatNumber: shopData.vatNumber
        } : {})
      };
      
      if (isSupabaseConfigured) {
        // Update user role in the database
        const roleUpdated = await supabaseAuth.updateUserRole(
          user.id, 
          role, 
          shopData?.fiscalCode, 
          shopData?.vatNumber
        );
        
        if (!roleUpdated) {
          return user;
        }
        
        // If converting to shop, create shop record
        if (role === "shop" && shopData && shopData.shopData) {
          const shopCreated = await supabaseAuth.createShopRecord(
            user.id,
            shopData.shopData,
            shopData.fiscalCode,
            shopData.vatNumber
          );
          
          if (!shopCreated) {
            return user;
          }
        }
      } else {
        console.log("Supabase not configured, using mock role update");
      }
      
      if (role === "shop" && shopData) {
        toast.success(`Profilo convertito in ${role} con successo! Codice Fiscale e Partita IVA registrati.`);
      } else {
        toast.success(`Profilo convertito in ${role} con successo!`);
      }
      
      return updatedUser;
    } catch (error) {
      console.error("Role update exception:", error);
      toast.error("Si è verificato un errore durante l'aggiornamento del ruolo");
      return user;
    }
  },

  /**
   * Updates user favorites
   */
  updateUserFavorites: async (userId: string, favorites: string[]): Promise<User | null> => {
    try {
      // Update in Supabase if configured
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('users')
          .update({ 
            favorites,
            updated_at: new Date().toISOString()
          })
          .eq('id', userId);
        
        if (error) {
          console.error("Update favorites error:", error.message);
          toast.error("Errore nell'aggiornamento dei preferiti");
          return null;
        }
        
        // Get updated user
        const { data: userData, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();
          
        if (fetchError || !userData) {
          console.error("Fetch updated user error:", fetchError?.message);
          return null;
        }
        
        // Transform from snake_case to camelCase
        return {
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
      }
      
      // For mock data, just get the user from localStorage and update
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        return { ...user, favorites };
      }
      
      return null;
    } catch (error) {
      console.error("Update favorites exception:", error);
      toast.error("Si è verificato un errore nell'aggiornamento dei preferiti");
      return null;
    }
  }
};

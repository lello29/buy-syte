
import { User, UserRole } from "../../types";
import { users } from "../../data/mockData";
import { toast } from "sonner";
import { ShopData } from "./types";
import { supabase } from "@/lib/supabase";

/**
 * Handles user authentication
 */
export const authService = {
  /**
   * Simulates a login request
   */
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      // Try to authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Login error:", error.message);
        toast.error("Email o password non validi");
        
        // Fallback to mock data for demo purposes
        if (email === "cliente@test.com" || email === "negozio@test.com" || 
            email === "admin@test.com" || email === "info@gelateriaartigianale.it") {
          return handleMockLogin(email);
        }
        
        return null;
      }

      if (data.user) {
        // Fetch user profile data
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single();

        if (userError || !userData) {
          console.error("User data fetch error:", userError?.message);
          toast.error("Errore nel recupero dei dati utente");
          return null;
        }

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

        toast.success("Login effettuato con successo!");
        return userProfile;
      }
      
      return null;
    } catch (error) {
      console.error("Login exception:", error);
      toast.error("Si è verificato un errore durante il login");
      
      // Fallback to mock data for demo purposes
      if (email === "cliente@test.com" || email === "negozio@test.com" || 
          email === "admin@test.com" || email === "info@gelateriaartigianale.it") {
        return handleMockLogin(email);
      }
      
      return null;
    }
  },

  /**
   * Handles user registration
   */
  register: async (name: string, email: string, password: string): Promise<User | null> => {
    try {
      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });

      if (authError) {
        console.error("Registration auth error:", authError.message);
        toast.error(authError.message || "Errore durante la registrazione");
        return null;
      }

      if (!authData.user) {
        toast.error("Errore durante la creazione dell'utente");
        return null;
      }

      // Create the user profile in our users table
      const newUser: User = {
        id: authData.user.id,
        name,
        email,
        role: "user",
        favorites: [],
        loyaltyPoints: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Insert the user data into our users table
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          favorites: newUser.favorites,
          loyalty_points: newUser.loyaltyPoints,
          is_active: newUser.isActive,
          created_at: newUser.createdAt,
          updated_at: newUser.updatedAt
        });

      if (profileError) {
        console.error("User profile creation error:", profileError.message);
        toast.error("Errore nella creazione del profilo utente");
        return null;
      }

      toast.success("Registrazione completata con successo!");
      return newUser;
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
      
      // Update user role in the database
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({
          role: role,
          fiscal_code: shopData?.fiscalCode,
          vat_number: shopData?.vatNumber,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (userUpdateError) {
        console.error("User role update error:", userUpdateError.message);
        toast.error("Errore nell'aggiornamento del ruolo utente");
        return user;
      }
      
      // If converting to shop, create shop record
      if (role === "shop" && shopData && shopData.shopData) {
        const { error: shopCreateError } = await supabase
          .from('shops')
          .insert({
            user_id: user.id,
            name: shopData.shopData.name,
            description: shopData.shopData.description,
            address: shopData.shopData.address,
            phone: shopData.shopData.phone,
            email: user.email,
            ai_credits: 10, // Default value
            is_approved: false, // Requires admin approval
            last_updated: new Date().toISOString(),
            created_at: new Date().toISOString(),
            fiscal_code: shopData.fiscalCode,
            vat_number: shopData.vatNumber,
            latitude: shopData.shopData.location?.latitude,
            longitude: shopData.shopData.location?.longitude,
            category: shopData.shopData.category
          });
          
        if (shopCreateError) {
          console.error("Shop creation error:", shopCreateError.message);
          toast.error("Errore nella creazione del negozio");
          return user;
        }
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
  }
};

// Helper function for mock login (for demo purposes)
const handleMockLogin = (email: string): User | null => {
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
    toast.success("Login effettuato con successo!");
    return testUser;
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
    toast.success("Login effettuato con successo!");
    return testUser;
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
    toast.success("Login effettuato con successo!");
    return testUser;
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
    toast.success("Login effettuato con successo!");
    return testUser;
  }
  
  return null;
};

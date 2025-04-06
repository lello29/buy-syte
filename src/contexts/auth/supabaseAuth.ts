
import { supabase } from "@/lib/supabase";
import { User } from "@/types";
import { toast } from "sonner";

/**
 * Handles Supabase authentication operations
 */
export const supabaseAuth = {
  /**
   * Sign in user with Supabase
   */
  signInWithPassword: async (email: string, password: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Login error:", error.message);
        toast.error("Email o password non validi");
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
      console.error("Supabase sign in error:", error);
      toast.error("Errore durante l'autenticazione");
      return null;
    }
  },

  /**
   * Register a new user with Supabase
   */
  signUp: async (name: string, email: string, password: string): Promise<User | null> => {
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
      console.error("Supabase sign up error:", error);
      toast.error("Si è verificato un errore durante la registrazione");
      return null;
    }
  },

  /**
   * Update user role in Supabase
   */
  updateUserRole: async (userId: string, role: string, fiscalCode?: string, vatNumber?: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          role: role,
          fiscal_code: fiscalCode,
          vat_number: vatNumber,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (error) {
        console.error("User role update error:", error.message);
        toast.error("Errore nell'aggiornamento del ruolo utente");
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Supabase update role error:", error);
      toast.error("Si è verificato un errore durante l'aggiornamento del ruolo");
      return false;
    }
  },

  /**
   * Create a shop record in Supabase
   */
  createShopRecord: async (userId: string, shopData: any, fiscalCode: string, vatNumber: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('shops')
        .insert({
          user_id: userId,
          name: shopData.name,
          description: shopData.description,
          address: shopData.address,
          phone: shopData.phone,
          email: shopData.email,
          ai_credits: 10, // Default value
          is_approved: false, // Requires admin approval
          last_updated: new Date().toISOString(),
          created_at: new Date().toISOString(),
          fiscal_code: fiscalCode,
          vat_number: vatNumber,
          latitude: shopData.location?.latitude,
          longitude: shopData.location?.longitude,
          category: shopData.category
        });
        
      if (error) {
        console.error("Shop creation error:", error.message);
        toast.error("Errore nella creazione del negozio");
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Supabase create shop error:", error);
      toast.error("Si è verificato un errore durante la creazione del negozio");
      return false;
    }
  }
};

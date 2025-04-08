
import { supabase } from "@/lib/supabase";
import { User } from "@/types";
import { toast } from "sonner";
import { UserRegistrationData } from "../types";

/**
 * Handles Supabase authentication operations for sign in and sign up
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
  signUp: async (name: string, email: string, password: string, userData?: UserRegistrationData): Promise<User | null> => {
    try {
      // Prepara i dati utente aggiuntivi da salvare nei metadati
      const userMetadata = {
        name,
        ...(userData?.fiscalCode && { fiscal_code: userData.fiscalCode }),
        ...(userData?.vatNumber && { vat_number: userData.vatNumber })
      };

      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userMetadata
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
        updatedAt: new Date().toISOString(),
        ...(userData?.fiscalCode && { fiscalCode: userData.fiscalCode }),
        ...(userData?.vatNumber && { vatNumber: userData.vatNumber })
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
          updated_at: newUser.updatedAt,
          fiscal_code: userData?.fiscalCode,
          vat_number: userData?.vatNumber
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
  }
};

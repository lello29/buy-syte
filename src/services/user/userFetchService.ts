
import { User } from "@/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { handleServiceError, notifyWarning } from "./utils/errorHandler";
import { ensureDatabaseConfigured } from "./utils/databaseOperations";

/**
 * Maps database user record to User type
 */
const mapToUserModel = (dbUser: any): User => ({
  id: dbUser.id,
  name: dbUser.name,
  email: dbUser.email,
  role: dbUser.role,
  favorites: dbUser.favorites || [],
  loyaltyPoints: dbUser.loyalty_points || 0,
  isActive: dbUser.is_active,
  createdAt: dbUser.created_at,
  updatedAt: dbUser.updated_at,
  fiscalCode: dbUser.fiscal_code,
  vatNumber: dbUser.vat_number
});

/**
 * Fetches all users from the database
 */
export const fetchUsers = async (): Promise<User[]> => {
  try {
    if (!ensureDatabaseConfigured()) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      handleServiceError(error, "il caricamento degli utenti", "Errore nel caricamento degli utenti");
      return [];
    }
    
    if (!data || data.length === 0) {
      notifyWarning("Nessun utente trovato nel database.");
      return [];
    }
    
    return data.map(mapToUserModel);
  } catch (error) {
    handleServiceError(error, "il caricamento degli utenti", "Si è verificato un errore durante il caricamento degli utenti");
    return [];
  }
};

/**
 * Fetches a single user by ID
 */
export const fetchUserById = async (userId: string): Promise<User | null> => {
  try {
    if (!ensureDatabaseConfigured()) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      handleServiceError(error, "il caricamento dell'utente", "Errore nel caricamento dell'utente");
      return null;
    }
    
    return mapToUserModel(data);
  } catch (error) {
    handleServiceError(error, "il caricamento dell'utente", "Si è verificato un errore durante il caricamento dell'utente");
    return null;
  }
};

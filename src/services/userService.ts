
import { User } from "@/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { toast } from "sonner";
import { supabaseAdmin } from "./supabaseAdmin";

/**
 * Fetches users from the database
 */
export const fetchUsers = async (): Promise<User[]> => {
  try {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error("Error fetching users:", error.message);
          toast.error("Errore nel caricamento degli utenti");
          return [];
        }
        
        if (data && data.length > 0) {
          return data.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            favorites: user.favorites || [],
            loyaltyPoints: user.loyalty_points || 0,
            isActive: user.is_active,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
            fiscalCode: user.fiscal_code,
            vatNumber: user.vat_number
          }));
        } else {
          toast.warning("Nessun utente trovato nel database.");
          return [];
        }
      } catch (dbError) {
        console.error("Database error:", dbError);
        toast.error("Errore di connessione al database");
        return [];
      }
    }
    
    toast.warning("Database non configurato correttamente");
    return [];
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Si è verificato un errore durante il caricamento degli utenti");
    return [];
  }
};

/**
 * Toggles a user's active status
 */
export const toggleUserStatus = async (userId: string, isActive: boolean): Promise<boolean> => {
  try {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('users')
        .update({ 
          is_active: isActive,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
        
      if (error) {
        console.error("Error updating user status:", error.message);
        toast.error("Errore nell'aggiornamento dello stato dell'utente");
        return false;
      }
    } else {
      toast.warning("Database non configurato, impossibile aggiornare l'utente");
      return false;
    }
    
    toast.success(`Stato dell'utente aggiornato con successo`);
    return true;
  } catch (error) {
    console.error("Error toggling user status:", error);
    toast.error("Si è verificato un errore durante l'aggiornamento dello stato dell'utente");
    return false;
  }
};

/**
 * Deletes a user by ID
 */
export const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);
        
      if (error) {
        console.error("Error deleting user:", error.message);
        toast.error("Errore nell'eliminazione dell'utente");
        return false;
      }
    } else {
      toast.warning("Database non configurato, impossibile eliminare l'utente");
      return false;
    }
    
    toast.success(`Utente eliminato con successo`);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error("Si è verificato un errore durante l'eliminazione dell'utente");
    return false;
  }
};

/**
 * Deletes all non-admin users
 * Implementation uses admin service to bypass RLS
 */
export const deleteAllUsers = async (): Promise<boolean> => {
  try {
    if (isSupabaseConfigured) {
      // Use admin service to bypass RLS
      const success = await supabaseAdmin.delete('users');
      
      if (!success) {
        toast.error("Errore nell'eliminazione di tutti gli utenti");
        return false;
      }
    } else {
      toast.warning("Database non configurato, impossibile eliminare gli utenti");
      return false;
    }
    
    toast.success("Tutti gli utenti non amministratori sono stati eliminati con successo");
    return true;
  } catch (error) {
    console.error("Error deleting all users:", error);
    toast.error("Si è verificato un errore durante l'eliminazione di tutti gli utenti");
    return false;
  }
};

/**
 * Updates a user's information
 */
export const updateUser = async (userId: string, userData: Partial<User>): Promise<User | null> => {
  try {
    const updateData: Record<string, any> = {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      fiscal_code: userData.fiscalCode,
      vat_number: userData.vatNumber,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', userId);
        
      if (error) {
        console.error("Error updating user:", error.message);
        toast.error("Errore nell'aggiornamento dell'utente");
        return null;
      }
    } else {
      toast.warning("Database non configurato, impossibile aggiornare l'utente");
      return null;
    }
    
    return { 
      ...userData,
      id: userId,
      updatedAt: new Date().toISOString()
    } as User;
  } catch (error) {
    console.error("Error updating user:", error);
    toast.error("Si è verificato un errore durante l'aggiornamento dell'utente");
    return null;
  }
};

/**
 * Adds a new user
 */
export const addUser = async (userData: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User | null> => {
  try {
    const newUserObj: User = {
      id: `user-${Date.now()}`,
      name: userData.name || "",
      email: userData.email || "",
      role: userData.role || "user",
      favorites: [],
      loyaltyPoints: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fiscalCode: userData.fiscalCode,
      vatNumber: userData.vatNumber
    };
    
    if (isSupabaseConfigured) {
      // Prepare data in the format expected by Supabase
      const userInsertData = {
        name: newUserObj.name,
        email: newUserObj.email,
        role: newUserObj.role,
        favorites: newUserObj.favorites,
        loyalty_points: newUserObj.loyaltyPoints,
        is_active: newUserObj.isActive,
        created_at: newUserObj.createdAt,
        updated_at: newUserObj.updatedAt,
        fiscal_code: userData.fiscalCode || null,
        vat_number: userData.vatNumber || null
      };
      
      // Use admin service to bypass RLS
      const insertedUser = await supabaseAdmin.insert('users', userInsertData);
      
      if (!insertedUser) {
        toast.error("Errore nell'aggiunta dell'utente");
        return null;
      }
      
      // Transform the returned user to our format
      newUserObj.id = insertedUser.id;
    } else {
      toast.warning("Database non configurato, impossibile aggiungere l'utente");
      return null;
    }
    
    toast.success("Utente aggiunto con successo");
    return newUserObj;
  } catch (error) {
    console.error("Error adding user:", error);
    toast.error("Si è verificato un errore durante l'aggiunta dell'utente");
    return null;
  }
};

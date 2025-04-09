
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { toast } from "sonner";
import { supabaseAdmin } from "../supabaseAdmin";

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

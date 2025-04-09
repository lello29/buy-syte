
import { handleServiceError, notifySuccess } from "./utils/errorHandler";
import { deleteUserById } from "./utils/databaseOperations";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
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
        handleServiceError(error, "l'aggiornamento dello stato dell'utente", "Errore nell'aggiornamento dello stato dell'utente");
        return false;
      }
    } else {
      return false;
    }
    
    notifySuccess(`Stato dell'utente aggiornato con successo`);
    return true;
  } catch (error) {
    handleServiceError(error, "l'aggiornamento dello stato dell'utente", "Si è verificato un errore durante l'aggiornamento dello stato dell'utente");
    return false;
  }
};

/**
 * Deletes a user by ID
 */
export const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    const success = await deleteUserById(userId);
    
    if (success) {
      notifySuccess(`Utente eliminato con successo`);
      return true;
    }
    
    return false;
  } catch (error) {
    handleServiceError(error, "l'eliminazione dell'utente", "Si è verificato un errore durante l'eliminazione dell'utente");
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
        handleServiceError(new Error("Admin service failed"), "l'eliminazione di tutti gli utenti", "Errore nell'eliminazione di tutti gli utenti");
        return false;
      }
    } else {
      return false;
    }
    
    notifySuccess("Tutti gli utenti non amministratori sono stati eliminati con successo");
    return true;
  } catch (error) {
    handleServiceError(error, "l'eliminazione di tutti gli utenti", "Si è verificato un errore durante l'eliminazione di tutti gli utenti");
    return false;
  }
};

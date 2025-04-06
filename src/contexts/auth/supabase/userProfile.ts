
import { supabase } from "@/lib/supabase";
import { User } from "@/types";
import { toast } from "sonner";

/**
 * Handles Supabase operations for user profile management
 */
export const userProfileService = {
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
   * Update user favorites
   */
  updateUserFavorites: async (userId: string, favorites: string[]): Promise<User | null> => {
    try {
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
    } catch (error) {
      console.error("Update favorites exception:", error);
      toast.error("Si è verificato un errore nell'aggiornamento dei preferiti");
      return null;
    }
  }
};

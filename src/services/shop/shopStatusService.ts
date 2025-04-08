
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { shopBaseService } from "./shopBaseService";

/**
 * Services for managing shop status operations
 */
export const toggleShopStatus = async (shopId: string, isActive: boolean): Promise<boolean> => {
  try {
    if (shopBaseService.ensureSupabaseConfigured()) {
      const { error } = await supabase
        .from('shops')
        .update({ 
          is_active: isActive,
          last_updated: new Date().toISOString()
        })
        .eq('id', shopId);
        
      if (error) {
        console.error("Error updating shop status:", error.message);
        toast.error("Errore nell'aggiornamento dello stato del negozio");
        return false;
      }
    }
    
    toast.success(`Stato del negozio aggiornato con successo`);
    return true;
  } catch (error) {
    shopBaseService.handleError("l'aggiornamento dello stato del negozio", error);
    return false;
  }
};

export const approveShop = async (shopId: string, isApproved: boolean): Promise<boolean> => {
  try {
    if (shopBaseService.ensureSupabaseConfigured()) {
      const { error } = await supabase
        .from('shops')
        .update({ 
          is_approved: isApproved,
          last_updated: new Date().toISOString()
        })
        .eq('id', shopId);
        
      if (error) {
        console.error("Error updating shop approval status:", error.message);
        toast.error("Errore nell'aggiornamento dello stato di approvazione del negozio");
        return false;
      }
    }
    
    toast.success(`Negozio ${isApproved ? 'approvato' : 'messo in attesa'} con successo`);
    return true;
  } catch (error) {
    shopBaseService.handleError("l'aggiornamento dello stato di approvazione del negozio", error);
    return false;
  }
};

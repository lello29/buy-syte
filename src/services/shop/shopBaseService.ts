
import { Shop } from "@/types";
import { mockShops } from "@/data/mockData";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

/**
 * Base service with utility functions for shop services
 */
export const shopBaseService = {
  /**
   * Gets mock shops for fallback
   */
  getMockShops: (): Shop[] => {
    return mockShops;
  },
  
  /**
   * Handles errors for shop services
   * @param actionName Name of the action where the error occurred
   * @param error The error object
   */
  handleError: (actionName: string, error: any): void => {
    console.error(`Errore durante ${actionName}:`, error);
    toast.error(`Si è verificato un errore durante ${actionName}`);
  },
  
  /**
   * Ensures Supabase is properly configured before proceeding with operations
   */
  ensureSupabaseConfigured: (): boolean => {
    // Prima controlla se l'istanza Supabase è disponibile
    if (!supabase) {
      console.error("Supabase non inizializzato");
      return false;
    }
    
    return true;
  },
  
  /**
   * Formatta un ID shop per compatibilità con il database
   * @param shopId ID del negozio da formattare
   */
  formatShopId: async (shopId: string): Promise<string> => {
    // Verifica se l'ID è in formato UUID
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(shopId);
    
    // Se non è un UUID, utilizza una query di selezione per trovare il negozio
    if (!isUUID && shopId.startsWith('shop-')) {
      console.log(`ID non in formato UUID: ${shopId}, cercando corrispondenza...`);
      
      try {
        const { data: shopData, error: shopError } = await supabase
          .from('shops')
          .select('id')
          .eq('name', shopId.replace('shop-', 'Negozio Demo '));
          
        if (shopError) {
          console.error("Errore durante la ricerca del negozio:", shopError.message);
          return shopId;  // Ritorna l'ID originale in caso di errore
        }
        
        if (shopData && shopData.length > 0) {
          return shopData[0].id;
        }
      } catch (error) {
        console.error("Errore durante la formattazione dell'ID:", error);
      }
    }
    
    return shopId;  // Ritorna l'ID originale se è un UUID o se non è stato trovato un ID corrispondente
  }
};

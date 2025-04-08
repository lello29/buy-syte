
import { Shop } from "@/types";
import { shops as mockShops } from "@/data/mock-data/shops-data";
import { isSupabaseConfigured } from "@/lib/supabase";
import { toast } from "sonner";

/**
 * Base service for common shop functionality
 */
export const shopBaseService = {
  /**
   * Checks if Supabase is properly configured
   */
  ensureSupabaseConfigured: (): boolean => {
    if (!isSupabaseConfigured) {
      console.warn("Supabase non è configurato correttamente. Saranno utilizzati dati mock.");
      return false;
    }
    return true;
  },

  /**
   * Returns mock shop data for testing
   */
  getMockShops: (): Shop[] => {
    console.log("Usando dati mock per i negozi");
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
  }
};

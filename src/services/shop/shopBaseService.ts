
import { Shop } from "@/types";
import { shops as mockShops } from "@/data/mock-data/shops-data";
import { isSupabaseConfigured } from "@/lib/supabase";

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
  }
};

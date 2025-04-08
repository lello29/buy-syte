
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { toast } from "sonner";
import { shops as mockShops } from "@/data/mock-data/shops-data";

/**
 * Base service with utility functions for shop operations
 */
export const shopBaseService = {
  /**
   * Handles errors in shop service operations
   */
  handleError: (operation: string, error: any): void => {
    console.error(`Error ${operation}:`, error);
    toast.error(`Si è verificato un errore durante ${operation}`);
  },

  /**
   * Checks if Supabase is configured, shows a toast if not
   */
  ensureSupabaseConfigured: (): boolean => {
    if (!isSupabaseConfigured) {
      console.log("Supabase not configured correctly, using mock data");
    }
    return isSupabaseConfigured;
  },

  /**
   * Gets mock shops data as fallback
   */
  getMockShops: () => mockShops
};

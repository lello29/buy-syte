
import { Shop } from "@/types";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { shopBaseService } from "./shopBaseService";

/**
 * Fetches shops from the database or returns mock data
 */
export const fetchShops = async (): Promise<Shop[]> => {
  try {
    // Try to fetch from Supabase if configured
    if (shopBaseService.ensureSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('shops')
          .select('*, users:user_id(name, email)')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error("Error fetching shops:", error.message);
          
          // More friendly error for missing tables
          if (error.message.includes("does not exist") || error.code === '42P01') {
            console.log("Shops table does not exist yet, using mock data");
            toast.warning("Tabella negozi non trovata. Clicca su 'Migra Negozi di Esempio'");
            return shopBaseService.getMockShops();
          }
          
          toast.error("Errore nel caricamento dei negozi");
          return []; // Empty array instead of mock data
        }
        
        // Return data from database, even if empty
        console.log(`Found ${data?.length || 0} shops in the database`);
        return data ? data.map(shop => shopBaseService.transformShopFromDB(shop)) : [];
      } catch (dbError) {
        console.error("Database error:", dbError);
        return []; // Empty array instead of mock data
      }
    } else {
      // Supabase not configured, use mock data
      console.log("Supabase not configured, using mock data");
      return shopBaseService.getMockShops();
    }
  } catch (error) {
    console.error("Error fetching shops:", error);
    toast.error("Si è verificato un errore durante il caricamento dei negozi");
    return []; // Empty array instead of mock data
  }
};

/**
 * Fetches a shop by its ID
 */
export const fetchShopById = async (shopId: string): Promise<Shop | null> => {
  try {
    if (shopBaseService.ensureSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('shops')
        .select('*, users:user_id(name, email)')
        .eq('id', shopId)
        .single();
        
      if (error) {
        console.error("Error fetching shop:", error.message);
        toast.error("Errore nel caricamento del negozio");
        
        // Try fallback to mock data
        const mockShop = shopBaseService.getMockShops().find(s => s.id === shopId);
        return mockShop || null;
      }
      
      if (!data) {
        toast.error("Negozio non trovato");
        return null;
      }
      
      return shopBaseService.transformShopFromDB(data);
    }
    
    // If Supabase is not configured, search in mock data
    const mockShop = shopBaseService.getMockShops().find(shop => shop.id === shopId);
    if (mockShop) {
      return mockShop;
    }
    
    toast.error("Negozio non trovato");
    return null;
  } catch (error) {
    console.error("Error fetching shop by ID:", error);
    toast.error("Si è verificato un errore durante il caricamento del negozio");
    return null;
  }
};

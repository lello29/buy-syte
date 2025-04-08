
import { Shop } from "@/types";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { shopBaseService } from "./shopBaseService";

/**
 * Fetches shops from the database or returns mock data
 */
export const fetchShops = async (): Promise<Shop[]> => {
  try {
    if (shopBaseService.ensureSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('shops')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error("Error fetching shops:", error.message);
          // Se la tabella non esiste ancora, usa i dati mock senza mostrare toast di errore
          if (error.message.includes("does not exist") || error.code === '42P01') {
            console.log("Shops table does not exist yet, using mock data");
            toast.warning("Tabella negozi non trovata. Migra i dati dal pannello Impostazioni prima di procedere.");
            return shopBaseService.getMockShops();
          }
          
          toast.error("Errore nel caricamento dei negozi");
          return shopBaseService.getMockShops();
        }
        
        if (data && data.length > 0) {
          return data.map(shop => ({
            id: shop.id,
            userId: shop.user_id || '', // Convert from user_id and provide default
            name: shop.name,
            description: shop.description,
            address: shop.address,
            phone: shop.phone,
            email: shop.email,
            fiscalCode: shop.fiscal_code,
            vatNumber: shop.vat_number,
            category: shop.category,
            logoImage: shop.logo_image,
            isActive: true,
            isApproved: shop.is_approved,
            aiCredits: shop.ai_credits,
            createdAt: shop.created_at,
            lastUpdated: shop.last_updated,
            location: shop.latitude && shop.longitude 
              ? { latitude: shop.latitude, longitude: shop.longitude } 
              : null,
            products: [], // Add missing required property with default empty array
            offers: [] // Add missing required property with default empty array
          }));
        } else {
          // Se non ci sono negozi nel database, usa i dati mock
          toast.warning("Nessun negozio trovato nel database. Migra i dati dal pannello Impostazioni.");
          return shopBaseService.getMockShops();
        }
      } catch (dbError) {
        console.error("Database error:", dbError);
        return shopBaseService.getMockShops();
      }
    }
    
    console.log("No shops found or Supabase not configured correctly, using mock data");
    return shopBaseService.getMockShops();
  } catch (error) {
    console.error("Error fetching shops:", error);
    toast.error("Si è verificato un errore durante il caricamento dei negozi");
    return shopBaseService.getMockShops();
  }
};

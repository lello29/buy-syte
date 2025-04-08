
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
          .select('*, users:user_id(name, email)')
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
          return data.map(shop => {
            // Estrazione delle informazioni dell'utente dalla relazione
            const userInfo = shop.users ? {
              name: shop.users.name,
              email: shop.users.email
            } : null;
            
            return {
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
              isActive: shop.is_active !== null ? shop.is_active : true,
              isApproved: shop.is_approved !== null ? shop.is_approved : false,
              aiCredits: shop.ai_credits,
              createdAt: shop.created_at,
              lastUpdated: shop.last_updated,
              location: shop.latitude && shop.longitude 
                ? { latitude: shop.latitude, longitude: shop.longitude } 
                : null,
              products: [], // Add missing required property with default empty array
              offers: [], // Add missing required property with default empty array
              user: userInfo // Aggiungiamo informazioni sull'utente associato
            };
          });
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
        return null;
      }
      
      if (!data) {
        toast.error("Negozio non trovato");
        return null;
      }
      
      // Estrazione delle informazioni dell'utente dalla relazione
      const userInfo = data.users ? {
        name: data.users.name,
        email: data.users.email
      } : null;
      
      return {
        id: data.id,
        userId: data.user_id || '',
        name: data.name,
        description: data.description,
        address: data.address,
        phone: data.phone,
        email: data.email,
        fiscalCode: data.fiscal_code,
        vatNumber: data.vat_number,
        category: data.category,
        logoImage: data.logo_image,
        isActive: data.is_active !== null ? data.is_active : true,
        isApproved: data.is_approved !== null ? data.is_approved : false,
        aiCredits: data.ai_credits,
        createdAt: data.created_at,
        lastUpdated: data.last_updated,
        location: data.latitude && data.longitude 
          ? { latitude: data.latitude, longitude: data.longitude } 
          : null,
        products: [],
        offers: [],
        user: userInfo // Aggiungiamo informazioni sull'utente associato
      };
    }
    
    // Se Supabase non è configurato, cerca nei dati mock
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

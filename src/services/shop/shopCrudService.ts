
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Shop } from "@/types";
import { shopBaseService } from "./shopBaseService";
import { shops } from "@/data/mock-data/shops-data";
import { supabaseAdmin } from "../supabaseAdmin";

/**
 * Delete a shop
 */
export const deleteShop = async (shopId: string): Promise<boolean> => {
  try {
    console.log("Attempting to delete shop with ID:", shopId);
    
    // Check if Supabase is configured
    if (shopBaseService.ensureSupabaseConfigured()) {
      // Use admin service to bypass RLS
      const success = await supabaseAdmin.delete('shops', 'id', shopId);
      
      if (!success) {
        // Fall back to mock data
        console.log("Falling back to mock data for deletion");
        const index = shops.findIndex(s => s.id === shopId);
        if (index !== -1) {
          shops.splice(index, 1);
          toast.success("Negozio eliminato con successo (modalità mock)");
          return true;
        }
        return false;
      }
      
      toast.success("Negozio eliminato con successo");
      return true;
    } else {
      // Use mock data
      console.log("Using mock data for deletion");
      const index = shops.findIndex(s => s.id === shopId);
      if (index !== -1) {
        shops.splice(index, 1);
        toast.success("Negozio eliminato con successo");
        return true;
      }
      return false;
    }
  } catch (error) {
    shopBaseService.handleError("l'eliminazione del negozio", error);
    return false;
  }
};

/**
 * Delete all shops - migliorato per funzionare con Supabase
 */
export const deleteAllShops = async (): Promise<boolean> => {
  try {
    console.log("Attempting to delete all shops");
    
    // Check if Supabase is configured
    if (shopBaseService.ensureSupabaseConfigured()) {
      // Use admin service to bypass RLS
      const success = await supabaseAdmin.delete('shops');
      
      if (!success) {
        return false;
      }
      
      // Pulisci anche i dati di esempio in memoria
      if (shops && Array.isArray(shops)) {
        shops.length = 0;
      }
      
      return true;
    } else {
      // Clear mock data array
      if (shops && Array.isArray(shops)) {
        shops.length = 0;
      }
      return true;
    }
  } catch (error) {
    shopBaseService.handleError("l'eliminazione di tutti i negozi", error);
    return false;
  }
};

/**
 * Create a new shop
 */
export const createShop = async (shop: Omit<Shop, 'id' | 'lastUpdated'>): Promise<Shop | null> => {
  try {
    console.log("Creating new shop with data:", shop.name);
    
    if (shopBaseService.ensureSupabaseConfigured()) {
      // Prepare data for Supabase
      const shopData = {
        user_id: shop.userId,
        name: shop.name,
        description: shop.description,
        address: shop.address,
        phone: shop.phone,
        email: shop.email,
        category: shop.category,
        is_active: shop.isActive,
        is_approved: shop.isApproved,
        ai_credits: shop.aiCredits,
        fiscal_code: shop.fiscalCode,
        vat_number: shop.vatNumber,
        created_at: shop.createdAt,
        last_updated: new Date().toISOString()
      };
      
      // Use admin service to bypass RLS
      const createdShop = await supabaseAdmin.insert('shops', shopData);
      
      if (!createdShop) {
        // Fallback to mock data creation
        const mockShop: Shop = {
          id: crypto.randomUUID(),
          ...shop,
          lastUpdated: new Date().toISOString()
        };
        
        shops.push(mockShop);
        toast.success("Negozio creato con successo (modalità mock)");
        return mockShop;
      }
      
      toast.success("Negozio creato con successo");
      return shopBaseService.transformShopFromDB(createdShop);
    }
    
    // Use mock data if Supabase is not configured
    const mockShop: Shop = {
      id: crypto.randomUUID(),
      ...shop,
      lastUpdated: new Date().toISOString()
    };
    
    shops.push(mockShop);
    toast.success("Negozio creato con successo (modalità mock)");
    return mockShop;
  } catch (error) {
    shopBaseService.handleError("la creazione del negozio", error);
    return null;
  }
};

// Export createShop as addShop for backward compatibility
export const addShop = createShop;

/**
 * Update a shop
 */
export const updateShop = async (shopId: string, updatedData: Partial<Shop>): Promise<Shop | null> => {
  try {
    console.log("Updating shop with ID:", shopId);
    
    if (shopBaseService.ensureSupabaseConfigured()) {
      // Convert to DB format
      const dbUpdatedData: any = { ...updatedData };
      
      // Handle nested objects like location
      if (updatedData.location) {
        dbUpdatedData.latitude = updatedData.location.latitude;
        dbUpdatedData.longitude = updatedData.location.longitude;
        delete dbUpdatedData.location;
      }
      
      // Convert camelCase to snake_case
      if ('lastUpdated' in updatedData) {
        dbUpdatedData.last_updated = updatedData.lastUpdated;
        delete dbUpdatedData.lastUpdated;
      }
      
      if ('isActive' in updatedData) {
        dbUpdatedData.is_active = updatedData.isActive;
        delete dbUpdatedData.isActive;
      }
      
      if ('isApproved' in updatedData) {
        dbUpdatedData.is_approved = updatedData.isApproved;
        delete dbUpdatedData.isApproved;
      }
      
      if ('aiCredits' in updatedData) {
        dbUpdatedData.ai_credits = updatedData.aiCredits;
        delete dbUpdatedData.aiCredits;
      }
      
      if ('userId' in updatedData) {
        dbUpdatedData.user_id = updatedData.userId;
        delete dbUpdatedData.userId;
      }
      
      const { data: updatedShop, error } = await supabase
        .from('shops')
        .update({
          ...dbUpdatedData,
          last_updated: new Date().toISOString()
        })
        .eq('id', shopId)
        .select('*')
        .single();
        
      if (error) {
        console.error("Error updating shop:", error.message);
        // Fallback to mock data
        const shopIndex = shops.findIndex(s => s.id === shopId);
        if (shopIndex === -1) {
          console.error("Shop not found in mock data:", shopId);
          return null;
        }
        
        const updatedMockShop = {
          ...shops[shopIndex],
          ...updatedData,
          lastUpdated: new Date().toISOString()
        };
        
        shops[shopIndex] = updatedMockShop;
        toast.success("Negozio aggiornato con successo (modalità mock)");
        return updatedMockShop;
      }
      
      toast.success("Negozio aggiornato con successo");
      return shopBaseService.transformShopFromDB(updatedShop);
    }
    
    // Use mock data if Supabase is not configured
    const shopIndex = shops.findIndex(s => s.id === shopId);
    if (shopIndex === -1) {
      console.error("Shop not found in mock data:", shopId);
      return null;
    }
    
    const updatedShop = {
      ...shops[shopIndex],
      ...updatedData,
      lastUpdated: new Date().toISOString()
    };
    
    shops[shopIndex] = updatedShop;
    toast.success("Negozio aggiornato con successo (modalità mock)");
    return updatedShop;
  } catch (error) {
    shopBaseService.handleError("l'aggiornamento del negozio", error);
    return null;
  }
};

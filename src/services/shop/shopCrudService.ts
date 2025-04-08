
import { Shop } from "@/types";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { shopBaseService } from "./shopBaseService";

/**
 * Adds a new shop to the database
 * @param shopData The shop data to add
 * @returns A Promise with the created shop
 */
export const addShop = async (shopData: any): Promise<Shop | null> => {
  try {
    const shopId = uuidv4();
    const newShop: Shop = {
      id: shopId,
      userId: shopData.userId || '',
      name: shopData.name,
      description: shopData.description || '',
      address: shopData.address || '',
      phone: shopData.phone || '',
      email: shopData.email || '',
      fiscalCode: shopData.fiscalCode || '',
      vatNumber: shopData.vatNumber || '',
      category: shopData.category || 'General',
      logoImage: shopData.logoImage || '',
      isActive: true,
      isApproved: false,
      aiCredits: 100,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      location: null,
      products: [],
      offers: [],
    };

    if (shopBaseService.ensureSupabaseConfigured()) {
      const { error } = await supabase
        .from('shops')
        .insert({
          id: newShop.id,
          user_id: newShop.userId,
          name: newShop.name,
          description: newShop.description,
          address: newShop.address,
          phone: newShop.phone,
          email: newShop.email,
          fiscal_code: newShop.fiscalCode,
          vat_number: newShop.vatNumber,
          category: newShop.category,
          logo_image: newShop.logoImage,
          is_active: newShop.isActive,
          is_approved: newShop.isApproved,
          ai_credits: newShop.aiCredits,
          created_at: newShop.createdAt,
          last_updated: newShop.lastUpdated,
          latitude: newShop.location?.latitude,
          longitude: newShop.location?.longitude
        });
        
      if (error) {
        console.error("Error adding shop:", error.message);
        toast.error("Errore nell'aggiunta del negozio");
        return null;
      }
    }
    
    toast.success("Negozio creato con successo");
    return newShop;
  } catch (error) {
    shopBaseService.handleError("l'aggiunta del negozio", error);
    return null;
  }
};

/**
 * Updates an existing shop
 * @param shopId The ID of the shop to update
 * @param shopData The updated shop data
 * @returns A Promise with a success flag
 */
export const updateShop = async (shopId: string, shopData: Shop): Promise<boolean> => {
  try {
    if (shopBaseService.ensureSupabaseConfigured()) {
      const { error } = await supabase
        .from('shops')
        .update({
          user_id: shopData.userId,
          name: shopData.name,
          description: shopData.description,
          address: shopData.address,
          phone: shopData.phone,
          email: shopData.email,
          fiscal_code: shopData.fiscalCode,
          vat_number: shopData.vatNumber,
          category: shopData.category,
          logo_image: shopData.logoImage,
          is_active: shopData.isActive,
          is_approved: shopData.isApproved,
          ai_credits: shopData.aiCredits,
          last_updated: new Date().toISOString(),
          latitude: shopData.location?.latitude,
          longitude: shopData.location?.longitude
        })
        .eq('id', shopId);
        
      if (error) {
        console.error("Error updating shop:", error.message);
        toast.error("Errore nell'aggiornamento del negozio");
        return false;
      }
    }
    
    toast.success("Negozio aggiornato con successo");
    return true;
  } catch (error) {
    shopBaseService.handleError("l'aggiornamento del negozio", error);
    return false;
  }
};

/**
 * Deletes a shop
 * @param shopId The ID of the shop to delete
 * @returns A Promise with a success flag
 */
export const deleteShop = async (shopId: string): Promise<boolean> => {
  try {
    if (shopBaseService.ensureSupabaseConfigured()) {
      const { error } = await supabase
        .from('shops')
        .delete()
        .eq('id', shopId);
        
      if (error) {
        console.error("Error deleting shop:", error.message);
        toast.error("Errore nell'eliminazione del negozio");
        return false;
      }
    }
    
    toast.success("Negozio eliminato con successo");
    return true;
  } catch (error) {
    shopBaseService.handleError("l'eliminazione del negozio", error);
    return false;
  }
};

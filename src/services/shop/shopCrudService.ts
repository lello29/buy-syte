
import { Shop } from "@/types";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { shopBaseService } from "./shopBaseService";

/**
 * Services for CRUD operations on shops
 */
export const deleteShop = async (shopId: string): Promise<boolean> => {
  try {
    if (shopBaseService.ensureSupabaseConfigured()) {
      // Verifica se l'ID è in formato UUID
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(shopId);
      
      // Se non è un UUID, utilizza una query di selezione per trovare il negozio
      if (!isUUID && shopId.startsWith('shop-')) {
        console.log(`ID non in formato UUID: ${shopId}, cercando corrispondenza...`);
        
        const { data: shopData, error: shopError } = await supabase
          .from('shops')
          .select('id')
          .eq('name', shopId.replace('shop-', 'Negozio Demo '));
          
        if (shopError) {
          console.error("Errore durante la ricerca del negozio:", shopError.message);
          return false;
        }
        
        if (shopData && shopData.length > 0) {
          shopId = shopData[0].id;
          console.log(`Trovato ID UUID per il negozio: ${shopId}`);
        } else {
          console.error(`Nessun negozio trovato con il nome: ${shopId}`);
          toast.error("Negozio non trovato nel database");
          return false;
        }
      }
      
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
    
    toast.success(`Negozio eliminato con successo`);
    return true;
  } catch (error) {
    shopBaseService.handleError("l'eliminazione del negozio", error);
    return false;
  }
};

export const addShop = async (shopData: Partial<Shop>): Promise<Shop | null> => {
  try {
    const newShopId = `shop-${Date.now()}`;
    const newShop: Shop = {
      id: newShopId,
      userId: shopData.userId || '', // Include the userId property with default
      name: shopData.name || '',
      description: shopData.description || '',
      address: shopData.address || '',
      phone: shopData.phone || '',
      email: shopData.email || '',
      category: shopData.category || '',
      fiscalCode: shopData.fiscalCode || '',
      vatNumber: shopData.vatNumber || '',
      isActive: true,
      isApproved: false,
      aiCredits: 100,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      location: shopData.location || null,
      products: [], // Add missing required property with default empty array
      offers: [] // Add missing required property with default empty array
    };
    
    if (shopBaseService.ensureSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('shops')
        .insert({
          name: newShop.name,
          description: newShop.description,
          address: newShop.address,
          phone: newShop.phone,
          email: newShop.email,
          category: newShop.category,
          fiscal_code: newShop.fiscalCode,
          vat_number: newShop.vatNumber,
          is_active: newShop.isActive,
          is_approved: newShop.isApproved,
          ai_credits: newShop.aiCredits,
          created_at: newShop.createdAt,
          last_updated: newShop.lastUpdated,
          latitude: newShop.location?.latitude,
          longitude: newShop.location?.longitude,
          user_id: newShop.userId // Assicuriamoci di salvare correttamente l'userId
        })
        .select();
        
      if (error) {
        console.error("Error adding shop:", error.message);
        toast.error("Errore nell'aggiunta del negozio");
        return null;
      }
      
      if (data && data.length > 0) {
        newShop.id = data[0].id;
      }
    }
    
    toast.success("Negozio aggiunto con successo");
    return newShop;
  } catch (error) {
    shopBaseService.handleError("l'aggiunta del negozio", error);
    return null;
  }
};

export const updateShop = async (shopId: string, shopData: Partial<Shop>): Promise<boolean> => {
  try {
    if (shopBaseService.ensureSupabaseConfigured()) {
      // Verifica se l'ID è in formato UUID
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(shopId);
      
      // Se non è un UUID, utilizza una query di selezione per trovare il negozio
      if (!isUUID && shopId.startsWith('shop-')) {
        console.log(`ID non in formato UUID: ${shopId}, cercando corrispondenza...`);
        
        const { data: shopData, error: shopError } = await supabase
          .from('shops')
          .select('id')
          .eq('name', shopId.replace('shop-', 'Negozio Demo '));
          
        if (shopError) {
          console.error("Errore durante la ricerca del negozio:", shopError.message);
          return false;
        }
        
        if (shopData && shopData.length > 0) {
          shopId = shopData[0].id;
          console.log(`Trovato ID UUID per il negozio: ${shopId}`);
        } else {
          console.error(`Nessun negozio trovato con il nome: ${shopId}`);
          toast.error("Negozio non trovato nel database");
          return false;
        }
      }
      
      const { error } = await supabase
        .from('shops')
        .update({
          name: shopData.name,
          description: shopData.description,
          address: shopData.address,
          phone: shopData.phone,
          email: shopData.email,
          category: shopData.category,
          fiscal_code: shopData.fiscalCode,
          vat_number: shopData.vatNumber,
          is_active: shopData.isActive,
          is_approved: shopData.isApproved,
          ai_credits: shopData.aiCredits,
          last_updated: new Date().toISOString(),
          latitude: shopData.location?.latitude,
          longitude: shopData.location?.longitude,
          user_id: shopData.userId // Assicuriamoci di aggiornare correttamente l'userId
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

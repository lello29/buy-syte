
import { Shop } from "@/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { shops as mockShops } from "@/data/mock-data/shops-data";
import { toast } from "sonner";

export const fetchShops = async (): Promise<Shop[]> => {
  try {
    if (isSupabaseConfigured) {
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
            return mockShops;
          }
          
          toast.error("Errore nel caricamento dei negozi");
          return mockShops;
        }
        
        if (data && data.length > 0) {
          return data.map(shop => ({
            id: shop.id,
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
              : null
          }));
        } else {
          // Se non ci sono negozi nel database, usa i dati mock
          toast.warning("Nessun negozio trovato nel database. Migra i dati dal pannello Impostazioni.");
          return mockShops;
        }
      } catch (dbError) {
        console.error("Database error:", dbError);
        return mockShops;
      }
    }
    
    console.log("No shops found or Supabase not configured correctly, using mock data");
    return mockShops;
  } catch (error) {
    console.error("Error fetching shops:", error);
    toast.error("Si è verificato un errore durante il caricamento dei negozi");
    return mockShops;
  }
};

export const toggleShopStatus = async (shopId: string, isActive: boolean): Promise<boolean> => {
  try {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('shops')
        .update({ 
          is_active: isActive,
          last_updated: new Date().toISOString()
        })
        .eq('id', shopId);
        
      if (error) {
        console.error("Error updating shop status:", error.message);
        toast.error("Errore nell'aggiornamento dello stato del negozio");
        return false;
      }
    }
    
    toast.success(`Stato del negozio aggiornato con successo`);
    return true;
  } catch (error) {
    console.error("Error toggling shop status:", error);
    toast.error("Si è verificato un errore durante l'aggiornamento dello stato del negozio");
    return false;
  }
};

export const approveShop = async (shopId: string, isApproved: boolean): Promise<boolean> => {
  try {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('shops')
        .update({ 
          is_approved: isApproved,
          last_updated: new Date().toISOString()
        })
        .eq('id', shopId);
        
      if (error) {
        console.error("Error updating shop approval status:", error.message);
        toast.error("Errore nell'aggiornamento dello stato di approvazione del negozio");
        return false;
      }
    }
    
    toast.success(`Negozio ${isApproved ? 'approvato' : 'messo in attesa'} con successo`);
    return true;
  } catch (error) {
    console.error("Error approving shop:", error);
    toast.error("Si è verificato un errore durante l'aggiornamento dello stato di approvazione del negozio");
    return false;
  }
};

export const deleteShop = async (shopId: string): Promise<boolean> => {
  try {
    if (isSupabaseConfigured) {
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
    console.error("Error deleting shop:", error);
    toast.error("Si è verificato un errore durante l'eliminazione del negozio");
    return false;
  }
};

export const addShop = async (shopData: Partial<Shop>): Promise<Shop | null> => {
  try {
    const newShopId = `shop-${Date.now()}`;
    const newShop: Shop = {
      id: newShopId,
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
      location: shopData.location || null
    };
    
    if (isSupabaseConfigured) {
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
          longitude: newShop.location?.longitude
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
    console.error("Error adding shop:", error);
    toast.error("Si è verificato un errore durante l'aggiunta del negozio");
    return null;
  }
};

export const updateShop = async (shopId: string, shopData: Partial<Shop>): Promise<boolean> => {
  try {
    if (isSupabaseConfigured) {
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
    console.error("Error updating shop:", error);
    toast.error("Si è verificato un errore durante l'aggiornamento del negozio");
    return false;
  }
};

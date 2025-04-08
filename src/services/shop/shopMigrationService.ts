
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Shop } from "@/types";
import { toast } from "sonner";
import { shopBaseService } from "./shopBaseService";
import { shops as mockShops } from "@/data/mock-data/shops-data";

/**
 * Service for handling shop data migration
 */
export const migrateShops = async (): Promise<Shop[]> => {
  try {
    if (!shopBaseService.ensureSupabaseConfigured()) {
      toast.error("Supabase non è configurato correttamente");
      return shopBaseService.getMockShops();
    }

    const transformedShops = mockShops.map(shop => ({
      id: shop.id,
      user_id: shop.userId,
      name: shop.name,
      description: shop.description,
      address: shop.address,
      phone: shop.phone,
      email: shop.email,
      logo_image: shop.logoImage,
      banner_image: shop.bannerImage,
      category: shop.category || 'General',
      ai_credits: shop.aiCredits || 100,
      is_approved: true,
      last_updated: new Date().toISOString(),
      created_at: shop.createdAt,
      fiscal_code: shop.fiscalCode,
      vat_number: shop.vatNumber,
      latitude: shop.location?.latitude,
      longitude: shop.location?.longitude
    }));
    
    // Insert shops
    const { error } = await supabase
      .from('shops')
      .upsert(transformedShops, { 
        onConflict: 'id',
        ignoreDuplicates: false
      });
      
    if (error) {
      console.error("Shop migration error:", error.message);
      toast.error("Errore durante la migrazione dei negozi");
      return shopBaseService.getMockShops();
    }
    
    toast.success("Negozi migrati con successo!");
    
    // After migrating, fetch the shops again
    const { data, error: fetchError } = await supabase
      .from('shops')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (fetchError) {
      console.error("Error fetching shops after migration:", fetchError.message);
      return shopBaseService.getMockShops();
    }
    
    return data.map(shop => ({
      id: shop.id,
      userId: shop.user_id || '',
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
      products: [],
      offers: []
    }));
  } catch (error) {
    console.error("Shop migration exception:", error);
    toast.error("Si è verificato un errore durante la migrazione dei negozi");
    return shopBaseService.getMockShops();
  }
};

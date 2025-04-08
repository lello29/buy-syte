
import { supabase } from "@/lib/supabase";
import { shops as mockShops } from "@/data/mock-data/shops-data";
import { toast } from "sonner";

/**
 * Service for migrating shop data to Supabase
 */
export const shopMigrationService = {
  /**
   * Migrate all mock shop data to Supabase
   * @returns A boolean indicating success or failure
   */
  migrateShops: async (): Promise<boolean> => {
    try {
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
        return false;
      }
      
      toast.success("Negozi migrati con successo!");
      return true;
    } catch (error) {
      console.error("Shop migration exception:", error);
      toast.error("Si è verificato un errore durante la migrazione dei negozi");
      return false;
    }
  },

  /**
   * Check if shops exist in the database
   * @returns A promise that resolves to a boolean
   */
  checkShopsExist: async (): Promise<boolean> => {
    try {
      const { count, error } = await supabase
        .from('shops')
        .select('*', { count: 'exact', head: true });
        
      if (error) {
        console.error("Shop check error:", error.message);
        return false;
      }
      
      return count !== null && count > 0;
    } catch (error) {
      console.error("Shop check exception:", error);
      return false;
    }
  }
};

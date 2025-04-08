
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

/**
 * Service for creating shop records in Supabase
 */
export const shopCreationService = {
  /**
   * Create a shop record in Supabase
   * @param userId - The ID of the user who owns the shop
   * @param shopData - Basic shop information
   * @param fiscalCode - The fiscal code for the shop
   * @param vatNumber - The VAT number for the shop
   * @returns A boolean indicating success or failure
   */
  createShopRecord: async (userId: string, shopData: any, fiscalCode: string, vatNumber: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('shops')
        .insert({
          user_id: userId,
          name: shopData.name,
          description: shopData.description,
          address: shopData.address,
          phone: shopData.phone,
          email: shopData.email,
          ai_credits: 10, // Default value
          is_approved: false, // Requires admin approval
          last_updated: new Date().toISOString(),
          created_at: new Date().toISOString(),
          fiscal_code: fiscalCode,
          vat_number: vatNumber,
          latitude: shopData.location?.latitude,
          longitude: shopData.location?.longitude,
          category: shopData.category
        });
        
      if (error) {
        console.error("Shop creation error:", error.message);
        toast.error("Errore nella creazione del negozio");
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Supabase create shop error:", error);
      toast.error("Si è verificato un errore durante la creazione del negozio");
      return false;
    }
  }
};

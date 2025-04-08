
import { Shop } from "@/types";
import { shops as mockShops } from "@/data/mock-data/shops-data";
import { isSupabaseConfigured } from "@/lib/supabase";
import { toast } from "sonner";

/**
 * Base service for common shop functionality
 */
export const shopBaseService = {
  /**
   * Checks if Supabase is properly configured
   */
  ensureSupabaseConfigured: (): boolean => {
    if (!isSupabaseConfigured) {
      console.warn("Supabase non è configurato correttamente. Saranno utilizzati dati mock.");
      return false;
    }
    return true;
  },

  /**
   * Returns mock shop data for testing
   */
  getMockShops: (): Shop[] => {
    console.log("Usando dati mock per i negozi");
    return mockShops;
  },
  
  /**
   * Handles errors for shop services
   * @param actionName Name of the action where the error occurred
   * @param error The error object
   */
  handleError: (actionName: string, error: any): void => {
    console.error(`Errore durante ${actionName}:`, error);
    toast.error(`Si è verificato un errore durante ${actionName}`);
  },

  /**
   * Transforms a shop record from database format to application format
   */
  transformShopFromDB: (shopData: any): Shop => {
    return {
      id: shopData.id,
      userId: shopData.user_id || '',
      name: shopData.name,
      description: shopData.description,
      address: shopData.address,
      phone: shopData.phone,
      email: shopData.email,
      fiscalCode: shopData.fiscal_code,
      vatNumber: shopData.vat_number,
      category: shopData.category,
      logoImage: shopData.logo_image,
      bannerImage: shopData.banner_image,
      isActive: shopData.is_active !== null ? shopData.is_active : true,
      isApproved: shopData.is_approved !== null ? shopData.is_approved : false,
      aiCredits: shopData.ai_credits,
      createdAt: shopData.created_at,
      lastUpdated: shopData.last_updated,
      location: shopData.latitude && shopData.longitude 
        ? { latitude: shopData.latitude, longitude: shopData.longitude } 
        : null,
      products: [],
      offers: []
    };
  }
};

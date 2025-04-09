
import { Shop } from "@/types";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

/**
 * Save shop location coordinates to the database
 * 
 * @param shop - The shop to update
 * @param location - The location coordinates
 * @returns A promise that resolves to true if successful, false otherwise
 */
export const saveShopLocation = async (
  shop: Shop, 
  location: { latitude: number; longitude: number }
): Promise<boolean> => {
  try {
    if (!shop.id) {
      console.error("Cannot save location: Shop ID is missing");
      return false;
    }

    // First update the shop object itself
    shop.location = location;

    // Then update the database if we have access to it
    const { error } = await supabase
      .from('shops')
      .update({
        latitude: location.latitude,
        longitude: location.longitude,
        last_updated: new Date().toISOString()
      })
      .eq('id', shop.id);

    if (error) {
      console.error("Error saving shop location:", error);
      toast.error("Errore nel salvare la posizione del negozio");
      return false;
    }

    toast.success("Posizione salvata con successo");
    return true;
  } catch (error) {
    console.error("Error in saveShopLocation:", error);
    toast.error("Si è verificato un errore durante il salvataggio della posizione");
    return false;
  }
};

/**
 * Get location for a shop from the database
 * 
 * @param shopId - The ID of the shop
 * @returns A promise that resolves to location coordinates or null
 */
export const getShopLocation = async (
  shopId: string
): Promise<{ latitude: number; longitude: number } | null> => {
  try {
    const { data, error } = await supabase
      .from('shops')
      .select('latitude, longitude')
      .eq('id', shopId)
      .single();

    if (error || !data.latitude || !data.longitude) {
      return null;
    }

    return {
      latitude: data.latitude,
      longitude: data.longitude
    };
  } catch (error) {
    console.error("Error getting shop location:", error);
    return null;
  }
};

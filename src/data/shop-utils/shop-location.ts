
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

/**
 * Get shops nearest to a location
 * 
 * @param latitude - The latitude coordinate
 * @param longitude - The longitude coordinate
 * @param radius - The search radius in kilometers (default: 5)
 * @param limit - Maximum number of shops to return (default: 10)
 * @returns A promise that resolves to an array of shops
 */
export const getNearestShops = async (
  latitude: number,
  longitude: number,
  radius: number = 5,
  limit: number = 10
): Promise<Shop[]> => {
  try {
    // In a real implementation, we would use PostGIS for spatial queries
    // For this example, we'll fetch all shops and calculate distance in JS
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null);

    if (error || !data) {
      console.error("Error fetching shops for nearest calculation:", error);
      return [];
    }

    // Convert to Shop objects and calculate distances
    const shopsWithDistance = data.map(shop => {
      const shopLatitude = shop.latitude;
      const shopLongitude = shop.longitude;
      
      // Calculate distance using Haversine formula
      const distance = calculateDistance(
        latitude, 
        longitude, 
        shopLatitude, 
        shopLongitude
      );
      
      return {
        id: shop.id,
        name: shop.name,
        description: shop.description || "",
        address: shop.address || "",
        phone: shop.phone || "",
        email: shop.email || "",
        aiCredits: shop.ai_credits || 100,
        isApproved: shop.is_approved || false,
        isActive: shop.is_active !== undefined ? shop.is_active : true,
        lastUpdated: shop.last_updated || new Date().toISOString(),
        createdAt: shop.created_at || new Date().toISOString(),
        location: {
          latitude: shopLatitude,
          longitude: shopLongitude
        },
        category: shop.category || "",
        products: [],
        offers: [],
        fiscalCode: shop.fiscal_code || "",
        vatNumber: shop.vat_number || "",
        userId: shop.user_id || "",
        distance
      };
    });
    
    // Filter by radius (in km) and sort by distance
    return shopsWithDistance
      .filter(shop => shop.distance <= radius)
      .sort((a, b) => (a.distance || 0) - (b.distance || 0))
      .slice(0, limit);
    
  } catch (error) {
    console.error("Error in getNearestShops:", error);
    return [];
  }
};

/**
 * Calculate distance between two coordinates using the Haversine formula
 * 
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in kilometers
 */
const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km
  
  return distance;
};

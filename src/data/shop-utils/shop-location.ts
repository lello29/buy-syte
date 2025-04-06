
import { Shop } from "@/types";
import { shops } from "../mock-data/shops-data";

/**
 * Get the nearest shops based on user location
 * @param userLat User's latitude
 * @param userLng User's longitude
 * @param limit Maximum number of shops to return
 * @returns An array of shops sorted by proximity
 */
export const getNearestShops = (userLat: number, userLng: number, limit: number = 5): Shop[] => {
  // Create a copy of shops to avoid modifying the original array
  return [...shops]
    // Filter shops that have location data
    .filter(shop => shop.location)
    // Sort by distance (simplified calculation)
    .sort((a, b) => {
      if (!a.location || !b.location) return 0;
      
      const distA = calculateDistance(userLat, userLng, a.location.latitude, a.location.longitude);
      const distB = calculateDistance(userLat, userLng, b.location.latitude, b.location.longitude);
      
      return distA - distB;
    })
    // Take only the specified number of results
    .slice(0, limit);
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @private
 */
export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

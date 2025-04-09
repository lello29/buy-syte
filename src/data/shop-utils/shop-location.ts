
import { Shop, ShopLocation } from "@/types";

/**
 * Saves a shop's location information to storage
 * @param shopId The ID of the shop
 * @param location The location data for the shop
 */
export const saveShopLocation = async (shopId: string, location: ShopLocation): Promise<void> => {
  try {
    console.log(`Saving location for shop ${shopId}:`, location);
    // Implementation would depend on your storage mechanism
    // For now, just log the action
    return Promise.resolve();
  } catch (error) {
    console.error("Error saving shop location:", error);
    return Promise.reject(error);
  }
};

/**
 * Gets shops nearest to a specific location
 * @param location The reference location
 * @param shops List of shops to filter
 * @param maxDistance Maximum distance in kilometers
 * @returns Array of shops sorted by distance
 */
export const getNearestShops = (
  location: { latitude: number; longitude: number },
  shops: Shop[],
  maxDistance = 10
): Shop[] => {
  // Filter shops that have location data
  const shopsWithLocation = shops.filter(shop => shop.location && 
    shop.location.latitude && shop.location.longitude);
  
  // Calculate distance and sort by proximity
  const shopsWithDistance = shopsWithLocation.map(shop => {
    const distance = calculateDistance(
      location.latitude,
      location.longitude,
      shop.location!.latitude,
      shop.location!.longitude
    );
    return { shop, distance };
  });
  
  // Filter by maximum distance and sort by distance
  return shopsWithDistance
    .filter(item => item.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)
    .map(item => item.shop);
};

/**
 * Calculate distance between two points using the Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in kilometers
 */
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return distance;
};

const degToRad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

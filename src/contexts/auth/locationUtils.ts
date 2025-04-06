
import { Shop } from "../../types";

/**
 * Calculate distance between two points using Haversine formula
 */
export const calculateDistance = (
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number => {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Find shops within a certain radius of coordinates
 */
export const findNearestShops = (
  shops: Shop[], 
  lat: number, 
  lng: number, 
  radius: number = 10
): Shop[] => {
  // Filter shops that have location data
  const shopsWithLocation = shops.filter(
    (shop) => shop.location?.latitude && shop.location?.longitude
  );
  
  // Calculate distance for each shop and filter by radius
  const nearbyShops = shopsWithLocation
    .map((shop) => {
      if (!shop.location?.latitude || !shop.location?.longitude) {
        return { ...shop, distance: Infinity };
      }
      
      const distance = calculateDistance(
        lat, 
        lng, 
        shop.location.latitude, 
        shop.location.longitude
      );
      
      return { ...shop, distance };
    })
    .filter((shop) => shop.distance <= radius)
    .sort((a, b) => a.distance - b.distance);
  
  return nearbyShops;
};

/**
 * Find a shop based on the user ID or email
 */
export const findUserShop = (
  shops: Shop[], 
  userId: string, 
  userEmail: string
): Shop | undefined => {
  // First try to find by userId
  let shop = shops.find((shop) => shop.userId === userId);
  
  // If not found, try by email
  if (!shop) {
    shop = shops.find((shop) => shop.email === userEmail);
  }
  
  return shop;
};

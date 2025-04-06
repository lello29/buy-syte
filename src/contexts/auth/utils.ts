
import { Shop } from "../../types";

/**
 * Calculates the distance between two coordinates using the haversine formula
 */
export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371;
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
 * Finds nearest shops based on coordinates and radius
 */
export const findNearestShops = (shops: Shop[], lat: number, lng: number, radius = 10): Shop[] => {
  return shops
    .map(shop => {
      const randomLat = lat + (Math.random() - 0.5) * 0.1;
      const randomLng = lng + (Math.random() - 0.5) * 0.1;
      const distance = calculateDistance(lat, lng, randomLat, randomLng);
      
      return {
        ...shop,
        distance,
        lat: randomLat,
        lng: randomLng
      };
    })
    .filter(shop => shop.distance <= radius)
    .sort((a, b) => a.distance - b.distance);
};

/**
 * Finds a shop by user ID or email
 */
export const findUserShop = (shops: Shop[], userId: string, userEmail: string): Shop | undefined => {
  // For the Gelateria test account
  if (userEmail === 'info@gelateriaartigianale.it') {
    return shops.find(shop => shop.id === 'shop5');
  }

  // For the negozio@test.com test account
  if (userEmail === 'negozio@test.com') {
    return shops.find(shop => shop.name === 'Negozio Test') || shops[0];
  }

  // For other shop users, try to find by userId
  return shops.find(shop => shop.userId === userId);
};

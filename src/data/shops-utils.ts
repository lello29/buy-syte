
import { Shop } from "@/types";
import { shops } from "./mock-data/shops-data";

/**
 * Get a shop by its ID
 * @param shopId The ID of the shop to find
 * @returns The shop with the matching ID, or undefined if not found
 */
export const getShopById = (shopId: string): Shop | undefined => {
  return shops.find(shop => shop.id === shopId);
};

/**
 * Get shops by category
 * @param category The category to filter by
 * @returns An array of shops in the specified category
 */
export const getShopsByCategory = (category: string): Shop[] => {
  return shops.filter(shop => shop.category === category);
};

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
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
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

/**
 * Get active shops
 * @returns An array of active shops
 */
export const getActiveShops = (): Shop[] => {
  return shops.filter(shop => shop.isActive);
};

/**
 * Get shops by approval status
 * @param isApproved The approval status to filter by
 * @returns An array of shops with the specified approval status
 */
export const getShopsByApprovalStatus = (isApproved: boolean): Shop[] => {
  return shops.filter(shop => shop.isApproved === isApproved);
};

/**
 * Search shops by name, email, or address
 * @param searchTerm The search term to filter shops by
 * @returns An array of shops that match the search term
 */
export const searchShops = (searchTerm: string): Shop[] => {
  if (!searchTerm) return shops;
  
  const term = searchTerm.toLowerCase();
  return shops.filter(shop => 
    shop.name.toLowerCase().includes(term) || 
    shop.email.toLowerCase().includes(term) || 
    shop.address.toLowerCase().includes(term) ||
    (shop.description && shop.description.toLowerCase().includes(term))
  );
};

/**
 * Sort shops by a specific field
 * @param shopsList The list of shops to sort
 * @param field The field to sort by
 * @param direction The sort direction (asc or desc)
 * @returns A sorted array of shops
 */
export const sortShops = (
  shopsList: Shop[], 
  field: keyof Shop, 
  direction: 'asc' | 'desc' = 'asc'
): Shop[] => {
  return [...shopsList].sort((a, b) => {
    // Handle different field types
    let valueA = a[field];
    let valueB = b[field];
    
    // Handle dates as strings
    if (field === 'createdAt' || field === 'lastUpdated') {
      valueA = new Date(valueA as string).getTime();
      valueB = new Date(valueB as string).getTime();
    }
    
    // Handle nested location object
    if (field === 'location') {
      return 0; // Skip sorting for location objects
    }
    
    // Basic comparison
    if (valueA < valueB) return direction === 'asc' ? -1 : 1;
    if (valueA > valueB) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Get the most recently created shops
 * @param limit Maximum number of shops to return
 * @returns An array of the most recently created shops
 */
export const getRecentShops = (limit: number = 5): Shop[] => {
  return [...shops]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

/**
 * Get shops with low AI credits
 * @param threshold The credit threshold below which shops are considered low
 * @returns An array of shops with AI credits below the threshold
 */
export const getShopsWithLowCredits = (threshold: number = 20): Shop[] => {
  return shops.filter(shop => shop.aiCredits < threshold);
};

/**
 * Create a new shop
 * @param shopData The shop data
 * @returns The created shop
 */
export const createShop = (shopData: Omit<Shop, 'id' | 'createdAt' | 'lastUpdated'>): Shop => {
  const now = new Date().toISOString();
  const newShop: Shop = {
    ...shopData,
    id: `shop-${Date.now()}`,
    createdAt: now,
    lastUpdated: now,
    products: [],
    offers: [],
    isActive: true
  };
  
  // In a real application, this would save to a database
  // For now, we'll just return the new shop
  return newShop;
};

/**
 * Update an existing shop
 * @param shopId The ID of the shop to update
 * @param shopData The updated shop data
 * @returns The updated shop, or undefined if not found
 */
export const updateShop = (shopId: string, shopData: Partial<Shop>): Shop | undefined => {
  const shopIndex = shops.findIndex(shop => shop.id === shopId);
  if (shopIndex === -1) return undefined;
  
  const updatedShop = {
    ...shops[shopIndex],
    ...shopData,
    lastUpdated: new Date().toISOString()
  };
  
  // In a real application, this would update the database
  // For now, we'll just return the updated shop
  return updatedShop;
};

/**
 * Export all shops data
 */
export { shops };

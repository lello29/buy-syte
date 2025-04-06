
import { Shop } from "@/types";

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
  // This is a mock function that doesn't actually update anything persistently
  // In a real application, this would update the database
  const now = new Date().toISOString();
  
  return {
    id: shopId,
    ...shopData,
    lastUpdated: now
  } as Shop;
};

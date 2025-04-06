
import { Shop } from "@/types";
import { shops } from "../mock-data/shops-data";

/**
 * Get a shop by its ID
 * @param shopId The ID of the shop to find
 * @returns The shop with the matching ID, or undefined if not found
 */
export const getShopById = (shopId: string): Shop | undefined => {
  return shops.find(shop => shop.id === shopId);
};

/**
 * Get active shops
 * @returns An array of active shops
 */
export const getActiveShops = (): Shop[] => {
  return shops.filter(shop => shop.isActive);
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
 * Export all shops data
 */
export { shops };

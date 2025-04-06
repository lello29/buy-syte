
import { Shop } from "@/types";
import { shops } from "../mock-data/shops-data";

/**
 * Get shops by category
 * @param category The category to filter by
 * @returns An array of shops in the specified category
 */
export const getShopsByCategory = (category: string): Shop[] => {
  return shops.filter(shop => shop.category === category);
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
 * Get shops with low AI credits
 * @param threshold The credit threshold below which shops are considered low
 * @returns An array of shops with AI credits below the threshold
 */
export const getShopsWithLowCredits = (threshold: number = 20): Shop[] => {
  return shops.filter(shop => shop.aiCredits < threshold);
};

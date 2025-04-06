
import { Shop } from "@/types";

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

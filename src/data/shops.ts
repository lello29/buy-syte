
// This file re-exports shop data and utility functions from their modularized locations
// To maintain backward compatibility with existing imports

export { shops } from './mock-data/shops-data';
export { 
  getShopById,
  getShopsByCategory,
  getNearestShops,
  getActiveShops
} from './shops-utils';

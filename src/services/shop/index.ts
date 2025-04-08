
// Export all shop-related services from a single entry point
export { fetchShops, fetchShopById } from './shopFetchService';
export { createShop, updateShop, deleteShop, addShop } from './shopCrudService';
export { toggleShopStatus, approveShop } from './shopStatusService';
export { migrateShops } from './shopMigrationService';
export { shopBaseService } from './shopBaseService';

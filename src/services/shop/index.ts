
// Export all shop services from separate files
export { fetchShops } from './shopFetchService';
export { toggleShopStatus, approveShop } from './shopStatusService';
export { deleteShop, addShop, updateShop } from './shopCrudService';
export { migrateShops } from './shopMigrationService';

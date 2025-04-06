
// Re-export all mock data from separate files
export * from './users';
export * from './shops';
export * from './products';
export * from './offers';
export * from './collaborators';
export * from './tasks';
export * from './orders';
export * from './categories';

// Import the data directly to avoid require statements
import { users } from './users';
import { shops } from './mock-data/shops-data';
import { products } from './products';
import { offers } from './offers';
import { tasks } from './tasks';
import { orders } from './orders';

// Helper functions for accessing data
export const getUsersByRole = (role: string) => {
  return users.filter((user: any) => user.role === role);
};

export const getShopById = (shopId: string) => {
  return shops.find((shop: any) => shop.id === shopId);
};

export const getProductsByShopId = (shopId: string) => {
  return products.filter((product: any) => product.shopId === shopId);
};

export const getOffersByShopId = (shopId: string) => {
  return offers.filter((offer: any) => offer.shopId === shopId);
};

export const getTasksByCollaboratorId = (collaboratorId: string) => {
  return tasks.filter((task: any) => task.assignedTo === collaboratorId);
};

export const getOrdersByUserId = (userId: string) => {
  return orders.filter((order: any) => order.userId === userId);
};

export const getOrdersByShopId = (shopId: string) => {
  return orders.filter((order: any) => order.shopId === shopId);
};


// Re-export all mock data from separate files
export * from './users';
export * from './shops';
export * from './products';
export * from './offers';
export * from './collaborators';
export * from './tasks';
export * from './orders';
export * from './categories';

// Helper functions for accessing data
export const getUsersByRole = (role: string) => {
  const { users } = require('./users');
  return users.filter((user: any) => user.role === role);
};

export const getShopById = (shopId: string) => {
  const { shops } = require('./shops');
  return shops.find((shop: any) => shop.id === shopId);
};

export const getProductsByShopId = (shopId: string) => {
  const { products } = require('./products');
  return products.filter((product: any) => product.shopId === shopId);
};

export const getOffersByShopId = (shopId: string) => {
  const { offers } = require('./offers');
  return offers.filter((offer: any) => offer.shopId === shopId);
};

export const getTasksByCollaboratorId = (collaboratorId: string) => {
  const { tasks } = require('./tasks');
  return tasks.filter((task: any) => task.assignedTo === collaboratorId);
};

export const getOrdersByUserId = (userId: string) => {
  const { orders } = require('./orders');
  return orders.filter((order: any) => order.userId === userId);
};

export const getOrdersByShopId = (shopId: string) => {
  const { orders } = require('./orders');
  return orders.filter((order: any) => order.shopId === shopId);
};

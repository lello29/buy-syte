
// This file is kept for backward compatibility
// It re-exports everything from the modularized data files

import {
  users,
  shops,
  products,
  offers,
  collaborators,
  tasks,
  orders,
  getUsersByRole,
  getShopById,
  getProductsByShopId,
  getOffersByShopId,
  getTasksByCollaboratorId,
  getOrdersByUserId,
  getOrdersByShopId
} from './index';

// Re-export everything
export {
  users,
  shops,
  products,
  offers,
  collaborators,
  tasks,
  orders,
  getUsersByRole,
  getShopById,
  getProductsByShopId,
  getOffersByShopId,
  getTasksByCollaboratorId,
  getOrdersByUserId,
  getOrdersByShopId
};

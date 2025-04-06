
import { users } from "./users";
import { tasks } from "./tasks";
import { products } from "./products";
import { categories } from "./categories";
import { orders } from "./orders";
import { offers } from "./offers";
import { shops } from "./shops";
import { collaborators } from "./collaborators";

// Import helper functions directly from the index file
import { 
  getUsersByRole,
  getShopById,
  getProductsByShopId,
  getOffersByShopId,
  getTasksByCollaboratorId,
  getOrdersByUserId,
  getOrdersByShopId
} from "./index";

export {
  users,
  tasks,
  products,
  categories,
  orders,
  offers,
  shops,
  collaborators,
  // Helper functions
  getUsersByRole,
  getShopById,
  getProductsByShopId,
  getOffersByShopId,
  getTasksByCollaboratorId,
  getOrdersByUserId,
  getOrdersByShopId
};

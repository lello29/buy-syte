
export type UserRole = 'user' | 'shop' | 'collaborator' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  favorites: string[]; // IDs of favorite shops
  loyaltyPoints: number;
  isActive?: boolean; // Added property
  createdAt: string;
  updatedAt: string;
}

export interface Shop {
  id: string;
  userId: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  products: Product[];
  offers: Offer[];
  aiCredits: number;
  isApproved?: boolean; // Added property
  lastUpdated: string;
  createdAt: string;
}

export interface Collaborator {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  coverageArea: string;
  availability: string;
  rating: number;
  completedTasks: number;
  isActive?: boolean; // Added property
  createdAt: string;
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  inventory: number;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  shopId: string;
  products: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalPrice: number;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Offer {
  id: string;
  shopId: string;
  title: string;
  description: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  shopId: string;
  addedAt: string;
}

export interface Task {
  id: string;
  shopId: string;
  collaboratorId?: string;
  title: string;
  description: string;
  status: 'open' | 'assigned' | 'completed' | 'cancelled';
  reward: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

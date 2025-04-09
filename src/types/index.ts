export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  favorites: string[];
  loyaltyPoints: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  fiscalCode?: string;
  vatNumber?: string;
}

export type UserRole = "user" | "shop" | "collaborator" | "admin";

export interface Shop {
  id: string;
  userId: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  fiscalCode?: string;
  vatNumber?: string;
  category?: string;
  logoImage?: string;
  bannerImage?: string;
  websiteUrl?: string;
  openingHours?: string;
  aboutUs?: string;
  isActive?: boolean;
  isApproved?: boolean;
  aiCredits?: number;
  createdAt: string;
  lastUpdated: string;
  location: ShopLocation | null;
  products: Product[];
  offers: Offer[];
  categories?: string[];
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  user?: {  // Aggiungiamo un campo opzionale per le informazioni sull'utente
    name?: string;
    email?: string;
  };
}

export interface ShopLocation {
  latitude: number;
  longitude: number;
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  description: string;  // Changed from optional to required to match usage in components
  price: number;
  discountPrice?: number;
  category: string;
  inventory: number;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: string;
  shopId: string;
  name: string;
  description?: string;
  discount: number;
  discountPercentage?: number;  // Added to match usage in offers.ts
  startDate: string;
  endDate: string;
  isActive: boolean;
  title?: string;
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
  isActive: boolean;
  createdAt: string;
}

export interface Task {
  id: string;
  shopId: string;
  collaboratorId: string;
  title: string;
  description: string;
  status: TaskStatus;
  reward: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = "open" | "assigned" | "completed";

export interface Order {
  id: string;
  userId: string;
  shopId: string;
  products: OrderProduct[];
  status: OrderStatus;
  totalPrice: number;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderProduct {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
}

// Add ShopFormData type
export interface ShopFormData {
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  category?: string;
  fiscalCode?: string;
  vatNumber?: string;
  latitude?: number;
  longitude?: number;
  userId?: string;
  isActive?: boolean;
  isApproved?: boolean;
  aiCredits?: number;
}

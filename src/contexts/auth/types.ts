
import { User } from "../../types";

export type ShopData = {
  fiscalCode?: string;
  vatNumber?: string;
  shopData?: Record<string, any>;
};

export type UserRegistrationData = {
  fiscalCode?: string;
  vatNumber?: string;
};

export interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, userData?: UserRegistrationData) => Promise<boolean>;
  updateUserRole: (role: User["role"], shopData?: ShopData) => Promise<void>;
  updateUserFavorites: (favorites: string[]) => Promise<void>;
  getNearestShops: (lat: number, lng: number, radius?: number) => Promise<any[]>;
  isLoading: boolean;
  getUserShop: () => Promise<any>;
}

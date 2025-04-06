
import { User, UserRole, Shop } from "../../types";

export interface ShopData {
  fiscalCode: string;
  vatNumber: string;
  shopData?: {
    name: string;
    description: string;
    address: string;
    phone: string;
    category?: string;
    location?: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  updateUserRole: (role: UserRole, shopData?: ShopData) => void;
  updateUserFavorites: (favorites: string[]) => void;
  getNearestShops: (lat: number, lng: number, radius?: number) => Promise<Shop[]>;
  isLoading: boolean;
  getUserShop: () => Promise<Shop | undefined>;
}

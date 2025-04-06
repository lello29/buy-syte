
import { User, UserRole, Shop } from "../../types";

export interface ShopData {
  fiscalCode: string;
  vatNumber: string;
}

export interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  updateUserRole: (role: UserRole, shopData?: ShopData) => void;
  updateUserFavorites: (favorites: string[]) => void;
  getNearestShops: (lat: number, lng: number, radius?: number) => Shop[];
  isLoading: boolean;
  getUserShop: () => Shop | undefined;
}

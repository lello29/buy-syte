
import { Shop } from '@/types';

export interface ShopFormData {
  id?: string;
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
}

export interface UseShopStateReturn {
  selectedShop: Shop | null;
  isViewShopOpen: boolean;
  isEditShopOpen: boolean;
  isAddShopOpen: boolean;
  isDeleteShopOpen: boolean;
  isDeleteAllShopsOpen: boolean;
  setIsViewShopOpen: (open: boolean) => void;
  setIsEditShopOpen: (open: boolean) => void;
  setIsAddShopOpen: (open: boolean) => void;
  setIsDeleteShopOpen: (open: boolean) => void;
  setIsDeleteAllShopsOpen: (open: boolean) => void;
  handleSaveChanges: (shopData: ShopFormData) => Promise<boolean>;
  handleConfirmDeleteShop: () => Promise<boolean>;
  handleDeleteAllShops: () => Promise<boolean>;
  handleShopChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (field: string, checked: boolean) => void;
  handleSelectChange: (value: string, name: string) => void;
  handleCreateShop: (shop: Partial<Shop>) => Promise<Shop | null>;
  handleViewShop: (shop: Shop) => void;
  handleEditShop: (shop: Shop) => void;
  handleAddShop: () => void;
  isDeleting: boolean;
  isCreating: boolean;
  shopsList: Shop[];
  isLocating: boolean;
  isLoading: boolean;
  handleDeleteButtonClick: (shopId: string) => void;
  handleToggleStatus: (shopId: string, currentStatus: boolean) => Promise<void>;
  handleApproveShop: (shopId: string) => Promise<void>;
  handleOpenDeleteAllDialog: () => void;
  handleGetLocation: () => void;
}


import { useState } from 'react';
import { Shop } from '@/types';

export interface UseShopDialogStateReturn {
  selectedShop: Shop | null;
  setSelectedShop: React.Dispatch<React.SetStateAction<Shop | null>>;
  isViewShopOpen: boolean;
  setIsViewShopOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditShopOpen: boolean;
  setIsEditShopOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddShopOpen: boolean;
  setIsAddShopOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteShopOpen: boolean;
  setIsDeleteShopOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useShopDialogState = (): UseShopDialogStateReturn => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isViewShopOpen, setIsViewShopOpen] = useState(false);
  const [isEditShopOpen, setIsEditShopOpen] = useState(false);
  const [isAddShopOpen, setIsAddShopOpen] = useState(false);
  const [isDeleteShopOpen, setIsDeleteShopOpen] = useState(false);
  
  return {
    selectedShop,
    setSelectedShop,
    isViewShopOpen,
    setIsViewShopOpen,
    isEditShopOpen,
    setIsEditShopOpen,
    isAddShopOpen,
    setIsAddShopOpen,
    isDeleteShopOpen,
    setIsDeleteShopOpen,
  };
};

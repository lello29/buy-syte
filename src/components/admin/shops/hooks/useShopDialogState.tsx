
import { useState } from 'react';
import { Shop } from '@/types';

export const useShopDialogState = () => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isViewShopOpen, setIsViewShopOpen] = useState(false);
  const [isEditShopOpen, setIsEditShopOpen] = useState(false);
  const [isAddShopOpen, setIsAddShopOpen] = useState(false);
  const [isDeleteShopOpen, setIsDeleteShopOpen] = useState(false);
  const [isDeleteAllShopsOpen, setIsDeleteAllShopsOpen] = useState(false);

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
    isDeleteAllShopsOpen,
    setIsDeleteAllShopsOpen
  };
};

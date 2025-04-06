
import { useState } from 'react';
import { Shop } from '@/types';

export const useDialogState = () => {
  const [isAddShopOpen, setIsAddShopOpen] = useState(false);
  const [isEditShopOpen, setIsEditShopOpen] = useState(false);
  const [isViewShopOpen, setIsViewShopOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  
  const openAddDialog = () => {
    setIsAddShopOpen(true);
  };
  
  const openEditDialog = (shop: Shop) => {
    setSelectedShop(shop);
    setIsEditShopOpen(true);
  };
  
  const openViewDialog = (shop: Shop) => {
    setSelectedShop(shop);
    setIsViewShopOpen(true);
  };
  
  return {
    isAddShopOpen,
    setIsAddShopOpen,
    isEditShopOpen,
    setIsEditShopOpen,
    isViewShopOpen,
    setIsViewShopOpen,
    selectedShop,
    setSelectedShop,
    openAddDialog,
    openEditDialog,
    openViewDialog
  };
};

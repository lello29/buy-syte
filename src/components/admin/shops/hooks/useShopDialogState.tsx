
import { useState, useCallback, useEffect } from 'react';
import { Shop } from '@/types';

export const useShopDialogState = () => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isViewShopOpen, setIsViewShopOpen] = useState(false);
  const [isEditShopOpen, setIsEditShopOpen] = useState(false);
  const [isAddShopOpen, setIsAddShopOpen] = useState(false);
  const [isDeleteShopOpen, setIsDeleteShopOpen] = useState(false);
  const [isDeleteAllShopsOpen, setIsDeleteAllShopsOpen] = useState(false);

  // Add debugging to track dialog state changes
  const setIsAddShopOpenWithLogging = useCallback((value: boolean) => {
    console.log("setIsAddShopOpen called with value:", value);
    setIsAddShopOpen(value);
  }, []);

  // Add effect to log state changes
  useEffect(() => {
    console.log("Dialog state changed - isAddShopOpen:", isAddShopOpen);
  }, [isAddShopOpen]);

  return {
    selectedShop,
    setSelectedShop,
    isViewShopOpen,
    isEditShopOpen,
    isAddShopOpen,
    isDeleteShopOpen,
    isDeleteAllShopsOpen,
    setIsViewShopOpen,
    setIsEditShopOpen,
    setIsAddShopOpen: setIsAddShopOpenWithLogging,
    setIsDeleteShopOpen,
    setIsDeleteAllShopsOpen,
  };
};

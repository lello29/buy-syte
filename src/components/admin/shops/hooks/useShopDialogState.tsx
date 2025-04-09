
import { useState, useCallback } from 'react';
import { Shop } from '@/types';

export const useShopDialogState = () => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isViewShopOpen, setIsViewShopOpen] = useState(false);
  const [isEditShopOpen, setIsEditShopOpen] = useState(false);
  const [isAddShopOpen, setIsAddShopOpen] = useState(false);
  const [isDeleteShopOpen, setIsDeleteShopOpen] = useState(false);
  const [isDeleteAllShopsOpen, setIsDeleteAllShopsOpen] = useState(false);

  // Funzione semplificata per aprire il dialog di aggiunta negozio
  const openAddShopDialog = useCallback(() => {
    console.log("openAddShopDialog chiamato - aprendo il dialog");
    setIsAddShopOpen(true);
  }, []);

  // Funzione semplificata per chiudere il dialog di aggiunta negozio
  const closeAddShopDialog = useCallback(() => {
    console.log("closeAddShopDialog chiamato - chiudendo il dialog");
    setIsAddShopOpen(false);
  }, []);

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
    setIsAddShopOpen,
    setIsDeleteShopOpen,
    setIsDeleteAllShopsOpen,
    openAddShopDialog,
    closeAddShopDialog
  };
};

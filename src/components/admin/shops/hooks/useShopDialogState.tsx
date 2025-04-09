
import { useState, useCallback, useEffect } from 'react';
import { Shop } from '@/types';

export const useShopDialogState = () => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isViewShopOpen, setIsViewShopOpen] = useState(false);
  const [isEditShopOpen, setIsEditShopOpen] = useState(false);
  const [isAddShopOpen, setIsAddShopOpen] = useState(false);
  const [isDeleteShopOpen, setIsDeleteShopOpen] = useState(false);
  const [isDeleteAllShopsOpen, setIsDeleteAllShopsOpen] = useState(false);

  // Migliorato il logging per debug
  const setIsAddShopOpenWithLogging = useCallback((value: boolean) => {
    console.log("setIsAddShopOpen chiamato con valore:", value);
    console.log("Stato precedente isAddShopOpen:", isAddShopOpen);
    setIsAddShopOpen(value);
    
    // Log asincrono per verificare se il cambiamento è stato applicato
    setTimeout(() => {
      console.log("Verifica cambio stato isAddShopOpen dopo setTimeout:", isAddShopOpen);
    }, 0);
  }, [isAddShopOpen]);

  // Migliorato il logging per tutti i cambiamenti di stato
  useEffect(() => {
    console.log("Dialog state changed - isAddShopOpen:", isAddShopOpen);
    
    if (isAddShopOpen) {
      console.log("IMPORTANTE: AddShopDialog dovrebbe essere visibile ora!");
      // Verifica gli elementi DOM per vedere se il dialogo è stato renderizzato
      setTimeout(() => {
        const dialogElement = document.querySelector('[role="dialog"]');
        console.log("Dialog DOM element trovato:", !!dialogElement);
      }, 100);
    }
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


import { useState, useCallback } from 'react';
import { useShopDialogState } from './useShopDialogState';
import { useShopActions } from './useShopActions';
import { useShopLocation } from './useShopLocation';
import { useShopForm } from './useShopForm';
import { Shop, ShopFormData } from '@/types';
import { toast } from 'sonner';

export const useShopState = () => {
  // Get shops list and loading state from database or context
  const [shopsList, setShopsList] = useState<Shop[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  
  // Dialog state management
  const {
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
  } = useShopDialogState();
  
  // Shop location utilities
  const { getCurrentLocation } = useShopLocation();
  
  // Shop actions
  const shopActions = useShopActions();
  
  // Handle viewing a shop 
  const handleViewShop = useCallback((shop: Shop) => {
    setSelectedShop(shop);
    setIsViewShopOpen(true);
  }, [setSelectedShop, setIsViewShopOpen]);
  
  // Handle editing a shop
  const handleEditShop = useCallback((shop: Shop) => {
    setSelectedShop(shop);
    setIsEditShopOpen(true);
  }, [setSelectedShop, setIsEditShopOpen]);
  
  // Handle adding a new shop
  const handleAddShop = useCallback(() => {
    setIsAddShopOpen(true);
  }, [setIsAddShopOpen]);
  
  // Handle saving changes to a shop
  const handleSaveChanges = useCallback(async (shopData: ShopFormData) => {
    if (!selectedShop) return;
    
    try {
      // Call the shop update action
      const success = await shopActions.handleUpdateShop(selectedShop.id, shopData);
      
      if (success) {
        setIsEditShopOpen(false);
        toast.success("Negozio aggiornato con successo");
        // Refresh shop list or update the selected shop in the list
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error saving shop changes:", error);
      toast.error("Errore durante il salvataggio delle modifiche");
      return false;
    }
  }, [selectedShop, shopActions, setIsEditShopOpen]);
  
  // Handle creating a new shop
  const handleCreateShop = useCallback(async (shopData: Partial<Shop>) => {
    try {
      // Call the shop create action
      const success = await shopActions.handleCreateShop(shopData);
      
      if (success) {
        setIsAddShopOpen(false);
        toast.success("Negozio creato con successo");
        // Refresh shop list
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error creating shop:", error);
      toast.error("Errore durante la creazione del negozio");
      return false;
    }
  }, [shopActions, setIsAddShopOpen]);
  
  // Handle deleting a shop
  const handleConfirmDeleteShop = useCallback(async () => {
    if (!selectedShop) return;
    
    setIsDeleting(true);
    try {
      // Call the shop delete action
      const success = await shopActions.handleDeleteShop(selectedShop.id);
      
      if (success) {
        setIsDeleteShopOpen(false);
        toast.success(`Negozio "${selectedShop.name}" eliminato con successo`);
        // Refresh shop list
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting shop:", error);
      toast.error("Errore durante l'eliminazione del negozio");
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [selectedShop, shopActions, setIsDeleteShopOpen]);
  
  // Handle deleting all shops
  const handleDeleteAllShops = useCallback(async () => {
    setIsDeleting(true);
    try {
      // Call the delete all shops action
      const success = await shopActions.handleDeleteAllShops();
      
      if (success) {
        setIsDeleteAllShopsOpen(false);
        toast.success("Tutti i negozi sono stati eliminati con successo");
        // Refresh shop list
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting all shops:", error);
      toast.error("Errore durante l'eliminazione di tutti i negozi");
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [shopActions, setIsDeleteAllShopsOpen]);
  
  // Handle shop form changes
  const handleShopChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // This function would update a form state
    console.log("Shop field changed:", e.target.name, e.target.value);
  }, []);
  
  // Handle checkbox changes
  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // This function would update a form state
    console.log("Checkbox changed:", e.target.name, e.target.checked);
  }, []);
  
  // Handle select changes
  const handleSelectChange = useCallback((value: string, name: string) => {
    // This function would update a form state
    console.log("Select changed:", name, value);
  }, []);
  
  return {
    selectedShop,
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
    handleSaveChanges,
    handleConfirmDeleteShop,
    handleDeleteAllShops,
    handleShopChange,
    handleCheckboxChange,
    handleSelectChange,
    handleCreateShop,
    handleViewShop,
    handleEditShop,
    handleAddShop,
    isDeleting,
    shopsList,
    isLocating
  };
};

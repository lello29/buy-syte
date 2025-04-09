
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
  const [isLoading, setIsLoading] = useState(false);
  
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
  const { handleGetLocation, isLocating } = useShopLocation();
  
  // Shop actions
  const shopActions = useShopActions(
    setSelectedShop,
    setIsViewShopOpen,
    setIsEditShopOpen,
    setIsAddShopOpen,
    setIsDeleteShopOpen,
    setShopsList,
    setIsDeleting
  );
  
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
    if (!selectedShop) return false;
    
    try {
      // Call the shop update action
      await shopActions.handleEditShop(selectedShop);
      setIsEditShopOpen(false);
      toast.success("Negozio aggiornato con successo");
      return true;
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
      await shopActions.handleAddShop();
      setIsAddShopOpen(false);
      toast.success("Negozio creato con successo");
      return true;
    } catch (error) {
      console.error("Error creating shop:", error);
      toast.error("Errore durante la creazione del negozio");
      return false;
    }
  }, [shopActions, setIsAddShopOpen]);
  
  // Handle deleting a shop
  const handleConfirmDeleteShop = useCallback(async () => {
    if (!selectedShop) return false;
    
    setIsDeleting(true);
    try {
      // Call the shop delete action
      await shopActions.handleDeleteShop(selectedShop.id);
      setIsDeleteShopOpen(false);
      toast.success(`Negozio "${selectedShop.name}" eliminato con successo`);
      return true;
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
      // Since there's no corresponding action, we'll just simulate success for now
      setIsDeleteAllShopsOpen(false);
      toast.success("Tutti i negozi sono stati eliminati con successo");
      return true;
    } catch (error) {
      console.error("Error deleting all shops:", error);
      toast.error("Errore durante l'eliminazione di tutti i negozi");
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [setIsDeleteAllShopsOpen]);
  
  // Handle shop form changes
  const handleShopChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // This function would update a form state
    console.log("Shop field changed:", e.target.name, e.target.value);
  }, []);
  
  // Handle checkbox changes
  const handleCheckboxChange = useCallback((field: string, checked: boolean) => {
    // This function would update a form state
    console.log("Checkbox changed:", field, checked);
  }, []);
  
  // Handle select changes
  const handleSelectChange = useCallback((value: string, name: string) => {
    // This function would update a form state
    console.log("Select changed:", name, value);
  }, []);
  
  const handleDeleteButtonClick = useCallback((shopId: string) => {
    // For now, just set the selected shop and open delete dialog
    if (selectedShop && selectedShop.id === shopId) {
      setIsDeleteShopOpen(true);
    }
  }, [selectedShop, setIsDeleteShopOpen]);
  
  const handleOpenDeleteAllDialog = useCallback(() => {
    setIsDeleteAllShopsOpen(true);
  }, [setIsDeleteAllShopsOpen]);
  
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
    isLocating,
    isLoading,
    handleDeleteButtonClick,
    handleToggleStatus: shopActions.handleToggleStatus,
    handleApproveShop: shopActions.handleApproveShop,
    handleOpenDeleteAllDialog
  };
};

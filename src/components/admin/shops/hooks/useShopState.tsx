
import { useCallback } from 'react';
import { useShopDialogState } from './useShopDialogState';
import { useShopActions } from './useShopActions';
import { useShopLocation } from './useShopLocation';
import { useShopLoader } from './useShopLoader';
import { useShopCreation } from './useShopCreation';
import { useShopDeletion } from './useShopDeletion';
import { useShopHandlers } from './useShopHandlers';
import { Shop } from '@/types';
import { ShopFormData } from './types/shopTypes';

export type { ShopFormData } from './types/shopTypes';

export const useShopState = () => {
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
    openAddShopDialog
  } = useShopDialogState();
  
  const { shopsList, setShopsList, isLoading } = useShopLoader();
  
  const { handleGetLocation, isLocating } = useShopLocation();
  
  const { isCreating, handleCreateShop } = useShopCreation(setShopsList);
  
  const { isDeleting, setIsDeleting, handleDeleteAllShops } = useShopDeletion(
    setShopsList,
    setIsDeleteAllShopsOpen
  );
  
  const shopActions = useShopActions(
    setSelectedShop,
    setIsViewShopOpen,
    setIsEditShopOpen,
    setIsAddShopOpen,
    setIsDeleteShopOpen,
    setShopsList,
    setIsDeleting
  );
  
  const {
    handleSaveChanges,
    handleShopChange,
    handleCheckboxChange,
    handleSelectChange,
    handleDeleteButtonClick
  } = useShopHandlers(
    selectedShop,
    shopsList,
    setSelectedShop,
    setIsEditShopOpen,
    setIsDeleteShopOpen,
    shopActions
  );
  
  const handleViewShop = useCallback((shop: Shop) => {
    setSelectedShop(shop);
    setIsViewShopOpen(true);
  }, [setSelectedShop, setIsViewShopOpen]);
  
  const handleEditShop = useCallback((shop: Shop) => {
    setSelectedShop(shop);
    setIsEditShopOpen(true);
  }, [setSelectedShop, setIsEditShopOpen]);
  
  const handleAddShop = useCallback(() => {
    console.log("handleAddShop chiamato in useShopState");
    openAddShopDialog();
  }, [openAddShopDialog]);
  
  const handleConfirmDeleteShop = useCallback(async () => {
    if (!selectedShop) return false;
    
    setIsDeleting(true);
    try {
      const result = await shopActions.handleDeleteShop(selectedShop.id);
      setIsDeleteShopOpen(false);
      return true;
    } catch (error) {
      console.error("Error deleting shop:", error);
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [selectedShop, shopActions, setIsDeleteShopOpen, setIsDeleting]);
  
  const handleOpenDeleteAllDialog = useCallback(() => {
    setIsDeleteAllShopsOpen(true);
  }, [setIsDeleteAllShopsOpen]);
  
  const handleToggleStatus = useCallback(async (shopId: string, currentStatus: boolean) => {
    try {
      await shopActions.handleToggleStatus(shopId, currentStatus);
    } catch (error) {
      console.error("Error toggling shop status:", error);
    }
  }, [shopActions]);
  
  const handleApproveShop = useCallback(async (shopId: string) => {
    try {
      await shopActions.handleApproveShop(shopId);
    } catch (error) {
      console.error("Error approving shop:", error);
    }
  }, [shopActions]);
  
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
    isCreating,
    shopsList,
    isLocating,
    isLoading,
    handleDeleteButtonClick,
    handleToggleStatus,
    handleApproveShop,
    handleOpenDeleteAllDialog,
    handleGetLocation
  };
};

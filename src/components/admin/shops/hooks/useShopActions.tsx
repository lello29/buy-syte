
import { useCallback } from 'react';
import { Shop } from '@/types';
import { toast } from 'sonner';
import { deleteShop as deleteShopService, toggleShopStatus, approveShop as approveShopService } from '@/services/shop';

export interface UseShopActionsReturn {
  handleAddShop: () => void;
  handleViewShop: (shop: Shop) => void;
  handleEditShop: (shop: Shop) => void;
  handleDeleteShop: (shopId: string) => void;
  handleToggleStatus: (shopId: string, isActive: boolean) => void;
  handleApproveShop: (shopId: string, isApproved: boolean) => void;
}

export const useShopActions = (
  setSelectedShop: React.Dispatch<React.SetStateAction<Shop | null>>,
  setIsViewShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAddShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDeleteShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setShopsList: React.Dispatch<React.SetStateAction<Shop[]>>
): UseShopActionsReturn => {
  const handleAddShop = useCallback(() => {
    setIsAddShopOpen(true);
  }, [setIsAddShopOpen]);
  
  const handleViewShop = useCallback((shop: Shop) => {
    setSelectedShop(shop);
    setIsViewShopOpen(true);
  }, [setSelectedShop, setIsViewShopOpen]);
  
  const handleEditShop = useCallback((shop: Shop) => {
    setSelectedShop(shop);
    setIsEditShopOpen(true);
  }, [setSelectedShop, setIsEditShopOpen]);
  
  const handleDeleteShop = useCallback(async (shopId: string) => {
    try {
      const success = await deleteShopService(shopId);
      if (success) {
        setShopsList(prev => prev.filter(shop => shop.id !== shopId));
        setIsDeleteShopOpen(false);
      }
    } catch (error) {
      console.error("Error deleting shop:", error);
      toast.error("Errore nell'eliminazione del negozio");
    }
  }, [setShopsList, setIsDeleteShopOpen]);
  
  const handleToggleStatus = useCallback(async (shopId: string, isActive: boolean) => {
    try {
      const success = await toggleShopStatus(shopId, isActive);
      if (success) {
        setShopsList(prev => 
          prev.map(shop => 
            shop.id === shopId ? { ...shop, isActive, lastUpdated: new Date().toISOString() } : shop
          )
        );
      }
    } catch (error) {
      console.error("Error toggling shop status:", error);
      toast.error("Errore nell'aggiornamento dello stato del negozio");
    }
  }, [setShopsList]);
  
  const handleApproveShop = useCallback(async (shopId: string, isApproved: boolean) => {
    try {
      const success = await approveShopService(shopId, isApproved);
      if (success) {
        setShopsList(prev => 
          prev.map(shop => 
            shop.id === shopId ? { ...shop, isApproved, lastUpdated: new Date().toISOString() } : shop
          )
        );
      }
    } catch (error) {
      console.error("Error approving shop:", error);
      toast.error("Errore nell'approvazione del negozio");
    }
  }, [setShopsList]);
  
  return {
    handleAddShop,
    handleViewShop,
    handleEditShop,
    handleDeleteShop,
    handleToggleStatus,
    handleApproveShop,
  };
};

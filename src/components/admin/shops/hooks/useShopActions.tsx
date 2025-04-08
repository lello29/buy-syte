
import { useCallback } from 'react';
import { Shop } from '@/types';
import { toast } from 'sonner';
import { deleteShop as deleteShopService, toggleShopStatus, approveShop as approveShopService } from '@/services/shop';

export interface UseShopActionsReturn {
  handleAddShop: () => void;
  handleViewShop: (shop: Shop) => void;
  handleEditShop: (shop: Shop) => void;
  handleDeleteShop: (shopId: string) => Promise<boolean>;
  handleToggleStatus: (shopId: string, isActive: boolean) => Promise<boolean>;
  handleApproveShop: (shopId: string, isApproved: boolean) => Promise<boolean>;
}

export const useShopActions = (
  setSelectedShop: React.Dispatch<React.SetStateAction<Shop | null>>,
  setIsViewShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAddShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDeleteShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setShopsList: React.Dispatch<React.SetStateAction<Shop[]>>,
  setIsDeleting?: React.Dispatch<React.SetStateAction<boolean>>
): UseShopActionsReturn => {
  const handleAddShop = useCallback(() => {
    setIsAddShopOpen(true);
  }, [setIsAddShopOpen]);
  
  const handleViewShop = useCallback((shop: Shop) => {
    if (shop) {
      setSelectedShop(shop);
      setIsViewShopOpen(true);
    } else {
      console.error("Attempted to view undefined shop");
      toast.error("Errore: impossibile visualizzare il negozio");
    }
  }, [setSelectedShop, setIsViewShopOpen]);
  
  const handleEditShop = useCallback((shop: Shop) => {
    if (shop) {
      setSelectedShop(shop);
      setIsEditShopOpen(true);
    } else {
      console.error("Attempted to edit undefined shop");
      toast.error("Errore: impossibile modificare il negozio");
    }
  }, [setSelectedShop, setIsEditShopOpen]);
  
  const handleDeleteShop = useCallback(async (shopId: string): Promise<boolean> => {
    if (!shopId) {
      console.error("Invalid shop ID for deletion");
      toast.error("ID negozio non valido");
      return false;
    }

    try {
      console.log("Deleting shop with ID:", shopId);
      if (setIsDeleting) setIsDeleting(true);
      
      const success = await deleteShopService(shopId);
      
      if (success) {
        setShopsList(prev => prev.filter(shop => shop.id !== shopId));
        setSelectedShop(null);
        setIsDeleteShopOpen(false);
        toast.success("Negozio eliminato con successo");
        return true;
      } else {
        toast.error("Errore nell'eliminazione del negozio");
        return false;
      }
    } catch (error) {
      console.error("Error deleting shop:", error);
      toast.error("Errore nell'eliminazione del negozio");
      return false;
    } finally {
      if (setIsDeleting) setIsDeleting(false);
    }
  }, [setShopsList, setSelectedShop, setIsDeleteShopOpen, setIsDeleting]);
  
  const handleToggleStatus = useCallback(async (shopId: string, isActive: boolean): Promise<boolean> => {
    if (!shopId) {
      console.error("Invalid shop ID for toggle status");
      toast.error("ID negozio non valido");
      return false;
    }

    try {
      console.log("Toggling status for shop ID:", shopId, "to:", isActive);
      const success = await toggleShopStatus(shopId, isActive);
      
      if (success) {
        setShopsList(prev => 
          prev.map(shop => 
            shop.id === shopId ? { ...shop, isActive, lastUpdated: new Date().toISOString() } : shop
          )
        );
        toast.success(`Negozio ${isActive ? 'attivato' : 'disattivato'} con successo`);
        return true;
      } else {
        toast.error("Errore nell'aggiornamento dello stato del negozio");
        return false;
      }
    } catch (error) {
      console.error("Error toggling shop status:", error);
      toast.error("Errore nell'aggiornamento dello stato del negozio");
      return false;
    }
  }, [setShopsList]);
  
  const handleApproveShop = useCallback(async (shopId: string, isApproved: boolean): Promise<boolean> => {
    if (!shopId) {
      console.error("Invalid shop ID for approval");
      toast.error("ID negozio non valido");
      return false;
    }

    try {
      console.log("Approving shop ID:", shopId);
      const success = await approveShopService(shopId, isApproved);
      
      if (success) {
        setShopsList(prev => 
          prev.map(shop => 
            shop.id === shopId ? { ...shop, isApproved, lastUpdated: new Date().toISOString() } : shop
          )
        );
        toast.success(`Negozio ${isApproved ? 'approvato' : 'messo in attesa'} con successo`);
        return true;
      } else {
        toast.error("Errore nell'approvazione del negozio");
        return false;
      }
    } catch (error) {
      console.error("Error approving shop:", error);
      toast.error("Errore nell'approvazione del negozio");
      return false;
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

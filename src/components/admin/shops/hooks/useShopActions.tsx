
import { useCallback } from 'react';
import { Shop } from '@/types';
import { toast } from 'sonner';
import { toggleShopStatus, approveShop } from '@/services/shop';

export const useShopActions = (
  setSelectedShop: React.Dispatch<React.SetStateAction<Shop | null>>,
  setIsViewShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAddShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDeleteShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setShopsList: React.Dispatch<React.SetStateAction<Shop[]>>,
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Function to handle viewing a shop
  const handleViewShop = useCallback((shop: Shop) => {
    console.log("Opening view shop dialog for shop:", shop.id);
    setSelectedShop(shop);
    setIsViewShopOpen(true);
  }, [setSelectedShop, setIsViewShopOpen]);
  
  // Function to handle editing a shop
  const handleEditShop = useCallback((shop: Shop) => {
    console.log("Opening edit shop dialog for shop:", shop.id);
    setSelectedShop(shop);
    setIsEditShopOpen(true);
  }, [setSelectedShop, setIsEditShopOpen]);
  
  // Function to handle adding a shop
  const handleAddShop = useCallback(() => {
    console.log("Opening add shop dialog");
    setIsAddShopOpen(true);
  }, [setIsAddShopOpen]);
  
  // Function to handle toggling shop status
  const handleToggleStatus = useCallback(async (shopId: string, currentStatus: boolean) => {
    try {
      console.log(`Toggling shop status: ${shopId}, current status: ${currentStatus}`);
      const newStatus = !currentStatus;
      const updatedShop = await toggleShopStatus(shopId, newStatus);
      
      if (updatedShop) {
        setShopsList(prev => 
          prev.map(shop => 
            shop.id === shopId ? { ...shop, isActive: newStatus } : shop
          )
        );
        
        const statusText = newStatus ? "attivato" : "disattivato";
        toast.success(`Negozio ${statusText} con successo`);
      }
    } catch (error) {
      console.error("Error toggling shop status:", error);
      toast.error("Errore durante la modifica dello stato del negozio");
    }
  }, [setShopsList]);
  
  // Function to handle approving a shop
  const handleApproveShop = useCallback(async (shopId: string) => {
    try {
      console.log("Approving shop:", shopId);
      const updatedShop = await approveShop(shopId);
      
      if (updatedShop) {
        setShopsList(prev => 
          prev.map(shop => 
            shop.id === shopId ? { ...shop, isApproved: true } : shop
          )
        );
        toast.success("Negozio approvato con successo");
      }
    } catch (error) {
      console.error("Error approving shop:", error);
      toast.error("Errore durante l'approvazione del negozio");
    }
  }, [setShopsList]);
  
  return {
    handleViewShop,
    handleEditShop,
    handleAddShop,
    handleToggleStatus,
    handleApproveShop
  };
};

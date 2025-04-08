
import { useState, useEffect, useCallback } from 'react';
import { Shop } from '@/types';
import { toast } from 'sonner';
import { fetchShops, migrateShops, deleteShop } from '@/services/shop';
import { useShopDialogState } from './useShopDialogState';
import { useShopForm } from './useShopForm';
import { useShopActions } from './useShopActions';

export const useShopState = () => {
  const [shopsList, setShopsList] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Get dialog state management
  const dialogState = useShopDialogState();
  
  // Get shop form handling functionality
  const formHandlers = useShopForm(
    dialogState.selectedShop,
    dialogState.setSelectedShop,
    dialogState.setIsAddShopOpen,
    dialogState.setIsEditShopOpen,
    setShopsList
  );
  
  // Get shop actions with loading states
  const actions = useShopActions(
    dialogState.setSelectedShop,
    dialogState.setIsViewShopOpen,
    dialogState.setIsEditShopOpen,
    dialogState.setIsAddShopOpen,
    dialogState.setIsDeleteShopOpen,
    setShopsList,
    setIsDeleting
  );
  
  // Function to delete a shop
  const handleDeleteShop = useCallback(async (shopId: string) => {
    setIsDeleting(true);
    try {
      console.log("Starting shop deletion process for ID:", shopId);
      const success = await deleteShop(shopId);
      
      if (success) {
        console.log("Shop deleted successfully");
        setShopsList(prev => prev.filter(shop => shop.id !== shopId));
        dialogState.setIsDeleteShopOpen(false);
        toast.success("Negozio eliminato con successo");
      } else {
        console.error("Failed to delete shop");
        toast.error("Errore durante l'eliminazione del negozio");
      }
    } catch (error) {
      console.error("Error deleting shop:", error);
      toast.error("Si è verificato un errore durante l'eliminazione del negozio");
    } finally {
      setIsDeleting(false);
    }
  }, [dialogState]);
  
  // Function to migrate shops
  const handleMigrateShops = useCallback(async () => {
    setIsMigrating(true);
    try {
      console.log("Starting migration process...");
      const migratedShops = await migrateShops();
      console.log("Migration complete, returned shops:", migratedShops?.length);
      
      if (migratedShops && migratedShops.length > 0) {
        setShopsList(migratedShops);
        toast.success("Negozi migrati con successo!");
        
        // Reload shops from database to verify migration worked
        try {
          console.log("Reloading shops after migration");
          const freshShops = await fetchShops();
          if (freshShops.length > 0) {
            console.log("Successfully loaded shops after migration:", freshShops.length);
            setShopsList(freshShops);
          } else {
            console.warn("No shops returned after migration");
          }
        } catch (reloadError) {
          console.error("Error reloading shops after migration:", reloadError);
        }
      } else {
        console.error("No shops returned from migration");
        toast.error("Errore durante la migrazione dei negozi");
      }
    } catch (error) {
      console.error("Error migrating shops:", error);
      toast.error("Si è verificato un errore durante la migrazione dei negozi");
    } finally {
      setIsMigrating(false);
    }
  }, []);
  
  // Load shops data
  useEffect(() => {
    const loadShops = async () => {
      setIsLoading(true);
      try {
        console.log("Loading shops data...");
        const shopsData = await fetchShops();
        console.log("Shops loaded:", shopsData?.length);
        setShopsList(shopsData || []);
      } catch (error) {
        console.error("Error loading shops:", error);
        toast.error("Si è verificato un errore durante il caricamento dei negozi");
        setShopsList([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadShops();
  }, []);
  
  return {
    // Shops data
    shopsList,
    setShopsList,
    isLoading,
    isMigrating,
    isDeleting,
    
    // Migration function
    handleMigrateShops,
    
    // Delete function
    handleDeleteShop,
    
    // Dialog state
    ...dialogState,
    
    // Form handlers
    ...formHandlers,
    
    // Shop actions
    ...actions,
  };
};

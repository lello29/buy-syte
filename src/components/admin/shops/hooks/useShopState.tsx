
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
  
  // Prepare a handler for delete button clicks (opens the confirmation dialog)
  const handleDeleteButtonClick = useCallback((shopId: string) => {
    const shop = shopsList.find(s => s.id === shopId);
    if (shop) {
      dialogState.setSelectedShop(shop);
      dialogState.setIsDeleteShopOpen(true);
    } else {
      toast.error("Negozio non trovato");
    }
  }, [shopsList, dialogState]);
  
  // Connect the actual delete function for when confirmation is given
  const handleConfirmDeleteShop = useCallback(() => {
    if (dialogState.selectedShop) {
      actions.handleDeleteShop(dialogState.selectedShop.id);
    }
  }, [dialogState.selectedShop, actions]);
  
  // Function to migrate shops
  const handleMigrateShops = useCallback(async () => {
    setIsMigrating(true);
    try {
      console.log("Starting migration process...");
      const migratedShops = await migrateShops();
      
      if (migratedShops && migratedShops.length > 0) {
        setShopsList(migratedShops);
        toast.success("Negozi migrati con successo!");
      } else {
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
    
    // Delete functions
    handleDeleteButtonClick,
    handleConfirmDeleteShop,
    
    // Dialog state
    ...dialogState,
    
    // Form handlers
    ...formHandlers,
    
    // Shop actions
    ...actions,
  };
};

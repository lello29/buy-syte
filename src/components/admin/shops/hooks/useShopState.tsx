
import { useState, useEffect, useCallback } from 'react';
import { Shop } from '@/types';
import { toast } from 'sonner';
import { fetchShops, migrateShops, deleteShop, deleteAllShops } from '@/services/shop';
import { useShopDialogState } from './useShopDialogState';
import { useShopForm } from './useShopForm';
import { useShopActions } from './useShopActions';

export const useShopState = () => {
  const [shopsList, setShopsList] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dataWasDeleted, setDataWasDeleted] = useState(false);
  
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
  
  // Function to delete all shops - migliorata per gestire lo stato correttamente
  const handleDeleteAllShops = useCallback(async () => {
    setIsDeleting(true);
    try {
      console.log("Deleting all shops...");
      
      const success = await deleteAllShops();
      
      if (success) {
        setShopsList([]);
        setDataWasDeleted(true); // Segna che i dati sono stati eliminati
        toast.success("Tutti i negozi sono stati eliminati con successo");
      } else {
        toast.error("Si è verificato un errore durante l'eliminazione dei negozi");
      }
    } catch (error) {
      console.error("Error deleting all shops:", error);
      toast.error("Si è verificato un errore durante l'eliminazione dei negozi");
    } finally {
      setIsDeleting(false);
    }
  }, []);
  
  // Load shops data
  useEffect(() => {
    const loadShops = async () => {
      setIsLoading(true);
      try {
        console.log("Loading shops data...");
        const shopsData = await fetchShops();
        
        // Se i dati sono stati eliminati e non ci sono dati dal database,
        // manteniamo l'array vuoto invece di caricare i dati di esempio
        if (dataWasDeleted && shopsData.length === 0) {
          console.log("Data was deleted, keeping empty array");
          setShopsList([]);
        } else {
          setShopsList(shopsData || []);
        }
      } catch (error) {
        console.error("Error loading shops:", error);
        toast.error("Si è verificato un errore durante il caricamento dei negozi");
        setShopsList([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadShops();
  }, [dataWasDeleted]);
  
  return {
    // Shops data
    shopsList,
    setShopsList,
    isLoading,
    isDeleting,
    
    // Delete functions
    handleDeleteButtonClick,
    handleConfirmDeleteShop,
    handleDeleteAllShops,
    
    // Dialog state
    ...dialogState,
    
    // Form handlers
    ...formHandlers,
    
    // Shop actions
    ...actions,
  };
};

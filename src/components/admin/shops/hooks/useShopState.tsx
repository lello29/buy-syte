
import { useState, useEffect } from 'react';
import { Shop } from '@/types';
import { toast } from 'sonner';
import { fetchShops, migrateShops } from '@/services/shop';
import { useShopDialogState } from './useShopDialogState';
import { useShopForm } from './useShopForm';
import { useShopActions } from './useShopActions';

export const useShopState = () => {
  const [shopsList, setShopsList] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  
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
  
  // Get shop actions
  const actions = useShopActions(
    dialogState.setSelectedShop,
    dialogState.setIsViewShopOpen,
    dialogState.setIsEditShopOpen,
    dialogState.setIsAddShopOpen,
    dialogState.setIsDeleteShopOpen,
    setShopsList
  );
  
  // Function to migrate shops
  const handleMigrateShops = async () => {
    setIsMigrating(true);
    try {
      const migratedShops = await migrateShops();
      setShopsList(migratedShops);
      toast.success("Negozi migrati con successo!");
    } catch (error) {
      console.error("Error migrating shops:", error);
      toast.error("Si è verificato un errore durante la migrazione dei negozi");
    } finally {
      setIsMigrating(false);
    }
  };
  
  // Load shops data
  useEffect(() => {
    const loadShops = async () => {
      setIsLoading(true);
      try {
        const shopsData = await fetchShops();
        setShopsList(shopsData);
      } catch (error) {
        console.error("Error loading shops:", error);
        toast.error("Si è verificato un errore durante il caricamento dei negozi");
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
    
    // Migration function
    handleMigrateShops,
    
    // Dialog state
    ...dialogState,
    
    // Form handlers
    ...formHandlers,
    
    // Shop actions
    ...actions,
  };
};

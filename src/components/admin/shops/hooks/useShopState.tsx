
import { useState, useEffect, useCallback } from 'react';
import { Shop } from '@/types';
import { toast } from 'sonner';
import { fetchShops, migrateShops, deleteShop, deleteAllShops, updateShop, createShop } from '@/services/shop';
import { useShopDialogState } from './useShopDialogState';
import { useShopLocation } from './useShopLocation';
import { useShopActions } from './useShopActions';

export const useShopState = () => {
  const [shopsList, setShopsList] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dataWasDeleted, setDataWasDeleted] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  
  // Get dialog state management
  const dialogState = useShopDialogState();
  
  // Get shop location functionality
  const locationHandlers = useShopLocation(dialogState.setSelectedShop);
  
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
  
  // Handlers for form changes
  const handleShopChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dialogState.setSelectedShop(prev => {
      if (!prev) return prev;
      
      // Handle location fields separately
      if (name === 'latitude' || name === 'longitude') {
        const location = prev.location || { latitude: 0, longitude: 0 };
        return {
          ...prev,
          location: {
            ...location,
            [name]: parseFloat(value) || 0
          }
        };
      }
      
      return {
        ...prev,
        [name]: value
      };
    });
  };
  
  // Handle checkbox changes (for boolean fields)
  const handleCheckboxChange = (field: string, checked: boolean) => {
    dialogState.setSelectedShop(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: checked
      };
    });
  };
  
  // Handle select changes
  const handleSelectChange = (field: string, value: string) => {
    dialogState.setSelectedShop(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value
      };
    });
  };
  
  // Save changes to a shop
  const handleSaveChanges = async () => {
    if (!dialogState.selectedShop) return;
    
    setIsDeleting(true); // Reuse this state for saving indicator
    try {
      // Call update shop service
      const updated = await updateShop(dialogState.selectedShop);
      
      if (updated) {
        toast.success("Negozio aggiornato con successo");
        dialogState.setIsEditShopOpen(false);
        
        // Update the shop in the list
        setShopsList(prev => prev.map(shop => 
          shop.id === dialogState.selectedShop?.id ? dialogState.selectedShop : shop
        ));
      }
    } catch (error) {
      console.error("Error saving shop changes:", error);
      toast.error("Si è verificato un errore durante il salvataggio");
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Create a new shop
  const handleCreateShop = async (shopData: Partial<Shop>) => {
    setIsDeleting(true); // Reuse this state for saving indicator
    try {
      // Create a new shop object from the data
      const newShop: Shop = {
        id: `shop-${Date.now()}`,
        name: shopData.name || "New Shop",
        description: shopData.description || "",
        address: shopData.address || "",
        phone: shopData.phone || "",
        email: shopData.email || "",
        category: shopData.category || "",
        userId: shopData.userId || `user-${Date.now()}`,
        isActive: shopData.isActive !== undefined ? shopData.isActive : true,
        isApproved: shopData.isApproved !== undefined ? shopData.isApproved : false,
        products: [],
        offers: [],
        aiCredits: 100,
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        fiscalCode: shopData.fiscalCode || "",
        vatNumber: shopData.vatNumber || "",
        location: shopData.location || null
      };
      
      // Call create shop service
      const createdShop = await createShop(newShop);
      
      if (createdShop) {
        toast.success("Negozio creato con successo");
        dialogState.setIsAddShopOpen(false);
        
        // Add the new shop to the list
        setShopsList(prev => [...prev, createdShop]);
      }
      return createdShop;
    } catch (error) {
      console.error("Error creating shop:", error);
      toast.error("Si è verificato un errore durante la creazione del negozio");
      return null;
    } finally {
      setIsDeleting(false);
    }
  };
  
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
  
  // Function to handle opening the delete all shops dialog
  const handleOpenDeleteAllDialog = useCallback(() => {
    dialogState.setIsDeleteAllShopsOpen(true);
  }, [dialogState]);
  
  // Function to delete all shops
  const handleDeleteAllShops = useCallback(async () => {
    setIsDeleting(true);
    try {
      console.log("Deleting all shops...");
      
      const success = await deleteAllShops();
      
      if (success) {
        setShopsList([]);
        setDataWasDeleted(true); // Segna che i dati sono stati eliminati
        dialogState.setIsDeleteAllShopsOpen(false); // Chiudi il dialogo dopo l'eliminazione
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
  }, [dialogState]);
  
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
    isLocating: locationHandlers.isLocating,
    
    // Delete functions
    handleDeleteButtonClick,
    handleConfirmDeleteShop,
    handleDeleteAllShops,
    handleOpenDeleteAllDialog,
    
    // Dialog state
    ...dialogState,
    
    // Form handlers
    handleShopChange,
    handleCheckboxChange,
    handleSelectChange,
    handleSaveChanges,
    handleCreateShop,
    
    // Shop actions
    ...actions,
    
    // Location handlers
    handleGetLocation: locationHandlers.handleGetLocation
  };
};

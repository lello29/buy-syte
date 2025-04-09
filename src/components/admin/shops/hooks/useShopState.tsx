
import { useState, useCallback, useEffect } from 'react';
import { useShopDialogState } from './useShopDialogState';
import { useShopActions } from './useShopActions';
import { useShopLocation } from './useShopLocation';
import { useShopForm } from './useShopForm';
import { Shop } from '@/types';
import { toast } from 'sonner';
import { fetchShops, createShop } from '@/services/shop';

// Define ShopFormData type here
export interface ShopFormData {
  id?: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  category?: string;
  fiscalCode?: string;
  vatNumber?: string;
  latitude?: number;
  longitude?: number;
  userId?: string;
  isActive?: boolean;
  isApproved?: boolean;
}

export const useShopState = () => {
  // Get shops list and loading state from database or context
  const [shopsList, setShopsList] = useState<Shop[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  
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
  
  // Fetch shops on component mount
  useEffect(() => {
    const loadShops = async () => {
      setIsLoading(true);
      try {
        const shops = await fetchShops();
        setShopsList(shops || []);
      } catch (error) {
        console.error("Error loading shops:", error);
        toast.error("Errore nel caricamento dei negozi");
        setShopsList([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadShops();
  }, []);
  
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
    console.log("handleAddShop called in useShopState");
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
      setIsCreating(true);
      console.log("Creating shop with data:", shopData);
      
      // Form basic shop data
      const newShopData: Omit<Shop, 'id' | 'lastUpdated'> = {
        name: shopData.name || 'Nuovo negozio',
        description: shopData.description || '',
        address: shopData.address || '',
        phone: shopData.phone || '',
        email: shopData.email || '',
        category: shopData.category || 'general',
        isActive: true,
        isApproved: false,
        fiscalCode: shopData.fiscalCode || '',
        vatNumber: shopData.vatNumber || '',
        userId: shopData.userId || '',
        createdAt: new Date().toISOString(),
        aiCredits: 10
      };
      
      // Create the shop in the database
      const createdShop = await createShop(newShopData);
      
      if (createdShop) {
        // Update the shops list
        setShopsList(prev => [...prev, createdShop]);
        toast.success("Negozio creato con successo");
        setIsAddShopOpen(false);
        return createdShop;
      } else {
        toast.error("Errore durante la creazione del negozio");
        return null;
      }
    } catch (error) {
      console.error("Error creating shop:", error);
      toast.error("Errore durante la creazione del negozio");
      return null;
    } finally {
      setIsCreating(false);
    }
  }, [setIsAddShopOpen, setShopsList]);
  
  // Handle deleting a shop
  const handleConfirmDeleteShop = useCallback(async () => {
    if (!selectedShop) return false;
    
    setIsDeleting(true);
    try {
      // Call the shop delete action
      const result = await shopActions.handleDeleteShop(selectedShop.id);
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
      // Simulate successful deletion for now
      const result = await shopActions.handleDeleteAllShops();
      setIsDeleteAllShopsOpen(false);
      if (result) {
        toast.success("Tutti i negozi sono stati eliminati con successo");
        setShopsList([]);
      } else {
        toast.error("Errore durante l'eliminazione di tutti i negozi");
      }
      return result;
    } catch (error) {
      console.error("Error deleting all shops:", error);
      toast.error("Errore durante l'eliminazione di tutti i negozi");
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [setIsDeleteAllShopsOpen, shopActions, setShopsList]);
  
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
    // Find the shop by ID and set it as the selected shop
    const shop = shopsList.find(shop => shop.id === shopId);
    if (shop) {
      setSelectedShop(shop);
      setIsDeleteShopOpen(true);
    } else {
      console.error("Shop not found with ID:", shopId);
    }
  }, [shopsList, setSelectedShop, setIsDeleteShopOpen]);
  
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
